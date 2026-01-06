// Mock data for activities with reviews and photos

export interface Activity {
    id: string;
    title: string;
    location: string;
    region: string;
    price: number;
    rating: number;
    reviewCount: number;
    category: string;
    description: string;
    longDescription: string;
    duration: string;
    includes: string[];
    images: string[];
    reviews: Review[];
}

export interface Review {
    id: string;
    author: string;
    avatar: string;
    rating: number;
    comment: string;
    date: string;
}

export interface TouristPack {
    id: string;
    title: string;
    subtitle: string;
    duration: string;
    price: number;
    originalPrice?: number;
    image: string;
    includes: string[];
    activities: string[];
    rating: number;
    reviewCount: number;
}

export const activities: Activity[] = [
    {
        id: '1',
        title: 'Île de Gorée',
        location: 'Dakar',
        region: 'Dakar',
        price: 15000,
        rating: 4.8,
        reviewCount: 127,
        category: 'tourisme',
        description: 'Visitez cette île historique, patrimoine mondial de l\'UNESCO',
        longDescription: 'L\'île de Gorée est une petite île de 900 mètres de long sur 300 mètres de large située dans la baie de Dakar. Classée au patrimoine mondial de l\'UNESCO depuis 1978, elle fut du XVe au XIXe siècle le plus grand centre de commerce d\'esclaves de la côte africaine. Aujourd\'hui, elle est un lieu de mémoire et de recueillement, mais aussi une destination touristique prisée pour ses ruelles colorées et son atmosphère paisible.',
        duration: '4-5 heures',
        includes: ['Transport en chaloupe A/R', 'Guide francophone', 'Visite Maison des Esclaves', 'Temps libre sur l\'île'],
        images: [
            'https://images.unsplash.com/photo-1580746738099-1715a4a7fd69?w=800&h=600&fit=crop',
            'https://images.unsplash.com/photo-1589308894678-47a3a8b3d7a8?w=800&h=600&fit=crop',
            'https://images.unsplash.com/photo-1523805009345-7448845a9e53?w=800&h=600&fit=crop',
        ],
        reviews: [
            { id: 'r1', author: 'Fatou Diop', avatar: '👩🏾', rating: 5, comment: 'Une expérience émouvante et enrichissante. Le guide était excellent et très pédagogue.', date: '12 déc. 2025' },
            { id: 'r2', author: 'Jean-Pierre M.', avatar: '👨🏻', rating: 5, comment: 'Lieu chargé d\'histoire. À voir absolument lors d\'une visite à Dakar.', date: '8 déc. 2025' },
            { id: 'r3', author: 'Aminata Sow', avatar: '👩🏾‍🦱', rating: 4, comment: 'Belle visite mais beaucoup de monde le week-end. Préférez y aller en semaine.', date: '2 déc. 2025' },
        ],
    },
    {
        id: '2',
        title: 'Lac Rose',
        location: 'Dakar',
        region: 'Dakar',
        price: 25000,
        rating: 4.6,
        reviewCount: 89,
        category: 'tourisme',
        description: 'Découvrez le célèbre lac aux eaux roses',
        longDescription: 'Le Lac Rose, officiellement appelé lac Retba, est situé à 35 km au nord-est de Dakar. Sa couleur rose unique est due à une algue microscopique qui produit un pigment rouge pour résister à la forte concentration en sel. Le lac est également connu pour ses récolteurs de sel qui travaillent dans l\'eau jusqu\'à la poitrine.',
        duration: '5-6 heures',
        includes: ['Transport climatisé A/R', 'Guide local', 'Balade en pirogue', 'Démonstration récolte de sel', 'Déjeuner local'],
        images: [
            'https://images.unsplash.com/photo-1597914377769-db579a9cf921?w=800&h=600&fit=crop',
            'https://images.unsplash.com/photo-1516426122078-c23e76319801?w=800&h=600&fit=crop',
            'https://images.unsplash.com/photo-1580746738099-1715a4a7fd69?w=800&h=600&fit=crop',
        ],
        reviews: [
            { id: 'r4', author: 'Moussa Ndiaye', avatar: '👨🏾', rating: 5, comment: 'Magnifique ! La couleur rose est encore plus belle en vrai.', date: '15 déc. 2025' },
            { id: 'r5', author: 'Sophie L.', avatar: '👩🏼', rating: 4, comment: 'Très belle excursion. Le déjeuner local était délicieux.', date: '10 déc. 2025' },
        ],
    },
    {
        id: '3',
        title: 'Parc National du Djoudj',
        location: 'Saint-Louis',
        region: 'Saint-Louis',
        price: 35000,
        rating: 4.9,
        reviewCount: 56,
        category: 'tourisme',
        description: 'Observation des oiseaux dans le 3e plus grand parc ornithologique',
        longDescription: 'Le Parc national des oiseaux du Djoudj est l\'une des premières réserves ornithologiques du monde. Situé à 60 km au nord de Saint-Louis, il abrite plus de 3 millions d\'oiseaux de 400 espèces différentes, dont des pélicans, flamants roses, cormorans et hérons.',
        duration: 'Journée complète',
        includes: ['Transport depuis Saint-Louis', 'Entrée du parc', 'Guide ornithologue', 'Balade en pirogue', 'Déjeuner'],
        images: [
            'https://images.unsplash.com/photo-1516426122078-c23e76319801?w=800&h=600&fit=crop',
            'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=800&h=600&fit=crop',
        ],
        reviews: [
            { id: 'r6', author: 'Ibrahim Ba', avatar: '👨🏾‍🦳', rating: 5, comment: 'Paradis pour les amoureux de la nature. J\'ai vu des centaines de pélicans !', date: '5 déc. 2025' },
        ],
    },
    {
        id: '4',
        title: 'Safari Réserve de Bandia',
        location: 'Thiès',
        region: 'Thiès',
        price: 40000,
        rating: 4.7,
        reviewCount: 73,
        category: 'tourisme',
        description: 'Safari et découverte de la faune africaine',
        longDescription: 'La Réserve de Bandia est située à seulement 65 km de Dakar sur la route de Mbour. Cette réserve animalière de 3500 hectares abrite des girafes, rhinocéros, buffles, antilopes, singes et de nombreuses espèces d\'oiseaux dans un environnement naturel préservé.',
        duration: '4-5 heures',
        includes: ['Transport A/R depuis Dakar', 'Safari en 4x4', 'Guide animalier', 'Rafraîchissements'],
        images: [
            'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=800&h=600&fit=crop',
            'https://images.unsplash.com/photo-1516426122078-c23e76319801?w=800&h=600&fit=crop',
        ],
        reviews: [
            { id: 'r7', author: 'Aissatou Fall', avatar: '👩🏾', rating: 5, comment: 'Superbe safari ! Les enfants ont adoré voir les girafes de près.', date: '20 déc. 2025' },
            { id: 'r8', author: 'Marc D.', avatar: '👨🏻‍🦰', rating: 4, comment: 'Belle expérience, mais prévoir de la crème solaire !', date: '18 déc. 2025' },
        ],
    },
];

