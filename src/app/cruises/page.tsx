"use client";

import { Anchor } from 'lucide-react';
import Link from 'next/link';

export default function CruisesPage() {
  return (
    <main className="bg-[#050505] text-white min-h-screen pt-40 pb-24 px-6">
      <div className="max-w-6xl mx-auto relative">
        
        {/* Header */}
        <div className="flex items-center gap-6 mb-16">
          <Anchor className="text-blue-500" size={40} />
          <h1 className="text-6xl font-black uppercase tracking-tighter">
            Ocean <span className="text-blue-500">Voyages</span>
          </h1>
        </div>

        {/* Polar Expedition Card */}
        <div className="bg-white/5 border border-white/10 p-12 md:p-20 rounded-[4rem] text-center relative group hover:border-blue-500/30 transition-all duration-500 hover:-translate-y-2">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent rounded-[4rem] opacity-0 group-hover:opacity-20 transition-opacity" />
          <div className="relative z-10">
            <h2 className="text-4xl font-bold uppercase mb-6 tracking-tight">
              The Polar Expedition
            </h2>
            <p className="text-gray-400 text-lg max-w-xl mx-auto mb-10 leading-relaxed">
              Arctִic and Antarctic journeys on ice‑class luxury yachts featuring onboard helicopters and submarines.
            </p>
            <button className="bg-blue-600 px-12 py-5 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-blue-500 hover:shadow-lg transition-all">
              View Itineraries
            </button>
          </div>
        </div>

        {/* Optional Sub‑section (you can remove if you want minimal) */}
        <div className="mt-20 text-center">
          <p className="text-gray-500 text-sm mb-2">
            12‑to‑22‑night expeditions departing from Ushuaia, Cape Town, and Reykjavík.
          </p>
          <Link
            href="/cruises/polar"
            className="text-blue-400 text-[13px] font-bold hover:underline"
          >
            Explore Departure Calendar →
          </Link>
        </div>
      </div>
    </main>
  );
}
