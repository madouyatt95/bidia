'use client';

import { useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { TransportOptionCard } from '@/components/TransportOptionCard';
import { ShareTripModal } from '@/components/ShareTripModal';
import { SplitCalculator } from '@/components/SplitCalculator';
import { findRoute } from '@/lib/data';

type SortOption = 'price' | 'duration' | 'comfort';

function ResultsContent() {
    const searchParams = useSearchParams();

    const from = searchParams.get('from') || '';
    const to = searchParams.get('to') || '';
    const date = searchParams.get('date') || '';
    const passengers = parseInt(searchParams.get('passengers') || '1');

    const [sortBy, setSortBy] = useState<SortOption>('price');
    const [selectedOption, setSelectedOption] = useState<string | null>(null);
    const [showShareModal, setShowShareModal] = useState(false);
    const [showSplitCalc, setShowSplitCalc] = useState(false);

    const route = findRoute(from, to);

    if (!route) {
        return (
            <main className="flex-1 min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center px-4">
                    <span className="text-5xl">🔍</span>
                    <h2 className="text-xl font-bold text-gray-900 mt-4">Trajet non disponible</h2>
                    <p className="text-gray-500 mt-2">
                        Aucun transport disponible entre {from || '?'} et {to || '?'}
                    </p>
                    <Link href="/transport" className="btn-primary inline-block mt-4">
                        ← Nouvelle recherche
                    </Link>
                </div>
            </main>
        );
    }

    const sortedOptions = [...route.options].sort((a, b) => {
        if (sortBy === 'price') return a.price - b.price;
        if (sortBy === 'duration') return a.durationMinutes - b.durationMinutes;
        if (sortBy === 'comfort') return b.comfort - a.comfort;
        return 0;
    });

    const cheapest = route.options.reduce((min, opt) => opt.price < min.price ? opt : min, route.options[0]);
    const fastest = route.options.reduce((min, opt) => opt.durationMinutes < min.durationMinutes ? opt : min, route.options[0]);

    const selectedTransport = sortedOptions.find(o => o.id === selectedOption);
    const totalPrice = (selectedTransport?.price || 0) * passengers;

    const handleBook = () => {
        if (selectedOption) {
            alert(`Réservation: ${selectedTransport?.name} pour ${passengers} passager(s) le ${date}`);
        }
    };

    return (
        <main className="flex-1 min-h-screen bg-gray-50">
            {/* Header */}
            <header className="bg-white px-4 pt-10 pb-4 safe-area-top shadow-sm">
                <Link href="/transport" className="text-emerald-600 text-sm font-medium mb-2 inline-block">
                    ← Modifier la recherche
                </Link>
                <h1 className="text-xl font-bold text-gray-900">{from} → {to}</h1>
                <div className="flex items-center gap-3 text-sm text-gray-500 mt-1">
                    <span>📅 {new Date(date).toLocaleDateString('fr-FR', { weekday: 'short', day: 'numeric', month: 'short' })}</span>
                    <span>👥 {passengers} passager{passengers > 1 ? 's' : ''}</span>
                    <span>📏 {route.distance} km</span>
                </div>
            </header>

            {/* Quick Stats */}
            <div className="px-4 py-4 flex gap-3">
                <div className="flex-1 bg-emerald-50 rounded-xl p-3 text-center">
                    <p className="text-[10px] text-emerald-600 font-medium uppercase">Moins cher</p>
                    <p className="text-lg font-bold text-emerald-700">{cheapest.price.toLocaleString()} F</p>
                    <p className="text-xs text-gray-500">{cheapest.name}</p>
                </div>
                <div className="flex-1 bg-blue-50 rounded-xl p-3 text-center">
                    <p className="text-[10px] text-blue-600 font-medium uppercase">Plus rapide</p>
                    <p className="text-lg font-bold text-blue-700">{fastest.duration}</p>
                    <p className="text-xs text-gray-500">{fastest.name}</p>
                </div>
            </div>

            {/* Sort Options */}
            <div className="px-4 pb-3">
                <div className="flex gap-2 bg-gray-100 rounded-lg p-1">
                    {(['price', 'duration', 'comfort'] as SortOption[]).map((option) => (
                        <button
                            key={option}
                            onClick={() => setSortBy(option)}
                            className={`flex-1 py-2 text-xs font-medium rounded-md transition-all ${sortBy === option
                                ? 'bg-white text-gray-900 shadow-sm'
                                : 'text-gray-500'
                                }`}
                        >
                            {option === 'price' && '💰 Prix'}
                            {option === 'duration' && '🕐 Durée'}
                            {option === 'comfort' && '⭐ Confort'}
                        </button>
                    ))}
                </div>
            </div>

            {/* Options List */}
            <div className="px-4 space-y-3 pb-44">
                {sortedOptions.map((option) => (
                    <div key={option.id} className="relative">
                        {option.id === cheapest.id && option.id !== fastest.id && (
                            <span className="absolute -top-2 left-3 bg-emerald-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full z-10">
                                Meilleur prix
                            </span>
                        )}
                        {option.id === fastest.id && option.id !== cheapest.id && (
                            <span className="absolute -top-2 left-3 bg-blue-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full z-10">
                                Plus rapide
                            </span>
                        )}
                        {option.id === fastest.id && option.id === cheapest.id && (
                            <span className="absolute -top-2 left-3 bg-purple-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full z-10">
                                Meilleur choix
                            </span>
                        )}
                        <TransportOptionCard
                            option={option}
                            isSelected={selectedOption === option.id}
                            onSelect={() => setSelectedOption(option.id)}
                        />
                    </div>
                ))}
            </div>

            {/* Sticky Book Button */}
            {selectedOption && (
                <div className="fixed bottom-20 left-0 right-0 p-4 bg-white border-t border-gray-200 z-40">
                    <div className="max-w-lg mx-auto">
                        <div className="flex items-center justify-between mb-3">
                            <div>
                                <p className="text-xs text-gray-500">Total pour {passengers} passager{passengers > 1 ? 's' : ''}</p>
                                <p className="text-xl font-bold text-emerald-600">
                                    {totalPrice.toLocaleString()} <span className="text-sm font-normal text-gray-500">FCFA</span>
                                </p>
                            </div>
                            <button onClick={handleBook} className="btn-primary px-8">
                                Réserver
                            </button>
                        </div>

                        {/* Share & Split Buttons */}
                        <div className="flex gap-2">
                            <button
                                onClick={() => setShowShareModal(true)}
                                className="flex-1 py-2 bg-gray-100 rounded-lg text-sm font-medium text-gray-700 flex items-center justify-center gap-2 hover:bg-gray-200 transition-colors"
                            >
                                🔗 Partager
                            </button>
                            <button
                                onClick={() => setShowSplitCalc(true)}
                                className="flex-1 py-2 bg-green-100 rounded-lg text-sm font-medium text-green-700 flex items-center justify-center gap-2 hover:bg-green-200 transition-colors"
                            >
                                💸 Partager les frais
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Share Modal */}
            <ShareTripModal
                isOpen={showShareModal}
                onClose={() => setShowShareModal(false)}
                tripDetails={{
                    from,
                    to,
                    date: new Date(date).toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' }),
                    transport: selectedTransport?.name || '',
                    price: selectedTransport?.price || 0,
                    passengers,
                }}
            />

            {/* Split Calculator Modal */}
            {showSplitCalc && (
                <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setShowSplitCalc(false)}>
                    <div
                        className="bg-white rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="p-4 border-b border-gray-100 flex justify-between items-center sticky top-0 bg-white">
                            <h2 className="font-bold text-gray-900">Partage des frais</h2>
                            <button onClick={() => setShowSplitCalc(false)} className="text-gray-400">
                                ✕
                            </button>
                        </div>
                        <div className="p-4">
                            <SplitCalculator
                                totalAmount={totalPrice}
                                tripDetails={`${from} → ${to} (${selectedTransport?.name})`}
                                onShare={() => setShowSplitCalc(false)}
                            />
                        </div>
                    </div>
                </div>
            )}
        </main>
    );
}

export default function TransportResultsPage() {
    return (
        <Suspense fallback={
            <main className="flex-1 min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="w-8 h-8 border-3 border-emerald-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
                    <p className="text-gray-500 mt-3">Recherche en cours...</p>
                </div>
            </main>
        }>
            <ResultsContent />
        </Suspense>
    );
}
