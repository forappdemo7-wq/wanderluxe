"use client";

import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { 
  Clock, Star, ShieldCheck, ArrowRight, ArrowLeft,
  Crown, Sunrise, Camera, Coffee, Car, Navigation,
  Users, Award, Calendar
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useCurrency } from '@/context/CurrencyContext';

const itinerary = [
  { 
    time: "04:30 AM", 
    event: "Private Chauffeur Pickup", 
    desc: "Luxury SUV transfer from your Cairo residence with chilled towels & refreshments.", 
    icon: <Car size={18} />,
    duration: "15 min"
  },
  { 
    time: "05:15 AM", 
    event: "VIP Plateau Entry", 
    desc: "Exclusive access to Giza Plateau 2 hours before public gates open.", 
    icon: <ShieldCheck size={18} />,
    duration: "10 min"
  },
  { 
    time: "06:00 AM", 
    event: "Dawn Meditation", 
    desc: "Private sunrise ceremony between the paws of the Great Sphinx with a personal Egyptologist.", 
    icon: <Sunrise size={18} />,
    duration: "90 min"
  },
  { 
    time: "07:30 AM", 
    event: "The Great Pyramid", 
    desc: "Exclusive interior exploration of the King's Chamber & hidden corridors (max 4 guests).", 
    icon: <Navigation size={18} />,
    duration: "90 min"
  },
  { 
    time: "09:00 AM", 
    event: "Bespoke Breakfast", 
    desc: "Gourmet Egyptian breakfast at a 9th Dynasty Temple overlooking the pyramids.", 
    icon: <Coffee size={18} />,
    duration: "60 min"
  }
];

const highlights = [
  { icon: <Award size={28} />, title: "UNESCO World Heritage", desc: "Only surviving Wonder of the Ancient World" },
  { icon: <Users size={28} />, title: "Max 4 Guests", desc: "Unparalleled intimacy & privacy" },
  { icon: <Calendar size={28} />, title: "Dawn Only", desc: "2-hour exclusive window before crowds" }
];

