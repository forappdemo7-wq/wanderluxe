import { useState, useEffect } from 'react';
import { 
  MapPin, Navigation, Info, ZoomIn, ZoomOut, Compass, Sparkles, Hotel, Utensils
} from 'lucide-react';
import { Tour, Hotel as HotelType, Restaurant, Destination } from '../types';

interface InteractiveMapProps {
  destination: Destination;
  tours: Tour[];
  hotels: HotelType[];
  restaurants: Restaurant[];
  selectedItem: Tour | HotelType | Restaurant | null;
  onSelectItem: (item: Tour | HotelType | Restaurant, type: 'tour' | 'hotel' | 'restaurant') => void;
}

export default function InteractiveMap({
  destination,
  tours,
  hotels,
  restaurants,
  selectedItem,
  onSelectItem
}: InteractiveMapProps) {
  const [zoom, setZoom] = useState<number>(1);
  const [activeTab, setActiveTab] = useState<'all' | 'tours' | 'hotels' | 'restaurants'>('all');
  const [showRoute, setShowRoute] = useState<boolean>(true);
  
  // Reset zoom when destination changes
  useEffect(() => {
    const timer = setTimeout(() => {
      setZoom(1);
    }, 0);
    return () => clearTimeout(timer);
  }, [destination]);

  // Find selected hotel for route calculation (simulate routes from the selected hotel)
  const defaultHotel = hotels[0];
  const activeHotel = selectedItem && 'category' in selectedItem ? selectedItem : defaultHotel;

  // Filter items to show on the map based on the activeTab
  const visibleTours = activeTab === 'all' || activeTab === 'tours' ? tours : [];
  const visibleHotels = activeTab === 'all' || activeTab === 'hotels' ? hotels : [];
  const visibleRestaurants = activeTab === 'all' || activeTab === 'restaurants' ? restaurants : [];

  // Generate vector lines for simulated paths from active hotel to other points
  const activePoints = [
    ...tours.map(t => ({ ...t, type: 'tour' as const })),
    ...restaurants.map(r => ({ ...r, type: 'restaurant' as const }))
  ];

  return (
    <div id="interactive-map-container" className="relative w-full h-[360px] md:h-[480px] bg-slate-950 rounded-2xl overflow-hidden shadow-xl border border-slate-800">
      {/* Map Header Overlay */}
      <div className="absolute top-3 left-3 right-3 z-10 flex flex-wrap gap-2 items-center justify-between pointer-events-none">
        <div className="bg-slate-900/90 backdrop-blur-md px-3 py-1.5 rounded-full border border-slate-700/80 flex items-center gap-2 pointer-events-auto shadow-lg">
          <Compass className="w-4 h-4 text-emerald-400 animate-spin-slow" />
          <span className="text-xs font-semibold text-slate-100 font-mono">
            {destination.name} Vector GPS Guide
          </span>
        </div>

        {/* Category Filter Selector */}
        <div className="flex gap-1 bg-slate-900/90 backdrop-blur-md p-1 rounded-full border border-slate-700/80 pointer-events-auto shadow-lg">
          {(['all', 'tours', 'hotels', 'restaurants'] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-2.5 py-1 rounded-full text-[10px] md:text-xs font-medium transition-all ${
                activeTab === tab 
                  ? 'bg-emerald-500 text-slate-950 font-semibold' 
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Map Sidebar / Quick Info Card */}
      <div className="absolute bottom-3 left-3 z-10 bg-slate-900/90 backdrop-blur-md p-3 rounded-xl border border-slate-700/80 max-w-[240px] text-xs pointer-events-auto shadow-lg hidden sm:block">
        <h4 className="font-semibold text-slate-100 mb-1 flex items-center gap-1">
          <Navigation className="w-3.5 h-3.5 text-emerald-400" />
          Map Legend & Details
        </h4>
        <p className="text-[10px] text-slate-400 mb-2 leading-relaxed">
          Explore interactive pins. Tap on any pin to start real-time bookings or submit custom reviews.
        </p>
        <div className="space-y-1 text-[10px]">
          <div className="flex items-center gap-2 text-slate-300">
            <span className="w-2 h-2 rounded-full bg-amber-500 inline-block" />
            <span>Tour Attractions ({tours.length})</span>
          </div>
          <div className="flex items-center gap-2 text-slate-300">
            <span className="w-2 h-2 rounded-full bg-indigo-500 inline-block" />
            <span>Premium Hotels ({hotels.length})</span>
          </div>
          <div className="flex items-center gap-2 text-slate-300">
            <span className="w-2 h-2 rounded-full bg-rose-500 inline-block" />
            <span>Gourmet Restaurants ({restaurants.length})</span>
          </div>
        </div>
        <div className="mt-2.5 pt-2 border-t border-slate-800 flex items-center justify-between">
          <span className="text-[10px] text-slate-400">Show route lines:</span>
          <button 
            onClick={() => setShowRoute(!showRoute)}
            className={`w-8 h-4 rounded-full transition-all relative ${showRoute ? 'bg-emerald-500' : 'bg-slate-700'}`}
          >
            <span className={`absolute top-0.5 w-3 h-3 rounded-full bg-slate-100 transition-all ${showRoute ? 'right-0.5' : 'left-0.5'}`} />
          </button>
        </div>
      </div>

      {/* Map Control Utilities */}
      <div className="absolute bottom-3 right-3 z-10 flex flex-col gap-1.5 pointer-events-auto">
        <button 
          onClick={() => setZoom(prev => Math.min(prev + 0.2, 2))}
          className="w-8 h-8 rounded-lg bg-slate-900/95 border border-slate-700 text-slate-200 flex items-center justify-center hover:bg-slate-800 transition-colors shadow-lg"
          title="Zoom In"
        >
          <ZoomIn className="w-4 h-4" />
        </button>
        <button 
          onClick={() => setZoom(prev => Math.max(prev - 0.2, 0.8))}
          className="w-8 h-8 rounded-lg bg-slate-900/95 border border-slate-700 text-slate-200 flex items-center justify-center hover:bg-slate-800 transition-colors shadow-lg"
          title="Zoom Out"
        >
          <ZoomOut className="w-4 h-4" />
        </button>
        <button 
          onClick={() => { setZoom(1); }}
          className="w-8 h-8 rounded-lg bg-slate-900/95 border border-slate-700 text-slate-200 flex items-center justify-center hover:bg-slate-800 transition-colors shadow-lg text-[10px] font-mono font-bold"
          title="Reset"
        >
          1X
        </button>
      </div>

      {/* Custom Simulated Visual Map View (SVG Vector-drawn landscape) */}
      <div 
        className="w-full h-full relative transition-transform duration-300 origin-center select-none"
        style={{ transform: `scale(${zoom})` }}
      >
        <svg 
          viewBox="0 0 100 100" 
          className="absolute inset-0 w-full h-full text-slate-800/20 fill-slate-900/40"
          preserveAspectRatio="none"
        >
          {/* Decorative Grid Lines */}
          <g stroke="#334155" strokeWidth="0.05" strokeDasharray="1,2">
            <line x1="10" y1="0" x2="10" y2="100" />
            <line x1="20" y1="0" x2="20" y2="100" />
            <line x1="30" y1="0" x2="30" y2="100" />
            <line x1="40" y1="0" x2="40" y2="100" />
            <line x1="50" y1="0" x2="50" y2="100" />
            <line x1="60" y1="0" x2="60" y2="100" />
            <line x1="70" y1="0" x2="70" y2="100" />
            <line x1="80" y1="0" x2="80" y2="100" />
            <line x1="90" y1="0" x2="90" y2="100" />
            <line x1="0" y1="10" x2="100" y2="10" />
            <line x1="0" y1="20" x2="100" y2="20" />
            <line x1="0" y1="30" x2="100" y2="30" />
            <line x1="0" y1="40" x2="100" y2="40" />
            <line x1="0" y1="50" x2="100" y2="50" />
            <line x1="0" y1="60" x2="100" y2="60" />
            <line x1="0" y1="70" x2="100" y2="70" />
            <line x1="0" y1="80" x2="100" y2="80" />
            <line x1="0" y1="90" x2="100" y2="90" />
          </g>

          {/* Destination Specific Vector Landmass / Waterways Simulation */}
          {destination.id === 'dest-bali' && (
            <>
              {/* Bali Outline */}
              <path 
                d="M 15,65 Q 25,50 45,52 Q 60,45 85,55 Q 88,72 65,78 Q 45,82 25,75 Z" 
                fill="#1e293b" 
                stroke="#475569" 
                strokeWidth="0.3" 
              />
              {/* Volcanic Mountains */}
              <polygon points="40,48 48,32 56,48" fill="#0f172a" stroke="#64748b" strokeWidth="0.2" />
              <polygon points="45,46 51,36 57,46" fill="#0f172a" stroke="#64748b" strokeWidth="0.1" />
              {/* Coastlines Lakes */}
              <circle cx="50" cy="42" r="2.5" fill="#082f49" stroke="#0284c7" strokeWidth="0.1" />
            </>
          )}

          {destination.id === 'dest-tokyo' && (
            <>
              {/* Tokyo Bay Outline */}
              <path 
                d="M 10,25 L 85,25 Q 92,45 78,72 Q 62,88 50,65 L 10,65 Z" 
                fill="#1e293b" 
                stroke="#475569" 
                strokeWidth="0.3" 
              />
              <path d="M 65,72 Q 78,85 88,95 L 100,95 L 100,60 Z" fill="#0c4a6e" opacity="0.3" />
              {/* Tokyo Tower icon approximation */}
              <line x1="62" y1="48" x2="62" y2="35" stroke="#ef4444" strokeWidth="0.5" />
              <line x1="60" y1="48" x2="64" y2="48" stroke="#ef4444" strokeWidth="0.5" />
            </>
          )}

          {destination.id === 'dest-paris' && (
            <>
              {/* Landmass block */}
              <rect x="10" y="15" width="80" height="70" rx="5" fill="#1e293b" stroke="#475569" strokeWidth="0.3" />
              {/* Seine River winding through Paris */}
              <path 
                d="M 10,62 Q 25,60 40,48 T 75,44 T 90,32" 
                fill="none" 
                stroke="#0284c7" 
                strokeWidth="2.5" 
                strokeLinecap="round" 
              />
            </>
          )}

          {destination.id === 'dest-ny' && (
            <>
              {/* Manhattan Peninsula */}
              <path d="M 40,15 L 56,15 L 48,85 L 35,85 Z" fill="#1e293b" stroke="#475569" strokeWidth="0.3" />
              {/* Hudson River on left */}
              <path d="M 10,10 L 32,10 L 25,90 L 10,90 Z" fill="#082f49" opacity="0.3" />
              {/* East River on right */}
              <path d="M 64,10 L 90,10 L 75,90 L 58,90 Z" fill="#082f49" opacity="0.3" />
              {/* Central Park block */}
              <rect x="43" y="25" width="6" height="22" fill="#064e3b" opacity="0.5" stroke="#10b981" strokeWidth="0.1" />
            </>
          )}

          {/* ROUTE DOTTED LINES FROM SELECTED HOTEL */}
          {showRoute && activeHotel && (
            <g>
              {activePoints.map((point) => {
                // Only draw route line if both coordinates exist
                if (!point.coordinates || !activeHotel.coordinates) return null;
                const isSelected = selectedItem && selectedItem.id === point.id;
                return (
                  <path
                    key={`route-${point.id}`}
                    d={`M ${activeHotel.coordinates.x} ${activeHotel.coordinates.y} Q ${(activeHotel.coordinates.x + point.coordinates.x)/2 + 4} ${(activeHotel.coordinates.y + point.coordinates.y)/2 - 4} ${point.coordinates.x} ${point.coordinates.y}`}
                    fill="none"
                    stroke={isSelected ? '#10b981' : '#f59e0b'}
                    strokeWidth={isSelected ? '0.6' : '0.25'}
                    strokeDasharray={isSelected ? '1,1' : '1,2'}
                    className={isSelected ? 'animate-pulse' : ''}
                  />
                );
              })}
            </g>
          )}
        </svg>

        {/* INTERACTIVE MARKERS (HTML overlays positioned via absolute percentages) */}
        
        {/* Tours Markers */}
        {visibleTours.map((tour) => {
          const isSelected = selectedItem && selectedItem.id === tour.id;
          return (
            <button
              id={`marker-${tour.id}`}
              key={tour.id}
              onClick={() => onSelectItem(tour, 'tour')}
              className="absolute group z-20 cursor-pointer -translate-x-1/2 -translate-y-1/2 focus:outline-none"
              style={{ left: `${tour.coordinates.x}%`, top: `${tour.coordinates.y}%` }}
            >
              <div className="relative">
                <div className={`p-1.5 rounded-full transition-all flex items-center justify-center ${
                  isSelected 
                    ? 'bg-amber-500 text-slate-950 scale-125 ring-4 ring-amber-500/30' 
                    : 'bg-slate-900 border border-amber-500 text-amber-500 hover:scale-110'
                }`}>
                  <Sparkles className="w-3.5 h-3.5" />
                </div>
                {/* Visual glow pulse for selected */}
                {isSelected && (
                  <span className="absolute -inset-1 rounded-full bg-amber-400/20 animate-ping z-[-1]" />
                )}
                {/* Tooltip on hover */}
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 bg-slate-950 text-slate-100 text-[10px] py-1 px-2 rounded-md whitespace-nowrap shadow-xl border border-slate-700 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none font-medium z-30">
                  {tour.name} • ${tour.pricePerPerson}
                </div>
              </div>
            </button>
          );
        })}

        {/* Hotels Markers */}
        {visibleHotels.map((hotel) => {
          const isSelected = selectedItem && selectedItem.id === hotel.id;
          return (
            <button
              id={`marker-${hotel.id}`}
              key={hotel.id}
              onClick={() => onSelectItem(hotel, 'hotel')}
              className="absolute group z-20 cursor-pointer -translate-x-1/2 -translate-y-1/2 focus:outline-none"
              style={{ left: `${hotel.coordinates.x}%`, top: `${hotel.coordinates.y}%` }}
            >
              <div className="relative">
                <div className={`p-1.5 rounded-full transition-all flex items-center justify-center ${
                  isSelected 
                    ? 'bg-indigo-500 text-slate-100 scale-125 ring-4 ring-indigo-500/30' 
                    : 'bg-slate-900 border border-indigo-400 text-indigo-400 hover:scale-110'
                }`}>
                  <Hotel className="w-3.5 h-3.5" />
                </div>
                {/* Visual glow pulse for selected */}
                {isSelected && (
                  <span className="absolute -inset-1 rounded-full bg-indigo-400/20 animate-ping z-[-1]" />
                )}
                {/* Tooltip on hover */}
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 bg-slate-950 text-slate-100 text-[10px] py-1 px-2 rounded-md whitespace-nowrap shadow-xl border border-slate-700 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none font-medium z-30">
                  {hotel.name} • ${hotel.pricePerNight}/nt
                </div>
              </div>
            </button>
          );
        })}

        {/* Restaurants Markers */}
        {visibleRestaurants.map((restaurant) => {
          const isSelected = selectedItem && selectedItem.id === restaurant.id;
          return (
            <button
              id={`marker-${restaurant.id}`}
              key={restaurant.id}
              onClick={() => onSelectItem(restaurant, 'restaurant')}
              className="absolute group z-20 cursor-pointer -translate-x-1/2 -translate-y-1/2 focus:outline-none"
              style={{ left: `${restaurant.coordinates.x}%`, top: `${restaurant.coordinates.y}%` }}
            >
              <div className="relative">
                <div className={`p-1.5 rounded-full transition-all flex items-center justify-center ${
                  isSelected 
                    ? 'bg-rose-500 text-slate-100 scale-125 ring-4 ring-rose-500/30' 
                    : 'bg-slate-900 border border-rose-400 text-rose-400 hover:scale-110'
                }`}>
                  <Utensils className="w-3.5 h-3.5" />
                </div>
                {/* Visual glow pulse for selected */}
                {isSelected && (
                  <span className="absolute -inset-1 rounded-full bg-rose-400/20 animate-ping z-[-1]" />
                )}
                {/* Tooltip on hover */}
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 bg-slate-950 text-slate-100 text-[10px] py-1 px-2 rounded-md whitespace-nowrap shadow-xl border border-slate-700 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none font-medium z-30">
                  {restaurant.name} • {restaurant.cuisine}
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Floating Active Selection Card (Mobile & General Quick Preview Overlay) */}
      {selectedItem && (
        <div className="absolute bottom-3 left-3 right-3 sm:left-auto sm:right-3 sm:max-w-xs z-35 bg-slate-900/95 backdrop-blur-md p-3.5 rounded-xl border border-emerald-500/40 shadow-2xl flex items-start gap-3 pointer-events-auto transition-all animate-in fade-in slide-in-from-bottom-2 duration-300">
          <img 
            src={selectedItem.image} 
            alt={selectedItem.name} 
            className="w-16 h-16 rounded-lg object-cover border border-slate-700 shrink-0"
          />
          <div className="min-w-0 flex-1">
            <span className="inline-block px-2 py-0.5 rounded-full text-[9px] font-bold uppercase bg-slate-800 text-emerald-400 tracking-wider mb-1">
              {('pricePerPerson' in selectedItem) ? 'Tour Highlight' : ('pricePerNight' in selectedItem) ? 'Hotel / Lodge' : 'Restaurant / Dining'}
            </span>
            <h5 className="font-semibold text-slate-100 text-xs truncate">{selectedItem.name}</h5>
            <p className="text-[10px] text-slate-400 line-clamp-2 mt-0.5 leading-relaxed">{selectedItem.description}</p>
            <div className="flex items-center justify-between mt-2.5">
              <span className="text-xs font-bold text-slate-200">
                {('pricePerPerson' in selectedItem) && `$${selectedItem.pricePerPerson}`}
                {('pricePerNight' in selectedItem) && `$${selectedItem.pricePerNight}/night`}
                {('priceLevel' in selectedItem) && `${selectedItem.priceLevel} • ${selectedItem.cuisine}`}
              </span>
              <div className="flex items-center gap-1">
                <span className="text-amber-400 text-xs">★</span>
                <span className="text-[10px] text-slate-300 font-medium">{selectedItem.rating}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
