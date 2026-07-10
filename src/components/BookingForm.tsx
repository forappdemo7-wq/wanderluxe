"use client";
import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Users, Calendar, CreditCard, Minus, Plus } from 'lucide-react';

interface BookingFormProps {
  tourTitle: string;
  price: string; // e.g. "$299" or "299"
}

export default function BookingForm({ tourTitle, price }: BookingFormProps) {
  const [date, setDate] = useState('');
  const [guests, setGuests] = useState(1);

  // Parse price and calculate total
  const numericPrice = useMemo(() => {
    return parseFloat(price.replace(/[^0-9.]/g, '')) || 0;
  }, [price]);

  const totalPrice = useMemo(() => {
    return (numericPrice * guests).toLocaleString();
  }, [numericPrice, guests]);

  const isDateSelected = date !== '';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="bg-black/80 backdrop-blur-2xl border border-white/10 p-8 rounded-[40px] shadow-[0_32px_64px_-12px_rgba(0,0,0,0.5)] text-white"
    >
      {/* Header */}
      <div className="mb-8">
        <p className="text-blue-400 text-[10px] font-black uppercase tracking-[0.2em] mb-1">
          RESERVE YOUR EXPERIENCE
        </p>
        <h3 className="text-3xl font-bold tracking-tighter">
          {price}
          <span className="text-sm font-medium text-white/50 ml-2">per person</span>
        </h3>
        <p className="text-white/60 text-sm mt-1">{tourTitle}</p>
      </div>

      <div className="space-y-6">
        {/* Date Selector */}
        <div className="space-y-2">
          <label className="flex items-center gap-3 text-[10px] font-black uppercase tracking-widest text-white/40">
            <Calendar size={16} />
            TRAVEL DATE
          </label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="bg-white/5 border border-white/10 rounded-2xl p-4 w-full outline-none text-white font-medium focus:border-blue-500 transition-colors [color-scheme:dark]"
            min={new Date().toISOString().split('T')[0]} // Prevent past dates
          />
        </div>

        {/* Guests Selector */}
        <div className="space-y-2">
          <label className="flex items-center gap-3 text-[10px] font-black uppercase tracking-widest text-white/40">
            <Users size={16} />
            NUMBER OF GUESTS
          </label>
          
          <div className="bg-white/5 border border-white/10 rounded-2xl p-4 flex items-center justify-between">
            <button
              onClick={() => setGuests(Math.max(1, guests - 1))}
              className="w-10 h-10 flex items-center justify-center rounded-xl hover:bg-white/10 transition-colors disabled:opacity-40"
              disabled={guests === 1}
            >
              <Minus size={20} />
            </button>

            <div className="text-center">
              <span className="font-bold text-4xl tabular-nums">{guests}</span>
              <p className="text-[10px] uppercase tracking-widest text-white/40">guests</p>
            </div>

            <button
              onClick={() => setGuests(guests + 1)}
              className="w-10 h-10 flex items-center justify-center rounded-xl hover:bg-white/10 transition-colors"
            >
              <Plus size={20} />
            </button>
          </div>
        </div>
      </div>

      {/* Total Summary */}
      <div className="mt-10 pt-6 border-t border-white/10">
        <div className="flex justify-between items-end mb-6">
          <div>
            <p className="text-[10px] font-black uppercase tracking-widest text-white/40">TOTAL AMOUNT</p>
            <p className="text-4xl font-black tracking-tighter text-blue-400">
              ${totalPrice}
            </p>
            <p className="text-white/50 text-sm">for {guests} {guests === 1 ? 'guest' : 'guests'}</p>
          </div>
          <CreditCard className="text-blue-400/30" size={48} />
        </div>

        <button
          disabled={!isDateSelected}
          className={`w-full py-5 rounded-2xl font-black uppercase tracking-[0.2em] text-xs transition-all shadow-xl shadow-blue-900/30 active:scale-[0.985] ${
            isDateSelected 
              ? 'bg-blue-600 hover:bg-blue-500' 
              : 'bg-white/10 text-white/40 cursor-not-allowed'
          }`}
        >
          {isDateSelected ? 'CONFIRM BOOKING' : 'SELECT DATE TO CONTINUE'}
        </button>

        <p className="text-center text-[10px] text-white/30 mt-4">
          Free cancellation up to 48 hours before departure
        </p>
      </div>
    </motion.div>
  );
}