"use client";

import { Diamond, Globe, Award, Users, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#050505] text-white pt-40 pb-24 px-6 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-600/5 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2"></div>

      <div className="max-w-6xl mx-auto relative z-10">
        <header className="mb-24">
          <h4 className="text-blue-500 font-black uppercase tracking-[0.4em] text-[10px] mb-6">Our Heritage</h4>
          <h1 className="text-7xl md:text-9xl font-black uppercase tracking-tighter leading-[0.85] mb-12">
            Defining <br /><span className="text-blue-500">The Elite</span> <br />Experience
          </h1>
          <p className="text-gray-400 text-xl md:text-2xl font-medium leading-relaxed max-w-3xl">
            Wanderluxe was born from a singular obsession: to curate journeys that don't just move you geographically, but transform you personally.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-32">
          <div className="bg-white/5 border border-white/10 p-12 rounded-[3.5rem] backdrop-blur-xl">
             <div className="flex gap-4 mb-8">
                <Globe className="text-blue-500" size={32} />
                <h3 className="text-2xl font-bold uppercase tracking-tight">Global Reach</h3>
             </div>
             <p className="text-gray-400 leading-relaxed text-lg">With local curators in over 40 countries, we provide access to locations that aren't on any map.</p>
          </div>
          <div className="bg-white/5 border border-white/10 p-12 rounded-[3.5rem] backdrop-blur-xl">
             <div className="flex gap-4 mb-8">
                <Diamond className="text-blue-500" size={32} />
                <h3 className="text-2xl font-bold uppercase tracking-tight">Pure Luxury</h3>
             </div>
             <p className="text-gray-400 leading-relaxed text-lg">From private aviation to heritage estates, every detail is vetted for absolute perfection.</p>
          </div>
        </div>
      </div>
    </main>
  );
}