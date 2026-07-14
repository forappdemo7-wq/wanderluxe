"use client";

import { Sparkles, Wind, Heart, Shield, Sun, Moon, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export default function WellnessPage() {
  const programs = [
    {
      title: "Alpine Biohacking Sanctuary",
      location: "Swiss Alps",
      duration: "5 Nights",
      description:
        "Precision‑driven recovery stays with cryotherapy, red‑light beds, IV nutrient infusions, and oxygen cabins.",
      icon: <Shield className="text-blue-400" size={28} />
    },
    {
      title: "Kyoto Silent Forest Retreat",
      location: "Kyoto, Japan",
      duration: "7 Nights",
      description:
        "Meditative walks through bamboo forests, tea ceremonies, and guided zazen practice to reset the nervous system.",
      icon: <Heart className="text-emerald-400" size={28} />
    },
    {
      title: "Thermal Onsen Resilience",
      location: "Hakone, Japan",
      duration: "3 Nights",
      description:
        "Warm volcanic baths, post‑treatment floats, and stretching circles to reduce inflammation and restore joint mobility.",
      icon: <Sun className="text-amber-400" size={28} />
    },
    {
      title: "Lunar Sleep Sanctuary",
      location: "Patagonia, Chile",
      duration: "4 Nights",
      description:
        "Dark‑sky environments, no‑blue‑light protocols, and somatic sleep coaches to recalibrate deep‑sleep architecture.",
      icon: <Moon className="text-violet-400" size={28} />
    }
  ];

  const features = [
    {
      title: "Precision Data",
      desc: "Wearables, blood panels, and genetics‑informed protocols woven into your stay."
    },
    {
      title: "Privacy First",
      desc: "Private villas, separate time slots, and discreet transfers for ultra‑discreet guests."
    },
    {
      title: "After‑Care Pathways",
      desc: "Post‑retreat plans, home‑kit suggestions, and quarterly check‑ins to lock in gains."
    }
  ];

  return (
    <main className="bg-[#050505] text-white min-h-screen pt-40 pb-32 px-6 relative overflow-hidden">
      
      {/* Ambient Background Blur */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-600/5 blur-[160px] rounded-full" />
      
      {/* Top Gradient Stripe */}
      <div className="absolute top-0 left-0 w-full h-20 bg-gradient-to-b from-blue-600/10 via-transparent to-transparent pointer-events-none" />

      {/* Main Content Container */}
      <div className="max-w-4xl mx-auto relative z-10">

        {/* Hero Badge + Icon */}
        <div className="flex items-center justify-center gap-3 mb-6">
          <Sparkles className="text-blue-500" size={32} />
          <span className="text-blue-400 text-[10px] font-black uppercase tracking-[0.3em]">
            ZENITH WELLNESS
          </span>
        </div>

        {/* Hero Title */}
        <h1 className="text-7xl md:text-8xl font-black uppercase tracking-tighter text-center mb-8">
          Edge <span className="text-blue-500 italic">Recovery</span>
        </h1>

        {/* Hero Quote Block */}
        <div className="space-y-8 mb-16 text-center max-w-2xl mx-auto">
          <p className="text-2xl text-gray-400 font-light italic leading-relaxed">
            &ldquo;Rejuvenation is the ultimate luxury&mdash;because it compounds in performance, clarity, and joy.&rdquo;
          </p>
          <div className="h-px w-24 bg-blue-600 mx-auto" />
          <p className="text-gray-500 text-lg leading-relaxed">
            From private bio‑hacking clinics in the Alps to silent forest retreats in Kyoto, 
            we curate holistic experiences that align body, mind, and spirit for long‑term resilience.
          </p>
        </div>

        {/* CTA Card */}

        <div className="relative bg-gradient-to-br from-white/10 to-black/80 backdrop-blur-3xl border border-white/10 rounded-[3rem] p-12 text-center group hover:translate-y-[-4px] hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-500 mb-20">
          <div className="flex items-center justify-center gap-3 mb-6">
            <Wind className="text-emerald-400" size={22} />
            <span className="text-gray-400 text-[10px] font-bold uppercase tracking-widest">
              FIND YOUR PROGRAM
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tight mb-6">
            Your Peak Season
            <br />
            <span className="text-blue-400 italic">Restoration</span>
          </h2>
          <div className="w-px h-8 bg-white/20 mx-auto mb-6" />
          <p className="text-gray-400 text-[15px] leading-relaxed max-w-md mx-auto mb-8">
            Whether you seek athletic recovery, burnout reset, or anti‑aging calibration, 
            our advisors match you to the exact program, season, and location.
          </p>
          <button className="group inline-flex items-center gap-3 px-8 py-4 border border-white/30 rounded-2xl font-black text-sm tracking-[0.08em] uppercase hover:bg-blue-600 hover:border-blue-500 hover:text-black transition-all">
            Book a Wellness Consult
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Programs Section */}
        <div className="mb-20">
          <div className="flex items-center gap-3 mb-12 justify-center">
            <Heart className="text-emerald-400" size={24} />
            <span className="text-blue-400 text-[10px] font-black uppercase tracking-[0.4em]">
              CURATED PROGRAMS
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {programs.map((prog, i) => (
              <div
                key={i}
                className="group relative bg-white/5 border border-white/10 rounded-2xl p-8 hover:border-blue-500/30 hover:-translate-y-2 transition-all duration-500"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent opacity-0 group-hover:opacity-20 transition-opacity" />
                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-6">
                    {prog.icon}
                    <span className="text-[10px] text-gray-500 font-bold uppercase tracking-[0.2em]">
                      {prog.location}
                    </span>
                  </div>
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-2xl font-bold uppercase mb-2">{prog.title}</h3>
                      <span className="text-gray-500 text-sm uppercase tracking-[0.1em]">
                        {prog.duration}
                      </span>
                    </div>
                  </div>
                  <p className="text-gray-400 text-[15px] leading-relaxed mt-4 mb-6">
                    {prog.description}
                  </p>
                  <button className="flex items-center gap-2 text-blue-400 text-[13px] font-semibold group-hover:underline">
                    Learn more
                    <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Philosophy Section */}
        <div className="space-y-10 mb-20">
          <div className="text-center">
            <div className="inline-flex items-center gap-3 text-[10px] text-blue-400 font-black uppercase tracking-[0.2em] mb-2">
              <Wind className="text-emerald-400" size={16} />
              Our Approach
            </div>
            <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tight">
              Science, Stillness, and <span className="text-blue-500">Soul</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {features.map((feat, i) => (
              <div
                key={i}
                className="p-8 rounded-2xl bg-white/5 border border-white/10 text-center hover:border-white/20 transition-all"
              >
                <Heart className="text-blue-500 mx-auto mb-4" size={24} />
                <h3 className="text-xl font-bold mb-3">{feat.title}</h3>
                <p className="text-gray-400 text-[14px] leading-relaxed">{feat.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Image Block (optional, placeholder src) */}
        <div className="relative rounded-3xl overflow-hidden border border-white/10 mb-16">
          <div className="absolute inset-0 bg-gradient-to-t from-[#050505] to-transparent" />
          <Image
            src="https://images.pexels.com/photos/34590805/pexels-photo-34590805.jpeg"
            alt="Kyoto forest wellness retreat"
            width={800}
            height={400}
            className="w-full object-cover"
          />
          <div className="absolute bottom-8 left-8 text-left max-w-sm">
            <p className="text-gray-300 text-[15px] leading-relaxed mb-2">
              A decade of Zen training and modern neuroscience woven into a single breath‑aware practice.
            </p>
            <span className="text-[10px] text-gray-500 uppercase tracking-widest">KYOTO · SILENT FOREST PROGRAM</span>
          </div>
        </div>

        {/* Simple Footer CTA */}
        <div className="text-center space-y-4">
          <p className="text-gray-500 text-sm">
            Ready to transform your recovery? We match your schedule, location, and intensity level.
          </p>
          <Link
            href="/contact"
            className="inline-block px-8 py-3 border border-blue-500/60 rounded-2xl text-sm font-bold text-white hover:bg-blue-500 hover:text-black transition-all"
          >
            Start Your Journey
          </Link>
        </div>
      </div>
    </main>
  );
}
