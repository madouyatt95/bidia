'use client';

import { useState } from 'react';

type ServiceType = 'atm' | 'pharmacy' | 'gas';

interface Service {
    id: string;
    name: string;
    type: ServiceType;
    address: string;
    distance: string;
    hours: string;
    city: string;
}

const mockServices: Service[] = [
    // Dakar
    { id: '1', name: 'CBAO Agence Plateau', type: 'atm', address: 'Place de l\'Indépendance', distance: '250m', hours: '24h/24', city: 'Dakar' },
    { id: '2', name: 'SGBS Corniche', type: 'atm', address: 'Route de la Corniche Ouest', distance: '800m', hours: '24h/24', city: 'Dakar' },
    { id: '3', name: 'Pharmacie Guigon', type: 'pharmacy', address: 'Rue Vincens, Plateau', distance: '150m', hours: '8h-22h', city: 'Dakar' },
    { id: '4', name: 'Pharmacie Mame Diarra', type: 'pharmacy', address: 'Médina', distance: '1.2km', hours: '24h (garde)', city: 'Dakar' },
    { id: '5', name: 'Total Corniche', type: 'gas', address: 'Corniche Ouest', distance: '450m', hours: '6h-23h', city: 'Dakar' },
    { id: '6', name: 'Shell VDN', type: 'gas', address: 'Voie de Dégagement Nord', distance: '2km', hours: '24h/24', city: 'Dakar' },
    // Saint-Louis
    { id: '7', name: 'Ecobank Saint-Louis', type: 'atm', address: 'Avenue Jean Mermoz', distance: '200m', hours: '24h/24', city: 'Saint-Louis' },
    { id: '8', name: 'Pharmacie de l\'Île', type: 'pharmacy', address: 'Île de Saint-Louis', distance: '100m', hours: '8h-20h', city: 'Saint-Louis' },
    { id: '9', name: 'Oilibya Centre', type: 'gas', address: 'Route de Dakar', distance: '1.5km', hours: '7h-21h', city: 'Saint-Louis' },
    // Thiès
    { id: '10', name: 'BICIS Thiès', type: 'atm', address: 'Avenue Léopold Senghor', distance: '300m', hours: '24h/24', city: 'Thiès' },
    { id: '11', name: 'Pharmacie Centrale', type: 'pharmacy', address: 'Centre-ville', distance: '250m', hours: '8h-21h', city: 'Thiès' },
    { id: '12', name: 'Total Thiès', type: 'gas', address: 'Sortie autoroute', distance: '500m', hours: '24h/24', city: 'Thiès' },
];

const serviceConfig = {
    atm: { label: 'GAB / ATM', icon: '🏧', color: 'blue' },
    pharmacy: { label: 'Pharmacie', icon: '💊', color: 'green' },
    gas: { label: 'Station', icon: '⛽', color: 'orange' },
};

const cities = ['Dakar', 'Saint-Louis', 'Thiès'];

export function NearbyServices() {
    const [selectedType, setSelectedType] = useState<ServiceType | 'all'>('all');
    const [selectedCity, setSelectedCity] = useState('Dakar');

    const filteredServices = mockServices.filter(
        (s) => s.city === selectedCity && (selectedType === 'all' || s.type === selectedType)
    );

    return (
        <div className="card p-4">
            <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                📍 Services à Proximité
            </h3>

            {/* City Selector */}
            <div className="flex gap-2 mb-4">
                {cities.map((city) => (
                    <button
                        key={city}
                        onClick={() => setSelectedCity(city)}
                        className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${selectedCity === city
                                ? 'bg-emerald-500 text-white'
                                : 'bg-gray-100 text-gray-600'
                            }`}
                    >
                        {city}
                    </button>
                ))}
            </div>

            {/* Type Filters */}
            <div className="flex gap-2 mb-4 overflow-x-auto no-scrollbar">
                <button
                    onClick={() => setSelectedType('all')}
                    className={`px-3 py-2 rounded-full text-xs font-medium whitespace-nowrap transition-all ${selectedType === 'all'
                            ? 'bg-gray-900 text-white'
                            : 'bg-gray-100 text-gray-600'
                        }`}
                >
                    Tous
                </button>
                {(Object.keys(serviceConfig) as ServiceType[]).map((type) => (
                    <button
                        key={type}
                        onClick={() => setSelectedType(type)}
                        className={`px-3 py-2 rounded-full text-xs font-medium whitespace-nowrap transition-all flex items-center gap-1 ${selectedType === type
                                ? 'bg-gray-900 text-white'
                                : 'bg-gray-100 text-gray-600'
                            }`}
                    >
                        <span>{serviceConfig[type].icon}</span>
                        <span>{serviceConfig[type].label}</span>
                    </button>
                ))}
            </div>

            {/* Services List */}
            <div className="space-y-3 max-h-80 overflow-y-auto">
                {filteredServices.map((service) => (
                    <div
                        key={service.id}
                        className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl"
                    >
                        <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-xl shadow-sm">
                            {serviceConfig[service.type].icon}
                        </div>
                        <div className="flex-1 min-w-0">
                            <h4 className="font-semibold text-gray-900 text-sm truncate">{service.name}</h4>
                            <p className="text-xs text-gray-500 truncate">{service.address}</p>
                        </div>
                        <div className="text-right flex-shrink-0">
                            <p className="text-sm font-bold text-emerald-600">{service.distance}</p>
                            <p className="text-[10px] text-gray-400">{service.hours}</p>
                        </div>
                    </div>
                ))}
                {filteredServices.length === 0 && (
                    <p className="text-center text-gray-400 py-4 text-sm">Aucun service trouvé</p>
                )}
            </div>
        </div>
    );
}
