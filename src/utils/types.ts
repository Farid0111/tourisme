export interface Activity {
  id: number;
  title: string;
  image: string;
  images: string[];
  shortDescription: string;
  description: string;
  duration: string;
  region: string;
  price: string;
  included: string[];
  notIncluded: string[];
  accommodationIncluded: boolean;
  transportIncluded: boolean;
  mealsIncluded: boolean;
  featured?: boolean;
  tags: string[];
  location?: {
    lat: number;
    lng: number;
  };
}

export type DurationOption = '1 jour' | '2 jours' | '3 jours' | '5 jours' | '1 semaine' | 'Tous';

export type RegionOption = 'Kigali' | 'Parc National des Volcans' | 'Parc National de l\'Akagera' | 'Parc National de Nyungwe' | 'Ouest' | 'Nord' | 'Est' | 'Sud' | 'Toutes';

// Types pour le chat
export interface ChatMessage {
  id: string;
  text: string;
  sender: 'user' | 'admin';
  timestamp: Date | number;
  read?: boolean;
  userName?: string;
  userEmail?: string;
}

export interface ChatUser {
  id: string;
  name?: string;
  email?: string;
  isAdmin: boolean;
  lastSeen?: Date | number;
  isOnline?: boolean;
}

export interface ChatSession {
  id: string;
  userId: string;
  startedAt: Date | number;
  lastMessageAt?: Date | number;
  isOpen: boolean;
}

// Type pour la commande d'activité
export interface ActivityOrder {
  activityId: number;
  activityTitle: string;
  date?: string;
  numPersons?: number;
  specialRequests?: string;
}

// Interface pour le contexte global du chat
export interface ChatContextType {
  isChatOpen: boolean;
  openChat: () => void;
  closeChat: () => void;
  activityToOrder: ActivityOrder | null;
  setActivityToOrder: (activity: ActivityOrder | null) => void;
  sendMessage: (message: string) => Promise<void>;
}

export interface Review {
  id: number;
  activityId: number;
  author: string;
  rating: number; // 1-5
  comment: string;
  date: string;
  avatar?: string;
  approved: boolean; // Si l'avis est approuvé et visible
}

export interface ReviewFormData {
  author: string;
  rating: number;
  comment: string;
  activityId: number;
} 