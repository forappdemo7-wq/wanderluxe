"use client";

import { Star, ArrowRight, ShieldCheck, MapPin } from 'lucide-react';
import Hero from '@/components/Hero';
import Link from 'next/link';
import { useCurrency } from '@/context/CurrencyContext';
import { motion } from 'framer-motion';

const destinations = [
  {
    id: 1,
    title: 'Kyoto, Japan',
    subtitle: 'Cultural tours & temple stays',
    priceUSD: 1200,
    rating: '4.9',
    image: 'https://images.unsplash.com/photo-1533929736458-ca588d08c8be?auto=format&fit=crop&w=1170&q=80',
  },
  {
    id: 2,
    title: 'Paris, France',
    subtitle: 'Luxury dining & art exhibitions',
    priceUSD: 1500,
    rating: '4.8',
    image: 'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?auto=format&fit=crop&w=1120&q=80',
  },
  {
    id: 3,
    title: 'Bali, Indonesia',
    subtitle: 'Wellness retreats & beach resorts',
    priceUSD: 890,
    rating: '4.9',
    image: 'https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?auto=format&fit=crop&w=1170&q=80',
  },
];

const tourPackages = [
  {
    id: 'pkg-1',
    title: 'Royal Rajasthan Trail',
    duration: '10 Days',
    locations: ['Jaipur', 'Jodhpur', 'Udaipur'],
    priceUSD: 3200,
    image: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'pkg-2',
    title: 'Alpine Luxury Express',
    duration: '7 Days',
    locations: ['Zurich', 'Zermatt', 'St. Moritz'],
    priceUSD: 4500,
    image: 'https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'pkg-3',
    title: 'Kyoto Zen & Tokyo Neon',
    duration: '8 Days',
    locations: ['Tokyo', 'Hakone', 'Kyoto'],
    priceUSD: 3800,
    image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=800&q=80',
  },
];

const signatureHotels = [
  {
    id: 'hot-1',
    name: 'The Taj Mahal Palace',
    location: 'Mumbai, India',
    type: 'Heritage Royal',
    priceUSD: 450,
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'hot-2',
    name: 'Aman Tokyo',
    location: 'Tokyo, Japan',
    type: 'Zen Sanctuary',
    priceUSD: 1400,
    rating: 5.0,
    image: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'hot-3',
    name: 'Ritz Paris',
    location: 'Paris, France',
    type: 'Historic Luxury',
    priceUSD: 1800,
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&w=800&q=80',
  },
];

