import express from 'express';
import path from 'path';
import next from 'next';
import { GoogleGenAI, Type } from '@google/genai';
import dotenv from 'dotenv';
import helmet from 'helmet';
import cors from 'cors';
import compression from 'compression';
import Joi from 'joi';
import {
  Destination, Hotel, Restaurant, Tour, Review, Booking, Itinerary
} from './src/types';

dotenv.config();

// ----------------------------------------------------------------------
// Configuration
// ----------------------------------------------------------------------
const config = {
  port: parseInt(process.env.PORT || '3000', 10),
  nodeEnv: process.env.NODE_ENV || 'development',
  geminiApiKey: process.env.GEMINI_API_KEY || '',
  isProduction: process.env.NODE_ENV === 'production',
};

// ----------------------------------------------------------------------
// Express App Setup
// ----------------------------------------------------------------------
const app = express();

// Security & performance middleware
app.use(helmet({ contentSecurityPolicy: false }));
app.use(cors({ origin: '*' })); // Restrict in production
app.use(compression());
app.use(express.json({ limit: '10mb' }));

// ----------------------------------------------------------------------
// In‑memory Mock Database (unchanged)
// ----------------------------------------------------------------------
const destinations: Destination[] = [
  {
    id: 'dest-bali',
    name: 'Bali',
    description: 'The Island of the Gods, famous for its forested volcanic mountains, iconic rice paddies, beaches, and coral reefs.',
    country: 'Indonesia',
    image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1200&q=80',
    rating: 4.8,
    reviewsCount: 124,
    price: 499,
    coordinates: { x: 40, y: 65 }
  },
  {
    id: 'dest-tokyo',
    name: 'Tokyo',
    description: 'Japans bustling capital, mixing ultramodern neon skyscrapers with historic temples and exquisite culinary scenes.',
    country: 'Japan',
    image: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=1200&q=80',
    rating: 4.9,
    reviewsCount: 238,
    price: 899,
    coordinates: { x: 55, y: 40 }
  },
  {
    id: 'dest-paris',
    name: 'Paris',
    description: 'The global center for art, fashion, gastronomy, and culture. Its 19th-century cityscape is crisscrossed by wide boulevards and the River Seine.',
    country: 'France',
    image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1200&q=80',
    rating: 4.7,
    reviewsCount: 195,
    price: 799,
    coordinates: { x: 45, y: 35 }
  },
  {
    id: 'dest-ny',
    name: 'New York City',
    description: 'The Big Apple, featuring iconic landmarks like the Statue of Liberty, Times Square, Central Park, and unparalleled energy.',
    country: 'United States',
    image: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?auto=format&fit=crop&w=1200&q=80',
    rating: 4.8,
    reviewsCount: 312,
    price: 999,
    coordinates: { x: 25, y: 45 }
  },
  {
    id: 'dest-india',
    name: 'Rajasthan & Mumbai',
    description: 'A land of brilliant colors, royal palaces, legendary hospitality, and historical architectural masterpieces like the Taj Mahal Palace.',
    country: 'India',
    image: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=1200&q=80',
    rating: 4.9,
    reviewsCount: 142,
    price: 3200,
    coordinates: { x: 42, y: 55 }
  },
  {
    id: 'dest-switzerland',
    name: 'Swiss Alps',
    description: 'An alpine dreamland of snow-covered peaks, pristine glacier lakes, luxury scenic trains, and premier mountain resorts.',
    country: 'Switzerland',
    image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80',
    rating: 4.8,
    reviewsCount: 104,
    price: 4500,
    coordinates: { x: 45, y: 40 }
  }
];

const tours: Tour[] = [
  // Bali Tours
  {
    id: 'tour-bali-sunrise',
    destinationId: 'dest-bali',
    name: 'Mount Batur Volcano Sunrise Trek',
    description: 'An unforgettable early morning hike up Bali\'s active Mount Batur volcano to witness a spectacular sunrise above the clouds.',
    image: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=800&q=80',
    rating: 4.8,
    reviewsCount: 45,
    pricePerPerson: 75,
    duration: '7 Hours',
    coordinates: { x: 48, y: 45 }
  },
  {
    id: 'tour-bali-temples',
    destinationId: 'dest-bali',
    name: 'Uluwatu Sunset Temple & Kecak Dance Tour',
    description: 'Explore the spectacular sea cliff temple of Uluwatu and watch a mesmerizing traditional Kecak fire dance against the setting sun.',
    image: 'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=800&q=80',
    rating: 4.7,
    reviewsCount: 38,
    pricePerPerson: 45,
    duration: '5 Hours',
    coordinates: { x: 32, y: 80 }
  },
  {
    id: 'tour-bali-scuba',
    destinationId: 'dest-bali',
    name: 'Tulamben USAT Liberty Shipwreck Scuba Dive',
    description: 'Dive one of the world\'s most accessible WWII shipwrecks, home to rich marine life, vibrant coral gardens, and schools of jackfish.',
    image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=800&q=80',
    rating: 4.9,
    reviewsCount: 22,
    pricePerPerson: 110,
    duration: '8 Hours',
    coordinates: { x: 65, y: 35 }
  },
  // Tokyo Tours
  {
    id: 'tour-tokyo-fuji',
    destinationId: 'dest-tokyo',
    name: 'Mt. Fuji & Lake Kawaguchi Scenic Tour',
    description: 'A beautiful journey from Tokyo to Mount Fuji\'s 5th Station, followed by an elegant cruise on Lake Kawaguchi and ride up Mount Kachi Kachi Ropeway.',
    image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=800&q=80',
    rating: 4.9,
    reviewsCount: 92,
    pricePerPerson: 120,
    duration: '10 Hours',
    coordinates: { x: 25, y: 70 }
  },
  {
    id: 'tour-tokyo-streetfood',
    destinationId: 'dest-tokyo',
    name: 'Shibuya Night Street Food & Bar Crawl',
    description: 'Immerse yourself in Shibuya\'s glowing backalleys, tasting authentic yakitori, gyoza, okonomiyaki, and highballs alongside a local guide.',
    image: 'https://images.unsplash.com/photo-1543007630-9710e4a00a20?auto=format&fit=crop&w=800&q=80',
    rating: 4.8,
    reviewsCount: 61,
    pricePerPerson: 65,
    duration: '3.5 Hours',
    coordinates: { x: 42, y: 55 }
  },
  // Paris Tours
  {
    id: 'tour-paris-seine',
    destinationId: 'dest-paris',
    name: 'Eiffel Tower Access & Seine River Dinner Cruise',
    description: 'Behold Paris illuminated from the peak of the Eiffel Tower, then enjoy a three-course gourmet French dinner floating down the historic Seine.',
    image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=800&q=80',
    rating: 4.6,
    reviewsCount: 112,
    pricePerPerson: 145,
    duration: '4 Hours',
    coordinates: { x: 35, y: 52 }
  },
  {
    id: 'tour-paris-louvre',
    destinationId: 'dest-paris',
    name: 'Louvre Museum Guided Masterpieces Skip-the-Line',
    description: 'Unlock secrets of the world\'s largest art museum with an expert art historian, highlighting the Mona Lisa, Venus de Milo, and Winged Victory.',
    image: 'https://images.unsplash.com/photo-1565008447742-97f6f38c985c?auto=format&fit=crop&w=800&q=80',
    rating: 4.8,
    reviewsCount: 88,
    pricePerPerson: 80,
    duration: '3 Hours',
    coordinates: { x: 52, y: 45 }
  },
  // New York Tours
  {
    id: 'tour-ny-skyline',
    destinationId: 'dest-ny',
    name: 'Helicopter Flight Over Manhattan Skyline',
    description: 'An exhilarating aerial flight offering panoramic bird\'s-eye views of the Statue of Liberty, Central Park, Empire State Building, and Brooklyn Bridge.',
    image: 'https://images.unsplash.com/photo-1534430480872-3498386e7a0c?auto=format&fit=crop&w=800&q=80',
    rating: 4.9,
    reviewsCount: 74,
    pricePerPerson: 220,
    duration: '20 Mins',
    coordinates: { x: 38, y: 62 }
  },
  {
    id: 'tour-ny-broadway',
    destinationId: 'dest-ny',
    name: 'Broadway Insider Walking Tour & Show Access',
    description: 'Hear backstage gossip and theater history from a real Broadway performer, ending with a premium reserved orchestra ticket to a top-tier musical.',
    image: 'https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&w=800&q=80',
    rating: 4.7,
    reviewsCount: 46,
    pricePerPerson: 165,
    duration: '5 Hours',
    coordinates: { x: 52, y: 34 }
  },
  {
    id: 'tour-rajasthan',
    destinationId: 'dest-india',
    name: 'Royal Rajasthan Trail',
    description: 'A grand luxury traverse through Rajasthan. Behold the pink palaces of Jaipur, the majestic blue city of Jodhpur, and the romantic lake pavilions of Udaipur.',
    image: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=800&q=80',
    rating: 4.9,
    reviewsCount: 88,
    pricePerPerson: 3200,
    duration: '10 Days',
    coordinates: { x: 30, y: 55 }
  },
  {
    id: 'tour-alpine',
    destinationId: 'dest-switzerland',
    name: 'Alpine Luxury Express',
    description: 'Journey through the clouds on a breathtaking rail expedition. Traverse from cosmopolitan Zurich, around the iconic Matterhorn at Zermatt, ending in elite St. Moritz.',
    image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80',
    rating: 4.8,
    reviewsCount: 65,
    pricePerPerson: 4500,
    duration: '7 Days',
    coordinates: { x: 45, y: 40 }
  },
  {
    id: 'tour-kyoto-neon',
    destinationId: 'dest-tokyo',
    name: 'Kyoto Zen & Tokyo Neon',
    description: 'An elite curated contrast of old and new. Soak in Tokyo\'s cyber-punk neon corridors, find absolute inner peace in Hakone\'s mountain shrines, and behold Kyoto\'s classical temples.',
    image: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=800&q=80',
    rating: 4.9,
    reviewsCount: 112,
    pricePerPerson: 3800,
    duration: '8 Days',
    coordinates: { x: 50, y: 48 }
  }
];

