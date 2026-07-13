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
    }, 1800);
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
    <main className="bg-black text-white min-h-screen overflow-hidden">
      {/* HERO SECTION */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <motion.div
          initial={{ scale: 1.15 }}
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
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/60 to-black" />
        </motion.div>

        <div className="relative z-10 text-center px-6 max-w-4xl">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-1.5 rounded-full mb-6 border border-white/20">
            <Train className="text-amber-400" size={20} />
            <span className="text-sm tracking-widest">WORLD-CLASS SCENIC RAIL</span>
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

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2"
        >
          <div className="flex flex-col items-center gap-2 text-xs tracking-widest text-gray-500">
            SCROLL TO EXPLORE
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
            >
              ↓
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* ITINERARY SECTION */}
      <section className="max-w-6xl mx-auto px-6 py-24">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold tracking-tight mb-4">Signature Itinerary</h2>
          <p className="text-gray-400 text-lg max-w-md mx-auto">
            Carefully curated for the ultimate alpine luxury experience
          </p>
        </div>

        <div className="space-y-8">
          {itinerary.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.01 }}
              className="group p-8 bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl hover:border-white/30 transition-all duration-300"
            >
              <div className="flex flex-col md:flex-row md:items-center gap-6">
                <div className="md:w-28 flex-shrink-0">
                  <div className="text-amber-400 font-mono text-sm tracking-widest mb-1">
                    {item.day}
                  </div>
                  <div className="text-xs uppercase text-gray-500">{item.highlight}</div>
                </div>

                <div className="flex-1">
                  <h3 className="text-2xl font-semibold mb-3 group-hover:text-amber-400 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-gray-400 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* BOOKING SECTION */}
      <section className="max-w-4xl mx-auto px-6 pb-28">
        <div className="p-12 border border-white/10 rounded-3xl bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-2xl">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-10">
            <div>
              <div className="uppercase tracking-widest text-xs text-amber-400 mb-2">Starting from</div>
              <div className="text-6xl font-bold tracking-tighter">
                {formatPrice(2800)}
              </div>
              <div className="text-gray-400 mt-1">per person • Double occupancy</div>
            </div>

            <div className="text-right">
              <div className="text-sm text-emerald-400 flex items-center gap-1 justify-end">
                <CheckCircle2 size={18} /> Limited seats available
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                placeholder="Full Name"
                className="w-full p-4 bg-black/50 border border-white/10 rounded-2xl focus:border-amber-400 focus:outline-none transition-all placeholder:text-gray-500"
                required
              />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Email Address"
                className="w-full p-4 bg-black/50 border border-white/10 rounded-2xl focus:border-amber-400 focus:outline-none transition-all placeholder:text-gray-500"
                required
              />
            </div>

            <AnimatePresence mode="wait">
              {status === "submitting" ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="h-16 flex items-center justify-center bg-white/10 rounded-2xl"
                >
                  <Loader2 className="w-6 h-6 animate-spin" />
                </motion.div>
              ) : status === "success" ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="h-16 flex items-center justify-center bg-emerald-500/20 border border-emerald-500/30 rounded-2xl text-emerald-400 gap-3 font-medium"
                >
                  <CheckCircle2 size={24} />
                  Booking Request Received! We'll contact you soon.
                </motion.div>
              ) : (
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="w-full h-16 bg-white hover:bg-amber-400 text-black font-semibold text-lg rounded-2xl flex items-center justify-center gap-3 transition-all active:scale-95"
                >
                  Reserve Your Journey
                  <ArrowRight size={22} />
                </motion.button>
              )}
            </AnimatePresence>

            <p className="text-center text-xs text-gray-500 mt-6">
              • No payment required now • Confirmation within 24 hours
            </p>
          </form>
        </div>
      </section>
    </main>
  );
}