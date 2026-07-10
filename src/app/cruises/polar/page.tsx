"use client";

import React, { useState, useEffect } from "react";
import {
  Snowflake, MapPin, Star, Clock, Anchor,
  Loader2, Ship, Thermometer, Waves, ArrowLeft,
  ChevronRight, ShieldCheck
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { useCurrency } from "@/context/CurrencyContext";

const highlights = [
  {
    icon: <Ship size={36} />,
    title: "Ice-Class Navigation",
    desc: "Reinforced hull and advanced ice radar for safe passage through dramatic polar waters."
  },
  {
    icon: <Star size={36} />,
    title: "Intimate Wildlife Encounters",
    desc: "Daily zodiac safaris for close-up views of penguins, seals, and majestic whales."
  },
  {
    icon: <Anchor size={36} />,
    title: "Scientific Discovery",
    desc: "Onboard lectures and research stations led by world-renowned glaciologists."
  }
];

const inclusions = [
  "All-inclusive fine dining & wine pairing",
  "Expert naturalist-guided shore excursions",
  "Expedition parkas and gear provided",
  "Daily zodiac landings and kayak options"
];

export default function PolarCruisePage() {
  const { formatPrice } = useCurrency();
  const [mounted, setMounted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { scrollYProgress } = useScroll();
  const yParallax = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      alert("Booking request received! Our expedition team will contact you shortly.");
      setIsSubmitting(false);
    }, 1200);
  };

  if (!mounted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#020617]">
        <Loader2 className="w-8 h-8 animate-spin text-cyan-400" />
      </div>
    );
  }

  return (
    <main className="bg-[#020617] text-white min-h-screen overflow-x-hidden">
      {/* Ambient Ice Glow */}
      <div className="fixed inset-0 bg-gradient-to-b from-cyan-400/10 via-transparent to-transparent pointer-events-none z-0" />

      {/* Back Button */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.3 }}
        className="fixed top-8 left-6 z-50"
      >
        <Link
          href="/destinations"
          className="flex items-center gap-3 px-6 py-3 rounded-2xl bg-black/70 backdrop-blur-xl border border-white/10 hover:border-cyan-400/50 hover:bg-black/80 transition-all group"
        >
          <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
          <span className="font-medium text-sm">Back to Destinations</span>
        </Link>
      </motion.div>

      {/* HERO SECTION */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <motion.div
          style={{ y: yParallax }}
          className="absolute inset-0"
        >
          <Image
            src="https://images.pexels.com/photos/2678418/pexels-photo-2678418.jpeg"
            alt="Antarctic polar expedition ship navigating ice"
            fill
            priority
            className="object-cover brightness-[0.72] scale-105"
            sizes="100vw"
            quality={92}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/70 to-black" />
        </motion.div>

        <motion.div
          style={{ opacity: heroOpacity }}
          className="relative z-10 text-center px-6 max-w-5xl"
        >
          <div className="inline-flex items-center gap-3 px-6 py-2.5 rounded-full border border-cyan-400/30 bg-cyan-500/10 backdrop-blur-md mb-12">
            <Snowflake className="text-cyan-300 animate-[spin_12s_linear_infinite]" size={20} />
            <span className="text-xs font-black uppercase tracking-[0.5em] text-cyan-200">2026–2027 SEASON</span>
          </div>

          <h1 className="text-6xl md:text-7xl lg:text-[5.8rem] font-black tracking-[-0.04em] leading-[0.9] mb-6">
            POLAR<br />
            <span className="bg-gradient-to-r from-cyan-200 via-white to-cyan-300 bg-clip-text text-transparent">
              EXPEDITION
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-cyan-100/80 max-w-2xl mx-auto leading-relaxed">
            12 days of untouched wilderness, towering icebergs, and rare wildlife encounters aboard our luxury ice-class vessel.
          </p>

          {/* Quick Stats */}
          <div className="flex flex-wrap justify-center gap-x-12 gap-y-8 mt-20">
            {[
              { icon: <Clock size={24} />, label: "12 DAYS" },
              { icon: <Waves size={24} />, label: "PC6 ICE CLASS" },
              { icon: <Thermometer size={24} />, label: "−15°C AVERAGE" },
            ].map((stat, i) => (
              <div key={i} className="flex items-center gap-3 text-cyan-300">
                {stat.icon}
                <span className="font-semibold tracking-wider text-sm">{stat.label}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Scroll Prompt */}
        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2.5, repeat: Infinity }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 text-cyan-400/60 text-xs tracking-[0.2em]"
        >
          SCROLL TO EXPLORE
        </motion.div>
      </section>

      {/* HIGHLIGHTS SECTION */}
      <section className="max-w-7xl mx-auto px-6 py-28 md:py-32">
        <div className="text-center mb-16">
          <p className="text-cyan-400 text-sm font-black uppercase tracking-widest mb-4">THE EXPERIENCE</p>
          <h2 className="text-5xl md:text-6xl font-black tracking-tight">Designed for the Discerning Explorer</h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {highlights.map((highlight, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -14, transition: { duration: 0.4 } }}
              className="group p-10 bg-white/5 border border-white/10 rounded-3xl hover:border-cyan-400/50 transition-all duration-500"
            >
              <div className="mb-10 text-cyan-400 group-hover:scale-110 transition-transform duration-500">
                {highlight.icon}
              </div>
              <h3 className="text-2xl font-bold mb-5 tracking-tight">{highlight.title}</h3>
              <p className="text-gray-400 leading-relaxed">{highlight.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* IMAGE GALLERY STRIP */}
      <section className="flex flex-col md:flex-row h-[580px] md:h-[620px] gap-3 px-3 overflow-hidden">
        {[
          "https://images.pexels.com/photos/5026380/pexels-photo-5026380.jpeg",
          "https://images.pexels.com/photos/36096738/pexels-photo-36096738.jpeg",
          "https://images.pexels.com/photos/3663915/pexels-photo-3663915.jpeg"
        ].map((src, i) => (
          <div 
            key={i} 
            className="relative flex-1 overflow-hidden rounded-2xl group"
          >
            <Image
              src={src}
              alt={`Polar expedition scene ${i + 1}`}
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-700"
              sizes="(max-width: 768px) 100vw, 33vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
          </div>
        ))}
      </section>

      {/* BOOKING SECTION */}
      <section className="max-w-6xl mx-auto px-6 py-28 md:py-32">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <div>
            <h2 className="text-5xl md:text-6xl font-black tracking-tighter leading-none mb-8">
              READY TO <span className="text-cyan-400">SET SAIL?</span>
            </h2>
            <p className="text-gray-400 text-lg leading-relaxed max-w-lg">
              Limited departures during the Austral summer. Each voyage welcomes only 120 guests to preserve the pristine environment and ensure an intimate experience.
            </p>

            <div className="mt-14 space-y-6">
              {inclusions.map((item, i) => (
                <div key={i} className="flex items-start gap-4">
                  <ShieldCheck className="text-cyan-400 mt-1 flex-shrink-0" size={24} />
                  <span className="text-gray-300 text-[17px]">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Booking Card */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="bg-zinc-950/90 border border-cyan-400/20 rounded-3xl p-10 lg:p-14 backdrop-blur-xl"
          >
            <div className="mb-12">
              <div className="uppercase text-xs tracking-[0.3em] text-cyan-400 mb-3">STARTING FROM</div>
              <div className="text-6xl font-black tracking-tighter">
                {formatPrice(8500)}
                <span className="text-2xl font-normal text-gray-400 ml-3">/ person</span>
              </div>
              <p className="text-sm text-gray-500 mt-2">Double occupancy • 12 days</p>
            </div>

            <form onSubmit={handleBookingSubmit} className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <input 
                  type="text" 
                  placeholder="First Name" 
                  required
                  className="bg-white/5 border border-white/10 rounded-2xl p-5 focus:border-cyan-400 focus:bg-white/10 outline-none transition-all placeholder:text-gray-500" 
                />
                <input 
                  type="text" 
                  placeholder="Last Name" 
                  required
                  className="bg-white/5 border border-white/10 rounded-2xl p-5 focus:border-cyan-400 focus:bg-white/10 outline-none transition-all placeholder:text-gray-500" 
                />
              </div>

              <input 
                type="email" 
                placeholder="Email Address" 
                required
                className="w-full bg-white/5 border border-white/10 rounded-2xl p-5 focus:border-cyan-400 focus:bg-white/10 outline-none transition-all placeholder:text-gray-500" 
              />

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-6 bg-cyan-400 hover:bg-cyan-300 disabled:bg-cyan-500/70 text-black font-black uppercase tracking-widest rounded-2xl transition-all flex items-center justify-center gap-3 group"
              >
                {isSubmitting ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <>
                    RESERVE MY CABIN
                    <ChevronRight className="group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>
            </form>

            <p className="text-center text-xs text-gray-500 mt-8 tracking-wide">
              Secure booking • Flexible cancellation policy • No hidden fees
            </p>
          </motion.div>
        </div>
      </section>
    </main>
  );
}