// src/app/restaurants/components/SortDropdown.tsx
'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { ChevronDown, Check } from 'lucide-react';

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
        className="flex items-center gap-3 px-6 py-4 bg-white border border-gray-200 rounded-2xl hover:border-gray-300 transition-all text-sm font-semibold text-gray-700 hover:text-gray-900"
      >
        {currentLabel}
        <ChevronDown 
          size={18} 
          className={`transition-transform ${isOpen ? 'rotate-180' : ''}`} 
        />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-3 w-56 bg-white rounded-3xl shadow-xl border border-gray-100 py-2 z-50 overflow-hidden">
          {sortOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => handleSort(option.value)}
              className={`w-full text-left px-6 py-3.5 text-sm flex items-center justify-between transition-all hover:bg-gray-50 ${
                currentSort === option.value 
                  ? 'text-gray-900 font-semibold bg-gray-50' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <span>{option.label}</span>
              {currentSort === option.value && (
                <Check size={18} className="text-amber-600" />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}