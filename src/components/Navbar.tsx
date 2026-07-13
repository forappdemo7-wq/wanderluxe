"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCurrency, type Currency } from "@/context/CurrencyContext";
import { useCursor } from "@/context/CursorContext";
import { ChevronDown, Globe, Menu, X, Bot, LayoutDashboard, LogOut, User, Settings } from 'lucide-react';
import AuthModal from "./AuthModal";

// Currency symbols for better UX
const currencySymbols: Record<Currency, string> = {
  USD: '$',
  EUR: '€',
  GBP: '£',
  JPY: '¥',
  INR: '₹',
};

export default function Navbar() {
  const { currency, setCurrency } = useCurrency();
  const { butlerEnabled, setButlerEnabled } = useCursor();
  const pathname = usePathname();

  const [mounted, setMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);

  const [user, setUser] = useState<{ name: string; email: string; avatar?: string } | null>(null);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setIsProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const loadUser = () => {
    try {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        try {
          setUser(JSON.parse(storedUser));
        } catch {
          setUser(null);
        }
      } else {
        setUser(null);
      }
    } catch (e) {
      console.warn("Failed to read user from localStorage in Navbar:", e);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setMounted(true);
      loadUser();
    }, 0);

    window.addEventListener("userUpdate", loadUser);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("userUpdate", loadUser);
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsMobileMenuOpen(false);
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  const navLinks = [
    { name: "Destinations", href: "/destinations" },
    { name: "Experiences", href: "/experience" },
    { name: "Journal", href: "/journal" },
    { name: "Dining", href: "/restaurants" },
  ];

  const isActive = (href: string) => {
    if (href === '/') return pathname === href;
    return pathname.startsWith(href);
  };

  if (!mounted) return null;

  return (
    <>
      <nav
        className={`fixed w-full z-50 top-0 h-[72px] flex items-center transition-all duration-500 ${
          isScrolled
            ? "bg-white/90 dark:bg-black/80 backdrop-blur-xl border-b border-gray-200/50 dark:border-white/10 shadow-lg"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto w-full px-4 md:px-6 flex items-center justify-between gap-4">
          
          {/* LEFT: LOGO */}
          <div className="flex-shrink-0 flex items-center">
            <Link
              href="/"
              className="flex items-center gap-1.5 text-gray-900 dark:text-white font-black text-xl md:text-2xl tracking-tighter hover:opacity-80 transition-opacity group"
            >
              <span className="relative">
                WANDER
                <span className="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-blue-500 group-hover:w-full transition-all duration-500" />
              </span>
              <span className="text-blue-500">LUXE</span>
              <span className="animate-bounce inline-block ml-1 text-lg">💎</span>
            </Link>
          </div>

          {/* CENTER: NAV LINKS */}
          <div className="hidden lg:flex flex-1 items-center justify-center gap-8 xl:gap-10">
            {navLinks.map((item) => {
              const active = isActive(item.href);
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`relative text-[11px] font-black uppercase tracking-[0.15em] transition-all duration-300 ${
                    active
                      ? "text-blue-600 dark:text-blue-400"
                      : "text-gray-500/80 dark:text-gray-400/80 hover:text-gray-900 dark:hover:text-white"
                  }`}
                >
                  {item.name}
                  {active && (
                    <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-blue-500 rounded-full" />
                  )}
                  {!active && (
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-500 rounded-full group-hover:w-full transition-all duration-300" />
                  )}
                </Link>
              );
            })}
          </div>

          {/* RIGHT: ACTIONS */}
          <div className="hidden lg:flex flex-shrink-0 items-center justify-end gap-3 xl:gap-4">
            
            {/* VIRTUAL BUTLER CONTROLLER */}
            <button
              onClick={() => setButlerEnabled(!butlerEnabled)}
              className={`flex items-center gap-2.5 px-3.5 py-2 rounded-xl border transition-all duration-300 group cursor-pointer ${
                butlerEnabled
                  ? 'bg-violet-500/10 dark:bg-violet-500/20 text-violet-600 dark:text-violet-400 border-violet-300/50 dark:border-violet-500/30 shadow-[0_0_20px_rgba(139,92,246,0.15)]'
                  : 'bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 text-gray-500 dark:text-gray-400 border-black/10 dark:border-white/10 hover:border-gray-300 dark:hover:border-white/20'
              }`}
              aria-label={butlerEnabled ? "Virtual Butler active" : "Virtual Butler inactive"}
              title={butlerEnabled ? "Click to disable Butler" : "Click to enable Butler"}
            >
              <Bot
                className={`w-4 h-4 transition-all duration-300 ${
                  butlerEnabled ? 'text-violet-500 scale-110 animate-pulse' : 'opacity-70 group-hover:opacity-100'
                }`}
              />
              <span className="text-[10px] uppercase tracking-widest font-extrabold hidden xl:block whitespace-nowrap">
                {butlerEnabled ? "Butler On" : "Butler Off"}
              </span>

              <div className={`w-7 h-3.5 flex items-center rounded-full p-0.5 transition-colors duration-300 ${
                butlerEnabled ? 'bg-violet-500' : 'bg-gray-300 dark:bg-gray-600'
              }`}>
                <div
                  className={`w-2.5 h-2.5 bg-white rounded-full transition-transform duration-300 shadow-sm ${
                    butlerEnabled ? 'translate-x-3.5' : 'translate-x-0'
                  }`}
                />
              </div>
            </button>

            {/* CURRENCY */}
            <div className="relative">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className={`flex items-center gap-2 bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 backdrop-blur-sm border border-black/10 dark:border-white/10 hover:border-gray-300 dark:hover:border-white/20 px-3.5 py-2 rounded-xl text-gray-700 dark:text-gray-200 transition-all ${
                  isOpen ? 'border-blue-500 dark:border-blue-400' : ''
                }`}
                aria-haspopup="listbox"
                aria-expanded={isOpen}
              >
                <Globe size={16} className="text-blue-500" />
                <span className="text-xs font-black">{currencySymbols[currency]}{currency}</span>
                <ChevronDown
                  size={14}
                  className={`transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
                />
              </button>

              {isOpen && (
                <div
                  className="absolute top-full mt-2 right-0 w-44 bg-white dark:bg-gray-900 rounded-2xl shadow-2xl overflow-hidden z-50 p-1.5 border border-gray-100 dark:border-gray-800 animate-in fade-in zoom-in-95 duration-200"
                  role="listbox"
                >
                  {(["USD", "EUR", "GBP", "JPY", "INR"] as Currency[]).map((code) => (
                    <button
                      key={code}
                      onClick={() => {
                        setCurrency(code);
                        setIsOpen(false);
                      }}
                      className={`w-full text-left px-4 py-2.5 text-sm font-bold rounded-xl transition-all flex items-center justify-between ${
                        currency === code
                          ? "bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400"
                          : "text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"
                      }`}
                      role="option"
                      aria-selected={currency === code}
                    >
                      <span>{code}</span>
                      <span className="text-xs opacity-60">{currencySymbols[code]}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* AUTH */}
            {user ? (
              <div className="relative" ref={profileRef}>
                <button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="flex items-center gap-3.5 pl-3.5 pr-2 py-1.5 rounded-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 hover:border-gray-300 dark:hover:border-white/20 transition-all cursor-pointer select-none"
                >
                  <div className="flex flex-col text-right hidden xl:block">
                    <span className="text-[10px] font-black uppercase tracking-wider text-gray-900 dark:text-white leading-none">
                      {user.name}
                    </span>
                    <span className="text-[8px] font-bold text-amber-500 dark:text-amber-400 tracking-widest uppercase mt-1 leading-none">
                      Vanguard Elite
                    </span>
                  </div>
                  <div className="w-9 h-9 rounded-full overflow-hidden border-2 border-amber-500/30 shadow-inner bg-gradient-to-tr from-amber-500/20 to-blue-500/20 flex items-center justify-center">
                    <img 
                      src={user.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.name}`} 
                      alt="Profile Avatar"
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.name}`;
                      }}
                    />
                  </div>
                  <ChevronDown
                    size={14}
                    className={`text-gray-500 transition-transform duration-300 ${isProfileOpen ? "rotate-180" : ""}`}
                  />
                </button>

                {isProfileOpen && (
                  <div className="absolute top-full mt-2.5 right-0 w-72 bg-white dark:bg-zinc-950 border border-gray-100 dark:border-zinc-800/80 rounded-3xl shadow-2xl p-4 z-50 animate-in fade-in zoom-in-95 duration-200">
                    {/* Header profile info */}
                    <div className="flex items-center gap-3 pb-3 mb-3 border-b border-gray-100 dark:border-zinc-800/80">
                      <div className="w-12 h-12 rounded-2xl overflow-hidden bg-zinc-100 dark:bg-zinc-900 border border-black/5 dark:border-white/10">
                        <img 
                          src={user.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.name}`} 
                          alt="Avatar" 
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.name}`;
                          }}
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-black text-gray-900 dark:text-white truncate tracking-tight">{user.name}</p>
                        <p className="text-[10px] font-bold text-gray-500 dark:text-zinc-500 truncate leading-none mt-0.5">{user.email || 'george@luxury.com'}</p>
                        <div className="inline-flex items-center gap-1.5 px-2 py-0.5 bg-amber-500/10 rounded-full mt-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
                          <span className="text-[9px] font-black uppercase tracking-wider text-amber-500">Vanguard Elite</span>
                        </div>
                      </div>
                    </div>

                    {/* Links */}
                    <div className="space-y-1">
                      <Link
                        href="/dashboard"
                        onClick={() => setIsProfileOpen(false)}
                        className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-zinc-50 dark:hover:bg-zinc-900/60 transition-all text-gray-700 dark:text-zinc-300 group"
                      >
                        <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-500 group-hover:scale-105 transition-transform">
                          <LayoutDashboard size={15} />
                        </div>
                        <div className="flex-1 text-left">
                          <p className="text-xs font-black uppercase tracking-widest text-gray-900 dark:text-white">Dashboard</p>
                          <p className="text-[9px] text-gray-400 dark:text-zinc-500 font-bold leading-none mt-0.5">Private Flight & Stay Manifests</p>
                        </div>
                      </Link>

                      <Link
                        href="/dashboard/profile"
                        onClick={() => setIsProfileOpen(false)}
                        className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-zinc-50 dark:hover:bg-zinc-900/60 transition-all text-gray-700 dark:text-zinc-300 group"
                      >
                        <div className="w-8 h-8 rounded-lg bg-amber-500/10 flex items-center justify-center text-amber-500 group-hover:scale-105 transition-transform">
                          <User size={15} />
                        </div>
                        <div className="flex-1 text-left">
                          <p className="text-xs font-black uppercase tracking-widest text-gray-900 dark:text-white">My Profile</p>
                          <p className="text-[9px] text-gray-400 dark:text-zinc-500 font-bold leading-none mt-0.5">Manage Member Details & Photo</p>
                        </div>
                      </Link>

                      <Link
                        href="/dashboard/settings"
                        onClick={() => setIsProfileOpen(false)}
                        className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-zinc-50 dark:hover:bg-zinc-900/60 transition-all text-gray-700 dark:text-zinc-300 group"
                      >
                        <div className="w-8 h-8 rounded-lg bg-zinc-500/10 flex items-center justify-center text-zinc-500 group-hover:scale-105 transition-transform">
                          <Settings size={15} />
                        </div>
                        <div className="flex-1 text-left">
                          <p className="text-xs font-black uppercase tracking-widest text-gray-900 dark:text-white">Account Settings</p>
                          <p className="text-[9px] text-gray-400 dark:text-zinc-500 font-bold leading-none mt-0.5">Manage Notifications & Security</p>
                        </div>
                      </Link>
                    </div>

                    <div className="h-px bg-gray-100 dark:bg-zinc-800/80 my-3" />

                    {/* Logout */}
                    <button
                      onClick={() => {
                        try {
                          localStorage.removeItem("user");
                        } catch (e) {
                          console.warn("Failed to remove user from localStorage:", e);
                        }
                        setUser(null);
                        setIsProfileOpen(false);
                        window.location.reload();
                      }}
                      className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-red-600 dark:text-red-400 hover:bg-red-500/5 dark:hover:bg-red-500/10 transition-all cursor-pointer font-black text-xs uppercase tracking-widest"
                    >
                      <LogOut size={15} />
                      <span>Sign Out</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={() => setIsAuthOpen(true)}
                className="bg-gradient-to-r from-gray-900 to-gray-800 dark:from-white dark:to-gray-100 text-white dark:text-black px-6 py-2.5 rounded-xl font-black text-[11px] uppercase tracking-widest hover:from-blue-600 hover:to-blue-700 dark:hover:from-blue-500 dark:hover:to-blue-600 hover:text-white dark:hover:text-white transition-all duration-300 shadow-lg hover:shadow-blue-500/25 whitespace-nowrap cursor-pointer"
              >
                Sign Up
              </button>
            )}
          </div>

          {/* MOBILE HAMBURGER */}
          <div className="flex lg:hidden flex-shrink-0 items-center justify-end">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-900 dark:text-white p-2 hover:bg-black/5 dark:hover:bg-white/5 rounded-full transition-colors relative"
              aria-label="Toggle menu"
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? (
                <X size={24} className="animate-in rotate-90 duration-200" />
              ) : (
                <Menu size={24} className="animate-in rotate-0 duration-200" />
              )}
            </button>
          </div>

        </div>
      </nav>

      {/* MOBILE MENU OVERLAY */}
      {isMobileMenuOpen && (
        <div 
          ref={mobileMenuRef}
          className="fixed inset-0 z-40 bg-white/98 dark:bg-black/98 backdrop-blur-2xl pt-28 px-6 lg:hidden overflow-y-auto animate-in slide-in-from-top duration-300"
        >
          <div className="flex flex-col gap-8 max-w-md mx-auto">
            {/* Mobile Nav Links */}
            <div className="flex flex-col gap-4">
              {navLinks.map((item) => {
                const active = isActive(item.href);
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`text-2xl font-black transition-colors ${
                      active
                        ? "text-blue-600 dark:text-blue-400"
                        : "text-gray-700 dark:text-white hover:text-blue-500 dark:hover:text-blue-400"
                    }`}
                  >
                    {item.name}
                    {active && (
                      <span className="ml-2 text-xs text-blue-500">●</span>
                    )}
                  </Link>
                );
              })}
            </div>

            <div className="h-px w-full bg-gray-200 dark:bg-white/10" />

            {/* Currency Selector (Mobile) */}
            <div className="relative">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center justify-between bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 backdrop-blur-sm border border-black/10 dark:border-white/10 px-5 py-4 rounded-2xl text-gray-900 dark:text-white font-bold w-full transition-colors"
              >
                <span className="flex items-center gap-3">
                  <Globe size={20} className="text-blue-500" />
                  {currency} {currencySymbols[currency]}
                </span>
                <ChevronDown
                  size={18}
                  className={`transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
                />
              </button>
              
              {isOpen && (
                <div className="absolute top-full mt-2 left-0 w-full bg-white dark:bg-gray-900 rounded-2xl shadow-xl overflow-hidden z-50 p-2 border border-gray-100 dark:border-gray-800 animate-in fade-in zoom-in-95 duration-200">
                  {(["USD", "EUR", "GBP", "JPY", "INR"] as Currency[]).map((code) => (
                    <button
                      key={code}
                      onClick={() => {
                        setCurrency(code);
                        setIsOpen(false);
                      }}
                      className={`w-full text-left px-5 py-3 text-sm font-bold rounded-xl transition-all flex items-center justify-between ${
                        currency === code
                          ? "bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400"
                          : "text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"
                      }`}
                    >
                      <span>{code}</span>
                      <span className="text-xs opacity-60">{currencySymbols[code]}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* BUTLER TOGGLE FOR MOBILE */}
            <div className="flex items-center justify-between px-5 py-4 bg-black/5 dark:bg-white/5 rounded-2xl border border-black/10 dark:border-white/10">
              <div className="flex items-center gap-3">
                <Bot className={`w-5 h-5 ${butlerEnabled ? 'text-violet-500' : 'text-gray-400'}`} />
                <span className="text-[12px] font-extrabold uppercase tracking-widest text-gray-700 dark:text-slate-300">
                  VIRTUAL BUTLER
                </span>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${butlerEnabled ? 'bg-violet-100 text-violet-600 dark:bg-violet-900/30 dark:text-violet-400' : 'bg-gray-200 text-gray-500 dark:bg-gray-700 dark:text-gray-400'}`}>
                  {butlerEnabled ? 'ON' : 'OFF'}
                </span>
              </div>
              <button
                onClick={() => setButlerEnabled(!butlerEnabled)}
                className={`w-12 h-6 rounded-full p-1 transition-colors duration-300 relative ${
                  butlerEnabled ? 'bg-violet-600' : 'bg-gray-300 dark:bg-gray-700'
                }`}
                aria-label="Toggle Virtual Butler"
              >
                <div
                  className={`w-4 h-4 rounded-full bg-white transition-transform duration-300 shadow-md ${
                    butlerEnabled ? 'translate-x-6' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>

            {/* Auth/Profile Section (Mobile) */}
            {user ? (
              <div className="flex flex-col gap-4 bg-zinc-50 dark:bg-zinc-900/60 p-6 rounded-3xl border border-gray-100 dark:border-zinc-800/80">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl overflow-hidden bg-zinc-200 dark:bg-zinc-800 border border-black/5 dark:border-white/10">
                    <img 
                      src={user.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.name}`} 
                      alt="Avatar" 
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.name}`;
                      }}
                    />
                  </div>
                  <div className="flex-1 min-w-0 text-left">
                    <p className="text-sm font-black text-gray-900 dark:text-white truncate tracking-tight">{user.name}</p>
                    <div className="inline-flex items-center gap-1.5 px-2 py-0.5 bg-amber-500/10 rounded-full mt-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
                      <span className="text-[9px] font-black uppercase tracking-wider text-amber-500">Vanguard Elite</span>
                    </div>
                  </div>
                </div>

                <div className="h-px bg-gray-200 dark:bg-zinc-800/80 my-2" />

                <div className="text-left space-y-2">
                  <Link
                    href="/dashboard"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center gap-3 p-3 rounded-2xl bg-white dark:bg-zinc-950/40 hover:bg-white dark:hover:bg-zinc-950/80 transition-all border border-black/5 dark:border-white/5"
                  >
                    <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-500">
                      <LayoutDashboard size={14} />
                    </div>
                    <div>
                      <p className="text-xs font-black uppercase tracking-widest text-gray-900 dark:text-zinc-200">Dashboard</p>
                      <p className="text-[9px] text-gray-400 dark:text-zinc-500 font-bold leading-none mt-0.5">Private Flight & Stay Manifests</p>
                    </div>
                  </Link>

                  <Link
                    href="/dashboard/profile"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center gap-3 p-3 rounded-2xl bg-white dark:bg-zinc-950/40 hover:bg-white dark:hover:bg-zinc-950/80 transition-all border border-black/5 dark:border-white/5"
                  >
                    <div className="w-8 h-8 rounded-lg bg-amber-500/10 flex items-center justify-center text-amber-500">
                      <User size={14} />
                    </div>
                    <div>
                      <p className="text-xs font-black uppercase tracking-widest text-gray-900 dark:text-zinc-200">My Profile</p>
                      <p className="text-[9px] text-gray-400 dark:text-zinc-500 font-bold leading-none mt-0.5">Manage Member Details & Photo</p>
                    </div>
                  </Link>

                  <Link
                    href="/dashboard/settings"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center gap-3 p-3 rounded-2xl bg-white dark:bg-zinc-950/40 hover:bg-white dark:hover:bg-zinc-950/80 transition-all border border-black/5 dark:border-white/5"
                  >
                    <div className="w-8 h-8 rounded-lg bg-zinc-500/10 flex items-center justify-center text-zinc-500">
                      <Settings size={14} />
                    </div>
                    <div>
                      <p className="text-xs font-black uppercase tracking-widest text-gray-900 dark:text-zinc-200">Account Settings</p>
                      <p className="text-[9px] text-gray-400 dark:text-zinc-500 font-bold leading-none mt-0.5">Manage Notifications & Security</p>
                    </div>
                  </Link>
                </div>

                <div className="h-px bg-gray-200 dark:bg-zinc-800/80 my-1" />

                <button
                  onClick={() => {
                    try {
                      localStorage.removeItem("user");
                    } catch (e) {
                      console.warn("Failed to remove user from localStorage:", e);
                    }
                    setUser(null);
                    setIsMobileMenuOpen(false);
                    window.location.reload();
                  }}
                  className="w-full bg-red-500/10 hover:bg-red-500/20 text-red-600 dark:text-red-400 border border-red-500/10 py-3 rounded-2xl font-black text-xs uppercase tracking-widest text-center cursor-pointer"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <button
                onClick={() => {
                  setIsAuthOpen(true);
                  setIsMobileMenuOpen(false);
                }}
                className="bg-gradient-to-r from-gray-900 to-gray-800 dark:from-white dark:to-gray-100 text-white dark:text-black px-8 py-4 rounded-2xl font-black text-sm uppercase tracking-widest hover:from-blue-600 hover:to-blue-700 dark:hover:from-blue-500 dark:hover:to-blue-600 hover:text-white transition-all duration-300 text-center shadow-lg cursor-pointer"
              >
                Sign Up
              </button>
            )}
          </div>
        </div>
      )}

      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
      />
    </>
  );
}