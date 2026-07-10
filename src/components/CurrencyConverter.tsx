"use client";

import { useState } from 'react';
import { ArrowRightLeft, Coins } from 'lucide-react';

// Mock exchange rates (Base: USD)
const rates: Record<string, number> = {
  USD: 1,
  EUR: 0.92,
  GBP: 0.79,
  INR: 93.32,
  JPY: 150.50,
  AUD: 1.52,
};

export default function CurrencyConverter() {
  const [amount, setAmount] = useState<string>('1000');
  const [fromCurrency, setFromCurrency] = useState<string>('USD');
  const [toCurrency, setToCurrency] = useState<string>('EUR');

  const convertCurrency = () => {
    const amountNum = parseFloat(amount);
    if (isNaN(amountNum)) return 0;
    const baseAmount = amountNum / rates[fromCurrency];
    return (baseAmount * rates[toCurrency]).toFixed(2);
  };

  return (
    <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-6 shadow-xl w-full max-w-sm border border-gray-100 mt-6">
      <div className="flex items-center mb-4">
        <Coins className="text-blue-600 mr-2" size={20} />
        <h3 className="font-bold text-gray-800">Quick Converter</h3>
      </div>
      
      <div className="flex flex-col space-y-4">
        <div>
          <label className="text-xs font-semibold text-gray-500 uppercase">Amount</label>
          <input 
            type="number" 
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full mt-1 p-2 border-b border-gray-300 bg-transparent outline-none focus:border-blue-600 transition"
          />
        </div>

        <div className="flex items-center justify-between space-x-2">
          <div className="flex-1">
            <label className="text-xs font-semibold text-gray-500 uppercase">From</label>
            <select 
              value={fromCurrency}
              onChange={(e) => setFromCurrency(e.target.value)}
              className="w-full mt-1 p-2 bg-gray-50 rounded outline-none border border-gray-200"
            >
              {Object.keys(rates).map(cur => <option key={cur} value={cur}>{cur}</option>)}
            </select>
          </div>
          
          <ArrowRightLeft className="text-gray-400 mt-5" size={16} />
          
          <div className="flex-1">
            <label className="text-xs font-semibold text-gray-500 uppercase">To</label>
            <select 
              value={toCurrency}
              onChange={(e) => setToCurrency(e.target.value)}
              className="w-full mt-1 p-2 bg-gray-50 rounded outline-none border border-gray-200"
            >
              {Object.keys(rates).map(cur => <option key={cur} value={cur}>{cur}</option>)}
            </select>
          </div>
        </div>

        <div className="pt-4 mt-2 border-t border-gray-100">
          <p className="text-sm text-gray-500">Converted Amount</p>
          <p className="text-2xl font-bold text-blue-600">
            {toCurrency} {convertCurrency()}
          </p>
        </div>
      </div>
    </div>
  );
}