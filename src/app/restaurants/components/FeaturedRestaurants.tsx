// src/app/restaurants/components/FeaturedRestaurants.tsx
'use client';

import { Restaurant } from '@/types';
import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';

interface FeaturedRestaurantsProps {
  restaurants: Restaurant[];
}

export default function FeaturedRestaurants({ restaurants }: FeaturedRestaurantsProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  // ✅ Auto‑rotate every 5 seconds
  useEffect(() => {
    if (restaurants.length <= 1) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % restaurants.length);
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, [restaurants.length]);

  // If no restaurants, show nothing
  if (restaurants.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        No featured restaurants available.
      </div>
    );
  }

  const current = restaurants[currentIndex];

  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-700 p-1">
      <div className="bg-white dark:bg-gray-900 rounded-2xl p-6">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Image with fallback */}
          <div className="md:w-2/5 relative h-64 md:h-auto min-h-[250px] bg-gray-100 dark:bg-gray-800 rounded-xl overflow-hidden">
            <Image
              src={current.image}
              alt={current.name}
              fill
              className="object-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).src = '/images/placeholder-restaurant.jpg';
              }}
            />
          </div>

          {/* Content */}
          <div className="md:w-3/5 flex flex-col justify-center">
            <span className="text-xs font-bold text-yellow-500 uppercase tracking-wider">✨ Featured Pick</span>
            <h3 className="text-2xl font-bold mt-1 text-gray-900 dark:text-white">{current.name}</h3>
            <p className="text-gray-600 dark:text-gray-300 mt-2">{current.description}</p>

            <div className="flex flex-wrap items-center gap-4 mt-4">
              <span className="flex items-center gap-1 text-sm">
                <span className="text-yellow-500">⭐</span>
                <span className="font-semibold text-gray-900 dark:text-white">{current.rating}</span>
                <span className="text-gray-400">({current.reviewsCount})</span>
              </span>
              <span className="text-sm font-bold text-gray-700 dark:text-gray-300">{current.priceLevel}</span>
              <span className="text-sm text-gray-500 dark:text-gray-400">{current.cuisine}</span>
            </div>

            <Link
              href={`/restaurants/${current.id}`}
              className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-full text-sm font-bold transition-colors w-fit shadow-lg shadow-blue-600/20"
            >
              Explore →
            </Link>
          </div>
        </div>

        {/* ✅ Navigation Dots - Only show if more than 1 featured restaurant */}
        {restaurants.length > 1 && (
          <div className="flex justify-center gap-2 mt-4">
            {restaurants.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`transition-all duration-300 rounded-full ${
                  index === currentIndex
                    ? 'bg-blue-600 w-8 h-2.5'
                    : 'bg-gray-300 dark:bg-gray-600 w-2.5 h-2.5 hover:bg-gray-400 dark:hover:bg-gray-500'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}