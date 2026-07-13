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
  description:
    'Discover curated culinary experiences and top-rated restaurants for your next journey.',
};

function calculateAverage(restaurants: Restaurant[]) {
  if (!restaurants || restaurants.length === 0) return '0.0';

  const avg =
    restaurants.reduce((acc, r) => acc + r.rating, 0) /
    restaurants.length;

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

  const filters = {
    destinationId: params.destination || '',
    cuisine: params.cuisine || '',
    minRating: params.rating
      ? Math.max(0, parseFloat(params.rating))
      : 0,
    maxPriceLevel: params.price
      ? Math.max(1, parseInt(params.price, 10))
      : 4,
    sort: params.sort || 'rating',
  };

  const ITEMS_PER_PAGE = 9;
  const currentPage = params.page
    ? Math.max(1, parseInt(params.page, 10))
    : 1;

  const allRestaurants = await fetchRestaurants(filters);

  const featured = allRestaurants.filter((r) => r.featured);

  const totalCount = allRestaurants.length;

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;

  const paginatedRestaurants = allRestaurants.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* ================= HERO ================= */}
      <section className="relative overflow-hidden bg-gray-900 px-6 py-24 text-white">
        <div className="absolute inset-0 bg-[url('/images/dining-hero.jpg')] bg-cover bg-center opacity-40 pointer-events-none" />

        <div className="relative z-10 mx-auto max-w-7xl text-center">
          <h1 className="text-6xl font-black tracking-tighter md:text-7xl">
            Exquisite <span className="text-amber-400">Dining</span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-2xl font-medium text-gray-300">
            Curated culinary experiences for the discerning traveler
          </p>

          <div className="mt-8 flex justify-center gap-6 text-sm font-semibold">
            <span className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/10 px-6 py-3 backdrop-blur-xl">
              🍽️ {totalCount} Restaurants
            </span>

            <span className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/10 px-6 py-3 backdrop-blur-xl">
              ⭐ Avg. Rating {calculateAverage(allRestaurants)}
            </span>
          </div>
        </div>
      </section>

      {/* ================= FEATURED SECTION ================= */}
      {featured.length > 0 && currentPage === 1 && (
        <section className="bg-white py-16">
          <div className="mx-auto max-w-7xl px-6">
            <div className="mb-8 flex items-center gap-4">
              <span className="text-3xl">✨</span>

              <h2 className="text-4xl font-black tracking-tight text-gray-900">
                Wander Luxe Selects
              </h2>

              <span className="rounded-2xl bg-amber-100 px-5 py-2.5 text-xs font-black uppercase tracking-[0.2em] text-amber-700">
                Featured Picks
              </span>
            </div>

            <FeaturedRestaurants restaurants={featured} />
          </div>
        </section>
      )}

      {/* ================= FILTERS ================= */}
      <div className="border-y border-gray-100 bg-white py-6">
        <div className="mx-auto max-w-7xl px-6">
          <RestaurantFilters />
        </div>
      </div>

      {/* ================= MAIN ================= */}
      <main className="mx-auto max-w-7xl px-6 py-16">
        <section>
          <div className="mb-10 flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
            <h2 className="text-4xl font-black tracking-tight text-gray-900">
              All Restaurants
            </h2>

            <div className="flex w-full flex-col items-start gap-6 sm:w-auto sm:flex-row sm:items-center">
              <span className="text-sm font-medium text-gray-500">
                Showing{' '}
                {totalCount === 0
                  ? 0
                  : startIndex + 1}
                -
                {Math.min(
                  startIndex + ITEMS_PER_PAGE,
                  totalCount
                )}{' '}
                of {totalCount}
              </span>

              <SortDropdown />
            </div>
          </div>

          {paginatedRestaurants.length > 0 ? (
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {paginatedRestaurants.map((restaurant) => (
                <RestaurantCard
                  key={restaurant.id}
                  restaurant={restaurant}
                />
              ))}
            </div>
          ) : (
            <EmptyState />
          )}

          {totalCount > ITEMS_PER_PAGE && (
            <div className="mt-16 flex justify-center">
              <Pagination
                totalItems={totalCount}
                itemsPerPage={ITEMS_PER_PAGE}
              />
            </div>
          )}
        </section>
      </main>
    </div>
  );
}