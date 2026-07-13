import React, { useState, useEffect } from 'react';
import { 
  Crown, Star, Plane, Ship, ShieldCheck, HelpCircle, Gift, Compass, 
  Sparkles, Calendar, BookOpen, Clock, AlertCircle, RefreshCw,
  Coffee, Car, Wine, Wifi, Home, Lock, CheckCircle2, Award, ArrowRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import StatCard from './StatCard';
import TripCard from './TripCard';
import QuickActionCard from './QuickActionCard';

interface DashboardViewProps {
  user: { name: string; email: string; points: number; tier: string } | null;
  onLoginClick: () => void;
  onUpdateUserPoints: (points: number) => void;
  setActiveView: (view: string) => void;
  onSelectJetQuote: () => void;
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
    },
    {
      id: 'rse-upgrade',
      title: 'Ultra-Suite Villa Upgrades',
      description: 'Automatic double-category room upgrades guaranteed upon booking at any partner resort, hotel, or private estate.',
      iconName: 'Crown',
      code: 'WL-DOUBLE-UPGRADE'
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
    },
    {
      id: 're-butler',
      title: 'Priority Dispatch Butler',
      description: 'Immediate line to senior travel concierge with instant confirmation for booking modifications.',
      iconName: 'Sparkles',
      code: 'WL-PRIORITY-BUTLER'
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
      id: 'ag-chauffeur',
      title: 'Private Chauffeur Airport Transfer',
      description: 'One complimentary high-end chauffeur transfer between airport and hotel per booking.',
      iconName: 'Car',
      code: 'WL-AMB-CHAUFF-45'
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
    },
    {
      id: 'pm-champagne',
      title: 'Veuve Clicquot Welcome Bottle',
      description: 'A chilled complimentary bottle of premium champagne waiting in your suite or private residence on arrival.',
      iconName: 'Wine',
      code: 'WL-WELCOME-CHAMP'
    },
    {
      id: 'pm-wifi',
      title: 'In-Flight Satellite Broadband',
      description: 'Complimentary unlimited Starlink high-speed internet connectivity on all charter flights.',
      iconName: 'Wifi',
      code: 'WL-SKY-STARLINK'
    }
  ],
  'Initiate Tier': [
    {
      id: 'it-coordinates',
      title: 'Private Residence Coordinates',
      description: 'Exclusive access to our secure private listings, reviews, and dynamic map layers.',
      iconName: 'Home',
      code: 'WL-INITIATE-PORTAL'
    },
    {
      id: 'it-greeting',
      title: 'Signature Welcome Cocktail',
      description: 'Complimentary signature custom-crafted welcome drinks for you and your guests at partner luxury resorts.',
      iconName: 'Wine',
      code: 'WL-COCKTAIL-PASS'
    }
  ]
};

const getIcon = (iconName: string, className: string = "w-5 h-5") => {
  switch (iconName) {
    case 'Coffee': return <Coffee className={className} />;
    case 'Car': return <Car className={className} />;
    case 'Wine': return <Wine className={className} />;
    case 'ShieldCheck': return <ShieldCheck className={className} />;
    case 'Plane': return <Plane className={className} />;
    case 'Clock': return <Clock className={className} />;
    case 'Wifi': return <Wifi className={className} />;
    case 'Award': return <Award className={className} />;
    case 'Home': return <Home className={className} />;
    case 'Lock': return <Lock className={className} />;
    case 'Sparkles': return <Sparkles className={className} />;
    default: return <Sparkles className={className} />;
  }
};

