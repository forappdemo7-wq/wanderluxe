"use client";

import React from 'react';
import { useCurrency } from '@/context/CurrencyContext';
import { motion } from 'framer-motion';
import { MapPin, Clock, Star, ArrowUpRight, ShieldCheck } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

// --- DATASET ---
const experiences = [
  {
    id: 'exp-1',
    category: 'Adventure',
    title: 'Hot Air Balloon over Cappadocia',
    location: 'Turkey',
    duration: '4 Hours',
    rating: 4.9,
    priceUSD: 450,
    image: 'https://images.unsplash.com/photo-1520699049698-acd2fccb8cc8?auto=format&fit=crop&w=1200&q=80',
    description: 'Witness the fairy chimneys from a breathtaking perspective at sunrise.',
    blurhash: 'L@N@R~ofS#ozofWBofWBofWBofWBofWBof',
  },
  {
    id: 'exp-2',
    category: 'Culinary',
    title: 'Private Sushi Masterclass',
    location: 'Tokyo, Japan',
    duration: '3 Hours',
    rating: 5.0,
    priceUSD: 300,
    image: 'https://images.unsplash.com/photo-1553621042-f6e147245754?auto=format&fit=crop&w=1200&q=80',
    description: 'Learn the ancient art of Edomae sushi from a Michelin-starred chef.',
    blurhash: 'L@N@R~ofS#ozofWBofWBofWBofWBofWBof',
  }
];

const tourPackages = [
  {
    id: 'pkg-1',
    title: 'The Royal Rajasthan Heritage Trail',
    duration: '10 Days',
    locations: ['Jaipur', 'Jodhpur', 'Udaipur'],
    priceUSD: 3200,
    image: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=800&q=80',
    blurhash: 'L@N@R~ofS#ozofWBofWBofWBofWBofWBof',
  },
  {
    id: 'pkg-2',
    title: 'Alpine Luxury & Glacier Express',
    duration: '7 Days',
    locations: ['Zurich', 'Zermatt', 'St. Moritz'],
    priceUSD: 4500,
    image: 'https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&w=800&q=80',
    blurhash: 'L@N@R~ofS#ozofWBofWBofWBofWBofWBof',
  }
];

const signatureHotels = [
  {
    id: 'hot-1',
    name: 'The Taj Mahal Palace',
    location: 'Mumbai, India',
    type: 'Heritage Royal',
    priceUSD: 450,
    rating: 4.9,
    image: 'https://images.pexels.com/photos/1583339/pexels-photo-1583339.jpeg',
    blurhash: 'L@N@R~ofS#ozofWBofWBofWBofWBofWBof',
  },
  {
    id: 'hot-2',
    name: 'Aman Tokyo',
    location: 'Tokyo, Japan',
    type: 'Zen Sanctuary',
    priceUSD: 1400,
    rating: 5.0,
    image: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=800&q=80',
    blurhash: 'L@N@R~ofS#ozofWBofWBofWBofWBofWBof',
  }
];

