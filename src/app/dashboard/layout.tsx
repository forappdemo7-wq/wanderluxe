"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Sidebar from '@/components/dashboard/Sidebar';
import { useCurrency, type Currency } from '@/context/CurrencyContext';
import { Globe, ChevronDown, Mail, Key, LogIn, Sparkles, ArrowLeft } from 'lucide-react';

interface User {
  name: string;
  email: string;
  points: number;
  tier: string;
  avatar?: string;
}

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { currency, setCurrency } = useCurrency();
  const [isCurrencyOpen, setIsCurrencyOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  
  // Login form state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const pathname = usePathnameSafe();

  const loadUser = () => {
    try {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        try {
          setUser(JSON.parse(storedUser));
        } catch (e) {
          setUser(null);
        }
      }
    } catch (e) {
      console.warn("Failed to read user from localStorage in dashboard layout:", e);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadUser();
    window.addEventListener("userUpdate", loadUser);
    return () => {
      window.removeEventListener("userUpdate", loadUser);
    };
  }, []);

  // Helper because usePathname might be from app router
  function usePathnameSafe() {
    try {
      return require('next/navigation').usePathname();
    } catch {
      return '/dashboard';
    }
  }

  const getTitle = () => {
    if (pathname.includes("bookings")) return "Bookings";
    if (pathname.includes("payments")) return "Payments";
    if (pathname.includes("wishlist")) return "Wishlist";
    return "Dashboard";
  };

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      setErrorMsg("Please enter an email address.");
      return;
    }
    setIsSubmitting(true);
    setTimeout(() => {
      const loggedInUser = {
        name: email.split('@')[0].replace(/[^a-zA-Z0-9]/g, ' ').replace(/\b\w/g, c => c.toUpperCase()),
        email: email,
        points: 2450,
        tier: "Vanguard Elite"
      };
      try {
        localStorage.setItem("user", JSON.stringify(loggedInUser));
      } catch (e) {
        console.warn("Failed to write user to localStorage inside dashboard layout handleSignIn:", e);
      }
      setUser(loggedInUser);
      setIsSubmitting(false);
    }, 800);
  };

  const handleQuickAccess = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      const loggedInUser = {
        name: "George Harrison",
        email: "george@luxury.com",
        points: 2450,
        tier: "Vanguard Elite"
      };
      try {
        localStorage.setItem("user", JSON.stringify(loggedInUser));
      } catch (e) {
        console.warn("Failed to write user to localStorage inside dashboard layout handleQuickAccess:", e);
      }
      setUser(loggedInUser);
      setIsSubmitting(false);
    }, 500);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 rounded-full border-2 border-t-blue-500 border-white/10 animate-spin" />
          <p className="text-xs font-black uppercase tracking-widest text-zinc-500">Contacting Secure Servers...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center p-6 relative overflow-hidden">
        {/* Background glow effects */}
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-blue-500/10 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-indigo-500/5 rounded-full blur-[100px] pointer-events-none" />

        <div className="w-full max-w-md bg-zinc-900/60 border border-white/10 rounded-[32px] p-8 md:p-10 shadow-2xl backdrop-blur-xl relative z-10 text-center">
          <div className="mb-8">
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-blue-400 mb-2 block">WanderLuxe Private Portal</span>
            <h2 className="text-3xl font-black text-white tracking-tighter">Access Dashboard</h2>
            <p className="text-zinc-400 text-sm mt-2 font-medium">Please sign in to view your elite membership tier, flight manifests, and custom-tailored itineraries.</p>
          </div>

          {errorMsg && (
            <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-semibold text-left">
              {errorMsg}
            </div>
          )}

          <form onSubmit={handleSignIn} className="space-y-4 text-left">
            <div>
              <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 ml-4 mb-2 block">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 w-4 h-4" />
                <input
                  required
                  type="email"
                  value={email}
                  onChange={(e) => { setEmail(e.target.value); setErrorMsg(""); }}
                  placeholder="name@wanderluxe.com"
                  className="w-full bg-zinc-800/50 border border-white/10 rounded-2xl h-14 pl-12 pr-6 text-white placeholder:text-zinc-600 focus:outline-none focus:border-blue-500/50 transition-all text-sm font-medium"
                />
              </div>
            </div>

            <div>
              <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 ml-4 mb-2 block">
                Password
              </label>
              <div className="relative">
                <Key className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 w-4 h-4" />
                <input
                  required
                  type="password"
                  value={password}
                  onChange={(e) => { setPassword(e.target.value); setErrorMsg(""); }}
                  placeholder="••••••••"
                  className="w-full bg-zinc-800/50 border border-white/10 rounded-2xl h-14 pl-12 pr-6 text-white placeholder:text-zinc-600 focus:outline-none focus:border-blue-500/50 transition-all text-sm font-medium"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-blue-600 hover:bg-blue-500 text-white h-14 rounded-2xl font-black uppercase text-[11px] tracking-widest transition-all flex items-center justify-center gap-2 shadow-lg hover:shadow-blue-500/25 disabled:opacity-50 cursor-pointer"
            >
              {isSubmitting ? (
                <div className="w-5 h-5 border-2 border-t-transparent border-white rounded-full animate-spin" />
              ) : (
                <>
                  <LogIn size={16} />
                  Sign In to Portal
                </>
              )}
            </button>
          </form>

          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-white/5"></div></div>
            <div className="relative flex justify-center text-[9px] uppercase tracking-widest"><span className="bg-zinc-900 px-3 text-zinc-500 font-bold">Or Experience Elite Demo</span></div>
          </div>

          <button
            onClick={handleQuickAccess}
            disabled={isSubmitting}
            className="w-full bg-zinc-850 hover:bg-zinc-800 text-white border border-white/10 h-14 rounded-2xl font-black uppercase text-[11px] tracking-widest transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <Sparkles size={16} className="text-amber-400" />
            Quick Access: George Harrison
          </button>

          <button
            onClick={() => window.location.href = "/"}
            className="mt-6 text-zinc-500 hover:text-white transition-colors text-[10px] uppercase font-black tracking-widest block mx-auto hover:underline cursor-pointer"
          >
            ← Return to Homepage
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-zinc-950 text-white">
      <Sidebar />

      <div className="flex-1 lg:ml-72 flex flex-col">
        {/* Top Bar */}
        <div className="h-20 border-b border-white/10 bg-zinc-900/80 backdrop-blur-xl flex items-center px-8 z-40">
          <div className="flex-1 flex items-center gap-3">
            {/* Mobile / Tablet Back Button */}
            <button
              onClick={() => {
                if (pathname === '/dashboard' || pathname === '/dashboard/') {
                  window.location.href = '/';
                } else {
                  window.location.href = '/dashboard';
                }
              }}
              className="lg:hidden flex items-center gap-2 px-3 py-2 rounded-xl bg-zinc-800/80 hover:bg-zinc-700/80 border border-white/10 text-xs font-bold uppercase tracking-wider text-zinc-300 transition-all cursor-pointer"
            >
              <ArrowLeft size={14} />
              <span>{pathname === '/dashboard' || pathname === '/dashboard/' ? 'Home' : 'Back'}</span>
            </button>

            <h1 className="text-2xl font-black tracking-tighter">
              {getTitle()}
            </h1>
          </div>

          <div className="flex items-center gap-8">
            {/* Currency Switcher */}
            <div className="relative">
              <button
                onClick={() => setIsCurrencyOpen(!isCurrencyOpen)}
                className="flex items-center gap-3 bg-zinc-800 hover:bg-zinc-700 border border-white/10 px-5 py-2.5 rounded-2xl transition-all text-sm font-medium cursor-pointer"
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
              <p className="text-[10px] font-black uppercase tracking-widest text-zinc-500">{user.tier}</p>
              <p className="text-lg font-black text-emerald-400 tracking-tight">{user.points.toLocaleString()} pts</p>
            </div>

            <div className="w-10 h-10 rounded-2xl overflow-hidden border-2 border-white/20 bg-zinc-800">
              <img 
                src={user.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.name}`} 
                alt="User" 
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.name}`;
                }}
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