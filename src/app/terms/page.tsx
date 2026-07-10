"use client";

import { Scale, Globe, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-[#050505] text-white pt-40 pb-24 px-6 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-blue-600/5 blur-[120px] rounded-full -translate-y-1/2 -translate-x-1/2"></div>

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Back Button */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-gray-500 hover:text-blue-400 transition-colors mb-12 uppercase text-[10px] font-black tracking-[0.3em]"
        >
          <ArrowLeft size={14} /> Back to Haven
        </Link>

        {/* Header */}
        <header className="mb-20">
          <h1 className="text-7xl md:text-8xl font-black uppercase tracking-tighter leading-none mb-6">
            Terms of <br />
            <span className="text-blue-500">Service</span>
          </h1>
          <p className="text-gray-500 font-bold uppercase tracking-[0.5em] text-xs">
            Contract Protocol // March 2026
          </p>
        </header>

        {/* Top Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-24">
          <div className="bg-white/5 border border-white/10 p-10 rounded-[3rem] backdrop-blur-xl">
            <Scale className="text-blue-500 mb-6" size={32} />
            <h3 className="text-xl font-bold uppercase tracking-tight mb-4">
              Membership
            </h3>
            <p className="text-gray-400 leading-relaxed">
              Access to Wanderluxe is a privilege reserved for verified members.
              You agree to maintain the highest standards of conduct during all
              curated experiences.
            </p>
          </div>

          <div className="bg-white/5 border border-white/10 p-10 rounded-[3rem] backdrop-blur-xl">
            <Globe className="text-blue-500 mb-6" size={32} />
            <h3 className="text-xl font-bold uppercase tracking-tight mb-4">
              Global Curators
            </h3>
            <p className="text-gray-400 leading-relaxed">
              We act as your elite intermediary. Travel fulfillment is provided
              by our hand-selected global partners under Wanderluxe supervision.
            </p>
          </div>
        </div>

        {/* Terms Sections */}
        <div className="space-y-16">
          {[
            {
              id: "01",
              title: "Reservation Integrity",
              desc: "Speculative or automated bookings are strictly prohibited. We reserve the right to revoke access for non-authentic patterns.",
            },
            {
              id: "02",
              title: "Liability & Force Majeure",
              desc: "Wanderluxe is not responsible for itinerary changes caused by global shifts, natural events, or aviation adjustments.",
            },
            {
              id: "03",
              title: "Intellectual Property",
              desc: "The Wanderluxe aesthetic and digital assets are proprietary. Unauthorized reproduction is strictly monitored.",
            },
          ].map((item) => (
            <section
              key={item.id}
              className="relative pl-16 py-4 border-l border-white/5"
            >
              <span className="absolute left-0 top-6 -translate-x-1/2 w-3 h-3 bg-blue-600 rounded-full shadow-[0_0_15px_rgba(37,99,235,0.6)]"></span>

              <h3 className="text-sm font-black text-blue-500 uppercase tracking-[0.3em] mb-2">
                {item.id} // Protocol
              </h3>

              <h4 className="text-2xl font-bold mb-4 tracking-tight uppercase">
                {item.title}
              </h4>

              <p className="text-gray-400 max-w-3xl leading-relaxed">
                {item.desc}
              </p>
            </section>
          ))}
        </div>
      </div>
    </main>
  );
}