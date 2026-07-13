// src/app/restaurants/components/Pagination.tsx
'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationProps {
  totalItems?: number;
  itemsPerPage?: number;
}

export default function Pagination({ totalItems = 10, itemsPerPage = 9 }: PaginationProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentPage = parseInt(searchParams.get('page') || '1');
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const goToPage = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', page.toString());
    router.push(`/restaurants?${params.toString()}`);
  };

  if (totalPages <= 1) return null;

  return (
    <div className="flex justify-center items-center gap-4">
      {/* Previous Button */}
      <button
        onClick={() => goToPage(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}
        className="flex items-center gap-2 px-6 py-4 rounded-2xl border border-gray-200 text-gray-600 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-all hover:border-gray-300"
      >
        <ChevronLeft size={20} />
        <span className="font-medium text-sm">Previous</span>
      </button>

      {/* Page Numbers */}
      <div className="flex items-center gap-2">
        {[...Array(totalPages)].map((_, i) => {
          const page = i + 1;
          
          // Show first, last, current, and pages close to current
          if (page === 1 || page === totalPages || Math.abs(page - currentPage) <= 2) {
            return (
              <button
                key={page}
                onClick={() => goToPage(page)}
                className={`w-12 h-12 rounded-2xl font-semibold transition-all text-sm
                  ${page === currentPage 
                    ? 'bg-gray-900 text-white shadow-lg' 
                    : 'hover:bg-gray-100 text-gray-600 hover:text-gray-900'
                  }`}
              >
                {page}
              </button>
            );
          }
          
          // Ellipsis
          if (page === currentPage - 3 || page === currentPage + 3) {
            return <span key={page} className="text-gray-400 px-2">…</span>;
          }
          
          return null;
        })}
      </div>

      {/* Next Button */}
      <button
        onClick={() => goToPage(Math.min(totalPages, currentPage + 1))}
        disabled={currentPage === totalPages}
        className="flex items-center gap-2 px-6 py-4 rounded-2xl border border-gray-200 text-gray-600 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-all hover:border-gray-300"
      >
        <span className="font-medium text-sm">Next</span>
        <ChevronRight size={20} />
      </button>
    </div>
  );
}