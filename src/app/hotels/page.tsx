"use client";

import React, { useState, useMemo } from "react";
import { Star, MapPin, Search, SlidersHorizontal } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useCurrency } from "@/context/CurrencyContext";

// Hotel Data
const signatureHotels = [
  { id: "hot-1", name: "The Taj Mahal Palace", location: "Mumbai, India", type: "Heritage Royal", priceUSD: 450, rating: 4.9, image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80" },
  { id: "hot-2", name: "Aman Tokyo", location: "Tokyo, Japan", type: "Zen Sanctuary", priceUSD: 1400, rating: 5.0, image: "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=800&q=80" },
  { id: "hot-3", name: "Ritz Paris", location: "Paris, France", type: "Historic Luxury", priceUSD: 1800, rating: 4.8, image: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&w=800&q=80" },
  { id: "hot-4", name: "Burj Al Arab", location: "Dubai, UAE", type: "Ultra Luxury", priceUSD: 2500, rating: 5.0, image: "https://images.unsplash.com/photo-1526495124232-a04e1849168c?auto=format&fit=crop&w=800&q=80" },
  { id: "hot-5", name: "The Plaza", location: "New York, USA", type: "Classic Elegance", priceUSD: 1200, rating: 4.7, image: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=800&q=80" },
  { id: "hot-6", name: "Marina Bay Sands", location: "Singapore", type: "Sky Luxury", priceUSD: 950, rating: 4.8, image: "https://images.unsplash.com/photo-1564501049412-61c2a3083791?auto=format&fit=crop&w=800&q=80" },
  { id: "hot-7", name: "Four Seasons Bora Bora", location: "Bora Bora, French Polynesia", type: "Island Paradise", priceUSD: 2200, rating: 5.0, image: "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?auto=format&fit=crop&w=800&q=80" },
  { id: "hot-13", name: "Six Senses Zighy Bay", location: "Oman", type: "Eco Luxury", priceUSD: 1700, rating: 4.8, image: "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=800&q=80" },
  { id: "hot-22", name: "Badrutt’s Palace", location: "St. Moritz, Switzerland", type: "Alpine Luxury", priceUSD: 2100, rating: 4.9, image: "https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&w=800&q=80" },
];

// Animation Variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

// Hotel Card Component
const HotelCard = ({ hotel }: { hotel: typeof signatureHotels[0] }) => {
  const { formatPrice } = useCurrency();

  return (
    <motion.div
      variants={cardVariants}
      layout
      whileHover={{ y: -8 }}
      className="group bg-white rounded-3xl border border-gray-100 shadow-sm hover:shadow-2xl transition-all duration-300 overflow-hidden"
    >
      <div className="relative h-64 overflow-hidden">
        {/* Rating Badge */}
        <div className="absolute top-4 right-4 z-10 bg-white/95 backdrop-blur-md px-3.5 py-1 rounded-full flex items-center gap-1.5 shadow-sm">
          <Star size={15} className="text-amber-400 fill-amber-400" />
          <span className="text-sm font-bold text-gray-900">{hotel.rating}</span>
        </div>

        <img
          src={hotel.image}
          alt={hotel.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
      </div>

      <div className="p-6">
        <span className="inline-block text-xs uppercase tracking-widest font-bold text-amber-600 bg-amber-50 px-3 py-1 rounded-full mb-3">
          {hotel.type}
        </span>

        <h3 className="text-2xl font-bold text-gray-900 group-hover:text-amber-600 transition-colors leading-tight">
          {hotel.name}
        </h3>

        <div className="flex items-center text-gray-500 text-sm mt-2 mb-6">
          <MapPin size={16} className="mr-1.5 flex-shrink-0" />
          {hotel.location}
        </div>

        <div className="flex items-baseline gap-1 border-t border-gray-100 pt-5">
          <span className="text-3xl font-black text-gray-900">
            {formatPrice(hotel.priceUSD)}
          </span>
          <span className="text-gray-400 text-sm font-medium">/ night</span>
        </div>
      </div>
    </motion.div>
  );
};

// Main Hotels Page
export default function HotelsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState("All");

  const categories = useMemo(() => 
    ["All", ...Array.from(new Set(signatureHotels.map((h) => h.type)))],
    []
  );

  const filteredHotels = signatureHotels.filter((hotel) => {
    const matchesSearch = 
      hotel.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      hotel.location.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesType = selectedType === "All" || hotel.type === selectedType;
    
    return matchesSearch && matchesType;
  });

  return (
    <main className="bg-[#fcfcfc] min-h-screen px-6 py-20">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-16">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-6xl font-black tracking-tighter text-gray-900 mb-4"
          >
            Signature <span className="text-amber-600">Stays</span>
          </motion.h1>
          <p className="text-gray-600 max-w-xl mx-auto text-lg">
            Discover our handpicked collection of the world&apos;s most exclusive and iconic hotels.
          </p>
        </div>

        {/* Search & Filter Bar */}
        <div className="flex flex-col lg:flex-row gap-4 mb-12 items-center justify-between sticky top-6 z-20 bg-[#fcfcfc]/95 backdrop-blur-lg p-5 rounded-3xl border border-gray-100 shadow-sm">
          <div className="relative w-full lg:w-96">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search by hotel or destination..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-14 pr-5 py-3.5 rounded-2xl border border-gray-200 focus:border-amber-400 focus:ring-amber-400 outline-none transition-all text-base"
            />
          </div>

          <div className="flex gap-2 overflow-x-auto pb-2 lg:pb-0 w-full lg:w-auto no-scrollbar">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedType(cat)}
                className={`px-6 py-2.5 rounded-full text-sm font-semibold whitespace-nowrap transition-all ${
                  selectedType === cat 
                    ? "bg-amber-600 text-white shadow-md" 
                    : "bg-white text-gray-600 border border-gray-200 hover:border-amber-300 hover:text-gray-900"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Hotels Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredHotels.length > 0 ? (
              filteredHotels.map((hotel) => (
                <HotelCard key={hotel.id} hotel={hotel} />
              ))
            ) : (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="col-span-full py-24 text-center"
              >
                <div className="mx-auto w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-6">
                  <SlidersHorizontal className="text-gray-400" size={32} />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-2">No hotels found</h3>
                <p className="text-gray-500">Try adjusting your search or filter.</p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </main>
  );
}