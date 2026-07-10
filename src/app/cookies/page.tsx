"use client";

import { Cookie, Eye, Settings, Zap, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function CookiesPage() {
  return (
    <main className="min-h-screen bg-[#050505] text-white pt-40 pb-24 px-6 relative overflow-hidden">
      {/* Blue Radial Glow */}
      <div className="absolute top-1/2 left-1/2 w-[600px] h-[600px] bg-blue-600/5 blur-[150px] rounded-full -translate-x-1/2 -translate-y-1/2"></div>

      <div className="max-w-5xl mx-auto relative z-10">
        <Link href="/" className="inline-flex items-center gap-2 text-gray-500 hover:text-blue-400 transition-colors mb-12 uppercase text-[10px] font-black tracking-[0.3em]">
          <ArrowLeft size={14} /> Back to Haven
        </Link>

        <header className="mb-20">
          <h1 className="text-7xl md:text-8xl font-black uppercase tracking-tighter leading-none mb-6">
            Cookie <br /><span className="text-blue-500">Strategy</span>
          </h1>
          <p className="text-gray-500 font-bold uppercase tracking-[0.5em] text-xs">Digital Telemetry // 2026</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
          {[
            { icon: Zap, title: "Essential", desc: "Core telemetry for secure checkout" },
            { icon: Eye, title: "Preferences", desc: "Remembering your destination tastes" },
            { icon: Settings, title: "Performance", desc: "Optimizing cinematic site speed" }
          ].map((item, i) => (
            <div key={i} className="bg-white/5 border border-white/10 p-8 rounded-[2.5rem] backdrop-blur-xl hover:bg-white/10 transition-all duration-500">
              <item.icon className="text-blue-500 mb-4" size={28} />
              <h4 className="font-black uppercase tracking-widest text-xs mb-2">{item.title}</h4>
              <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>

        <section className="bg-gradient-to-br from-white/5 to-transparent p-12 md:p-20 rounded-[4rem] border border-white/10 relative overflow-hidden group">
  {/* THE FIX: Smaller size (size={180}), lower opacity (opacity-5), and better positioning */}
  <div className="absolute bottom-6 right-6 opacity-5 group-hover:opacity-10 transition-opacity duration-700 pointer-events-none">
     <Cookie size={180} className="text-blue-500 -rotate-12" />
  </div>
  
  <div className="relative z-10 max-w-2xl">
    <h3 className="text-4xl md:text-5xl font-black mb-8 uppercase tracking-tighter italic">
      How we use <br /><span className="text-blue-500 text-6xl">Cookies</span>
    </h3>
    
    <p className="text-gray-400 text-lg font-medium leading-relaxed mb-10">
      Wanderluxe uses advanced identifiers to streamline your experience. These digital markers allow our platform to recognize your elite status and recall your preferred travel parameters instantly.
    </p>
    
    <button className="bg-blue-600 hover:bg-blue-500 text-white px-10 py-5 rounded-2xl font-black uppercase text-[11px] tracking-[0.3em] transition-all hover:scale-105 active:scale-95 shadow-[0_20px_50px_rgba(37,99,235,0.3)]">
      Manage Preferences
    </button>
  </div>
</section>
      </div>
    </main>
  );
}