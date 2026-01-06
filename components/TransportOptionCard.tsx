'use client';

import { TransportOption } from '@/lib/data';

interface TransportOptionCardProps {
    option: TransportOption;
    isSelected?: boolean;
    onSelect?: () => void;
}

const comfortLabels = {
    1: 'Basique',
    2: 'Standard',
    3: 'Confort',
};

const comfortColors = {
    1: 'bg-gray-100 text-gray-600',
    2: 'bg-blue-100 text-blue-600',
    3: 'bg-emerald-100 text-emerald-600',
};

export function TransportOptionCard({ option, isSelected, onSelect }: TransportOptionCardProps) {
    return (
        <button
            onClick={onSelect}
            className={`card w-full text-left p-4 transition-all ${isSelected
                    ? 'ring-2 ring-emerald-500 border-emerald-500'
                    : 'hover:border-emerald-200'
                }`}
        >
            <div className="flex items-start gap-4">
                {/* Icon */}
                <div className="w-12 h-12 rounded-xl bg-gray-100 flex items-center justify-center text-2xl flex-shrink-0">
                    {option.icon}
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                        <div>
                            <h3 className="font-semibold text-gray-900">{option.name}</h3>
                            <p className="text-xs text-gray-500">{option.departureTime}</p>
                        </div>
                        <span className={`text-[10px] font-bold px-2 py-1 rounded-full ${comfortColors[option.comfort]}`}>
                            {comfortLabels[option.comfort]}
                        </span>
                    </div>

                    {/* Features */}
                    <div className="flex flex-wrap gap-1 mt-2">
                        {option.features.map((feature, index) => (
                            <span
                                key={index}
                                className="text-[10px] bg-gray-50 text-gray-500 px-2 py-0.5 rounded-full"
                            >
                                {feature}
                            </span>
                        ))}
                    </div>
                </div>
            </div>

            {/* Price & Duration */}
            <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-100">
                <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1 text-sm text-gray-600">
                        🕐 <span className="font-medium">{option.duration}</span>
                    </span>
                </div>
                <span className="text-lg font-bold text-emerald-600">
                    {option.price.toLocaleString()} <span className="text-xs font-normal text-gray-500">FCFA</span>
                </span>
            </div>

            {/* Selection Indicator */}
            {isSelected && (
                <div className="mt-3 text-center">
                    <span className="text-xs text-emerald-600 font-medium">✓ Sélectionné</span>
                </div>
            )}
        </button>
    );
}
