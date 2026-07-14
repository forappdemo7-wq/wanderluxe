"use client";

import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform, MotionValue } from 'framer-motion';
import { 
  Mountain, Wind, Map, Compass, Tent, 
  Clock, Star, ArrowRight, Crown, 
  Navigation, Sun, CloudRain, Footprints, ShieldCheck, ArrowLeft 
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useCurrency } from '@/context/CurrencyContext';

const trekPoints = [
  { 
    alt: "2,430m", 
    point: "Machu Picchu Citadel", 
    desc: "Private sunrise entry before the first tourist train arrives.", 
    icon: <Sun size={18} /> 
  },
  { 
    alt: "2,720m", 
    point: "Sun Gate (Inti Punku)", 
    desc: "Exclusive hike to the original Inca trail entrance.", 
    icon: <Navigation size={18} /> 
  },
  { 
    alt: "3,061m", 
    point: "Huayna Picchu Peak", 
    desc: "VIP climbing permits for the highest panoramic views.", 
    icon: <Mountain size={18} /> 
  },
  { 
    alt: "Base", 
    point: "Belmond Sanctuary Lodge", 
    desc: "Luxury lunch at the only hotel adjacent to the ruins.", 
    icon: <Tent size={18} /> 
  }
];

// Simple helper component to animate the altitude display
function AnimatedAltitude({ value }: { value: MotionValue<number> }) {
  const [display, setDisplay] = useState(2430);
  useEffect(() => {
    return value.on("change", (latest: number) => setDisplay(Math.round(latest)));
  }, [value]);
  return <>{display}m</>;
}

