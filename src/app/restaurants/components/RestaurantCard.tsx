// src/app/restaurants/components/RestaurantCard.tsx
'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Restaurant } from '@/types';

export default function RestaurantCard({ restaurant }: { restaurant: Restaurant }) {
  const priceSymbols: Record<string, string> = { '$': '$', '$$': '$$', '$$$': '$$$', '$$$$': '$$$$' };
  const priceColors: Record<string, string> = {
    '$': 'bg-emerald-500/90 text-white',
    '$$': 'bg-amber-500/90 text-white',
    '$$$': 'bg-orange-500/90 text-white',
    '$$$$': 'bg-rose-500/90 text-white',
  };

  return (
    <Link href={`/restaurants/${restaurant.id}`} className="block h-full cursor-pointer">
      <div className="group h-full flex flex-col bg-white/70 dark:bg-gray-900/40 backdrop-blur-xl rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.1)] hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 overflow-hidden border border-gray-200/60 dark:border-white/10">
        
        <div className="relative h-60 w-full overflow-hidden bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
          {/* Fallback label if image is completely missing */}
          <span className="absolute text-gray-400 dark:text-gray-500 text-sm z-0 font-medium">
            Image Unavailable
          </span>
          
          <Image
            src={restaurant.image}
            alt={restaurant.name}
            fill
            className="object-cover z-10 text-gray-500 dark:text-gray-400 text-sm group-hover:scale-110 transition-transform duration-700 ease-out flex items-center justify-center"
            onError={(e) => {
              // Fallback if image fails to load
              (e.target as HTMLImageElement).src = '/images/placeholder-restaurant.jpg';
            }}
          />
          
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-gray-900/20 to-transparent z-10 pointer-events-none" />

          {/* Top Badges */}
          <div className="absolute top-4 left-4 z-20 flex flex-col gap-2">
            {restaurant.featured && (
              <span className="bg-white/20 backdrop-blur-md border border-white/30 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg flex items-center gap-1.5">
                ✨ Featured
              </span>
            )}
            {restaurant.reservationRequired && (
              <span className="bg-red-500/80 backdrop-blur-md border border-red-400/30 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">
                Book Ahead
              </span>
            )}
          </div>

          <div className={`absolute bottom-4 right-4 z-20 px-3.5 py-1.5 rounded-full text-xs font-bold shadow-lg backdrop-blur-md border border-white/20 ${priceColors[restaurant.priceLevel]}`}>
            {priceSymbols[restaurant.priceLevel]}
          </div>

          <div className="absolute inset-0 z-20 bg-black/40 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
            <span className="text-white font-bold text-sm uppercase tracking-widest border border-white/50 bg-white/10 px-6 py-3 rounded-full hover:bg-white hover:text-black transition-colors duration-300">
              View Details
            </span>
          </div>
        </div>

        <div className="p-6 flex flex-col flex-grow">
          <div className="flex justify-between items-start gap-4 mb-3">
            <div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-1">
                {restaurant.name}
              </h3>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mt-1">
                {restaurant.cuisine}
              </p>
            </div>
            <div className="flex items-center gap-1 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border border-gray-100 dark:border-gray-700/50 px-2.5 py-1.5 rounded-lg shrink-0">
              <span className="text-yellow-500 text-sm">★</span>
              <span className="font-bold text-sm text-gray-900 dark:text-white">{restaurant.rating}</span>
              <span className="text-gray-400 dark:text-gray-500 text-xs ml-1">({restaurant.reviewsCount})</span>
            </div>
          </div>

          <p className="text-sm text-gray-600 dark:text-gray-300 mt-2 line-clamp-2 flex-grow leading-relaxed">
            {restaurant.description}
          </p>

          {restaurant.dietaryOptions && restaurant.dietaryOptions.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-4">
              {restaurant.dietaryOptions.slice(0, 3).map((opt) => (
                <span key={opt} className="text-[10px] uppercase tracking-wider bg-blue-50/50 dark:bg-blue-900/30 border border-blue-100 dark:border-blue-800/50 text-blue-700 dark:text-blue-300 px-2.5 py-1 rounded-full font-semibold">
                  {opt}
                </span>
              ))}
              {restaurant.dietaryOptions.length > 3 && (
                <span className="text-[10px] text-gray-400 font-medium self-center">
                  +{restaurant.dietaryOptions.length - 3} more
                </span>
              )}
            </div>
          )}

          <div className="flex items-center justify-between mt-5 pt-4 border-t border-gray-100 dark:border-gray-700/50">
            <div className="flex items-center gap-2 text-xs font-medium text-gray-500 dark:text-gray-400">
              <span className="opacity-70">🕒</span>
              <span>{restaurant.openingHours.split(' ')[0]}</span>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-xs font-medium text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors flex items-center gap-1">
                <span className="opacity-70">📍</span> Map
              </div>
              <div className="text-xs font-medium text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors flex items-center gap-1">
                <span className="opacity-70">📞</span> Call
              </div>
            </div>
          </div>
        </div>
        
      </div>
    </Link>
  );
}