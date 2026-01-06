'use client';

import { Badge } from '@/lib/loyalty';

interface BadgeCardProps {
    badge: Badge;
    size?: 'sm' | 'md' | 'lg';
}

export function BadgeCard({ badge, size = 'md' }: BadgeCardProps) {
    const sizeClasses = {
        sm: 'w-16 h-16',
        md: 'w-20 h-20',
        lg: 'w-24 h-24',
    };

    const iconSizes = {
        sm: 'text-2xl',
        md: 'text-3xl',
        lg: 'text-4xl',
    };

    return (
        <div className={`flex flex-col items-center ${badge.unlocked ? '' : 'opacity-50'}`}>
            {/* Badge Icon */}
            <div className={`${sizeClasses[size]} relative`}>
                <div className={`w-full h-full rounded-full flex items-center justify-center ${badge.unlocked
                        ? 'bg-gradient-to-br from-amber-400 to-amber-600 shadow-lg shadow-amber-500/30'
                        : 'bg-gray-200'
                    }`}>
                    <span className={`${iconSizes[size]} ${badge.unlocked ? '' : 'grayscale'}`}>
                        {badge.icon}
                    </span>
                </div>

                {/* Unlocked Checkmark */}
                {badge.unlocked && (
                    <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center text-white text-xs shadow-lg">
                        ✓
                    </div>
                )}

                {/* Progress Ring for Locked */}
                {!badge.unlocked && badge.currentVisits > 0 && (
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-xs font-bold text-gray-500">
                            {badge.currentVisits}/{badge.requiredVisits}
                        </div>
                    </div>
                )}
            </div>

            {/* Badge Name */}
            <p className={`mt-2 text-center font-medium text-gray-900 ${size === 'sm' ? 'text-xs' : 'text-sm'}`}>
                {badge.region}
            </p>

            {badge.unlocked && badge.unlockedAt && (
                <p className="text-[10px] text-gray-400">{badge.unlockedAt}</p>
            )}
        </div>
    );
}

export function BadgeGrid({ badges }: { badges: Badge[] }) {
    const unlockedCount = badges.filter(b => b.unlocked).length;

    return (
        <div>
            <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-gray-900">Badges Régionaux</h3>
                <span className="text-sm text-emerald-600 font-medium">
                    {unlockedCount}/{badges.length} débloqués
                </span>
            </div>

            <div className="grid grid-cols-3 gap-4">
                {badges.map((badge) => (
                    <BadgeCard key={badge.id} badge={badge} size="md" />
                ))}
            </div>
        </div>
    );
}
