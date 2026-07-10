// src/app/restaurants/[id]/page.tsx
import { fetchRestaurantById } from '@/services/restaurantApi';
import Image from 'next/image';
import { notFound } from 'next/navigation';

export default async function RestaurantDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const restaurant = await fetchRestaurantById(id);
  if (!restaurant) notFound();

  const priceSymbols: Record<string, string> = { '$': '$', '$$': '$$', '$$$': '$$$', '$$$$': '$$$$' };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl overflow-hidden">
          {/* Image */}
          <div className="relative h-96 w-full">
            <Image
              src={restaurant.image}
              alt={restaurant.name}
              fill
              className="object-cover"
            />
            {restaurant.featured && (
              <span className="absolute top-4 left-4 bg-yellow-400 text-black text-sm font-bold px-4 py-2 rounded-full shadow-lg">
                ✨ Featured
              </span>
            )}
          </div>

          {/* Content */}
          <div className="p-8 md:p-12">
            <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
              <div>
                <h1 className="text-4xl font-bold">{restaurant.name}</h1>
                <p className="text-gray-500 dark:text-gray-400 text-lg mt-1">{restaurant.cuisine}</p>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 bg-green-50 dark:bg-green-900/30 px-4 py-2 rounded-xl">
                  <span className="text-yellow-500 text-xl">★</span>
                  <span className="text-2xl font-bold">{restaurant.rating}</span>
                  <span className="text-gray-400">({restaurant.reviewsCount} reviews)</span>
                </div>
                <div className="text-2xl font-bold text-gray-600 dark:text-gray-300">
                  {priceSymbols[restaurant.priceLevel]}
                </div>
              </div>
            </div>

            <p className="mt-6 text-gray-600 dark:text-gray-300 text-lg leading-relaxed">
              {restaurant.description}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
              <div className="space-y-3">
                <h3 className="font-semibold text-gray-700 dark:text-gray-200">📍 Location</h3>
                <p className="text-gray-600 dark:text-gray-300">{restaurant.address}</p>

                <h3 className="font-semibold text-gray-700 dark:text-gray-200 mt-4">🕒 Opening Hours</h3>
                <p className="text-gray-600 dark:text-gray-300">{restaurant.openingHours}</p>

                <h3 className="font-semibold text-gray-700 dark:text-gray-200 mt-4">📞 Contact</h3>
                <p className="text-gray-600 dark:text-gray-300">{restaurant.phone}</p>
                {restaurant.website && (
                  <a
                    href={restaurant.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline block"
                  >
                    Visit Website →
                  </a>
                )}
              </div>

              <div className="space-y-3">
                {restaurant.dietaryOptions && restaurant.dietaryOptions.length > 0 && (
                  <>
                    <h3 className="font-semibold text-gray-700 dark:text-gray-200">🥗 Dietary Options</h3>
                    <div className="flex flex-wrap gap-2">
                      {restaurant.dietaryOptions.map((opt) => (
                        <span key={opt} className="bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-3 py-1 rounded-full text-sm font-medium">
                          {opt}
                        </span>
                      ))}
                    </div>
                  </>
                )}

                {restaurant.reservationRequired && (
                  <div className="mt-4 p-4 bg-red-50 dark:bg-red-900/20 rounded-xl border border-red-200 dark:border-red-800">
                    <p className="text-red-600 dark:text-red-400 font-semibold">⚠️ Reservation required – book in advance!</p>
                  </div>
                )}

                {/* Map Placeholder */}
                <div className="mt-6">
                  <h3 className="font-semibold text-gray-700 dark:text-gray-200 mb-2">📍 Map</h3>
                  <div
                    className="w-full h-48 bg-gray-200 dark:bg-gray-700 rounded-xl relative overflow-hidden"
                    style={{
                      background: `radial-gradient(circle at ${restaurant.coordinates.x}% ${restaurant.coordinates.y}%, #3b82f6 12px, transparent 12px)`,
                    }}
                  >
                    <div className="absolute inset-0 flex items-center justify-center text-gray-500 dark:text-gray-400 text-sm">
                      (Interactive map coming soon)
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}