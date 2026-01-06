'use client';

import { useState } from 'react';

interface CityWeather {
    city: string;
    temp: number;
    condition: string;
    icon: string;
    humidity: number;
    wind: number;
}

const mockWeather: CityWeather[] = [
    { city: 'Dakar', temp: 28, condition: 'Ensoleillé', icon: '☀️', humidity: 65, wind: 18 },
    { city: 'Saint-Louis', temp: 26, condition: 'Partiellement nuageux', icon: '⛅', humidity: 70, wind: 22 },
    { city: 'Thiès', temp: 32, condition: 'Très ensoleillé', icon: '🌞', humidity: 45, wind: 12 },
    { city: 'Ziguinchor', temp: 30, condition: 'Nuageux', icon: '☁️', humidity: 80, wind: 8 },
    { city: 'Saly', temp: 29, condition: 'Ensoleillé', icon: '☀️', humidity: 68, wind: 15 },
    { city: 'Mbour', temp: 27, condition: 'Brise marine', icon: '🌊', humidity: 72, wind: 20 },
];

export function WeatherWidget() {
    const [selectedCity, setSelectedCity] = useState(mockWeather[0]);

    return (
        <div className="card overflow-hidden">
            {/* Weather Display */}
            <div className="bg-gradient-to-br from-blue-400 to-blue-600 text-white p-6">
                <div className="flex items-center justify-between mb-4">
                    <div>
                        <h3 className="text-lg font-bold">{selectedCity.city}</h3>
                        <p className="text-blue-100 text-sm">{selectedCity.condition}</p>
                    </div>
                    <span className="text-5xl">{selectedCity.icon}</span>
                </div>
                <div className="text-5xl font-light mb-4">
                    {selectedCity.temp}°<span className="text-2xl">C</span>
                </div>
                <div className="flex gap-6 text-sm text-blue-100">
                    <div className="flex items-center gap-1">
                        💧 {selectedCity.humidity}%
                    </div>
                    <div className="flex items-center gap-1">
                        💨 {selectedCity.wind} km/h
                    </div>
                </div>
            </div>

            {/* City Selector */}
            <div className="p-4 bg-gray-50">
                <p className="text-xs text-gray-400 mb-2 font-medium">Choisir une ville</p>
                <div className="flex gap-2 overflow-x-auto no-scrollbar">
                    {mockWeather.map((weather) => (
                        <button
                            key={weather.city}
                            onClick={() => setSelectedCity(weather)}
                            className={`px-3 py-2 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${selectedCity.city === weather.city
                                    ? 'bg-blue-500 text-white'
                                    : 'bg-white text-gray-600 border border-gray-200'
                                }`}
                        >
                            {weather.icon} {weather.city}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}
