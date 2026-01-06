'use client';

import { useState } from 'react';
import Link from 'next/link';
import { BadgeGrid } from '@/components/BadgeCard';
import {
    mockUser,
    mockRewards,
    levelColors,
    levelNames,
    getPointsToNextLevel,
    getNextLevel,
    levelThresholds
} from '@/lib/loyalty';

type Tab = 'overview' | 'badges' | 'rewards' | 'history';

export default function FidelitePage() {
    const [activeTab, setActiveTab] = useState<Tab>('overview');
    const [showRedeemModal, setShowRedeemModal] = useState<string | null>(null);

    const user = mockUser;
    const rewards = mockRewards;
    const pointsToNext = getPointsToNextLevel(user.points);
    const nextLevel = getNextLevel(user.level);

    const handleRedeem = (rewardId: string) => {
        alert(`Récompense échangée ! Vous recevrez un code par SMS.`);
        setShowRedeemModal(null);
    };

    const tabs: { id: Tab; label: string; icon: string }[] = [
        { id: 'overview', label: 'Aperçu', icon: '🏠' },
        { id: 'badges', label: 'Badges', icon: '🏅' },
        { id: 'rewards', label: 'Récompenses', icon: '🎁' },
        { id: 'history', label: 'Historique', icon: '📋' },
    ];

    return (
        <main className="flex-1 min-h-screen bg-gray-50">
            {/* Header with Points */}
            <header className={`bg-gradient-to-br ${levelColors[user.level]} text-white px-4 pt-10 pb-8 safe-area-top`}>
                <Link href="/profil" className="text-white/70 text-sm mb-2 inline-block">
                    ← Profil
                </Link>
                <h1 className="text-2xl font-bold">Programme Fidélité</h1>

                {/* Points Card */}
                <div className="mt-4 bg-white/20 backdrop-blur-sm rounded-2xl p-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-white/80 text-sm">Vos points CFA</p>
                            <p className="text-4xl font-bold">{user.points.toLocaleString()}</p>
                        </div>
                        <div className="text-right">
                            <div className="bg-white/30 px-3 py-1 rounded-full text-sm font-bold">
                                {levelNames[user.level]}
                            </div>
                        </div>
                    </div>

                    {/* Progress to Next Level */}
                    {pointsToNext && nextLevel && (
                        <div className="mt-4">
                            <div className="flex justify-between text-xs text-white/70 mb-1">
                                <span>{levelNames[user.level]}</span>
                                <span>{levelNames[nextLevel]}</span>
                            </div>
                            <div className="h-2 bg-white/30 rounded-full overflow-hidden">
                                <div
                                    className="h-full bg-white rounded-full transition-all"
                                    style={{
                                        width: `${((user.points - levelThresholds[user.level]) / (levelThresholds[nextLevel] - levelThresholds[user.level])) * 100}%`
                                    }}
                                />
                            </div>
                            <p className="text-xs text-white/70 mt-1 text-center">
                                Encore {pointsToNext} points pour atteindre {levelNames[nextLevel]}
                            </p>
                        </div>
                    )}
                </div>
            </header>

            {/* Tabs */}
            <div className="px-4 -mt-4 relative z-10">
                <div className="bg-white rounded-xl shadow-sm flex overflow-x-auto no-scrollbar">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`flex-1 py-3 px-2 text-center text-xs font-medium transition-all ${activeTab === tab.id
                                    ? 'text-emerald-600 border-b-2 border-emerald-500'
                                    : 'text-gray-500'
                                }`}
                        >
                            <span className="block">{tab.icon}</span>
                            {tab.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* Tab Content */}
            <div className="px-4 py-6 pb-24">
                {/* Overview Tab */}
                {activeTab === 'overview' && (
                    <div className="space-y-6">
                        {/* Quick Stats */}
                        <div className="grid grid-cols-2 gap-3">
                            <div className="card p-4 text-center">
                                <p className="text-3xl font-bold text-emerald-600">
                                    {user.badges.filter(b => b.unlocked).length}
                                </p>
                                <p className="text-xs text-gray-500">Badges débloqués</p>
                            </div>
                            <div className="card p-4 text-center">
                                <p className="text-3xl font-bold text-amber-600">
                                    {rewards.filter(r => r.pointsCost <= user.points).length}
                                </p>
                                <p className="text-xs text-gray-500">Récompenses disponibles</p>
                            </div>
                        </div>

                        {/* Recent Badges */}
                        <div className="card p-4">
                            <div className="flex items-center justify-between mb-3">
                                <h3 className="font-bold text-gray-900">Derniers badges</h3>
                                <button
                                    onClick={() => setActiveTab('badges')}
                                    className="text-sm text-emerald-600"
                                >
                                    Voir tout
                                </button>
                            </div>
                            <div className="flex gap-4 overflow-x-auto no-scrollbar">
                                {user.badges.filter(b => b.unlocked).slice(0, 3).map((badge) => (
                                    <div key={badge.id} className="flex-shrink-0 text-center">
                                        <div className="w-14 h-14 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-2xl shadow-lg">
                                            {badge.icon}
                                        </div>
                                        <p className="text-xs text-gray-600 mt-1">{badge.region}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* How to Earn */}
                        <div className="card p-4">
                            <h3 className="font-bold text-gray-900 mb-3">Comment gagner des points ?</h3>
                            <div className="space-y-2 text-sm">
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Réservation d'activité</span>
                                    <span className="font-bold text-emerald-600">+100-250 pts</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Transport réservé</span>
                                    <span className="font-bold text-emerald-600">+50-150 pts</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Laisser un avis</span>
                                    <span className="font-bold text-emerald-600">+25 pts</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Parrainage</span>
                                    <span className="font-bold text-emerald-600">+100 pts</span>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Badges Tab */}
                {activeTab === 'badges' && (
                    <div className="card p-4">
                        <BadgeGrid badges={user.badges} />
                    </div>
                )}

                {/* Rewards Tab */}
                {activeTab === 'rewards' && (
                    <div className="space-y-3">
                        {rewards.map((reward) => {
                            const canRedeem = reward.pointsCost <= user.points && reward.available;
                            return (
                                <div key={reward.id} className={`card p-4 ${!canRedeem ? 'opacity-60' : ''}`}>
                                    <div className="flex items-center gap-4">
                                        <div className="w-14 h-14 rounded-xl bg-emerald-100 flex items-center justify-center text-3xl">
                                            {reward.icon}
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="font-bold text-gray-900">{reward.name}</h3>
                                            <p className="text-xs text-gray-500">{reward.description}</p>
                                            <p className="text-sm font-bold text-amber-600 mt-1">
                                                {reward.pointsCost} points
                                            </p>
                                        </div>
                                        <button
                                            onClick={() => canRedeem && setShowRedeemModal(reward.id)}
                                            disabled={!canRedeem}
                                            className={`px-4 py-2 rounded-lg text-sm font-bold ${canRedeem
                                                    ? 'bg-emerald-500 text-white'
                                                    : 'bg-gray-200 text-gray-400'
                                                }`}
                                        >
                                            {canRedeem ? 'Échanger' : 'Indispo'}
                                        </button>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}

                {/* History Tab */}
                {activeTab === 'history' && (
                    <div className="card divide-y divide-gray-100">
                        {user.history.map((transaction) => (
                            <div key={transaction.id} className="p-4 flex items-center justify-between">
                                <div>
                                    <p className="font-medium text-gray-900 text-sm">{transaction.description}</p>
                                    <p className="text-xs text-gray-400">{transaction.date}</p>
                                </div>
                                <span className={`font-bold ${transaction.type === 'earn' ? 'text-emerald-600' : 'text-red-500'
                                    }`}>
                                    {transaction.type === 'earn' ? '+' : ''}{transaction.amount}
                                </span>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Redeem Modal */}
            {showRedeemModal && (
                <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setShowRedeemModal(null)}>
                    <div className="bg-white rounded-2xl p-6 w-full max-w-sm text-center" onClick={e => e.stopPropagation()}>
                        <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center text-4xl mx-auto mb-4">
                            🎁
                        </div>
                        <h2 className="text-xl font-bold text-gray-900 mb-2">Confirmer l'échange ?</h2>
                        <p className="text-sm text-gray-500 mb-6">
                            Cette action déduira les points de votre solde.
                        </p>
                        <div className="flex gap-3">
                            <button
                                onClick={() => setShowRedeemModal(null)}
                                className="flex-1 py-3 bg-gray-100 rounded-xl text-gray-700 font-medium"
                            >
                                Annuler
                            </button>
                            <button
                                onClick={() => handleRedeem(showRedeemModal)}
                                className="flex-1 py-3 bg-emerald-500 rounded-xl text-white font-bold"
                            >
                                Confirmer
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </main>
    );
}
