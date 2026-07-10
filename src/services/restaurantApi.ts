// src/services/restaurantApi.ts
import { Restaurant } from '@/types';

// Mock data – replace with real API later
// Images sourced from Pexels (free for commercial use, no attribution required)[reference:0][reference:1]
const mockRestaurants: Restaurant[] = [
  {
    id: 'r1',
    destinationId: 'd1',
    name: 'Le Jardin Secret',
    description: 'An intimate garden setting with exquisite French cuisine.',
    image: 'https://images.pexels.com/photos/260922/pexels-photo-260922.jpeg',
    rating: 4.8,
    reviewsCount: 234,
    priceLevel: '$$$$',
    cuisine: 'French, Mediterranean',
    coordinates: { x: 48.8566, y: 2.3522 }, // Paris, France (lat/lng)
    address: '12 Rue de la Paix, 75001 Paris, France',
    phone: '+33 1 23 45 67 89',
    openingHours: 'Mon‑Sat 19:00‑23:00',
    website: 'https://lejardinsecret.fr',
    featured: true,
    dietaryOptions: ['Vegetarian', 'Gluten‑Free'],
    reservationRequired: true,
  },
  {
    id: 'r2',
    destinationId: 'd2',
    name: 'Sushi Omakase',
    description: 'Authentic Edomae-style sushi in a serene setting.',
    image: 'https://images.pexels.com/photos/2323398/pexels-photo-2323398.jpeg',
    rating: 4.9,
    reviewsCount: 189,
    priceLevel: '$$$',
    cuisine: 'Japanese, Sushi',
    coordinates: { x: 35.6762, y: 139.6503 }, // Tokyo, Japan (lat/lng)
    address: '5-7-1 Ginza, Chuo City, Tokyo',
    phone: '+81 3 1234 5678',
    openingHours: 'Tue‑Sun 17:30‑22:30',
    website: 'https://sushi-omakase.jp',
    featured: true,
    dietaryOptions: ['Gluten‑Free'],
    reservationRequired: true,
  },
  {
    id: 'r3',
    destinationId: 'd1',
    name: 'Café de Flore',
    description: 'Classic Parisian café with legendary history.',
    image: 'https://images.pexels.com/photos/35349451/pexels-photo-35349451.jpeg',
    rating: 4.5,
    reviewsCount: 432,
    priceLevel: '$$',
    cuisine: 'French, Café',
    coordinates: { x: 48.8539, y: 2.3328 }, // Saint-Germain, Paris (lat/lng)
    address: '172 Boulevard Saint-Germain, 75006 Paris',
    phone: '+33 1 45 48 55 26',
    openingHours: 'Daily 07:00‑02:00',
    featured: false,
    dietaryOptions: ['Vegetarian'],
    reservationRequired: false,
  },
  {
    id: 'r4',
    destinationId: 'd3',
    name: 'La Piazza',
    description: 'Authentic Italian trattoria with wood-fired pizzas.',
    image: 'https://images.pexels.com/photos/761854/pexels-photo-761854.jpeg',
    rating: 4.2,
    reviewsCount: 98,
    priceLevel: '$$',
    cuisine: 'Italian, Pizza',
    coordinates: { x: 41.9028, y: 12.4964 }, // Rome, Italy (lat/lng)
    address: 'Piazza Navona 42, 00186 Roma',
    phone: '+39 06 6880 1234',
    openingHours: 'Mon‑Sun 12:00‑23:00',
    featured: false,
    dietaryOptions: ['Vegetarian', 'Vegan'],
    reservationRequired: false,
  },
  {
    id: 'r5',
    destinationId: 'd1',
    name: 'L\'Atelier des Chefs',
    description: 'A culinary workshop where chefs create magic before your eyes.',
    image: 'https://images.pexels.com/photos/1267320/pexels-photo-1267320.jpeg',
    rating: 4.7,
    reviewsCount: 156,
    priceLevel: '$$$',
    cuisine: 'French, Modern',
    coordinates: { x: 48.8749, y: 2.2950 }, // Near Arc de Triomphe, Paris (lat/lng)
    address: '15 Rue de la Grande Armée, Paris',
    phone: '+33 1 98 76 54 32',
    openingHours: 'Tue‑Sat 12:00‑22:00',
    featured: true,
    dietaryOptions: ['Vegetarian'],
    reservationRequired: true,
  },
  {
    id: 'r6',
    destinationId: 'd4',
    name: 'El Faro',
    description: 'Seafood with a view overlooking the Mediterranean.',
    image: 'https://images.pexels.com/photos/12261111/pexels-photo-12261111.jpeg',
    rating: 4.4,
    reviewsCount: 211,
    priceLevel: '$$$',
    cuisine: 'Spanish, Seafood',
    coordinates: { x: 41.3851, y: 2.1734 }, // Barcelona, Spain (lat/lng)
    address: 'Calle del Faro 7, Barcelona',
    phone: '+34 93 123 4567',
    openingHours: 'Mon‑Sun 13:00‑23:00',
    featured: false,
    dietaryOptions: ['Gluten‑Free'],
    reservationRequired: true,
  },
  // Add more as needed
];

export async function fetchRestaurants(filters?: {
  destinationId?: string;
  cuisine?: string;
  minRating?: number;
  maxPriceLevel?: number;
  sort?: string;
}): Promise<Restaurant[]> {
  // Simulate network delay
  await new Promise((res) => setTimeout(res, 300));

  let results = [...mockRestaurants];

  // Apply filters
  if (filters?.destinationId) {
    results = results.filter((r) => r.destinationId === filters.destinationId);
  }
  if (filters?.cuisine) {
    results = results.filter((r) =>
      r.cuisine.toLowerCase().includes(filters.cuisine!.toLowerCase())
    );
  }
  if (filters?.minRating) {
    results = results.filter((r) => r.rating >= filters.minRating!);
  }
  if (filters?.maxPriceLevel) {
    const levels = ['$', '$$', '$$$', '$$$$'];
    results = results.filter((r) => levels.indexOf(r.priceLevel) <= filters.maxPriceLevel!);
  }

  // Apply sorting
  if (filters?.sort) {
    switch (filters.sort) {
      case 'rating':
        results.sort((a, b) => b.rating - a.rating);
        break;
      case 'reviews':
        results.sort((a, b) => b.reviewsCount - a.reviewsCount);
        break;
      case 'price-asc':
        results.sort((a, b) => a.priceLevel.length - b.priceLevel.length);
        break;
      case 'price-desc':
        results.sort((a, b) => b.priceLevel.length - a.priceLevel.length);
        break;
      case 'name':
        results.sort((a, b) => a.name.localeCompare(b.name));
        break;
      default:
        break;
    }
  }

  return results;
}

export async function fetchRestaurantById(id: string): Promise<Restaurant | null> {
  await new Promise((res) => setTimeout(res, 200));
  const found = mockRestaurants.find((r) => r.id === id);
  return found || null;
}