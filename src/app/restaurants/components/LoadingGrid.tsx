// src/app/restaurants/components/LoadingGrid.tsx
export default function LoadingGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {[...Array(6)].map((_, i) => (
        <div key={i} className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm overflow-hidden animate-pulse">
          <div className="h-56 bg-gray-200 dark:bg-gray-700" />
          <div className="p-5 space-y-3">
            <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded w-3/4" />
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2" />
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full" />
            <div className="flex gap-2">
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-16" />
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-16" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}