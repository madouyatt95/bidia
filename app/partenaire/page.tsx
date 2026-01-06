'use client';

import { useState } from 'react';
import Link from 'next/link';
import { StatsCard, StatsGrid } from '@/components/StatsCard';
import { ReservationCard } from '@/components/ReservationCard';
import { mockPartner, mockReservations, mockStats, PartnerReservation } from '@/lib/partner';

export default function PartenairePage() {
    const [reservations, setReservations] = useState<PartnerReservation[]>(mockReservations);

    const partner = mockPartner;
    const stats = mockStats;
    const pendingReservations = reservations.filter(r => r.status === 'pending');

    const handleAccept = (id: string) => {
        setReservations(reservations.map(r =>
            r.id === id ? { ...r, status: 'confirmed' as const } : r
        ));
    };

    const handleReject = (id: string) => {
        setReservations(reservations.map(r =>
            r.id === id ? { ...r, status: 'cancelled' as const } : r
        ));
    };

    const handleComplete = (id: string) => {
        setReservations(reservations.map(r =>
            r.id === id ? { ...r, status: 'completed' as const } : r
        ));
    };

    const handleCall = (phone: string) => {
        window.open(`tel:${phone}`, '_self');
    };

    return (
        <main className="flex-1 min-h-screen bg-gray-50">
            {/* Header */}
            <header className="bg-gradient-to-br from-emerald-500 to-emerald-700 text-white px-4 pt-10 pb-8 safe-area-top">
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center text-2xl">
                            🚕
                        </div>
                        <div>
                            <h1 className="text-lg font-bold">Bonjour, {partner.name.split(' ')[0]} !</h1>
                            <p className="text-emerald-100 text-sm">{partner.vehicleType}</p>
                        </div>
                    </div>
                    <div className="text-right">
                        <div className="flex items-center gap-1 text-amber-300">
                            <span>⭐</span>
                            <span className="font-bold">{partner.rating}</span>
                        </div>
                        <p className="text-[10px] text-emerald-100">{stats.reviewCount} avis</p>
                    </div>
                </div>

                {/* Today's Earnings */}
                <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-emerald-100 text-sm">Revenus du jour</p>
                            <p className="text-3xl font-bold">{stats.todayEarnings.toLocaleString()} <span className="text-lg font-normal">FCFA</span></p>
                        </div>
                        <div className="text-right">
                            <p className="text-2xl font-bold">{stats.completedToday}</p>
                            <p className="text-xs text-emerald-100">courses</p>
                        </div>
                    </div>
                </div>
            </header>

            <div className="px-4 -mt-4 space-y-6 pb-24">
                {/* Stats Grid */}
                <StatsGrid>
                    <StatsCard
                        icon="💰"
                        label="Cette semaine"
                        value={`${(stats.weekEarnings / 1000).toFixed(0)}k`}
                        subValue="FCFA"
                        trend="up"
                        trendValue="+12%"
                        color="emerald"
                    />
                    <StatsCard
                        icon="🚗"
                        label="Total courses"
                        value={partner.totalTrips}
                        color="blue"
                    />
                    <StatsCard
                        icon="📅"
                        label="Ce mois"
                        value={`${(stats.monthEarnings / 1000).toFixed(0)}k`}
                        subValue="FCFA"
                        color="purple"
                    />
                    <StatsCard
                        icon="⏳"
                        label="En attente"
                        value={pendingReservations.length}
                        color="amber"
                    />
                </StatsGrid>

                {/* Pending Reservations */}
                {pendingReservations.length > 0 && (
                    <section>
                        <div className="flex items-center justify-between mb-3">
                            <h2 className="font-bold text-gray-900">🔔 Nouvelles demandes</h2>
                            <span className="bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                                {pendingReservations.length}
                            </span>
                        </div>
                        <div className="space-y-3">
                            {pendingReservations.map((reservation) => (
                                <ReservationCard
                                    key={reservation.id}
                                    reservation={reservation}
                                    onAccept={() => handleAccept(reservation.id)}
                                    onReject={() => handleReject(reservation.id)}
                                    onCall={() => handleCall(reservation.clientPhone)}
                                />
                            ))}
                        </div>
                    </section>
                )}

                {/* Quick Actions */}
                <section>
                    <h2 className="font-bold text-gray-900 mb-3">Actions rapides</h2>
                    <div className="grid grid-cols-2 gap-3">
                        <Link href="/partenaire/reservations" className="card p-4 text-center hover:border-emerald-200 transition-colors">
                            <span className="text-2xl">📋</span>
                            <p className="text-sm font-medium text-gray-900 mt-2">Mes réservations</p>
                        </Link>
                        <button className="card p-4 text-center hover:border-emerald-200 transition-colors">
                            <span className="text-2xl">📊</span>
                            <p className="text-sm font-medium text-gray-900 mt-2">Statistiques</p>
                        </button>
                        <button className="card p-4 text-center hover:border-emerald-200 transition-colors">
                            <span className="text-2xl">⚙️</span>
                            <p className="text-sm font-medium text-gray-900 mt-2">Paramètres</p>
                        </button>
                        <button className="card p-4 text-center hover:border-emerald-200 transition-colors">
                            <span className="text-2xl">❓</span>
                            <p className="text-sm font-medium text-gray-900 mt-2">Aide</p>
                        </button>
                    </div>
                </section>

                {/* Recent Activity */}
                <section>
                    <div className="flex items-center justify-between mb-3">
                        <h2 className="font-bold text-gray-900">Activité récente</h2>
                        <Link href="/partenaire/reservations" className="text-sm text-emerald-600 font-medium">
                            Voir tout
                        </Link>
                    </div>
                    <div className="card divide-y divide-gray-100">
                        {reservations.filter(r => r.status !== 'pending').slice(0, 3).map((reservation) => (
                            <div key={reservation.id} className="p-3 flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-sm">
                                        {reservation.status === 'completed' ? '✅' : reservation.status === 'confirmed' ? '🔵' : '❌'}
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-gray-900">
                                            {reservation.from} → {reservation.to}
                                        </p>
                                        <p className="text-[10px] text-gray-400">{reservation.createdAt}</p>
                                    </div>
                                </div>
                                <span className="font-bold text-gray-900">
                                    {reservation.price.toLocaleString()} F
                                </span>
                            </div>
                        ))}
                    </div>
                </section>
            </div>
        </main>
    );
}
