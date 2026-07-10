"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MapPin,
  Clock,
  Star,
  ArrowRight,
  Loader2,
  CheckCircle2,
} from "lucide-react";
import Image from "next/image";
import { useCurrency } from "@/context/CurrencyContext";

const itinerary = [
  {
    day: "Day 1",
    title: "Arrival in Kyoto",
    desc: "Welcome to Japan. Private transfer and stay in a traditional ryokan with onsen experience.",
    highlight: "TRADITIONAL WELCOME",
  },
  {
    day: "Day 2",
    title: "Kyoto Temples & Bamboo Forest",
    desc: "Explore Arashiyama Bamboo Grove, Zen gardens, and historic shrines in beautiful Kyoto.",
    highlight: "ZEN & NATURE",
  },
  {
    day: "Day 3",
    title: "Bullet Train to Tokyo",
    desc: "Experience the legendary Shinkansen bullet train at 320 km/h en route to Tokyo.",
    highlight: "SHINKANSEN RIDE",
  },
  {
    day: "Day 4",
    title: "Tokyo Neon Nights",
    desc: "Discover the vibrant energy of Shibuya Crossing, Akihabara, and stunning Tokyo skyline views.",
    highlight: "MODERN TOKYO",
  },
];

export default function KyotoTokyoNeon() {
  const { formatPrice } = useCurrency();
  const [mounted, setMounted] = useState(false);
  const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle");
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");

    setTimeout(() => {
      setStatus("success");
      setTimeout(() => {
        setStatus("idle");
        setFormData({ fullName: "", email: "" });
      }, 2500);
    }, 1600);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  if (!mounted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <Loader2 className="animate-spin w-10 h-10 text-white" />
      </div>
    );
  }

  return (
    <main className="bg-black text-white min-h-screen">
      {/* HERO - Split Image Style (Improved) */}
      <section className="relative h-screen grid grid-cols-1 lg:grid-cols-2 overflow-hidden">
        {/* Left - Kyoto */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2 }}
          className="relative"
        >
          <Image
            src="https://images.pexels.com/photos/402028/pexels-photo-402028.jpeg"
            alt="Kyoto Temple"
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />
        </motion.div>

        {/* Right - Tokyo */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 0.3 }}
          className="relative"
        >
          <Image
            src="https://images.pexels.com/photos/3408354/pexels-photo-3408354.jpeg"
            alt="Tokyo Neon Lights"
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-l from-black/70 via-black/40 to-transparent" />
        </motion.div>

        {/* Overlay Text */}
        <div className="absolute inset-0 flex items-center justify-center text-center px-6 z-10">
          <div className="max-w-4xl">
            <h1 className="text-5xl lg:text-7xl font-black tracking-tighter mb-6">
              Kyoto Zen & Tokyo Neon
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-10">
              Experience Japan’s perfect contrast — serene temples and ancient traditions 
              meet the electric energy of modern Tokyo.
            </p>

            <div className="flex justify-center gap-6 text-sm text-gray-400 flex-wrap">
              <span className="flex items-center gap-2">
                <Clock size={18} /> 4 Days
              </span>
              <span className="flex items-center gap-2">
                <MapPin size={18} /> Japan
              </span>
              <span className="flex items-center gap-2">
                <Star size={18} className="text-amber-400 fill-current" />
                <span>4.8 (92 reviews)</span>
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ITINERARY - Consistent Style */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <h2 className="text-4xl font-bold mb-12">Itinerary</h2>

        <div className="space-y-6">
          {itinerary.map((item, i) => (
            <motion.div
              key={i}
              whileHover={{ x: 10 }}
              className="p-6 border border-white/10 rounded-2xl bg-white/5 group"
            >
              <div className="flex items-start gap-6">
                <div className="flex-shrink-0 min-w-[110px]">
                  <div className="text-sm text-amber-400 font-medium">{item.day}</div>
                  <div className="text-xs uppercase tracking-widest text-gray-500 mt-1">
                    {item.highlight}
                  </div>
                </div>

                <div className="flex-1">
                  <div className="text-xl font-bold group-hover:text-amber-400 transition-colors">
                    {item.title}
                  </div>
                  <p className="text-gray-400 mt-3 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* BOOKING - Fully Consistent */}
      <section className="max-w-4xl mx-auto px-6 pb-20">
        <div className="p-10 border border-white/10 rounded-3xl bg-white/5 backdrop-blur-xl">
          
          <div className="flex justify-between items-center mb-8">
            <div>
              <div className="text-sm text-gray-400">Price</div>
              <div className="text-4xl font-bold text-amber-400">
                {formatPrice(2200)}
              </div>
            </div>
            <div className="text-gray-400">per person</div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleInputChange}
              placeholder="Full Name"
              className="w-full p-3 bg-white/5 border border-white/10 rounded-xl focus:border-amber-400 transition-all"
              required
            />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Email"
              className="w-full p-3 bg-white/5 border border-white/10 rounded-xl focus:border-amber-400 transition-all"
              required
            />

            <AnimatePresence mode="wait">
              {status === "submitting" ? (
                <div className="p-4 bg-white/10 rounded-xl flex justify-center">
                  <Loader2 className="animate-spin text-amber-400" />
                </div>
              ) : status === "success" ? (
                <div className="p-4 bg-green-500/20 rounded-xl flex justify-center text-green-400">
                  <CheckCircle2 size={28} />
                </div>
              ) : (
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="w-full p-4 bg-white text-black rounded-xl font-bold flex justify-center items-center gap-2 hover:bg-amber-400 transition-all"
                >
                  Book Now <ArrowRight size={18} />
                </motion.button>
              )}
            </AnimatePresence>
          </form>
        </div>
      </section>
    </main>
  );
}