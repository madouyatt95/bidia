'use client';

import { useState } from 'react';

interface ShareTripModalProps {
    isOpen: boolean;
    onClose: () => void;
    tripDetails: {
        from: string;
        to: string;
        date: string;
        transport: string;
        price: number;
        passengers: number;
    };
}

export function ShareTripModal({ isOpen, onClose, tripDetails }: ShareTripModalProps) {
    const [copied, setCopied] = useState(false);

    if (!isOpen) return null;

    const shareMessage = `🚗 Voyage BiDiA

📍 ${tripDetails.from} → ${tripDetails.to}
📅 ${tripDetails.date}
🚌 ${tripDetails.transport}
💰 ${tripDetails.price.toLocaleString()} FCFA/pers
👥 ${tripDetails.passengers} place(s)

Rejoins-moi sur ce trajet !
🔗 https://bidia.sn/voyage/share123

Via BiDiA Sénégal 🇸🇳`;

    const handleWhatsAppShare = () => {
        window.open(`https://wa.me/?text=${encodeURIComponent(shareMessage)}`, '_blank');
    };

    const handleCopyLink = async () => {
        await navigator.clipboard.writeText('https://bidia.sn/voyage/share123');
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handleSMSShare = () => {
        window.open(`sms:?body=${encodeURIComponent(shareMessage)}`, '_blank');
    };

    return (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-end justify-center" onClick={onClose}>
            <div
                className="bg-white rounded-t-3xl w-full max-w-lg p-6 pb-10 animate-slide-up"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Handle */}
                <div className="w-12 h-1 bg-gray-300 rounded-full mx-auto mb-6" />

                <h2 className="text-xl font-bold text-gray-900 text-center mb-2">
                    Partager ce voyage
                </h2>
                <p className="text-sm text-gray-500 text-center mb-6">
                    {tripDetails.from} → {tripDetails.to}
                </p>

                {/* Trip Summary */}
                <div className="bg-gray-50 rounded-xl p-4 mb-6">
                    <div className="flex items-center justify-between text-sm mb-2">
                        <span className="text-gray-500">Transport</span>
                        <span className="font-medium text-gray-900">{tripDetails.transport}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm mb-2">
                        <span className="text-gray-500">Date</span>
                        <span className="font-medium text-gray-900">{tripDetails.date}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-500">Prix par personne</span>
                        <span className="font-bold text-emerald-600">{tripDetails.price.toLocaleString()} FCFA</span>
                    </div>
                </div>

                {/* Share Options */}
                <div className="grid grid-cols-3 gap-3 mb-6">
                    <button
                        onClick={handleWhatsAppShare}
                        className="flex flex-col items-center gap-2 p-4 bg-green-50 rounded-xl hover:bg-green-100 transition-colors"
                    >
                        <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center">
                            <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                            </svg>
                        </div>
                        <span className="text-xs font-medium text-gray-700">WhatsApp</span>
                    </button>

                    <button
                        onClick={handleSMSShare}
                        className="flex flex-col items-center gap-2 p-4 bg-blue-50 rounded-xl hover:bg-blue-100 transition-colors"
                    >
                        <div className="w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center">
                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                            </svg>
                        </div>
                        <span className="text-xs font-medium text-gray-700">SMS</span>
                    </button>

                    <button
                        onClick={handleCopyLink}
                        className="flex flex-col items-center gap-2 p-4 bg-gray-100 rounded-xl hover:bg-gray-200 transition-colors"
                    >
                        <div className="w-12 h-12 rounded-full bg-gray-500 flex items-center justify-center">
                            {copied ? (
                                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                            ) : (
                                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                                </svg>
                            )}
                        </div>
                        <span className="text-xs font-medium text-gray-700">{copied ? 'Copié !' : 'Copier'}</span>
                    </button>
                </div>

                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="w-full py-3 text-gray-500 font-medium"
                >
                    Fermer
                </button>
            </div>
        </div>
    );
}
