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
  Train,
} from "lucide-react";
import Image from "next/image";
import { useCurrency } from "@/context/CurrencyContext";

const itinerary = [
  {
    day: "Day 1",
    title: "Arrival in Zurich",
    desc: "Private airport transfer to your luxury hotel in the heart of Zurich. Evening welcome dinner with Swiss wines.",
    highlight: "CITY WELCOME",
  },
  {
    day: "Day 2",
    title: "Glacier Express Panorama Journey",
    desc: "Board the world-famous Glacier Express for an unforgettable ride through the Swiss Alps with panoramic windows.",
    highlight: "ICONIC TRAIN RIDE",
  },
  {
    day: "Day 3",
    title: "Zermatt & Matterhorn",
    desc: "Explore the car-free village of Zermatt and enjoy breathtaking views of the iconic Matterhorn peak.",
    highlight: "MATTERHORN VIEWS",
  },
  {
    day: "Day 4",
    title: "St. Moritz Luxury Escape",
    desc: "Arrive in glamorous St. Moritz. Enjoy spa time, alpine lakes, and an exclusive farewell dinner.",
    highlight: "EXCLUSIVE RESORT",
  },
];

export default function AlpineLuxuryExpress() {
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
      {/* HERO SECTION */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <motion.div
          initial={{ scale: 1.12 }}
          animate={{ scale: 1 }}
          transition={{ duration: 2, ease: "easeOut" }}
          className="absolute inset-0"
        >
          <Image
            src="https://images.pexels.com/photos/417074/pexels-photo-417074.jpeg"
            alt="Glacier Express through Swiss Alps"
            fill
            priority
            className="object-cover brightness-75"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/70 to-black" />
        </motion.div>

        <div className="relative z-10 text-center px-6 max-w-4xl">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-1.5 rounded-full mb-6 border border-white/20">
            <Train className="text-amber-400" size={20} />
            <span className="uppercase tracking-widest text-sm">World-Class Scenic Rail</span>
          </div>

          <h1 className="text-6xl md:text-7xl font-black tracking-tighter mb-6">
            Alpine Luxury Express
          </h1>

          <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-10">
            A 4-day journey through the majestic Swiss Alps aboard the legendary Glacier Express.
          </p>

          <div className="flex flex-wrap justify-center gap-x-8 gap-y-4 text-sm text-gray-400">
            <div className="flex items-center gap-2">
              <Clock size={18} />
              <span>4 Days • 3 Nights</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin size={18} />
              <span>Switzerland</span>
            </div>
            <div className="flex items-center gap-2">
              <Star size={18} className="text-amber-400 fill-current" />
              <span>5.0 (87 reviews)</span>
            </div>
          </div>
        </div>
      </section>
       <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-xs tracking-widest text-gray-500 flex flex-col items-center"
        >
          DISCOVER THE ALPS
          <motion.div animate={{ y: [0, 6, 0] }} transition={{ repeat: Infinity, duration: 1.8 }}>
            ↓
          </motion.div>
        </motion.div>

      {/* ITINERARY - Now matches Rajasthan style */}
     <section className="max-w-6xl mx-auto px-6 py-24">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold tracking-tight mb-4">Signature Itinerary</h2>
          <p className="text-gray-400 max-w-md mx-auto">
            Carefully curated for the ultimate alpine luxury experience
          </p>
        </div>
        <div className="space-y-6">
          {itinerary.map((item, i) => (
            <motion.div
              key={i}
              whileHover={{ x: 10 }}
              className="p-6 border border-white/10 rounded-2xl bg-white/5 group"
            >
              <div className="flex items-start gap-6">
                <div className="flex-shrink-0 min-w-[100px]">
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

      {/* BOOKING SECTION - Matched to Rajasthan */}
      <section className="max-w-4xl mx-auto px-6 pb-20">
        <div className="p-10 border border-white/10 rounded-3xl bg-white/5 backdrop-blur-xl">
          
          <div className="flex justify-between items-center mb-8">
            <div>
              <div className="text-sm text-gray-400">Price</div>
              <div className="text-4xl font-bold text-amber-400">
                {formatPrice(2800)}
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