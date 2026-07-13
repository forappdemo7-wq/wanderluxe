"use client";

import { MapPin, Clock, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

interface Trip {
  id: number | string;
  hotel: string;
  location: string;
  date: string;
  status: string;
  image: string;
}

interface BookingDetails {
  id: string;
  targetName: string;
  targetType: string;
  targetImage: string;
  location: string;
  date: string;
  status: string;
}

interface TripCardProps {
  trip?: Trip;
  booking?: BookingDetails;
  onCancelBooking?: (id: string) => void;
}

export default function TripCard({ trip, booking, onCancelBooking }: TripCardProps) {
  const item = trip ? {
    id: trip.id,
    title: trip.hotel,
    sub: trip.location,
    date: trip.date,
    status: trip.status,
    image: trip.image,
    isBooking: false
  } : booking ? {
    id: booking.id,
    title: booking.targetName,
    sub: booking.targetType.toUpperCase() + ' Booking',
    date: booking.date,
    status: booking.status,
    image: booking.targetImage,
    isBooking: true
  } : null;

  if (!item) return null;

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
            src={item.image}
            alt={item.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
          />
        </div>

        {/* Content */}
        <div className="flex-1 flex flex-col justify-between">
          <div>
            <h3 className="text-xl font-bold tracking-tight text-white mb-3">
              {item.title}
            </h3>

            <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-zinc-400">
              <div className="flex items-center gap-2">
                <MapPin size={18} className="text-blue-400" />
                {item.sub}
              </div>
              <div className="flex items-center gap-2">
                <Clock size={18} className="text-blue-400" />
                {item.date}
              </div>
            </div>
          </div>

          {/* Status + Cancel / View */}
          <div className="flex items-center justify-between mt-6 md:mt-0">
            <span
              className={`inline-flex items-center px-5 py-2 rounded-full text-xs font-black uppercase tracking-widest border ${
                item.status.toLowerCase() === 'confirmed'
                  ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                  : item.status.toLowerCase() === 'cancelled'
                  ? 'bg-rose-500/10 text-rose-400 border-rose-500/30'
                  : 'bg-amber-500/10 text-amber-400 border-amber-500/30'
              }`}
            >
              {item.status}
            </span>

            {item.isBooking && onCancelBooking && item.status.toLowerCase() !== 'cancelled' ? (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onCancelBooking(item.id.toString());
                }}
                className="px-4 py-2 bg-rose-500/15 text-rose-400 border border-rose-500/30 rounded-xl text-xs font-bold uppercase tracking-wider hover:bg-rose-500/25 transition-all"
              >
                Cancel Booking
              </button>
            ) : (
              <div className="flex items-center gap-2 text-zinc-400 group-hover:text-white transition-colors">
                <span className="text-sm font-medium">View Details</span>
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}