export default function MachuPicchuPage() {
  const { formatPrice } = useCurrency();
  const [isLuxuryMode, setIsLuxuryMode] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setMounted(true);
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  const { scrollYProgress } = useScroll();
  const altitudeProgress = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const altitudeValue = useTransform(scrollYProgress, [0, 1], [2430, 3061]);

  const accentColor = isLuxuryMode ? "text-amber-400" : "text-emerald-400";
  const accentBg = isLuxuryMode ? "bg-amber-500" : "bg-emerald-600";
  const glowClass = isLuxuryMode 
    ? "shadow-[0_0_60px_rgba(251,191,36,0.25)]" 
    : "shadow-[0_0_50px_rgba(16,185,129,0.15)]";

  if (!mounted) return <div className="min-h-screen bg-[#0a0c10]" />;

  return (
    <main className="bg-[#0a0c10] text-[#f0f0f0] min-h-screen pb-32 overflow-x-hidden selection:bg-emerald-500/30">
      {/* BACK BUTTON */}
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="absolute top-24 left-6 z-50"
      >
        <Link
          href="/heritage"
          className="flex items-center gap-3 px-6 py-3 rounded-2xl bg-black/50 backdrop-blur-xl border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300 group"
        >
          <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
          <span className="font-medium text-xs uppercase tracking-widest">Back to Heritage</span>
        </Link>
      </motion.div>

      {/* THEME TOGGLE */}
      <div className="fixed top-24 right-8 z-50">
        <button 
          onClick={() => setIsLuxuryMode(!isLuxuryMode)}
          className={`flex items-center gap-3 px-6 py-3 rounded-2xl border backdrop-blur-xl transition-all duration-700 hover:scale-105 active:scale-95 ${
            isLuxuryMode 
              ? 'border-amber-500/60 bg-amber-500/10 text-amber-400' 
              : 'border-white/10 bg-white/5 hover:bg-white/10'
          }`}
        >
          <Compass size={16} className={isLuxuryMode ? "animate-spin-slow" : ""} />
          <span className="text-xs font-black uppercase tracking-[0.2em]">
            {isLuxuryMode ? "INCA GOLD MODE" : "EXPEDITION MODE"}
          </span>
        </button>
      </div>

      {/* HERO SECTION */}
      <section className="relative h-screen flex items-end overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://images.pexels.com/photos/2356045/pexels-photo-2356045.jpeg"
            alt="Machu Picchu"
            fill
            className="object-cover brightness-[0.65] scale-105"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0c10] via-[#0a0c10]/40 to-transparent" />
          <motion.div 
            animate={{ x: [-30, 30, -30], opacity: [0.25, 0.45, 0.25] }}
            transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
            className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/fog.png')] opacity-40 pointer-events-none mix-blend-screen"
          />
        </div>

        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-8 pb-20">
          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.2 }}>
            <div className="flex flex-wrap items-center gap-4 mb-6">
              <span className="px-5 py-1.5 rounded-full border border-white/20 text-xs font-black uppercase tracking-[0.4em] backdrop-blur-md bg-white/5">
                LOST CITY • {isLuxuryMode ? 'ROYAL ROUTE' : 'EXPLORER'}
              </span>
              <div className="flex items-center gap-2 text-sm font-medium text-gray-400">
                <Wind size={16} className={accentColor} />
                14°C • Misty
              </div>
            </div>

            <h1 className="text-6xl md:text-7xl lg:text-[9.5rem] font-black uppercase tracking-[-0.04em] leading-[0.82]">
              MACHU <br />
              <span className={`${accentColor} italic transition-colors duration-1000`}>PICCHU</span>
            </h1>
          </motion.div>
        </div>
      </section>

      {/* MAIN CONTENT */}
      <section className="max-w-7xl mx-auto px-6 md:px-8 pt-10 grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-20">
        <div className="lg:col-span-7 space-y-24">
          <div className="bg-white/[0.03] backdrop-blur-3xl border border-white/10 p-10 md:p-12 rounded-3xl">
            <h2 className="text-3xl font-black uppercase mb-8 flex items-center gap-4">
              <Footprints className={`${accentColor} flex-shrink-0`} /> 
              The Private Ascent
            </h2>
            <div className="relative pl-10 space-y-14">
              <div className="absolute left-[15px] top-3 bottom-3 w-px bg-gradient-to-b from-white/20 via-white/10 to-transparent" />
              {trekPoints.map((point, index) => (
                <motion.div key={index} whileHover={{ x: 8 }} className="relative group">
                  <div className={`absolute -left-[21px] top-2 w-3 h-3 rounded-full border-2 border-[#0a0c10] ${accentBg} transition-all group-hover:scale-125`} />
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-3">
                    <h4 className="font-bold text-2xl tracking-tight">{point.point}</h4>
                    <span className="text-xs font-mono text-gray-500 bg-white/5 px-3 py-1 rounded-lg self-start">{point.alt}</span>
                  </div>
                  <p className="text-gray-500 text-[15px]">{point.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* BOOKING CARD */}
        <div className="lg:col-span-5">
          <div className={`sticky top-32 p-10 md:p-12 rounded-3xl bg-white/[0.02] border border-white/10 backdrop-blur-3xl ${glowClass} transition-all duration-1000 group`}>
            <div className="flex justify-between items-start mb-12 relative z-10">
              <div>
                <span className="text-xs text-gray-500 font-bold uppercase tracking-[0.3em] block mb-3">PRIVATE EXPEDITION</span>
                <h3 className="text-5xl md:text-6xl font-black tracking-tighter">{formatPrice(3200)}</h3>
              </div>
              <div className={`p-4 rounded-2xl bg-white/5 ${accentColor}`}><ShieldCheck size={32} /></div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-12 relative z-10">
              {["Permits", "Transport", "Guides", "Dining"].map((label, i) => (
                <div key={i} className="p-5 rounded-2xl bg-white/5 border border-white/5 hover:border-white/10 transition-colors">
                  <p className="text-[10px] text-gray-600 font-bold uppercase tracking-widest mb-1.5">{label}</p>
                  <p className="text-sm font-semibold text-gray-200">Included</p>
                </div>
              ))}
            </div>

            <motion.button 
              whileHover={{ scale: 1.015 }}
              whileTap={{ scale: 0.985 }}
              className={`w-full py-8 rounded-2xl font-black uppercase tracking-[0.5em] text-xs shadow-2xl transition-all duration-700 ${
                isLuxuryMode ? 'bg-amber-500 text-black' : 'bg-white text-black'
              }`}
            >
              SECURE YOUR DATES
            </motion.button>
          </div>
        </div>
      </section>
    </main>
  );
}
