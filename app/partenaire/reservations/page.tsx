'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ReservationCard } from '@/components/ReservationCard';
import { mockReservations, PartnerReservation, ReservationStatus } from '@/lib/partner';

type Filter = 'all' | ReservationStatus;

export default function ReservationsPage() {
    const [reservations, setReservations] = useState<PartnerReservation[]>(mockReservations);
    const [filter, setFilter] = useState<Filter>('all');

    const filteredReservations = filter === 'all'
        ? reservations
        : reservations.filter(r => r.status === filter);

    const filters: { id: Filter; label: string; count: number }[] = [
        { id: 'all', label: 'Tout', count: reservations.length },
        { id: 'pending', label: 'En attente', count: reservations.filter(r => r.status === 'pending').length },
        { id: 'confirmed', label: 'Confirmées', count: reservations.filter(r => r.status === 'confirmed').length },
        { id: 'completed', label: 'Terminées', count: reservations.filter(r => r.status === 'completed').length },
    ];

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
            <header className="bg-white px-4 pt-10 pb-4 safe-area-top shadow-sm">
                <Link href="/partenaire" className="text-emerald-600 text-sm font-medium mb-2 inline-block">
                    ← Dashboard
                </Link>
                <h1 className="text-xl font-bold text-gray-900">Mes Réservations</h1>
            </header>

            {/* Filters */}
            <div className="px-4 py-4">
                <div className="flex gap-2 overflow-x-auto no-scrollbar">
                    {filters.map((f) => (
                        <button
                            key={f.id}
                            onClick={() => setFilter(f.id)}
                            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all flex items-center gap-2 ${filter === f.id
                                    ? 'bg-emerald-500 text-white'
                                    : 'bg-white text-gray-600 border border-gray-200'
                                }`}
                        >
                            {f.label}
                            <span className={`text-xs ${filter === f.id ? 'bg-white/20' : 'bg-gray-100'} px-1.5 py-0.5 rounded-full`}>
                                {f.count}
                            </span>
                        </button>
                    ))}
                </div>
            </div>

            {/* Reservations List */}
            <div className="px-4 space-y-3 pb-24">
                {filteredReservations.length === 0 ? (
                    <div className="text-center py-12">
                        <span className="text-5xl">📭</span>
                        <p className="text-gray-500 mt-3">Aucune réservation</p>
                    </div>
                ) : (
                    filteredReservations.map((reservation) => (
                        <ReservationCard
                            key={reservation.id}
                            reservation={reservation}
                            onAccept={() => handleAccept(reservation.id)}
                            onReject={() => handleReject(reservation.id)}
                            onComplete={() => handleComplete(reservation.id)}
                            onCall={() => handleCall(reservation.clientPhone)}
                        />
                    ))
                )}
            </div>
        </main>
    );
}