export default function HeritageDetailPage() {
  const { formatPrice } = useCurrency();
  const [isLuxuryMode, setIsLuxuryMode] = useState(false);
  const [mounted, setMounted] = useState(false);

  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 180]);
  const parallaxBg = useTransform(scrollY, [0, 900], ["0%", "85%"]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setMounted(true);
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  if (!mounted) return null;

  return (
    <main className="bg-[#050505] text-white min-h-screen overflow-x-hidden">
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

      {/* Luxury Mode Toggle */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="fixed top-24 right-6 z-50"
      >
        <button
          onClick={() => setIsLuxuryMode(!isLuxuryMode)}
          className={`group flex items-center gap-3 px-6 py-3 rounded-2xl border-2 backdrop-blur-xl font-medium transition-all duration-500 hover:scale-[1.03] ${
            isLuxuryMode
 
              ? 'border-amber-400/70 bg-amber-500/10 text-amber-300' 
              : 'border-white/20 bg-white/5 hover:border-white/40 text-white'
          }`}
        >
          <Crown 
            size={20} 
            className={`transition-all duration-300 ${isLuxuryMode ? "text-amber-400 scale-110 animate-pulse" : ""}`} 
          />
          <span className="text-xs uppercase tracking-[0.125em] font-semibold hidden sm:inline">
            {isLuxuryMode ? "LUXURY MODE" : "STANDARD"}
          </span>
        </button>
      </motion.div>

      {/* Hero Section */}
      <section className="relative h-screen overflow-hidden">
        <motion.div
          style={{ y: y1 }}
          className="absolute inset-0"
        >
          <Image
            src="https://images.pexels.com/photos/71241/pexels-photo-71241.jpeg"
            alt="Pyramids of Giza at sunrise with private VIP access"
            fill
            priority
            quality={92}
            className="object-cover brightness-[0.45]"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/60 to-black/90" />
        </motion.div>

        <div className="relative h-full flex flex-col justify-end pb-20 px-6 md:px-12 max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-center gap-6 mb-10">
            <div className={`inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-xs font-black uppercase tracking-[0.2em] border backdrop-blur-md ${
              isLuxuryMode 
                ? 'border-amber-500/60 bg-amber-500/10 text-amber-300' 
                : 'border-white/30 bg-white/10 text-white'
            }`}>
              ANCIENT WONDER
            </div>
            <div className="flex items-center gap-2 text-yellow-400">
              <Star fill="currentColor" size={18} />
              <span className="font-bold text-lg">5.0</span>
              <span className="text-gray-400 text-sm">(124 reviews)</span>
            </div>
          </div>

          <h1 className="text-[4.8rem] md:text-[6.5rem] lg:text-[7.8rem] font-black uppercase tracking-[-0.04em] leading-[0.82] mb-6">
            PYRAMIDS<br />
            <span className={`${isLuxuryMode ? 'text-amber-400' : 'text-white'} bg-gradient-to-r from-current to-transparent bg-clip-text text-transparent`}>
              OF GIZA
            </span>
          </h1>

          <p className="max-w-xl text-xl md:text-2xl text-gray-300 font-light tracking-wide">
            Private dawn access • Max 4 guests • Complete pyramid interior
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="max-w-7xl mx-auto px-6 lg:px-12 -mt-16 lg:-mt-24 relative z-10 pb-32">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-20">
          
          {/* Left Column - Details */}
          <div className="lg:col-span-7 space-y-24">
            
            {/* Experience Overview */}
            <motion.div
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 35 }}
              viewport={{ once: true }}
              className="bg-white/5 backdrop-blur-3xl border border-white/10 p-10 lg:p-14 rounded-[3.5rem]"
            >
              <div className="flex items-center gap-4 mb-10">
                <Camera className={`text-4xl ${isLuxuryMode ? 'text-amber-400' : 'text-white'}`} />
                <h3 className="text-4xl font-black uppercase tracking-tight">The Experience</h3>
              </div>
              
              <p className="text-lg lg:text-xl text-gray-300 leading-relaxed mb-12">
                Witness the only remaining Wonder of the Ancient World in complete solitude. 
                Our exclusive dawn access grants you entry at 4:30 AM — two hours before the public gates open.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {highlights.map((highlight, i) => (
                  <motion.div
                    key={i}
                    whileHover={{ y: -6 }}
                    className="group p-8 rounded-3xl bg-white/5 border border-white/10 hover:border-white/20 transition-all duration-300"
                  >
                    <div className={`${isLuxuryMode ? 'text-amber-400' : 'text-white'} mb-6 transition-transform group-hover:scale-110 inline-block`}>
                      {highlight.icon}
                    </div>
                    <div className="font-semibold text-xl mb-3">{highlight.title}</div>
                    <div className="text-gray-400 text-[15px] leading-relaxed">{highlight.desc}</div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Detailed Itinerary */}
            <motion.div
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center gap-4 mb-12">
                <Clock className={`text-4xl ${isLuxuryMode ? 'text-amber-400' : 'text-white'}`} />
                <h3 className="text-4xl font-black uppercase tracking-tight">Detailed Itinerary</h3>
              </div>

              <div className="space-y-8">
                {itinerary.map((step, index) => (
                  <motion.div
                    key={step.time}
                    initial={{ opacity: 0, x: -40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.08 }}
                    whileHover={{ x: 12 }}
                    className="group flex gap-8 p-9 lg:p-11 rounded-[2.75rem] bg-gradient-to-br from-white/5 to-transparent border border-white/10 hover:border-white/20 backdrop-blur-xl transition-all duration-500"
                  >
                    <div className="flex-shrink-0 pt-1">
                      <div className={`w-20 h-20 flex items-center justify-center font-mono text-sm font-black rounded-2xl ${isLuxuryMode ? 'bg-amber-400 text-black' : 'bg-white text-black'} shadow-xl`}>
                        {step.time}
                      </div>
                    </div>

                    <div className="flex-1 pt-2">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <div className="text-2xl font-bold tracking-tight mb-3">{step.event}</div>
                          <p className="text-gray-400 text-[17px] leading-relaxed pr-8">{step.desc}</p>
                        </div>
                        <div className={`${isLuxuryMode ? 'text-amber-400' : 'text-white'} p-3 rounded-2xl bg-white/10 mt-1`}>
                          {step.icon}
                        </div>
                      </div>

                      <div className="mt-6 flex items-center gap-4 text-xs uppercase tracking-widest text-gray-500 font-mono">
                        <span>{step.duration}</span>
                        <span className="flex-1 h-px bg-white/10" />
                        <span>EXCLUSIVE</span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right Column - Static (non-sticky) Booking Card */}
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5"
          >
            <div className={`relative bg-gradient-to-br from-white/10 to-black/80 backdrop-blur-3xl border border-white/10 rounded-[3.5rem] p-10 lg:p-14 transition-all duration-500 hover:border-white/30 hover:-translate-y-2 hover:shadow-2xl ${isLuxuryMode ? 'shadow-[0_0_60px_rgba(251,191,36,0.15)]' : 'shadow-none'}`}>
              
              <div className="flex justify-between items-start mb-12 pb-10 border-b border-white/10">
                <div>
                  <div className="uppercase text-xs tracking-[0.125em] text-gray-400 font-semibold mb-2">PRIVATE DAWN EXPERIENCE</div>
                  <div className="text-6xl font-black tracking-tighter">{formatPrice(2800)}</div>
                  <div className="text-gray-400 mt-1">per person • All inclusive</div>
                </div>
                <div className={`p-4 rounded-3xl bg-white/5 border border-white/10 ${isLuxuryMode ? 'text-amber-400' : 'text-white'}`}>
                  <Camera className="text-4xl" />
                </div>
              </div>

              <div className="mb-12 space-y-6">
                {[
                  ["Private Dawn Access", "2 hours before public"],
                  ["Egyptologist Guide", "PhD Level"],
                  ["Luxury Mercedes SUV", "Private Transfer"],
                  ["Pyramid Interior", "King's Chamber"],
                  ["Gourmet Breakfast", "Temple Setting"]
                ].map(([label, value], i) => (
                  <div key={i} className="flex justify-between items-center py-2 group">
                    <span className="text-gray-300 group-hover:text-white transition-colors">{label}</span>
                    <span className={`font-bold ${isLuxuryMode ? 'text-amber-400' : 'text-white'}`}>{value}</span>
                  </div>
                ))}
              </div>

              <AnimatePresence mode="wait">
                <motion.button
                  key={isLuxuryMode ? 'luxury' : 'standard'}
                  initial={{ scale: 0.96, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.96, opacity: 0 }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.985 }}
                  className={`group w-full py-7 rounded-3xl font-black text-sm uppercase tracking-[0.08em] flex items-center justify-center gap-3 shadow-xl transition-all ${
                    isLuxuryMode 
                      ? 'bg-gradient-to-r from-amber-400 to-amber-500 text-black hover:brightness-110 shadow-amber-500/20' 
                      : 'bg-white text-black hover:bg-gray-200 hover:shadow-white/20'
                  }`}
                >
                  Secure Your Private Dawn Slot
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </motion.button>
              </AnimatePresence>

              <div className="mt-10 text-center">
                <div className={`inline-block px-4 py-1.5 rounded-full text-[10px] uppercase tracking-widest font-mono font-bold mb-4 ${
                  isLuxuryMode ? 'bg-amber-500/10 text-amber-400' : 'bg-white/10 text-gray-300'
                }`}>
                  ONLY 3 SLOTS LEFT THIS MONTH
                </div>
                <p className="text-xs text-gray-500 leading-relaxed">
                  Full refund up to 72 hours before • 24/7 concierge support
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