const hotels: Hotel[] = [
  // Bali Hotels
  {
    id: 'hotel-bali-viceroy',
    destinationId: 'dest-bali',
    name: 'Viceroy Bali Jungle Resort',
    description: 'A luxurious sanctuary perched over the stunning Valley of the Kings in Ubud, featuring private infinity plunge pools and bespoke spa facilities.',
    image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=800&q=80',
    rating: 4.9,
    reviewsCount: 42,
    pricePerNight: 450,
    category: 'Luxury',
    coordinates: { x: 50, y: 30 }
  },
  {
    id: 'hotel-bali-canggu',
    destinationId: 'dest-bali',
    name: 'The Layar Designer Villas',
    description: 'A stunning boutique retreat in Seminyak boasting signature cutting-edge architecture, wide open-plan living areas, and tropical private gardens.',
    image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80',
    rating: 4.6,
    reviewsCount: 29,
    pricePerNight: 240,
    category: 'Boutique',
    coordinates: { x: 30, y: 60 }
  },
  {
    id: 'hotel-bali-ecobamboo',
    destinationId: 'dest-bali',
    name: 'Eco Bamboo Hideout Bali',
    description: 'An eco-luxury bamboo cabin nestled in the rural rice terraces of Selat, offering a fully open-air immersive jungle sleep and outdoor stone bath.',
    image: 'https://images.unsplash.com/photo-1583037189850-1921ae7c6c22?auto=format&fit=crop&w=800&q=80',
    rating: 4.8,
    reviewsCount: 31,
    pricePerNight: 120,
    category: 'Resort',
    coordinates: { x: 60, y: 40 }
  },
  // Tokyo Hotels
  {
    id: 'hotel-tokyo-rhythm',
    destinationId: 'dest-tokyo',
    name: 'The Tokyo Station Hotel',
    description: 'Housed inside the iconic red-brick Tokyo Station building, offering a grand blend of classic European luxury and exquisite Japanese service.',
    image: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=800&q=80',
    rating: 4.9,
    reviewsCount: 55,
    pricePerNight: 390,
    category: 'Luxury',
    coordinates: { x: 62, y: 48 }
  },
  {
    id: 'hotel-tokyo-capsule',
    destinationId: 'dest-tokyo',
    name: 'Nine Hours Capsule Hotel Shinjuku',
    description: 'A sleek, sci-fi modular sleep experience. Uncompromised minimalist design, capsule climate control, and ultra-high-speed showers.',
    image: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&w=800&q=80',
    rating: 4.4,
    reviewsCount: 78,
    pricePerNight: 48,
    category: 'Budget',
    coordinates: { x: 35, y: 46 }
  },
  // Paris Hotels
  {
    id: 'hotel-paris-ritz',
    destinationId: 'dest-paris',
    name: 'Ritz Paris Place Vendôme',
    description: 'One of the world\'s most legendary grand hotels, displaying unmatched gold-gilded royalty, fine dining, and historical elegance.',
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80',
    rating: 4.9,
    reviewsCount: 64,
    pricePerNight: 850,
    category: 'Luxury',
    coordinates: { x: 45, y: 40 }
  },
  {
    id: 'hotel-paris-marais',
    destinationId: 'dest-paris',
    name: 'Hotel de Neuve Marais',
    description: 'A colorful, ultra-chic boutique hotel situated in the artsy, vibrant streets of historic Le Marais, minutes from charming cafes.',
    image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=800&q=80',
    rating: 4.5,
    reviewsCount: 42,
    pricePerNight: 160,
    category: 'Boutique',
    coordinates: { x: 55, y: 48 }
  },
  // New York Hotels
  {
    id: 'hotel-ny-plaza',
    destinationId: 'dest-ny',
    name: 'The Plaza Hotel Fifth Avenue',
    description: 'The premier luxury hotel in New York, positioned directly next to Central Park. A magnificent destination of French-Renaissance styling.',
    image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=800&q=80',
    rating: 4.8,
    reviewsCount: 110,
    pricePerNight: 620,
    category: 'Luxury',
    coordinates: { x: 50, y: 28 }
  },
  {
    id: 'hotel-ny-pod',
    destinationId: 'dest-ny',
    name: 'Pod 39 Budget Design Hotel',
    description: 'Smart, small spaces with brilliant high-energy layouts and a superb rooftop bar with views over Mid-Town Manhattan.',
    image: 'https://images.unsplash.com/photo-1517840901100-8179e982ca41?auto=format&fit=crop&w=800&q=80',
    rating: 4.3,
    reviewsCount: 95,
    pricePerNight: 115,
    category: 'Budget',
    coordinates: { x: 54, y: 48 }
  },
  {
    id: 'hotel-taj-mahal',
    destinationId: 'dest-india',
    name: 'The Taj Mahal Palace',
    description: 'The crown jewel of Indian luxury hotels, positioned majestically overlooking the Gateway of India in Mumbai. Displaying stellar colonial charm and royal heritage rooms.',
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80',
    rating: 4.9,
    reviewsCount: 145,
    pricePerNight: 450,
    category: 'Luxury',
    coordinates: { x: 30, y: 70 }
  },
  {
    id: 'hotel-badrutts',
    destinationId: 'dest-switzerland',
    name: 'Badrutt\'s Palace Hotel',
    description: 'The legendary alpine sanctuary in St. Moritz offering majestic lake views, elite skiing concierge, and world-class culinary excellence since 1896.',
    image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=800&q=80',
    rating: 4.9,
    reviewsCount: 78,
    pricePerNight: 850,
    category: 'Luxury',
    coordinates: { x: 50, y: 35 }
  },
  {
    id: 'hotel-aman-tokyo',
    destinationId: 'dest-tokyo',
    name: 'Aman Tokyo',
    description: 'A sanctuary at the top of Otemachi Tower, blending traditional Japanese materials like Washi paper, stone and wood with ultra-modern luxury.',
    image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=800&q=80',
    rating: 5.0,
    reviewsCount: 64,
    pricePerNight: 950,
    category: 'Luxury',
    coordinates: { x: 60, y: 40 }
  }
];