export default function DashboardView({ user, onLoginClick, onUpdateUserPoints, setActiveView, onSelectJetQuote }: DashboardViewProps) {
  const [bookings, setBookings] = useState<{ id: string; status: string; targetName: string; targetType: string; targetImage: string; location: string; date: string }[]>([]);
  const [loading, setLoading] = useState(true);
  const [giftClaimed, setGiftClaimed] = useState(false);
  const [claimedPerks, setClaimedPerks] = useState<string[]>([]);

  const handleClaimPerk = (id: string) => {
    if (!claimedPerks.includes(id)) {
      setClaimedPerks([...claimedPerks, id]);
    }
  };

  const fetchBookings = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/bookings');
      if (response.ok) {
        const data = await response.json();
        setBookings(data);
      }
    } catch (err) {
      console.error('Failed to load bookings:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const handleCancelBookingLocal = (id: string) => {
    // Refresh bookings from the server
    fetchBookings();
  };

  const claimGift = () => {
    if (user && !giftClaimed) {
      onUpdateUserPoints(user.points + 1500); // Give 1,500 bonus points
      setGiftClaimed(true);
      alert('Congratulations! Your 1,500 VIP welcome points have been deposited to your manifest. Enjoy premier booking prioritizations.');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 space-y-10 animate-in fade-in duration-300">
      
      {/* Dashboard Top Banner */}
      <div className="bg-slate-950 text-white rounded-3xl p-6 sm:p-8 relative overflow-hidden border border-slate-800 shadow-xl">
        {/* Abstract luxury geometric mesh lines */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-br from-amber-500/10 to-transparent rounded-full filter blur-2xl pointer-events-none" />
        
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <span className="text-[10px] bg-amber-400 text-slate-950 px-2.5 py-0.5 rounded-full font-mono font-bold uppercase tracking-wider">
              {user ? user.tier : 'Guest Profile'}
            </span>
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight">
              {user ? `Welcome Back, ${user.name}` : 'Welcome, Distinquished Guest'}
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 max-w-xl leading-relaxed">
              {user 
                ? 'Your private airport coordinators are on standby. Explore active schedules, flight logs, and your curated reward tier benefits.'
                : 'Connect your verified club membership credentials to unlock your private flight manifests, custom-tailored stays, and elite member loyalty rewards.'}
            </p>
          </div>

          <div className="shrink-0">
            {user ? (
              <button
                type="button"
                disabled={giftClaimed}
                onClick={claimGift}
                className={`px-5 py-3 rounded-xl font-extrabold text-xs uppercase tracking-wider flex items-center gap-2 shadow-lg transition-all active:scale-95 cursor-pointer ${
                  giftClaimed 
                    ? 'bg-slate-800 text-slate-500 border border-slate-700' 
                    : 'bg-amber-400 hover:bg-amber-300 text-slate-950'
                }`}
              >
                <Gift className="w-4 h-4" />
                <span>{giftClaimed ? 'Loyalty Gift Claimed' : 'Claim 1,500 Welcome Points'}</span>
              </button>
            ) : (
              <button
                onClick={onLoginClick}
                className="px-6 py-3.5 bg-white text-slate-950 hover:bg-slate-100 font-extrabold text-xs uppercase tracking-wider rounded-xl shadow-lg transition-all active:scale-95 cursor-pointer"
              >
                Unlock VIP Dashboard
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Stats overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="Membership Tier"
          value={user ? user.tier : 'Non-Member'}
          subtext={user ? 'Priority Dispatch Level' : 'Sign up to activate'}
          icon={<Crown className="w-5 h-5" />}
          trend={user ? 'Elite Rank' : undefined}
          trendType="positive"
        />
        <StatCard 
          title="Loyalty Balance"
          value={user ? `${user.points.toLocaleString()} pts` : '0 pts'}
          subtext="Convertible for private miles"
          icon={<Star className="w-5 h-5" />}
          trend={user ? '+1,500 pending' : undefined}
          trendType="neutral"
        />
        <StatCard 
          title="Active Manifests"
          value={bookings.filter(b => b.status === 'confirmed').length}
          subtext="Flight & yacht reservations"
          icon={<Plane className="w-5 h-5" />}
          trend="Real-time"
          trendType="positive"
        />
        <StatCard 
          title="Discretion Shield"
          value="Level 5"
          subtext="Manifests encrypted"
          icon={<ShieldCheck className="w-5 h-5" />}
          trend="ACTIVE"
          trendType="positive"
        />
      </div>

      {/* VIP Tier Perks & Privileges Section */}
      <div id="vip-tier-perks-section" className="bg-white border border-slate-200/80 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-amber-500">
              <Award className="w-5 h-5" />
              <span className="text-[10px] font-bold font-mono tracking-wider uppercase">
                Bespoke Club Privileges
              </span>
            </div>
            <h3 className="text-xl font-extrabold text-slate-950 tracking-tight">
              {user ? `Your ${user.tier} Membership Perks` : 'Exclusive Membership Perks Preview'}
            </h3>
            <p className="text-xs text-slate-500 max-w-3xl leading-relaxed">
              {user 
                ? 'These bespoke advantages are actively provisioned for your membership rank. Click "Activate Privilege Pass" to generate local coordinates, activation passes, and boarding priority codes.'
                : 'Log in or sign up to activate elite airfield transfers, custom-tailored villa champagne greetings, and complimentary high-tier partner lounges.'}
            </p>
          </div>
          
          {user ? (
            <div className="shrink-0 bg-slate-50 border border-slate-200/60 rounded-2xl px-4 py-2.5 flex items-center gap-3">
              <div className="text-left">
                <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider block">Manifest Status</span>
                <span className="text-[11px] font-extrabold text-slate-800">
                  {user.tier === 'Royal Sovereign Elite' ? 'Highest Tier Attained' : 'Priority Upgrades Ready'}
                </span>
              </div>
              <div className="bg-amber-400 text-slate-950 text-[10px] font-black uppercase px-2 py-1 rounded-lg">
                VIP LEVEL
              </div>
            </div>
          ) : (
            <button
              onClick={onLoginClick}
              className="shrink-0 px-4 py-2 bg-slate-950 hover:bg-slate-900 text-amber-400 font-bold text-[11px] uppercase tracking-wider rounded-xl transition-all cursor-pointer flex items-center gap-2"
            >
              <span>Unlock All Perks</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {user ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {(TIER_PERKS[user.tier] || TIER_PERKS['Prestige Member']).map((perk) => {
              const isClaimed = claimedPerks.includes(perk.id);
              return (
                <div
                  key={perk.id}
                  id={`perk-card-${perk.id}`}
                  className={`relative border rounded-2xl p-5 flex flex-col justify-between gap-4 transition-all duration-300 ${
                    isClaimed 
                      ? 'bg-emerald-50/40 border-emerald-200 shadow-inner' 
                      : 'bg-slate-50/50 hover:bg-slate-50 border-slate-200/80 hover:border-slate-300'
                  }`}
                >
                  <div className="space-y-3">
                    <div className="flex items-start justify-between">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                        isClaimed ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-700'
                      }`}>
                        {getIcon(perk.iconName)}
                      </div>
                      <span className={`text-[9px] font-mono font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full ${
                        isClaimed 
                          ? 'bg-emerald-100 text-emerald-800' 
                          : 'bg-amber-100 text-amber-800'
                      }`}>
                        {isClaimed ? 'Pass Active' : 'Ready'}
                      </span>
                    </div>

                    <div className="space-y-1">
                      <h4 className="font-extrabold text-sm text-slate-900 tracking-tight">
                        {perk.title}
                      </h4>
                      <p className="text-xs text-slate-500 leading-relaxed">
                        {perk.description}
                      </p>
                    </div>
                  </div>

                  <div className="pt-2">
                    {isClaimed ? (
                      <div className="bg-white border border-emerald-100 rounded-xl p-3 space-y-1.5 animate-in slide-in-from-top-2 duration-200">
                        <span className="text-[9px] text-slate-400 font-bold uppercase tracking-widest font-mono block">Pass Redemption Code</span>
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-mono font-bold text-slate-700 select-all">{perk.code}</span>
                          <span className="text-[9px] font-bold text-emerald-600 uppercase tracking-wider flex items-center gap-1">
                            <CheckCircle2 className="w-3 h-3" /> Activated
                          </span>
                        </div>
                      </div>
                    ) : (
                      <button
                        onClick={() => handleClaimPerk(perk.id)}
                        className="w-full py-2 bg-slate-950 hover:bg-slate-900 text-amber-400 hover:text-amber-300 font-bold text-[11px] uppercase tracking-wider rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5"
                      >
                        <span>Activate Privilege Pass</span>
                        <ArrowRight className="w-3 h-3" />
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                id: 'teaser-lounge',
                title: 'Global Signature Airport Lounges',
                description: 'Bespoke access to private partner first-class lounges globally, featuring dedicated dining rooms and zero-delay boarding.',
                iconName: 'Coffee'
              },
              {
                id: 'teaser-chauffeur',
                title: 'Complimentary Mercedes-Benz Chauffeur',
                description: 'Rolls-Royce or Mercedes-Benz S-Class airport transfer upgrades directly to your custom luxury hotel or villa stay.',
                iconName: 'Car'
              },
              {
                id: 'teaser-upgrade',
                title: 'Signature Champagne & Room Upgrades',
                description: 'Guaranteed space-available room category upgrades and chilled champagne waiting in your suite on arrival.',
                iconName: 'Sparkles'
              }
            ].map((perk) => (
              <div
                key={perk.id}
                id={`perk-teaser-${perk.id}`}
                className="relative border border-slate-100 bg-slate-50/40 rounded-2xl p-5 flex flex-col justify-between gap-4 group transition-all duration-300 hover:border-slate-200"
              >
                <div className="space-y-3">
                  <div className="flex items-start justify-between">
                    <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-400 flex items-center justify-center">
                      {getIcon(perk.iconName)}
                    </div>
                    <span className="text-[9px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-slate-100 text-slate-400 flex items-center gap-1">
                      <Lock className="w-2.5 h-2.5" /> Locked
                    </span>
                  </div>

                  <div className="space-y-1">
                    <h4 className="font-extrabold text-sm text-slate-400 tracking-tight group-hover:text-slate-700 transition-colors">
                      {perk.title}
                    </h4>
                    <p className="text-xs text-slate-400 group-hover:text-slate-500 transition-colors leading-relaxed">
                      {perk.description}
                    </p>
                  </div>
                </div>

                <button
                  onClick={onLoginClick}
                  className="w-full py-2 bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800 font-bold text-[11px] uppercase tracking-wider rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <span>Unlock Member Perks</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Content Columns: Bookings & Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        
        {/* Bookings column */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-extrabold text-lg text-slate-950 tracking-tight flex items-center gap-2">
              <Calendar className="w-5 h-5 text-amber-500" />
              <span>Your Active Travel Manifests</span>
            </h3>
            <button 
              onClick={fetchBookings}
              title="Refresh Bookings"
              className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-500 transition-colors"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
          </div>

          {loading ? (
            <div className="py-20 text-center space-y-2">
              <div className="w-8 h-8 border-2 border-slate-900 border-t-transparent rounded-full animate-spin mx-auto" />
              <p className="text-xs text-slate-500 font-medium">Accessing secure databases...</p>
            </div>
          ) : bookings.length === 0 ? (
            <div className="bg-slate-50 border border-slate-200 border-dashed rounded-3xl py-12 px-6 text-center space-y-3">
              <div className="w-12 h-12 bg-slate-100 text-slate-400 rounded-2xl flex items-center justify-center mx-auto">
                <Compass className="w-6 h-6" />
              </div>
              <h4 className="font-extrabold text-sm text-slate-950">No active bookings found</h4>
              <p className="text-xs text-slate-500 max-w-xs mx-auto leading-relaxed">
                You do not have any active luxury bookings yet. Head to the Explorations map or Private Jets charter suite to plan your next retreat.
              </p>
              <button
                onClick={() => setActiveView('explorations')}
                className="px-4 py-2 bg-slate-950 text-white rounded-xl text-xs font-bold uppercase tracking-wider cursor-pointer"
              >
                Browse Residences & Tours
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {bookings.map((booking) => (
                <TripCard 
                  key={booking.id}
                  booking={booking}
                  onCancelBooking={handleCancelBookingLocal}
                />
              ))}
            </div>
          )}
        </div>

        {/* Quick Actions Column */}
        <div className="space-y-6">
          <h3 className="font-extrabold text-lg text-slate-950 tracking-tight flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-amber-500 animate-pulse" />
            <span>VIP Operations Desk</span>
          </h3>

          <div className="grid grid-cols-1 gap-4">
            
            <QuickActionCard 
              title="Bespoke Private Jet Charter"
              description="Instantly request real-time empty-leg availability, custom runway schedules, and premium onboard caviar selections."
              buttonText="Request Jet Quote"
              icon={<Plane className="w-5 h-5" />}
              onClick={onSelectJetQuote}
              accent={true}
            />

            <QuickActionCard 
              title="Consult AI Butler"
              description="Draft day-by-day vacation itineraries custom-tailored to your precise cultural and gourmet dining interests."
              buttonText="Launch Advisor"
              icon={<Sparkles className="w-5 h-5 animate-pulse" />}
              onClick={() => setActiveView('concierge')}
            />

            <QuickActionCard 
              title="Explore Local Residences"
              description="Filter highly rated luxury villas, boutique suites, and premium beach retreats with live coordinates."
              buttonText="Open World Map"
              icon={<Compass className="w-5 h-5" />}
              onClick={() => setActiveView('explorations')}
            />

          </div>
        </div>

      </div>

    </div>
  );
}
