// Partner Portal Data

export type PartnerType = 'chauffeur' | 'prestataire';
export type ReservationStatus = 'pending' | 'confirmed' | 'completed' | 'cancelled';

export interface Partner {
    id: string;
    name: string;
    type: PartnerType;
    phone: string;
    rating: number;
    totalTrips: number;
    totalEarnings: number;
    vehicleType?: string;
    activitiesOffered?: string[];
    joinedDate: string;
}

export interface PartnerReservation {
    id: string;
    type: 'transport' | 'activite';
    clientName: string;
    clientPhone: string;
    status: ReservationStatus;
    date: string;
    time: string;
    from?: string;
    to?: string;
    activityName?: string;
    passengers: number;
    price: number;
    createdAt: string;
}

export interface PartnerStats {
    todayEarnings: number;
    weekEarnings: number;
    monthEarnings: number;
    totalTrips: number;
    completedToday: number;
    pendingReservations: number;
    rating: number;
    reviewCount: number;
}

export const mockPartner: Partner = {
    id: 'p1',
    name: 'Ibrahima Sarr',
    type: 'chauffeur',
    phone: '+221 77 456 78 90',
    rating: 4.8,
    totalTrips: 234,
    totalEarnings: 1850000,
    vehicleType: 'Toyota Corolla - Taxi Clando',
    joinedDate: 'Mars 2024',
};

export const mockReservations: PartnerReservation[] = [
    {
        id: 'r1',
        type: 'transport',
        clientName: 'Fatou Ndiaye',
        clientPhone: '+221 77 111 22 33',
        status: 'pending',
        date: '2026-01-06',
        time: '09:00',
        from: 'Dakar',
        to: 'Saint-Louis',
        passengers: 2,
        price: 24000,
        createdAt: 'Il y a 15 min',
    },
    {
        id: 'r2',
        type: 'transport',
        clientName: 'Moussa Diop',
        clientPhone: '+221 77 444 55 66',
        status: 'pending',
        date: '2026-01-06',
        time: '14:00',
        from: 'Dakar',
        to: 'Thiès',
        passengers: 1,
        price: 4000,
        createdAt: 'Il y a 30 min',
    },
    {
        id: 'r3',
        type: 'transport',
        clientName: 'Aminata Fall',
        clientPhone: '+221 77 777 88 99',
        status: 'confirmed',
        date: '2026-01-06',
        time: '16:30',
        from: 'Dakar',
        to: 'Mbour',
        passengers: 3,
        price: 15000,
        createdAt: 'Il y a 2h',
    },
    {
        id: 'r4',
        type: 'transport',
        clientName: 'Omar Sy',
        clientPhone: '+221 77 222 33 44',
        status: 'completed',
        date: '2026-01-05',
        time: '10:00',
        from: 'Dakar',
        to: 'Saly',
        passengers: 4,
        price: 24000,
        createdAt: 'Hier',
    },
    {
        id: 'r5',
        type: 'transport',
        clientName: 'Awa Gueye',
        clientPhone: '+221 77 555 66 77',
        status: 'completed',
        date: '2026-01-05',
        time: '15:00',
        from: 'Saint-Louis',
        to: 'Dakar',
        passengers: 2,
        price: 24000,
        createdAt: 'Hier',
    },
];

export const mockStats: PartnerStats = {
    todayEarnings: 15000,
    weekEarnings: 125000,
    monthEarnings: 485000,
    totalTrips: 234,
    completedToday: 2,
    pendingReservations: 2,
    rating: 4.8,
    reviewCount: 89,
};

export const statusColors: Record<ReservationStatus, string> = {
    pending: 'bg-amber-100 text-amber-700',
    confirmed: 'bg-blue-100 text-blue-700',
    completed: 'bg-emerald-100 text-emerald-700',
    cancelled: 'bg-red-100 text-red-700',
};

export const statusLabels: Record<ReservationStatus, string> = {
    pending: 'En attente',
    confirmed: 'Confirmé',
    completed: 'Terminé',
    cancelled: 'Annulé',
};
