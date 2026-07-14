"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Crown, Star, Plane, Compass, Sparkles, Calendar, BookOpen, 
  Clock, RefreshCw, Gift, Award, ShieldCheck, CheckCircle2, ArrowRight, MapPin, ChevronRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import StatCard from '@/components/dashboard/StatCard';
import TripCard from '@/components/dashboard/TripCard';
import QuickActionCard from '@/components/dashboard/QuickActionCard';

interface User {
  name: string;
  email: string;
  points: number;
  tier: string;
  avatar?: string;
}

interface Booking {
  id: string;
  targetName: string;
  targetType: string;
  targetImage: string;
  location: string;
  date: string;
  status: string;
  price?: number;
}

interface Perk {
  id: string;
  title: string;
  description: string;
  iconName: string;
  code: string;
}

const TIER_PERKS: { [tier: string]: Perk[] } = {
  'Royal Sovereign Elite': [
    {
      id: 'rse-lounge',
      title: 'Royal Sovereign Lounge Access',
      description: 'Unlimited access to sovereign private terminals and vintage cellars with premium champagne at 180+ global airports.',
      iconName: 'Wine',
      code: 'WL-ROYAL-LOUNGE-99'
    },
    {
      id: 'rse-chauffeur',
      title: 'Private Chauffeur Airport Transfers',
      description: 'Complimentary Mercedes-Benz S-Class ramp or curb pick-up directly to/from your private aircraft gates.',
      iconName: 'Car',
      code: 'WL-VIP-CHAUFFEUR-01'
    },
    {
      id: 'rse-butler',
      title: 'Dedicated 24/7 Personal Butler',
      description: 'A designated dispatch officer handling real-time customs clearance, gourmet reservation requests, and personal safety.',
      iconName: 'ShieldCheck',
      code: 'WL-DESPATCH-OFFICER'
    }
  ],
  'Vanguard Elite': [
    {
      id: 've-terminal',
      title: 'VIP Jet Ramp Escort',
      description: 'Direct tarmac transfer in premium electric luxury sedans straight to your waiting charter jet boarding steps.',
      iconName: 'Car',
      code: 'WL-RAMP-ESCORT-88'
    },
    {
      id: 've-cellar',
      title: 'Reserve Cellar Allocations',
      description: 'Priority access to private estates vintage tasting programs, custom grand-cru bottle selections pre-stocked in rooms.',
      iconName: 'Wine',
      code: 'WL-CELLAR-VE-45'
    },
    {
      id: 've-priority',
      title: 'Unlimited Suite Upgrades',
      description: 'First-priority space-available luxury villa room upgrades guaranteed on arrival across all global partner properties.',
      iconName: 'Crown',
      code: 'WL-SUITE-GOLDEN'
    }
  ],
  'Royal Elite': [
    {
      id: 're-lounge',
      title: 'Royal Sovereign Lounge Access',
      description: 'Bespoke access to private elite airport lounges featuring customized menus and zero-delay boarding lanes.',
      iconName: 'Coffee',
      code: 'WL-ELITE-LOUNGE-88'
    },
    {
      id: 're-chauffeur',
      title: 'Elite Mercedes Chauffeur',
      description: 'Complimentary private luxury chauffeured transfer on all incoming and outgoing flights under your manifest.',
      iconName: 'Car',
      code: 'WL-MERCD-CHAUFF-12'
    }
  ],
  'Ambassador Gold': [
    {
      id: 'ag-lounge',
      title: 'Global Signature Lounges',
      description: 'Complimentary signature first-class airport lounge access with dedicated workspaces and fine dining.',
      iconName: 'Coffee',
      code: 'WL-SIG-LOUNGE-77'
    },
    {
      id: 'ag-checkout',
      title: 'Guaranteed 4:00 PM Late Checkout',
      description: 'Relax longer. Guaranteed late checkout up to 4:00 PM at partner residences and boutique luxury villas.',
      iconName: 'Clock',
      code: 'WL-LATE-OUT-04'
    }
  ],
  'Prestige Member': [
    {
      id: 'pm-concierge',
      title: 'Priority Airport Welcome',
      description: 'Dedicated airport concierge greeting on arrival to fast-track your baggage and guide you to your transfer.',
      iconName: 'Plane',
      code: 'WL-AIRPORT-MEET-22'
    }
  ]
};

