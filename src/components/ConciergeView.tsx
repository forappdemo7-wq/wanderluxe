import React, { useState } from 'react';
import { 
  Sparkles, Compass, MapPin, Calendar, Clock, DollarSign, HelpCircle, 
  Check, ChevronRight, MessageSquare, AlertCircle, Bookmark, ClipboardList,
  Flame, Award
} from 'lucide-react';
import { useCurrency } from '../context/CurrencyContext';

interface Activity {
  time: string;
  activity: string;
  location?: string;
  description: string;
  estimatedCost?: string;
}

interface DayPlan {
  day: number;
  theme: string;
  activities: Activity[];
}

interface Itinerary {
  id?: string;
  destination: string;
  summary: string;
  dailyPlans: DayPlan[];
  travelTips?: string[];
}

interface ConciergeViewProps {
  user: { name: string; email: string; points: number; tier: string } | null;
  onLoginClick: () => void;
  onSaveItineraryToBookings: (itinerary: Itinerary) => void;
}

export default function ConciergeView({ user, onLoginClick, onSaveItineraryToBookings }: ConciergeViewProps) {
  const { formatPrice } = useCurrency();
  
  // Form state
  const [destination, setDestination] = useState('');
  const [days, setDays] = useState(3);
  const [budget, setBudget] = useState('moderate');
  const [interests, setInterests] = useState<string[]>([]);
  const [notes, setNotes] = useState('');
  
  // App state
  const [loading, setLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [itinerary, setItinerary] = useState<Itinerary | null>(null);
  const [activeDay, setActiveDay] = useState(1);
  const [isSaved, setIsSaved] = useState(false);

  const interestOptions = [
    { id: 'dining', label: '🍽️ Gourmet Michelin Dining' },
    { id: 'heritage', label: '🏮 Historic Castles & Heritage' },
    { id: 'outdoor', label: '🏔️ Wilderness Hiking & Safaris' },
    { id: 'wellness', label: '🌿 Zen Spas & Private Wellness' },
    { id: 'art', label: '🎨 Modern Galleries & Design' },
    { id: 'beach', label: '🏖️ Hidden Lagoons & Reefs' }
  ];

  const loadingSteps = [
    '🛰️ Establishing connection to global concierge registry...',
    '🏔️ Analyzing topography and optimal flight routes...',
    '🏨 Cross-referencing five-star hotel availabilities...',
    '🍽️ Securing priority chef seating at local venues...',
    '✨ Injecting premium curated travel instructions...'
  ];

  const toggleInterest = (id: string) => {
    if (interests.includes(id)) {
      setInterests(interests.filter(i => i !== id));
    } else {
      setInterests([...interests, id]);
    }
  };

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!destination.trim()) {
      setError('Please provide a beautiful destination name.');
      return;
    }

    setLoading(true);
    setError(null);
    setItinerary(null);
    setIsSaved(false);
    setLoadingStep(0);

    // Rotate loading messages
    const stepInterval = setInterval(() => {
      setLoadingStep(prev => {
        if (prev < loadingSteps.length - 1) return prev + 1;
        return prev;
      });
    }, 1200);

    try {
      const response = await fetch('/api/itinerary', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          destination,
          days,
          budget,
          interests,
          notes
        })
      });

      if (!response.ok) {
        throw new Error('Failed to reach AI concierge. Offline/mock simulation failed.');
      }

      const data = await response.json();
      setItinerary(data);
      setActiveDay(1);

    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Concierge connection was interrupted.');
    } finally {
      clearInterval(stepInterval);
      setLoading(false);
    }
  };

  const handleSaveToDashboard = () => {
    if (!itinerary) return;
    onSaveItineraryToBookings(itinerary);
    setIsSaved(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 space-y-10 animate-in fade-in duration-300">
      
      {/* Banner Intro */}
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <span className="text-[10px] bg-amber-400 text-slate-950 px-3 py-1 rounded-full font-extrabold uppercase tracking-widest font-mono">
          24/7 AI Butler Service
        </span>
        <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-950">
          The Bespoke AI Concierge
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 leading-relaxed font-medium">
          Leverage our server-side Gemini intelligence engine to instantly assemble detailed, day-by-day travel manifests based on your personal budget and gourmet interests.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-start">
        
        {/* Planner Settings Form */}
        <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-6">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
            <Compass className="w-5 h-5 text-amber-500 animate-spin" style={{ animationDuration: '15s' }} />
            <h3 className="font-extrabold text-sm uppercase tracking-wider font-mono text-slate-900">Configure Expedition</h3>
          </div>

          <form onSubmit={handleGenerate} className="space-y-5">
            
            {/* Destination */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-slate-400" /> Destination Region
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Amalfi Coast, Maldives, Kyoto..."
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                className="w-full text-xs p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-1 focus:ring-amber-500 focus:bg-white outline-none transition-all font-semibold"
              />
              <div className="flex flex-wrap gap-1 mt-1 text-[9px] font-bold text-slate-400">
                <span>Quick:</span>
                {(['Bali', 'Tokyo', 'Paris', 'New York'] as const).map(d => (
                  <button
                    key={d}
                    type="button"
                    onClick={() => setDestination(d)}
                    className="hover:text-amber-600 underline cursor-pointer"
                  >
                    {d}
                  </button>
                ))}
              </div>
            </div>

            {/* Duration Days */}
            <div className="space-y-1.5">
              <div className="flex justify-between items-center text-xs">
                <label className="font-bold text-slate-700 flex items-center gap-1.5">
                  <Calendar className="w-4 h-4 text-slate-400" /> Journey Duration
                </label>
                <span className="font-mono font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full">{days} Days</span>
              </div>
              <input
                type="range"
                min="1"
                max="7"
                value={days}
                onChange={(e) => setDays(Number(e.target.value))}
                className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-amber-500"
              />
              <span className="text-[9px] text-slate-400 font-bold font-mono block text-right">Max 7 days for fast token limits</span>
            </div>

            {/* Budget Class */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                <DollarSign className="w-4 h-4 text-slate-400" /> Executive Budget Class
              </label>
              <div className="grid grid-cols-3 gap-1.5">
                {[
                  { id: 'budget', label: 'Prestige' },
                  { id: 'moderate', label: 'Grand' },
                  { id: 'luxury', label: 'Royal' }
                ].map(b => (
                  <button
                    key={b.id}
                    type="button"
                    onClick={() => setBudget(b.id)}
                    className={`py-2 px-1 rounded-xl border text-[10px] font-bold uppercase tracking-wider transition-all cursor-pointer ${
                      budget === b.id 
                        ? 'bg-slate-950 border-slate-950 text-amber-400 shadow-sm' 
                        : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    {b.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Interests checklist */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700 block">Personalized Interests</label>
              <div className="grid grid-cols-1 gap-1.5">
                {interestOptions.map(opt => {
                  const selected = interests.includes(opt.id);
                  return (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => toggleInterest(opt.id)}
                      className={`flex items-center justify-between text-left p-2 rounded-xl border text-xs transition-colors cursor-pointer ${
                        selected 
                          ? 'bg-amber-50/50 border-amber-300 text-slate-900 font-bold' 
                          : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      <span>{opt.label}</span>
                      {selected && <Check className="w-3.5 h-3.5 text-amber-600 shrink-0" />}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Special Requests Notes */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 block">Elite Cabin / Special Dining Requirements</label>
              <textarea
                placeholder="e.g. Traveling with business clients, vegetarian dining requests, interest in coastal helicopter charters..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full text-xs p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-1 focus:ring-amber-500 focus:bg-white outline-none transition-all h-20 font-medium placeholder-slate-400"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 bg-slate-950 hover:bg-slate-900 disabled:bg-slate-200 text-amber-400 hover:text-amber-300 font-extrabold text-xs uppercase tracking-widest rounded-xl transition-all shadow-md cursor-pointer flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <div className="w-4.5 h-4.5 border-2 border-amber-400 border-t-transparent rounded-full animate-spin" />
                  <span>Synthesizing travel plan...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  <span>Request Custom Itinerary</span>
                </>
              )}
            </button>

          </form>
        </div>

        {/* Display / Response Area */}
        <div className="lg:col-span-2 space-y-6 min-h-[400px]">
          {error && (
            <div className="p-4 bg-rose-50 border border-rose-100 rounded-2xl text-rose-600 text-xs flex items-center gap-3">
              <AlertCircle className="w-5 h-5 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {loading ? (
            <div className="bg-white border border-slate-200 rounded-3xl p-10 h-full flex flex-col justify-center items-center text-center space-y-6">
              {/* Dynamic pulsing glowing loader */}
              <div className="relative">
                <div className="w-16 h-16 bg-amber-500/10 rounded-full animate-ping" />
                <div className="absolute inset-0 w-16 h-16 border-2 border-amber-500 border-t-transparent rounded-full animate-spin" />
                <Compass className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-7 h-7 text-amber-500" />
              </div>
              <div className="space-y-1.5 max-w-sm">
                <h4 className="font-extrabold text-sm text-slate-900 font-mono tracking-widest uppercase">Consulting AI Butler</h4>
                <p className="text-xs text-slate-500 leading-relaxed font-semibold transition-all">
                  {loadingSteps[loadingStep]}
                </p>
              </div>
            </div>
          ) : !itinerary ? (
            <div className="bg-slate-50 border border-slate-200 border-dashed rounded-3xl p-12 text-center space-y-4 h-full flex flex-col justify-center items-center">
              <div className="w-12 h-12 bg-white text-slate-400 rounded-2xl flex items-center justify-center shadow-sm">
                <MessageSquare className="w-6 h-6" />
              </div>
              <h4 className="font-extrabold text-sm text-slate-900">Your custom guide will render here</h4>
              <p className="text-xs text-slate-500 max-w-xs leading-relaxed font-medium">
                Submit your destination preferences and budget tier. Our server-side model will generate a tailored schedule with accurate currency references.
              </p>
            </div>
          ) : (
            <div className="space-y-6 animate-in fade-in duration-300">
              
              {/* Summary Overview Card */}
              <div className="bg-slate-950 text-white rounded-3xl p-6 relative overflow-hidden border border-slate-800 shadow-xl">
                <div className="absolute top-0 right-0 w-32 h-32 bg-amber-400/5 rounded-full filter blur-xl" />
                <div className="relative z-10 space-y-3">
                  <div className="flex items-center justify-between gap-4 flex-wrap">
                    <div>
                      <span className="text-[9px] font-mono font-bold text-amber-400 uppercase tracking-widest">
                        CURATED RESIDENCE EXPEDITION
                      </span>
                      <h3 className="font-black text-xl tracking-tight text-white uppercase">{itinerary.destination}</h3>
                    </div>
                    
                    {user ? (
                      <button
                        type="button"
                        onClick={handleSaveToDashboard}
                        disabled={isSaved}
                        className={`px-4 py-2.5 rounded-xl font-bold text-[10px] uppercase tracking-wider flex items-center gap-1.5 shadow-md transition-all active:scale-95 cursor-pointer ${
                          isSaved 
                            ? 'bg-slate-800 text-slate-500 border border-slate-700' 
                            : 'bg-amber-400 hover:bg-amber-300 text-slate-950'
                        }`}
                      >
                        <Bookmark className="w-3.5 h-3.5" />
                        <span>{isSaved ? 'Manifest Saved' : 'Save Itinerary to Manifest'}</span>
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={onLoginClick}
                        className="px-4 py-2.5 bg-white text-slate-950 rounded-xl font-bold text-[10px] uppercase tracking-wider flex items-center gap-1.5 cursor-pointer"
                      >
                        <Flame className="w-3.5 h-3.5 text-amber-500 animate-pulse" />
                        <span>Sign In to Save</span>
                      </button>
                    )}
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed font-medium">
                    {itinerary.summary}
                  </p>
                </div>
              </div>

              {/* Day Selector Tabs */}
              <div className="flex flex-wrap gap-1 border-b border-slate-200 pb-1">
                {itinerary.dailyPlans.map((dayPlan: DayPlan) => (
                  <button
                    key={dayPlan.day}
                    onClick={() => setActiveDay(dayPlan.day)}
                    className={`px-4.5 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer ${
                      activeDay === dayPlan.day 
                        ? 'bg-slate-950 text-amber-400 shadow-sm' 
                        : 'text-slate-500 hover:bg-slate-50'
                    }`}
                  >
                    Day {dayPlan.day}
                  </button>
                ))}
              </div>

              {/* Activities timeline */}
              <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-6">
                <div>
                  <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider font-mono">
                    Day {activeDay} Theme:
                  </span>
                  <h4 className="font-extrabold text-slate-950 text-sm tracking-tight">
                    {itinerary.dailyPlans.find((d: DayPlan) => d.day === activeDay)?.theme}
                  </h4>
                </div>

                <div className="space-y-6 relative border-l-2 border-amber-200/60 pl-5 ml-2 pt-2 pb-2">
                  {itinerary.dailyPlans.find((d: DayPlan) => d.day === activeDay)?.activities.map((act: Activity, idx: number) => (
                    <div key={idx} className="relative space-y-1.5 animate-in fade-in duration-200">
                      {/* Timeline anchor dot */}
                      <div className="absolute -left-[27px] top-1 w-3.5 h-3.5 rounded-full bg-white border-2 border-amber-400 flex items-center justify-center">
                        <div className="w-1.5 h-1.5 bg-amber-500 rounded-full" />
                      </div>

                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <span className="flex items-center gap-1.5 text-xs font-extrabold text-amber-700 font-mono">
                          <Clock className="w-3.5 h-3.5" />
                          {act.time}
                        </span>
                        
                        {act.estimatedCost && (
                          <span className="text-[10px] font-bold bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full font-mono">
                            💵 {act.estimatedCost}
                          </span>
                        )}
                      </div>

                      <h5 className="font-extrabold text-slate-950 text-xs">
                        {act.activity}
                      </h5>
                      
                      {act.location && (
                        <span className="text-[10px] text-slate-400 font-semibold block">
                          📍 {act.location}
                        </span>
                      )}

                      <p className="text-xs text-slate-500 leading-relaxed font-semibold">
                        {act.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Travel Tips block */}
              {itinerary.travelTips && itinerary.travelTips.length > 0 && (
                <div className="bg-amber-50/50 border border-amber-100 rounded-3xl p-5 space-y-3">
                  <div className="flex items-center gap-2">
                    <Award className="w-4.5 h-4.5 text-amber-600" />
                    <h5 className="font-extrabold text-xs uppercase tracking-wider font-mono text-amber-800">
                      Private Butler Tips
                    </h5>
                  </div>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs text-slate-600 font-semibold leading-relaxed">
                    {itinerary.travelTips.map((tip: string, idx: number) => (
                      <li key={idx} className="flex items-start gap-2">
                        <ChevronRight className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                        <span>{tip}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

            </div>
          )}
        </div>

      </div>

    </div>
  );
}