const restaurants: Restaurant[] = [
  // Bali Restaurants
  {
    id: 'rest-bali-locavore',
    destinationId: 'dest-bali',
    name: 'Locavore Fine Dining Ubud',
    description: 'An extraordinary ingredient-driven dining concept highlighting 100% locally sourced Indonesian meats, greens, and spices.',
    image: 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=800&q=80',
    rating: 4.9,
    reviewsCount: 56,
    priceLevel: '$$$',
    cuisine: 'Modern Indonesian',
    coordinates: { x: 45, y: 38 }
  },
  {
    id: 'rest-bali-nuri',
    destinationId: 'dest-bali',
    name: 'Naughty Nuri\'s Warung',
    description: 'A global landmark in Ubud famous for its smoky, sticky finger-licking pork ribs, stellar martinis, and chaotic high-energy rock vibe.',
    image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80',
    rating: 4.7,
    reviewsCount: 88,
    priceLevel: '$$',
    cuisine: 'Indonesian BBQ',
    coordinates: { x: 41, y: 46 }
  },
  // Tokyo Restaurants
  {
    id: 'rest-tokyo-jiro',
    destinationId: 'dest-tokyo',
    name: 'Sukiyabashi Jiro Roppongi',
    description: 'An elite sushi shrine run by Jiro Ono\'s son. Experience the pure craft of traditional Edo-style nigiri in a meticulous 10-seat environment.',
    image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=800&q=80',
    rating: 4.9,
    reviewsCount: 41,
    priceLevel: '$$$',
    cuisine: 'Traditional Sushi',
    coordinates: { x: 48, y: 56 }
  },
  {
    id: 'rest-tokyo-ichiran',
    destinationId: 'dest-tokyo',
    name: 'Ichiran Ramen Shinjuku',
    description: 'The world-famous tonkotsu ramen house, featuring individualized solo dining booths and fully customizable rich pork bone broth orders.',
    image: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=800&q=80',
    rating: 4.6,
    reviewsCount: 145,
    priceLevel: '$',
    cuisine: 'Hakata Tonkotsu Ramen',
    coordinates: { x: 38, y: 40 }
  },
  // Paris Restaurants
  {
    id: 'rest-paris-ambroisie',
    destinationId: 'dest-paris',
    name: 'L\'Ambroisie',
    description: 'A classical French haute cuisine masterpiece located in an elegant townhouse in Place des Vosges, holding 3 Michelin stars since 1986.',
    image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=800&q=80',
    rating: 4.9,
    reviewsCount: 34,
    priceLevel: '$$$',
    cuisine: 'Classic French Haute',
    coordinates: { x: 58, y: 45 }
  },
  {
    id: 'rest-paris-creperie',
    destinationId: 'dest-paris',
    name: 'Breizh Café Le Marais',
    description: 'Gourmet, crispy buckwheat galettes stuffed with artisanal French cheese, ham, organic butter, and served with craft Breton apple ciders.',
    image: 'https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=800&q=80',
    rating: 4.7,
    reviewsCount: 92,
    priceLevel: '$',
    cuisine: 'Breton Galettes',
    coordinates: { x: 53, y: 50 }
  },
  // New York Restaurants
  {
    id: 'rest-ny-bernardin',
    destinationId: 'dest-ny',
    name: 'Le Bernardin',
    description: 'Eric Ripert\'s legendary, sophisticated temple of seafood, consistently rated as one of the best fine dining restaurants in the world.',
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80',
    rating: 4.9,
    reviewsCount: 120,
    priceLevel: '$$$',
    cuisine: 'Fine French Seafood',
    coordinates: { x: 48, y: 40 }
  },
  {
    id: 'rest-ny-katz',
    destinationId: 'dest-ny',
    name: 'Katz\'s Delicatessen',
    description: 'An iconic, legendary Jewish deli in the Lower East Side serving sky-high, hand-carved, slow-cured pastrami on rye since 1888.',
    image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80',
    rating: 4.7,
    reviewsCount: 280,
    priceLevel: '$$',
    cuisine: 'Classic Kosher Deli',
    coordinates: { x: 51, y: 65 }
  },
  {
    id: 'rest-india-peshawri',
    destinationId: 'dest-india',
    name: 'Peshawri Fine Dining',
    description: 'Savor the rich, authentic flavors of the Northwest Frontier. Feast on tender, clay-oven cooked kebabs, tandoori items, and our legendary slow-cooked Dal Bukhara.',
    image: 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=800&q=80',
    rating: 4.8,
    reviewsCount: 92,
    priceLevel: '$$$',
    cuisine: 'Northwest Indian BBQ',
    coordinates: { x: 45, y: 45 }
  },
  {
    id: 'rest-swiss-vrony',
    destinationId: 'dest-switzerland',
    name: 'Chez Vrony St. Moritz',
    description: 'An iconic, rustic-chic mountain cabin nestled at 2100m, offering organic cheese fondues, prime dry-aged Alpine beef, and panoramic views of the Swiss Alps.',
    image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=800&q=80',
    rating: 4.9,
    reviewsCount: 110,
    priceLevel: '$$$',
    cuisine: 'Alpine Swiss Cuisine',
    coordinates: { x: 55, y: 42 }
  }
];

// ----------------------------------------------------------------------
// Cruises & Charters Database
// ----------------------------------------------------------------------
interface CruiseOrCharter {
  id: string;
  type: 'cruise' | 'jet' | 'yacht' | 'estate';
  name: string;
  description: string;
  destination?: string;
  price: string;
  duration?: string;
  vessel?: string;
  embarkation?: string;
  route?: string;
  capacity?: string;
  activities?: string[];
  highlights?: string[];
  amenities?: string[];
}

const cruisesAndCharters: CruiseOrCharter[] = [
  {
    id: "polar-expedition",
    type: "cruise",
    name: "The Polar Expedition",
    description: "An extraordinary journey through dramatic glacial channels, towering icebergs, and pristine polar wilderness. Sail on the reinforced PC6 polar vessel MV Magellan Explorer.",
    destination: "Antarctica & Arctic",
    price: "$8,500/person",
    duration: "12 Days",
    vessel: "MV Magellan Explorer",
    embarkation: "Ushuaia, Argentina",
    route: "Ushuaia → Drake Passage → Antarctic Peninsula → South Shetland Islands",
    activities: ["Zodiac shore landings", "Helicopter polar scouting", "Penguin colony walks", "Marine biology science presentations", "Optional Polar Plunge challenge"],
    highlights: ["Interactive marine life spotting", "Up-close glacier fjord cruises", "Glaciology expert lectures"]
  },
  {
    id: "mediterranean-charter",
    type: "cruise",
    name: "Mediterranean Ultra-Luxe Cruise",
    description: "An ultra-exclusive mega yacht voyage sailing through the sparkling waters of the French Riviera, Amalfi Coast, and Cyclades islands.",
    destination: "Monaco, Italy & Greece",
    price: "$12,400/person",
    duration: "9 Days",
    vessel: "The Solaris II Mega Yacht",
    embarkation: "Naples, Italy",
    route: "Monaco → Amalfi Coast → Aeolian Islands → Cyclades & Santorini → Mykonos",
    activities: ["Stern folding beach club access", "Onboard thermal spa & hot stone sauna", "Michelin-starred culinary tastings", "Private tender excursions to secluded coves"],
    highlights: ["Sunset Champagne on helideck", "VIP beach club access", "Tailored shore experiences"]
  },
  {
    id: "nile-sanctuary",
    type: "cruise",
    name: "Nile Royal Sanctuary",
    description: "A majestic river sailing in Egypt aboard a traditional, opulent Dahabiya boat, discovering thousands of years of pharaonic history.",
    destination: "Egypt (Luxor to Aswan)",
    price: "$6,800/person",
    duration: "8 Days",
    vessel: "The Dahabiya Cleopatra",
    embarkation: "Luxor, Egypt",
    route: "Luxor → Esna → Edfu → Kom Ombo → Aswan",
    activities: ["Private Egyptologist-guided temple visits", "Starlight dining next to historic ruins", "Traditional sunset felucca sailing", "Local organic culinary experiences"],
    highlights: ["Valley of the Kings private access", "Kom Ombo moonlit temple tour", "Aswan traditional Nubian musical evening"]
  },
  {
    id: "south-pacific-atolls",
    type: "cruise",
    name: "South Pacific Atoll Explorer",
    description: "A luxury multi-hull catamaran voyage navigating the pristine turquoise lagoons, coral atolls, and volcanic peaks of French Polynesia and Fiji.",
    destination: "Fiji, Tonga & French Polynesia",
    price: "$9,950/person",
    duration: "14 Days",
    vessel: "Le Pacific Wind Catamaran",
    embarkation: "Papeete, Tahiti",
    route: "Tahiti → Moorea → Bora Bora → Tuamotu Archipelago → Marquesas Wild Peaks → Return",
    activities: ["PADI master-guided reef diving", "Overwater glass-floor suite lodging", "Private uninhabited island beach barbecues", "Traditional Polynesian sailing canoe trips"],
    highlights: ["Snorkeling with manta rays", "Bespoke vanilla farm tours", "Overwater starlight cinema"]
  },
  {
    id: "jet-g650",
    type: "jet",
    name: "Gulfstream G650ER Heavy Jet",
    description: "The absolute pinnacle of business aviation. Boasts a maximum range of 7,500 nautical miles, whisper-quiet cabin acoustics, and modular sleeping berths.",
    capacity: "Up to 16 passengers",
    price: "$12,000/hr",
    amenities: ["🍷 Curated caviar & vintage tasting bar", "🛏️ Custom hand-stitched leather master stateroom", "🌐 Ka-Band high-speed orbital satellite Wi-Fi", "👤 Onboard personal flight coordinator"]
  },
  {
    id: "jet-global7500",
    type: "jet",
    name: "Bombardier Global 7500 Ultra Jet",
    description: "Featuring four distinct living zones, a full-size kitchen, and specialized ergonomic crew suites designed to alleviate long-distance travel fatigue.",
    capacity: "Up to 19 passengers",
    price: "$14,500/hr",
    amenities: ["🍽️ Michelin-level dynamic gourmet kitchen", "🛁 En-suite shower & premium French body lotions", "🛋️ Nuage zero-gravity lounge chairs", "🔇 Advanced sound suppression insulation"]
  },
  {
    id: "yacht-solaris",
    type: "yacht",
    name: "The Solaris 120m Mega Yacht",
    description: "A bespoke steel-hulled visual masterpiece featuring a dual helipad network, fully glass-backed swimming pool, and custom onboard beach club.",
    capacity: "Up to 36 guests",
    price: "$28,000/hr",
    amenities: ["🚁 Dual heli-decks for rapid arrival", "🏊 Glass-bottom thermal pool & sauna complex", "🌊 Custom water sports garage with jet skis", "🥂 40-member specialized elite hospitality crew"]
  },
  {
    id: "island-necker",
    type: "estate",
    name: "Necker Island Private Island Retreat",
    description: "Located in the stunning Caribbean, offering complete isolation, crystal coral lagoons, and customized luxury thatched Balinese-style villas.",
    capacity: "Exclusive buyouts only",
    price: "$105,000/night",
    amenities: ["🌴 Complete 74-acre private island access", "⛵ Catamaran charters and deep reef dive gear", "🍽️ All-inclusive gourmet dining & open bar", "🎾 Personalized professional tennis coaches"]
  }
];

