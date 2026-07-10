"use client";

import { MapPin, Clock, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

interface Trip {
  id: number;
  hotel: string;
  location: string;
  date: string;
  status: string;
  image: string;
}

interface TripCardProps {
  trip: Trip;
}

export default function TripCard({ trip }: TripCardProps) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ type: "spring", stiffness: 300 }}
      className="group bg-zinc-900 border border-white/10 rounded-3xl overflow-hidden hover:border-white/30 transition-all duration-300 cursor-pointer"
    >
      <div className="flex flex-col md:flex-row gap-6 p-6">
        {/* Image */}
        <div className="relative w-full md:w-40 h-40 md:h-28 rounded-2xl overflow-hidden flex-shrink-0">
          <img
            src={trip.image}
            alt={trip.hotel}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
          />
        </div>

        {/* Content */}
        <div className="flex-1 flex flex-col justify-between">
          <div>
            <h3 className="text-xl font-bold tracking-tight text-white mb-3">
              {trip.hotel}
            </h3>

            <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-zinc-400">
              <div className="flex items-center gap-2">
                <MapPin size={18} className="text-blue-400" />
                {trip.location}
              </div>
              <div className="flex items-center gap-2">
                <Clock size={18} className="text-blue-400" />
                {trip.date}
              </div>
            </div>
          </div>

          {/* Status + Arrow */}
          <div className="flex items-center justify-between mt-6 md:mt-0">
            <span
              className={`inline-flex items-center px-5 py-2 rounded-full text-xs font-black uppercase tracking-widest border ${
                trip.status === 'Confirmed'
                  ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                  : 'bg-amber-500/10 text-amber-400 border-amber-500/30'
              }`}
            >
              {trip.status}
            </span>

            <div className="flex items-center gap-2 text-zinc-400 group-hover:text-white transition-colors">
              <span className="text-sm font-medium">View Details</span>
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}