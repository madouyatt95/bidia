'use client';

import { useState } from 'react';
import Link from 'next/link';
import { SplitCalculator } from '@/components/SplitCalculator';

interface TravelGroup {
    id: string;
    name: string;
    members: string[];
    totalExpenses: number;
    createdAt: string;
}

const mockGroups: TravelGroup[] = [
    {
        id: '1',
        name: 'Week-end Saint-Louis',
        members: ['Moi', 'Fatou', 'Moussa', 'Aminata'],
        totalExpenses: 85000,
        createdAt: '2 jan. 2026',
    },
    {
        id: '2',
        name: 'Safari Bandia',
        members: ['Moi', 'Papa', 'Maman'],
        totalExpenses: 120000,
        createdAt: '28 déc. 2025',
    },
];

export default function GroupesPage() {
    const [groups, setGroups] = useState<TravelGroup[]>(mockGroups);
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [showSplitCalculator, setShowSplitCalculator] = useState(false);
    const [newGroupName, setNewGroupName] = useState('');

    const createGroup = () => {
        if (!newGroupName.trim()) return;
        const newGroup: TravelGroup = {
            id: Date.now().toString(),
            name: newGroupName.trim(),
            members: ['Moi'],
            totalExpenses: 0,
            createdAt: new Date().toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' }),
        };
        setGroups([newGroup, ...groups]);
        setNewGroupName('');
        setShowCreateModal(false);
    };

    return (
        <main className="flex-1 min-h-screen bg-gray-50">
            {/* Header */}
            <header className="bg-white px-4 pt-10 pb-6 safe-area-top shadow-sm">
                <h1 className="text-2xl font-bold text-gray-900">Groupes de Voyage</h1>
                <p className="text-sm text-gray-500">Partagez vos frais entre amis</p>
            </header>

            <div className="px-4 py-6 space-y-6 pb-24">
                {/* Quick Actions */}
                <div className="grid grid-cols-2 gap-3">
                    <button
                        onClick={() => setShowCreateModal(true)}
                        className="card p-4 text-left hover:border-emerald-200 transition-colors"
                    >
                        <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 text-xl mb-2">
                            +
                        </div>
                        <h3 className="font-semibold text-gray-900 text-sm">Nouveau groupe</h3>
                        <p className="text-xs text-gray-500">Créer un voyage</p>
                    </button>

                    <button
                        onClick={() => setShowSplitCalculator(true)}
                        className="card p-4 text-left hover:border-emerald-200 transition-colors"
                    >
                        <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 text-xl mb-2">
                            💸
                        </div>
                        <h3 className="font-semibold text-gray-900 text-sm">Calculer</h3>
                        <p className="text-xs text-gray-500">Partage rapide</p>
                    </button>
                </div>

                {/* Groups List */}
                <section>
                    <h2 className="font-semibold text-gray-700 mb-3">Mes groupes</h2>
                    <div className="space-y-3">
                        {groups.map((group) => (
                            <div key={group.id} className="card p-4">
                                <div className="flex items-start justify-between mb-3">
                                    <div>
                                        <h3 className="font-bold text-gray-900">{group.name}</h3>
                                        <p className="text-xs text-gray-500">{group.createdAt}</p>
                                    </div>
                                    <span className="text-lg font-bold text-emerald-600">
                                        {group.totalExpenses.toLocaleString()} F
                                    </span>
                                </div>

                                {/* Members */}
                                <div className="flex items-center gap-1 mb-3">
                                    {group.members.slice(0, 4).map((member, index) => (
                                        <div
                                            key={index}
                                            className="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center text-white text-xs font-bold -ml-2 first:ml-0 border-2 border-white"
                                        >
                                            {member.charAt(0)}
                                        </div>
                                    ))}
                                    {group.members.length > 4 && (
                                        <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 text-xs font-bold -ml-2 border-2 border-white">
                                            +{group.members.length - 4}
                                        </div>
                                    )}
                                    <span className="ml-2 text-xs text-gray-500">
                                        {group.members.length} membre{group.members.length > 1 ? 's' : ''}
                                    </span>
                                </div>

                                {/* Per Person */}
                                <div className="bg-gray-50 rounded-lg p-3 flex justify-between items-center">
                                    <span className="text-sm text-gray-500">Par personne</span>
                                    <span className="font-bold text-gray-900">
                                        {Math.ceil(group.totalExpenses / group.members.length).toLocaleString()} FCFA
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {groups.length === 0 && (
                    <div className="text-center py-12">
                        <span className="text-5xl">👥</span>
                        <p className="text-gray-500 mt-3">Aucun groupe de voyage</p>
                        <button
                            onClick={() => setShowCreateModal(true)}
                            className="btn-primary mt-4"
                        >
                            Créer mon premier groupe
                        </button>
                    </div>
                )}
            </div>

            {/* Create Group Modal */}
            {showCreateModal && (
                <div className="fixed inset-0 bg-black/50 z-50 flex items-end justify-center" onClick={() => setShowCreateModal(false)}>
                    <div
                        className="bg-white rounded-t-3xl w-full max-w-lg p-6 pb-10"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="w-12 h-1 bg-gray-300 rounded-full mx-auto mb-6" />
                        <h2 className="text-xl font-bold text-gray-900 text-center mb-6">
                            Nouveau groupe
                        </h2>
                        <input
                            type="text"
                            value={newGroupName}
                            onChange={(e) => setNewGroupName(e.target.value)}
                            placeholder="Nom du voyage (ex: Week-end Saly)"
                            className="w-full bg-gray-50 border border-gray-200 rounded-xl p-4 text-gray-900 mb-4"
                            autoFocus
                        />
                        <button
                            onClick={createGroup}
                            disabled={!newGroupName.trim()}
                            className="btn-primary w-full disabled:opacity-50"
                        >
                            Créer le groupe
                        </button>
                    </div>
                </div>
            )}

            {/* Split Calculator Modal */}
            {showSplitCalculator && (
                <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setShowSplitCalculator(false)}>
                    <div
                        className="bg-white rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="p-4 border-b border-gray-100 flex justify-between items-center sticky top-0 bg-white">
                            <h2 className="font-bold text-gray-900">Calcul rapide</h2>
                            <button onClick={() => setShowSplitCalculator(false)} className="text-gray-400">
                                ✕
                            </button>
                        </div>
                        <div className="p-4">
                            <SplitCalculator onShare={() => setShowSplitCalculator(false)} />
                        </div>
                    </div>
                </div>
            )}
        </main>
    );
}
