"use client";

import React, { useState, useEffect } from 'react';
import { 
  Anchor, Compass, Ship, Waves, Calendar, Users, Check, 
  ChevronRight, Star, MapPin, ArrowRight, ShieldCheck, 
  Sparkles, Clock, HelpCircle, Loader2, X, Info
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { useCurrency } from '@/context/CurrencyContext';

interface Voyage {
  id: string;
  title: string;
  category: 'polar' | 'tropical' | 'cultural';
  subtitle: string;
  priceUSD: number;
  duration: string;
  vessel: string;
  embarkation: string;
  maxGuests: number;
  rating: string;
  reviewsCount: number;
  image: string;
  link: string;
  description: string;
  badge: string;
  inclusions: string[];
  itinerarySummary: string;
  days: { title: string; desc: string }[];
}

const voyages: Voyage[] = [
  {
    id: "polar-expedition",
    title: "The Polar Expedition",
    category: "polar",
    subtitle: "Antarctica & Arctic Ice-Class Exploration",
    priceUSD: 8500,
    duration: "12 Days",
    vessel: "MV Magellan Explorer",
    embarkation: "Ushuaia, Argentina",
    maxGuests: 120,
    rating: "4.95",
    reviewsCount: 142,
    image: "https://images.unsplash.com/photo-1551244072-5d12893278ab?auto=format&fit=crop&w=1200&q=85",
    link: "/cruises/polar",
    description: "Navigate untouched ice fields, towering glaciers, and pristine bays on our reinforced luxury vessel. Features daily zodiac landings, marine biologist-led safaris, and onboard helicopters.",
    badge: "Limited Cabins",
    inclusions: [
      "Zodiac excursions & glacier landings",
      "Helicopter flightseeing & scouting",
      "Onboard scientist-led research labs",
      "All-inclusive fine dining & open bar"
    ],
    itinerarySummary: "Ushuaia → Drake Passage → Antarctic Peninsula → South Shetland Islands",
    days: [
      { title: "Day 1: Embarkation in Ushuaia", desc: "Board the Magellan Explorer in Ushuaia, the world's southernmost city. Meet the expedition leaders." },
      { title: "Day 2-3: Crossing Drake Passage", desc: "Sail across the legendary Drake Passage. Watch for albatrosses, humpback whales, and iceberg sightings." },
      { title: "Day 4-8: Antarctic Peninsula", desc: "Launch zodiacs to spot gentoo penguins, leopard seals, and explore majestic glacier bays." },
      { title: "Day 9-10: South Shetland Islands", desc: "Visit research stations and navigate geothermal waters around volcanic Deception Island." },
      { title: "Day 11-12: Disembarkation", desc: "Recross the Drake Passage, share final expedition logs, and return safely to Ushuaia." }
    ]
  },
  {
    id: "mediterranean-charter",
    title: "Mediterranean Ultra-Luxe",
    category: "tropical",
    subtitle: "Amalfi Coast & Cyclades Private Escape",
    priceUSD: 12400,
    duration: "9 Days",
    vessel: "The Solaris II Mega Yacht",
    embarkation: "Naples, Italy",
    maxGuests: 36,
    rating: "4.98",
    reviewsCount: 88,
    image: "https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?auto=format&fit=crop&w=1200&q=85",
    link: "#",
    description: "Enjoy ultimate privacy cruising the dazzling Mediterranean. Dock in exclusive harbors inaccessible to larger ships, enjoy water-sports directly from the stern beach club, and dine on custom Michelin-calibre creations.",
    badge: "Exclusive Charter",
    inclusions: [
      "Custom 40ft yacht-tender crafts",
      "Stern-folding beach club & hot stone sauna",
      "Personal Michelin-starred culinary team",
      "Unlimited diving & seabob water toys"
    ],
    itinerarySummary: "Naples → Capri → Amalfi → Santorini → Mykonos",
    days: [
      { title: "Day 1: Monaco Boarding & Sail", desc: "Board the Solaris II in Monaco harbor. Evening champagne cruise past the shining Côte d'Azur." },
      { title: "Day 2-3: Amalfi Coast & Ravello", desc: "Anchor off Positano. Take our custom tender craft for a private evening dining experience on the cliffs." },
      { title: "Day 4-5: Aeolian Islands Exploration", desc: "Sail past active volcano Stromboli at sunset. Enjoy crystal scuba dives in the cave archipelagos." },
      { title: "Day 6-7: Cyclades & Santorini Sunset", desc: "Dock in Santorinian private marinas. Tour organic vineyards with our master sommelier." },
      { title: "Day 8-9: Mykonos Disembarkation", desc: "Wake up in Mykonos. Final seaside brunch before disembarkation and transfer to airport." }
    ]
  },
  {
    id: "nile-sanctuary",
    title: "Nile Royal Sanctuary",
    category: "cultural",
    subtitle: "Historic Wonders of Ancient Egypt",
    priceUSD: 6800,
    duration: "8 Days",
    vessel: "The Dahabiya Cleopatra",
    embarkation: "Luxor, Egypt",
    maxGuests: 16,
    rating: "4.92",
    reviewsCount: 204,
    image: "https://images.unsplash.com/photo-1539650116574-8efeb43e2750?auto=format&fit=crop&w=1200&q=85",
    link: "#",
    description: "Settle into a traditional luxury sailing dahabiya. Journey slowly past ancient temples with a private world-renowned Egyptologist, visiting Valley of the Kings and secret archaeological digs.",
    badge: "Historical Journey",
    inclusions: [
      "Private VIP Egyptologist guides",
      "After-hours private temple access",
      "Premium organic Egyptian tastings",
      "Traditional sunset felucca sailing"
    ],
    itinerarySummary: "Luxor → Esna → Edfu → Kom Ombo → Aswan",
    days: [
      { title: "Day 1: Ancient Luxor & Valley of the Kings", desc: "Board the Dahabiya Cleopatra. Tour Karnak Temple with your personal Egyptologist under starlight." },
      { title: "Day 2-3: Sailing past Esna", desc: "Relax as sails harness the Nile breezes. Step ashore at remote mud-brick villages untouched by time." },
      { title: "Day 4: Horus Temple at Edfu", desc: "Explore Edfu's stunning sandstone walls, concluding with a private dinner on a river island." },
      { title: "Day 5-6: Kom Ombo Crocodile Temple", desc: "Navigate the Nile bends to Kom Ombo. Dine on gourmet traditional cuisines under lanterns." },
      { title: "Day 7-8: Aswan & Philae Temple", desc: "Visit Aswan's beautiful granite quarries and the water-bound Temple of Philae before transfer." }
    ]
  },
  {
    id: "south-pacific-atolls",
    title: "South Pacific Atoll Explorer",
    category: "tropical",
    subtitle: "Fiji, Tonga & French Polynesia Lagoons",
    priceUSD: 9950,
    duration: "14 Days",
    vessel: "Le Pacific Wind Catamaran",
    embarkation: "Papeete, Tahiti",
    maxGuests: 24,
    rating: "4.97",
    reviewsCount: 110,
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=85",
    link: "#",
    description: "Explore crystal coral lagoons, uninhabited tropical islets, and dramatic volcanic peaks. Swim with humpback whales, explore deep marine reserves with our diver-naturalist, and experience local Polynesian fire ceremonies.",
    badge: "Remote Escape",
    inclusions: [
      "PADI dive master led daily diving",
      "Overwater catamaran glass-floor suites",
      "Marine biologist led reef lectures",
      "Exclusive private island beach barbecues"
    ],
    itinerarySummary: "Tahiti → Bora Bora → Moorea → Rangiroa → Taha'a",
    days: [
      { title: "Day 1-3: Tahiti & Moorea Lagoons", desc: "Embark on Le Pacific Wind. Snorkel with playful stingrays and sleep over neon-glowing coral reefs." },
      { title: "Day 4-6: Bora Bora Reef Sanctuary", desc: "Paddleboard through clear turquoise water, followed by an evening fire-dancing ceremony." },
      { title: "Day 7-9: Tuamotu Archipelago", desc: "Sail deep into untouched atolls. Dive with thousands of tropical fish inside protected channels." },
      { title: "Day 10-12: Marquesas Wild Peaks", desc: "Hike dense rainforests to spectacular volcanic ridges and swim with manta rays at sunset." },
      { title: "Day 13-14: Return to Papeete", desc: "Enjoy a final catamaran beach party before disembarking in beautiful Tahiti." }
    ]
  }
];

export default function CruisesPage() {
  const { formatPrice } = useCurrency();
  const [activeTab, setActiveTab] = useState<'all' | 'polar' | 'tropical' | 'cultural'>('all');
  const [selectedVoyage, setSelectedVoyage] = useState<Voyage | null>(null);
  
  // Booking Form States inside Modal
  const [date, setDate] = useState('');
  const [cabinClass, setCabinClass] = useState('standard');
  const [guests, setGuests] = useState(2);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(false);

  // Filtered Voyages
  const filteredVoyages = activeTab === 'all' 
    ? voyages 
    : voyages.filter(v => v.category === activeTab);

  const handleOpenVoyage = (voyage: Voyage) => {
    setSelectedVoyage(voyage);
    setBookingSuccess(false);
    setDate('');
    setCabinClass('standard');
    setGuests(2);
  };

  const handleInquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setBookingSuccess(true);
    }, 1500);
  };

  return (
    <main className="bg-[#05070f] text-white min-h-screen pt-32 pb-24 px-6 relative overflow-hidden">
      {/* Dynamic ocean gradient glow */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-[180px] pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-[500px] h-[500px] bg-cyan-500/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* HERO HEADER */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-blue-400/20 bg-blue-500/10 backdrop-blur-md mb-6"
          >
            <Anchor className="text-blue-400 animate-pulse" size={16} />
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-200">Wander Luxe Marine Suite</span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-black uppercase tracking-tighter mb-6"
          >
            OCEAN <span className="bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">VOYAGES</span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-gray-400 text-lg md:text-xl font-medium leading-relaxed"
          >
            Meticulously planned maritime journeys across the world's most remote polar caps, pristine private yacht passages, and timeless historic rivers.
          </motion.p>
        </div>

        {/* NAVIGATION TABS */}
        <div className="flex justify-center mb-16">
          <div className="flex bg-slate-900/80 border border-white/5 p-1.5 rounded-2xl md:rounded-full gap-1 overflow-x-auto max-w-full scrollbar-none">
            {[
              { id: 'all', label: 'All Voyages', icon: <Compass size={14} /> },
              { id: 'polar', label: 'Polar Cap', icon: <Waves size={14} /> },
              { id: 'tropical', label: 'Tropical Yachting', icon: <Ship size={14} /> },
              { id: 'cultural', label: 'River & Cultural', icon: <Anchor size={14} /> },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-6 py-3.5 rounded-xl md:rounded-full text-xs font-black uppercase tracking-widest flex items-center gap-2 transition-all duration-350 ${
                  activeTab === tab.id 
                    ? 'bg-blue-600 text-white shadow-[0_8px_20px_rgba(37,99,235,0.4)]' 
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
              >
                {tab.icon}
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* VOYAGES GRID */}
        <motion.div 
          layout
          className="grid grid-cols-1 lg:grid-cols-2 gap-10"
        >
          <AnimatePresence mode="popLayout">
            {filteredVoyages.map((voyage, idx) => (
              <motion.div
                key={voyage.id}
                layout
                initial={{ opacity: 0, scale: 0.95, y: 30 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 15 }}
                transition={{ duration: 0.45, ease: "easeOut", delay: idx * 0.08 }}
                className="group relative flex flex-col bg-slate-900/40 border border-white/5 rounded-[2.5rem] overflow-hidden hover:border-blue-500/30 transition-all duration-500 hover:-translate-y-2.5 hover:shadow-2xl hover:shadow-blue-900/10"
              >
                {/* Image Section */}
                <div className="relative h-72 md:h-80 overflow-hidden bg-slate-950">
                  <Image
                    src={voyage.image}
                    alt={voyage.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-[1.2s] ease-out brightness-[0.82]"
                    referrerPolicy="no-referrer"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#05070f] via-black/30 to-transparent" />

                  {/* Top Badges */}
                  <div className="absolute top-6 left-6 flex flex-col gap-2 z-10">
                    <span className="bg-blue-600 text-white text-[10px] font-black uppercase tracking-[0.15em] px-4 py-2 rounded-xl shadow-lg">
                      {voyage.badge}
                    </span>
                  </div>

                  {/* Vessel Detail Floating */}
                  <div className="absolute bottom-6 left-6 z-10 flex items-center gap-2 bg-black/55 backdrop-blur-md px-4 py-2 rounded-xl border border-white/10">
                    <Ship className="text-blue-400" size={14} />
                    <span className="text-xs font-bold text-gray-200">{voyage.vessel}</span>
                  </div>
                </div>

                {/* Content Section */}
                <div className="p-8 md:p-10 flex flex-col flex-grow">
                  <div className="flex justify-between items-start mb-4 gap-4">
                    <div>
                      <h3 className="text-3xl font-black text-white group-hover:text-blue-400 transition-colors leading-none tracking-tight mb-2">
                        {voyage.title}
                      </h3>
                      <p className="text-sm font-semibold text-gray-400">{voyage.subtitle}</p>
                    </div>

                    <div className="flex items-center gap-1 bg-white/5 border border-white/10 px-3 py-1.5 rounded-xl shrink-0">
                      <Star className="fill-amber-400 text-amber-400" size={14} />
                      <span className="font-bold text-xs text-white">{voyage.rating}</span>
                    </div>
                  </div>

                  <p className="text-gray-400 text-[14px] leading-relaxed mb-6 flex-grow">
                    {voyage.description}
                  </p>

                  {/* Quick Specs Grid */}
                  <div className="grid grid-cols-2 gap-4 py-5 border-y border-white/5 mb-6 text-xs text-gray-400">
                    <div className="flex items-center gap-2">
                      <Clock size={16} className="text-blue-400" />
                      <span>{voyage.duration} Itinerary</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin size={16} className="text-blue-400" />
                      <span className="line-clamp-1">Depart: {voyage.embarkation}</span>
                    </div>
                    <div className="flex items-center gap-2 col-span-2">
                      <Users size={16} className="text-blue-400" />
                      <span>Capacity: Limited to {voyage.maxGuests} guests maximum</span>
                    </div>
                  </div>

                  {/* Highlight checklist */}
                  <div className="mb-8 space-y-2">
                    <p className="text-[10px] font-black uppercase tracking-widest text-blue-300 font-mono">Inclusions Suite:</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs text-gray-300">
                      {voyage.inclusions.map((inc, i) => (
                        <div key={i} className="flex items-center gap-2">
                          <Check className="text-emerald-400 shrink-0" size={14} />
                          <span>{inc}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Bottom Action */}
                  <div className="flex items-center justify-between mt-auto pt-4">
                    <div>
                      <p className="text-[9px] font-bold uppercase tracking-widest text-gray-500">Voyage Fare From</p>
                      <p className="text-3xl font-black text-white leading-none">
                        {formatPrice(voyage.priceUSD)}
                        <span className="text-[10px] font-normal text-gray-400 ml-1">/ guest</span>
                      </p>
                    </div>

                    {voyage.id === "polar-expedition" ? (
                      <Link
                        href="/cruises/polar"
                        className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-6 py-4 rounded-2xl font-black uppercase tracking-widest text-[10px] shadow-lg shadow-blue-600/20 group-hover:translate-x-1 transition-all"
                      >
                        Explore Voyage
                        <ArrowRight size={14} />
                      </Link>
                    ) : (
                      <button
                        onClick={() => handleOpenVoyage(voyage)}
                        className="inline-flex items-center gap-2 bg-slate-800 hover:bg-blue-600 hover:text-white text-blue-400 px-6 py-4 rounded-2xl font-black uppercase tracking-widest text-[10px] transition-all cursor-pointer"
                      >
                        Request Charter
                        <ChevronRight size={14} />
                      </button>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* TRUST AND BRAND PILLAR */}
        <section className="mt-28 bg-gradient-to-br from-slate-900/50 to-slate-950/80 border border-white/5 rounded-[3rem] p-12 md:p-20 text-center relative">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-[1px] bg-gradient-to-r from-transparent via-blue-500/50 to-transparent" />
          <div className="max-w-3xl mx-auto space-y-8">
            <Compass className="text-blue-500 mx-auto animate-[spin_40s_linear_infinite]" size={48} />
            <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tight">The Yacht & Expedition Club</h2>
            <p className="text-gray-400 text-lg leading-relaxed">
              Every maritime voyage is coordinated by Wander Luxe marine officers. Our private charter catalog provides guests with premium access to isolated harbor permissions, helicopter landings, deep-ocean submersibles, and state-of-the-art glaciologist lectures.
            </p>
            <div className="flex flex-wrap justify-center gap-8 pt-4">
              {[
                { icon: <ShieldCheck size={18} />, label: "Full Maritime Licensing" },
                { icon: <Sparkles size={18} />, label: "Michelin Gastronomy Onboard" },
                { icon: <Waves size={18} />, label: "PC6 Reinforced Safety" }
              ].map((pill, i) => (
                <div key={i} className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/5 border border-white/10 text-xs font-semibold text-blue-200">
                  {pill.icon}
                  <span>{pill.label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>

      {/* RICH INTERACTIVE INQUIRY MODAL */}
      <AnimatePresence>
        {selectedVoyage && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/80 backdrop-blur-md" 
              onClick={() => setSelectedVoyage(null)} 
            />
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 30 }}
              className="bg-slate-950 border border-white/10 rounded-[2.5rem] max-w-4xl w-full overflow-hidden shadow-2xl z-10 flex flex-col md:flex-row relative"
            >
              {/* Left Column: Cover image & info */}
              <div className="md:w-5/12 relative min-h-[250px] md:min-h-full bg-slate-900">
                <Image
                  src={selectedVoyage.image}
                  alt={selectedVoyage.title}
                  fill
                  className="object-cover brightness-[0.7]"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
                
                {/* Text overlay on image */}
                <div className="absolute bottom-8 left-8 right-8 z-10 space-y-4">
                  <span className="bg-blue-600/90 text-white text-[9px] font-black uppercase tracking-widest px-3 py-1 rounded-md">
                    {selectedVoyage.vessel}
                  </span>
                  <h3 className="text-3xl font-black text-white leading-tight">{selectedVoyage.title}</h3>
                  <p className="text-xs text-gray-300 line-clamp-3 leading-relaxed">{selectedVoyage.description}</p>
                  
                  {/* Mini Highlights */}
                  <div className="pt-4 border-t border-white/10 space-y-2">
                    <span className="text-[10px] font-bold text-blue-400 uppercase tracking-widest font-mono">Itinerary:</span>
                    <p className="text-xs font-semibold text-gray-200">{selectedVoyage.itinerarySummary}</p>
                  </div>
                </div>

                <button 
                  onClick={() => setSelectedVoyage(null)}
                  className="absolute top-6 left-6 z-20 bg-black/60 hover:bg-black/90 border border-white/10 hover:border-white/25 text-white p-3 rounded-xl transition-all"
                >
                  <X size={16} />
                </button>
              </div>

              {/* Right Column: Dynamic Booking Form / Itinerary */}
              <div className="md:w-7/12 p-8 md:p-12 max-h-[85vh] overflow-y-auto">
                {bookingSuccess ? (
                  <div className="text-center py-16 space-y-6">
                    <div className="w-20 h-20 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto shadow-xl">
                      <Check size={36} />
                    </div>
                    <div className="space-y-2">
                      <h4 className="text-3xl font-black uppercase tracking-tight">Charter Dispatch Initiated</h4>
                      <p className="text-sm text-gray-400 max-w-sm mx-auto leading-relaxed">
                        Your luxury charter manifest has been logged under encryption. Our Marine Liaison Officer will call you within 2 hours to confirm docking clearances.
                      </p>
                    </div>
                    <button
                      onClick={() => setSelectedVoyage(null)}
                      className="bg-blue-600 hover:bg-blue-500 text-white text-xs font-black uppercase tracking-widest px-8 py-4 rounded-xl transition-all"
                    >
                      Close Expedition Suite
                    </button>
                  </div>
                ) : (
                  <div className="space-y-8">
                    <div>
                      <span className="text-[10px] font-black uppercase tracking-[0.25em] text-blue-400">MEMBERSHIP PRIVILEGE</span>
                      <h4 className="text-3xl font-black uppercase tracking-tight mt-1">Expedition Charter Desk</h4>
                      <p className="text-xs text-gray-400 leading-relaxed mt-2">
                        Submit your private charter request. High-tier members receive priority boarding clearances and customized landing paths.
                      </p>
                    </div>

                    {/* Day-by-Day Itinerary Sneak Peak */}
                    <div className="space-y-3 bg-white/5 border border-white/5 p-5 rounded-2xl">
                      <p className="text-[10px] font-black uppercase tracking-widest text-blue-400 flex items-center gap-1">
                        <Info size={12} /> Day-by-Day Itinerary Preview
                      </p>
                      <div className="space-y-2.5 max-h-36 overflow-y-auto scrollbar-thin text-xs text-gray-300 pr-2">
                        {selectedVoyage.days.map((day, i) => (
                          <div key={i} className="border-b border-white/5 pb-2 last:border-0 last:pb-0">
                            <span className="font-extrabold text-blue-300 block mb-0.5">{day.title}</span>
                            <p className="text-gray-400 leading-relaxed">{day.desc}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    <form onSubmit={handleInquirySubmit} className="space-y-5">
                      <div className="space-y-1.5">
                        <label className="text-xs font-extrabold text-gray-400 uppercase tracking-widest">Select Departure Window</label>
                        <input
                          type="date"
                          required
                          value={date}
                          onChange={(e) => setDate(e.target.value)}
                          className="w-full text-sm p-4 bg-white/5 border border-white/10 rounded-xl focus:border-blue-500 outline-none focus:bg-white/10 transition-all text-white"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                          <label className="text-xs font-extrabold text-gray-400 uppercase tracking-widest">Cabin Category</label>
                          <select
                            value={cabinClass}
                            onChange={(e) => setCabinClass(e.target.value)}
                            className="w-full text-sm p-4 bg-slate-900 border border-white/10 rounded-xl focus:border-blue-500 outline-none focus:bg-white/10 transition-all text-white"
                          >
                            <option value="standard">Horizon Suite - Base Fare</option>
                            <option value="master">Grand Veranda Master (+ $4,500)</option>
                            <option value="royal">Owner's Penthouse Suite (+ $12,000)</option>
                          </select>
                        </div>

                        <div className="space-y-1.5">
                          <label className="text-xs font-extrabold text-gray-400 uppercase tracking-widest">Guests Count</label>
                          <input
                            type="number"
                            min="1"
                            max="8"
                            required
                            value={guests}
                            onChange={(e) => setGuests(Number(e.target.value))}
                            className="w-full text-sm p-4 bg-white/5 border border-white/10 rounded-xl focus:border-blue-500 outline-none focus:bg-white/10 transition-all text-white font-mono"
                          />
                        </div>
                      </div>

                      <div className="pt-2">
                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className="w-full py-5 bg-blue-600 hover:bg-blue-500 disabled:bg-blue-800 text-white font-black uppercase tracking-widest text-xs rounded-2xl transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-blue-600/20"
                        >
                          {isSubmitting ? (
                            <>
                              <Loader2 className="w-4 h-4 animate-spin" />
                              <span>Registering Charter Profile...</span>
                            </>
                          ) : (
                            <>
                              <span>Log Secure Charter Request</span>
                              <ArrowRight size={14} />
                            </>
                          )}
                        </button>
                      </div>
                    </form>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </main>
  );
}
