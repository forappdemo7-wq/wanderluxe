"use client";

import Sidebar from "@/components/dashboard/Sidebar";
import Header from "@/components/Header";
import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();

  const [points, setPoints] = useState(2450);

  const getTitle = () => {
    if (pathname.includes("bookings")) return "Bookings";
    if (pathname.includes("payments")) return "Payments";
    if (pathname.includes("wishlist")) return "Wishlist";
    return "Dashboard";
  };

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (!user) router.push("/");
  }, []);

  return (
    <div className="flex min-h-screen bg-zinc-950 text-white">
      <Sidebar />

      <div className="flex-1 lg:ml-72 flex flex-col">
        {/* Top Bar */}
        <div className="h-20 border-b border-white/10 bg-zinc-900/70 backdrop-blur-2xl flex items-center px-8 z-40">
          <div className="flex-1">
            <h1 className="text-2xl font-black tracking-tighter">
              {getTitle()}
            </h1>
          </div>

          {/* Points */}
          <div className="hidden sm:flex items-center gap-3 bg-zinc-800 border border-white/10 rounded-2xl px-6 py-2">
            <span className="text-xs font-black uppercase tracking-widest text-emerald-400">
              Elite Points
            </span>
            <span className="text-2xl font-black tabular-nums text-white">
              {points.toLocaleString()}
            </span>
          </div>
        </div>

        {/* Content */}
        <main className="flex-1 p-6 md:p-10 lg:p-12 overflow-auto scroll-smooth">
          <div className="max-w-7xl mx-auto">
            <Header />
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}