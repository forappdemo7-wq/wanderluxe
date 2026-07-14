import React, { useState } from 'react';
import { 
  Plane, Ship, Compass, ShieldAlert, Sparkles, CheckCircle, 
  MapPin, HelpCircle, FileText, Calendar, Users, Star
} from 'lucide-react';
import { useCurrency } from '../context/CurrencyContext';

interface JetsCruisesViewProps {
  user: { name: string; email: string; points: number; tier: string } | null;
  onLoginClick: () => void;
  openQuotePreset?: string;
}

interface Asset {
  id: string;
  name: string;
  description: string;
  capacity: string;
  pricePerHr: number;
  image: string;
  amenities: string[];
}

export default function JetsCruisesView({ user, onLoginClick, openQuotePreset }: JetsCruisesViewProps) {
  const { formatPrice } = useCurrency();
  const [activeTab, setActiveTab] = useState<'jets' | 'yachts' | 'islands'>('jets');
  const [selectedAsset, setSelectedAsset] = useState<Asset | null>(null);
  
  // Charter Form States
  const [date, setDate] = useState('');
  const [passengers, setPassengers] = useState(2);
  const [catering, setCatering] = useState('none');
  const [duration, setDuration] = useState('1');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  // Private assets catalog
  const assets = {
    jets: [
      {
        id: 'jet-g650',
        name: 'Gulfstream G650ER heavy jet',
        description: 'The absolute pinnacle of business aviation. Boasts a maximum range of 7,500 nautical miles, whisper-quiet cabin acoustics, and modular sleeping berths.',
        capacity: 'Up to 16 passengers',
        pricePerHr: 12000,
        image: 'https://images.unsplash.com/photo-1543007630-9710e4a00a20?auto=format&fit=crop&w=800&q=80',
        amenities: ['🍷 Curated caviar & vintage tasting bar', '🛏️ Custom hand-stitched leather master stateroom', '🌐 Ka-Band high-speed orbital satellite Wi-Fi', '👤 Onboard personal flight coordinator']
      },
      {
        id: 'jet-global7500',
        name: 'Bombardier Global 7500 ultra jet',
        description: 'Featuring four distinct living zones, a full-size kitchen, and specialized ergonomic crew suites designed to alleviate long-distance travel fatigue.',
        capacity: 'Up to 19 passengers',
        pricePerHr: 14500,
        image: 'https://images.unsplash.com/photo-1534430480872-3498386e7a0c?auto=format&fit=crop&w=800&q=80',
        amenities: ['🍽️ Michelin-level dynamic gourmet kitchen', '🛁 En-suite shower & premium French body lotions', '🛋️ Nuage zero-gravity lounge chairs', '🔇 Advanced sound suppression insulation']
      }
    ],
    yachts: [
      {
        id: 'yacht-solaris',
        name: 'The Solaris 120m Mega Yacht',
        description: 'A bespoke steel-hulled visual masterpiece featuring a dual helipad network, fully glass-backed swimming pool, and custom onboard beach club.',
        capacity: 'Up to 36 guests',
        pricePerHr: 28000,
        image: 'https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&w=800&q=80',
        amenities: ['🚁 Dual heli-decks for rapid arrival', '🏊 Glass-bottom thermal pool & sauna complex', '🌊 Custom water sports garage with jet skis', '🥂 40-member specialized elite hospitality crew']
      }
    ],
    islands: [
      {
        id: 'island-necker',
        name: 'Necker Island Private Island Retreat',
        description: 'Located in the stunning Caribbean, offering complete isolation, crystal coral lagoons, and customized luxury thatched Balinese-style villas.',
        capacity: 'Exclusive buyouts only',
        pricePerHr: 105000, // Per night
        image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
        amenities: ['🌴 Complete 74-acre private island access', '⛵ Catamaran charters and deep reef dive gear', '🍽️ All-inclusive gourmet dining & open bar', '🎾 Personalized professional tennis coaches']
      }
    ]
  };

  const handleRequestQuote = (asset: Asset) => {
    setSelectedAsset(asset);
    setSuccess(false);
    setError(null);
  };

  const [error, setError] = useState<string | null>(null);

  const handleSubmitQuote = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    setTimeout(() => {
      setSuccess(true);
      setLoading(false);
      setTimeout(() => {
        setSelectedAsset(null);
        setSuccess(false);
      }, 3000);
    }, 1500);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 space-y-10 animate-in fade-in duration-300">
      
      {/* View Header */}
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <span className="text-[10px] bg-amber-400 text-slate-950 px-3 py-1 rounded-full font-extrabold uppercase tracking-widest font-mono">
          Private Charters
        </span>
        <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-950">
          The Private Air & Sea Suite
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 leading-relaxed font-medium">
          Access heavily vetted private jets, custom motor-yachts, and full island buyouts managed directly by Wanderluxe logistics.
        </p>
      </div>

      {/* Selector Tabs */}
      <div className="flex justify-center border-b border-slate-200">
        <div className="flex gap-1 bg-slate-100 p-1 rounded-full border border-slate-200 mb-2">
          <button
            onClick={() => setActiveTab('jets')}
            className={`px-6 py-2 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition-all ${
              activeTab === 'jets' ? 'bg-slate-950 text-amber-400 shadow-md' : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            <Plane className="w-3.5 h-3.5" />
            <span>Private Air</span>
          </button>
          <button
            onClick={() => setActiveTab('yachts')}
            className={`px-6 py-2 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition-all ${
              activeTab === 'yachts' ? 'bg-slate-950 text-amber-400 shadow-md' : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            <Ship className="w-3.5 h-3.5" />
            <span>Superyachts</span>
          </button>
          <button
            onClick={() => setActiveTab('islands')}
            className={`px-6 py-2 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition-all ${
              activeTab === 'islands' ? 'bg-slate-950 text-amber-400 shadow-md' : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            <Compass className="w-3.5 h-3.5" />
            <span>Private Estates</span>
          </button>
        </div>
      </div>

      {/* Catalog Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {assets[activeTab].map((asset) => (
          <div 
            key={asset.id}
            className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow"
          >
            <div>
              {/* Asset image */}
              <div className="relative h-60 bg-slate-100">
                <img 
                  src={asset.image} 
                  alt={asset.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 left-4 px-3 py-1 bg-slate-950/90 text-amber-400 text-[10px] font-black uppercase tracking-wider rounded-full border border-amber-400/20 font-mono">
                  {activeTab === 'islands' ? 'ESTATE BUYOUT' : 'ELITE CHARTER'}
                </div>
              </div>

              {/* Asset content */}
              <div className="p-6 space-y-4">
                <div>
                  <h4 className="font-extrabold text-slate-950 text-lg leading-tight">
                    {asset.name}
                  </h4>
                  <span className="text-[10px] text-slate-400 font-mono font-bold uppercase tracking-wider block mt-1">
                    👥 Capacity: {asset.capacity}
                  </span>
                </div>
                
                <p className="text-xs text-slate-500 leading-relaxed font-semibold">
                  {asset.description}
                </p>

                {/* Amenities checklist */}
                <div className="space-y-2 pt-2 border-t border-slate-100">
                  <span className="text-[9px] uppercase tracking-wider text-slate-400 font-extrabold block font-mono">
                    Luxury Fittings Included:
                  </span>
                  <div className="grid grid-cols-1 gap-1.5">
                    {asset.amenities.map((amenity, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-xs text-slate-600 font-medium">
                        <CheckCircle className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                        <span>{amenity}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Asset action */}
            <div className="p-6 pt-0 border-t border-slate-100 mt-4 flex items-center justify-between gap-4">
              <div>
                <span className="text-[9px] text-slate-400 font-mono font-bold uppercase block">
                  {activeTab === 'islands' ? 'Exclusive buyout per night' : 'Estimated Hourly Charter'}
                </span>
                <span className="text-lg font-black text-slate-950 font-mono">
                  {formatPrice(asset.pricePerHr)}
                </span>
              </div>

              <button
                type="button"
                onClick={() => handleRequestQuote(asset)}
                className="px-5 py-3 bg-slate-950 hover:bg-slate-900 text-amber-400 font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-md cursor-pointer"
              >
                Request Custom Quote
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Quote request modal overlay */}
      {selectedAsset && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-950/70 backdrop-blur-sm" onClick={() => setSelectedAsset(null)} />
          
          <div className="bg-white border border-slate-200 rounded-3xl max-w-md w-full overflow-hidden shadow-2xl z-10">
            {/* Top banner */}
            <div className="bg-slate-950 text-white p-5 flex items-center justify-between border-b border-slate-850">
              <div className="flex items-center gap-2">
                <Plane className="w-4 h-4 text-amber-400 animate-bounce" />
                <h4 className="font-extrabold text-xs uppercase tracking-widest font-mono text-amber-400">Charter Dispatch</h4>
              </div>
              <button 
                onClick={() => setSelectedAsset(null)}
                className="text-slate-400 hover:text-white font-bold"
              >
                ✕
              </button>
            </div>

            {success ? (
              <div className="p-8 text-center space-y-3 animate-in fade-in zoom-in duration-300">
                <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-md">
                  <CheckCircle className="w-7 h-7" />
                </div>
                <h4 className="text-lg font-bold text-slate-950">Quote Request Logged</h4>
                <p className="text-xs text-slate-500 leading-relaxed max-w-xs mx-auto">
                  Your itinerary request has been securely transmitted. A dedicated air coordinator will reach out to verify landing paths.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmitQuote} className="p-6 space-y-4">
                <div className="text-center pb-2">
                  <h5 className="font-bold text-slate-900 text-sm">{selectedAsset.name}</h5>
                  <p className="text-[10px] text-slate-400 mt-0.5">Estimated Hourly: {formatPrice(selectedAsset.pricePerHr)}</p>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Preferred Departure Date</label>
                  <input 
                    type="date" 
                    required 
                    value={date} 
                    onChange={(e) => setDate(e.target.value)} 
                    className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-1 focus:ring-amber-500 focus:bg-white outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700">Total Manifest Passengers</label>
                    <input 
                      type="number" 
                      min="1" 
                      max="20" 
                      required 
                      value={passengers} 
                      onChange={(e) => setPassengers(Number(e.target.value))} 
                      className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-1 focus:ring-amber-500 focus:bg-white outline-none font-semibold"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700">Estimated Duration ({activeTab === 'islands' ? 'Nights' : 'Hours'})</label>
                    <input 
                      type="number" 
                      min="1" 
                      max="10" 
                      required 
                      value={duration} 
                      onChange={(e) => setDuration(e.target.value)} 
                      className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-1 focus:ring-amber-500 focus:bg-white outline-none font-semibold"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 font-mono text-[10px] uppercase block text-amber-600">Onboard Catering Level</label>
                  <select 
                    value={catering} 
                    onChange={(e) => setCatering(e.target.value)}
                    className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none"
                  >
                    <option value="none">Standard premium beverages & snacks</option>
                    <option value="beluga">✨ Beluga Caviar & Champagne Reserve (+ $1,200)</option>
                    <option value="chef">👨‍🍳 Personal Michelin Chef curated menu (+ $2,500)</option>
                  </select>
                </div>

                {user ? (
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3 bg-slate-950 hover:bg-slate-900 disabled:bg-slate-200 text-amber-400 font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
                  >
                    {loading ? (
                      <>
                        <div className="w-4 h-4 border-2 border-amber-400 border-t-transparent rounded-full animate-spin" />
                        <span>Transmitting manifest logs...</span>
                      </>
                    ) : (
                      <span>Request Flight Coordinator Call</span>
                    )}
                  </button>
                ) : (
                  <div className="space-y-2">
                    <div className="flex items-center gap-1.5 p-3 bg-rose-50 border border-rose-100 rounded-xl text-[10px] text-rose-700 font-semibold leading-normal">
                      <ShieldAlert className="w-4 h-4 shrink-0" />
                      <span>Private charter coordinates are restricted to registered Wanderluxe Club Members only. Please sign in.</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedAsset(null);
                        onLoginClick();
                      }}
                      className="w-full py-3 bg-slate-950 text-amber-400 font-bold text-xs uppercase rounded-xl transition-all shadow-md cursor-pointer text-center block"
                    >
                      Authenticate Member Credentials
                    </button>
                  </div>
                )}
              </form>
            )}
          </div>
        </div>
      )}

    </div>
  );
}