const DEFAULT_BOOKINGS: Booking[] = [
  {
    id: 'b-1',
    targetName: 'The Taj Mahal Palace',
    targetType: 'Stay',
    targetImage: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80',
    location: 'Mumbai, India',
    date: 'Oct 12 - Oct 15, 2026',
    status: 'Confirmed',
    price: 1200
  },
  {
    id: 'b-2',
    targetName: 'Aman Tokyo',
    targetType: 'Stay',
    targetImage: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=800&q=80',
    location: 'Tokyo, Japan',
    date: 'Dec 20 - Dec 28, 2026',
    status: 'Pending',
    price: 3400
  }
];

export default function DashboardPage() {
  const [user, setUser] = useState<User | null>(null);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [claimedPerks, setClaimedPerks] = useState<string[]>([]);
  const [giftClaimed, setGiftClaimed] = useState(false);
  const [loading, setLoading] = useState(true);

  // Load state on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      // 1. Load User
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        try {
          setUser(JSON.parse(storedUser));
        } catch {
          setUser(null);
        }
      }

      // 2. Load and seed Bookings if needed
      const storedBookings = localStorage.getItem("bookings");
      if (storedBookings) {
        try {
          setBookings(JSON.parse(storedBookings));
        } catch {
          setBookings(DEFAULT_BOOKINGS);
          localStorage.setItem("bookings", JSON.stringify(DEFAULT_BOOKINGS));
        }
      } else {
        setBookings(DEFAULT_BOOKINGS);
        localStorage.setItem("bookings", JSON.stringify(DEFAULT_BOOKINGS));
      }

      // 3. Load gift status
      const isGiftClaimed = localStorage.getItem("wl_welcome_gift_claimed") === "true";
      setGiftClaimed(isGiftClaimed);

      // 4. Load claimed perks
      const storedPerks = localStorage.getItem("wl_claimed_perks");
      if (storedPerks) {
        try { setClaimedPerks(JSON.parse(storedPerks)); } catch { }
      }

      setLoading(false);
    }, 0);

    // Synchronize updates
    const syncUpdates = () => {
      const liveUser = localStorage.getItem("user");
      if (liveUser) {
        try { setUser(JSON.parse(liveUser)); } catch { }
      }
      const liveBookings = localStorage.getItem("bookings");
      if (liveBookings) {
        try { setBookings(JSON.parse(liveBookings)); } catch { }
      }
    };

    window.addEventListener("userUpdate", syncUpdates);
    window.addEventListener("bookingsUpdate", syncUpdates);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("userUpdate", syncUpdates);
      window.removeEventListener("bookingsUpdate", syncUpdates);
    };
  }, []);

  const claimGift = () => {
    if (user && !giftClaimed) {
      const updatedUser = {
        ...user,
        points: user.points + 1500
      };
      localStorage.setItem("user", JSON.stringify(updatedUser));
      localStorage.setItem("wl_welcome_gift_claimed", "true");
      setGiftClaimed(true);
      setUser(updatedUser);
      window.dispatchEvent(new Event("userUpdate"));
      alert('Congratulations! Your 1,500 VIP welcome points have been deposited to your manifest. Enjoy premier booking prioritizations.');
    }
  };

  const handleClaimPerk = (id: string) => {
    if (!claimedPerks.includes(id)) {
      const newPerks = [...claimedPerks, id];
      setClaimedPerks(newPerks);
      localStorage.setItem("wl_claimed_perks", JSON.stringify(newPerks));
    }
  };

  const handleCancelBooking = (id: string) => {
    const updated = bookings.map(b => b.id === id ? { ...b, status: 'Cancelled' } : b);
    setBookings(updated);
    localStorage.setItem("bookings", JSON.stringify(updated));
    window.dispatchEvent(new Event("bookingsUpdate"));
  };

  const activeBookings = bookings.filter(b => b.status.toLowerCase() !== 'cancelled');

  // Next level progress calculation
  const getNextLevelInfo = (tier: string) => {
    switch (tier) {
      case 'Initiate Tier':
        return { target: 'Prestige Member', reqPoints: 5000 };
      case 'Prestige Member':
        return { target: 'Ambassador Gold', reqPoints: 10000 };
      case 'Ambassador Gold':
        return { target: 'Royal Elite', reqPoints: 20000 };
      case 'Royal Elite':
        return { target: 'Vanguard Elite', reqPoints: 50000 };
      case 'Vanguard Elite':
        return { target: 'Royal Sovereign Elite', reqPoints: 100000 };
      default:
        return { target: 'Ultimate Sovereign', reqPoints: 150000 };
    }
  };

  if (loading) {
    return (
      <div className="py-20 text-center space-y-4">
        <div className="w-12 h-12 border-2 border-amber-500 border-t-transparent rounded-full animate-spin mx-auto" />
        <p className="text-sm text-zinc-400 font-medium tracking-wide">Syncing your luxury coordinate nodes...</p>
      </div>
    );
  }

  const userTier = user?.tier || 'Vanguard Elite';
  const userPoints = user?.points || 2450;
  const nextLevel = getNextLevelInfo(userTier);
  const progressPercent = Math.min(100, Math.max(10, Math.round((userPoints / nextLevel.reqPoints) * 100)));

  return (
    <div className="space-y-12">
      
      {/* --- BANNER INTERACTION --- */}
      <div className="relative bg-gradient-to-br from-zinc-900 via-zinc-950 to-neutral-950 border border-white/10 rounded-[32px] p-8 md:p-10 shadow-2xl overflow-hidden group">
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-[100px] pointer-events-none group-hover:bg-amber-500/15 transition-all duration-700" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-blue-500/5 rounded-full blur-[100px] pointer-events-none" />
        
        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="text-[10px] bg-amber-500/10 border border-amber-500/20 text-amber-400 px-3.5 py-1 rounded-full font-mono font-black uppercase tracking-wider">
                {userTier}
              </span>
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest">Portal Active</span>
            </div>
            
            <h2 className="text-3xl md:text-4xl font-black tracking-tight text-white leading-tight">
              Welcome back, <span className="bg-gradient-to-r from-white via-zinc-200 to-amber-300 bg-clip-text text-transparent">{user?.name || "George Harrison"}</span>
            </h2>
            
            <p className="text-zinc-400 text-sm max-w-xl leading-relaxed">
              Your private airport dispatch operations and empty-leg coordinate channels are active. Review your active flight logs, claim seasonal points, and manage your private privileges below.
            </p>
          </div>

          <div className="shrink-0 flex items-center gap-4">
            <button
              onClick={claimGift}
              disabled={giftClaimed}
              className={`px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-xs flex items-center gap-2.5 transition-all active:scale-95 cursor-pointer shadow-lg ${
                giftClaimed
                  ? 'bg-zinc-850/50 text-zinc-600 border border-white/5 cursor-not-allowed'
                  : 'bg-amber-400 hover:bg-amber-300 text-slate-950 shadow-amber-500/10'
              }`}
            >
              <Gift size={16} />
              <span>{giftClaimed ? 'Welcome Gift Deposited' : 'Claim 1,500 Elite Points'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* --- STATS GRID --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          label="Total Spent" 
          value={activeBookings.reduce((sum, b) => sum + (b.price || 0), 0) || 4600} 
          index={0} 
        />
        <StatCard 
          label="Nights Stayed" 
          value="14 Nights" 
          index={1} 
        />
        <StatCard 
          label="Loyalty Balance" 
          value={`${userPoints.toLocaleString()} PTS`} 
          color="text-amber-400" 
          index={2} 
        />
        <StatCard 
          label="Private Coordinates" 
          value="06 ACTIVE" 
          color="text-blue-400" 
          index={3} 
        />
      </div>

      {/* --- LOYALTY PROGRESS PROGRESSION --- */}
      <div className="bg-zinc-900/40 border border-white/10 rounded-[32px] p-8 backdrop-blur-xl">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <div>
            <h3 className="text-lg font-black tracking-tight text-white uppercase">Membership Loyalty Progression</h3>
            <p className="text-zinc-400 text-xs mt-1">Unlock the legendary <span className="text-amber-400 font-bold">{nextLevel.target}</span> tier to access sovereign airport terminals.</p>
          </div>
          <div className="text-right font-mono">
            <span className="text-zinc-400 text-xs uppercase font-bold tracking-wider">Status: </span>
            <span className="text-amber-400 text-sm font-black">{progressPercent}% to next rank</span>
          </div>
        </div>
        
        {/* Progress Bar */}
        <div className="w-full bg-zinc-950 rounded-full h-3 border border-white/5 overflow-hidden">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: `${progressPercent}%` }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="h-full bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-600 rounded-full"
          />
        </div>

        <div className="flex justify-between text-[10px] font-black tracking-widest text-zinc-500 uppercase mt-4">
          <span>{userTier} ({userPoints.toLocaleString()} pts)</span>
          <span>{nextLevel.target} ({nextLevel.reqPoints.toLocaleString()} pts)</span>
        </div>
      </div>

      {/* --- REBILD UPCOMING ITINERARIES --- */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Upcoming Bookings Itineraries List */}
        <div className="lg:col-span-8 space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <h2 className="text-2xl font-black text-white tracking-tight uppercase flex items-center gap-2">
                <Calendar size={22} className="text-amber-400" />
                Upcoming Itineraries
              </h2>
              <p className="text-zinc-400 text-xs">Your coordinates, boarding codes, and resort reservation status.</p>
            </div>
            <Link href="/dashboard/bookings" className="text-xs font-black text-blue-400 uppercase tracking-widest hover:text-white transition-colors flex items-center gap-1">
              View All Bookings <ChevronRight size={14} />
            </Link>
          </div>

          <div className="space-y-4">
            <AnimatePresence mode="popLayout">
              {bookings.length === 0 ? (
                <div className="bg-zinc-900/20 border border-dashed border-white/10 rounded-[32px] p-12 text-center space-y-4">
                  <Compass className="w-12 h-12 text-zinc-600 mx-auto" />
                  <p className="text-zinc-400 text-sm font-bold uppercase tracking-wider">No active travel manifests found</p>
                  <p className="text-zinc-500 text-xs max-w-xs mx-auto">Browse our elite destinations, private yachts, and suite experiences to build your itinerary.</p>
                  <Link href="/destinations" className="inline-block bg-white text-black text-xs font-black uppercase tracking-widest px-6 py-3.5 rounded-xl hover:bg-amber-400 transition-colors">
                    Explore Destinations
                  </Link>
                </div>
              ) : (
                bookings.map((booking) => (
                  <TripCard 
                    key={booking.id}
                    booking={booking}
                    onCancelBooking={handleCancelBooking}
                  />
                ))
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* --- VIP PRIVILEGE REDEMPTION --- */}
        <div className="lg:col-span-4 space-y-6">
          <div className="space-y-1">
            <h3 className="text-lg font-black text-white tracking-tight uppercase flex items-center gap-2">
              <Award size={20} className="text-amber-400" />
              Member Perks
            </h3>
            <p className="text-zinc-400 text-xs">Activate local activation coordinates and lounge keys.</p>
          </div>

          <div className="space-y-4">
            {(TIER_PERKS[userTier] || TIER_PERKS['Prestige Member']).map((perk) => {
              const isClaimed = claimedPerks.includes(perk.id);
              return (
                <motion.div
                  key={perk.id}
                  whileHover={{ y: -2 }}
                  className={`border rounded-2xl p-5 flex flex-col justify-between gap-4 transition-all duration-300 ${
                    isClaimed 
                      ? 'bg-emerald-950/20 border-emerald-500/30' 
                      : 'bg-zinc-900/40 border-white/10 hover:border-white/20'
                  }`}
                >
                  <div className="space-y-2">
                    <div className="flex items-start justify-between">
                      <span className="text-[9px] font-mono font-black uppercase tracking-wider bg-zinc-950 border border-white/5 px-2.5 py-0.5 rounded-full text-zinc-400">
                        {perk.title.split(' ')[0]}
                      </span>
                      <span className={`text-[8px] font-mono font-black uppercase tracking-widest px-2 py-0.5 rounded-full ${
                        isClaimed 
                          ? 'bg-emerald-400/10 text-emerald-400 border border-emerald-500/20' 
                          : 'bg-amber-400/10 text-amber-400 border border-amber-500/20 animate-pulse'
                      }`}>
                        {isClaimed ? 'Redeemed' : 'Ready'}
                      </span>
                    </div>

                    <h4 className="font-bold text-sm text-white">{perk.title}</h4>
                    <p className="text-[11px] text-zinc-500 leading-relaxed">{perk.description}</p>
                  </div>

                  <div>
                    {isClaimed ? (
                      <div className="bg-zinc-950/80 border border-emerald-500/10 rounded-xl p-3.5 space-y-1">
                        <span className="text-[8px] text-zinc-500 font-bold uppercase tracking-widest font-mono block">Passcode</span>
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-mono font-bold text-emerald-400 select-all tracking-wider">{perk.code}</span>
                          <span className="text-[8px] font-black text-emerald-400 uppercase tracking-widest flex items-center gap-1">
                            <CheckCircle2 size={10} /> Active
                          </span>
                        </div>
                      </div>
                    ) : (
                      <button
                        onClick={() => handleClaimPerk(perk.id)}
                        className="w-full py-2 bg-white text-black hover:bg-amber-400 hover:text-black transition-all text-[10px] font-black uppercase tracking-widest rounded-xl flex items-center justify-center gap-1 cursor-pointer"
                      >
                        <span>Activate Key</span>
                        <ArrowRight size={12} />
                      </button>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

      </section>

      {/* --- VIP OPERATIONS DESK --- */}
      <section className="space-y-6">
        <div className="space-y-1">
          <h2 className="text-2xl font-black text-white tracking-tight uppercase flex items-center gap-2">
            <Sparkles size={22} className="text-amber-400" />
            VIP Operations Desk
          </h2>
          <p className="text-zinc-400 text-xs">Direct coordinates and dispatch links to premium WanderLuxe modules.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <QuickActionCard 
            title="Bespoke Private Jet Charter"
            description="Instantly request empty-leg routes, custom hangar runway locations, and select gourmet catering manifests."
            buttonText="Configure Private Flight"
            icon={<Plane className="w-5 h-5" />}
            onClick={() => window.location.href = '/jets'}
            accent={true}
          />

          <QuickActionCard 
            title="Consult Virtual Concierge"
            description="Our specialized virtual concierge handles customized itinerary formulation, resort adjustments, and transfers."
            buttonText="Launch Butler Advisor"
            icon={<Sparkles className="w-5 h-5 animate-pulse" />}
            onClick={() => window.location.href = '/concierge'}
          />

          <QuickActionCard 
            title="Explore Secret coordinates"
            description="Discover elite villas, private islands, yachts, and boutique stay networks pinned with live coordinate maps."
            buttonText="Launch Global Map"
            icon={<Compass className="w-5 h-5" />}
            onClick={() => window.location.href = '/destinations'}
          />
        </div>
      </section>

    </div>
  );
}
