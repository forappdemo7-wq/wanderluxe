"use client";

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { 
  User as UserIcon, 
  ChevronRight, 
  Home, 
  Save, 
  Camera, 
  Sparkles, 
  Upload, 
  Globe, 
  Compass, 
  ShieldCheck, 
  QrCode, 
  CheckCircle, 
  Info,
  Sliders,
  Bell,
  Check
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCurrency, type Currency } from '@/context/CurrencyContext';
import { useCursor } from '@/context/CursorContext';

interface UserProfile {
  name: string;
  email: string;
  phone: string;
  avatar: string;
  points: number;
  tier: string;
  memberId: string;
  joinedDate: string;
  preferredStyle: string;
  dietaryPreference: string;
  virtualButler: boolean;
  currency: Currency;
  notifications: {
    itinerary: boolean;
    offers: boolean;
    concierge: boolean;
  };
}

const PRESET_AVATARS = [
  { id: 'av-1', name: 'Elite Jetsetter', url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&h=150&q=80' },
  { id: 'av-2', name: 'High-Net Adventurer', url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&h=150&q=80' },
  { id: 'av-3', name: 'Yacht Captain', url: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=150&h=150&q=80' },
  { id: 'av-4', name: 'Global Connoisseur', url: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&h=150&q=80' },
  { id: 'av-5', name: 'Serene Traveler', url: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=150&h=150&q=80' },
  { id: 'av-6', name: 'Modern Explorer', url: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=150&h=150&q=80' }
];

const TRAVEL_STYLES = [
  { value: 'all-inclusive-luxury', label: 'All-Inclusive Ultra Luxury' },
  { value: 'wellness-spiritual', label: 'Wellness & Spiritual Retreats' },
  { value: 'high-octane-adventure', label: 'High-Octane Expedition & Jetting' },
  { value: 'culinary-cultural', label: 'Epicurean & Cultural Immersion' },
  { value: 'beach-coastal', label: 'Private Island & Coastal Sanctuary' }
];

const DIETARY_PREFERENCES = [
  { value: 'none', label: 'No Dietary Restrictions' },
  { value: 'vegan', label: 'Plant-Based / Vegan' },
  { value: 'halal', label: 'Halal Certified' },
  { value: 'kosher', label: 'Kosher Certified' },
  { value: 'gluten-free', label: 'Gluten-Free Only' }
];

export default function ProfilePage() {
  const { currency, setCurrency } = useCurrency();
  const { butlerEnabled, setButlerEnabled } = useCursor();

  // Primary profile state
  const [profile, setProfile] = useState<UserProfile>({
    name: "George Harrison",
    email: "george@luxury.com",
    phone: "+1 (555) 789-2450",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=George",
    points: 2450,
    tier: "Vanguard Elite",
    memberId: "WL-409-2450",
    joinedDate: "October 2024",
    preferredStyle: "all-inclusive-luxury",
    dietaryPreference: "none",
    virtualButler: true,
    currency: "USD",
    notifications: {
      itinerary: true,
      offers: true,
      concierge: true,
    }
  });

  const [isSaving, setIsSaving] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [avatarTab, setAvatarTab] = useState<'presets' | 'upload' | 'url' | 'dicebear'>('presets');
  const [customUrl, setCustomUrl] = useState('');
  const [dicebearSeed, setDicebearSeed] = useState('');
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Load from local storage
  useEffect(() => {
    try {
      const stored = localStorage.getItem("user");
      if (stored) {
        const parsed = JSON.parse(stored);
        setProfile(prev => ({
          ...prev,
          name: parsed.name || prev.name,
          email: parsed.email || prev.email,
          avatar: parsed.avatar || prev.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${parsed.name || "Alex"}`,
          points: parsed.points !== undefined ? parsed.points : prev.points,
          tier: parsed.tier || prev.tier,
          memberId: parsed.memberId || prev.memberId,
          preferredStyle: parsed.preferredStyle || prev.preferredStyle,
          dietaryPreference: parsed.dietaryPreference || prev.dietaryPreference,
          virtualButler: parsed.virtualButler !== undefined ? parsed.virtualButler : butlerEnabled,
          currency: parsed.currency || currency,
          notifications: parsed.notifications || prev.notifications,
        }));
        if (parsed.avatar && parsed.avatar.startsWith('http') && !parsed.avatar.includes('api.dicebear.com') && !PRESET_AVATARS.some(p => p.url === parsed.avatar)) {
          setCustomUrl(parsed.avatar);
        }
      }
    } catch (e) {
      console.warn("Failed to parse user profile from localStorage", e);
    }
  }, [currency, butlerEnabled]);

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  // Drag and drop event handlers
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const processFile = (file: File) => {
    if (!file.type.startsWith('image/')) {
      showToast("❌ Only image files are supported");
      return;
    }
    if (file.size > 2 * 1024 * 1024) {
      showToast("❌ Image must be smaller than 2MB");
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target?.result && typeof event.target.result === 'string') {
        setProfile(prev => ({ ...prev, avatar: event.target!.result as string }));
        showToast("📸 Profile photo uploaded!");
      }
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      processFile(e.target.files[0]);
    }
  };

  const triggerFileSelect = () => {
    fileInputRef.current?.click();
  };

  // Submit changes
  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    // Simulate luxury sync delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    try {
      const updatedUser = {
        name: profile.name,
        email: profile.email,
        points: profile.points,
        tier: profile.tier,
        avatar: profile.avatar,
        phone: profile.phone,
        memberId: profile.memberId,
        preferredStyle: profile.preferredStyle,
        dietaryPreference: profile.dietaryPreference,
        virtualButler: profile.virtualButler,
        currency: profile.currency,
        notifications: profile.notifications
      };

      localStorage.setItem("user", JSON.stringify(updatedUser));
      
      // Update global context states
      if (profile.currency !== currency) {
        setCurrency(profile.currency);
      }
      if (profile.virtualButler !== butlerEnabled) {
        setButlerEnabled(profile.virtualButler);
      }

      // Dispatch custom update event for immediate sync across Navbar/Sidebar
      window.dispatchEvent(new Event("userUpdate"));

      showToast("✨ Elite profile credentials updated successfully!");
    } catch (err) {
      console.error(err);
      showToast("❌ Profile update failed");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-white pb-24">
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-zinc-500 mb-8">
        <Link href="/" className="hover:text-white flex items-center gap-1.5 transition-colors">
          <Home size={14} /> Home
        </Link>
        <ChevronRight size={12} />
        <Link href="/dashboard" className="hover:text-white transition-colors">Dashboard</Link>
        <ChevronRight size={12} />
        <span className="text-white">Elite Profile</span>
      </nav>

      {/* Toast Alert */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: -50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.9 }}
            className="fixed top-6 left-1/2 -translate-x-1/2 z-50 bg-gradient-to-r from-amber-500 to-yellow-500 text-zinc-950 px-8 py-4 rounded-2xl shadow-2xl font-black uppercase tracking-widest text-xs flex items-center gap-3 border border-amber-400"
          >
            <CheckCircle size={18} className="text-zinc-950 stroke-[3]" />
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header */}
      <div className="flex flex-col xl:flex-row xl:items-end justify-between gap-6 mb-12">
        <div>
          <span className="text-[10px] font-black uppercase tracking-[0.4em] text-amber-500 block mb-2">Exclusive Membership Credentials</span>
          <h1 className="text-4xl md:text-5xl font-black tracking-tighter">Elite Profile Lounge</h1>
          <p className="text-zinc-400 mt-2 text-base md:text-lg">Tailor your personal luxury credentials, profile photography, and travel preferences.</p>
        </div>

        <motion.button
          whileHover={{ scale: 1.02, y: -2 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleSaveProfile}
          disabled={isSaving}
          className="flex items-center justify-center gap-3 bg-gradient-to-r from-amber-500 to-yellow-500 text-zinc-950 px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-xs hover:from-amber-400 hover:to-yellow-400 transition-all disabled:opacity-70 cursor-pointer shadow-lg shadow-amber-500/10"
        >
          {isSaving ? (
            <>
              <div className="w-4 h-4 border-2 border-t-transparent border-zinc-950 rounded-full animate-spin" />
              <span>SYNCING...</span>
            </>
          ) : (
            <>
              <Save size={16} className="stroke-[2.5]" />
              <span>SAVE CREDENTIALS</span>
            </>
          )}
        </motion.button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Skeuomorphic Member Card & Photo Editing */}
        <div className="lg:col-span-5 space-y-8">
          {/* Skeuomorphic Elite Member Card */}
          <div className="relative group">
            {/* Ambient card glow */}
            <div className="absolute -inset-1.5 bg-gradient-to-r from-amber-500/20 to-yellow-500/10 rounded-[32px] blur-xl opacity-70 group-hover:opacity-100 transition duration-1000" />
            
            <div className="relative aspect-[1.58/1] w-full rounded-[30px] p-8 overflow-hidden bg-gradient-to-br from-zinc-900 via-neutral-900 to-zinc-950 border border-white/10 flex flex-col justify-between shadow-2xl">
              {/* Gold card grain overlay */}
              <div className="absolute inset-0 bg-noise opacity-5 pointer-events-none" />
              
              {/* Card Header */}
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-[10px] font-black uppercase tracking-[0.3em] text-amber-500">WanderLuxe</p>
                  <p className="text-[8px] font-bold uppercase tracking-wider text-zinc-500 mt-0.5">Private Flight & Stay Manifest</p>
                </div>
                <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500/20 to-yellow-500/20 flex items-center justify-center border border-amber-500/30">
                  <Sparkles size={18} className="text-amber-400" />
                </div>
              </div>

              {/* Card Body - Name and Info */}
              <div className="space-y-2">
                <p className="text-xl font-black text-white tracking-tight uppercase truncate">
                  {profile.name}
                </p>
                <div className="flex justify-between items-end border-t border-white/5 pt-3">
                  <div>
                    <p className="text-[8px] font-bold text-zinc-500 uppercase tracking-widest leading-none">MEMBER ID</p>
                    <p className="text-xs font-mono font-bold text-zinc-300 mt-1">{profile.memberId}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[8px] font-bold text-zinc-500 uppercase tracking-widest leading-none">ELITE STATUS</p>
                    <div className="flex items-center gap-1.5 mt-1 justify-end">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      <p className="text-xs font-black text-amber-400 tracking-wider uppercase leading-none">{profile.tier}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Card Footer */}
              <div className="flex justify-between items-center border-t border-white/5 pt-3">
                <p className="text-[8px] font-black text-zinc-500 tracking-widest">
                  EST. {profile.joinedDate.toUpperCase()}
                </p>
                <div className="flex items-center gap-1.5">
                  <QrCode size={16} className="text-zinc-500" />
                  <span className="text-[9px] font-mono font-bold text-zinc-400">WL-2450</span>
                </div>
              </div>
            </div>
          </div>

          {/* Profile Photo Manager */}
          <div className="bg-zinc-900/40 border border-white/10 rounded-[32px] p-8 space-y-6 backdrop-blur-xl">
            <h2 className="text-xl font-bold flex items-center gap-3">
              <div className="p-2 bg-amber-500/10 rounded-xl">
                <Camera className="text-amber-400" size={18} />
              </div>
              Profile Photography
            </h2>

            {/* Current Avatar State */}
            <div className="flex items-center gap-6">
              <div className="relative w-24 h-24 rounded-3xl overflow-hidden border-2 border-amber-500/30 bg-zinc-950 shrink-0">
                <img 
                  src={profile.avatar} 
                  alt="Avatar Preview" 
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    // Fallback to letters avatar if image loading fails
                    (e.target as HTMLImageElement).src = `https://api.dicebear.com/7.x/avataaars/svg?seed=${profile.name}`;
                  }}
                />
              </div>
              <div>
                <p className="font-bold text-sm">Interactive Photo</p>
                <p className="text-zinc-500 text-xs mt-1 leading-relaxed">
                  Select a curated elite portrait, upload your own photograph, or generate custom vector art.
                </p>
              </div>
            </div>

            {/* Photo Tabs Navigation */}
            <div className="flex bg-zinc-950 p-1 rounded-2xl border border-white/5">
              {(['presets', 'upload', 'url', 'dicebear'] as const).map((tab) => (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setAvatarTab(tab)}
                  className={`flex-1 py-2 text-[10px] font-black uppercase tracking-widest rounded-xl transition-all ${
                    avatarTab === tab 
                      ? 'bg-zinc-800 text-amber-400 shadow' 
                      : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Photo Tab Content */}
            <div className="min-h-[140px] flex items-center justify-center">
              {avatarTab === 'presets' && (
                <div className="grid grid-cols-3 gap-3 w-full">
                  {PRESET_AVATARS.map((av) => (
                    <button
                      key={av.id}
                      type="button"
                      onClick={() => setProfile(prev => ({ ...prev, avatar: av.url }))}
                      className={`relative aspect-square rounded-2xl overflow-hidden border-2 transition-all ${
                        profile.avatar === av.url 
                          ? 'border-amber-500 scale-95' 
                          : 'border-transparent hover:border-zinc-700 hover:scale-105'
                      }`}
                    >
                      <img src={av.url} alt={av.name} className="w-full h-full object-cover" />
                      {profile.avatar === av.url && (
                        <div className="absolute inset-0 bg-zinc-950/40 flex items-center justify-center">
                          <Check size={16} className="text-amber-400 stroke-[3]" />
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              )}

              {avatarTab === 'upload' && (
                <div 
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  onClick={triggerFileSelect}
                  className={`w-full border-2 border-dashed rounded-3xl p-6 text-center cursor-pointer transition-all flex flex-col items-center justify-center gap-3 ${
                    isDragging 
                      ? 'border-amber-500 bg-amber-500/5' 
                      : 'border-white/10 hover:border-white/20 hover:bg-white/5'
                  }`}
                >
                  <input 
                    type="file" 
                    ref={fileInputRef}
                    onChange={handleFileSelect}
                    accept="image/*"
                    className="hidden" 
                  />
                  <div className="p-3 bg-zinc-800 rounded-2xl text-zinc-400">
                    <Upload size={20} />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-zinc-200">Drag and drop file here</p>
                    <p className="text-[10px] text-zinc-500 mt-1">or click to browse local files (Max 2MB)</p>
                  </div>
                </div>
              )}

              {avatarTab === 'url' && (
                <div className="w-full space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500">CUSTOM PHOTO URL</label>
                  <div className="flex gap-2">
                    <input 
                      type="url"
                      placeholder="https://images.unsplash.com/photo-..."
                      value={customUrl}
                      onChange={(e) => {
                        setCustomUrl(e.target.value);
                        if (e.target.value) {
                          setProfile(prev => ({ ...prev, avatar: e.target.value }));
                        }
                      }}
                      className="flex-1 bg-zinc-950 border border-white/10 rounded-2xl px-4 py-3 text-sm focus:border-amber-500 outline-none transition-all"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        if (customUrl) {
                          setProfile(prev => ({ ...prev, avatar: customUrl }));
                          showToast("📸 Custom URL avatar set!");
                        }
                      }}
                      className="bg-zinc-800 hover:bg-zinc-700 px-4 rounded-2xl text-xs font-bold uppercase text-amber-400"
                    >
                      Apply
                    </button>
                  </div>
                  <p className="text-[10px] text-zinc-500">Provide an absolute URL of any web photograph.</p>
                </div>
              )}

              {avatarTab === 'dicebear' && (
                <div className="w-full space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500">VECTOR SEED NAME</label>
                  <div className="flex gap-2">
                    <input 
                      type="text"
                      placeholder="e.g. ExplorerGeorge"
                      value={dicebearSeed}
                      onChange={(e) => {
                        setDicebearSeed(e.target.value);
                        if (e.target.value) {
                          const newAvatar = `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(e.target.value)}`;
                          setProfile(prev => ({ ...prev, avatar: newAvatar }));
                        }
                      }}
                      className="flex-1 bg-zinc-950 border border-white/10 rounded-2xl px-4 py-3 text-sm focus:border-amber-500 outline-none transition-all"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        if (dicebearSeed) {
                          const newAvatar = `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(dicebearSeed)}`;
                          setProfile(prev => ({ ...prev, avatar: newAvatar }));
                          showToast("🎨 Custom seed avatar generated!");
                        }
                      }}
                      className="bg-zinc-800 hover:bg-zinc-700 px-4 rounded-2xl text-xs font-bold uppercase text-amber-400"
                    >
                      Gen
                    </button>
                  </div>
                  <p className="text-[10px] text-zinc-500">Type any phrase to generate a unique digital avatar.</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Column: Profile Form Details & Travel Settings */}
        <form onSubmit={handleSaveProfile} className="lg:col-span-7 space-y-8">
          {/* Member Profile Card Details */}
          <div className="bg-zinc-900/40 border border-white/10 rounded-[32px] p-8 space-y-8 backdrop-blur-xl">
            <h2 className="text-xl font-bold flex items-center gap-3">
              <div className="p-2 bg-amber-500/10 rounded-xl">
                <Sliders className="text-amber-400" size={18} />
              </div>
              General Profile Settings
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500">FULL NAME</label>
                <input 
                  type="text" 
                  value={profile.name}
                  onChange={(e) => setProfile(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full bg-zinc-950 border border-white/10 rounded-2xl px-5 py-3.5 text-sm font-medium focus:border-amber-500 outline-none transition-all"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500">EMAIL ADDRESS</label>
                <input 
                  type="email" 
                  value={profile.email}
                  onChange={(e) => setProfile(prev => ({ ...prev, email: e.target.value }))}
                  className="w-full bg-zinc-950 border border-white/10 rounded-2xl px-5 py-3.5 text-sm font-medium focus:border-amber-500 outline-none transition-all"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500">PHONE NUMBER</label>
                <input 
                  type="text" 
                  value={profile.phone}
                  onChange={(e) => setProfile(prev => ({ ...prev, phone: e.target.value }))}
                  className="w-full bg-zinc-950 border border-white/10 rounded-2xl px-5 py-3.5 text-sm font-medium focus:border-amber-500 outline-none transition-all"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500">MEMBERSHIP NUMBER</label>
                <input 
                  type="text" 
                  value={profile.memberId}
                  className="w-full bg-zinc-950/50 border border-white/5 rounded-2xl px-5 py-3.5 text-sm font-medium outline-none text-zinc-500 cursor-not-allowed font-mono"
                  readOnly
                />
              </div>
            </div>
          </div>

          {/* Travel Preferences */}
          <div className="bg-zinc-900/40 border border-white/10 rounded-[32px] p-8 space-y-8 backdrop-blur-xl">
            <h2 className="text-xl font-bold flex items-center gap-3">
              <div className="p-2 bg-amber-500/10 rounded-xl">
                <Compass className="text-amber-400" size={18} />
              </div>
              Bespoke Preferences
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500">PREFERRED TRAVEL LUXURY STYLE</label>
                <select
                  value={profile.preferredStyle}
                  onChange={(e) => setProfile(prev => ({ ...prev, preferredStyle: e.target.value }))}
                  className="w-full bg-zinc-950 border border-white/10 rounded-2xl px-5 py-3.5 text-sm font-medium focus:border-amber-500 outline-none transition-all cursor-pointer appearance-none"
                >
                  {TRAVEL_STYLES.map((style) => (
                    <option key={style.value} value={style.value} className="bg-zinc-900">
                      {style.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500">DIETARY CRITERIA</label>
                <select
                  value={profile.dietaryPreference}
                  onChange={(e) => setProfile(prev => ({ ...prev, dietaryPreference: e.target.value }))}
                  className="w-full bg-zinc-950 border border-white/10 rounded-2xl px-5 py-3.5 text-sm font-medium focus:border-amber-500 outline-none transition-all cursor-pointer appearance-none"
                >
                  {DIETARY_PREFERENCES.map((diet) => (
                    <option key={diet.value} value={diet.value} className="bg-zinc-900">
                      {diet.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500">DEFAULT PORTAL CURRENCY</label>
                <select
                  value={profile.currency}
                  onChange={(e) => setProfile(prev => ({ ...prev, currency: e.target.value as Currency }))}
                  className="w-full bg-zinc-950 border border-white/10 rounded-2xl px-5 py-3.5 text-sm font-medium focus:border-amber-500 outline-none transition-all cursor-pointer appearance-none"
                >
                  <option value="USD">USD ($)</option>
                  <option value="EUR">EUR (€)</option>
                  <option value="GBP">GBP (£)</option>
                  <option value="JPY">JPY (¥)</option>
                  <option value="INR">INR (₹)</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500">MEMBERSHIP INCEPTION</label>
                <div className="w-full bg-zinc-950/50 border border-white/5 rounded-2xl px-5 py-3.5 text-sm font-medium text-zinc-500 font-semibold cursor-not-allowed">
                  {profile.joinedDate}
                </div>
              </div>
            </div>

            <div className="border-t border-white/5 pt-6 space-y-6">
              {/* Virtual Butler Enablement */}
              <div className="flex justify-between items-center bg-zinc-950/40 p-4 rounded-2xl border border-white/5">
                <div>
                  <p className="font-bold text-sm flex items-center gap-2">
                    Virtual Butler Assistant
                    <span className="bg-amber-500/10 text-amber-400 text-[8px] font-black px-1.5 py-0.5 rounded-full">ELITE ONLY</span>
                  </p>
                  <p className="text-zinc-500 text-xs mt-1">
                    Enable the specialized, holographic concierge assistant across the platform.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setProfile(prev => ({ ...prev, virtualButler: !prev.virtualButler }))}
                  className={`w-12 h-6 rounded-full relative transition-all ${profile.virtualButler ? 'bg-amber-500' : 'bg-zinc-800'}`}
                >
                  <div className={`absolute top-1 w-4 h-4 bg-zinc-950 rounded-full shadow transition-all ${profile.virtualButler ? 'right-1' : 'left-1'}`} />
                </button>
              </div>
            </div>
          </div>

          {/* Premium Notifications */}
          <div className="bg-zinc-900/40 border border-white/10 rounded-[32px] p-8 space-y-6 backdrop-blur-xl">
            <h2 className="text-xl font-bold flex items-center gap-3">
              <div className="p-2 bg-amber-500/10 rounded-xl">
                <Bell className="text-amber-400" size={18} />
              </div>
              Elite Notification Channels
            </h2>

            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm font-bold">Flight & Itinerary Alerting</p>
                  <p className="text-xs text-zinc-500">Real-time terminal gates, private jet flight changes and luxury hotel check-ins.</p>
                </div>
                <button
                  type="button"
                  onClick={() => setProfile(prev => ({ 
                    ...prev, 
                    notifications: { ...prev.notifications, itinerary: !prev.notifications.itinerary } 
                  }))}
                  className={`w-12 h-6 rounded-full relative transition-all ${profile.notifications.itinerary ? 'bg-amber-500' : 'bg-zinc-800'}`}
                >
                  <div className={`absolute top-1 w-4 h-4 bg-zinc-950 rounded-full shadow transition-all ${profile.notifications.itinerary ? 'right-1' : 'left-1'}`} />
                </button>
              </div>

              <div className="flex justify-between items-center border-t border-white/5 pt-4">
                <div>
                  <p className="text-sm font-bold">Signature Curated Offers</p>
                  <p className="text-xs text-zinc-500">Early access access codes to private islands, luxury cruises, and chef reserve tables.</p>
                </div>
                <button
                  type="button"
                  onClick={() => setProfile(prev => ({ 
                    ...prev, 
                    notifications: { ...prev.notifications, offers: !prev.notifications.offers } 
                  }))}
                  className={`w-12 h-6 rounded-full relative transition-all ${profile.notifications.offers ? 'bg-amber-500' : 'bg-zinc-800'}`}
                >
                  <div className={`absolute top-1 w-4 h-4 bg-zinc-950 rounded-full shadow transition-all ${profile.notifications.offers ? 'right-1' : 'left-1'}`} />
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
