"use client";

import Link from 'next/link';
import { 
  Heart, 
  MapPin, 
  Star, 
  Home, 
  ChevronRight, 
  ExternalLink,
  Trash2 
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useState } from 'react';

const initialWishlist = [
  {
    id: 1,
    hotel: 'Burj Al Arab',
    location: 'Dubai, UAE',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 2,
    hotel: 'The Ritz Paris',
    location: 'Paris, France',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1568495248636-6432b97bd949?auto=format&fit=crop&w=800&q=80'
  },
];

export default function WishlistPage() {
  const [wishlist, setWishlist] = useState(initialWishlist);
  const [removingId, setRemovingId] = useState<number | null>(null);

  const removeFromWishlist = (id: number) => {
    setRemovingId(id);
    setTimeout(() => {
      setWishlist(prev => prev.filter(item => item.id !== id));
      setRemovingId(null);
    }, 300);
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-white pb-20">
      <div className="max-w-6xl mx-auto px-6 pt-10 space-y-12">

        {/* Breadcrumbs */}
        <nav className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-zinc-500">
          <Link href="/" className="hover:text-white flex items-center gap-1.5 transition-colors">
            <Home size={14} /> Home
          </Link>
          <ChevronRight size={12} />
          <Link href="/dashboard" className="hover:text-white transition-colors">Dashboard</Link>
          <ChevronRight size={12} />
          <span className="text-white">Wishlist</span>
        </nav>

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h1 className="text-5xl font-black tracking-tighter">Your Wishlist</h1>
            <p className="text-zinc-400 mt-3 text-lg">
              {wishlist.length} extraordinary experiences saved for your next journey
            </p>
          </div>

          {wishlist.length > 0 && (
            <p className="text-sm text-zinc-500 font-medium">
              Tap the heart to remove • Long press for more options
            </p>
          )}
        </div>

        {/* Wishlist Grid */}
        {wishlist.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {wishlist.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ 
                  opacity: removingId === item.id ? 0 : 1, 
                  y: removingId === item.id ? 20 : 0,
                  scale: removingId === item.id ? 0.95 : 1 
                }}
                transition={{ duration: 0.4 }}
                className="group bg-zinc-900/70 border border-white/10 backdrop-blur-xl rounded-3xl overflow-hidden hover:border-white/20 transition-all duration-500"
              >
                {/* Image */}
                <div className="relative h-72 overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.hotel}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

                  {/* Heart Button */}
                  <button
                    onClick={() => removeFromWishlist(item.id)}
                    className="absolute top-5 right-5 bg-black/60 hover:bg-red-600 backdrop-blur-md p-3 rounded-full transition-all hover:scale-110 shadow-xl"
                  >
                    <Heart 
                      size={20} 
                      className="text-red-500 fill-red-500" 
                    />
                  </button>

                  {/* Rating Badge */}
                  <div className="absolute bottom-5 left-5 flex items-center gap-1 bg-black/70 backdrop-blur-md px-4 py-1.5 rounded-full">
                    <Star size={16} className="text-yellow-400 fill-yellow-400" />
                    <span className="font-black text-sm">{item.rating}.0</span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-7">
                  <h3 className="font-black text-2xl tracking-tight text-white mb-2">
                    {item.hotel}
                  </h3>
                  
                  <div className="flex items-center gap-2 text-zinc-400">
                    <MapPin size={18} className="text-blue-400" />
                    <span className="font-medium">{item.location}</span>
                  </div>

                  <button className="mt-8 w-full bg-white text-black hover:bg-blue-600 hover:text-white py-4 rounded-2xl font-black uppercase tracking-widest text-sm transition-all flex items-center justify-center gap-3 group-hover:shadow-xl">
                    <ExternalLink size={18} />
                    VIEW EXPERIENCE
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          /* Empty State */
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-32 bg-zinc-900/50 border border-white/10 rounded-[40px]"
          >
            <div className="mx-auto w-24 h-24 bg-zinc-800 rounded-full flex items-center justify-center mb-8">
              <Heart size={48} className="text-zinc-600" />
            </div>
            <h3 className="text-3xl font-bold text-zinc-300 mb-3">Your Wishlist is Empty</h3>
            <p className="text-zinc-500 max-w-md mx-auto">
              Start exploring extraordinary destinations and save the ones that make your heart race.
            </p>
            <Link 
              href="/destinations"
              className="inline-block mt-10 bg-white text-black px-10 py-4 rounded-2xl font-black uppercase tracking-widest hover:bg-blue-600 hover:text-white transition-all"
            >
              Discover Experiences
            </Link>
          </motion.div>
        )}
      </div>
    </div>
  );
}