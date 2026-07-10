"use client";

import { useState } from 'react';
import Link from 'next/link';
import { Calendar, MapPin, Home, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const bookingsData = [
  {
    id: 1,
    hotel: 'The Taj Mahal Palace',
    location: 'Mumbai, India',
    date: 'Oct 12 - Oct 15, 2026',
    status: 'Confirmed',
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 2,
    hotel: 'Aman Tokyo',
    location: 'Tokyo, Japan',
    date: 'Dec 20 - Dec 28, 2026',
    status: 'Pending',
    image: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=400&q=80'
  }
];

export default function BookingsPage() {
  const [filter, setFilter] = useState('All');

  const filteredBookings = bookingsData.filter((b) => {
    if (filter === 'All') return true;
    return b.status === filter;
  });

  return (
    <div className="space-y-8">
      {/* --- BREADCRUMBS / HOME NAVIGATION --- */}
      <nav className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">
        <Link href="/" className="flex items-center gap-1.5 hover:text-blue-600 transition-colors">
          <Home size={12} /> Home
        </Link>
        <ChevronRight size={10} />
        <Link href="/dashboard" className="hover:text-blue-600 transition-colors">
          Dashboard
        </Link>
        <ChevronRight size={10} />
        <span className="text-gray-900">My Bookings</span>
      </nav>

      {/* --- HEADER --- */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-3xl font-black text-gray-900 tracking-tight">My Bookings</h1>
          <p className="text-gray-500 font-medium text-sm">Manage and track your upcoming WANDERLUXE journeys.</p>
        </div>

        {/* --- FILTERS --- */}
        <div className="flex bg-gray-100 p-1.5 rounded-[20px] w-fit border border-gray-200/50">
          {['All', 'Confirmed', 'Pending'].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-5 py-2 rounded-[14px] text-[10px] font-black uppercase tracking-widest transition-all ${
                filter === f
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-400 hover:text-gray-600'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* --- BOOKINGS LIST --- */}
      <div className="space-y-4">
        <AnimatePresence mode="popLayout">
          {filteredBookings.map((booking) => (
            <motion.div
              layout
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              key={booking.id}
              className="group bg-white p-4 rounded-[28px] border border-gray-100 flex flex-col md:flex-row items-center gap-6 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-500 cursor-pointer"
            >
              <div className="w-full md:w-40 h-28 overflow-hidden rounded-[20px]">
                <img
                  src={booking.image}
                  alt={booking.hotel}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
              </div>

              <div className="flex-1">
                <h3 className="font-black text-gray-900 text-xl tracking-tight">
                  {booking.hotel}
                </h3>

                <div className="flex flex-wrap gap-4 text-sm text-gray-400 font-medium mt-2">
                  <span className="flex items-center gap-1.5">
                    <MapPin size={16} className="text-blue-500" /> {booking.location}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Calendar size={16} className="text-blue-500" /> {booking.date}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-4 w-full md:w-auto justify-between md:justify-end">
                <span
                  className={`px-5 py-2 rounded-full text-[10px] font-black uppercase tracking-widest ${
                    booking.status === 'Confirmed'
                      ? 'bg-green-50 text-green-600 border border-green-100'
                      : 'bg-yellow-50 text-yellow-600 border border-yellow-100'
                  }`}
                >
                  {booking.status}
                </span>
                <div className="p-3 bg-gray-50 rounded-full group-hover:bg-gray-900 group-hover:text-white transition-colors">
                  <ChevronRight size={20} />
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {filteredBookings.length === 0 && (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }}
            className="text-center bg-white border border-dashed border-gray-200 rounded-[32px] py-20"
          >
            <p className="text-gray-400 font-bold uppercase text-xs tracking-widest">No matching itineraries found</p>
          </motion.div>
        )}
      </div>
    </div>
  );
}