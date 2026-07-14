"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Home, 
  TrendingUp, 
  Calendar, 
  CreditCard, 
  Star, 
  Settings, 
  LogOut,
  User
} from 'lucide-react';
import { motion, Variants } from 'framer-motion';

const logoContainerVariants: Variants = {
  initial: {},
  hover: {
    transition: {
      staggerChildren: 0.03,
    },
  },
};

const letterVariants: Variants = {
  initial: { 
    y: 0, 
    color: "#ffffff",
    textShadow: "0 0 0px rgba(59, 130, 246, 0)"
  },
  hover: {
    y: [0, -6, 0],
    color: ["#ffffff", "#3b82f6", "#22d3ee", "#ffffff"],
    textShadow: [
      "0 0 0px rgba(59, 130, 246, 0)",
      "0 0 12px rgba(59, 130, 246, 0.6)",
      "0 0 15px rgba(34, 211, 238, 0.6)",
      "0 0 0px rgba(59, 130, 246, 0)"
    ],
    transition: {
      duration: 0.5,
      ease: "easeInOut" as const,
    }
  }
};

export default function Sidebar() {
  const pathname = usePathname();

  const menuItems = [
    { icon: <Home size={20} />, label: 'Home', href: '/' },
    { icon: <TrendingUp size={20} />, label: 'Overview', href: '/dashboard' },
    { icon: <Calendar size={20} />, label: 'My Bookings', href: '/dashboard/bookings' },
    { icon: <CreditCard size={20} />, label: 'Payments', href: '/dashboard/payments' },
    { icon: <Star size={20} />, label: 'Wishlist', href: '/dashboard/wishlist' },
    { icon: <User size={20} />, label: 'My Profile', href: '/dashboard/profile' },
    { icon: <Settings size={20} />, label: 'Settings', href: '/dashboard/settings' },
  ];

  const logoLetters = "WANDERLUXE".split("");

  return (
    <aside className="w-72 bg-zinc-950 border-r border-white/10 hidden lg:flex flex-col fixed h-full z-50">
      {/* Logo */}
      <div className="px-8 pt-10 pb-12">
        <Link href="/">
          <motion.div
            initial="initial"
            whileHover="hover"
            className="flex items-center gap-3 cursor-pointer group"
          >
            {/* Pulsing, Shimmering W badge */}
            <motion.div 
              className="w-9 h-9 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-xl flex items-center justify-center relative overflow-hidden shadow-lg shadow-blue-500/10"
              whileHover={{ 
                rotateY: 180,
                scale: 1.05,
                boxShadow: "0 0 20px rgba(59, 130, 246, 0.5)"
              }}
              transition={{ 
                type: "spring", 
                stiffness: 180, 
                damping: 10 
              }}
            >
              {/* Metallic shine diagonal sweep line */}
              <motion.div 
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12"
                animate={{
                  left: ["-100%", "200%"],
                }}
                transition={{
                  repeat: Infinity,
                  repeatType: "loop",
                  duration: 2.8,
                  ease: "linear",
                  delay: 0.2
                }}
              />
              <span className="text-white font-black text-xl tracking-tighter relative z-10">W</span>
            </motion.div>

            {/* Staggered text characters */}
            <motion.h1 
              variants={logoContainerVariants}
              className="text-2xl font-black tracking-tight text-white flex items-center select-none"
            >
              {logoLetters.map((letter, idx) => (
                <motion.span
                  key={idx}
                  variants={letterVariants}
                  className="inline-block origin-bottom"
                >
                  {letter}
                </motion.span>
              ))}
            </motion.h1>
          </motion.div>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-6 space-y-1">
        {menuItems.map((item) => {
          const isActive = item.href === '/' 
            ? pathname === '/' 
            : item.href === '/dashboard' 
              ? (pathname === '/dashboard' || pathname === '/dashboard/') 
              : pathname === item.href || pathname?.startsWith(item.href + '/');

          return (
            <Link key={item.label} href={item.href}>
              <motion.div
                whileHover={{ x: 4 }}
                transition={{ type: "spring", stiffness: 300 }}
                className={`flex items-center gap-4 px-6 py-4 rounded-2xl text-sm font-medium transition-all duration-200 ${
                  isActive 
                    ? 'bg-white text-black shadow-xl shadow-blue-950/50' 
                    : 'text-zinc-400 hover:bg-white/5 hover:text-white'
                }`}
              >
                <div className={isActive ? 'text-black' : 'text-zinc-400'}>
                  {item.icon}
                </div>
                <span>{item.label}</span>
              </motion.div>
            </Link>
          );
        })}
      </nav>

      {/* Logout Button */}
      <div className="p-6 mt-auto border-t border-white/10">
        <button
          onClick={() => {
            try {
              localStorage.removeItem("user");
            } catch (e) {
              console.warn("Failed to remove user from localStorage in Sidebar:", e);
            }
            window.location.href = "/";
          }}
          className="flex items-center gap-4 w-full px-6 py-4 text-red-400 hover:bg-red-500/10 hover:text-red-500 rounded-2xl transition-all font-medium cursor-pointer"
        >
          <LogOut size={20} />
          <span>Sign Out</span>
        </button>
      </div>

      {/* Subtle Footer */}
      <div className="px-8 py-6 text-[10px] text-zinc-500 font-medium border-t border-white/5">
        © 2026 Wanderluxe • Elite Travel
      </div>
    </aside>
  );
}