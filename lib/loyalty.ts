// Loyalty System Data

export interface LoyaltyUser {
    points: number;
    level: 'bronze' | 'silver' | 'gold' | 'platinum';
    badges: Badge[];
    history: PointTransaction[];
}

export interface Badge {
    id: string;
    name: string;
    region: string;
    icon: string;
    description: string;
    unlocked: boolean;
    unlockedAt?: string;
    requiredVisits: number;
    currentVisits: number;
}

export interface PointTransaction {
    id: string;
    type: 'earn' | 'redeem';
    amount: number;
    description: string;
    date: string;
}

export interface Reward {
    id: string;
    name: string;
    description: string;
    pointsCost: number;
    icon: string;
    available: boolean;
}

export const levelThresholds = {
    bronze: 0,
    silver: 500,
    gold: 2000,
    platinum: 5000,
};

export const levelColors = {
    bronze: 'from-amber-600 to-amber-800',
    silver: 'from-gray-400 to-gray-600',
    gold: 'from-yellow-400 to-yellow-600',
    platinum: 'from-purple-400 to-purple-600',
};

export const levelNames = {
    bronze: 'Bronze',
    silver: 'Argent',
    gold: 'Or',
    platinum: 'Platine',
};

export const mockBadges: Badge[] = [
    {
        id: 'dakar',
        name: 'Explorateur de Dakar',
        region: 'Dakar',
        icon: '🏙️',
        description: 'Visitez 3 lieux à Dakar',
        unlocked: true,
        unlockedAt: '15 déc. 2025',
        requiredVisits: 3,
        currentVisits: 3,
    },
    {
        id: 'saint-louis',
        name: 'Découvreur de Saint-Louis',
        region: 'Saint-Louis',
        icon: '🏛️',
        description: 'Visitez 2 lieux à Saint-Louis',
        unlocked: true,
        unlockedAt: '28 déc. 2025',
        requiredVisits: 2,
        currentVisits: 2,
    },
    {
        id: 'thies',
        name: 'Aventurier de Thiès',
        region: 'Thiès',
        icon: '🦒',
        description: 'Visitez la Réserve de Bandia',
        unlocked: false,
        requiredVisits: 1,
        currentVisits: 0,
    },
    {
        id: 'casamance',
        name: 'Voyageur de Casamance',
        region: 'Casamance',
        icon: '🌴',
        description: 'Explorez la Casamance',
        unlocked: false,
        requiredVisits: 2,
        currentVisits: 0,
    },
    {
        id: 'saly',
        name: 'Plage de Saly',
        region: 'Saly',
        icon: '🏖️',
        description: 'Détendez-vous à Saly',
        unlocked: false,
        requiredVisits: 1,
        currentVisits: 0,
    },
    {
        id: 'touba',
        name: 'Pèlerin de Touba',
        region: 'Touba',
        icon: '🕌',
        description: 'Visitez la Grande Mosquée',
        unlocked: false,
        requiredVisits: 1,
        currentVisits: 0,
    },
];

export const mockHistory: PointTransaction[] = [
    { id: 't1', type: 'earn', amount: 250, description: 'Réservation Île de Gorée', date: '15 déc. 2025' },
    { id: 't2', type: 'earn', amount: 150, description: 'Transport Dakar-Saint-Louis', date: '28 déc. 2025' },
    { id: 't3', type: 'earn', amount: 100, description: 'Bonus de bienvenue', date: '1 déc. 2025' },
    { id: 't4', type: 'redeem', amount: -200, description: 'Réduction 10%', date: '20 déc. 2025' },
];

export const mockRewards: Reward[] = [
    {
        id: 'r1',
        name: '5% de réduction',
        description: 'Sur votre prochaine réservation',
        pointsCost: 100,
        icon: '🎫',
        available: true,
    },
    {
        id: 'r2',
        name: '10% de réduction',
        description: 'Sur votre prochaine activité',
        pointsCost: 200,
        icon: '🎟️',
        available: true,
    },
    {
        id: 'r3',
        name: 'Transport gratuit',
        description: 'Un trajet offert (max 5000 FCFA)',
        pointsCost: 500,
        icon: '🚗',
        available: true,
    },
    {
        id: 'r4',
        name: 'Activité offerte',
        description: 'Une excursion gratuite',
        pointsCost: 1000,
        icon: '🎁',
        available: false,
    },
];

export const mockUser: LoyaltyUser = {
    points: 300,
    level: 'bronze',
    badges: mockBadges,
    history: mockHistory,
};

export function getLevel(points: number): 'bronze' | 'silver' | 'gold' | 'platinum' {
    if (points >= levelThresholds.platinum) return 'platinum';
    if (points >= levelThresholds.gold) return 'gold';
    if (points >= levelThresholds.silver) return 'silver';
    return 'bronze';
}

export function getNextLevel(currentLevel: 'bronze' | 'silver' | 'gold' | 'platinum') {
    const levels = ['bronze', 'silver', 'gold', 'platinum'] as const;
    const currentIndex = levels.indexOf(currentLevel);
    if (currentIndex >= levels.length - 1) return null;
    return levels[currentIndex + 1];
}

export function getPointsToNextLevel(points: number): number | null {
    const level = getLevel(points);
    const nextLevel = getNextLevel(level);
    if (!nextLevel) return null;
    return levelThresholds[nextLevel] - points;
}
