"use client";

import { Droplets } from "lucide-react";
import Image from "next/image";

export default function IslandsPage() {
  const islands = [
    {
      name: "Maldives",
      desc: "Over-water villas with private reef access and turquoise lagoons.",
      imageSrc: "https://images.pexels.com/photos/1671429/pexels-photo-1671429.jpeg",
      color: "blue",
    },
    {
      name: "Seychelles",
      desc: "Granite boulders, powder-white sand, and impossibly blue water.",
      imageSrc: "https://images.pexels.com/photos/36216421/pexels-photo-36216421.jpeg",
      color: "emerald",
    },
  ];

  const colorClasses = {
    blue: "text-blue-500",
    emerald: "text-emerald-400",
  };

  return (
    <main className="bg-[#050505] text-white min-h-screen pt-40 pb-24 px-6 relative overflow-hidden">
      
      {/* Ambient background blur */}
      <div className="absolute -top-24 left-1/4 w-[600px] h-[400px] bg-blue-600/5 blur-[120px] rounded-full"></div>
      <div className="absolute bottom-2 w-1/3 right-1/4 h-[300px] bg-emerald-600/5 blur-[100px] rounded-full"></div>

      <div className="max-w-5xl mx-auto relative z-10 text-center">
        
        {/* Badge */}
        <div className="inline-block px-6 py-2 bg-blue-600/20 border border-blue-500/30 rounded-full text-blue-400 text-[10px] font-black uppercase tracking-[0.4em] mb-8">
          Uncharted Territory
        </div>

        {/* Hero Title */}
        <h1 className="text-7xl md:text-9xl font-black uppercase tracking-tighter mb-12">
          Island <span className="text-blue-500 italic">Sanctuaries</span>
        </h1>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {islands.map((island, i) => (
            <div
              key={i}
              className="group h-96 relative rounded-[4rem] border border-white/10 overflow-hidden hover:border-blue-500/30 transition-all"
            >
              
              {/* Image */}
              <Image
                src={island.imageSrc}
                alt={island.name}
                fill
                className="object-cover scale-105 group-hover:scale-100 transition-transform duration-500"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/90" />

              {/* Content */}
              <div className="relative z-10 flex flex-col items-center justify-center h-full p-10 text-center">
                <Droplets
                  className={`${colorClasses[island.color]} mb-4`}
                  size={48}
                />
                <h3 className="text-3xl font-bold mb-3 uppercase">
                  {island.name}
                </h3>
                <p className="text-gray-300 text-[15px] leading-relaxed">
                  {island.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}