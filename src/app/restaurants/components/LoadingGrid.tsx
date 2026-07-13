// src/app/restaurants/components/LoadingGrid.tsx
export default function LoadingGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {[...Array(6)].map((_, i) => (
        <div 
          key={i} 
          className="bg-white rounded-[32px] border border-gray-100 overflow-hidden shadow-sm animate-pulse"
        >
          {/* Image Skeleton */}
          <div className="h-64 bg-gray-200" />

          {/* Content Skeleton */}
          <div className="p-8 space-y-6">
            <div className="h-6 bg-gray-200 rounded-2xl w-3/4" />
            
            <div className="space-y-3">
              <div className="h-4 bg-gray-200 rounded-xl w-full" />
              <div className="h-4 bg-gray-200 rounded-xl w-5/6" />
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-gray-100">
              <div className="h-8 bg-gray-200 rounded-2xl w-24" />
              <div className="h-10 w-10 bg-gray-200 rounded-full" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}