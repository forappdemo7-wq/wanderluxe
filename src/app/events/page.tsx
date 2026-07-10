"use client";

import { Ticket, Star, Mic, Music } from 'lucide-react';

export default function EventsPage() {
  return (
    <main className="bg-[#050505] text-white min-h-screen pt-40 pb-24 px-6">
      <div className="max-w-6xl mx-auto">
        <h4 className="text-blue-400 font-black uppercase tracking-[0.4em] text-[10px] mb-4">World Stage Access</h4>
        <h1 className="text-7xl font-black uppercase tracking-tighter mb-20">Grand <span className="text-blue-500">Events</span></h1>
        
        <div className="space-y-6">
          {[
            { title: "Monaco Grand Prix", type: "VIP Yacht Access", icon: Star },
            { title: "Met Gala Afterparty", type: "Exclusive Entry", icon: Ticket },
            { title: "Wimbledon Finals", type: "Royal Box Seating", icon: Mic }
          ].map((event, i) => (
            <div key={i} className="group flex items-center justify-between p-10 bg-white/5 border border-white/10 rounded-[3rem] hover:bg-white/10 transition-all cursor-pointer">
              <div className="flex items-center gap-8">
                <div className="w-16 h-16 bg-blue-600/20 rounded-2xl flex items-center justify-center">
                  <event.icon className="text-blue-500" size={24} />
                </div>
                <div>
                  <h3 className="text-2xl font-bold uppercase tracking-tight">{event.title}</h3>
                  <p className="text-blue-500/60 font-black uppercase tracking-widest text-[10px]">{event.type}</p>
                </div>
              </div>
              <button className="px-8 py-3 border border-white/20 rounded-full font-black uppercase text-[10px] tracking-widest group-hover:bg-blue-600 group-hover:border-blue-600 transition-all">
                Request Entry
              </button>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}