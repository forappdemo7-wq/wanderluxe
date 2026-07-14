"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Calendar, MapPin, Home, ChevronRight, Compass, ArrowLeft, RefreshCw } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import TripCard from '@/components/dashboard/TripCard';

interface Booking {
  id: string;
  targetName: string;
  targetType: string;
  targetImage: string;
  location: string;
  date: string;
  status: string;
  price?: number;
}

export default function BookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [filter, setFilter] = useState('All');
  const [loading, setLoading] = useState(true);

  const fetchBookings = () => {
    try {
      const stored = localStorage.getItem("bookings");
      if (stored) {
        setBookings(JSON.parse(stored));
      } else {
        const initial = [
          {
            id: 'b-1',
            targetName: 'The Taj Mahal Palace',
            targetType: 'Stay',
            targetImage: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80',
            location: 'Mumbai, India',
            date: 'Oct 12 - Oct 15, 2026',
            status: 'Confirmed',
            price: 1200
          },
          {
            id: 'b-2',
            targetName: 'Aman Tokyo',
            targetType: 'Stay',
            targetImage: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=800&q=80',
            location: 'Tokyo, Japan',
            date: 'Dec 20 - Dec 28, 2026',
            status: 'Pending',
            price: 3400
          }
        ];
        setBookings(initial);
        localStorage.setItem("bookings", JSON.stringify(initial));
      }
    } catch (e) {
      console.warn("Failed to read bookings from localStorage on Bookings page:", e);
    }
    setLoading(false);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchBookings();
    }, 0);

    const handleSync = () => {
      fetchBookings();
    };

    window.addEventListener("bookingsUpdate", handleSync);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("bookingsUpdate", handleSync);
    };
  }, []);

  const handleCancelBooking = (id: string) => {
    const updated = bookings.map(b => b.id === id ? { ...b, status: 'Cancelled' } : b);
    setBookings(updated);
    localStorage.setItem("bookings", JSON.stringify(updated));
    // Dispatch event to sync other pages
    window.dispatchEvent(new Event("bookingsUpdate"));
  };

  const filteredBookings = bookings.filter((b) => {
    if (filter === 'All') return true;
    return b.status.toLowerCase() === filter.toLowerCase();
  });

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500">
        <Link href="/" className="flex items-center gap-1.5 hover:text-white transition-colors">
          <Home size={12} /> Home
        </Link>
        <ChevronRight size={10} className="text-zinc-600" />
        <Link href="/dashboard" className="hover:text-white transition-colors">
          Dashboard
        </Link>
        <ChevronRight size={10} className="text-zinc-600" />
        <span className="text-white">My Bookings</span>
      </nav>

      {/* Header and Filter Option Row */}
      <div className="flex flex-col xl:flex-row xl:items-end justify-between gap-6">
        <div>
          <span className="text-[10px] font-black uppercase tracking-[0.4em] text-amber-500 block mb-2">WanderLuxe Active Schedules</span>
          <h1 className="text-4xl md:text-5xl font-black tracking-tighter">My Bookings</h1>
          <p className="text-zinc-400 mt-2 text-base">Verify your flight plans, resort stays, and private yacht charters.</p>
        </div>

        {/* Dynamic Filters */}
        <div className="flex bg-zinc-900/80 p-1.5 rounded-2xl border border-white/5 w-fit">
          {['All', 'Confirmed', 'Pending', 'Cancelled'].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-5 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all cursor-pointer ${
                filter === f
                  ? 'bg-white text-black shadow-lg shadow-black/40'
                  : 'text-zinc-500 hover:text-zinc-300'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Bookings List Display */}
      {loading ? (
        <div className="py-20 text-center space-y-4">
          <div className="w-12 h-12 border-2 border-amber-500 border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-sm text-zinc-400">Consulting travel databases...</p>
        </div>
      ) : (
        <div className="space-y-4">
          <AnimatePresence mode="popLayout">
            {filteredBookings.length === 0 ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                className="text-center py-24 bg-zinc-900/30 border border-dashed border-white/10 rounded-[32px] space-y-4"
              >
                <div className="w-16 h-16 rounded-full bg-zinc-900 flex items-center justify-center mx-auto text-zinc-600 border border-white/5">
                  <Compass size={28} />
                </div>
                <h3 className="text-xl font-bold text-zinc-300">No matching travel manifests</h3>
                <p className="text-zinc-500 text-xs max-w-xs mx-auto leading-relaxed">
                  There are currently no bookings matching this specific filter status in your profile history.
                </p>
                <Link
                  href="/destinations"
                  className="inline-block mt-4 bg-white hover:bg-amber-400 text-black text-xs font-black uppercase tracking-widest px-6 py-3.5 rounded-xl transition-all"
                >
                  Explore Stays & Charters
                </Link>
              </motion.div>
            ) : (
              filteredBookings.map((booking) => (
                <TripCard 
                  key={booking.id}
                  booking={booking}
                  onCancelBooking={handleCancelBooking}
                />
              ))
            )}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}
