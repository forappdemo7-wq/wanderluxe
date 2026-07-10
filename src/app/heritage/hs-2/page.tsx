"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  ShieldCheck, Clock, Eye, BookOpen, 
  History, PenTool, Search, LockKeyhole, Key, ArrowLeft 
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useCurrency } from '@/context/CurrencyContext';

const documents = [
  {
    year: "1521",
    title: "The Leo X Bull",
    desc: "The original bull of excommunication against Martin Luther.",
    icon: <Search size={28} />
  },
  {
    year: "1633",
    title: "Galileo Trial Acts",
    desc: "Handwritten records from the proceedings against Galileo Galilei.",
    icon: <PenTool size={28} />
  },
  {
    year: "1241",
    title: "Mongol Petitions",
    desc: "Diplomatic letters from the Grand Khan to the Pope via the Silk Road.",
    icon: <BookOpen size={28} />
  }
];

export default function VaticanArchivesPage() {
  const { formatPrice } = useCurrency();
  const [isLuxuryMode, setIsLuxuryMode] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const accentColor = isLuxuryMode ? "text-amber-400" : "text-emerald-400";
  const accentBorder = isLuxuryMode ? "border-amber-500/40" : "border-emerald-500/30";
  const glow = isLuxuryMode
    ? "shadow-[0_0_70px_rgba(245,158,11,0.18)]"
    : "shadow-[0_0_70px_rgba(16,185,129,0.12)]";

  if (!mounted) return null;

  return (
    <main className="bg-[#080808] text-[#e5e5e5] min-h-screen overflow-x-hidden selection:bg-emerald-500/20 pt-20">
      
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
      <div className="fixed top-24 right-8 z-[100]">
        <button
          onClick={() => setIsLuxuryMode(!isLuxuryMode)}
          className={`group flex items-center gap-3 px-7 py-3.5 rounded-2xl border-2 backdrop-blur-2xl transition-all duration-500 hover:scale-105 ${
            isLuxuryMode
              ? 'border-amber-500/60 bg-amber-500/10 text-amber-400'
              : 'border-white/10 bg-white/5 hover:border-white/20'
          }`}
        >
          <Key
            size={18}
            className={`transition-transform duration-300 ${isLuxuryMode ? "rotate-45" : ""}`}
          />
          <span className="text-xs font-black uppercase tracking-[0.125em]">
            {isLuxuryMode ? "PONTIFICAL ACCESS" : "STANDARD ACCESS"}
          </span>
        </button>
      </div>

      {/* HERO SECTION */}
      <section className="relative h-screen flex flex-col lg:flex-row pt-12">
        {/* Left Image Panel */}
        <div className="relative w-full lg:w-1/2 h-full overflow-hidden">
          <Image
            src="https://images.pexels.com/photos/1796736/pexels-photo-1796736.jpeg"
            alt="Vatican Apostolic Archives"
            fill
            priority
            quality={92}
            className="object-cover grayscale-[0.75] contrast-125"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#080808] via-[#080808]/85 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
        </div>

        {/* Right Content Panel */}
        <div className="w-full lg:w-1/2 flex flex-col justify-center p-10 lg:p-16 xl:p-24">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <div className={`inline-flex items-center gap-2 px-6 py-2 rounded-full border ${accentBorder} text-xs font-black uppercase tracking-[0.3em] mb-8`}>
              <ShieldCheck size={14} className={accentColor} />
              FORBIDDEN ARCHIVES
            </div>

            <h1 className="text-6xl lg:text-[5.4rem] xl:text-[6rem] font-black uppercase tracking-[-0.045em] leading-[0.82] mb-10">
              THE SECRET<br />
              <span className={`${accentColor} italic font-serif tracking-normal`}>APOSTOLIC</span><br />
              ARCHIVES
            </h1>

            <div className="max-w-lg border-l-2 border-white/10 pl-8">
              <p className="text-lg text-gray-400 italic font-light leading-relaxed">
                85 kilometers of shelves. Twelve centuries of guarded secrets.<br />
                Zero public access — until now.
              </p>
            </div>
          </motion.div>

          {/* Meta Info */}
          <div className="flex flex-wrap gap-x-12 gap-y-8 mt-16">
            <div>
              <div className="text-[10px] uppercase tracking-[0.2em] text-gray-500 mb-1">DURATION</div>
              <div className="flex items-center gap-3 text-sm font-medium">
                <Clock size={18} className={accentColor} />
                4-Hour Private Vault Session
              </div>
            </div>
            <div>
              <div className="text-[10px] uppercase tracking-[0.2em] text-gray-500 mb-1">CLEARANCE</div>
              <div className="flex items-center gap-3 text-sm font-medium">
                <Eye size={18} className={accentColor} />
                Level 5 Pontifical Clearance
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MAIN CONTENT */}
      <section className="max-w-7xl mx-auto px-8 lg:px-12 py-28 lg:py-32 grid grid-cols-1 lg:grid-cols-12 gap-20 lg:gap-24">
        
        {/* Left Column - Artifacts & Protocol */}
        <div className="lg:col-span-7 space-y-24">
          <div>
            <h2 className="text-4xl font-black uppercase tracking-tight mb-14 flex items-center gap-4">
              RESTRICTED <span className={accentColor}>ARTIFACTS</span>
            </h2>
            
            <div className="space-y-8">
              {documents.map((doc, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ x: 12 }}
                  className="group relative flex gap-10 p-12 rounded-[3rem] bg-white/[0.015] border border-white/5 hover:border-white/20 transition-all duration-500 overflow-hidden"
                >
                  <div className="absolute -right-12 -top-12 opacity-5 group-hover:opacity-10 transition-opacity pointer-events-none">
                    <BookOpen size={220} />
                  </div>

                  <div className={`font-mono text-5xl font-black tracking-tighter pt-2 ${accentColor}`}>
                    {doc.year}
                  </div>

                  <div className="flex-1 relative z-10 pt-3">
                    <div className="flex items-start justify-between gap-6">
                      <h3 className="text-2xl font-bold tracking-tight group-hover:text-white transition-colors">
                        {doc.title}
                      </h3>
                      <div className={`${accentColor} opacity-70 group-hover:opacity-100 transition-opacity flex-shrink-0`}>
                        {doc.icon}
                      </div>
                    </div>
                    <p className="mt-5 text-gray-400 leading-relaxed text-[15.5px]">
                      {doc.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="p-12 lg:p-16 rounded-[3rem] border border-white/10 bg-gradient-to-br from-white/[0.02] to-transparent"
          >
            <div className="flex items-center gap-4 mb-8">
              <History className={`text-3xl ${accentColor}`} />
              <h3 className="text-2xl font-bold uppercase tracking-wider">The Curator’s Protocol</h3>
            </div>
            <div className="text-gray-400 text-[15.5px] leading-relaxed max-w-2xl">
              Your visit is personally escorted by a Senior Prefect of the Archives. 
              No photography or recording devices permitted. 
              All electronic devices must be surrendered before entering through the Porta Santa Anna.
            </div>
          </motion.div>
        </div>

        {/* Right Column - Booking Card */}
        <div className="lg:col-span-5">
          <div className={`sticky top-32 lg:top-40 p-12 lg:p-16 rounded-[3.5rem] bg-black/95 border border-white/10 backdrop-blur-3xl ${glow} transition-all duration-700 hover:border-white/25`}>
            
            <div className="flex justify-between items-start mb-12">
              <div>
                <div className="uppercase text-xs tracking-[0.2em] text-gray-500 font-bold">Private Access Fee</div>
                <div className="text-[4.2rem] leading-none font-black tracking-[-0.03em] mt-2">
                  {formatPrice(4500)}
                </div>
                <div className="text-sm text-gray-400 mt-1">per person • Once in a lifetime</div>
              </div>
              <div className={`p-4 rounded-2xl bg-white/5 border border-white/10 ${accentColor}`}>
                <LockKeyhole size={32} />
              </div>
            </div>

            <div className="space-y-6 mb-14">
              {[
                "Swiss Guard Escort",
                "Private Vatican SUV Transfer",
                "Pontifical Library Access",
                "Exclusive Post-Tour Private Mass"
              ].map((item, i) => (
                <div key={i} className="flex justify-between items-center py-4 border-b border-white/10 last:border-b-0 group">
                  <span className="text-gray-400 group-hover:text-white transition-colors text-sm">{item}</span>
                  <div className={`w-2 h-2 rounded-full ${isLuxuryMode ? 'bg-amber-400' : 'bg-emerald-400'}`} />
                </div>
              ))}
            </div>

            <motion.button
              whileHover={{ scale: 1.015 }}
              whileTap={{ scale: 0.985 }}
              className={`w-full py-7 rounded-3xl font-black uppercase tracking-[0.12em] text-sm transition-all shadow-xl ${
                isLuxuryMode
                  ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-black hover:brightness-110'
                  : 'bg-white text-black hover:bg-emerald-500 hover:text-white'
              }`}
            >
              Request Entry Permit
            </motion.button>

            <p className="text-center text-[10px] text-gray-600 font-black tracking-[0.2em] mt-10">
              SUBJECT TO PAPAL APPROVAL • NON-REFUNDABLE
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}