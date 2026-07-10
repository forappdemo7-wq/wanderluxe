"use client";

import { MapPin, Calendar, Users, Search } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRouter } from 'next/navigation';

export default function Hero() {
  const router = useRouter();
  const { scrollY } = useScroll();
  
  // Parallax effect for the background image
  const backgroundY = useTransform(scrollY, [0, 500], ['0%', '30%']);

  return (
    <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
      {/* Background Image with Parallax */}
      <motion.div style={{ y: backgroundY }} className="absolute inset-0 z-0 h-[120%]">
        <img 
          src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1920&q=80" 
          className="w-full h-full object-cover" 
          alt="Wanderluxe Luxury Travel" 
        />
        {/* Gradient overlay to ensure text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/20 to-black/60 dark:from-black/80 dark:to-[#0B0F1A]" />
      </motion.div>

      <div className="relative z-10 w-full max-w-7xl px-6 pt-20">
        
        {/* Hero Typography */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.8, ease: "easeOut" }} 
          className="max-w-3xl mb-12"
        >
          <div className="inline-block bg-white/10 dark:bg-blue-600/20 border border-white/20 dark:border-blue-500/30 px-5 py-2.5 rounded-full text-white dark:text-blue-300 text-[10px] font-black uppercase tracking-[0.2em] mb-6 backdrop-blur-md shadow-lg">
            Est. 2026 • Elite Journeys
          </div>
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-black text-white leading-[0.85] tracking-tighter mb-6 drop-shadow-2xl">
            Travel <br /> 
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-300 to-white">Beyond</span> <br /> 
            Limits.
          </h1>
        </motion.div>

        {/* Glassy Search Engine Widget */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ delay: 0.2, duration: 0.8, ease: "easeOut" }}
          className="bg-white/10 dark:bg-black/40 backdrop-blur-2xl border border-white/20 dark:border-white/10 p-2 md:p-3 rounded-[32px] md:rounded-full flex flex-col md:flex-row items-center gap-2 shadow-2xl"
        >
          
          {/* Location Input */}
          <div className="flex-1 w-full flex items-center gap-4 px-6 py-4 md:border-r border-white/20 dark:border-white/10 group hover:bg-white/10 dark:hover:bg-white/5 transition-colors rounded-3xl md:rounded-l-full md:rounded-r-none cursor-text">
            <MapPin className="text-blue-400 group-hover:scale-110 transition-transform" size={24} />
            <div className="flex flex-col w-full">
              <span className="text-[10px] font-black text-white/70 uppercase tracking-widest mb-1">Location</span>
              <input 
                type="text" 
                placeholder="Where to?" 
                className="bg-transparent text-white placeholder:text-white/40 font-bold outline-none w-full text-sm md:text-base" 
              />
            </div>
          </div>

          {/* Dates Input (Newly Added) */}
          <div className="flex-1 w-full flex items-center gap-4 px-6 py-4 md:border-r border-white/20 dark:border-white/10 group hover:bg-white/10 dark:hover:bg-white/5 transition-colors rounded-3xl md:rounded-none cursor-pointer">
            <Calendar className="text-cyan-400 group-hover:scale-110 transition-transform" size={24} />
            <div className="flex flex-col w-full">
              <span className="text-[10px] font-black text-white/70 uppercase tracking-widest mb-1">Dates</span>
              <input 
                type="text" 
                placeholder="Add dates" 
                readOnly
                className="bg-transparent text-white placeholder:text-white/40 font-bold outline-none w-full text-sm md:text-base cursor-pointer" 
              />
            </div>
          </div>

          {/* Guests Input (Newly Added) */}
          <div className="flex-1 w-full flex items-center gap-4 px-6 py-4 group hover:bg-white/10 dark:hover:bg-white/5 transition-colors rounded-3xl md:rounded-none cursor-pointer">
            <Users className="text-blue-400 group-hover:scale-110 transition-transform" size={24} />
            <div className="flex flex-col w-full">
              <span className="text-[10px] font-black text-white/70 uppercase tracking-widest mb-1">Travelers</span>
              <input 
                type="text" 
                placeholder="Add guests" 
                readOnly
                className="bg-transparent text-white placeholder:text-white/40 font-bold outline-none w-full text-sm md:text-base cursor-pointer" 
              />
            </div>
          </div>

          {/* Search Button */}
          <button 
            onClick={() => router.push('/destinations')}
            className="w-full md:w-auto bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white h-16 md:h-20 px-10 rounded-3xl md:rounded-full flex items-center justify-center gap-3 font-black uppercase tracking-widest transition-all hover:shadow-[0_0_30px_rgba(37,99,235,0.4)] active:scale-95 flex-shrink-0"
          >
            <Search size={20} className="animate-pulse" /> 
            <span className="hidden md:block">Explore</span>
          </button>
          
        </motion.div>
      </div>
    </section>
  );
}