// src/app/restaurants/components/RestaurantFilters.tsx
'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { X } from 'lucide-react';

const quickFilters = [
  { label: '⭐ Top Rated', value: 'top-rated', type: 'rating' },
  { label: '💰 Best Value', value: 'best-value', type: 'price' },
  { label: '🌟 Featured', value: 'featured', type: 'special' },
];

export default function RestaurantFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [cuisine, setCuisine] = useState(searchParams.get('cuisine') || '');
  const [rating, setRating] = useState(searchParams.get('rating') || '');
  const [price, setPrice] = useState(searchParams.get('price') || '');
  const [activeQuickFilter, setActiveQuickFilter] = useState<string | null>(
    searchParams.get('quick') || null
  );

  const applyFilters = () => {
    const params = new URLSearchParams();
    if (cuisine) params.set('cuisine', cuisine);
    if (rating) params.set('rating', rating);
    if (price) params.set('price', price);
    if (activeQuickFilter) params.set('quick', activeQuickFilter);
    
    const sort = searchParams.get('sort');
    if (sort) params.set('sort', sort);

    router.push(`/restaurants?${params.toString()}`);
  };

  const handleQuickFilter = (value: string) => {
    setActiveQuickFilter(activeQuickFilter === value ? null : value);
  };

  const clearAll = () => {
    setCuisine('');
    setRating('');
    setPrice('');
    setActiveQuickFilter(null);
    router.push('/restaurants');
  };

  const removeFilter = (type: string) => {
    if (type === 'cuisine') setCuisine('');
    if (type === 'rating') setRating('');
    if (type === 'price') setPrice('');
    if (type === 'quick') setActiveQuickFilter(null);
    setTimeout(applyFilters, 0);
  };

  const hasActiveFilters = cuisine || rating || price || activeQuickFilter;

  return (
    <div className="space-y-6">
      {/* Quick Filters */}
      <div className="flex flex-wrap gap-3">
        {quickFilters.map((filter) => (
          <button
            key={filter.value}
            onClick={() => handleQuickFilter(filter.value)}
            className={`px-6 py-3 rounded-2xl text-sm font-semibold transition-all ${
              activeQuickFilter === filter.value
                ? 'bg-amber-600 text-white shadow-lg'
                : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
            }`}
          >
            {filter.label}
          </button>
        ))}
      </div>

      {/* Main Filters */}
      <div className="flex flex-wrap gap-4 items-end">
        <div className="flex-1 min-w-[220px]">
          <input
            type="text"
            placeholder="Search by cuisine or restaurant name..."
            value={cuisine}
            onChange={(e) => setCuisine(e.target.value)}
            className="w-full px-6 py-4 border border-gray-200 rounded-2xl focus:border-amber-400 focus:ring-amber-400 text-gray-900 placeholder-gray-400 transition-all"
          />
        </div>

        <select
          value={rating}
          onChange={(e) => setRating(e.target.value)}
          className="px-6 py-4 border border-gray-200 rounded-2xl bg-white text-gray-900 focus:border-amber-400 focus:ring-amber-400 transition-all"
        >
          <option value="">All Ratings</option>
          <option value="4.8">⭐ 4.8 and above</option>
          <option value="4.5">⭐ 4.5 and above</option>
          <option value="4.0">⭐ 4.0 and above</option>
        </select>

        <select
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="px-6 py-4 border border-gray-200 rounded-2xl bg-white text-gray-900 focus:border-amber-400 focus:ring-amber-400 transition-all"
        >
          <option value="">All Price Levels</option>
          <option value="1">$ Budget</option>
          <option value="2">$$ Moderate</option>
          <option value="3">$$$ Fine Dining</option>
          <option value="4">$$$$ Luxury</option>
        </select>

        <button
          onClick={applyFilters}
          className="px-8 py-4 bg-gray-900 hover:bg-amber-600 text-white rounded-2xl font-semibold transition-all whitespace-nowrap"
        >
          Apply Filters
        </button>

        {hasActiveFilters && (
          <button
            onClick={clearAll}
            className="px-5 py-4 text-gray-500 hover:text-red-600 transition-colors font-medium flex items-center gap-2"
          >
            Clear All <X size={18} />
          </button>
        )}
      </div>

      {/* Active Filters */}
      {hasActiveFilters && (
        <div className="flex flex-wrap gap-3 pt-2">
          <span className="text-sm text-gray-500 self-center">Active:</span>
          
          {cuisine && (
            <span className="inline-flex items-center gap-2 bg-amber-50 text-amber-700 px-5 py-2 rounded-2xl text-sm">
              {cuisine}
              <button onClick={() => removeFilter('cuisine')} className="hover:text-red-500">
                ✕
              </button>
            </span>
          )}

          {rating && (
            <span className="inline-flex items-center gap-2 bg-amber-50 text-amber-700 px-5 py-2 rounded-2xl text-sm">
              ⭐ {rating}+
              <button onClick={() => removeFilter('rating')} className="hover:text-red-500">
                ✕
              </button>
            </span>
          )}

          {price && (
            <span className="inline-flex items-center gap-2 bg-amber-50 text-amber-700 px-5 py-2 rounded-2xl text-sm">
              {'$'.repeat(parseInt(price))}
              <button onClick={() => removeFilter('price')} className="hover:text-red-500">
                ✕
              </button>
            </span>
          )}

          {activeQuickFilter && (
            <span className="inline-flex items-center gap-2 bg-amber-50 text-amber-700 px-5 py-2 rounded-2xl text-sm">
              {quickFilters.find(f => f.value === activeQuickFilter)?.label}
              <button onClick={() => removeFilter('quick')} className="hover:text-red-500">
                ✕
              </button>
            </span>
          )}
        </div>
      )}
    </div>
  );
}