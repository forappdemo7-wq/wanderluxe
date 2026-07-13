// src/app/restaurants/components/FeaturedRestaurants.tsx
'use client';

import { Restaurant } from '@/types';
import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Star, ArrowRight } from 'lucide-react';

interface FeaturedRestaurantsProps {
  restaurants: Restaurant[];
}

export default function FeaturedRestaurants({ restaurants }: FeaturedRestaurantsProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (restaurants.length <= 1) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % restaurants.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [restaurants.length]);

  if (restaurants.length === 0) {
    return <div className="text-center py-12 text-gray-500">No featured restaurants available.</div>;
  }

  const current = restaurants[currentIndex];

  return (
    <div className="relative overflow-hidden rounded-3xl bg-gray-900 shadow-2xl">
      <div className="flex flex-col lg:flex-row">
        
        {/* Further reduced image height */}
        <div className="lg:w-5/12 relative h-64 lg:h-[340px] overflow-hidden">
          <Image
            src={current.image}
            alt={current.name}
            fill
            className="object-cover transition-transform duration-700"
            onError={(e) => {
              (e.target as HTMLImageElement).src = '/images/placeholder-restaurant.jpg';
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent" />
        </div>

        {/* Even tighter content */}
        <div className="lg:w-7/12 p-6 lg:p-9 flex flex-col justify-center">
          <div className="mb-3">
            <span className="inline-block bg-amber-500 text-black text-[10px] font-black uppercase tracking-[0.1em] px-4 py-1 rounded-2xl">
              ✨ SIGNATURE PICK
            </span>
          </div>

          <h3 className="text-[28px] lg:text-3xl font-black tracking-tight text-white leading-none mb-3">
            {current.name}
          </h3>

          <p className="text-gray-300 text-[15px] leading-relaxed mb-5 line-clamp-2">
            {current.description}
          </p>

          <div className="flex items-center gap-5 mb-6 text-sm">
            <div className="flex items-center gap-1.5">
              <Star className="fill-amber-400 text-amber-400" size={22} />
              <span className="font-bold text-white text-xl">{current.rating}</span>
              <span className="text-gray-400 text-sm">({current.reviewsCount})</span>
            </div>

            <div className="text-3xl font-black text-white tracking-tighter">
              {current.priceLevel}
            </div>

            <div className="text-gray-400 text-sm">
              {current.cuisine}
            </div>
          </div>

          <Link
            href={`/restaurants/${current.id}`}
            className="inline-flex items-center gap-3 group bg-white text-gray-900 px-6 py-3 rounded-2xl font-semibold hover:bg-amber-400 transition-all text-sm w-fit"
          >
            Explore Restaurant
            <ArrowRight className="group-hover:translate-x-1 transition-transform" size={17} />
          </Link>
        </div>
      </div>

      {/* Navigation Dots */}
      {restaurants.length > 1 && (
        <div className="flex justify-center gap-2 pb-5">
          {restaurants.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`transition-all duration-300 rounded-full ${
                index === currentIndex
                  ? 'bg-amber-500 w-7 h-2'
                  : 'bg-white/40 hover:bg-white/70 w-2 h-2'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}