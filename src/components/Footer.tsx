"use client";

import Link from 'next/link';
import { Diamond, Instagram, Twitter, Facebook, ArrowUpRight } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const legalLinks = [
    { name: 'Privacy', href: '/privacy' },
    { name: 'Terms', href: '/terms' },
    { name: 'Cookies', href: '/cookies' },
    { name: 'Security', href: '/security' },
  ];

  const companyLinks = [
    { name: 'About Us', href: '/about' },
    { name: 'Journal', href: '/journal' },
    { name: 'Careers', href: '/careers' },
    { name: 'Contact', href: '/contact' },
  ];

  const servicesLinks = [
    { name: 'Concierge', href: '/concierge' },
    { name: 'Heritage Tours', href: '/heritage' },
    { name: 'Wellness', href: '/wellness' },
    { name: 'Events', href: '/events' },
  ];

  const explorationLinks = [
    { name: 'Destinations', href: '/destinations' },
    { name: 'Private Jets', href: '/jets' },
    { name: 'Island Escapes', href: '/islands' },
    { name: 'Cruises', href: '/cruises' },
  ];

  return (
    <footer className="bg-[#050505] text-white pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Top Section: Brand & Newsletter */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-20 pb-20 border-b border-white/5">
          <div className="space-y-8">
            <Link href="/" className="flex items-center gap-2 group">
              <span className="font-black text-3xl tracking-tighter uppercase">
                Wander<span className="text-blue-500">luxe</span>
              </span>
              <Diamond className="h-6 w-6 text-blue-500 fill-blue-500/20 group-hover:rotate-12 transition-transform" />
            </Link>
            <p className="text-gray-400 text-lg leading-relaxed max-w-md font-light">
              Designing unparalleled journeys for the world's most discerning travelers. 
              Your gateway to the extraordinary.
            </p>
            <div className="flex gap-5">
              {[Instagram, Twitter, Facebook].map((Icon, i) => (
                <button key={i} className="w-12 h-12 flex items-center justify-center bg-white/5 rounded-full hover:bg-blue-600 hover:text-white transition-all duration-500 border border-white/10">
                  <Icon size={18} />
                </button>
              ))}
            </div>
          </div>

          <div className="bg-white/5 p-10 rounded-[2.5rem] border border-white/10 backdrop-blur-sm relative overflow-hidden">
             <div className="absolute -top-24 -right-24 w-64 h-64 bg-blue-600/10 blur-[100px] rounded-full"></div>
             
             <h4 className="text-xs font-black uppercase tracking-[0.3em] text-blue-400 mb-4">Newsletter</h4>
             <h3 className="text-2xl font-bold mb-6">Get exclusive travel invites.</h3>
             
             <div className="relative flex items-center">
                <input 
                  type="email" 
                  placeholder="Email Address"
                  className="w-full bg-black/40 border border-white/10 py-5 px-6 rounded-2xl text-white focus:outline-none focus:border-blue-500/50 transition-all"
                />
                <button className="absolute right-2 bg-blue-600 hover:bg-blue-500 text-white p-3 rounded-xl transition-all">
                  <ArrowUpRight size={20} />
                </button>
             </div>
          </div>
        </div>

        {/* Middle Section: Links */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 mb-20">
          
          {/* Exploration Column */}
          <div>
            <h4 className="font-black uppercase tracking-[0.2em] text-[10px] text-gray-500 mb-8">Exploration</h4>
            <ul className="space-y-4">
              {explorationLinks.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-sm font-medium text-gray-400 hover:text-white transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services Column */}
          <div>
            <h4 className="font-black uppercase tracking-[0.2em] text-[10px] text-gray-500 mb-8">Services</h4>
            <ul className="space-y-4">
              {servicesLinks.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-sm font-medium text-gray-400 hover:text-white transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Company Column */}
          <div>
            <h4 className="font-black uppercase tracking-[0.2em] text-[10px] text-gray-500 mb-8">Company</h4>
            <ul className="space-y-4">
              {companyLinks.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-sm font-medium text-gray-400 hover:text-white transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Column */}
          <div>
            <h4 className="font-black uppercase tracking-[0.2em] text-[10px] text-gray-500 mb-8">Legal</h4>
            <ul className="space-y-4">
              {legalLinks.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-sm font-medium text-gray-400 hover:text-white transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-[10px] font-bold text-gray-600 uppercase tracking-[0.4em]">
            © {currentYear} WANDERLUXE COLLECTIVE
          </p>
          <div className="flex gap-8 text-[10px] font-bold text-gray-600 uppercase tracking-[0.4em]">
             <span>NYC</span>
             <span>PARIS</span>
             <span>TOKYO</span>
             <span>DUBAI</span>
          </div>
        </div>
      </div>
    </footer>
  );
}