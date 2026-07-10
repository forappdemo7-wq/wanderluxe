"use client";

import StatCard from '@/components/dashboard/StatCard';     // ← Corrected import
import { MapPin, Clock, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';

// ... rest of your code

const upcomingTrips = [
  {
    id: 't-1',
    hotel: 'The Taj Mahal Palace',
    location: 'Mumbai, India',
    date: 'Oct 12 - Oct 15, 2026',
    status: 'Confirmed',
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 't-2',
    hotel: 'Aman Tokyo',
    location: 'Tokyo, Japan',
    date: 'Dec 20 - Dec 28, 2026',
    status: 'Pending',
    image: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=400&q=80'
  }
];

export default function DashboardPage() {
  return (
    <div className="space-y-12">
      {/* --- STATS GRID --- */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Pass the number 12450; StatCard handles the currency symbol and conversion */}
        <StatCard label="Total Spent" value={12450} index={0} />
        <StatCard label="Nights Stayed" value="14 Nights" index={1} />
        <StatCard label="Countries" value="06" color="text-blue-600" index={2} />
      </div>

      {/* --- UPCOMING TRIPS --- */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-black text-gray-900 tracking-tight">Upcoming Itineraries</h2>
          <button className="text-sm font-bold text-blue-600 hover:underline">View All</button>
        </div>

        <div className="space-y-4">
          {upcomingTrips.map((trip) => (
            <motion.div 
              key={trip.id}
              whileHover={{ x: 10 }}
              className="bg-white p-4 rounded-[24px] border border-gray-100 flex flex-col md:flex-row items-center gap-6 shadow-sm group cursor-pointer"
            >
              <div className="w-full md:w-32 h-24 rounded-2xl overflow-hidden">
                <img src={trip.image} alt={trip.hotel} className="w-full h-full object-cover" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-gray-900 text-lg">{trip.hotel}</h3>
                <div className="flex items-center gap-4 text-sm text-gray-500 mt-1">
                  <span className="flex items-center gap-1"><MapPin size={14} /> {trip.location}</span>
                  <span className="flex items-center gap-1"><Clock size={14} /> {trip.date}</span>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${
                  trip.status === 'Confirmed' ? 'bg-green-50 text-green-600' : 'bg-yellow-50 text-yellow-600'
                }`}>
                  {trip.status}
                </span>
                <ChevronRight size={20} className="text-gray-300 group-hover:text-gray-900 transition-colors" />
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* --- QUICK ACTION CARD --- */}
      <div className="bg-gray-900 rounded-[32px] p-8 text-white relative overflow-hidden">
        <div className="relative z-10">
          <h3 className="text-2xl font-bold mb-2">Need a last-minute getaway?</h3>
          <p className="text-gray-400 mb-6 max-w-md">Get exclusive 15% off on all Zen Sanctuary suites booked for this weekend.</p>
          <button className="bg-white text-gray-900 px-6 py-3 rounded-full font-bold text-sm uppercase tracking-widest hover:bg-blue-500 hover:text-white transition-all">
            Explore Deals
          </button>
        </div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/20 rounded-full blur-3xl -mr-20 -mt-20" />
      </div>
    </div>
  );
}