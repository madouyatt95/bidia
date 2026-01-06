'use client';

import { useState } from 'react';

interface Member {
    id: string;
    name: string;
    paid: number;
}

interface SplitCalculatorProps {
    totalAmount?: number;
    tripDetails?: string;
    onShare?: (members: Member[]) => void;
}

export function SplitCalculator({ totalAmount = 0, tripDetails, onShare }: SplitCalculatorProps) {
    const [amount, setAmount] = useState(totalAmount);
    const [members, setMembers] = useState<Member[]>([
        { id: '1', name: 'Moi', paid: 0 },
    ]);
    const [newMemberName, setNewMemberName] = useState('');

    const addMember = () => {
        if (!newMemberName.trim()) return;
        setMembers([
            ...members,
            { id: Date.now().toString(), name: newMemberName.trim(), paid: 0 },
        ]);
        setNewMemberName('');
    };

    const removeMember = (id: string) => {
        if (members.length <= 1) return;
        setMembers(members.filter(m => m.id !== id));
    };

    const updatePaid = (id: string, paid: number) => {
        setMembers(members.map(m => m.id === id ? { ...m, paid } : m));
    };

    const perPerson = members.length > 0 ? Math.ceil(amount / members.length) : 0;
    const totalPaid = members.reduce((sum, m) => sum + m.paid, 0);
    const remaining = amount - totalPaid;

    const getBalance = (member: Member) => {
        const shouldPay = perPerson;
        return member.paid - shouldPay;
    };

    const handleShare = () => {
        const message = `💰 Partage de frais - ${tripDetails || 'Voyage'}

Total: ${amount.toLocaleString()} FCFA
Participants: ${members.length}
Par personne: ${perPerson.toLocaleString()} FCFA

${members.map(m => {
            const balance = getBalance(m);
            const status = balance >= 0 ? '✅' : '⏳';
            return `${status} ${m.name}: ${balance >= 0 ? 'OK' : `doit ${Math.abs(balance).toLocaleString()} FCFA`}`;
        }).join('\n')}

Via BiDiA Sénégal 🇸🇳`;

        const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;
        window.open(whatsappUrl, '_blank');

        if (onShare) onShare(members);
    };

    return (
        <div className="card p-4">
            <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                💸 Partage de Frais
            </h3>

            {/* Total Amount */}
            <div className="mb-4">
                <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                    Montant total
                </label>
                <div className="relative">
                    <input
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(Number(e.target.value))}
                        className="w-full bg-gray-50 border border-gray-200 rounded-xl p-4 text-2xl font-bold text-gray-900 pr-16"
                    />
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm">
                        FCFA
                    </span>
                </div>
            </div>

            {/* Per Person Display */}
            <div className="bg-emerald-50 rounded-xl p-4 mb-4 text-center">
                <p className="text-sm text-emerald-600 font-medium">Par personne</p>
                <p className="text-3xl font-bold text-emerald-700">
                    {perPerson.toLocaleString()} <span className="text-lg font-normal">FCFA</span>
                </p>
                <p className="text-xs text-emerald-500 mt-1">pour {members.length} personne{members.length > 1 ? 's' : ''}</p>
            </div>

            {/* Members List */}
            <div className="mb-4">
                <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                    Participants
                </label>
                <div className="space-y-2">
                    {members.map((member) => {
                        const balance = getBalance(member);
                        return (
                            <div
                                key={member.id}
                                className="flex items-center gap-3 bg-gray-50 rounded-xl p-3"
                            >
                                <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 font-bold text-sm">
                                    {member.name.charAt(0).toUpperCase()}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="font-medium text-gray-900 text-sm truncate">{member.name}</p>
                                    <p className={`text-xs ${balance >= 0 ? 'text-emerald-600' : 'text-orange-600'}`}>
                                        {balance >= 0 ? `+${balance.toLocaleString()}` : balance.toLocaleString()} FCFA
                                    </p>
                                </div>
                                <input
                                    type="number"
                                    value={member.paid || ''}
                                    onChange={(e) => updatePaid(member.id, Number(e.target.value))}
                                    placeholder="Payé"
                                    className="w-24 bg-white border border-gray-200 rounded-lg px-2 py-1 text-sm text-right"
                                />
                                {members.length > 1 && (
                                    <button
                                        onClick={() => removeMember(member.id)}
                                        className="text-red-400 hover:text-red-600"
                                    >
                                        ✕
                                    </button>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Add Member */}
            <div className="flex gap-2 mb-4">
                <input
                    type="text"
                    value={newMemberName}
                    onChange={(e) => setNewMemberName(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && addMember()}
                    placeholder="Nom du participant"
                    className="flex-1 bg-gray-50 border border-gray-200 rounded-xl p-3 text-sm"
                />
                <button
                    onClick={addMember}
                    className="px-4 py-3 bg-emerald-100 text-emerald-600 rounded-xl font-bold hover:bg-emerald-200 transition-colors"
                >
                    +
                </button>
            </div>

            {/* Summary */}
            {totalPaid > 0 && (
                <div className="bg-gray-50 rounded-xl p-3 mb-4">
                    <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Total payé</span>
                        <span className="font-medium text-gray-900">{totalPaid.toLocaleString()} FCFA</span>
                    </div>
                    <div className="flex justify-between text-sm mt-1">
                        <span className="text-gray-500">Reste à payer</span>
                        <span className={`font-bold ${remaining > 0 ? 'text-orange-600' : 'text-emerald-600'}`}>
                            {remaining.toLocaleString()} FCFA
                        </span>
                    </div>
                </div>
            )}

            {/* Share Button */}
            <button
                onClick={handleShare}
                className="w-full py-4 bg-green-500 text-white font-bold rounded-xl flex items-center justify-center gap-2 hover:bg-green-600 transition-colors"
            >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                Partager via WhatsApp
            </button>
        </div>
    );
}
