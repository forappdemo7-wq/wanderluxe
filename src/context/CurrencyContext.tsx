"use client";

import React, { createContext, useContext, useState } from 'react';

export type Currency = 'USD' | 'INR' | 'JPY' | 'EUR';

interface CurrencyContextType {
  currency: Currency;
  setCurrency: (currency: Currency) => void;
  formatPrice: (priceUSD: number) => string; // Add this to the interface
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

export const CurrencyProvider = ({ children }: { children: React.ReactNode }) => {
  const [currency, setCurrency] = useState<Currency>('USD');

  // Unified formatting logic
  const formatPrice = (priceUSD: number) => {
    const rates: Record<Currency, number> = {
      USD: 1,
      INR: 95.32,
      JPY: 158.2,
      EUR: 0.86
    };

    const rate = rates[currency] || 1;
    const converted = Math.round(priceUSD * rate);

    return new Intl.NumberFormat(currency === 'INR' ? 'en-IN' : 'en-US', {
      style: 'currency',
      currency: currency,
      maximumFractionDigits: 0,
    }).format(converted);
  };

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency, formatPrice }}>
      {children}
    </CurrencyContext.Provider>
  );
};

export const useCurrency = () => {
  const context = useContext(CurrencyContext);
  if (!context) throw new Error('useCurrency must be used within a CurrencyProvider');
  return context;
};