const reviews: Review[] = [
  {
    id: 'rev-1',
    targetId: 'tour-bali-sunrise',
    targetType: 'tour',
    author: 'Elena Rostova',
    rating: 5,
    comment: 'Waking up at 2 AM was tough, but standing above the cloud line as the sun broke over Mt. Abang and Lombok was a defining moment of my life. Highly professional guide!',
    date: 'June 18, 2026'
  },
  {
    id: 'rev-2',
    targetId: 'tour-bali-sunrise',
    targetType: 'tour',
    author: 'Marcus Vance',
    rating: 4,
    comment: 'Spectacular views! The hike is moderately steep, so wear solid sneakers. Guide was super supportive and boiled eggs on steam venting from the active craters.',
    date: 'May 30, 2026'
  },
  {
    id: 'rev-3',
    targetId: 'hotel-bali-viceroy',
    targetType: 'hotel',
    author: 'Sarah Jenkins',
    rating: 5,
    comment: 'Absolutely breathtaking jungle sanctuary. The infinity pool overlooks a deep valley shroud in tropical mist. Service is unparalleled—they anticipate everything.',
    date: 'June 25, 2026'
  },
  {
    id: 'rev-4',
    targetId: 'rest-tokyo-ichiran',
    targetType: 'restaurant',
    author: 'David Chen',
    rating: 5,
    comment: 'The absolute gold standard of quick comfort food. The individual eating booths let you concentrate fully on the incredible, rich pork bone flavor. The spicy red sauce is a must!',
    date: 'July 01, 2026'
  },
  {
    id: 'rev-5',
    targetId: 'tour-tokyo-fuji',
    targetType: 'tour',
    author: 'Chloe Dupont',
    rating: 5,
    comment: 'We got lucky with perfectly clear blue sky over Mt Fuji! The views from the lake cruise are postcard perfect. Tour bus was clean and on time.',
    date: 'June 14, 2026'
  }
];

const bookings: Booking[] = [
  {
    id: 'book-1',
    targetId: 'tour-bali-sunrise',
    targetType: 'tour',
    targetName: 'Mount Batur Volcano Sunrise Trek',
    targetImage: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=800&q=80',
    date: '2026-07-10',
    quantity: 2,
    totalPrice: 150,
    status: 'confirmed'
  },
  {
    id: 'book-2',
    targetId: 'hotel-tokyo-rhythm',
    targetType: 'hotel',
    targetName: 'The Tokyo Station Hotel',
    targetImage: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=800&q=80',
    date: '2026-07-15',
    quantity: 3,
    totalPrice: 1170,
    status: 'confirmed'
  }
];

// ----------------------------------------------------------------------
// Helper: Update rating after review
// ----------------------------------------------------------------------
function updateTargetRating(targetId: string, targetType: string, newRating: number) {
  let item: { rating: number; reviewsCount: number } | undefined;
  if (targetType === 'tour') item = tours.find(t => t.id === targetId);
  else if (targetType === 'hotel') item = hotels.find(h => h.id === targetId);
  else if (targetType === 'restaurant') item = restaurants.find(r => r.id === targetId);
  else if (targetType === 'destination') item = destinations.find(d => d.id === targetId);
  if (item) {
    const total = item.rating * item.reviewsCount + newRating;
    item.reviewsCount += 1;
    item.rating = Number((total / item.reviewsCount).toFixed(1));
  }
}

// ----------------------------------------------------------------------
// Validation Schemas (Joi)
// ----------------------------------------------------------------------
const reviewSchema = Joi.object({
  targetId: Joi.string().required(),
  targetType: Joi.string().valid('tour', 'hotel', 'restaurant', 'destination').required(),
  author: Joi.string().min(1).required(),
  rating: Joi.number().integer().min(1).max(5).required(),
  comment: Joi.string().min(1).required(),
});

const bookingSchema = Joi.object({
  targetId: Joi.string().required(),
  targetType: Joi.string().valid('tour', 'hotel', 'restaurant').required(),
  targetName: Joi.string().required(),
  targetImage: Joi.string().uri().optional(),
  date: Joi.string().isoDate().required(),
  quantity: Joi.number().integer().min(1).required(),
  totalPrice: Joi.number().min(0).required(),
});

const chatSchema = Joi.object({
  message: Joi.string().min(1).required(),
  history: Joi.array().items(Joi.object({
    role: Joi.string().valid('user', 'assistant').required(),
    text: Joi.string().required(),
  })).optional(),
  user: Joi.object({
    name: Joi.string(),
    email: Joi.string().email(),
    tier: Joi.string(),
    points: Joi.number(),
  }).optional(),
});

const itinerarySchema = Joi.object({
  destination: Joi.string().min(1).required(),
  days: Joi.number().integer().min(1).max(7).required(),
  budget: Joi.string().valid('budget', 'moderate', 'luxury').default('moderate'),
  interests: Joi.array().items(Joi.string()).default([]),
  notes: Joi.string().allow('').optional(),
});

// ----------------------------------------------------------------------
// Validation Middleware
// ----------------------------------------------------------------------
const validate = (schema: Joi.ObjectSchema) => {
  return (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const { error } = schema.validate(req.body);
    if (error) {
      return res.status(400).json({
        error: 'Validation Error',
        details: error.details.map(d => d.message),
      });
    }
    next();
  };
};

// ----------------------------------------------------------------------
// AI Client (Gemini) with fallback
// ----------------------------------------------------------------------
let ai: GoogleGenAI | null = null;
if (config.geminiApiKey) {
  try {
    ai = new GoogleGenAI({
      apiKey: config.geminiApiKey,
      httpOptions: { headers: { 'User-Agent': 'aistudio-build' } },
    });
    console.log('[AI] Gemini initialized.');
  } catch (err) {
    console.error('[AI] Initialization failed:', err);
  }
} else {
  console.log('[AI] No GEMINI_API_KEY – using fallback modes.');
}

async function generateContentWithFallback(params: {
  model: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  contents: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  config?: any;
}): Promise<{ text?: string; functionCalls?: unknown[] }> {
  if (!ai) throw new Error('Gemini not initialized');
  const primary = 'gemini-3.5-flash';
  const fallback = 'gemini-3.1-flash-lite';
  const { model: _, ...restParams } = params;
  try {
    const res = await ai.models.generateContent({
      model: primary,
      ...restParams,
    });
    return res as { text?: string; functionCalls?: unknown[] };
  } catch (err) {
    console.log(`[AI] Primary model transition to fallback (Info: ${err instanceof Error ? err.message : String(err)})`);
    try {
      console.log(`[AI] Querying fallback model ${fallback}...`);
      const res = await ai.models.generateContent({
        model: fallback,
        ...restParams,
      });
      return res as { text?: string; functionCalls?: unknown[] };
    } catch (fallbackErr) {
      console.log(`[AI] Fallback transition completed (Info: ${fallbackErr instanceof Error ? fallbackErr.message : String(fallbackErr)})`);
      throw fallbackErr;
    }
  }
}

// ----------------------------------------------------------------------
// Fallback replies for chat (constant)
// ----------------------------------------------------------------------
const FALLBACK_REPLIES = [
  `Certainly. Wanderluxe provides unmatched access to premier locations like Paris, Bali, Tokyo, and New York. We can arrange a private helicopter flight or a reservation at a three-Michelin-starred establishment at your convenience. What details may I gather?`,
  `An exquisite inquiry. Our private air charter itineraries, including our Gulfstream G650ER and Bombardier Global 7500 fleets, are fully customisable. Stays at properties like the Ritz Paris or Viceroy Bali are backed by our 24/7 elite butler network. How should we proceed?`,
  `My absolute pleasure. All flight sheets and resort check-ins are handled with utmost discretion. For your journey, I highly recommend our Mount Batur Sunrise Trek in Bali or a curated night food crawl through Shibuya's hidden lanes. Shall I schedule a booking?`,
];

// ----------------------------------------------------------------------
// REST API Endpoints (with validation & error handling)
// ----------------------------------------------------------------------

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Destinations
app.get('/api/destinations', (req, res, next) => {
  try { res.json(destinations); } catch (err) { next(err); }
});