export const touristPacks: TouristPack[] = [
    {
        id: 'pack1',
        title: 'Week-end à Gorée',
        subtitle: 'Histoire & Culture',
        duration: '2 jours / 1 nuit',
        price: 75000,
        originalPrice: 95000,
        image: 'https://images.unsplash.com/photo-1580746738099-1715a4a7fd69?w=800&h=600&fit=crop',
        includes: ['Hébergement en maison d\'hôtes', 'Petit-déjeuner', 'Visite guidée complète', 'Transport chaloupe'],
        activities: ['Île de Gorée', 'Musée IFAN', 'Dîner sénégalais'],
        rating: 4.9,
        reviewCount: 34,
    },
    {
        id: 'pack2',
        title: 'Safari & Lac Rose',
        subtitle: 'Nature & Aventure',
        duration: '1 journée',
        price: 55000,
        originalPrice: 65000,
        image: 'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=800&h=600&fit=crop',
        includes: ['Transport climatisé', 'Safari en 4x4', 'Déjeuner', 'Guide francophone'],
        activities: ['Réserve de Bandia', 'Lac Rose'],
        rating: 4.7,
        reviewCount: 28,
    },
    {
        id: 'pack3',
        title: 'Découverte Saint-Louis',
        subtitle: 'Patrimoine UNESCO',
        duration: '3 jours / 2 nuits',
        price: 120000,
        image: 'https://images.unsplash.com/photo-1589308894678-47a3a8b3d7a8?w=800&h=600&fit=crop',
        includes: ['Hôtel 3*', 'Transport', 'Visites guidées', 'Excursion Djoudj'],
        activities: ['Saint-Louis historique', 'Parc du Djoudj', 'Langue de Barbarie'],
        rating: 4.8,
        reviewCount: 19,
    },
    {
        id: 'pack4',
        title: 'Casamance Authentique',
        subtitle: 'Tradition & Nature',
        duration: '4 jours / 3 nuits',
        price: 180000,
        image: 'https://images.unsplash.com/photo-1523805009345-7448845a9e53?w=800&h=600&fit=crop',
        includes: ['Vol A/R Dakar-Ziguinchor', 'Hébergement campement', 'Pension complète', 'Excursions'],
        activities: ['Îles du Saloum', 'Forêt de Casamance', 'Village traditionnel Diola'],
        rating: 4.9,
        reviewCount: 15,
    },
];

