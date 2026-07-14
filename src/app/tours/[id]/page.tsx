"use client";

import React from "react";
import { useCurrency } from "@/context/CurrencyContext";
import BookingForm from "@/components/BookingForm";
import { Clock, MapPin, Check, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

const destinationsData = {
  "1": {
    title: "Kyoto Zen Discovery",
    location: "Japan",
    duration: "7 Days",
    priceUSD: 1200,
    image: "https://images.unsplash.com/photo-1533929736458-ca588d08c8be?auto=format&fit=crop&w=1170&q=80",
  },
  "2": {
    title: "Parisian Elegance",
    location: "France",
    duration: "5 Days",
    priceUSD: 1500,
    image: "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?auto=format&fit=crop&w=1120&q=80",
  },
  "3": {
    title: "Bali Wellness Retreat",
    location: "Indonesia",
    duration: "10 Days",
    priceUSD: 890,
    image: "https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?auto=format&fit=crop&w=1170&q=80",
  },
} as const;

export default function TourPackage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = React.use(params);
  const { id } = resolvedParams;

  const { formatPrice } = useCurrency();

  const tour = destinationsData[id as keyof typeof destinationsData];

  // Fallback if invalid ID
  if (!tour) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center bg-white">
        <div className="text-center">
          <h1 className="text-4xl font-black mb-4">Tour Not Found</h1>
          <p className="text-gray-500 mb-8">The tour you&apos;re looking for doesn&apos;t exist.</p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 bg-gray-900 text-white px-6 py-3 rounded-full hover:bg-blue-600 transition-colors"
          >
            <ArrowLeft size={20} />
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <main className="bg-white min-h-screen pt-16">
      {/* Hero Section */}
      <div className="relative h-[55vh] md:h-[65vh] w-full overflow-hidden">
        <img
          src={tour.image}
          alt={tour.title}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent" />

        <div className="absolute inset-x-0 bottom-0 p-6 md:p-12">
          <div className="max-w-5xl mx-auto">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-6 transition-colors"
            >
              <ArrowLeft size={20} /> Back to destinations
            </Link>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-6xl font-black text-white tracking-tight leading-none"
            >
              {tour.title}
            </motion.h1>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-16 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 xl:gap-16">
          {/* Main Content */}
          <div className="lg:col-span-8">
            <div className="flex flex-wrap gap-4 mb-12">
              <div className="flex items-center gap-3 bg-blue-50 text-blue-700 px-5 py-3 rounded-2xl font-semibold">
                <Clock size={22} />
                {tour.duration}
              </div>
              <div className="flex items-center gap-3 bg-gray-100 text-gray-700 px-5 py-3 rounded-2xl font-semibold">
                <MapPin size={22} />
                {tour.location}
              </div>
            </div>

            <h2 className="text-3xl font-black text-gray-900 mb-8">Experience Highlights</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                "Expert Local Guide",
                "Luxury Accommodation",
                "All Entry Fees Included",
                "Private Transportation",
                "Daily Breakfast & Select Meals",
                "24/7 Concierge Support",
              ].map((item, index) => (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="flex items-start gap-4 bg-gray-50 p-6 rounded-3xl hover:bg-gray-100 transition-colors group"
                >
                  <div className="mt-1">
                    <Check className="text-green-500 group-hover:scale-110 transition-transform" size={24} />
                  </div>
                  <span className="font-medium text-gray-800 text-lg">{item}</span>
                </motion.div>
              ))}
            </div>

            {/* You can add more sections here: Itinerary, Inclusions, etc. */}
          </div>

          {/* Booking Sidebar */}
          <div className="lg:col-span-4">
            <div className="sticky top-24">
              <BookingForm
                tourTitle={tour.title}
                price={formatPrice(tour.priceUSD)}
              />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}