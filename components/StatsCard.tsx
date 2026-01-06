'use client';

interface StatsCardProps {
    icon: string;
    label: string;
    value: string | number;
    subValue?: string;
    trend?: 'up' | 'down' | 'neutral';
    trendValue?: string;
    color?: 'emerald' | 'blue' | 'amber' | 'purple';
}

const colorClasses = {
    emerald: 'bg-emerald-50 text-emerald-600',
    blue: 'bg-blue-50 text-blue-600',
    amber: 'bg-amber-50 text-amber-600',
    purple: 'bg-purple-50 text-purple-600',
};

export function StatsCard({ icon, label, value, subValue, trend, trendValue, color = 'emerald' }: StatsCardProps) {
    return (
        <div className="card p-4">
            <div className="flex items-start justify-between">
                <div className={`w-10 h-10 rounded-xl ${colorClasses[color]} flex items-center justify-center text-xl`}>
                    {icon}
                </div>
                {trend && trendValue && (
                    <span className={`text-xs font-medium ${trend === 'up' ? 'text-emerald-600' : trend === 'down' ? 'text-red-500' : 'text-gray-500'
                        }`}>
                        {trend === 'up' ? '↑' : trend === 'down' ? '↓' : '→'} {trendValue}
                    </span>
                )}
            </div>
            <p className="text-2xl font-bold text-gray-900 mt-3">
                {typeof value === 'number' ? value.toLocaleString() : value}
            </p>
            <p className="text-xs text-gray-500">{label}</p>
            {subValue && (
                <p className="text-[10px] text-gray-400 mt-1">{subValue}</p>
            )}
        </div>
    );
}

export function StatsGrid({ children }: { children: React.ReactNode }) {
    return (
        <div className="grid grid-cols-2 gap-3">
            {children}
        </div>
    );
}
