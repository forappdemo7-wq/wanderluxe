"use client";

import { useState } from 'react';
import { Bell, Settings, User, LogOut } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Header() {
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <header className="flex justify-between items-start pt-8 pb-10 border-b border-white/10">
      {/* Left Side - Greeting */}
      <div className="space-y-1">
        <p className="text-blue-400 text-xs font-black uppercase tracking-[0.2em]">Good afternoon</p>
        <h1 className="text-4xl md:text-5xl font-black tracking-tighter text-white">
          Welcome back, Alex
        </h1>
        <p className="text-zinc-400 text-lg">
          You have <span className="text-emerald-400 font-semibold">2 upcoming adventures</span> this season.
        </p>
      </div>

      {/* Right Side - User Profile & Actions */}
      <div className="flex items-center gap-6">
        {/* Notifications */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="relative p-3 text-zinc-400 hover:text-white transition-colors rounded-2xl hover:bg-white/5"
        >
          <Bell size={22} />
          <div className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full ring-2 ring-zinc-950" />
        </motion.button>

        {/* User Profile */}
        <div className="relative">
          <button
            onClick={() => setShowDropdown(!showDropdown)}
            className="flex items-center gap-4 bg-zinc-900 hover:bg-zinc-800 border border-white/10 rounded-3xl pl-2 pr-6 py-1.5 transition-all group"
          >
            <div className="w-10 h-10 rounded-2xl overflow-hidden border-2 border-white/20 shadow-inner">
              <img 
                src="https://api.dicebear.com/7.x/avataaars/svg?seed=Alex" 
                alt="Alex Rivera" 
                className="w-full h-full object-cover"
              />
            </div>

            <div className="hidden sm:block text-left">
              <p className="font-semibold text-white text-sm tracking-tight">Alex Rivera</p>
              <p className="text-[10px] font-black uppercase tracking-widest text-emerald-400">Elite Member • 2,450 pts</p>
            </div>
          </button>

          {/* Dropdown Menu */}
          <AnimatePresence>
            {showDropdown && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                className="absolute right-0 mt-3 w-64 bg-zinc-900 border border-white/10 rounded-3xl shadow-2xl py-2 z-50"
              >
                <div className="px-6 py-4 border-b border-white/10">
                  <p className="font-semibold">Alex Rivera</p>
                  <p className="text-xs text-zinc-400">alex@wanderluxe.com</p>
                </div>

                <div className="py-2">
                  <a href="/profile" className="flex items-center gap-3 px-6 py-3 hover:bg-white/5 text-sm transition-colors">
                    <User size={18} /> View Profile
                  </a>
                  <a href="/settings" className="flex items-center gap-3 px-6 py-3 hover:bg-white/5 text-sm transition-colors">
                    <Settings size={18} /> Account Settings
                  </a>
                </div>

                <div className="border-t border-white/10 pt-2 mt-2">
                  <button className="flex items-center gap-3 px-6 py-3 text-red-400 hover:bg-red-500/10 w-full text-sm transition-colors">
                    <LogOut size={18} /> Sign Out
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
  );
}