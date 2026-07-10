// src/app/restaurants/components/EmptyState.tsx
'use client';

import { Search } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function EmptyState() {
  const router = useRouter();

  return (
    <div className="col-span-full flex flex-col items-center justify-center py-16 text-center">
      <div className="w-24 h-24 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mb-6">
        <Search size={40} className="text-gray-400" />
      </div>
      <h3 className="text-xl font-bold text-gray-700 dark:text-gray-200">No restaurants found</h3>
      <p className="text-gray-500 dark:text-gray-400 mt-2 max-w-md">
        Try adjusting your filters or search terms. We'll find the perfect spot for you.
      </p>
      <button
        onClick={() => router.push('/restaurants')}
        className="mt-6 px-6 py-3 bg-blue-600 text-white rounded-full font-semibold hover:bg-blue-700 transition-colors"
      >
        Clear all filters
      </button>
    </div>
  );
}