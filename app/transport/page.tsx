'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { getAllCities } from '@/lib/data';

const transportTypes = [
    { id: 'all', name: 'Tous', icon: '🚗' },
    { id: 'taxi', name: 'Taxi', icon: '🚕' },
    { id: 'bus', name: 'Bus', icon: '🚌' },
    { id: 'sept_places', name: '7 Places', icon: '🚙' },
    { id: 'car_rapide', name: 'Car Rapide', icon: '🚐' },
];

export default function TransportPage() {
    const router = useRouter();
    const cities = getAllCities();

    const [departure, setDeparture] = useState('');
    const [arrival, setArrival] = useState('');
    const [date, setDate] = useState('');
    const [passengers, setPassengers] = useState(1);
    const [selectedType, setSelectedType] = useState('all');

    const handleSearch = () => {
        if (!departure || !arrival || !date) {
            alert('Veuillez remplir tous les champs');
            return;
        }
        if (departure === arrival) {
            alert('La ville de départ et d\'arrivée doivent être différentes');
            return;
        }

        const params = new URLSearchParams({
            from: departure,
            to: arrival,
            date: date,
            passengers: passengers.toString(),
            ...(selectedType !== 'all' && { type: selectedType }),
        });

        router.push(`/transport/resultats?${params.toString()}`);
    };

    const today = new Date().toISOString().split('T')[0];

    return (
        <main className="flex-1 min-h-screen bg-gray-50">
            {/* Header */}
            <header className="hero-gradient text-white px-4 pt-10 pb-12 safe-area-top">
                <h1 className="text-2xl font-bold">Transport</h1>
                <p className="text-emerald-50 text-sm">Comparez et réservez votre trajet</p>
            </header>

            <div className="px-4 -mt-8 space-y-5 pb-24">
                {/* Search Form */}
                <div className="card p-5 space-y-5">
                    {/* Departure */}
                    <div>
                        <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                            📍 Ville de départ
                        </label>
                        <select
                            value={departure}
                            onChange={(e) => setDeparture(e.target.value)}
                            className="w-full bg-gray-50 border border-gray-200 rounded-xl p-4 text-gray-900"
                        >
                            <option value="">Sélectionner une ville</option>
                            {cities.map((city) => (
                                <option key={city} value={city}>{city}</option>
                            ))}
                        </select>
                    </div>

                    {/* Swap Button */}
                    <div className="flex justify-center -my-2">
                        <button
                            onClick={() => {
                                const temp = departure;
                                setDeparture(arrival);
                                setArrival(temp);
                            }}
                            className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center hover:bg-emerald-200 transition-colors"
                        >
                            ⇅
                        </button>
                    </div>

                    {/* Arrival */}
                    <div>
                        <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                            🎯 Ville d'arrivée
                        </label>
                        <select
                            value={arrival}
                            onChange={(e) => setArrival(e.target.value)}
                            className="w-full bg-gray-50 border border-gray-200 rounded-xl p-4 text-gray-900"
                        >
                            <option value="">Sélectionner une ville</option>
                            {cities.filter(c => c !== departure).map((city) => (
                                <option key={city} value={city}>{city}</option>
                            ))}
                        </select>
                    </div>

                    {/* Date & Passengers */}
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                                📅 Date
                            </label>
                            <input
                                type="date"
                                value={date}
                                onChange={(e) => setDate(e.target.value)}
                                min={today}
                                className="w-full bg-gray-50 border border-gray-200 rounded-xl p-4 text-gray-900"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                                👥 Passagers
                            </label>
                            <div className="flex items-center border border-gray-200 rounded-xl overflow-hidden bg-gray-50">
                                <button
                                    onClick={() => setPassengers(Math.max(1, passengers - 1))}
                                    className="px-4 py-4 text-emerald-600 font-bold hover:bg-emerald-50 transition-colors"
                                >
                                    −
                                </button>
                                <span className="flex-1 text-center font-medium text-gray-900">{passengers}</span>
                                <button
                                    onClick={() => setPassengers(Math.min(10, passengers + 1))}
                                    className="px-4 py-4 text-emerald-600 font-bold hover:bg-emerald-50 transition-colors"
                                >
                                    +
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Transport Type Filter */}
                <section>
                    <h2 className="text-sm font-semibold text-gray-700 mb-3">Type de transport (optionnel)</h2>
                    <div className="flex gap-2 overflow-x-auto no-scrollbar">
                        {transportTypes.map((type) => (
                            <button
                                key={type.id}
                                onClick={() => setSelectedType(type.id)}
                                className={`px-4 py-3 rounded-xl text-sm font-medium whitespace-nowrap transition-all flex items-center gap-2 ${selectedType === type.id
                                        ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/30'
                                        : 'bg-white text-gray-600 border border-gray-200'
                                    }`}
                            >
                                <span>{type.icon}</span>
                                <span>{type.name}</span>
                            </button>
                        ))}
                    </div>
                </section>

                {/* Popular Routes */}
                <section>
                    <h2 className="text-sm font-semibold text-gray-700 mb-3">Trajets populaires</h2>
                    <div className="grid grid-cols-2 gap-3">
                        {[
                            { from: 'Dakar', to: 'Saint-Louis', icon: '🏛️' },
                            { from: 'Dakar', to: 'Thiès', icon: '🏙️' },
                            { from: 'Dakar', to: 'Mbour', icon: '🏖️' },
                            { from: 'Dakar', to: 'Touba', icon: '🕌' },
                        ].map((route) => (
                            <button
                                key={`${route.from}-${route.to}`}
                                onClick={() => {
                                    setDeparture(route.from);
                                    setArrival(route.to);
                                }}
                                className="card p-3 text-left hover:border-emerald-200 transition-colors"
                            >
                                <span className="text-xl">{route.icon}</span>
                                <p className="font-medium text-gray-900 text-sm mt-1">{route.from}</p>
                                <p className="text-xs text-gray-500">→ {route.to}</p>
                            </button>
                        ))}
                    </div>
                </section>

                {/* Search Button */}
                <button
                    onClick={handleSearch}
                    className="btn-primary w-full"
                >
                    🔍 Comparer les options
                </button>
            </div>
        </main>
    );
}
