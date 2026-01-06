'use client';

import Link from 'next/link';
import { useState } from 'react';
import { activities } from '@/lib/data';

const regions = ['Toutes', 'Dakar', 'Saint-Louis', 'Thiès', 'Ziguinchor'];

export default function ActivitesPage() {
    const [selectedRegion, setSelectedRegion] = useState('Toutes');

    const filteredActivities = selectedRegion === 'Toutes'
        ? activities
        : activities.filter(a => a.location === selectedRegion);

    return (
        <main className="flex-1 min-h-screen bg-gray-50">
            {/* Header */}
            <header className="bg-white px-4 pt-10 pb-6 safe-area-top shadow-sm">
                <h1 className="text-2xl font-bold text-gray-900">Activités</h1>
                <p className="text-sm text-gray-500">Explorez le Sénégal</p>
            </header>

            {/* Filters */}
            <div className="px-4 py-4 mb-2">
                <div className="flex gap-2 overflow-x-auto no-scrollbar">
                    {regions.map((region) => (
                        <button
                            key={region}
                            onClick={() => setSelectedRegion(region)}
                            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${selectedRegion === region
                                ? 'bg-emerald-500 text-white'
                                : 'bg-white text-gray-600 border border-gray-200'
                                }`}
                        >
                            {region}
                        </button>
                    ))}
                </div>
            </div>

            {/* Activities Grid */}
            <div className="px-4 space-y-4 pb-24">
                {filteredActivities.map((activity) => (
                    <Link key={activity.id} href={`/activites/${activity.id}`} className="card block">
                        <img
                            src={activity.images[0]}
                            alt={activity.title}
                            className="w-full h-48 object-cover"
                        />
                        <div className="p-4">
                            <div className="flex justify-between items-start mb-1">
                                <h3 className="font-bold text-gray-900 text-lg">{activity.title}</h3>
                                <span className="text-sm font-medium text-amber-500 flex items-center gap-1">
                                    ⭐ {activity.rating}
                                    <span className="text-gray-400 text-xs">({activity.reviewCount})</span>
                                </span>
                            </div>
                            <p className="text-sm text-gray-500 flex items-center gap-1 mb-2">
                                📍 {activity.location}
                            </p>
                            <p className="text-sm text-gray-600 line-clamp-2 mb-4">
                                {activity.description}
                            </p>
                            <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                                <span className="text-lg font-bold text-emerald-600">
                                    {activity.price.toLocaleString()} FCFA
                                </span>
                                <span className="text-emerald-600 text-sm font-semibold flex items-center gap-1">
                                    Voir détails <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                                </span>
                            </div>
                        </div>
                    </Link>
                ))}

                {filteredActivities.length === 0 && (
                    <div className="text-center py-12">
                        <span className="text-5xl">🔍</span>
                        <p className="text-gray-500 mt-3">Aucune activité trouvée dans cette région</p>
                    </div>
                )}
            </div>
        </main>
    );
}