// Tours
app.get('/api/tours', (req, res, next) => {
  try {
    const { destId } = req.query;
    const result = destId ? tours.filter(t => t.destinationId === destId) : tours;
    res.json(result);
  } catch (err) { next(err); }
});

// Hotels
app.get('/api/hotels', (req, res, next) => {
  try {
    const { destId } = req.query;
    const result = destId ? hotels.filter(h => h.destinationId === destId) : hotels;
    res.json(result);
  } catch (err) { next(err); }
});

// Restaurants
app.get('/api/restaurants', (req, res, next) => {
  try {
    const { destId, destinationId, cuisine, minRating, maxPriceLevel, sort } = req.query;
    let result = [...restaurants];

    const targetDestId = (destId || destinationId) as string | undefined;
    if (targetDestId) {
      result = result.filter(r => r.destinationId === targetDestId);
    }

    if (cuisine) {
      const searchCuisine = (cuisine as string).toLowerCase();
      result = result.filter(r => 
        r.cuisine.toLowerCase().includes(searchCuisine) ||
        r.name.toLowerCase().includes(searchCuisine)
      );
    }

    if (minRating) {
      result = result.filter(r => r.rating >= parseFloat(minRating as string));
    }

    if (maxPriceLevel) {
      const levels = ['$', '$$', '$$$', '$$$$'];
      const maxPriceIdx = parseInt(maxPriceLevel as string, 10);
      result = result.filter((r) => levels.indexOf(r.priceLevel) <= maxPriceIdx);
    }

    if (sort) {
      switch (sort as string) {
        case 'rating':
          result.sort((a, b) => b.rating - a.rating);
          break;
        case 'reviews':
          result.sort((a, b) => b.reviewsCount - a.reviewsCount);
          break;
        case 'price-asc':
          result.sort((a, b) => a.priceLevel.length - b.priceLevel.length);
          break;
        case 'price-desc':
          result.sort((a, b) => b.priceLevel.length - a.priceLevel.length);
          break;
        case 'name':
          result.sort((a, b) => a.name.localeCompare(b.name));
          break;
        default:
          break;
      }
    }

    res.json(result);
  } catch (err) { 
    next(err); 
  }
});

app.get('/api/restaurants/:id', (req, res, next) => {
  try {
    const restaurant = restaurants.find(r => r.id === req.params.id);
    if (!restaurant) {
      return res.status(404).json({ error: 'Restaurant not found' });
    }
    res.json(restaurant);
  } catch (err) { 
    next(err); 
  }
});

// Reviews
app.get('/api/reviews/:targetId', (req, res, next) => {
  try {
    const filtered = reviews.filter(r => r.targetId === req.params.targetId);
    res.json(filtered);
  } catch (err) { next(err); }
});

app.post('/api/reviews', validate(reviewSchema), (req, res, next) => {
  try {
    const { targetId, targetType, author, rating, comment } = req.body;
    const newReview: Review = {
      id: `rev-${Date.now()}`,
      targetId,
      targetType,
      author,
      rating: Number(rating),
      comment,
      date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
    };
    reviews.unshift(newReview);
    updateTargetRating(targetId, targetType, Number(rating));
    res.status(201).json(newReview);
  } catch (err) { next(err); }
});

// Bookings
app.get('/api/bookings', (req, res, next) => {
  try { res.json(bookings); } catch (err) { next(err); }
});

app.post('/api/bookings', validate(bookingSchema), (req, res, next) => {
  try {
    const { targetId, targetType, targetName, targetImage, date, quantity, totalPrice } = req.body;
    const newBooking: Booking = {
      id: `book-${Date.now()}`,
      targetId,
      targetType,
      targetName,
      targetImage: targetImage || 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
      date,
      quantity: Number(quantity),
      totalPrice: Number(totalPrice),
      status: 'confirmed',
    };
    bookings.unshift(newBooking);
    // Simulate sales increment
    const item = tours.find(t => t.id === targetId) ||
                 hotels.find(h => h.id === targetId) ||
                 restaurants.find(r => r.id === targetId);
    if (item && 'reviewsCount' in item) {
      item.reviewsCount += 1;
    }
    res.status(201).json({ success: true, booking: newBooking });
  } catch (err) { next(err); }
});

app.post('/api/bookings/:id/cancel', (req, res, next) => {
  try {
    const booking = bookings.find(b => b.id === req.params.id);
    if (!booking) {
      return res.status(404).json({ error: 'Booking not found' });
    }
    booking.status = 'cancelled';
    res.json({ success: true, booking });
  } catch (err) { next(err); }
});

