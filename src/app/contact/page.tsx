"use client";

import { Mail, Phone, MapPin, Send } from 'lucide-react';

export default function ContactPage() {
  return (
    <main className="bg-[#050505] text-white min-h-screen pt-40 pb-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          <div>
            <h1 className="text-7xl font-black uppercase tracking-tighter leading-none mb-12">
              Connect <br /><span className="text-blue-500">With Us</span>
            </h1>
            <div className="space-y-12">
              <div className="flex gap-6 items-start">
                <div className="w-12 h-12 bg-blue-600/10 rounded-2xl flex items-center justify-center border border-blue-500/20">
                  <Mail className="text-blue-500" size={20} />
                </div>
                <div>
                  <h4 className="font-black uppercase tracking-widest text-[10px] text-gray-500 mb-2">Email</h4>
                  <p className="text-xl font-bold">concierge@wanderluxe.co</p>
                </div>
              </div>
              <div className="flex gap-6 items-start">
                <div className="w-12 h-12 bg-blue-600/10 rounded-2xl flex items-center justify-center border border-blue-500/20">
                  <MapPin className="text-blue-500" size={20} />
                </div>
                <div>
                  <h4 className="font-black uppercase tracking-widest text-[10px] text-gray-500 mb-2">Headquarters</h4>
                  <p className="text-xl font-bold">Madison Ave, New York, NY</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white/5 border border-white/10 p-12 rounded-[4rem] backdrop-blur-xl">
             <form className="space-y-8">
                <div className="space-y-2">
                   <label className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-500 ml-2">Full Name</label>
                   <input type="text" className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:border-blue-500 outline-none transition-all" />
                </div>
                <div className="space-y-2">
                   <label className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-500 ml-2">Message</label>
                   <textarea rows={4} className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:border-blue-500 outline-none transition-all" />
                </div>
                <button className="w-full bg-blue-600 py-6 rounded-2xl font-black uppercase tracking-[0.3em] text-[10px] hover:bg-blue-500 transition-all flex items-center justify-center gap-3">
                   Initiate Request <Send size={14} />
                </button>
             </form>
          </div>
        </div>
      </div>
    </main>
  );
}