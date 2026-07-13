"use client";

import { useState, useEffect } from 'react';
import { Bell, Settings, User, LogOut } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

interface UserData {
  name: string;
  email: string;
  points: number;
  tier: string;
  avatar?: string;
}

export default function Header() {
  const [showDropdown, setShowDropdown] = useState(false);
  const [user, setUser] = useState<UserData | null>(null);

  const loadUser = () => {
    try {
      const stored = localStorage.getItem("user");
      if (stored) {
        setUser(JSON.parse(stored));
      } else {
        // Fallback or default guest
        setUser({
          name: "George Harrison",
          email: "george@luxury.com",
          points: 2450,
          tier: "Vanguard Elite",
          avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=George"
        });
      }
    } catch (e) {
      console.warn("Failed to read user from localStorage in Header:", e);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      loadUser();
    }, 0);

    // Listen for custom event when profile gets updated
    window.addEventListener("userUpdate", loadUser);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("userUpdate", loadUser);
    };
  }, []);

  const handleSignOut = () => {
    try {
      localStorage.removeItem("user");
    } catch (e) {
      console.warn("Failed to remove user from localStorage in Header:", e);
    }
    window.location.href = "/";
  };

  const name = user?.name || "George";
  const firstName = name.split(' ')[0];
  const avatarUrl = user?.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${name}`;

  return (
    <header className="flex justify-between items-start pt-8 pb-10 border-b border-white/10">
      {/* Left Side - Greeting */}
      <div className="space-y-1">
        <p className="text-blue-400 text-xs font-black uppercase tracking-[0.2em]">Good afternoon</p>
        <h1 className="text-4xl md:text-5xl font-black tracking-tighter text-white">
          Welcome back, {firstName}
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
            className="flex items-center gap-4 bg-zinc-900 hover:bg-zinc-800 border border-white/10 rounded-3xl pl-2 pr-6 py-1.5 transition-all group cursor-pointer"
          >
            <div className="w-10 h-10 rounded-2xl overflow-hidden border-2 border-white/20 shadow-inner">
              <img 
                src={avatarUrl} 
                alt={name} 
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = `https://api.dicebear.com/7.x/avataaars/svg?seed=${name}`;
                }}
              />
            </div>

            <div className="hidden sm:block text-left">
              <p className="font-semibold text-white text-sm tracking-tight">{name}</p>
              <p className="text-[10px] font-black uppercase tracking-widest text-emerald-400">
                {user?.tier || "Elite Member"} • {(user?.points || 2450).toLocaleString()} pts
              </p>
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
                  <p className="font-semibold truncate">{name}</p>
                  <p className="text-xs text-zinc-400 truncate">{user?.email || "george@luxury.com"}</p>
                </div>

                <div className="py-2">
                  <Link 
                    href="/dashboard/profile" 
                    onClick={() => setShowDropdown(false)}
                    className="flex items-center gap-3 px-6 py-3 hover:bg-white/5 text-sm transition-colors"
                  >
                    <User size={18} /> View Profile
                  </Link>
                  <Link 
                    href="/dashboard/settings" 
                    onClick={() => setShowDropdown(false)}
                    className="flex items-center gap-3 px-6 py-3 hover:bg-white/5 text-sm transition-colors"
                  >
                    <Settings size={18} /> Account Settings
                  </Link>
                </div>

                <div className="border-t border-white/10 pt-2 mt-2">
                  <button 
                    onClick={handleSignOut}
                    className="flex items-center gap-3 px-6 py-3 text-red-400 hover:bg-red-500/10 w-full text-sm transition-colors text-left cursor-pointer font-semibold"
                  >
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