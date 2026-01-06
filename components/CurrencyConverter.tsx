'use client';

import { useState } from 'react';

const currencies = [
    { code: 'EUR', symbol: '€', rate: 655.957, flag: '🇪🇺' },
    { code: 'USD', symbol: '$', rate: 615, flag: '🇺🇸' },
    { code: 'CAD', symbol: 'C$', rate: 450, flag: '🇨🇦' },
    { code: 'GBP', symbol: '£', rate: 780, flag: '🇬🇧' },
];

export function CurrencyConverter() {
    const [amount, setAmount] = useState<number>(10000);
    const [selectedCurrency, setSelectedCurrency] = useState(currencies[0]);
    const [direction, setDirection] = useState<'fromCFA' | 'toCFA'>('fromCFA');

    const convert = () => {
        if (direction === 'fromCFA') {
            return (amount / selectedCurrency.rate).toFixed(2);
        } else {
            return Math.round(amount * selectedCurrency.rate).toLocaleString();
        }
    };

    const toggleDirection = () => {
        setDirection(prev => prev === 'fromCFA' ? 'toCFA' : 'fromCFA');
    };

    return (
        <div className="card p-4">
            <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                💱 Convertisseur de Devises
            </h3>

            {/* Currency Selector */}
            <div className="flex gap-2 mb-4 overflow-x-auto no-scrollbar">
                {currencies.map((currency) => (
                    <button
                        key={currency.code}
                        onClick={() => setSelectedCurrency(currency)}
                        className={`px-3 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all flex items-center gap-1 ${selectedCurrency.code === currency.code
                                ? 'bg-emerald-500 text-white'
                                : 'bg-gray-100 text-gray-600'
                            }`}
                    >
                        <span>{currency.flag}</span>
                        <span>{currency.code}</span>
                    </button>
                ))}
            </div>

            {/* Conversion Display */}
            <div className="bg-gray-50 rounded-xl p-4">
                {/* From */}
                <div className="flex items-center gap-3 mb-3">
                    <span className="text-2xl">{direction === 'fromCFA' ? '🇸🇳' : selectedCurrency.flag}</span>
                    <input
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(Number(e.target.value))}
                        className="flex-1 bg-white border border-gray-200 rounded-lg px-3 py-2 text-lg font-bold text-gray-900"
                    />
                    <span className="text-sm text-gray-500 font-medium w-12">
                        {direction === 'fromCFA' ? 'FCFA' : selectedCurrency.code}
                    </span>
                </div>

                {/* Toggle Button */}
                <div className="flex justify-center">
                    <button
                        onClick={toggleDirection}
                        className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center hover:bg-emerald-200 transition-colors"
                    >
                        ⇅
                    </button>
                </div>

                {/* To */}
                <div className="flex items-center gap-3 mt-3">
                    <span className="text-2xl">{direction === 'fromCFA' ? selectedCurrency.flag : '🇸🇳'}</span>
                    <div className="flex-1 bg-emerald-50 border border-emerald-200 rounded-lg px-3 py-2 text-lg font-bold text-emerald-700">
                        {convert()}
                    </div>
                    <span className="text-sm text-gray-500 font-medium w-12">
                        {direction === 'fromCFA' ? selectedCurrency.code : 'FCFA'}
                    </span>
                </div>
            </div>

            {/* Rate Info */}
            <p className="text-xs text-gray-400 mt-3 text-center">
                1 {selectedCurrency.code} = {selectedCurrency.rate.toLocaleString()} FCFA
            </p>
        </div>
    );
}
