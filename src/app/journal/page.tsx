"use client";

import { ArrowUpRight } from 'lucide-react';
import Link from 'next/link'; // optional: if you wrap items in links

export default function JournalPage() {
  const articles = [
    { title: "The Hidden Fjords of Norway", date: "MAR 2026", category: "EXPEDITION" },
    { title: "Private Island Living", date: "FEB 2026", category: "LIFESTYLE" },
    { title: "The Future of Space Tourism", date: "JAN 2026", category: "FUTURE" },
  ];

  return (
    <main className="bg-[#050505] text-white min-h-screen pt-40 pb-24 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Journal Header */}
        <div className="flex justify-between items-end mb-20">
          <div>
            <h1 className="text-8xl font-black uppercase tracking-tighter leading-none mb-4">
              Journal
            </h1>
            <p className="text-gray-500 font-bold uppercase tracking-[0.4em] text-[10px]">
              Perspectives on Extraordinary Travel
            </p>
          </div>
        </div>

        {/* Articles List */}
        <div className="space-y-4">
          {articles.map((post, i) => (
            <div
              key={i}
              className="group border-b border-white/10 py-12 flex flex-col md:flex-row justify-between items-start md:items-center gap-8 hover:px-8 transition-all duration-500 cursor-pointer"
            >
              <div className="flex gap-12 items-center">
                <span className="text-gray-600 font-black text-sm">{post.date}</span>
                <div>
                  <span className="text-blue-500 font-black text-[10px] tracking-[0.3em] uppercase block mb-2">
                    {post.category}
                  </span>
                  <h3 className="text-3xl md:text-5xl font-bold uppercase tracking-tighter group-hover:text-blue-400 transition-colors">
                    {post.title}
                  </h3>
                </div>
              </div>

              <div className="w-16 h-16 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-blue-600 group-hover:border-blue-600 transition-all">
                <ArrowUpRight size={24} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