export default function Home() {
  const { formatPrice } = useCurrency();

  return (
    <main className="bg-white">
      <Hero />

      {/* PARTNER MARQUEE */}
      <div className="w-full bg-white border-y border-gray-100 py-12 overflow-hidden">
        <div className="relative flex items-center">
          <div className="absolute left-0 z-10 h-full w-40 bg-gradient-to-r from-white to-transparent" />
          <div className="absolute right-0 z-10 h-full w-40 bg-gradient-to-l from-white to-transparent" />

          <div className="animate-marquee flex items-center gap-24 whitespace-nowrap">
            {[...Array(2)].map((_, loopIndex) => (
              <div key={loopIndex} className="flex items-center gap-24">
                <span className="font-serif text-2xl font-black tracking-tighter text-gray-900">VOGUE</span>
                <div className="flex items-center gap-2">
                  <div className="flex h-6 w-6 items-center justify-center rounded bg-gray-900 text-[10px] font-bold text-white">F</div>
                  <span className="font-sans text-xl font-black uppercase tracking-tight text-gray-900">Forbes</span>
                </div>
                <span className="font-serif text-2xl italic text-gray-900">Condé Nast</span>
                <span className="font-light tracking-[0.6em] text-lg text-gray-900">AMAN</span>
                <div className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full border border-gray-900 text-[8px] font-bold text-gray-900">4S</div>
                  <span className="font-serif text-lg text-gray-900">Four Seasons</span>
                </div>
                <span className="font-sans text-xl font-black italic text-gray-900">TRAVEL+LEISURE</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* STATS SECTION */}
      <section className="mx-auto max-w-7xl border-b border-gray-100 py-16 px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { label: 'Destinations', value: '150+' },
            { label: 'Luxury Hotels', value: '500+' },
            { label: 'Happy Travelers', value: '10k+' },
            { label: 'Expert Guides', value: '100+' },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="text-4xl font-black text-gray-900">{stat.value}</p>
              <p className="mt-2 text-xs font-bold uppercase tracking-widest text-gray-500">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* TRENDING DESTINATIONS */}
      <section className="mx-auto max-w-7xl px-6 py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 text-center md:text-left"
        >
          <h2 className="text-5xl font-black tracking-tight text-gray-900">Trending Destinations</h2>
          <p className="mt-4 text-xl font-medium text-gray-500">
            Hand-picked experiences curated for the modern traveler.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
          {destinations.map((dest, index) => (
            <motion.div
              key={dest.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Link
                href={`/tours/${dest.id}`}
                className="group relative block overflow-hidden rounded-[32px] bg-gray-900 shadow-2xl transition-all duration-700 hover:-translate-y-2"
              >
                <div className="relative h-[450px] w-full overflow-hidden">
                  <img
                    src={dest.image}
                    alt={dest.title}
                    className="h-full w-full object-cover transition-all duration-1000 group-hover:scale-110 group-hover:opacity-60"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

                  {/* Rating Badge */}
                  <div className="absolute right-6 top-6 flex items-center gap-1.5 rounded-2xl bg-white/10 px-4 py-2 backdrop-blur-xl">
                    <Star className="fill-yellow-400 text-yellow-400" size={15} />
                    <span className="font-black text-white">{dest.rating}</span>
                  </div>

                  {/* Content */}
                  <div className="absolute inset-x-0 bottom-0 p-8">
                    <div className="translate-y-8 transition-transform duration-500 group-hover:translate-y-0">
                      <p className="mb-3 flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-blue-400">
                        <ShieldCheck size={14} /> {dest.subtitle}
                      </p>
                      <h3 className="mb-8 text-3xl font-bold text-white">{dest.title}</h3>

                      <div className="flex items-center justify-between opacity-0 transition-all duration-500 group-hover:opacity-100">
                        <div>
                          <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400">From</p>
                          <p className="text-3xl font-black text-white">{formatPrice(dest.priceUSD)}</p>
                        </div>
                        <div className="rounded-full bg-white p-4 text-gray-900 shadow-xl transition-transform duration-500 group-hover:rotate-[-45deg]">
                          <ArrowRight size={24} />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>
      
      {/* BESPOKE PACKAGES */}
      <section className="border-y border-gray-100 bg-gray-50 py-24 px-6">
        <div className="mx-auto max-w-7xl">
          <div className="mb-16 flex flex-col items-end justify-between gap-6 md:flex-row md:items-end">
            <div>
              <p className="text-xs font-black uppercase tracking-widest text-amber-600">Signature Journeys</p>
              <h2 className="text-5xl font-black tracking-tight text-gray-900 leading-none">
                Bespoke<br />Packages
              </h2>
            </div>
            <p className="max-w-sm text-gray-600">
              Multi-day luxury journeys meticulously planned by our regional experts.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {tourPackages.map((pkg, index) => (
              <motion.div
                key={pkg.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group overflow-hidden rounded-[32px] border border-gray-100 bg-white shadow-sm transition-all hover:shadow-2xl"
              >
                <div className="h-64 overflow-hidden">
                  <img
                    src={pkg.image}
                    alt={pkg.title}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>

                <div className="p-8">
                  <span className="mb-4 inline-block rounded-full bg-amber-100 px-4 py-1 text-xs font-bold uppercase tracking-widest text-amber-700">
                    {pkg.duration}
                  </span>

                  <h3 className="mb-4 text-2xl font-bold leading-tight text-gray-900">{pkg.title}</h3>

                  <div className="mb-8 flex flex-wrap gap-x-4 gap-y-1 text-sm text-gray-600">
                    {pkg.locations.map((loc, i) => (
                      <span key={i}>
                        {loc}
                        {i < pkg.locations.length - 1 && <span className="mx-2 text-gray-400">→</span>}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-end justify-between border-t border-gray-100 pt-6">
                    <div>
                      <p className="text-xs font-bold uppercase tracking-widest text-gray-500">Starting from</p>
                      <p className="text-3xl font-black text-gray-900">{formatPrice(pkg.priceUSD)}</p>
                    </div>
                    <Link
                      href={`/packages/${pkg.id}`}
                      className="rounded-full bg-gray-900 p-4 text-white transition-all hover:bg-amber-600 hover:scale-110"
                    >
                      <ArrowRight size={22} />
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SIGNATURE HOTELS */}
      <section className="mx-auto max-w-7xl px-6 py-24">
        <div className="mb-16 text-center">
          <h2 className="text-5xl font-black tracking-tight text-gray-900">
            Signature <span className="text-amber-600">Hotels</span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-lg text-gray-600">
            Handpicked collection of the world’s most exclusive stays.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {signatureHotels.map((hotel, index) => (
            <motion.div
              key={hotel.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group cursor-pointer rounded-[32px] border border-gray-100 bg-white p-4 shadow-sm transition-all hover:border-amber-200 hover:shadow-xl"
            >
              <div className="relative mb-6 h-72 overflow-hidden rounded-[24px]">
                <img
                  src={hotel.image}
                  alt={hotel.name}
                  className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-110"
                />
                <div className="absolute right-4 top-4 flex items-center gap-1.5 rounded-full bg-white/95 px-3 py-1.5 backdrop-blur">
                  <Star size={14} className="fill-amber-400 text-amber-400" />
                  <span className="text-sm font-bold text-gray-900">{hotel.rating}</span>
                </div>
              </div>

              <div className="px-3 pb-3">
                <h4 className="mb-2 text-2xl font-bold text-gray-900">{hotel.name}</h4>
                <div className="mb-6 flex items-center gap-2 text-sm text-gray-600">
                  <MapPin size={16} />
                  <span>{hotel.location}</span>
                </div>

                <div className="flex items-center justify-between border-t border-gray-100 pt-5">
                  <span className="rounded-full bg-amber-100 px-4 py-1 text-xs font-bold uppercase tracking-widest text-amber-700">
                    {hotel.type}
                  </span>
                  <div className="text-right">
                    <p className="text-2xl font-black text-gray-900">
                      {formatPrice(hotel.priceUSD)}
                    </p>
                    <p className="text-xs text-gray-500">per night</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <Link
            href="/hotels"
            className="inline-flex items-center gap-3 rounded-full bg-gray-900 px-10 py-4 text-sm font-bold uppercase tracking-widest text-white transition-all hover:bg-amber-600"
          >
            Explore All Signature Hotels
            <ArrowRight size={20} />
          </Link>
        </div>
      </section>
    </main>
  );
}