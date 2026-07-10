"use client";

import Image from "next/image";
import { Star, MapPin, ArrowLeft, Heart } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useState } from "react";
import { useParams } from "next/navigation";
import { useCurrency } from "@/context/CurrencyContext";

// ✅ ALL DATA IN ONE PLACE
const DESTINATIONS = {
  d1: {
    title: "The Taj Mahal Palace",
    country: "Mumbai, India",
    price: 450,
    rating: 4.9,
    images: [
      "https://images.pexels.com/photos/1583339/pexels-photo-1583339.jpeg",
      "https://images.pexels.com/photos/358457/pexels-photo-358457.jpeg",
    ],
    description: "Iconic heritage hotel overlooking Gateway of India.",
    amenities: ["Sea View", "Spa", "Fine Dining"],
  },
  d2: {
    title: "Aman Tokyo",
    country: "Tokyo, Japan",
    price: 1200,
    rating: 5.0,
    images: [
      "https://images.pexels.com/photos/2506923/pexels-photo-2506923.jpeg",
      "https://images.pexels.com/photos/237272/pexels-photo-237272.jpeg",
    ],
    description: "Minimalist luxury in the heart of Tokyo.",
    amenities: ["City View", "Onsen Spa", "Fine Dining"],
  },
  d3: {
    title: "Wildflower Hall",
    country: "Shimla, India",
    price: 550,
    rating: 4.8,
    images: [
      "https://images.pexels.com/photos/70441/pexels-photo-70441.jpeg",
      "https://images.pexels.com/photos/338504/pexels-photo-338504.jpeg",
    ],
    description: "Luxury retreat in the Himalayas.",
    amenities: ["Mountain View", "Nature Walks", "Spa"],
  },
  d4: {
    title: "Taj Lake Palace",
    country: "Udaipur, India",
    price: 750,
    rating: 4.9,
    images: [
      "https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg",
      "https://images.pexels.com/photos/1619317/pexels-photo-1619317.jpeg",
    ],
    description: "Floating palace on Lake Pichola.",
    amenities: ["Lake View", "Boat Ride", "Royal Dining"],
  },
  d5: {
    title: "Burj Al Arab",
    country: "Dubai, UAE",
    price: 2500,
    rating: 5.0,
    images: [
      "https://images.unsplash.com/photo-1526495124232-a04e1849168c?auto=format&fit=crop&w=800&q=80",
      "https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg",
    ],
    description: "World’s most luxurious sail-shaped hotel.",
    amenities: ["Butler", "Helipad", "Infinity Pool"],
  },
  d6: {
    title: "Aman-i-Khás",
    country: "Ranthambore, India",
    price: 1800,
    rating: 4.9,
    images: [
      "https://images.pexels.com/photos/301612/pexels-photo-301612.jpeg",
      "https://images.pexels.com/photos/2351649/pexels-photo-2351649.jpeg",
    ],
    description: "Luxury safari camp near tiger reserve.",
    amenities: ["Safari", "Luxury Tents", "Spa"],
  },
};

export default function DestinationPage() {
  const { id } = useParams();
  const { formatPrice } = useCurrency();
  const [fav, setFav] = useState(false);

  const data = DESTINATIONS[id as keyof typeof DESTINATIONS];

  // ✅ 404 HANDLING
  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white bg-black">
        <h1 className="text-3xl font-bold">Destination Not Found</h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white pb-20">

      {/* HERO */}
      <div className="relative h-[70vh] w-full mt-20">
        <Image src={data.images[0]} alt={data.title} fill className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

        {/* BACK */}
        <Link
          href="/destinations"
          className="absolute top-24 left-6 bg-black/40 backdrop-blur-xl border border-white/10 px-4 py-2 rounded-xl flex gap-2"
        >
          <ArrowLeft size={16} /> Back
        </Link>

        {/* FAVORITE */}
        <button
          onClick={() => setFav(!fav)}
          className="absolute top-24 right-6 bg-black/40 p-3 rounded-xl"
        >
          <Heart className={fav ? "text-red-500" : "text-white"} />
        </button>

        {/* TITLE */}
        <div className="absolute bottom-10 left-10">
          <p className="text-blue-400 flex items-center gap-2">
            <MapPin size={14} /> {data.country}
          </p>

          <h1 className="text-5xl font-black">{data.title}</h1>

          <div className="flex gap-2 mt-2">
            <Star className="text-yellow-400" />
            {data.rating}
          </div>
        </div>
      </div>

      {/* CONTENT */}
      <div className="max-w-6xl mx-auto px-6 mt-12 grid lg:grid-cols-3 gap-10">

        {/* LEFT */}
        <div className="lg:col-span-2 space-y-8">
          <div>
            <h2 className="text-2xl font-bold">About</h2>
            <p className="text-gray-400 mt-2">{data.description}</p>
          </div>

          <div>
            <h2 className="text-2xl font-bold">Gallery</h2>
            <div className="grid grid-cols-2 gap-4 mt-4">
              {data.images.map((img, i) => (
                <motion.div key={i} whileHover={{ scale: 1.05 }} className="relative h-48 rounded-2xl overflow-hidden">
                  <Image src={img} alt="" fill className="object-cover" />
                </motion.div>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold">Amenities</h2>
            <div className="flex flex-wrap gap-3 mt-3">
              {data.amenities.map((item) => (
                <span key={item} className="bg-white/10 px-4 py-2 rounded-full text-sm">
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT */}
        <div className="sticky top-28 h-fit">
          <div className="bg-white/5 border border-white/10 p-6 rounded-3xl space-y-6">
            <p className="text-gray-400 text-sm">Starting from</p>
            <p className="text-3xl font-black">{formatPrice(data.price)}</p>

            <button className="w-full bg-blue-600 py-4 rounded-2xl font-bold">
              Book Now
            </button>

            <button className="w-full border border-white/20 py-4 rounded-2xl">
              Contact Concierge
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
