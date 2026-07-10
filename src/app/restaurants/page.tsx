// src/app/restaurants/page.tsx
import { Metadata } from 'next';
import { fetchRestaurants } from '@/services/restaurantApi';
import type { Restaurant } from '@/types';

// Components
import RestaurantCard from './components/RestaurantCard';
import RestaurantFilters from './components/RestaurantFilters';
import FeaturedRestaurants from './components/FeaturedRestaurants';
import SortDropdown from './components/SortDropdown';
import EmptyState from './components/EmptyState';
import Pagination from './components/Pagination';

export const metadata: Metadata = {
  title: 'Exquisite Dining | Wander Luxe',
  description: 'Discover curated culinary experiences and top-rated restaurants for your next journey.',
};

function calculateAverage(restaurants: Restaurant[]) {
  if (!restaurants || restaurants.length === 0) return '0.0';
  const avg = restaurants.reduce((acc, r) => acc + r.rating, 0) / restaurants.length;
  return avg.toFixed(1);
}

type SearchParams = Promise<{ 
  destination?: string; 
  cuisine?: string; 
  rating?: string; 
  price?: string; 
  sort?: string;
  page?: string;
}>;

export default async function RestaurantsPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const params = await searchParams;
  
  // Robust filters with safe number parsing to prevent NaN errors
  const filters = {
    destinationId: params.destination || '',
    cuisine: params.cuisine || '',
    minRating: params.rating ? Math.max(0, parseFloat(params.rating)) : 0,
    maxPriceLevel: params.price ? Math.max(1, parseInt(params.price, 10)) : 4,
    sort: params.sort || 'rating',
  };

  // Pagination Configuration
  const ITEMS_PER_PAGE = 9;
  const currentPage = params.page ? Math.max(1, parseInt(params.page, 10)) : 1;

  const allRestaurants = await fetchRestaurants(filters);
  const featured = allRestaurants.filter((r) => r.featured);
  const totalCount = allRestaurants.length;
  
  // Apply pagination slice to the UI
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedRestaurants = allRestaurants.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 text-gray-900 dark:text-gray-100">
      {/* Hero Section */}
      <section className="relative bg-black text-white py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/images/dining-hero.jpg')] bg-cover bg-center opacity-30 pointer-events-none" />
        <div className="relative max-w-7xl mx-auto text-center z-10">
          <h1 className="text-5xl md:text-6xl font-black tracking-tight drop-shadow-md">
            Exquisite <span className="text-blue-400">Dining</span>
          </h1>
          <p className="text-xl text-gray-200 mt-4 max-w-2xl mx-auto font-medium">
            Curated culinary experiences for the discerning traveler
          </p>
          <div className="mt-6 flex justify-center gap-4 sm:gap-6 text-sm font-semibold">
            <span className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full backdrop-blur-md border border-white/5">
              🍽️ {totalCount} Restaurants
            </span>
            <span className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full backdrop-blur-md border border-white/5">
              ⭐ Avg. Rating {calculateAverage(allRestaurants)}
            </span>
          </div>
        </div>
      </section>

      {/* Filters */}
<div className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-md border-b border-gray-200 dark:border-gray-700">
  <div className="max-w-7xl mx-auto px-4 py-4">
    <RestaurantFilters />
  </div>
</div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        
        {/* Featured Section - Only show on page 1 */}
        {featured.length > 0 && currentPage === 1 && (
          <section className="mb-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex items-center gap-3 mb-6">
              <span className="text-2xl drop-shadow-sm" aria-hidden="true">✨</span>
              <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-transparent dark:bg-clip-text dark:bg-gradient-to-r dark:from-white dark:to-gray-300">
                Wander Luxe Selects
              </h2>
              <span className="text-sm text-blue-700 dark:text-blue-300 font-semibold px-2.5 py-1 bg-blue-50/80 dark:bg-blue-900/40 border border-blue-200 dark:border-blue-800/50 backdrop-blur-sm rounded-md">
                Featured Picks
              </span>
            </div>
            <FeaturedRestaurants restaurants={featured} />
          </section>
        )}

        {/* All Restaurants */}
        <section>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
            <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              All Restaurants
            </h2>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 w-full sm:w-auto justify-between">
              <span className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                Showing {totalCount === 0 ? 0 : startIndex + 1}-{Math.min(startIndex + ITEMS_PER_PAGE, totalCount)} of {totalCount}
              </span>
              <SortDropdown />
            </div>
          </div>

          {/* Grid Render */}
          {paginatedRestaurants.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {paginatedRestaurants.map((rest) => (
                <RestaurantCard key={rest.id} restaurant={rest} />
              ))}
            </div>
          ) : (
            <EmptyState />
          )}

          {/* Pagination Controls */}
          {totalCount > ITEMS_PER_PAGE && (
            <div className="mt-12 flex justify-center">
              <Pagination 
                totalItems={totalCount} 
                itemsPerPage={ITEMS_PER_PAGE} 
                currentPage={currentPage} 
              />
            </div>
          )}
        </section>
      </main>
    </div>
  );
}