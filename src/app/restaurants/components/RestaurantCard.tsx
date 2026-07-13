// src/app/restaurants/components/RestaurantCard.tsx
'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Restaurant } from '@/types';
import { Star, MapPin, Clock } from 'lucide-react';

export default function RestaurantCard({ restaurant }: { restaurant: Restaurant }) {
  const priceSymbols: Record<string, string> = { 
    '$': '$', 
    '$$': '$$', 
    '$$$': '$$$', 
    '$$$$': '$$$$' 
  };

  return (
    <Link href={`/restaurants/${restaurant.id}`} className="block h-full group">
      <div className="h-full flex flex-col bg-white rounded-[32px] border border-gray-100 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-700 overflow-hidden">
        
        {/* Image Section */}
        <div className="relative h-72 w-full overflow-hidden bg-gray-100">
          <Image
            src={restaurant.image}
            alt={restaurant.name}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-700"
            onError={(e) => {
              (e.target as HTMLImageElement).src = '/images/placeholder-restaurant.jpg';
            }}
          />
          
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

          {/* Top Badges */}
          <div className="absolute top-6 left-6 z-20 flex flex-col gap-2">
            {restaurant.featured && (
              <span className="bg-amber-400 text-black text-xs font-black uppercase tracking-widest px-5 py-2 rounded-2xl shadow-lg">
                ✨ Featured
              </span>
            )}
            {restaurant.reservationRequired && (
              <span className="bg-white/90 text-red-700 text-xs font-bold px-4 py-1.5 rounded-2xl shadow">
                Book Ahead
              </span>
            )}
          </div>

          {/* Price Level */}
          <div className="absolute bottom-6 right-6 bg-white/95 backdrop-blur-md text-gray-900 text-xl font-black px-5 py-2 rounded-2xl shadow-lg">
            {priceSymbols[restaurant.priceLevel] || '$$$$'}
          </div>
        </div>

        {/* Content */}
        <div className="p-8 flex flex-col flex-grow">
          <div className="flex justify-between items-start mb-4">
            <div className="flex-1">
              <h3 className="text-2xl font-bold text-gray-900 group-hover:text-amber-600 transition-colors line-clamp-1">
                {restaurant.name}
              </h3>
              <p className="text-gray-500 mt-1">{restaurant.cuisine}</p>
            </div>

            <div className="flex items-center gap-1 bg-gray-50 px-4 py-2 rounded-2xl shrink-0">
              <Star className="fill-amber-400 text-amber-400" size={20} />
              <span className="font-bold text-lg text-gray-900">{restaurant.rating}</span>
            </div>
          </div>

          <p className="text-gray-600 line-clamp-3 leading-relaxed flex-grow mb-6">
            {restaurant.description}
          </p>

          {/* Dietary Options */}
          {restaurant.dietaryOptions && restaurant.dietaryOptions.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-6">
              {restaurant.dietaryOptions.slice(0, 3).map((opt) => (
                <span 
                  key={opt} 
                  className="text-xs bg-amber-50 text-amber-700 px-4 py-1.5 rounded-2xl font-medium"
                >
                  {opt}
                </span>
              ))}
            </div>
          )}

          {/* Bottom Info */}
          <div className="flex items-center justify-between text-sm text-gray-500 border-t border-gray-100 pt-6 mt-auto">
            <div className="flex items-center gap-2">
              <Clock size={18} />
              <span>{restaurant.openingHours ? restaurant.openingHours.split(' ')[0] : 'Closed'}</span>
            </div>

            <div className="flex items-center gap-2">
              <MapPin size={18} />
              <span className="line-clamp-1">View on map</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}