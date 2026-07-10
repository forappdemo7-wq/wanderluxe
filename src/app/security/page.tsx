"use client";

import { Cpu, Globe, ShieldCheck, Zap } from 'lucide-react';

export default function SecurityPage() {
  return (
    <main className="bg-[#050505] text-white min-h-screen pt-40 pb-24 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-24">
          <div>
            <h4 className="text-blue-500 font-black uppercase tracking-[0.4em] text-[10px] mb-4">Advanced Protocol</h4>
            <h1 className="text-7xl font-black uppercase tracking-tighter leading-none mb-8">
              Iron-Clad <br />Security
            </h1>
            <p className="text-gray-400 text-xl font-medium leading-relaxed">
              We employ the same security standards used by global financial institutions to protect your travel data.
            </p>
          </div>
          <div className="relative h-[400px] bg-blue-600/5 rounded-[3rem] border border-white/5 flex items-center justify-center">
            <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/10 to-transparent"></div>
            <ShieldCheck size={160} className="text-blue-500 drop-shadow-[0_0_50px_rgba(59,130,246,0.5)]" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-10 bg-white/5 border border-white/10 rounded-[2.5rem]">
            <Cpu className="text-blue-500 mb-6" size={32} />
            <h3 className="text-xl font-bold uppercase tracking-tight mb-4">Neural Encryption</h3>
            <p className="text-gray-400 leading-relaxed font-medium">Your data is fractured and encrypted across multiple secure nodes, ensuring zero single-point-of-failure vulnerability.</p>
          </div>
          <div className="p-10 bg-white/5 border border-white/10 rounded-[2.5rem]">
            <Globe className="text-blue-500 mb-6" size={32} />
            <h3 className="text-xl font-bold uppercase tracking-tight mb-4">Global Sentinel</h3>
            <p className="text-gray-400 leading-relaxed font-medium">24/7 monitoring from our security operations centers in Dubai, Tokyo, and London.</p>
          </div>
        </div>
      </div>
    </main>
  );
}