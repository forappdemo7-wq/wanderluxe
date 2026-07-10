// src/app/restaurants/components/SortDropdown.tsx
'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const sortOptions = [
  { label: 'Best Rating', value: 'rating' },
  { label: 'Most Reviews', value: 'reviews' },
  { label: 'Price: Low to High', value: 'price-asc' },
  { label: 'Price: High to Low', value: 'price-desc' },
  { label: 'A-Z', value: 'name' },
];

export default function SortDropdown() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentSort = searchParams.get('sort') || 'rating';
  const [isOpen, setIsOpen] = useState(false);

  const handleSort = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('sort', value);
    router.push(`/restaurants?${params.toString()}`);
    setIsOpen(false);
  };

  const currentLabel = sortOptions.find((opt) => opt.value === currentSort)?.label || 'Sort by';

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2 text-sm font-medium bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
      >
        {currentLabel}
        <ChevronDown size={16} className={`transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden z-50">
          {sortOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => handleSort(option.value)}
              className={`w-full text-left px-4 py-2.5 text-sm transition-colors ${
                currentSort === option.value
                  ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 font-semibold'
                  : 'hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300'
              }`}
            >
              {option.label}
              {currentSort === option.value && (
                <span className="ml-2 text-blue-500">✓</span>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}