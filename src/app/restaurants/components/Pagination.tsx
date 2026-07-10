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
    <div className="flex justify-center items-center gap-3 mt-8">
      <button
        onClick={() => goToPage(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}
        className="p-2 rounded-lg border border-gray-200 dark:border-gray-700 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
      >
        <ChevronLeft size={18} />
      </button>

      <div className="flex items-center gap-2">
        {[...Array(totalPages)].map((_, i) => {
          const page = i + 1;
          if (page === 1 || page === totalPages || Math.abs(page - currentPage) <= 2) {
            return (
              <button
                key={page}
                onClick={() => goToPage(page)}
                className={`w-10 h-10 rounded-lg font-medium transition-colors ${
                  page === currentPage
                    ? 'bg-blue-600 text-white'
                    : 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300'
                }`}
              >
                {page}
              </button>
            );
          }
          if (page === currentPage - 3 || page === currentPage + 3) {
            return <span key={page} className="text-gray-400">…</span>;
          }
          return null;
        })}
      </div>

      <button
        onClick={() => goToPage(Math.min(totalPages, currentPage + 1))}
        disabled={currentPage === totalPages}
        className="p-2 rounded-lg border border-gray-200 dark:border-gray-700 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
      >
        <ChevronRight size={18} />
      </button>
    </div>
  );
}