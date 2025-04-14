import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { Activity, ActivityOrder, Review, ReviewFormData } from './types';
import { reviewsData } from './reviewsData';

interface CartItem extends ActivityOrder {
  price: string;
  image: string;
}

interface CartState {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (activityId: number) => void;
  updateItemCount: (activityId: number, numPersons: number) => void;
  clearCart: () => void;
  getTotal: () => { count: number; price: string };
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      
      addItem: (item: CartItem) => {
        set((state: CartState) => {
          // Vérifier si l'activité est déjà dans le panier
          const existingItemIndex = state.items.findIndex(
            (cartItem: CartItem) => cartItem.activityId === item.activityId
          );
          
          if (existingItemIndex !== -1) {
            // Si l'activité existe déjà, mettre à jour le nombre de personnes
            const updatedItems = [...state.items];
            updatedItems[existingItemIndex] = {
              ...updatedItems[existingItemIndex],
              numPersons: (updatedItems[existingItemIndex].numPersons || 1) + (item.numPersons || 1)
            };
            return { items: updatedItems };
          }
          
          // Si l'activité n'existe pas, l'ajouter au panier
          return { items: [...state.items, { ...item, numPersons: item.numPersons || 1 }] };
        });
      },
      
      removeItem: (activityId: number) => {
        set((state: CartState) => ({
          items: state.items.filter((item: CartItem) => item.activityId !== activityId)
        }));
      },
      
      updateItemCount: (activityId: number, numPersons: number) => {
        set((state: CartState) => ({
          items: state.items.map((item: CartItem) =>
            item.activityId === activityId
              ? { ...item, numPersons }
              : item
          )
        }));
      },
      
      clearCart: () => {
        set({ items: [] });
      },
      
      getTotal: () => {
        const { items } = get();
        const count = items.reduce((acc: number, item: CartItem) => acc + (item.numPersons || 1), 0);
        
        // Calculer le prix total en supposant que le prix est au format "XXX EUR"
        let totalAmount = 0;
        items.forEach((item: CartItem) => {
          const price = parseInt(item.price.replace(/[^0-9]/g, ''));
          if (!isNaN(price)) {
            totalAmount += price * (item.numPersons || 1);
          }
        });
        
        return {
          count,
          price: `${totalAmount} EUR`
        };
      }
    }),
    {
      name: 'cart-storage', // nom pour le stockage local
      storage: createJSONStorage(() => localStorage), // utiliser localStorage avec le bon format
    }
  )
);

// Store pour les avis client (reviews)
interface ReviewsState {
  reviews: Review[];
  pendingReviews: Review[];
  isAdmin: boolean;
  
  // Actions client
  addReview: (reviewData: ReviewFormData) => void;
  
  // Actions admin
  toggleAdminMode: () => void;
  approveReview: (reviewId: number) => void;
  rejectReview: (reviewId: number) => void;
  deleteReview: (reviewId: number) => void;
  
  // Getters
  getReviewsByActivityId: (activityId: number) => Review[];
  getAverageRatingByActivityId: (activityId: number) => number;
}

export const useReviewsStore = create<ReviewsState>()(
  persist(
    (set, get) => ({
      reviews: reviewsData,
      pendingReviews: [],
      isAdmin: false,
      
      // Actions client
      addReview: (reviewData: ReviewFormData) => {
        set((state: ReviewsState) => {
          const newReview: Review = {
            id: Math.max(...state.reviews.map(r => r.id), ...state.pendingReviews.map(r => r.id), 0) + 1,
            activityId: reviewData.activityId,
            author: reviewData.author,
            rating: reviewData.rating,
            comment: reviewData.comment,
            date: new Date().toISOString().split('T')[0],
            avatar: `https://randomuser.me/api/portraits/${Math.random() > 0.5 ? 'men' : 'women'}/${Math.floor(Math.random() * 70)}.jpg`,
            approved: false // Par défaut, les avis sont en attente d'approbation
          };
          
          return {
            pendingReviews: [...state.pendingReviews, newReview]
          };
        });
      },
      
      // Actions admin
      toggleAdminMode: () => {
        set((state: ReviewsState) => ({
          isAdmin: !state.isAdmin
        }));
      },
      
      approveReview: (reviewId: number) => {
        set((state: ReviewsState) => {
          const reviewToApprove = state.pendingReviews.find(r => r.id === reviewId);
          if (!reviewToApprove) return state;
          
          return {
            reviews: [...state.reviews, { ...reviewToApprove, approved: true }],
            pendingReviews: state.pendingReviews.filter(r => r.id !== reviewId)
          };
        });
      },
      
      rejectReview: (reviewId: number) => {
        set((state: ReviewsState) => ({
          pendingReviews: state.pendingReviews.filter(r => r.id !== reviewId)
        }));
      },
      
      deleteReview: (reviewId: number) => {
        set((state: ReviewsState) => ({
          reviews: state.reviews.filter(r => r.id !== reviewId)
        }));
      },
      
      // Getters
      getReviewsByActivityId: (activityId: number) => {
        const { reviews } = get();
        return reviews.filter(review => review.activityId === activityId && review.approved);
      },
      
      getAverageRatingByActivityId: (activityId: number) => {
        const activityReviews = get().getReviewsByActivityId(activityId);
        if (activityReviews.length === 0) return 0;
        
        const sum = activityReviews.reduce((acc, review) => acc + review.rating, 0);
        return Math.round((sum / activityReviews.length) * 10) / 10; // Arrondi à 1 décimale
      }
    }),
    {
      name: 'reviews-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
); 