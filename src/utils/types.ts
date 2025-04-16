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
  highlights?: string[];
  itinerary?: {
    title: string;
    description: string;
    activities?: string[];
  }[];
  accommodation?: string;
  transport?: string;
  meals?: string;
}

export interface DurationOption {
  value: string;
  label: string;
}

export interface RegionOption {
  value: string;
  label: string;
}

// Types pour le chat
export interface ChatMessage {
  id: string;
  text: string;
  sender: 'user' | 'agent';
  timestamp: Date;
  read?: boolean;
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