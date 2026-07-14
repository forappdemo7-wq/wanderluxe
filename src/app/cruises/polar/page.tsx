"use client";

import React, { useState, useEffect } from "react";
import {
  Snowflake, MapPin, Star, Clock, Anchor,
  Loader2, Ship, Thermometer, Waves, ArrowLeft,
  ChevronRight, ShieldCheck, Compass, Info, Check, Eye, HelpCircle
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { useCurrency } from "@/context/CurrencyContext";

interface Highlight {
  icon: React.ReactNode;
  title: string;
  desc: string;
}

const highlights: Highlight[] = [
  {
    icon: <Ship size={36} />,
    title: "Ice-Class Navigation",
    desc: "Reinforced PC6 polar hull and dual-axis ice radar for safe, silent passage through dramatic glacial channels."
  },
  {
    icon: <Compass size={36} />,
    title: "Elite Expedition Fleet",
    desc: "Equipped with state-of-the-art Zodiac landing crafts, carbon ocean kayaks, and a deep-sea research submarine."
  },
  {
    icon: <Star size={36} />,
    title: "Intimate Guest Ratio",
    desc: "Limited to just 120 guests onboard, ensuring maximum shore landing time and highly personal naturalist briefings."
  }
];

const inclusions = [
  "All-inclusive fine dining & sommelier-paired reserve wines",
  "Expert naturalist and glaciologist-guided zodiac excursions",
  "Wander Luxe extreme-grade custom expedition parkas (provided & kept)",
  "Daily scientific lecture series and ice-cap water sampling",
  "Complimentary private zodiac kayak and stand-up paddle options"
];

interface CabinClass {
  id: string;
  name: string;
  size: string;
  priceUSD: number;
  image: string;
  description: string;
  perks: string[];
}

const cabinClasses: CabinClass[] = [
  {
    id: "explorer",
    name: "Explorer Veranda Suite",
    size: "380 sq ft",
    priceUSD: 8500,
    image: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=800&q=80",
    description: "Features a private teak walk-out balcony, heated bathroom floors, an integrated writing desk, and a complimentary premium minibar restocked daily.",
    perks: ["Private Teak Balcony", "Heated Bathroom Floors", "Daily Replenished Premium Minibar"]
  },
  {
    id: "horizon",
    name: "Grand Horizon Penthouse",
    size: "650 sq ft",
    priceUSD: 14200,
    image: "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=800&q=80",
    description: "Boasts a spacious living area, master walk-in wardrobe, dedicated personal butler service, in-suite premium caviar service, and priority zodiac embarkation.",
    perks: ["Bespoke Butler Service", "Private Caviar & Champagne Reserve", "Priority Zodiac Boarding"]
  },
  {
    id: "presidential",
    name: "Owner's Presidential Suite",
    size: "1,120 sq ft",
    priceUSD: 27500,
    image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80",
    description: "The peak of maritime luxury. Offers a 180-degree wrap-around panoramic private deck with a wood-fire heated outdoor hot tub, unlimited complimentary spa treatments, and private heli-exploration priority.",
    perks: ["Wood-fired Private Deck Hot Tub", "Unlimited Therma-Spa Treatments", "Private Helicopter Flight Priority"]
  }
];

interface Wildlife {
  id: string;
  name: string;
  latin: string;
  bestTime: string;
  fact: string;
  image: string;
}

const wildlifeList: Wildlife[] = [
  {
    id: "gentoo",
    name: "Gentoo Penguin",
    latin: "Pygoscelis papua",
    bestTime: "Dec – Feb (Nesting Season)",
    fact: "Recognized by their bright orange-red bills and white head patches. Gentoos are the fastest swimming birds, reaching speeds of up to 36 km/h.",
    image: "https://images.unsplash.com/photo-1517783999520-f068d7431a60?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "orca",
    name: "Killer Whale / Orca",
    latin: "Orcinus orca",
    bestTime: "Jan – Mar (Feeding Peak)",
    fact: "Antarctic Type A and B Orcas use highly coordinated wave-washing techniques to hunt cooperatively off ice floes. Spot them directly from the ship's bow.",
    image: "https://images.unsplash.com/photo-1554160454-7389a3a9366e?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "leopard",
    name: "Leopard Seal",
    latin: "Hydrurga leptonyx",
    bestTime: "Nov – Mar (All season)",
    fact: "The apex seal of the Southern Ocean. Known for their distinct spotted coat and serpentine neck, they are solitary hunters near glacier edges.",
    image: "https://images.unsplash.com/photo-1601979031925-424e5a2ce37e?auto=format&fit=crop&w=600&q=80"
  }
];

interface ItineraryDay {
  day: string;
  title: string;
  subtitle: string;
  description: string;
  highlights: string[];
}

const itinerary: ItineraryDay[] = [
  {
    day: "Day 1",
    title: "Embarkation in Ushuaia",
    subtitle: "The Southernmost Gateway",
    description: "Board the MV Magellan Explorer in Ushuaia, Argentina. Settle into your luxurious suite, meet the seasoned expedition guides, and sail through the majestic Beagle Channel at sunset.",
    highlights: ["Sunset cruise past Beagle Channel", "Captain's welcome gala dinner", "Safety & Zodiac boarding briefings"]
  },
  {
    day: "Day 2–3",
    title: "Navigating Drake Passage",
    subtitle: "Gateway to the Frozen Continent",
    description: "Cross the legendary Drake Passage, where the Atlantic, Pacific, and Indian Oceans merge. Enjoy glaciology and marine biology lectures while keeping a lookout for giant albatrosses and humpback whales.",
    highlights: ["Interactive marine life spotting decks", "Polar glaciology lectures", "Vessel navigation deck tours"]
  },
  {
    day: "Day 4–8",
    title: "Antarctic Peninsula & Islands",
    subtitle: "Untouched Ice Wilderness",
    description: "Experience the jaw-dropping Antarctic Peninsula. Embark on twice-daily Zodiac landings to walk with nesting penguin colonies, kayak through deep blue ice fjords, and sample glacial waters.",
    highlights: ["Up-close gentoo penguin walks", "Zodiac ice-fjord glacier cruises", "Optional Polar Plunge challenge"]
  },
  {
    day: "Day 9–10",
    title: "The Weddell Sea Ice Fields",
    subtitle: "Land of Tabular Icebergs",
    description: "Sail into the Weddell Sea, famous for giant tabular icebergs and historic polar stories. Search for weddell seals sunbathing on floating sea ice and visit working research stations.",
    highlights: ["Towering 200ft tabular iceberg spotting", "Weddell seal zodiac photography", "Historic polar exploration stories"]
  },
  {
    day: "Day 11–12",
    title: "Drake Return & Ushuaia",
    subtitle: "Final Expedition Logs",
    description: "Recross the Drake Passage. Share photos with onboard naturalists, complete final research projects, and disembark back in beautiful Ushuaia for your charter flight back.",
    highlights: ["Expedition photo sharing gala", "Final scientific log reports", "Private charter airport transfer"]
  }
];

export default function PolarCruisePage() {
  const { formatPrice } = useCurrency();
  const [mounted, setMounted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(false);
  
  // Interactive Accordions
  const [activeDay, setActiveDay] = useState<string>("Day 1");
  
  // Interactive Suite Selection
  const [selectedCabin, setSelectedCabin] = useState<string>("explorer");
  const activeCabinData = cabinClasses.find(c => c.id === selectedCabin) || cabinClasses[0];

  // Wildlife Spotter Popover
  const [selectedWildlife, setSelectedWildlife] = useState<Wildlife | null>(null);

  // Form Fields
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [departureDate, setDepartureDate] = useState("2026-12-14");

  const { scrollYProgress } = useScroll();
  const yParallax = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.35], [1, 0]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setMounted(true);
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate booking transmission
    setTimeout(() => {
      setIsSubmitting(false);
      setBookingSuccess(true);
    }, 1500);
  };

  if (!mounted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#020617]">
        <Loader2 className="w-8 h-8 animate-spin text-cyan-400" />
      </div>
    );
  }

  return (
    <main className="bg-[#020617] text-white min-h-screen overflow-x-hidden relative">
      {/* Ambient Ice Glow */}
      <div className="absolute top-0 inset-x-0 h-[100vh] bg-gradient-to-b from-cyan-400/10 via-transparent to-transparent pointer-events-none z-0" />

      {/* Floating Back Button */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.3 }}
        className="fixed top-28 left-6 z-40 hidden md:block"
      >
        <Link
          href="/cruises"
          className="flex items-center gap-3 px-6 py-3.5 rounded-2xl bg-slate-950/80 backdrop-blur-xl border border-white/10 hover:border-cyan-400/50 hover:bg-black/90 transition-all group"
        >
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          <span className="font-semibold text-xs uppercase tracking-widest text-cyan-200">Back to Voyages</span>
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
            alt="Antarctic polar expedition ship navigating massive tabular icebergs"
            fill
            priority
            className="object-cover brightness-[0.6] scale-105"
            sizes="100vw"
            quality={92}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-[#020617]/40 to-[#020617]" />
        </motion.div>

        <motion.div
          style={{ opacity: heroOpacity }}
          className="relative z-10 text-center px-6 max-w-5xl"
        >
          <div className="inline-flex items-center gap-3 px-6 py-2.5 rounded-full border border-cyan-400/20 bg-cyan-500/10 backdrop-blur-md mb-8">
            <Snowflake className="text-cyan-300 animate-[spin_15s_linear_infinite]" size={18} />
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-cyan-200">POLAR DISCOVERY ESCAPE</span>
          </div>

          <h1 className="text-5xl md:text-7xl lg:text-[6.5rem] font-black tracking-tighter leading-[0.95] mb-6">
            ANTARCTIC<br />
            <span className="bg-gradient-to-r from-cyan-200 via-white to-blue-400 bg-clip-text text-transparent">
              EXPEDITION
            </span>
          </h1>

          <p className="text-lg md:text-xl text-cyan-100/70 max-w-2xl mx-auto leading-relaxed mb-12">
            12 days of absolute silence, towering tabular icebergs, and incredible wildlife encounters aboard the world&apos;s most sophisticated luxury ice-class vessel.
          </p>

          {/* Captain Statistics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-3xl mx-auto border-t border-white/10 pt-8 mt-8">
            {[
              { value: "12 Days", label: "EXPEDITION" },
              { value: "PC6 Hull", label: "ICE STRENGTH" },
              { value: "120 Max", label: "ELITE MANIFEST" },
              { value: "−15°C Avg", label: "POLAR CLIMATE" }
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <p className="text-2xl font-black text-cyan-200 font-mono tracking-tight">{stat.value}</p>
                <p className="text-[9px] font-bold uppercase tracking-widest text-gray-500 mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Scroll Prompt */}
        <motion.div 
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 3, repeat: Infinity }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-cyan-400/40 text-[9px] font-bold tracking-[0.3em] uppercase flex flex-col items-center gap-2 pointer-events-none"
        >
          <span>Scroll to Discover</span>
          <Waves size={14} className="animate-pulse" />
        </motion.div>
      </section>

      {/* CORE HIGHLIGHTS */}
      <section className="max-w-7xl mx-auto px-6 py-24 border-b border-white/5 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-20">
          <p className="text-cyan-400 text-xs font-black uppercase tracking-widest mb-3">THE EXPERIENCE</p>
          <h2 className="text-4xl md:text-5xl font-black tracking-tight uppercase leading-none">Designed for Elite Pioneers</h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {highlights.map((highlight, i) => (
            <div
              key={i}
              className="group p-10 bg-slate-900/40 border border-white/5 rounded-[2rem] hover:border-cyan-400/30 transition-all duration-500 hover:-translate-y-2"
            >
              <div className="mb-8 text-cyan-400 group-hover:scale-110 transition-transform duration-500">
                {highlight.icon}
              </div>
              <h3 className="text-2xl font-bold mb-4 tracking-tight">{highlight.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{highlight.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* INTERACTIVE DAY-BY-DAY ITINERARY */}
      <section className="max-w-7xl mx-auto px-6 py-28 relative z-10">
        <div className="grid lg:grid-cols-12 gap-16 items-start">
          
          {/* Left Panel: Accordion Selector */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <span className="text-cyan-400 text-xs font-black uppercase tracking-widest block mb-2">NAVIGATE PATHS</span>
              <h2 className="text-4xl md:text-5xl font-black tracking-tight leading-none uppercase">Day-By-Day Logbook</h2>
              <p className="text-gray-400 text-sm leading-relaxed mt-4">
                Click each day slot to examine the planned coordinates, specialized activities, and zodiac landing briefs.
              </p>
            </div>

            <div className="space-y-3.5 pt-6">
              {itinerary.map((it) => (
                <button
                  key={it.day}
                  onClick={() => setActiveDay(it.day)}
                  className={`w-full text-left p-6 rounded-2xl border transition-all flex items-center justify-between cursor-pointer ${
                    activeDay === it.day 
                      ? "bg-slate-900 border-cyan-400/40 shadow-lg shadow-cyan-400/5" 
                      : "bg-slate-950/40 border-white/5 hover:border-white/15"
                  }`}
                >
                  <div>
                    <span className={`text-[10px] font-black tracking-widest uppercase block ${
                      activeDay === it.day ? "text-cyan-400" : "text-gray-500"
                    }`}>
                      {it.day}
                    </span>
                    <span className="text-lg font-bold text-white block mt-1">{it.title}</span>
                  </div>
                  <ChevronRight size={18} className={`transition-transform duration-350 ${
                    activeDay === it.day ? "text-cyan-400 translate-x-1 rotate-90" : "text-gray-600"
                  }`} />
                </button>
              ))}
            </div>
          </div>

          {/* Right Panel: Selected Day Details Card */}
          <div className="lg:col-span-7 h-full">
            <AnimatePresence mode="wait">
              {itinerary.map((it) => {
                if (it.day !== activeDay) return null;
                return (
                  <motion.div
                    key={it.day}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.35 }}
                    className="bg-gradient-to-br from-slate-900/80 to-slate-950 border border-cyan-400/20 rounded-[2.5rem] p-10 md:p-14 backdrop-blur-xl h-full flex flex-col justify-between shadow-2xl relative"
                  >
                    <div className="absolute top-10 right-10 flex items-center gap-2 px-4 py-2 bg-cyan-500/10 border border-cyan-500/20 rounded-full text-[10px] font-black text-cyan-200 uppercase tracking-widest font-mono">
                      ⚓ ACTIVE EXPEDITION ZONE
                    </div>

                    <div className="space-y-8">
                      <div>
                        <span className="text-[11px] font-black tracking-widest text-cyan-400 uppercase font-mono">{it.day} Briefing</span>
                        <h3 className="text-3xl md:text-4xl font-black text-white uppercase tracking-tight mt-1 leading-none">{it.title}</h3>
                        <p className="text-sm font-semibold text-gray-400 mt-2 italic">{it.subtitle}</p>
                      </div>

                      <p className="text-gray-300 text-base leading-relaxed">{it.description}</p>

                      <div className="space-y-4 pt-6 border-t border-white/5">
                        <span className="text-[10px] font-black uppercase tracking-widest text-cyan-400 font-mono">Zodiac & Shore Operations:</span>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {it.highlights.map((hl, i) => (
                            <div key={i} className="flex items-start gap-2.5 text-xs text-gray-300">
                              <Check className="text-cyan-400 mt-0.5 shrink-0" size={14} />
                              <span>{hl}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* WILD ANIMALS SPOTTER SECTION */}
      <section className="bg-slate-950/60 border-y border-white/5 py-24 relative z-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-xl mx-auto mb-16">
            <p className="text-cyan-400 text-xs font-black uppercase tracking-widest mb-3">WILDLIFE JOURNAL</p>
            <h2 className="text-3xl md:text-5xl font-black tracking-tight uppercase">Polar Species Spotter</h2>
            <p className="text-gray-400 text-sm leading-relaxed mt-4">
              Our naturalists assist guests in spotting rare marine life. Click each animal card to read native behaviors and migration stats.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {wildlifeList.map((wl) => (
              <div
                key={wl.id}
                onClick={() => setSelectedWildlife(wl)}
                className="group bg-slate-900/40 border border-white/5 rounded-3xl overflow-hidden hover:border-cyan-400/40 hover:-translate-y-1.5 transition-all duration-500 cursor-pointer shadow-lg"
              >
                <div className="relative h-60 bg-slate-950">
                  <Image
                    src={wl.image}
                    alt={wl.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700 brightness-[0.9]"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent" />
                  <span className="absolute bottom-4 left-4 text-xs font-bold text-cyan-200 bg-slate-950/60 backdrop-blur-md px-3.5 py-1.5 rounded-xl border border-white/10 flex items-center gap-2">
                    <Eye size={12} /> Click to View facts
                  </span>
                </div>
                <div className="p-6">
                  <h4 className="text-2xl font-black text-white">{wl.name}</h4>
                  <p className="text-xs text-gray-500 font-medium italic mt-1">{wl.latin}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* INTERACTIVE SUITE SELECTION SHOWCASE */}
      <section className="max-w-7xl mx-auto px-6 py-28 relative z-10">
        <div className="text-center max-w-xl mx-auto mb-20">
          <p className="text-cyan-400 text-xs font-black uppercase tracking-widest mb-3">ONBOARD SUITES</p>
          <h2 className="text-4xl md:text-5xl font-black tracking-tight uppercase leading-none">Luxury Staterooms</h2>
          <p className="text-gray-400 text-sm leading-relaxed mt-4">
            Select your cabin class. Each stateroom represents the zenith of ocean accommodation, fully stabilized against arctic conditions.
          </p>
        </div>

        {/* Suite Tab Buttons */}
        <div className="flex justify-center mb-12">
          <div className="flex bg-slate-900/80 border border-white/5 p-1 rounded-2xl gap-1 overflow-x-auto max-w-full scrollbar-none">
            {cabinClasses.map((cab) => (
              <button
                key={cab.id}
                onClick={() => setSelectedCabin(cab.id)}
                className={`px-6 py-3 rounded-xl text-xs font-extrabold uppercase tracking-widest transition-all ${
                  selectedCabin === cab.id 
                    ? "bg-cyan-500 text-black font-black" 
                    : "text-gray-400 hover:text-white"
                }`}
              >
                {cab.name}
              </button>
            ))}
          </div>
        </div>

        {/* Dynamic Suite Detail Grid */}
        <div className="grid lg:grid-cols-2 gap-12 items-center bg-slate-900/20 border border-white/5 rounded-[2.5rem] p-8 md:p-14 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-cyan-500/5 rounded-full blur-[100px] pointer-events-none" />
          
          {/* Suite Image */}
          <div className="relative h-80 md:h-[400px] rounded-[1.5rem] overflow-hidden bg-slate-950">
            <Image
              src={activeCabinData.image}
              alt={activeCabinData.name}
              fill
              className="object-cover brightness-95"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            <div className="absolute bottom-6 left-6 z-10 bg-black/60 backdrop-blur-md px-4 py-2 rounded-xl text-xs font-extrabold text-cyan-200">
              📐 Size: {activeCabinData.size}
            </div>
          </div>

          {/* Suite Content */}
          <div className="space-y-6">
            <div>
              <span className="text-cyan-400 text-xs font-black uppercase tracking-widest font-mono">SELECTED CABIN CATEGORY</span>
              <h3 className="text-3xl md:text-4xl font-black text-white uppercase tracking-tight mt-1">{activeCabinData.name}</h3>
              <p className="text-gray-400 text-sm leading-relaxed mt-4">{activeCabinData.description}</p>
            </div>

            <div className="space-y-3 pt-6 border-t border-white/5">
              <p className="text-[10px] font-black uppercase tracking-widest text-cyan-400 font-mono">Exclusive Cabin Inclusions:</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs text-gray-300">
                {activeCabinData.perks.map((perk, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <Check className="text-emerald-400 shrink-0" size={14} />
                    <span>{perk}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-6 flex items-center justify-between gap-4">
              <div>
                <p className="text-[9px] font-bold uppercase tracking-widest text-gray-500">Suite Starting Rate</p>
                <p className="text-4xl font-black text-white leading-none">
                  {formatPrice(activeCabinData.priceUSD)}
                  <span className="text-xs font-normal text-gray-400 ml-1">/ guest</span>
                </p>
              </div>

              <button
                onClick={() => {
                  const el = document.getElementById("booking-anchor");
                  if (el) el.scrollIntoView({ behavior: "smooth" });
                }}
                className="bg-cyan-500 hover:bg-cyan-400 text-black font-black uppercase tracking-widest text-[10px] px-6 py-4 rounded-xl transition-all"
              >
                Book This Category
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* IMMERSIVE BOOKING CONDUIT */}
      <section id="booking-anchor" className="max-w-7xl mx-auto px-6 py-24 relative z-10 scroll-mt-24">
        <div className="grid lg:grid-cols-12 gap-16 items-center">
          
          {/* Left Block: Inclusions catalog */}
          <div className="lg:col-span-5 space-y-10">
            <div>
              <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter leading-none">
                SECURE POLAR<br />
                <span className="text-cyan-400">BOARDING PASS</span>
              </h2>
              <p className="text-gray-400 text-sm leading-relaxed mt-6">
                Departures are strictly limited to the Austral summer (November through March) to preserve polar eco-integrity. We welcome a maximum of 120 guest privileges per launch.
              </p>
            </div>

            <div className="space-y-6 pt-6 border-t border-white/5">
              {inclusions.map((item, i) => (
                <div key={i} className="flex items-start gap-3.5">
                  <ShieldCheck className="text-cyan-400 shrink-0 mt-0.5" size={20} />
                  <span className="text-gray-300 text-sm leading-relaxed">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Block: Fully Functional Cabin Booking Console */}
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="bg-slate-950/95 border border-cyan-400/20 rounded-[2.5rem] p-8 md:p-14 backdrop-blur-xl relative shadow-2xl"
            >
              <div className="absolute top-0 right-10 w-[200px] h-[200px] bg-cyan-400/5 rounded-full blur-[80px] pointer-events-none" />

              {bookingSuccess ? (
                <div className="text-center py-16 space-y-6 animate-in fade-in zoom-in duration-300">
                  <div className="w-20 h-20 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto shadow-xl">
                    <Check size={36} />
                  </div>
                  <div className="space-y-2">
                    <h4 className="text-3xl font-black uppercase tracking-tight">Expedition Charter Transmitted</h4>
                    <p className="text-sm text-gray-400 max-w-sm mx-auto leading-relaxed">
                      Your polar expedition passenger manifest has been registered. A Wander Luxe Polar Logistics Coordinator will call you shortly to configure cold-weather gear sizes and landing flights.
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      setBookingSuccess(false);
                      setFirstName("");
                      setLastName("");
                      setEmail("");
                    }}
                    className="bg-cyan-500 hover:bg-cyan-400 text-black text-[10px] font-black uppercase tracking-widest px-8 py-4 rounded-xl transition-all"
                  >
                    Configure Another Cabin
                  </button>
                </div>
              ) : (
                <div>
                  <div className="flex justify-between items-start mb-10 gap-4">
                    <div>
                      <span className="uppercase text-[9px] font-black tracking-widest text-cyan-400 block font-mono">SELECTED CABIN TIER RATE</span>
                      <h4 className="text-3xl font-black text-white mt-1 uppercase tracking-tight leading-none">{activeCabinData.name}</h4>
                      <p className="text-xs text-gray-500 mt-1 font-mono">Double occupancy • 12 Days inclusive</p>
                    </div>

                    <div className="text-right">
                      <span className="text-4xl font-black text-cyan-200 block font-mono">
                        {formatPrice(activeCabinData.priceUSD)}
                      </span>
                      <span className="text-[10px] text-gray-400 font-medium">/ guest base rate</span>
                    </div>
                  </div>

                  <form onSubmit={handleBookingSubmit} className="space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">First Name</label>
                        <input 
                          type="text" 
                          required
                          value={firstName}
                          onChange={(e) => setFirstName(e.target.value)}
                          placeholder="Elizabeth" 
                          className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-sm focus:border-cyan-400 focus:bg-white/10 outline-none transition-all placeholder:text-gray-600 text-white" 
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Last Name</label>
                        <input 
                          type="text" 
                          required
                          value={lastName}
                          onChange={(e) => setLastName(e.target.value)}
                          placeholder="Arlington" 
                          className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-sm focus:border-cyan-400 focus:bg-white/10 outline-none transition-all placeholder:text-gray-600 text-white" 
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Email Address</label>
                      <input 
                        type="email" 
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="elizabeth.arlington@worldluxe.com" 
                        className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-sm focus:border-cyan-400 focus:bg-white/10 outline-none transition-all placeholder:text-gray-600 text-white" 
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Departure Window</label>
                        <select
                          value={departureDate}
                          onChange={(e) => setDepartureDate(e.target.value)}
                          className="w-full bg-slate-900 border border-white/10 rounded-xl p-4 text-sm focus:border-cyan-400 outline-none transition-all text-white"
                        >
                          <option value="2026-12-14">Dec 14, 2026 - Solstice</option>
                          <option value="2027-01-08">Jan 08, 2027 - Midsummer</option>
                          <option value="2027-02-02">Feb 02, 2027 - Peak Humpbacks</option>
                        </select>
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Selected Suite Tier</label>
                        <select
                          value={selectedCabin}
                          onChange={(e) => setSelectedCabin(e.target.value)}
                          className="w-full bg-slate-900 border border-white/10 rounded-xl p-4 text-sm focus:border-cyan-400 outline-none transition-all text-white"
                        >
                          <option value="explorer">Explorer Veranda Suite</option>
                          <option value="horizon">Grand Horizon Penthouse</option>
                          <option value="presidential">Owner&apos;s Presidential Suite</option>
                        </select>
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-5 bg-cyan-500 hover:bg-cyan-400 disabled:bg-cyan-600 text-black font-black uppercase tracking-widest text-[11px] rounded-2xl transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xl shadow-cyan-500/10 group mt-4"
                    >
                      {isSubmitting ? (
                        <Loader2 className="w-4 h-4 animate-spin text-black" />
                      ) : (
                        <>
                          <span>Transmit Passenger Manifest Booking</span>
                          <ChevronRight className="group-hover:translate-x-1 transition-transform" size={16} />
                        </>
                      )}
                    </button>
                  </form>
                </div>
              )}

              <p className="text-center text-[10px] text-gray-500 mt-6 tracking-wider font-mono">
                ⚓ SECURED TRANSIT • FLEXIBLE DISPATCH POLICY • NO COMMISSION MARKUPS
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* POPUP INFORMATION FOR WILD SPECIES */}
      <AnimatePresence>
        {selectedWildlife && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/80 backdrop-blur-md" 
              onClick={() => setSelectedWildlife(null)} 
            />
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-slate-950 border border-cyan-400/20 rounded-[2rem] max-w-lg w-full overflow-hidden shadow-2xl z-10"
            >
              <div className="relative h-64 bg-slate-900">
                <Image
                  src={selectedWildlife.image}
                  alt={selectedWildlife.name}
                  fill
                  className="object-cover"
                  referrerPolicy="no-referrer"
                />
                <button 
                  onClick={() => setSelectedWildlife(null)}
                  className="absolute top-4 right-4 bg-black/60 hover:bg-black/90 text-white p-2.5 rounded-xl border border-white/10 transition-all"
                >
                  ✕
                </button>
              </div>

              <div className="p-8 space-y-6">
                <div>
                  <span className="text-[10px] font-black tracking-widest text-cyan-400 uppercase font-mono">WILDLIFE PROFILE</span>
                  <h4 className="text-3xl font-black text-white mt-1 leading-none">{selectedWildlife.name}</h4>
                  <p className="text-xs text-gray-500 italic mt-1">{selectedWildlife.latin}</p>
                </div>

                <div className="space-y-4 text-xs text-gray-300 leading-relaxed border-t border-white/5 pt-4">
                  <div>
                    <span className="font-extrabold text-cyan-200 block mb-1 uppercase tracking-wider text-[10px] font-mono">Natural Behaviors & Sightings:</span>
                    <p className="text-gray-400">{selectedWildlife.fact}</p>
                  </div>

                  <div>
                    <span className="font-extrabold text-cyan-200 block mb-1 uppercase tracking-wider text-[10px] font-mono">Best Observation window:</span>
                    <p className="text-gray-400 flex items-center gap-2">
                      <Clock size={12} className="text-cyan-400" />
                      {selectedWildlife.bestTime}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setSelectedWildlife(null)}
                  className="w-full py-4 bg-slate-900 hover:bg-cyan-500 hover:text-black text-cyan-300 font-extrabold uppercase tracking-widest text-[10px] rounded-xl transition-all"
                >
                  Return to Species Log
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </main>
  );
}
