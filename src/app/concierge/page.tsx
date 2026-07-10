"use client";

import { Bell, Shield, Map, Clock, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function ConciergePage() {
  return (
    <main className="min-h-screen bg-[#050505] text-white pt-40 pb-24 px-6 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/10 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2"></div>

      <div className="max-w-6xl mx-auto relative z-10">
        <header className="mb-20 text-center">
          <h4 className="text-blue-500 font-black uppercase tracking-[0.4em] text-[10px] mb-6">24/7 Elite Support</h4>
          <h1 className="text-7xl md:text-9xl font-black uppercase tracking-tighter leading-none mb-8">
            Private <br /><span className="text-blue-500">Concierge</span>
          </h1>
          <p className="text-gray-400 text-xl font-medium max-w-2xl mx-auto leading-relaxed">
            Your personal gateway to the impossible. We handle the logistics; you experience the journey.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {[
            { icon: Clock, title: "On-Demand", desc: "Instant response times, anywhere on Earth." },
            { icon: Shield, title: "Discrete", desc: "Absolute privacy for high-profile clients." },
            { icon: Map, title: "Localized", desc: "Fixers on the ground in every major city." },
            { icon: Bell, title: "Bespoke", desc: "Tailored requests, from dining to jets." }
          ].map((item, i) => (
            <div key={i} className="bg-white/5 border border-white/10 p-10 rounded-[3rem] backdrop-blur-xl hover:border-blue-500/50 transition-colors group">
              <item.icon className="text-blue-500 mb-6 group-hover:scale-110 transition-transform" size={32} />
              <h3 className="font-black uppercase tracking-widest text-xs mb-3">{item.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}