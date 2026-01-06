import Link from 'next/link';
import { touristPacks } from '@/lib/data';

export default function PacksPage() {
    return (
        <main className="flex-1 min-h-screen bg-gray-50">
            {/* Header */}
            <header className="hero-gradient text-white px-4 pt-10 pb-12 safe-area-top">
                <h1 className="text-2xl font-bold">Packs Touristiques</h1>
                <p className="text-emerald-50 text-sm">Voyages tout-inclus au meilleur prix</p>
            </header>

            <div className="px-4 -mt-6 pb-24 space-y-4">
                {touristPacks.map((pack) => (
                    <Link key={pack.id} href={`/packs/${pack.id}`} className="card block overflow-hidden group">
                        {/* Image */}
                        <div className="relative h-44">
                            <img
                                src={pack.image}
                                alt={pack.title}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                            {/* Badge */}
                            {pack.originalPrice && (
                                <div className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                                    -{Math.round((1 - pack.price / pack.originalPrice) * 100)}%
                                </div>
                            )}

                            {/* Duration Badge */}
                            <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm text-gray-800 text-xs font-medium px-2 py-1 rounded-full">
                                🕐 {pack.duration}
                            </div>

                            {/* Title on Image */}
                            <div className="absolute bottom-3 left-3 right-3">
                                <h2 className="text-white font-bold text-lg">{pack.title}</h2>
                                <p className="text-white/80 text-sm">{pack.subtitle}</p>
                            </div>
                        </div>

                        {/* Content */}
                        <div className="p-4">
                            {/* Rating */}
                            <div className="flex items-center gap-2 mb-3">
                                <span className="text-amber-500 text-sm">⭐ {pack.rating}</span>
                                <span className="text-gray-400 text-xs">({pack.reviewCount} avis)</span>
                            </div>

                            {/* Includes */}
                            <div className="flex flex-wrap gap-1 mb-4">
                                {pack.includes.slice(0, 3).map((item, index) => (
                                    <span
                                        key={index}
                                        className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full"
                                    >
                                        ✓ {item}
                                    </span>
                                ))}
                                {pack.includes.length > 3 && (
                                    <span className="text-xs text-gray-400 px-2 py-1">
                                        +{pack.includes.length - 3}
                                    </span>
                                )}
                            </div>

                            {/* Price */}
                            <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                                <div>
                                    {pack.originalPrice && (
                                        <span className="text-sm text-gray-400 line-through mr-2">
                                            {pack.originalPrice.toLocaleString()} FCFA
                                        </span>
                                    )}
                                    <span className="text-lg font-bold text-emerald-600">
                                        {pack.price.toLocaleString()} FCFA
                                    </span>
                                </div>
                                <span className="text-sm text-emerald-600 font-medium flex items-center gap-1">
                                    Voir le pack →
                                </span>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </main>
    );
}
