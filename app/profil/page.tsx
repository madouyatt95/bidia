'use client';

import { useState } from 'react';
import Link from 'next/link';
import { mockUser as loyaltyUser, levelNames, levelColors } from '@/lib/loyalty';

const mockUser = {
    name: 'Mamadou Diallo',
    email: 'mamadou@example.com',
    phone: '+221 77 123 45 67',
};

const mockBookings = [
    {
        id: '1',
        type: 'activite',
        title: 'Île de Gorée',
        date: '2026-01-10',
        status: 'confirmé',
        price: 15000,
    },
    {
        id: '2',
        type: 'transport',
        title: 'Dakar → Saint-Louis',
        date: '2026-01-15',
        status: 'en attente',
        price: 8000,
    },
];

export default function ProfilPage() {
    const [activeTab, setActiveTab] = useState<'reservations' | 'favoris' | 'parametres'>('reservations');

    return (
        <main className="flex-1 min-h-screen bg-gray-50">
            {/* Header */}
            <header className="bg-white px-4 pt-10 pb-6 safe-area-top shadow-sm">
                <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-full bg-emerald-100 flex items-center justify-center text-2xl">
                        👤
                    </div>
                    <div className="flex-1">
                        <h1 className="text-xl font-bold text-gray-900">{mockUser.name}</h1>
                        <p className="text-sm text-gray-500">{mockUser.phone}</p>
                    </div>
                </div>
            </header>

            {/* Loyalty Card */}
            <div className="px-4 -mt-2 mb-4">
                <Link href="/fidelite" className={`block bg-gradient-to-br ${levelColors[loyaltyUser.level]} rounded-xl p-4 text-white`}>
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-white/70 text-xs">Mes points CFA</p>
                            <p className="text-2xl font-bold">{loyaltyUser.points.toLocaleString()}</p>
                        </div>
                        <div className="text-right">
                            <span className="bg-white/20 px-3 py-1 rounded-full text-sm font-bold">
                                {levelNames[loyaltyUser.level]}
                            </span>
                            <p className="text-xs text-white/70 mt-1">
                                {loyaltyUser.badges.filter(b => b.unlocked).length} badges
                            </p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2 mt-3">
                        {loyaltyUser.badges.filter(b => b.unlocked).slice(0, 4).map((badge) => (
                            <span key={badge.id} className="text-lg">{badge.icon}</span>
                        ))}
                        <span className="text-xs text-white/70 ml-auto">Voir tout →</span>
                    </div>
                </Link>
            </div>

            {/* Quick Links */}
            <div className="px-4 mb-4">
                <div className="grid grid-cols-2 gap-3">
                    <Link href="/groupes" className="card p-3 flex items-center gap-3">
                        <span className="text-xl">👥</span>
                        <span className="text-sm font-medium text-gray-700">Mes groupes</span>
                    </Link>
                    <Link href="/fidelite" className="card p-3 flex items-center gap-3">
                        <span className="text-xl">🎁</span>
                        <span className="text-sm font-medium text-gray-700">Récompenses</span>
                    </Link>
                </div>
            </div>

            {/* Tabs */}
            <div className="px-4 py-4">
                <div className="flex bg-gray-200 rounded-lg p-1">
                    {(['reservations', 'favoris', 'parametres'] as const).map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`flex-1 py-2 text-sm font-medium rounded-md transition-all ${activeTab === tab
                                ? 'bg-white text-emerald-600 shadow-sm'
                                : 'text-gray-500'
                                }`}
                        >
                            {tab === 'reservations' && 'Réservations'}
                            {tab === 'favoris' && 'Favoris'}
                            {tab === 'parametres' && 'Paramètres'}
                        </button>
                    ))}
                </div>
            </div>

            <div className="px-4 pb-24">
                {activeTab === 'reservations' && (
                    <div className="space-y-4">
                        {mockBookings.map((booking) => (
                            <div key={booking.id} className="card p-4">
                                <div className="flex justify-between items-start mb-2">
                                    <div>
                                        <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${booking.type === 'activite' ? 'bg-blue-100 text-blue-600' : 'bg-purple-100 text-purple-600'
                                            }`}>
                                            {booking.type}
                                        </span>
                                        <h3 className="font-bold text-gray-900 mt-1">{booking.title}</h3>
                                        <p className="text-xs text-gray-500">{new Date(booking.date).toLocaleDateString('fr-FR')}</p>
                                    </div>
                                    <div className="text-right">
                                        <span className={`text-[10px] font-bold uppercase ${booking.status === 'confirmé' ? 'text-emerald-600' : 'text-amber-600'
                                            }`}>
                                            {booking.status}
                                        </span>
                                        <p className="font-bold text-gray-900 mt-1">{booking.price.toLocaleString()} FCFA</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {activeTab === 'favoris' && (
                    <div className="text-center py-12">
                        <span className="text-5xl">❤️</span>
                        <p className="text-gray-500 mt-3">Aucun favori pour le moment</p>
                        <Link href="/activites" className="text-emerald-600 text-sm font-medium mt-2 inline-block">
                            Découvrir des activités
                        </Link>
                    </div>
                )}

                {activeTab === 'parametres' && (
                    <div className="space-y-3">
                        <div className="card p-4">
                            <h3 className="font-semibold text-gray-900 mb-3">Informations personnelles</h3>
                            <div className="space-y-2 text-sm">
                                <div className="flex justify-between">
                                    <span className="text-gray-500">Nom</span>
                                    <span className="text-gray-900">{mockUser.name}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-500">Email</span>
                                    <span className="text-gray-900">{mockUser.email}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-500">Téléphone</span>
                                    <span className="text-gray-900">{mockUser.phone}</span>
                                </div>
                            </div>
                        </div>

                        <div className="card p-4 space-y-3">
                            <button className="w-full text-left py-2 text-sm text-gray-700 flex items-center justify-between">
                                <span>🔔 Notifications</span>
                                <span className="text-gray-400">→</span>
                            </button>
                            <button className="w-full text-left py-2 text-sm text-gray-700 flex items-center justify-between">
                                <span>🌐 Langue</span>
                                <span className="text-gray-400">Français →</span>
                            </button>
                            <button className="w-full text-left py-2 text-sm text-gray-700 flex items-center justify-between">
                                <span>❓ Aide</span>
                                <span className="text-gray-400">→</span>
                            </button>
                        </div>

                        <button className="w-full py-3 text-red-600 font-medium text-sm">
                            Se déconnecter
                        </button>
                    </div>
                )}
            </div>
        </main>
    );
}
