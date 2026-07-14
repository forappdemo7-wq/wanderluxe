"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Mail, Chrome, ArrowLeft, Loader2 } from "lucide-react";
import Link from "next/link";

type AuthView = "social" | "login" | "signup";

export default function AuthModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const [view, setView] = useState<AuthView>("social");
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Reset view when modal closes
  useEffect(() => {
    if (!isOpen) {
      const timer = setTimeout(() => {
        setView("social");
        setIsLoading(false);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API Call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    const loggedInUser = {
      name: email ? email.split('@')[0].replace(/[^a-zA-Z0-9]/g, ' ').replace(/\b\w/g, c => c.toUpperCase()) : "George Harrison",
      email: email,
      points: 2450,
      tier: "Vanguard Elite"
    };
    
    try {
      localStorage.setItem("user", JSON.stringify(loggedInUser));
    } catch (e) {
      console.warn("Failed to write user to localStorage in AuthModal:", e);
    }
    setIsLoading(false);
    onClose();
    window.location.href = "/dashboard";
  };

  const handleSocialLogin = (provider: string) => {
    setIsLoading(true);
    console.log(`Connecting to ${provider}...`);
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
        console.warn("Failed to write user to localStorage in AuthModal social login:", e);
      }
      setIsLoading(false);
      onClose();
      window.location.href = "/dashboard";
    }, 800);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 dark:bg-black/90 backdrop-blur-md cursor-pointer"
          />

          {/* Modal Card */}
          <motion.div
            layout
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-md bg-[#0B0F1A]/90 backdrop-blur-2xl border border-white/10 rounded-[2.5rem] p-8 shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden"
          >
            {/* Ambient Glow */}
            <div className="absolute -top-24 -left-24 w-48 h-48 bg-blue-600/20 blur-[80px] pointer-events-none" />
            <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-indigo-600/10 blur-[80px] pointer-events-none" />

            {/* Header Controls */}
            <div className="flex justify-between items-center relative z-20 mb-6">
              {view !== "social" ? (
                <button
                  onClick={() => setView("social")}
                  className="text-gray-400 hover:text-white transition-colors flex items-center gap-2 text-xs font-bold uppercase tracking-widest"
                >
                  <ArrowLeft size={16} /> Back
                </button>
              ) : (
                <div />
              )}
              <button
                onClick={onClose}
                className="text-gray-500 hover:text-white transition-colors p-2 bg-white/5 rounded-full"
              >
                <X size={20} />
              </button>
            </div>

            <div className="relative z-10 text-center">
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-blue-500 mb-2 block">
                {view === "signup" ? "Create Account" : "Member Access"}
              </span>
              <h2 className="text-3xl font-bold text-white mb-8 tracking-tighter">
                {view === "social" && (
                  <>
                    Experience <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">
                      WanderLuxe
                    </span>
                  </>
                )}
                {view === "login" && "Welcome Back"}
                {view === "signup" && "Join the Elite"}
              </h2>

              <AnimatePresence mode="wait">
                {view === "social" ? (
                  <motion.div
                    key="social"
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: 20, opacity: 0 }}
                    className="space-y-4"
                  >
                    <button
                      disabled={isLoading}
                      onClick={() => handleSocialLogin("Google")}
                      className="w-full flex items-center justify-center gap-3 bg-white text-black h-14 rounded-2xl font-black uppercase text-[11px] tracking-widest hover:bg-blue-500 hover:text-white transition-all group active:scale-[0.98] disabled:opacity-50"
                    >
                      {isLoading ? <Loader2 className="animate-spin" size={18} /> : <Chrome size={20} />}
                      Continue with Google
                    </button>

                    <button
                      onClick={() => setView("login")}
                      className="w-full flex items-center justify-center gap-3 bg-white/5 border border-white/10 text-white h-14 rounded-2xl font-black uppercase text-[11px] tracking-widest hover:bg-white/10 transition-all active:scale-[0.98]"
                    >
                      <Mail size={20} />
                      Email Address
                    </button>
                    
                    <p className="mt-6 text-gray-500 text-[11px] font-medium tracking-wide">
                      Don&apos;t have an account?{" "}
                      <button onClick={() => setView("signup")} className="text-blue-400 font-black hover:underline">
                        JOIN NOW
                      </button>
                    </p>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    initial={{ x: 20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: -20, opacity: 0 }}
                    onSubmit={handleSubmit}
                    className="space-y-4 text-left"
                  >
                    <div>
                      <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-4 mb-2 block">
                        Email Address
                      </label>
                      <input
                        required
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="alex@luxury.com"
                        className="w-full bg-white/5 border border-white/10 rounded-2xl h-14 px-6 text-white placeholder:text-white/40 focus:outline-none focus:border-blue-500/50 transition-all"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-4 mb-2 block">
                        Password
                      </label>
                      <input
                        required
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••"
                        className="w-full bg-white/5 border border-white/10 rounded-2xl h-14 px-6 text-white placeholder:text-white/40 focus:outline-none focus:border-blue-500/50 transition-all"
                      />
                    </div>
                    
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="w-full bg-blue-600 hover:bg-blue-500 text-white h-14 rounded-2xl font-black uppercase text-[11px] tracking-widest shadow-lg shadow-blue-600/20 transition-all flex items-center justify-center disabled:opacity-50"
                    >
                      {isLoading ? (
                        <Loader2 className="animate-spin" size={20} />
                      ) : (
                        view === "login" ? "Sign In" : "Create Account"
                      )}
                    </button>
                  </motion.form>
                )}
              </AnimatePresence>

              <p className="mt-8 text-[9px] text-gray-600 tracking-widest uppercase px-4 leading-relaxed">
  By joining, you agree to our{" "}
  <Link
    href="/terms"
    onClick={onClose}
    className="text-gray-400 underline hover:text-white transition-colors"
  >
    Terms of Service
  </Link>{" "}
  &{" "}
  <Link
    href="/privacy"
    onClick={onClose}
    className="text-gray-400 underline hover:text-white transition-colors"
  >
    Privacy Policy
  </Link>
</p>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}