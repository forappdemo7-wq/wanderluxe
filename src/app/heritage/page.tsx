"use client";

import React from "react";
import { Landmark, Compass, MapPin, Clock, Star, ShieldCheck, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useCurrency } from "@/context/CurrencyContext";

// ✅ CLEAN WORKING IMAGES
const heritageSites = [
  {
    id: "hs-1",
    title: "Pyramids of Giza - Private Dawn Access",
    location: "Egypt",
    duration: "6 Hours",
    rating: 5.0,
    priceUSD: 2800,
    image: "https://images.pexels.com/photos/71241/pexels-photo-71241.jpeg",
    category: "Ancient Wonder",
    description:
      "Walk among the pyramids before the crowds arrive, with exclusive access to the Great Pyramid interior.",
  },
  {
    id: "hs-2",
    title: "Vatican Secret Archives",
    location: "Vatican City",
    duration: "4 Hours",
    rating: 4.9,
    priceUSD: 2200,
    image: "https://images.pexels.com/photos/1796736/pexels-photo-1796736.jpeg",
    category: "Secret Archives",
    description:
      "Handle 500-year-old manuscripts in the Pope's private library.",
  },
  {
    id: "hs-3",
    title: "Machu Picchu - Lost City Trek",
    location: "Peru",
    duration: "8 Hours",
    rating: 5.0,
    priceUSD: 3500,
    image: "https://images.pexels.com/photos/2356045/pexels-photo-2356045.jpeg",
    category: "Lost Civilization",
    description:
      "Private helicopter landing and sunrise ceremony at the Inca citadel.",
  },
];

const exclusiveAccess = [
  {
    id: "ea-1",
    title: "Forbidden City Inner Court",
    location: "Beijing, China",
    image: "https://images.pexels.com/photos/2412603/pexels-photo-2412603.jpeg",
  },
  {
    id: "ea-2",
    title: "Westminster Abbey Poets Corner",
    location: "London, UK",
    image: "https://images.pexels.com/photos/460672/pexels-photo-460672.jpeg",
  },
  {
    id: "ea-3",
    title: "Hagia Sophia Upper Galleries",
    location: "Istanbul, Turkey",
    image: "https://images.pexels.com/photos/1549326/pexels-photo-1549326.jpeg",
  },
];

export default function HeritagePage() {
  const { formatPrice } = useCurrency();

  return (
    <main className="bg-[#050505] text-white min-h-screen pt-40 pb-24 px-6">
      <div className="max-w-6xl mx-auto">

        {/* HERO */}
        <section className="flex flex-col lg:flex-row gap-16 items-center mb-32">
          <div className="lg:w-1/2 space-y-8">
            <h1 className="text-5xl sm:text-6xl lg:text-8xl font-black uppercase leading-none">
              Heritage <br />
              <span className="text-blue-500">Expeditions</span>
            </h1>

            <p className="text-gray-400 text-lg">
              Private access to historical landmarks and cultural treasures.
            </p>
          </div>

          <div className="lg:w-1/2 grid grid-cols-2 gap-4">
            <div className="h-64 bg-white/5 rounded-3xl flex items-center justify-center">
              <Landmark size={50} />
            </div>
            <div className="h-64 bg-blue-500/20 rounded-3xl flex items-center justify-center">
              <Compass size={50} />
            </div>
          </div>
        </section>

        {/* EXPERIENCES */}
        <section className="space-y-24 mb-32">
          {heritageSites.map((site, index) => (
            <div
              key={site.id}
              className={`flex flex-col ${
                index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
              } gap-12 items-center`}
            >
              {/* IMAGE */}
              <div className="w-full lg:w-2/5 overflow-hidden rounded-3xl">
                <Image
                  src={site.image}
                  alt={site.title}
                  width={800}
                  height={600}
                  className="object-cover w-full h-[400px] hover:scale-105 transition"
                />
              </div>

              {/* CONTENT */}
              <div className="w-full lg:w-3/5 space-y-6">
                <span className="text-blue-400 text-xs uppercase">
                  {site.category}
                </span>

                <h2 className="text-4xl lg:text-5xl font-black">
                  {site.title}
                </h2>

                <div className="flex gap-4 text-gray-400 flex-wrap">
                  <div className="flex items-center gap-2">
                    <MapPin size={16} /> {site.location}
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock size={16} /> {site.duration}
                  </div>
                  <div className="flex items-center gap-1 text-yellow-400">
                    <Star size={16} /> {site.rating}
                  </div>
                </div>

                <p className="text-gray-400">{site.description}</p>

                {/* PRICE + BUTTON */}
                <div className="flex flex-col sm:flex-row gap-4 items-center">
                  <div className="text-3xl font-black">
                    from {formatPrice(site.priceUSD)}
                  </div>

                  <Link href={`/heritage/${site.id}`}>
                    <button className="flex items-center gap-2 bg-white text-black px-6 py-3 rounded-full font-bold hover:bg-blue-600 hover:text-white transition">
                      Book Now <ArrowRight size={16} />
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </section>

        {/* EXCLUSIVE */}
        <section className="border-t border-white/10 pt-20">
          <h2 className="text-4xl font-black mb-10 text-center">
            Velvet Rope Access
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {exclusiveAccess.map((item) => (
              <div
                key={item.id}
                className="bg-white/5 border border-white/10 rounded-3xl overflow-hidden hover:shadow-[0_0_40px_rgba(59,130,246,0.25)] transition"
              >
                <Image
                  src={item.image}
                  alt={item.title}
                  width={400}
                  height={300}
                  className="w-full h-60 object-cover"
                />

                <div className="p-6">
                  <h3 className="text-xl font-bold">{item.title}</h3>
                  <p className="text-gray-400 text-sm">{item.location}</p>

                  <div className="flex items-center gap-2 text-blue-400 text-sm mt-3">
                    Private Access <ShieldCheck size={14} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

      </div>
    </main>
  );
}