export default function ExperiencePage() {
  const { formatPrice } = useCurrency();

  return (
    <div className="min-h-screen bg-black text-white pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* HEADER */}
        <motion.header 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-20"
        >
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-blue-400 font-black uppercase tracking-[0.3em] text-xs mb-4"
          >
            The 2026 Collection
          </motion.p>
          <h1 className="text-7xl md:text-9xl font-black uppercase tracking-tighter leading-none mb-6">
            Curated<br /><span className="text-blue-600 italic">Moments</span>
          </h1>
        </motion.header>

        {/* SECTION 1: MAIN EXPERIENCES */}
        <section className="space-y-32 mb-40">
          {experiences.map((exp, index) => (
            <motion.article 
              key={exp.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className={`flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} gap-12 items-center`}
            >
              <div className="w-full md:w-3/5 overflow-hidden rounded-[40px] group">
                <Image
                  src={exp.image}
                  alt={`${exp.title} - ${exp.location}`}
                  width={1200}
                  height={500}
                  className="w-full h-[500px] object-cover group-hover:scale-105 transition-transform duration-1000"
                  priority={index === 0}
                  placeholder="blur"
                  blurDataURL={exp.blurhash ? `data:image/jpeg;base64,${exp.blurhash}` : undefined}
                  sizes="(max-width: 768px) 100vw, 60vw"
                />
              </div>
              
              <div className="w-full md:w-2/5 space-y-6">
                <span className="text-blue-400 text-xs font-black uppercase tracking-widest">
                  {exp.category}
                </span>
                
                <h2 className="text-5xl font-bold tracking-tight leading-tight">
                  {exp.title}
                </h2>
                
                <div className="flex items-center gap-2 text-yellow-400 mb-4">
                  <Star fill="currentColor" className="w-5 h-5 flex-shrink-0" />
                  <span className="text-xl font-bold">{exp.rating}</span>
                  <span className="text-gray-500 text-sm">({exp.location})</span>
                </div>
                
                <p className="text-gray-400 text-lg leading-relaxed">
                  {exp.description}
                </p>
                
                <div className="pt-6 border-t border-white/10 flex justify-between items-center">
                  <div>
                    <p className="text-sm text-gray-500 uppercase tracking-wider mb-1">{exp.duration}</p>
                    <p className="text-3xl font-black">{formatPrice(exp.priceUSD)}</p>
                  </div>
                  <motion.button 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-white text-black p-4 rounded-full hover:bg-blue-600 hover:text-white transition-all shadow-2xl"
                    aria-label={`Book ${exp.title}`}
                  >
                    <ArrowUpRight className="w-5 h-5" />
                  </motion.button>
                </div>
              </div>
            </motion.article>
          ))}
        </section>

        {/* SECTION 2: BESPOKE PACKAGES */}
        <section className="mb-40 border-t border-white/10 pt-24">
          <motion.h2 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-5xl md:text-7xl font-black uppercase tracking-tighter mb-12"
          >
            Bespoke Packages
          </motion.h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {tourPackages.map((pkg, index) => (
              <motion.div 
                key={pkg.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
                transition={{ delay: index * 0.1 }}
                className="bg-zinc-900/40 backdrop-blur-sm rounded-[32px] overflow-hidden border border-white/5 hover:border-white/20 transition-all duration-300 group"
              >
                <div className="overflow-hidden">
                  <Image
                    src={pkg.image}
                    alt={pkg.title}
                    width={800}
                    height={288}
                    className="w-full h-72 object-cover group-hover:scale-110 transition-transform duration-700"
                    placeholder="blur"
                    blurDataURL={pkg.blurhash ? `data:image/jpeg;base64,${pkg.blurhash}` : undefined}
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
                
                <div className="p-8">
                  <span className="text-blue-400 text-[10px] font-black uppercase mb-2 block">
                    {pkg.duration}
                  </span>
                  <h3 className="text-3xl font-bold mb-4 leading-tight group-hover:text-blue-400 transition-colors">
                    {pkg.title}
                  </h3>
                  <p className="text-2xl font-black text-white">{formatPrice(pkg.priceUSD)}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* SECTION 3: SIGNATURE HOTELS */}
        <section>
          <div className="text-center mb-16">
            <motion.h2 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="text-5xl md:text-7xl font-black uppercase tracking-tighter mb-4"
            >
              The <span className="text-blue-600">Reserve</span> Collection
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-gray-400 text-xl max-w-2xl mx-auto"
            >
              Exclusive access to our portfolio of 20+ world-class stays.
            </motion.p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {signatureHotels.map((hotel, index) => (
              <motion.div 
                key={hotel.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                whileHover={{ y: -8, scale: 1.02 }}
                transition={{ delay: index * 0.05 }}
                className="bg-zinc-900/50 backdrop-blur-sm p-6 rounded-[32px] border border-white/10 hover:border-white/20 hover:bg-zinc-900/70 transition-all duration-300 group"
              >
                <div className="overflow-hidden rounded-[24px] mb-6">
                  <Image
                    src={hotel.image}
                    alt={hotel.name}
                    width={400}
                    height={256}
                    className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                    placeholder="blur"
                    blurDataURL={hotel.blurhash ? `data:image/jpeg;base64,${hotel.blurhash}` : undefined}
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </div>
                
                <div className="px-2 space-y-3">
                  <h4 className="text-xl font-bold leading-tight group-hover:text-blue-400 transition-colors">
                    {hotel.name}
                  </h4>
                  <p className="text-sm text-gray-500 mb-4 flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    {hotel.location}
                  </p>
                  
                  <div className="flex justify-between items-center pt-4 border-t border-white/5">
                    <span className="text-blue-400 text-[10px] font-black uppercase tracking-widest">
                      {hotel.type}
                    </span>
                    <div className="text-right">
                      <div className="flex items-center gap-1 text-yellow-400 mb-1 justify-end">
                        <Star fill="currentColor" className="w-4 h-4" />
                        <span className="text-sm font-bold">{hotel.rating}</span>
                      </div>
                      <p className="text-xl font-black">{formatPrice(hotel.priceUSD)}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
}
