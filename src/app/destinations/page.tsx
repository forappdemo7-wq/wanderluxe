"use client";

import { useState, useMemo, useEffect, useCallback } from "react";
import { 
  Star, 
  MapPin, 
  ArrowUpRight, 
  Search, 
  SlidersHorizontal, 
  Heart, 
  X, 
  TrendingUp 
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useCurrency } from '@/context/CurrencyContext';

// ---------------- TYPES ----------------
type Destination = {
  id: string;
  title: string;
  location: string;
  country: string;
  basePriceUSD: number;
  rating: number;
  image: string;
  type: string;
};

// ---------------- DATA ----------------
const DESTINATIONS: Destination[] = [
  { id: "d1", title: "The Taj Mahal Palace", location: "Colaba", country: "Mumbai, India", basePriceUSD: 450, rating: 4.9, image: "https://images.pexels.com/photos/1583339/pexels-photo-1583339.jpeg", type: "Heritage" },
  { id: "d2", title: "Aman Tokyo", location: "Otemachi", country: "Tokyo, Japan", basePriceUSD: 1200, rating: 5.0, image: "https://images.pexels.com/photos/2506923/pexels-photo-2506923.jpeg", type: "Urban" },
  { id: "d3", title: "Wildflower Hall", location: "Mashobra", country: "Shimla, India", basePriceUSD: 550, rating: 4.8, image: "https://images.pexels.com/photos/70441/pexels-photo-70441.jpeg", type: "Mountain" },
  { id: "d4", title: "Taj Lake Palace", location: "Lake Pichola", country: "Udaipur, India", basePriceUSD: 750, rating: 4.9, image: "https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg", type: "Palace" },
  { id: "d5", title: "Burj Al Arab", location: "Jumeirah", country: "Dubai, UAE", basePriceUSD: 2500, rating: 5.0, image: "https://images.unsplash.com/photo-1526495124232-a04e1849168c?auto=format&fit=crop&w=800&q=80", type: "Iconic" },
  { id: "d6", title: "Aman-i-Khás", location: "Ranthambore", country: "India", basePriceUSD: 1800, rating: 4.9, image: "https://images.pexels.com/photos/301612/pexels-photo-301612.jpeg", type: "Wilderness" },
];

