"use client";

import { useState } from 'react';
import Sidebar from '@/components/dashboard/Sidebar';
import { useCurrency, type Currency } from '@/context/CurrencyContext';
import { Globe, ChevronDown } from 'lucide-react';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { currency, setCurrency } = useCurrency();
  const [isCurrencyOpen, setIsCurrencyOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-zinc-950 text-white">
      <Sidebar />

      <div className="flex-1 lg:ml-72 flex flex-col">
        {/* Top Bar */}
        <div className="h-20 border-b border-white/10 bg-zinc-900/80 backdrop-blur-xl flex items-center px-8 z-40">
          <div className="flex-1">
            <h1 className="text-2xl font-black tracking-tighter">Dashboard</h1>
          </div>

          <div className="flex items-center gap-8">
            {/* Currency Switcher */}
            <div className="relative">
              <button
                onClick={() => setIsCurrencyOpen(!isCurrencyOpen)}
                className="flex items-center gap-3 bg-zinc-800 hover:bg-zinc-700 border border-white/10 px-5 py-2.5 rounded-2xl transition-all text-sm font-medium"
              >
                <Globe size={18} className="text-blue-400" />
                <span className="font-mono tracking-widest">{currency}</span>
                <ChevronDown 
                  size={16} 
                  className={`transition-transform ${isCurrencyOpen ? 'rotate-180' : ''}`} 
                />
              </button>

              {isCurrencyOpen && (
                <div className="absolute top-full mt-2 right-0 w-40 bg-zinc-900 border border-white/10 rounded-2xl shadow-2xl py-2 z-50">
                  {(['USD', 'INR', 'JPY', 'EUR'] as Currency[]).map((code) => (
                    <button
                      key={code}
                      onClick={() => {
                        setCurrency(code);
                        setIsCurrencyOpen(false);
                      }}
                      className={`w-full text-left px-6 py-3 text-sm font-medium transition-all hover:bg-white/5 ${
                        currency === code ? 'text-blue-400 bg-white/5' : 'text-zinc-300'
                      }`}
                    >
                      {code}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="hidden sm:block text-right">
              <p className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Elite Member</p>
              <p className="text-lg font-black text-emerald-400 tracking-tight">2,450 pts</p>
            </div>

            <div className="w-10 h-10 rounded-2xl overflow-hidden border-2 border-white/20">
              <img 
                src="https://api.dicebear.com/7.x/avataaars/svg?seed=Alex" 
                alt="User" 
              />
            </div>
          </div>
        </div>

        <main className="flex-1 p-6 md:p-10 lg:p-12">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}