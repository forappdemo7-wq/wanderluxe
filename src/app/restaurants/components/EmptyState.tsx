// src/app/restaurants/components/EmptyState.tsx
'use client';

import { Search, RotateCcw } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function EmptyState() {
  const router = useRouter();

  return (
    <div className="col-span-full flex flex-col items-center justify-center py-20 text-center">
      <div className="w-28 h-28 bg-gray-100 rounded-full flex items-center justify-center mb-8">
        <Search size={48} className="text-gray-400" />
      </div>
      
      <h3 className="text-3xl font-black tracking-tight text-gray-900 mb-3">
        No restaurants found
      </h3>
      
      <p className="text-gray-500 max-w-md text-lg">
        We couldn&apos;t find any restaurants matching your current filters. 
        Try broadening your search criteria.
      </p>

      <button
        onClick={() => router.push('/restaurants')}
        className="mt-10 inline-flex items-center gap-3 bg-gray-900 hover:bg-amber-600 transition-all text-white px-8 py-4 rounded-2xl font-semibold text-sm uppercase tracking-widest"
      >
        <RotateCcw size={18} />
        Clear All Filters
      </button>
    </div>
  );
}