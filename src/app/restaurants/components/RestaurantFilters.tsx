// src/app/restaurants/components/RestaurantFilters.tsx
'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';

const quickFilters = [
  { label: '⭐ Top Rated', value: 'top-rated', type: 'rating' },
  { label: '💰 Best Value', value: 'best-value', type: 'price' },
  { label: '🌟 Featured', value: 'featured', type: 'special' },
];

export default function RestaurantFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Read initial values from URL
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
    // Re-apply filters after removal
    setTimeout(applyFilters, 0);
  };

  const hasActiveFilters = cuisine || rating || price || activeQuickFilter;

  return (
    <div className="space-y-4">
      {/* Quick Filter Pills */}
      <div className="flex flex-wrap gap-2">
        {quickFilters.map((filter) => (
          <button
            key={filter.value}
            onClick={() => handleQuickFilter(filter.value)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
              activeQuickFilter === filter.value
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30'
                : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
            }`}
          >
            {filter.label}
          </button>
        ))}
      </div>

      {/* Main Filters */}
      <div className="flex flex-wrap gap-3 items-center">
        <input
          type="text"
          placeholder="🔍 Search cuisine, name..."
          value={cuisine}
          onChange={(e) => setCuisine(e.target.value)}
          className="px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all flex-1 min-w-[180px]"
        />

        <select
          value={rating}
          onChange={(e) => setRating(e.target.value)}
          className="px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
        >
          <option value="">All Ratings</option>
          <option value="4.8">⭐ 4.8+</option>
          <option value="4.5">⭐ 4.5+</option>
          <option value="4.0">⭐ 4.0+</option>
          <option value="3.5">⭐ 3.5+</option>
        </select>

        <select
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
        >
          <option value="">All Prices</option>
          <option value="1">$ Budget</option>
          <option value="2">$$ Moderate</option>
          <option value="3">$$$ Fine</option>
          <option value="4">$$$$ Luxury</option>
        </select>

        <button
          onClick={applyFilters}
          className="px-6 py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl font-bold hover:shadow-lg hover:shadow-blue-600/30 transition-all"
        >
          Apply Filters
        </button>

        {hasActiveFilters && (
          <button
            onClick={clearAll}
            className="px-4 py-2.5 text-sm text-red-500 hover:text-red-700 transition-colors font-medium"
          >
            Clear All ✕
          </button>
        )}
      </div>

      {/* Active Filters Display */}
      {hasActiveFilters && (
        <div className="flex flex-wrap gap-2 text-sm">
          <span className="text-gray-600 dark:text-gray-400">Active filters:</span>
          {cuisine && (
            <span className="bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 px-3 py-1 rounded-full flex items-center gap-1">
              {cuisine}
              <button onClick={() => removeFilter('cuisine')} className="ml-1 hover:text-red-500">✕</button>
            </span>
          )}
          {rating && (
            <span className="bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-300 px-3 py-1 rounded-full flex items-center gap-1">
              ⭐ {rating}+
              <button onClick={() => removeFilter('rating')} className="ml-1 hover:text-red-500">✕</button>
            </span>
          )}
          {price && (
            <span className="bg-purple-100 dark:bg-purple-900/40 text-purple-700 dark:text-purple-300 px-3 py-1 rounded-full flex items-center gap-1">
              {'$'.repeat(parseInt(price))}
              <button onClick={() => removeFilter('price')} className="ml-1 hover:text-red-500">✕</button>
            </span>
          )}
          {activeQuickFilter && (
            <span className="bg-yellow-100 dark:bg-yellow-900/40 text-yellow-700 dark:text-yellow-300 px-3 py-1 rounded-full flex items-center gap-1">
              {quickFilters.find(f => f.value === activeQuickFilter)?.label}
              <button onClick={() => removeFilter('quick')} className="ml-1 hover:text-red-500">✕</button>
            </span>
          )}
        </div>
      )}
    </div>
  );
}