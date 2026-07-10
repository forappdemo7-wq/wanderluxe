"use client";

import Link from 'next/link';
import { 
  CreditCard, 
  Calendar, 
  CheckCircle, 
  Clock, 
  Home, 
  ChevronRight, 
  Plus,
  TrendingUp 
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useCurrency } from '@/context/CurrencyContext';
import { useState } from 'react';

const paymentsData = [
  {
    id: 1,
    hotel: 'The Taj Mahal Palace',
    amount: 1200,
    date: 'Oct 10, 2026',
    status: 'Paid'
  },
  {
    id: 2,
    hotel: 'Aman Tokyo',
    amount: 3400,
    date: 'Dec 18, 2026',
    status: 'Pending'
  },
];

export default function PaymentsPage() {
  const { formatPrice } = useCurrency();
  const [isAddingCard, setIsAddingCard] = useState(false);

  const totalSpent = paymentsData.reduce((sum, payment) => sum + payment.amount, 0);
  const availableCredit = 4600;

  return (
    <div className="min-h-screen bg-zinc-950 text-white pb-20">
      <div className="max-w-5xl mx-auto px-6 pt-10 space-y-12">

        {/* Breadcrumbs */}
        <nav className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-zinc-500">
          <Link href="/" className="hover:text-white flex items-center gap-1.5 transition-colors">
            <Home size={14} /> Home
          </Link>
          <ChevronRight size={12} />
          <Link href="/dashboard" className="hover:text-white transition-colors">Dashboard</Link>
          <ChevronRight size={12} />
          <span className="text-white">Payments</span>
        </nav>

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h1 className="text-5xl font-black tracking-tighter">Payments & Billing</h1>
            <p className="text-zinc-400 mt-3 text-lg">Track your luxury journeys and manage payments securely.</p>
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setIsAddingCard(true)}
            className="flex items-center gap-3 bg-white text-black px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-sm hover:bg-blue-600 hover:text-white transition-all shadow-xl"
          >
            <Plus size={18} />
            ADD PAYMENT METHOD
          </motion.button>
        </div>

        {/* Summary Cards */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Luxury Card */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-br from-zinc-900 via-zinc-800 to-black border border-white/10 rounded-3xl p-10 relative overflow-hidden group"
          >
            <div className="absolute top-8 right-8 text-[10px] font-black uppercase tracking-[0.2em] text-blue-400">WANDERLUXE CARD</div>
            
            <div className="relative z-10 flex flex-col h-full justify-between min-h-[240px]">
              <div>
                <p className="text-xs font-black uppercase tracking-widest text-zinc-500">Available Credit</p>
                <p className="text-6xl font-black tracking-tighter mt-3 text-white">
                  {formatPrice(availableCredit)}
                </p>
              </div>

              <div className="flex justify-between items-end">
                <div>
                  <p className="text-xs text-zinc-500 font-medium">•••• •••• •••• 4242</p>
                  <p className="text-sm font-medium text-zinc-400 mt-1">Alex Rivera • Member since 2025</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-zinc-500">Expires</p>
                  <p className="font-bold text-lg">12/28</p>
                </div>
              </div>
            </div>

            {/* Decorative shine */}
            <div className="absolute -top-20 -right-20 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl group-hover:bg-blue-500/20 transition-all" />
          </motion.div>

          {/* Total Spent */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-zinc-900/70 border border-white/10 backdrop-blur-xl rounded-3xl p-10 flex flex-col justify-center"
          >
            <div className="flex items-center gap-4">
              <div className="p-4 bg-emerald-500/10 rounded-2xl">
                <TrendingUp className="text-emerald-400" size={32} />
              </div>
              <div>
                <p className="uppercase text-xs font-black tracking-widest text-zinc-500">Lifetime Spent</p>
                <p className="text-6xl font-black tracking-tighter mt-2">
                  {formatPrice(totalSpent)}
                </p>
              </div>
            </div>
            
            <p className="text-zinc-400 mt-8 text-sm leading-relaxed">
              Across 12 unforgettable luxury experiences and concierge services.
            </p>
          </motion.div>
        </div>

        {/* Recent Transactions */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold tracking-tight">Recent Transactions</h2>
            <Link href="#" className="text-blue-400 text-sm font-medium hover:underline flex items-center gap-1">
              View All <ChevronRight size={16} />
            </Link>
          </div>

          <div className="space-y-4">
            {paymentsData.map((payment, index) => (
              <motion.div
                key={payment.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.08 }}
                className="bg-zinc-900/70 border border-white/10 backdrop-blur-xl rounded-3xl p-7 flex flex-col md:flex-row md:items-center justify-between gap-6 group hover:border-white/20 transition-all"
              >
                <div className="flex items-center gap-5">
                  <div className={`p-4 rounded-2xl flex-shrink-0 ${
                    payment.status === 'Paid' 
                      ? 'bg-emerald-500/10 text-emerald-400' 
                      : 'bg-amber-500/10 text-amber-400'
                  }`}>
                    <CreditCard size={28} />
                  </div>

                  <div>
                    <h3 className="font-bold text-xl tracking-tight text-white group-hover:text-blue-400 transition-colors">
                      {payment.hotel}
                    </h3>
                    <div className="flex items-center gap-2 text-sm text-zinc-400 mt-1">
                      <Calendar size={16} />
                      {payment.date}
                    </div>
                  </div>
                </div>

                <div className="text-right md:text-left flex flex-col items-end md:items-start">
                  <p className="text-3xl font-black tracking-tighter">
                    {formatPrice(payment.amount)}
                  </p>
                  
                  <span className={`mt-2 inline-flex items-center gap-2 px-5 py-1.5 rounded-full text-xs font-black uppercase tracking-widest border ${
                    payment.status === 'Paid'
                      ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                      : 'bg-amber-500/10 text-amber-400 border-amber-500/30'
                  }`}>
                    {payment.status === 'Paid' ? (
                      <CheckCircle size={14} />
                    ) : (
                      <Clock size={14} />
                    )}
                    {payment.status}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}