export default function DestinationsPage() {
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState<string>("rating-desc");
  const [filterType, setFilterType] = useState<string>("all");
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(true);
  
  const { formatPrice } = useCurrency();

  // 1. Initial Loading Simulation
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  // 2. Search Debounce
  useEffect(() => {
    const t = setTimeout(() => setDebouncedQuery(query), 300);
    return () => clearTimeout(t);
  }, [query]);

  // 3. Persistent Favorites
  useEffect(() => {
    const stored = localStorage.getItem("favorites");
    if (stored) setFavorites(new Set(JSON.parse(stored)));
  }, []);

  const toggleFavorite = useCallback((e: React.MouseEvent, id: string) => {
    e.preventDefault();
    e.stopPropagation();
    setFavorites(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) newSet.delete(id);
      else newSet.add(id);
      localStorage.setItem("favorites", JSON.stringify(Array.from(newSet)));
      return newSet;
    });
  }, []);

  // 4. Filtering and Sorting Logic
  const filteredAndSorted = useMemo(() => {
    let data = [...DESTINATIONS];

    if (debouncedQuery) {
      data = data.filter((d) =>
        `${d.title} ${d.location} ${d.country}`.toLowerCase().includes(debouncedQuery.toLowerCase())
      );
    }

    if (filterType !== "all") {
      data = data.filter((d) => d.type === filterType);
    }

    return data.sort((a, b) => {
      switch (sortBy) {
        case "price-asc": return a.basePriceUSD - b.basePriceUSD;
        case "price-desc": return b.basePriceUSD - a.basePriceUSD;
        case "rating-desc": return b.rating - a.rating;
        default: return 0;
      }
    });
  }, [debouncedQuery, filterType, sortBy]);

  const types = ["all", ...Array.from(new Set(DESTINATIONS.map(d => d.type)))];

  // Skeleton State
  if (loading) {
    return (
      <div className="min-h-screen bg-zinc-950 pt-32 px-6">
        <div className="max-w-7xl mx-auto animate-pulse">
          <div className="h-24 bg-zinc-900 rounded-3xl w-2/3 mb-16" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map(i => (
              <div key={i} className="aspect-[4/5] bg-zinc-900 rounded-[40px]" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-white pt-28 pb-24 px-6 selection:bg-blue-500/30">
      <div className="max-w-7xl mx-auto">
        
        {/* --- LUXURY HEADER --- */}
        <motion.header 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col lg:flex-row justify-between items-end gap-10 mb-16"
        >
          <div>
            <p className="text-blue-400 font-black uppercase tracking-[0.4em] text-[10px] mb-4">
              Premium Collection 2026
            </p>
            <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-[0.85]">
              SIGNATURE<br />
              <span className="text-zinc-700">DESTINATIONS</span>
            </h1>
          </div>

          <div className="flex items-center gap-3 w-full lg:w-auto">
            <div className="relative flex-1 lg:w-80 group">
              <Search size={18} className="absolute left-5 top-1/2 -translate-y-1/2 text-zinc-500 group-focus-within:text-blue-400 transition-colors" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search world-class stays..."
                className="w-full bg-zinc-900/50 border border-white/5 rounded-2xl py-4 pl-14 pr-4 outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500/50 transition-all"
              />
            </div>
            <button 
              onClick={() => setShowFilters(!showFilters)}
              className={`p-4 rounded-2xl border transition-all ${showFilters ? 'bg-blue-600 border-blue-500' : 'bg-zinc-900 border-white/5 hover:border-white/20'}`}
            >
              <SlidersHorizontal size={20} />
            </button>
          </div>
        </motion.header>

        {/* --- ADVANCED FILTERS --- */}
        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12 p-8 bg-zinc-900/30 backdrop-blur-2xl border border-white/5 rounded-[32px]"
            >
              <div className="space-y-3">
                <span className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Categorization</span>
                <div className="flex flex-wrap gap-2">
                  {types.map(t => (
                    <button
                      key={t}
                      onClick={() => setFilterType(t)}
                      className={`px-5 py-2 rounded-full text-xs font-bold border transition-all capitalize ${
                        filterType === t ? 'bg-white text-black border-white' : 'border-white/10 text-zinc-400 hover:border-white/30'
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                <span className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Order By</span>
                <div className="flex items-center gap-3 bg-zinc-900/80 border border-white/5 px-4 py-2.5 rounded-2xl">
                  <TrendingUp size={16} className="text-blue-400" />
                  <select 
                    value={sortBy} 
                    onChange={(e) => setSortBy(e.target.value)}
                    className="bg-transparent text-sm font-bold outline-none w-full cursor-pointer"
                  >
                    <option value="rating-desc" className="bg-zinc-900">Highest Rated</option>
                    <option value="price-asc" className="bg-zinc-900">Price: Low to High</option>
                    <option value="price-desc" className="bg-zinc-900">Price: High to Low</option>
                  </select>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* --- DESTINATIONS GRID --- */}
        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10"
        >
          <AnimatePresence mode="popLayout">
            {filteredAndSorted.map((dest, idx) => (
              <motion.div
                key={dest.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                className="group relative"
              >
                <Link href={`/destinations/${dest.id}`}>
                  <div className="relative aspect-[4/5] rounded-[48px] overflow-hidden border border-white/5 bg-zinc-900 shadow-2xl transition-all duration-500 group-hover:border-blue-500/30 group-hover:shadow-blue-500/10">
                    
                    {/* Image Layer */}
                    <Image
                      src={dest.image}
                      alt={dest.title}
                      fill
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />

                    {/* Top Badges */}
                    <div className="absolute top-6 left-6 right-6 flex justify-between items-center z-10">
                      <div className="bg-black/40 backdrop-blur-xl border border-white/10 px-3 py-1.5 rounded-2xl flex items-center gap-1.5">
                        <Star size={14} className="text-yellow-400 fill-yellow-400" />
                        <span className="text-xs font-black tracking-tighter">{dest.rating}</span>
                      </div>
                      <button 
                        onClick={(e) => toggleFavorite(e, dest.id)}
                        className="w-10 h-10 bg-white/10 backdrop-blur-xl border border-white/10 rounded-2xl flex items-center justify-center transition-all hover:bg-white/20 active:scale-90"
                      >
                        <Heart 
                          size={18} 
                          className={favorites.has(dest.id) ? "text-red-500 fill-red-500" : "text-white"} 
                        />
                      </button>
                    </div>

                    {/* Bottom Info */}
                    <div className="absolute bottom-8 left-8 right-8 z-10">
                      <div className="flex items-center gap-1.5 text-blue-400 text-[10px] font-black uppercase tracking-widest mb-3">
                        <MapPin size={12} /> {dest.country}
                      </div>
                      <h3 className="text-3xl font-black leading-tight mb-6 group-hover:text-blue-100 transition-colors">
                        {dest.title}
                      </h3>
                      
                      <div className="flex items-end justify-between border-t border-white/10 pt-6">
                        <div>
                          <p className="text-[10px] text-zinc-500 font-bold uppercase mb-1">Price Per Night</p>
                          <p className="text-3xl font-black tracking-tighter">{formatPrice(dest.basePriceUSD)}</p>
                        </div>
                        <motion.div 
                          whileHover={{ rotate: 45 }}
                          className="w-14 h-14 bg-white rounded-3xl flex items-center justify-center text-black shadow-2xl group-hover:bg-blue-500 group-hover:text-white transition-colors"
                        >
                          <ArrowUpRight size={24} strokeWidth={3} />
                        </motion.div>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* --- EMPTY STATE --- */}
        {filteredAndSorted.length === 0 && (
          <div className="flex flex-col items-center justify-center py-40 text-center">
            <div className="w-24 h-24 bg-zinc-900 rounded-[32px] flex items-center justify-center mb-8 border border-white/5">
              <X size={40} className="text-zinc-700" />
            </div>
            <h2 className="text-4xl font-black tracking-tighter mb-4">No Destinations Found</h2>
            <p className="text-zinc-500 max-w-sm mx-auto mb-10">We couldn't find any stays matching your current search or filter criteria.</p>
            <button 
              onClick={() => { setQuery(""); setFilterType("all"); }}
              className="px-8 py-4 bg-white text-black font-black rounded-2xl hover:bg-blue-500 hover:text-white transition-all"
            >
              Reset All Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}