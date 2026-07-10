"use client";

import { useCurrency } from '@/context/CurrencyContext';
import { motion } from 'framer-motion';

interface StatCardProps {
  label: string;
  value: string | number;
  color?: string;
  index: number;
  icon?: React.ReactNode;        // Optional icon for visual enhancement
}

export default function StatCard({ 
  label, 
  value, 
  color = "text-white", 
  index,
  icon 
}: StatCardProps) {
  const { formatPrice } = useCurrency();

  // Auto-format price when label indicates money
  const isPrice = label.toLowerCase().includes("spent") || 
                  label.toLowerCase().includes("revenue") || 
                  label.toLowerCase().includes("total");

  const displayValue = (isPrice && typeof value === 'number') 
    ? formatPrice(value) 
    : value;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08, type: "spring", stiffness: 100 }}
      whileHover={{ y: -4 }}
      className="group bg-zinc-900 border border-white/10 rounded-3xl p-8 hover:border-white/20 transition-all duration-300"
    >
      <div className="flex items-start justify-between">
        {/* Icon (if provided) */}
        {icon && (
          <div className="p-3 bg-white/5 rounded-2xl text-blue-400 group-hover:text-blue-500 transition-colors">
            {icon}
          </div>
        )}

        {/* Label */}
        <p className="text-xs font-black uppercase tracking-[0.125em] text-zinc-500">
          {label}
        </p>
      </div>

      {/* Value */}
      <p className={`mt-6 text-4xl md:text-5xl font-black tracking-tighter ${color}`}>
        {displayValue}
      </p>

      {/* Subtle bottom accent line */}
      <div className="h-0.5 w-12 bg-gradient-to-r from-blue-500 to-cyan-400 mt-8 rounded-full" />
    </motion.div>
  );
}