// ----------------------------------------------------------------------
// Gemini AI Chatbot Concierge (with tools & fallback)
// ----------------------------------------------------------------------
app.post('/api/chat', validate(chatSchema), async (req, res, next) => {
  try {
    const { message, history, user } = req.body;

    const memberStatusText = user?.name
      ? `- Active user ${user.name} (Email: ${user.email}) holds '${user.tier}' status with ${user.points?.toLocaleString() || 0} reward points. Address them by name.`
      : `- Anonymous Guest. Address as "Esteemed Guest" or "Valued Guest". Encourage sign-up.`;

    const systemInstruction = `You are "Wanderluxe ai helper", a highly knowledgeable, friendly, and professional digital Travel Concierge. Your goal is to help users discover, plan, and book the perfect trip. You specialize in matching users with the best hotels, restaurants, tourist attractions, ultra-luxury cruises (such as The Polar Expedition, Mediterranean Ultra-Luxe, Nile Royal Sanctuary, and South Pacific Atoll Explorer), and private air/sea charters (jets, yachts, and private estates) based on their preferences.

Response Guidelines & Tone:
1. Conversational & Welcoming: Speak with the enthusiasm and warmth of a professional local tour guide.
2. Structured & Scannable: Use markdown, bullet points, and bold text to present itineraries, hotel options, food menus, cruises, or charters.
3. Transparent: Always clearly state prices, ratings, and locations if available.
4. Action-Oriented: Encourage next steps.

Contextual Awareness:
- You have live tools to fetch hotels, tours, restaurants, and user bookings, and even perform/cancel bookings. Always prefer using tools to fetch or modify data when needed.
- You have complete knowledge of our private aviation fleet, superyachts, private estates, and luxury cruises. Speak about them with high prestige and deep detail.
- NEVER invent prices, availability, or ratings that are not present in the live database or specified catalogs.

Policies & Discretion:
- Privacy: We keep all traveler manifests and flight logs stored in fully encrypted isolated cloud databases.
- Cancellations: Private air charters must be logged 48 hours prior to runway taxi.
- Currency & Exchange Rates: We support multiple currencies dynamically based on USD ($) base rate. Always use these exact conversion rates in your replies and calculations:
  * USD ($): 1.0
  * EUR (€): 0.92
  * GBP (£): 0.78
  * JPY (¥): 155.0
  * INR (₹): 96.5 (For example, $4,500 USD is exactly ₹4,34,250 INR per person)
- Security: All flights and yachts are staffed by certified crews.

Member Status:
${memberStatusText}

Supported destinations: Bali (Indonesia), Tokyo (Japan), Paris (France), New York City (US), Rajasthan & Mumbai (India), Swiss Alps (Switzerland), Antarctica & Arctic (The Polar Expedition), Mediterranean (Amalfi & Cyclades), Nile River (Egypt), South Pacific Atolls (Tahiti/Fiji). You can book any tour/hotel/restaurant shown on our home screen, or inquiries about cruises and private jets.`;

    // Build context index (compact)
    const hotelsContext = hotels.map(h => `- Hotel: ${h.name} (ID: "${h.id}", Destination: "${h.destinationId}", Price: $${h.pricePerNight}/night)`).join('\n');
    const restaurantsContext = restaurants.map(r => `- Restaurant: ${r.name} (ID: "${r.id}", Destination: "${r.destinationId}", Cuisine: "${r.cuisine}")`).join('\n');
    const toursContext = tours.map(t => `- Tour: ${t.name} (ID: "${t.id}", Destination: "${t.destinationId}", Price: $${t.pricePerPerson}/person)`).join('\n');
    const destinationsContext = destinations.map(d => `- Destination: ${d.name} (ID: "${d.id}", Country: "${d.country}")`).join('\n');

    const cruisesContext = [
      '- Cruise: The Polar Expedition (ID: "polar-expedition", Antarctica & Arctic, $8,500/person, Vessel: MV Magellan Explorer, Embarkation: Ushuaia, Argentina, 12 Days, Route: Ushuaia → Drake Passage → Antarctic Peninsula → South Shetland Islands. Activities: Zodiac landings, helicopter scouting, penguin spotting, marine science labs)',
      '- Cruise: Mediterranean Ultra-Luxe (ID: "mediterranean-charter", Amalfi Coast & Cyclades, $12,400/person, Vessel: The Solaris II Mega Yacht, Embarkation: Naples, Italy, 9 Days, Route: Monaco → Amalfi Coast → Aeolian Islands → Cyclades & Santorini → Mykonos. Activities: Stern folding beach club, hot stone sauna, Michelin team, private tenders)',
      '- Cruise: Nile Royal Sanctuary (ID: "nile-sanctuary", Ancient Egypt Luxor to Aswan, $6,800/person, Vessel: The Dahabiya Cleopatra, Embarkation: Luxor, Egypt, 8 Days, Route: Luxor → Esna → Edfu → Kom Ombo → Aswan. Activities: Private Egyptologist, starlight temple visits, sunset felucca sailing)',
      '- Cruise: South Pacific Atoll Explorer (ID: "south-pacific-atolls", Fiji, Tonga & French Polynesia, $9,950/person, Vessel: Le Pacific Wind Catamaran, Embarkation: Papeete, Tahiti, 14 Days, Route: Tahiti → Moorea → Bora Bora → Tuamotu Archipelago → Marquesas Wild Peaks → Return. Activities: PADI dive master diving, overwater glass-floor catamaran suites, private island beach barbecues)'
    ].join('\n');

    const privateChartersContext = [
      '- Private Jet: Gulfstream G650ER heavy jet (ID: "jet-g650", $12,000/hr, Capacity: up to 16, Features: Caviar & vintage tasting bar, custom leather master stateroom, Ka-Band satellite Wi-Fi, personal flight coordinator)',
      '- Private Jet: Bombardier Global 7500 ultra jet (ID: "jet-global7500", $14,500/hr, Capacity: up to 19, Features: Michelin gourmet kitchen, en-suite shower, premium French lotions, Nuage zero-gravity lounge chairs, advanced sound suppression)',
      '- Superyacht: The Solaris 120m Mega Yacht (ID: "yacht-solaris", $28,000/hr, Capacity: up to 36 guests, Features: Dual heli-decks, glass-bottom thermal pool & sauna complex, custom water sports garage with jet skis, 40-member elite crew)',
      '- Private Estate: Necker Island Private Island Retreat (ID: "island-necker", $105,000/night exclusive buyout, Capacity: Exclusive buyouts only, Features: 74-acre private island, catamaran charters, deep reef dive gear, tennis coaches, gourmet open bar)'
    ].join('\n');

    const formattedPrompt = `You are matching options from our live catalogs.
To ensure low latency, we provide a compact visual index of items. Use search tools (e.g., getHotels, getRestaurants, getTours) to fetch rich descriptions, reviews, and detailed attributes as needed.

[AVAILABLE HUB INDEX]
[HOTELS]
${hotelsContext}

[RESTAURANTS]
${restaurantsContext}

[TOURS]
${toursContext}

[DESTINATIONS]
${destinationsContext}

[CRUISES]
${cruisesContext}

[PRIVATE AIR & SEA CHARTERS]
${privateChartersContext}

User Message: "${message}"`;

    // Define tools (same as before)
    const tools = [{
      functionDeclarations: [
        { name: 'getHotels', description: 'Get hotels, optionally filtered by destinationId.', parameters: { type: Type.OBJECT, properties: { destinationId: { type: Type.STRING } } } },
        { name: 'getTours', description: 'Get tours, optionally filtered by destinationId.', parameters: { type: Type.OBJECT, properties: { destinationId: { type: Type.STRING } } } },
        { name: 'getRestaurants', description: 'Get restaurants, optionally filtered by destinationId.', parameters: { type: Type.OBJECT, properties: { destinationId: { type: Type.STRING } } } },
        { name: 'getDestinations', description: 'Get all supported destinations.', parameters: { type: Type.OBJECT, properties: {} } },
        { name: 'createBooking', description: 'Create a confirmed booking.', parameters: { type: Type.OBJECT, properties: { targetId: { type: Type.STRING }, targetType: { type: Type.STRING, enum: ['hotel','tour','restaurant'] }, date: { type: Type.STRING }, quantity: { type: Type.INTEGER } }, required: ['targetId','targetType','date','quantity'] } },
        { name: 'getCurrentBookings', description: 'Get user\'s active bookings.', parameters: { type: Type.OBJECT, properties: {} } },
        { name: 'cancelBooking', description: 'Cancel a booking by ID.', parameters: { type: Type.OBJECT, properties: { bookingId: { type: Type.STRING } }, required: ['bookingId'] } },
        { name: 'submitReview', description: 'Submit a review.', parameters: { type: Type.OBJECT, properties: { targetId: { type: Type.STRING }, targetType: { type: Type.STRING, enum: ['hotel','tour','restaurant','destination'] }, author: { type: Type.STRING }, rating: { type: Type.INTEGER, minimum:1, maximum:5 }, comment: { type: Type.STRING } }, required: ['targetId','targetType','author','rating','comment'] } },
        { name: 'convertCurrency', description: 'Convert amount between currencies.', parameters: { type: Type.OBJECT, properties: { amount: { type: Type.NUMBER }, fromCurrency: { type: Type.STRING, enum: ['USD','EUR','JPY','GBP','INR'] }, toCurrency: { type: Type.STRING, enum: ['USD','EUR','JPY','GBP','INR'] } }, required: ['amount','fromCurrency','toCurrency'] } },
        { name: 'getMemberStatus', description: 'Get member profile.', parameters: { type: Type.OBJECT, properties: {} } },
        { name: 'getCruisesAndCharters', description: 'Get details of our luxury cruises (Polar Expedition, Mediterranean Ultra-Luxe, Nile Royal Sanctuary, South Pacific Atoll) and private air/sea charters (Gulfstream G650, Bombardier Global 7500, Solaris Yacht, Necker Island).', parameters: { type: Type.OBJECT, properties: { query: { type: Type.STRING, description: 'Optional keyword to search for, e.g., polar, jet, yacht, island.' } } } },
      ]
    }];

    // Build contents history
    interface FunctionArgs {
      destinationId?: string;
      targetId?: string;
      targetType?: 'hotel' | 'tour' | 'restaurant' | 'destination';
      date?: string;
      quantity?: number;
      bookingId?: string;
      author?: string;
      rating?: number;
      comment?: string;
      amount?: number;
      fromCurrency?: string;
      toCurrency?: string;
      query?: string;
    }

    const contents: { role: 'user' | 'model'; parts: { text?: string }[] }[] = [];
    if (Array.isArray(history)) {
      history.forEach(h => {
        contents.push({
          role: h.role === 'assistant' ? 'model' : 'user',
          parts: [{ text: h.text }]
        });
      });
    }
    contents.push({ role: 'user', parts: [{ text: formattedPrompt }] });

    let richData: Record<string, unknown> | undefined = undefined;

    if (ai) {
      try {
        console.log('[AI] Chat querying Gemini...');
        const response = await generateContentWithFallback({
          model: 'gemini-3.5-flash',
          contents,
          config: { systemInstruction, tools, temperature: 0.7 }
        });

        const functionCalls = response.functionCalls;
        if (functionCalls && functionCalls.length > 0) {
          console.log('[AI] Function calls:', JSON.stringify(functionCalls));
          const logs: string[] = [];

          for (const call of functionCalls) {
            const { name, args } = call as { name: string; args: FunctionArgs };
            let result: unknown = null;

            try {
              // Execute function (simplified inline to avoid duplication)
              switch (name) {
                 case 'getHotels': {
                  const destId = args.destinationId;
                  const promptLower = (formattedPrompt || "").toLowerCase();
                  let matchedHotels = destId ? hotels.filter(h => h.destinationId === destId) : hotels;
                  
                  const found = matchedHotels.find(h => promptLower.includes(h.name.toLowerCase()) || h.name.toLowerCase().split(' ').some(word => word.length > 4 && promptLower.includes(word)));
                  if (found) {
                    matchedHotels = [found];
                  }
                  
                  result = matchedHotels;
                  const resArray = result as Hotel[];
                  if (resArray && resArray.length) {
                    const first = resArray[0];
                    richData = {
                      type: 'hotel',
                      title: first.name,
                      subtitle: first.description,
                      price: `$${first.pricePerNight}/night`,
                      meta: first.category || 'Luxury Stay',
                      url: `/hotels/${first.id}`,
                      linkView: 'hotel-detail'
                    };
                  }
                  break;
                }
                case 'getTours': {
                  const destId = args.destinationId;
                  const promptLower = (formattedPrompt || "").toLowerCase();
                  let matchedTours = destId ? tours.filter(t => t.destinationId === destId) : tours;
                  
                  const found = matchedTours.find(t => promptLower.includes(t.name.toLowerCase()) || t.name.toLowerCase().split(' ').some(word => word.length > 4 && promptLower.includes(word)));
                  if (found) {
                    matchedTours = [found];
                  }
                  
                  result = matchedTours;
                  const resArray = result as Tour[];
                  if (resArray && resArray.length) {
                    const first = resArray[0];
                    richData = {
                      type: 'tour',
                      title: first.name,
                      subtitle: first.description,
                      price: `$${first.pricePerPerson}/person`,
                      meta: `Duration: ${first.duration}`,
                      url: first.id === 'tour-kyoto-neon' ? '/packages/pkg-3' : first.id === 'tour-rajasthan' ? '/packages/pkg-1' : first.id === 'tour-alpine' ? '/packages/pkg-2' : `/tours/${first.id}`,
                      linkView: 'tour-detail'
                    };
                  }
                  break;
                }
                case 'getRestaurants': {
                  const destId = args.destinationId;
                  const promptLower = (formattedPrompt || "").toLowerCase();
                  let matchedRestaurants = destId ? restaurants.filter(r => r.destinationId === destId) : restaurants;
                  
                  const found = matchedRestaurants.find(r => promptLower.includes(r.name.toLowerCase()) || r.name.toLowerCase().split(' ').some(word => word.length > 4 && promptLower.includes(word)));
                  if (found) {
                    matchedRestaurants = [found];
                  }
                  
                  result = matchedRestaurants;
                  const resArray = result as Restaurant[];
                  if (resArray && resArray.length) {
                    const first = resArray[0];
                    richData = {
                      type: 'restaurant',
                      title: first.name,
                      subtitle: first.description,
                      price: first.priceLevel,
                      meta: first.cuisine,
                      url: `/restaurants/${first.id}`,
                      linkView: 'restaurant-detail'
                    };
                  }
                  break;
                }
                case 'getDestinations': {
                  result = destinations;
                  const resArray = result as Destination[];
                  if (resArray && resArray.length) {
                    const first = resArray[0];
                    richData = {
                      type: 'destination',
                      title: first.name,
                      subtitle: first.description,
                      price: `From $${first.price}`,
                      meta: first.country,
                      url: `/destinations/${first.id}`,
                      linkView: 'destination-detail'
                    };
                  }
                  break;
                }
                 case 'createBooking': {
                  const targetId = args.targetId || '';
                  const rawType = args.targetType || 'hotel';
                  const targetType: 'hotel' | 'restaurant' | 'tour' = rawType === 'destination' ? 'hotel' : rawType;
                  const date = args.date || new Date().toISOString().split('T')[0];
                  const quantity = Number(args.quantity || 1);
                  let targetName = 'Bespoke Reservation';
                  let targetImage = '';
                  let price = 0;
                  if (targetType === 'hotel') {
                    const h = hotels.find(item => item.id === targetId);
                    if (h) { targetName = h.name; targetImage = h.image; price = h.pricePerNight; }
                  } else if (targetType === 'tour') {
                    const t = tours.find(item => item.id === targetId);
                    if (t) { targetName = t.name; targetImage = t.image; price = t.pricePerPerson; }
                  } else if (targetType === 'restaurant') {
                    const r = restaurants.find(item => item.id === targetId);
                    if (r) { targetName = r.name; targetImage = r.image; }
                  }
                  const newBooking: Booking = {
                    id: `book-${Date.now()}`,
                    targetId,
                    targetType,
                    targetName,
                    targetImage: targetImage || 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
                    date,
                    quantity,
                    totalPrice: price * quantity,
                    status: 'confirmed',
                  };
                  bookings.unshift(newBooking);
                  const item = targetId ? (tours.find(t => t.id === targetId) || hotels.find(h => h.id === targetId) || restaurants.find(r => r.id === targetId)) : undefined;
                  if (item && 'reviewsCount' in item) item.reviewsCount += 1;
                  result = { success: true, booking: newBooking };
                  richData = {
                    type: 'booking',
                    title: `${targetName} Confirmed!`,
                    subtitle: `Reservation on ${date} for ${quantity} guests/nights.`,
                    price: price > 0 ? `$${price * quantity}` : 'Complimentary',
                    meta: `Booking ID: ${newBooking.id}`,
                    linkView: 'dashboard'
                  };
                  break;
                }
                case 'getCurrentBookings': {
                  result = bookings;
                  if (bookings.length) {
                    richData = {
                      type: 'booking',
                      title: 'Active Reservations',
                      subtitle: `You have ${bookings.length} active itinerary logs.`,
                      price: `$${bookings.reduce((s,b) => s + b.totalPrice, 0)} Total`,
                      meta: `Latest: ${bookings[0].targetName}`,
                      linkView: 'dashboard'
                    };
                  }
                  break;
                }
                case 'cancelBooking': {
                  const booking = bookings.find(b => b.id === args.bookingId);
                  if (booking) {
                    booking.status = 'cancelled';
                    result = { success: true, booking };
                    richData = {
                      type: 'booking',
                      title: `${booking.targetName} Cancelled`,
                      subtitle: 'Your booking was successfully cancelled.',
                      price: '$0.00',
                      meta: `Booking ID: ${booking.id}`,
                      linkView: 'dashboard'
                    };
                  } else {
                    result = { success: false, error: 'Booking not found' };
                  }
                  break;
                }
                case 'submitReview': {
                  const targetId = args.targetId || '';
                  const targetType = args.targetType || 'hotel';
                  const author = args.author || 'Anonymous';
                  const rating = Number(args.rating || 5);
                  const comment = args.comment || '';
                  const newReview: Review = {
                    id: `rev-${Date.now()}`,
                    targetId,
                    targetType,
                    author,
                    rating,
                    comment,
                    date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
                  };
                  reviews.unshift(newReview);
                  updateTargetRating(targetId, targetType, rating);
                  result = newReview;
                  richData = {
                    type: 'review',
                    title: 'Review Added!',
                    subtitle: `Author: ${author} • Rating: ${rating}/5`,
                    price: '★'.repeat(rating),
                    meta: comment,
                    linkView: 'explorations'
                  };
                  break;
                }
                case 'convertCurrency': {
                  const amount = Number(args.amount || 0);
                  const fromCurrency = args.fromCurrency || 'USD';
                  const toCurrency = args.toCurrency || 'USD';
                  const rates: Record<string, number> = { USD: 1, EUR: 0.92, JPY: 155, GBP: 0.78, INR: 96.5 };
                  const usdAmount = amount / (rates[fromCurrency.toUpperCase()] || 1);
                  const converted = usdAmount * (rates[toCurrency.toUpperCase()] || 1);
                  result = { originalAmount: amount, from: fromCurrency, to: toCurrency, converted: Number(converted.toFixed(2)), rate: (rates[toCurrency.toUpperCase()] || 1) / (rates[fromCurrency.toUpperCase()] || 1) };
                  const symbols: Record<string, string> = { USD: '$', EUR: '€', JPY: '¥', GBP: '£', INR: '₹' };
                  richData = {
                    type: 'currency',
                    title: `${amount} ${fromCurrency} to ${toCurrency}`,
                    subtitle: 'Converted at live luxury exchange rate.',
                    price: `${symbols[toCurrency.toUpperCase()] || ''}${Number(converted.toFixed(2)).toLocaleString()} ${toCurrency}`,
                    meta: 'Preferred Luxury Exchange Rate',
                    linkView: 'dashboard'
                  };
                  break;
                }
                case 'getMemberStatus': {
                  result = user || { name: 'Esteemed Guest', email: 'guest@wanderluxe.vip', points: 0, tier: 'Unregistered Guest' };
                  break;
                }
                case 'getCruisesAndCharters': {
                  const q = (args.query || '').toLowerCase();
                  if (q) {
                    result = cruisesAndCharters.filter(c => 
                      c.name.toLowerCase().includes(q) || 
                      c.description.toLowerCase().includes(q) || 
                      c.type.toLowerCase().includes(q) ||
                      (c.destination || '').toLowerCase().includes(q)
                    );
                  } else {
                    result = cruisesAndCharters;
                  }
                  
                  if (Array.isArray(result) && result.length) {
                    const first = result[0];
                    richData = {
                      type: 'currency', // Style as blue/cyan for high-end luxury assets
                      title: first.name,
                      subtitle: first.description,
                      price: first.price,
                      meta: first.type === 'cruise' ? `Duration: ${first.duration}` : `Capacity: ${first.capacity}`,
                      url: first.type === 'cruise' ? `/cruises/${first.id === 'polar-expedition' ? 'polar' : ''}` : '/jets',
                      linkView: 'jets-cruises'
                    };
                  }
                  break;
                }
                default:
                  throw new Error(`Unknown function: ${name}`);
              }
              logs.push(`✅ ${name} executed successfully`);
            } catch (execErr: unknown) {
              const errMsg = execErr instanceof Error ? execErr.message : String(execErr);
              logs.push(`❌ ${name} failed: ${errMsg}`);
            }
          }

          // Second round: format the final response
          const followUpResponse = await generateContentWithFallback({
            model: 'gemini-3.5-flash',
            contents: [
              ...contents,
              { role: 'model', parts: [{ text: `Understood. I am initiating the required real-time database actions: ${functionCalls.map((c: unknown) => (c as { name: string }).name).join(', ')}.` }] },
              { role: 'user', parts: [{ text: `SYSTEM LOGS:\n${logs.join('\n')}\n\nPlease generate a highly professional, polite, elegant, and friendly travel concierge response confirming these results to the traveler. Highlight that their reservation/action is successfully updated in their live dashboard instantly.` }] }
            ],
            config: { systemInstruction, temperature: 0.5 }
          });

          const followUpText = followUpResponse.text;
          if (followUpText) {
            res.json({ response: followUpText, richData });
            return;
          }
        }

        const directText = response.text;
        if (directText) {
          res.json({ response: directText, richData });
          return;
        }
        throw new Error('Empty AI response');
      } catch (aiErr: unknown) {
        const errMsg = aiErr instanceof Error ? aiErr.message : String(aiErr);
        console.warn('[AI] Chat fallback triggered:', errMsg);
      }
    }

    // Fallback (no AI or error)
    const randomReply = FALLBACK_REPLIES[Math.floor(Math.random() * FALLBACK_REPLIES.length)];
    res.json({ response: randomReply, richData: null });

  } catch (err) {
    next(err);
  }
});

