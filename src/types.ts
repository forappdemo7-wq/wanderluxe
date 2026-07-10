// src/types.ts

export interface Coordinates {
  x: number; // percentage width of map (0 - 100)
  y: number; // percentage height of map (0 - 100)
}

export interface Destination {
  id: string;
  name: string;
  description: string;
  country: string;
  image: string;
  rating: number;
  reviewsCount: number;
  price: number;
  coordinates: Coordinates;
}

export interface Hotel {
  id: string;
  destinationId: string;
  name: string;
  description: string;
  image: string;
  rating: number;
  reviewsCount: number;
  pricePerNight: number;
  category: 'Luxury' | 'Budget' | 'Boutique' | 'Resort';
  coordinates: Coordinates;
}

// 🍽️ Enhanced Restaurant interface
export interface Restaurant {
  id: string;
  destinationId: string;          // links to a destination
  name: string;
  description: string;
  image: string;
  rating: number;
  reviewsCount: number;
  priceLevel: '$' | '$$' | '$$$' | '$$$$'; // match your budget style
  cuisine: string;                 // e.g. "French, Mediterranean" (or string[])
  coordinates: Coordinates;        // percentage x,y for your map
  address: string;                 // full street address
  phone: string;
  openingHours: string;            // e.g. "Mon‑Sat 19:00‑23:00"
  website?: string;
  featured?: boolean;
  dietaryOptions?: string[];       // e.g. ["Vegetarian", "Gluten‑Free"]
  reservationRequired?: boolean;
}

export interface Tour {
  id: string;
  destinationId: string;
  name: string;
  description: string;
  image: string;
  rating: number;
  reviewsCount: number;
  pricePerPerson: number;
  duration: string;
  coordinates: Coordinates;
}

export interface Review {
  id: string;
  targetId: string;
  targetType: 'destination' | 'hotel' | 'restaurant' | 'tour';
  author: string;
  rating: number;
  comment: string;
  date: string;
}

export interface Booking {
  id: string;
  targetId: string;
  targetType: 'tour' | 'hotel' | 'restaurant';
  targetName: string;
  targetImage: string;
  date: string;
  quantity: number;
  totalPrice: number;
  status: 'confirmed' | 'pending' | 'cancelled';
}

export interface ItineraryActivity {
  time: string;
  activity: string;
  description: string;
  location?: string;
  estimatedCost?: string;
}

export interface ItineraryDay {
  day: number;
  theme: string;
  activities: ItineraryActivity[];
}

export interface Itinerary {
  destination: string;
  daysCount: number;
  budget: string;
  interests: string[];
  summary: string;
  dailyPlans: ItineraryDay[];
  travelTips: string[];
}