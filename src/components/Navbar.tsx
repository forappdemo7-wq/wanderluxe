"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCurrency, type Currency } from "@/context/CurrencyContext";
import { useCursor } from "@/context/CursorContext";
import { ChevronDown, Globe, Menu, X, Bot, Sparkles } from 'lucide-react';
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

  useEffect(() => setMounted(true), []);

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
    { name: "Dashboard", href: "/dashboard" },
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
            <button
              onClick={() => setIsAuthOpen(true)}
              className="bg-gradient-to-r from-gray-900 to-gray-800 dark:from-white dark:to-gray-100 text-white dark:text-black px-6 py-2.5 rounded-xl font-black text-[11px] uppercase tracking-widest hover:from-blue-600 hover:to-blue-700 dark:hover:from-blue-500 dark:hover:to-blue-600 hover:text-white dark:hover:text-white transition-all duration-300 shadow-lg hover:shadow-blue-500/25 whitespace-nowrap"
            >
              Sign Up
            </button>
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

            {/* Auth Button (Mobile) */}
            <button
              onClick={() => {
                setIsAuthOpen(true);
                setIsMobileMenuOpen(false);
              }}
              className="bg-gradient-to-r from-gray-900 to-gray-800 dark:from-white dark:to-gray-100 text-white dark:text-black px-8 py-4 rounded-2xl font-black text-sm uppercase tracking-widest hover:from-blue-600 hover:to-blue-700 dark:hover:from-blue-500 dark:hover:to-blue-600 hover:text-white transition-all duration-300 text-center shadow-lg"
            >
              Sign Up
            </button>
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