// ----------------------------------------------------------------------
// Gemini AI Itinerary Planner
// ----------------------------------------------------------------------
app.post('/api/itinerary', validate(itinerarySchema), async (req, res, next) => {
  try {
    const { destination, days, budget, interests, notes } = req.body;
    const daysNum = Math.min(Math.max(Number(days), 1), 7);
    const budgetStr = budget || 'moderate';
    const interestsList = Array.isArray(interests) ? interests : [];
    const additionalNotes = notes || '';

    const promptText = `
      Generate a highly realistic, curated, and personalized day-by-day travel itinerary for a vacation in ${destination}.
      - Number of Days: ${daysNum}
      - Travel Budget Class: ${budgetStr}
      - Key Interests: ${interestsList.join(', ')}
      - Extra User Notes: ${additionalNotes}

      Make it exciting, practical, and highly detailed.
      You MUST return the response strictly in JSON format matching this exact JSON schema:
      {
        "destination": "${destination}",
        "daysCount": ${daysNum},
        "budget": "${budgetStr}",
        "interests": ${JSON.stringify(interestsList)},
        "summary": "A captivating, high-level overview...",
        "dailyPlans": [
          {
            "day": 1,
            "theme": "Thematic subtitle",
            "activities": [
              {
                "time": "09:00 AM",
                "activity": "Name",
                "description": "Engaging description...",
                "location": "Place",
                "estimatedCost": "Approx cost"
              }
            ]
          }
        ],
        "travelTips": ["Tip1", "Tip2"]
      }
    `;

    if (ai) {
      try {
        console.log(`[AI] Generating itinerary for ${destination}...`);
        const response = await generateContentWithFallback({
          model: 'gemini-3.5-flash',
          contents: promptText,
          config: {
            responseMimeType: 'application/json',
            responseSchema: {
              type: Type.OBJECT,
              properties: {
                destination: { type: Type.STRING },
                daysCount: { type: Type.INTEGER },
                budget: { type: Type.STRING },
                interests: { type: Type.ARRAY, items: { type: Type.STRING } },
                summary: { type: Type.STRING },
                dailyPlans: {
                  type: Type.ARRAY,
                  items: {
                    type: Type.OBJECT,
                    properties: {
                      day: { type: Type.INTEGER },
                      theme: { type: Type.STRING },
                      activities: {
                        type: Type.ARRAY,
                        items: {
                          type: Type.OBJECT,
                          properties: {
                            time: { type: Type.STRING },
                            activity: { type: Type.STRING },
                            description: { type: Type.STRING },
                            location: { type: Type.STRING },
                            estimatedCost: { type: Type.STRING }
                          },
                          required: ['time', 'activity', 'description']
                        }
                      }
                    },
                    required: ['day', 'theme', 'activities']
                  }
                },
                travelTips: { type: Type.ARRAY, items: { type: Type.STRING } }
              },
              required: ['destination', 'daysCount', 'budget', 'interests', 'summary', 'dailyPlans', 'travelTips']
            },
            systemInstruction: 'You are an elite travel concierge. Always output robust, high-quality, valid JSON schemas representing travel guides.',
            temperature: 0.7
          }
        });

        const text = response.text;
        if (text) {
          const parsed = JSON.parse(text.trim());
          res.json(parsed);
          return;
        }
        throw new Error('Empty itinerary response');
      } catch (aiErr: unknown) {
        const errMsg = aiErr instanceof Error ? aiErr.message : String(aiErr);
        console.warn('[AI] Itinerary fallback triggered:', errMsg);
      }
    }

    // Fallback mock itinerary
    console.log('[AI] Generating fallback procedural itinerary...');
    const fallback = generateMockItinerary(destination, daysNum, budgetStr, interestsList);
    res.json(fallback);

  } catch (err) {
    next(err);
  }
});

