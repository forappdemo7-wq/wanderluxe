// src/app/restaurants/[id]/page.tsx
import { fetchRestaurantById } from '@/services/restaurantApi';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { ArrowLeft, MapPin, Clock, Phone, Globe, Star } from 'lucide-react';
import Link from 'next/link';

export default async function RestaurantDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const restaurant = await fetchRestaurantById(id);
  if (!restaurant) notFound();

  const priceSymbols: Record<string, string> = { 
    '$': '$', 
    '$$': '$$', 
    '$$$': '$$$', 
    '$$$$': '$$$$' 
  };

  return (
    <div className="min-h-screen bg-white pt-20">   {/* Added pt-20 to prevent header overlap */}
      {/* Back Button */}
      <div className="max-w-7xl mx-auto px-6 pb-4">
        <Link 
          href="/restaurants"
          className="inline-flex items-center gap-2 text-gray-500 hover:text-gray-900 transition-colors font-medium"
        >
          <ArrowLeft size={20} />
          Back to Restaurants
        </Link>
      </div>

      <div className="max-w-7xl mx-auto px-6 pb-16">
        <div className="bg-white rounded-[32px] shadow-xl overflow-hidden border border-gray-100">
          
          {/* Hero Image - Smaller */}
          <div className="relative h-[340px] md:h-[420px] w-full">
            <Image
              src={restaurant.image}
              alt={restaurant.name}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent" />
            
            {restaurant.featured && (
              <span className="absolute top-6 left-6 bg-amber-400 text-black text-xs font-black uppercase tracking-widest px-6 py-3 rounded-2xl shadow-lg">
                ✨ FEATURED
              </span>
            )}

            {/* Rating Badge */}
            <div className="absolute bottom-6 right-6 bg-white rounded-2xl px-6 py-4 shadow-xl flex items-center gap-3">
              <Star className="fill-amber-400 text-amber-400" size={28} />
              <div>
                <p className="text-4xl font-black text-gray-900 leading-none">{restaurant.rating}</p>
                <p className="text-xs text-gray-500">({restaurant.reviewsCount} reviews)</p>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-8 md:p-14">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
              <div>
                <h1 className="text-5xl font-black tracking-tight text-gray-900">
                  {restaurant.name}
                </h1>
                <p className="text-2xl text-gray-500 mt-2">{restaurant.cuisine}</p>
              </div>

              <div className="text-5xl font-black text-gray-900">
                {priceSymbols[restaurant.priceLevel] || '$$$$'}
              </div>
            </div>

            <p className="text-xl text-gray-600 leading-relaxed max-w-3xl">
              {restaurant.description}
            </p>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-16">
              <div className="space-y-10">
                <div>
                  <div className="flex items-center gap-3 text-gray-500 mb-3">
                    <MapPin size={22} />
                    <h3 className="font-bold uppercase tracking-widest text-sm">Location</h3>
                  </div>
                  <p className="text-lg text-gray-700">{restaurant.address}</p>
                </div>

                <div>
                  <div className="flex items-center gap-3 text-gray-500 mb-3">
                    <Clock size={22} />
                    <h3 className="font-bold uppercase tracking-widest text-sm">Opening Hours</h3>
                  </div>
                  <p className="text-lg text-gray-700">{restaurant.openingHours}</p>
                </div>

                <div>
                  <div className="flex items-center gap-3 text-gray-500 mb-3">
                    <Phone size={22} />
                    <h3 className="font-bold uppercase tracking-widest text-sm">Contact</h3>
                  </div>
                  <p className="text-lg text-gray-700">{restaurant.phone}</p>
                  {restaurant.website && (
                    <a
                      href={restaurant.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 mt-3 text-amber-600 hover:text-amber-700 font-medium"
                    >
                      Visit Website <Globe size={18} />
                    </a>
                  )}
                </div>
              </div>

              <div className="space-y-10">
                {restaurant.dietaryOptions && restaurant.dietaryOptions.length > 0 && (
                  <div>
                    <h3 className="font-bold uppercase tracking-widest text-sm text-gray-500 mb-4">Dietary Options</h3>
                    <div className="flex flex-wrap gap-3">
                      {restaurant.dietaryOptions.map((opt) => (
                        <span key={opt} className="bg-amber-50 text-amber-700 px-5 py-2 rounded-2xl text-sm font-medium">
                          {opt}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {restaurant.reservationRequired && (
                  <div className="bg-amber-50 border border-amber-200 p-6 rounded-3xl">
                    <p className="text-amber-700 font-semibold">⚠️ Advance reservation recommended</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}