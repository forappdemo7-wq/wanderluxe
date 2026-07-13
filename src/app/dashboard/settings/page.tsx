"use client";

import Link from 'next/link';
import { 
  Lock, 
  Globe, 
  Shield, 
  ChevronRight, 
  Home, 
  Save,
  Trash2,
  Bell
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useState } from 'react';

export default function SettingsPage() {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    setIsSaving(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 800));
    alert("✅ Settings saved successfully!");
    setIsSaving(false);
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-white pb-20">
      <div className="max-w-4xl mx-auto px-6 pt-10 space-y-10">

        {/* Breadcrumbs */}
        <nav className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-zinc-500">
          <Link href="/" className="hover:text-white flex items-center gap-1.5 transition-colors">
            <Home size={14} /> Home
          </Link>
          <ChevronRight size={12} />
          <Link href="/dashboard" className="hover:text-white transition-colors">Dashboard</Link>
          <ChevronRight size={12} />
          <span className="text-white">Settings</span>
        </nav>

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h1 className="text-5xl font-black tracking-tighter">Account Settings</h1>
            <p className="text-zinc-400 mt-2 text-lg">Manage your profile, preferences, and security</p>
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleSave}
            disabled={isSaving}
            className="flex items-center gap-3 bg-white text-black px-10 py-4 rounded-2xl font-black uppercase tracking-widest text-sm hover:bg-blue-600 hover:text-white transition-all disabled:opacity-70 cursor-pointer"
          >
            <Save size={18} />
            {isSaving ? "SAVING..." : "SAVE CHANGES"}
          </motion.button>
        </div>

        <div className="grid gap-8">
          {/* Preferences & Security */}
          <div className="grid md:grid-cols-2 gap-8">
            {/* Preferences */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-zinc-900/70 border border-white/10 backdrop-blur-xl rounded-3xl p-10 space-y-8"
            >
              <div className="flex items-center gap-4 pb-6 border-b border-white/10">
                <div className="p-3 bg-cyan-500/10 rounded-2xl">
                  <Globe className="text-cyan-400" size={28} />
                </div>
                <h2 className="text-2xl font-bold">Preferences</h2>
              </div>

              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-semibold">Push Notifications</p>
                    <p className="text-sm text-zinc-400">Booking updates and special offers</p>
                  </div>
                  <button
                    onClick={() => setNotificationsEnabled(!notificationsEnabled)}
                    className={`w-14 h-7 rounded-full relative transition-all ${notificationsEnabled ? 'bg-blue-600' : 'bg-zinc-700'}`}
                  >
                    <div className={`absolute top-1 w-5 h-5 bg-white rounded-full shadow transition-all ${notificationsEnabled ? 'right-1' : 'left-1'}`} />
                  </button>
                </div>

                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-semibold">Two-Factor Authentication</p>
                    <p className="text-sm text-zinc-400">Extra security for your account</p>
                  </div>
                  <button
                    onClick={() => setTwoFactorEnabled(!twoFactorEnabled)}
                    className={`w-14 h-7 rounded-full relative transition-all ${twoFactorEnabled ? 'bg-blue-600' : 'bg-zinc-700'}`}
                  >
                    <div className={`absolute top-1 w-5 h-5 bg-white rounded-full shadow transition-all ${twoFactorEnabled ? 'right-1' : 'left-1'}`} />
                  </button>
                </div>
              </div>
            </motion.div>

            {/* Security */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-zinc-900/70 border border-white/10 backdrop-blur-xl rounded-3xl p-10 space-y-8"
            >
              <div className="flex items-center gap-4 pb-6 border-b border-white/10">
                <div className="p-3 bg-emerald-500/10 rounded-2xl">
                  <Lock className="text-emerald-400" size={28} />
                </div>
                <h2 className="text-2xl font-bold">Security</h2>
              </div>

              <div className="space-y-4">
                <button className="w-full flex items-center justify-between p-5 hover:bg-white/5 rounded-2xl group transition-all">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-white/5 rounded-2xl group-hover:bg-blue-500/10 transition-colors">
                      <Shield size={22} className="text-zinc-400 group-hover:text-blue-400" />
                    </div>
                    <div className="text-left">
                      <p className="font-semibold">Change Password</p>
                      <p className="text-sm text-zinc-400">Last changed 3 months ago</p>
                    </div>
                  </div>
                  <ChevronRight className="text-zinc-400 group-hover:text-white transition-colors" />
                </button>

                <button className="w-full flex items-center justify-between p-5 hover:bg-white/5 rounded-2xl group transition-all">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-white/5 rounded-2xl group-hover:bg-amber-500/10 transition-colors">
                      <Bell size={22} className="text-zinc-400 group-hover:text-amber-400" />
                    </div>
                    <div className="text-left">
                      <p className="font-semibold">Login Activity</p>
                      <p className="text-sm text-zinc-400">View recent sessions</p>
                    </div>
                  </div>
                  <ChevronRight className="text-zinc-400 group-hover:text-white transition-colors" />
                </button>
              </div>
            </motion.div>
          </div>

          {/* Danger Zone */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="border border-red-500/30 bg-red-950/30 rounded-3xl p-10 flex flex-col md:flex-row items-center justify-between gap-6"
          >
            <div>
              <p className="uppercase text-red-400 text-xs font-black tracking-[0.125em]">Danger Zone</p>
              <p className="text-xl font-bold mt-2">Delete Account</p>
              <p className="text-zinc-400 mt-1 max-w-md">
                This action is permanent. All your bookings, preferences and data will be lost.
              </p>
            </div>
            <button className="flex items-center gap-3 bg-red-600 hover:bg-red-700 px-8 py-4 rounded-2xl text-sm font-black uppercase tracking-widest transition-all">
              <Trash2 size={18} />
              DELETE ACCOUNT
            </button>
          </motion.div>
        </div>
      </div>
    </div>
  );
}