// ----------------------------------------------------------------------
// Improved Mock Itinerary Generator (destination‑aware)
// ----------------------------------------------------------------------
function generateMockItinerary(destination: string, days: number, budget: string, interests: string[]): Itinerary {
  // Destination‑specific templates (simplified)
  const templates: Record<string, { summary: string; tips: string[] }> = {
    'bali': {
      summary: 'Immerse yourself in the spiritual heart of Indonesia with rice terraces, volcanic sunrises, and exquisite local cuisine.',
      tips: ['Respect temple dress codes', 'Try the local coffee', 'Learn a few Balinese phrases'],
    },
    'tokyo': {
      summary: 'A dazzling blend of ultramodern and traditional, from neon-lit Shibuya to serene Meiji Shrine.',
      tips: ['Get a Suica card for public transport', 'Try conveyor-belt sushi', 'Visit during cherry blossom season if possible'],
    },
    'paris': {
      summary: 'Romance, art, and gastronomy – the City of Light awaits with iconic landmarks and hidden gems.',
      tips: ['Book museum tickets in advance', 'Enjoy a Seine river cruise at dusk', 'Learn basic French greetings'],
    },
    'new york': {
      summary: 'The city that never sleeps – towering skyscrapers, world‑class theatre, and endless culinary diversity.',
      tips: ['Use the subway to get around', 'Walk the High Line', 'Catch a Broadway show'],
    },
    'swiss': {
      summary: 'Alpine grandeur with pristine lakes, charming villages, and some of the best skiing and hiking in the world.',
      tips: ['Pack layers for mountain weather', 'Try fondue', 'Ride the Glacier Express'],
    },
  };

  const key = Object.keys(templates).find(k => destination.toLowerCase().includes(k)) || 'bali';
  const tpl = templates[key];

  const dailyPlans = [];
  for (let i = 1; i <= days; i++) {
    dailyPlans.push({
      day: i,
      theme: `Day ${i} – Explore ${destination}`,
      activities: [
        { time: '09:00 AM', activity: 'Morning Exploration', description: `Visit iconic sites in ${destination}.`, location: 'City Center', estimatedCost: budget === 'budget' ? '$5' : budget === 'luxury' ? '$50' : '$20' },
        { time: '01:00 PM', activity: 'Local Cuisine Lunch', description: 'Savor regional specialties at a hidden gem.', location: 'Local Market', estimatedCost: budget === 'budget' ? '$8' : budget === 'luxury' ? '$60' : '$25' },
        { time: '04:00 PM', activity: 'Afternoon Relaxation', description: 'Take a leisurely walk or museum visit.', location: 'Park or Museum', estimatedCost: 'Free' },
        { time: '08:00 PM', activity: 'Dinner & Entertainment', description: 'Enjoy a fine dining experience or cultural show.', location: 'Downtown', estimatedCost: budget === 'budget' ? '$15' : budget === 'luxury' ? '$100' : '$40' },
      ]
    });
  }

  return {
    destination,
    daysCount: days,
    budget,
    interests,
    summary: tpl.summary || `A wonderful ${budget} trip to ${destination} focusing on ${interests.join(', ') || 'relaxation and culture'}.`,
    dailyPlans,
    travelTips: tpl.tips || ['Bring comfortable shoes', 'Check local weather', 'Learn a few local phrases'],
  };
}

// ----------------------------------------------------------------------
// Global Error Handler
// ----------------------------------------------------------------------
app.use((err: { status?: number; message?: string; stack?: string }, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('[Server Error]', err.stack || err.message);
  const status = err.status || 500;
  const message = err.message || 'Internal Server Error';
  res.status(status).json({ error: message });
});

// ----------------------------------------------------------------------
// Next.js Custom Server
// ----------------------------------------------------------------------
const dev = config.nodeEnv !== 'production';
const nextApp = next({ dev });
const handle = nextApp.getRequestHandler();

async function startServer() {
  console.log('[Next.js] Preparing application...');
  await nextApp.prepare();
  console.log('[Next.js] Application prepared.');

  // Serve static files from public directory
  app.use(express.static(path.join(process.cwd(), 'public')));

  // Delegate all other routes to Next.js handler
  app.all(/.*/, (req, res) => {
    return handle(req, res);
  });

  app.listen(config.port, '0.0.0.0', () => {
    console.log(`🚀 Server running on http://localhost:${config.port} (${config.nodeEnv})`);
  });
}

startServer().catch(err => {
  console.error('Failed to start server:', err);
  process.exit(1);
});