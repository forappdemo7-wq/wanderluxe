"use client";

import { Shield, Eye, Lock, Database, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-[#050505] text-white pt-40 pb-24 px-6 relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/10 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-900/10 blur-[120px] rounded-full translate-y-1/2 -translate-x-1/2"></div>

      <div className="max-w-5xl mx-auto relative z-10">
        <Link href="/" className="inline-flex items-center gap-2 text-gray-500 hover:text-blue-400 transition-colors mb-12 uppercase text-[10px] font-black tracking-[0.3em]">
          <ArrowLeft size={14} /> Back to Haven
        </Link>

        <header className="mb-20">
          <h1 className="text-7xl md:text-8xl font-black uppercase tracking-tighter leading-none mb-6">
            Privacy <br /><span className="text-blue-500">Policy</span>
          </h1>
          <p className="text-gray-500 font-bold uppercase tracking-[0.5em] text-xs">Security Protocol v3.0 // 2026</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {[
            { icon: Shield, title: "Protected", desc: "Military-grade 256-bit encryption" },
            { icon: Eye, title: "Private", desc: "Zero third-party data selling" },
            { icon: Lock, title: "Secure", desc: "Biometric authentication ready" }
          ].map((item, i) => (
            <div key={i} className="bg-white/5 border border-white/10 p-8 rounded-[2.5rem] backdrop-blur-xl">
              <item.icon className="text-blue-500 mb-4" size={28} />
              <h4 className="font-black uppercase tracking-widest text-xs mb-2">{item.title}</h4>
              <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>

        <div className="space-y-24">
          <section className="relative pl-12 border-l border-white/10">
            <span className="absolute left-0 top-0 -translate-x-1/2 w-4 h-4 bg-blue-600 rounded-full shadow-[0_0_20px_rgba(37,99,235,0.8)]"></span>
            <h3 className="text-2xl font-bold mb-6 uppercase tracking-tight">01. Information Acquisition</h3>
            <div className="prose prose-invert max-w-none text-gray-400 space-y-4 font-medium">
              <p>Wanderluxe collects only essential telemetry required for elite travel curation, including passport metadata and secure payment tokens.</p>
              <ul className="list-none space-y-2 p-0">
                <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div> Personal Identification & Travel Documents</li>
                <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div> Encrypted Transactional History</li>
              </ul>
            </div>
          </section>

          <section className="relative pl-12 border-l border-white/10">
            <span className="absolute left-0 top-0 -translate-x-1/2 w-4 h-4 bg-white/20 rounded-full"></span>
            <h3 className="text-2xl font-bold mb-6 uppercase tracking-tight">02. Data Sovereignty</h3>
            <p className="text-gray-400 leading-relaxed font-medium">
              Your digital footprint remains your property. Wanderluxe acts as a temporary custodian for the sole purpose of booking global itineraries and heritage stays.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}