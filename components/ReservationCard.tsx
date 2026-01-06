'use client';

import { PartnerReservation, statusColors, statusLabels } from '@/lib/partner';

interface ReservationCardProps {
    reservation: PartnerReservation;
    onAccept?: () => void;
    onReject?: () => void;
    onComplete?: () => void;
    onCall?: () => void;
}

export function ReservationCard({ reservation, onAccept, onReject, onComplete, onCall }: ReservationCardProps) {
    const isPending = reservation.status === 'pending';
    const isConfirmed = reservation.status === 'confirmed';

    return (
        <div className="card p-4">
            {/* Header */}
            <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 font-bold">
                        {reservation.clientName.charAt(0)}
                    </div>
                    <div>
                        <h3 className="font-bold text-gray-900">{reservation.clientName}</h3>
                        <p className="text-xs text-gray-500">{reservation.createdAt}</p>
                    </div>
                </div>
                <span className={`text-[10px] font-bold uppercase px-2 py-1 rounded-full ${statusColors[reservation.status]}`}>
                    {statusLabels[reservation.status]}
                </span>
            </div>

            {/* Trip Details */}
            <div className="bg-gray-50 rounded-xl p-3 mb-3">
                {reservation.type === 'transport' && (
                    <div className="flex items-center gap-2 text-sm">
                        <span className="text-gray-400">📍</span>
                        <span className="font-medium text-gray-900">{reservation.from}</span>
                        <span className="text-gray-400">→</span>
                        <span className="font-medium text-gray-900">{reservation.to}</span>
                    </div>
                )}
                {reservation.type === 'activite' && (
                    <div className="text-sm font-medium text-gray-900">
                        🎯 {reservation.activityName}
                    </div>
                )}
                <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
                    <span>📅 {new Date(reservation.date).toLocaleDateString('fr-FR', { weekday: 'short', day: 'numeric', month: 'short' })}</span>
                    <span>🕐 {reservation.time}</span>
                    <span>👥 {reservation.passengers} pers.</span>
                </div>
            </div>

            {/* Price & Actions */}
            <div className="flex items-center justify-between">
                <div>
                    <span className="text-xl font-bold text-emerald-600">{reservation.price.toLocaleString()}</span>
                    <span className="text-sm text-gray-500 ml-1">FCFA</span>
                </div>

                <div className="flex gap-2">
                    {/* Call Button */}
                    <button
                        onClick={onCall}
                        className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center hover:bg-blue-200 transition-colors"
                    >
                        📞
                    </button>

                    {/* Pending Actions */}
                    {isPending && (
                        <>
                            <button
                                onClick={onReject}
                                className="px-4 py-2 rounded-lg bg-red-100 text-red-600 text-sm font-medium hover:bg-red-200 transition-colors"
                            >
                                Refuser
                            </button>
                            <button
                                onClick={onAccept}
                                className="px-4 py-2 rounded-lg bg-emerald-500 text-white text-sm font-bold hover:bg-emerald-600 transition-colors"
                            >
                                Accepter
                            </button>
                        </>
                    )}

                    {/* Confirmed Actions */}
                    {isConfirmed && (
                        <button
                            onClick={onComplete}
                            className="px-4 py-2 rounded-lg bg-emerald-500 text-white text-sm font-bold hover:bg-emerald-600 transition-colors"
                        >
                            Terminer
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}