export function getActivityById(id: string): Activity | undefined {
    return activities.find(a => a.id === id);
}

export function getPackById(id: string): TouristPack | undefined {
    return touristPacks.find(p => p.id === id);
}

// Transport Data

export type TransportType = 'taxi' | 'bus' | 'car_rapide' | 'sept_places';

export interface TransportOption {
    id: string;
    type: TransportType;
    name: string;
    icon: string;
    price: number;
    duration: string; // in hours/minutes
    durationMinutes: number;
    departureTime?: string;
    features: string[];
    comfort: 1 | 2 | 3; // 1 = basic, 2 = standard, 3 = comfortable
    available: boolean;
}

export interface TransportRoute {
    id: string;
    from: string;
    to: string;
    distance: number; // in km
    options: TransportOption[];
}

const transportTypeInfo = {
    taxi: { name: 'Taxi Clando', icon: '🚕', comfort: 2 as const },
    bus: { name: 'Bus DDD', icon: '🚌', comfort: 2 as const },
    car_rapide: { name: 'Car Rapide', icon: '🚐', comfort: 1 as const },
    sept_places: { name: '7 Places', icon: '🚙', comfort: 3 as const },
};

export const transportRoutes: TransportRoute[] = [
    {
        id: 'dakar-saint-louis',
        from: 'Dakar',
        to: 'Saint-Louis',
        distance: 270,
        options: [
            {
                id: 'dsl-taxi',
                type: 'taxi',
                name: 'Taxi Clando',
                icon: '🚕',
                price: 12000,
                duration: '4h',
                durationMinutes: 240,
                departureTime: 'Flexible',
                features: ['Climatisation', 'Porte à porte', 'Bagages inclus'],
                comfort: 2,
                available: true,
            },
            {
                id: 'dsl-bus',
                type: 'bus',
                name: 'Bus DDD',
                icon: '🚌',
                price: 4500,
                duration: '5h30',
                durationMinutes: 330,
                departureTime: '07:00, 10:00, 14:00',
                features: ['Climatisation', 'Places numérotées'],
                comfort: 2,
                available: true,
            },
            {
                id: 'dsl-sept',
                type: 'sept_places',
                name: '7 Places (Peugeot)',
                icon: '🚙',
                price: 8000,
                duration: '4h30',
                durationMinutes: 270,
                departureTime: 'Départ quand complet',
                features: ['Confortable', 'Moins d\'arrêts'],
                comfort: 3,
                available: true,
            },
            {
                id: 'dsl-car',
                type: 'car_rapide',
                name: 'Car Rapide',
                icon: '🚐',
                price: 2500,
                duration: '7h+',
                durationMinutes: 420,
                departureTime: 'Fréquent',
                features: ['Économique', 'Nombreux arrêts'],
                comfort: 1,
                available: true,
            },
        ],
    },
    {
        id: 'dakar-thies',
        from: 'Dakar',
        to: 'Thiès',
        distance: 70,
        options: [
            {
                id: 'dt-taxi',
                type: 'taxi',
                name: 'Taxi Clando',
                icon: '🚕',
                price: 4000,
                duration: '1h15',
                durationMinutes: 75,
                departureTime: 'Flexible',
                features: ['Climatisation', 'Porte à porte'],
                comfort: 2,
                available: true,
            },
            {
                id: 'dt-bus',
                type: 'bus',
                name: 'Bus DDD',
                icon: '🚌',
                price: 1500,
                duration: '1h45',
                durationMinutes: 105,
                departureTime: 'Toutes les 30min',
                features: ['Climatisation', 'Fréquent'],
                comfort: 2,
                available: true,
            },
            {
                id: 'dt-car',
                type: 'car_rapide',
                name: 'Car Rapide',
                icon: '🚐',
                price: 700,
                duration: '2h30',
                durationMinutes: 150,
                departureTime: 'Très fréquent',
                features: ['Très économique'],
                comfort: 1,
                available: true,
            },
        ],
    },
    {
        id: 'dakar-mbour',
        from: 'Dakar',
        to: 'Mbour',
        distance: 83,
        options: [
            {
                id: 'dm-taxi',
                type: 'taxi',
                name: 'Taxi Clando',
                icon: '🚕',
                price: 5000,
                duration: '1h30',
                durationMinutes: 90,
                departureTime: 'Flexible',
                features: ['Climatisation', 'Porte à porte'],
                comfort: 2,
                available: true,
            },
            {
                id: 'dm-sept',
                type: 'sept_places',
                name: '7 Places',
                icon: '🚙',
                price: 3000,
                duration: '1h45',
                durationMinutes: 105,
                departureTime: 'Départ quand complet',
                features: ['Confortable'],
                comfort: 3,
                available: true,
            },
            {
                id: 'dm-bus',
                type: 'bus',
                name: 'Bus DDD',
                icon: '🚌',
                price: 2000,
                duration: '2h',
                durationMinutes: 120,
                departureTime: '08:00, 12:00, 16:00',
                features: ['Climatisation'],
                comfort: 2,
                available: true,
            },
        ],
    },
    {
        id: 'dakar-saly',
        from: 'Dakar',
        to: 'Saly',
        distance: 80,
        options: [
            {
                id: 'dsa-taxi',
                type: 'taxi',
                name: 'Taxi Clando',
                icon: '🚕',
                price: 6000,
                duration: '1h30',
                durationMinutes: 90,
                departureTime: 'Flexible',
                features: ['Climatisation', 'Direct'],
                comfort: 2,
                available: true,
            },
            {
                id: 'dsa-sept',
                type: 'sept_places',
                name: '7 Places',
                icon: '🚙',
                price: 3500,
                duration: '1h45',
                durationMinutes: 105,
                departureTime: 'Départ quand complet',
                features: ['Confortable'],
                comfort: 3,
                available: true,
            },
        ],
    },
    {
        id: 'dakar-touba',
        from: 'Dakar',
        to: 'Touba',
        distance: 194,
        options: [
            {
                id: 'dto-taxi',
                type: 'taxi',
                name: 'Taxi Clando',
                icon: '🚕',
                price: 10000,
                duration: '3h30',
                durationMinutes: 210,
                departureTime: 'Flexible',
                features: ['Climatisation', 'Direct'],
                comfort: 2,
                available: true,
            },
            {
                id: 'dto-sept',
                type: 'sept_places',
                name: '7 Places',
                icon: '🚙',
                price: 6000,
                duration: '4h',
                durationMinutes: 240,
                departureTime: 'Fréquent',
                features: ['Confortable'],
                comfort: 3,
                available: true,
            },
            {
                id: 'dto-bus',
                type: 'bus',
                name: 'Bus',
                icon: '🚌',
                price: 3500,
                duration: '5h',
                durationMinutes: 300,
                departureTime: '06:00, 09:00, 14:00',
                features: ['Économique'],
                comfort: 2,
                available: true,
            },
        ],
    },
    {
        id: 'dakar-ziguinchor',
        from: 'Dakar',
        to: 'Ziguinchor',
        distance: 460,
        options: [
            {
                id: 'dz-taxi',
                type: 'taxi',
                name: 'Taxi Clando',
                icon: '🚕',
                price: 25000,
                duration: '8h',
                durationMinutes: 480,
                departureTime: 'Sur réservation',
                features: ['Climatisation', 'Via Gambie'],
                comfort: 2,
                available: true,
            },
            {
                id: 'dz-sept',
                type: 'sept_places',
                name: '7 Places',
                icon: '🚙',
                price: 15000,
                duration: '9h',
                durationMinutes: 540,
                departureTime: 'Matin seulement',
                features: ['Via Gambie'],
                comfort: 3,
                available: true,
            },
            {
                id: 'dz-bus',
                type: 'bus',
                name: 'Bus Confort',
                icon: '🚌',
                price: 8000,
                duration: '12h',
                durationMinutes: 720,
                departureTime: '18:00 (nuit)',
                features: ['Voyage de nuit', 'Économique'],
                comfort: 2,
                available: true,
            },
        ],
    },
];

export function findRoute(from: string, to: string): TransportRoute | undefined {
    return transportRoutes.find(
        r => (r.from === from && r.to === to) || (r.from === to && r.to === from)
    );
}

export function getAllCities(): string[] {
    const cities = new Set<string>();
    transportRoutes.forEach(route => {
        cities.add(route.from);
        cities.add(route.to);
    });
    return Array.from(cities).sort();
}

