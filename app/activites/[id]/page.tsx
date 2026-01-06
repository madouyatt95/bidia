'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { PhotoGallery } from '@/components/PhotoGallery';
import { ReviewCard, StarRating } from '@/components/ReviewCard';
import { ReviewForm } from '@/components/ReviewForm';
import { getActivityById, activities } from '@/lib/data';

export default function ActivityDetailPage() {
    const params = useParams();
    const activity = getActivityById(params.id as string);
    const [showAllReviews, setShowAllReviews] = useState(false);
    const [localReviews, setLocalReviews] = useState(activity?.reviews || []);

    if (!activity) {
        return (
            <main className="flex-1 min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <span className="text-5xl">🔍</span>
                    <p className="text-gray-500 mt-3">Activité non trouvée</p>
                    <Link href="/activites" className="text-emerald-600 font-medium mt-2 inline-block">
                        ← Retour aux activités
                    </Link>
                </div>
            </main>
        );
    }

    const handleNewReview = (rating: number, comment: string) => {
        const newReview = {
            id: `new-${Date.now()}`,
            author: 'Vous',
            avatar: '😊',
            rating,
            comment,
            date: 'À l\'instant',
        };
        setLocalReviews([newReview, ...localReviews]);
    };

    const averageRating = localReviews.length > 0
        ? (localReviews.reduce((sum, r) => sum + r.rating, 0) / localReviews.length).toFixed(1)
        : activity.rating.toFixed(1);

    const similarActivities = activities
        .filter(a => a.id !== activity.id && a.region === activity.region)
        .slice(0, 2);

    return (
        <main className="flex-1 min-h-screen bg-gray-50">
            {/* Photo Gallery */}
            <PhotoGallery images={activity.images} title={activity.title} />

            {/* Back Button */}
            <Link
                href="/activites"
                className="absolute top-4 left-4 w-10 h-10 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg z-10"
            >
                ←
            </Link>

            {/* Content */}
            <div className="px-4 pb-32 -mt-4 relative z-10">
                {/* Main Info Card */}
                <div className="card p-4 mb-4">
                    <div className="flex items-start justify-between gap-2 mb-3">
                        <div>
                            <h1 className="text-xl font-bold text-gray-900">{activity.title}</h1>
                            <p className="text-sm text-gray-500 flex items-center gap-1">
                                📍 {activity.location}
                            </p>
                        </div>
                        <div className="text-right flex-shrink-0">
                            <div className="flex items-center gap-1 text-amber-500">
                                <span className="text-lg">⭐</span>
                                <span className="font-bold">{averageRating}</span>
                            </div>
                            <p className="text-xs text-gray-400">{localReviews.length} avis</p>
                        </div>
                    </div>

                    <p className="text-sm text-gray-600 leading-relaxed mb-4">
                        {activity.longDescription}
                    </p>

                    <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                        <span className="flex items-center gap-1">
                            🕐 {activity.duration}
                        </span>
                    </div>

                    {/* Includes */}
                    <div className="border-t border-gray-100 pt-4">
                        <h3 className="font-semibold text-gray-900 text-sm mb-2">✅ Inclus</h3>
                        <div className="flex flex-wrap gap-2">
                            {activity.includes.map((item, index) => (
                                <span
                                    key={index}
                                    className="text-xs bg-emerald-50 text-emerald-700 px-2 py-1 rounded-full"
                                >
                                    {item}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Reviews Section */}
                <div className="card p-4 mb-4">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="font-bold text-gray-900">Avis ({localReviews.length})</h2>
                        <div className="flex items-center gap-1">
                            <StarRating rating={Math.round(parseFloat(averageRating))} />
                            <span className="text-sm font-medium text-gray-700 ml-1">{averageRating}</span>
                        </div>
                    </div>

                    {/* Review List */}
                    <div className="space-y-3 mb-4">
                        {(showAllReviews ? localReviews : localReviews.slice(0, 2)).map((review) => (
                            <ReviewCard key={review.id} review={review} />
                        ))}
                    </div>

                    {localReviews.length > 2 && (
                        <button
                            onClick={() => setShowAllReviews(!showAllReviews)}
                            className="w-full text-center text-sm text-emerald-600 font-medium py-2"
                        >
                            {showAllReviews ? 'Voir moins' : `Voir les ${localReviews.length - 2} autres avis`}
                        </button>
                    )}

                    {/* Review Form */}
                    <div className="border-t border-gray-100 pt-4 mt-4">
                        <ReviewForm onSubmit={handleNewReview} />
                    </div>
                </div>

                {/* Similar Activities */}
                {similarActivities.length > 0 && (
                    <div className="mb-4">
                        <h2 className="font-bold text-gray-900 mb-3">Activités similaires</h2>
                        <div className="space-y-3">
                            {similarActivities.map((similar) => (
                                <Link key={similar.id} href={`/activites/${similar.id}`} className="card flex overflow-hidden">
                                    <img
                                        src={similar.images[0]}
                                        alt={similar.title}
                                        className="w-24 h-24 object-cover"
                                    />
                                    <div className="flex-1 p-3">
                                        <h3 className="font-semibold text-gray-900 text-sm">{similar.title}</h3>
                                        <p className="text-xs text-gray-500">{similar.location}</p>
                                        <div className="flex items-center justify-between mt-2">
                                            <span className="text-emerald-600 font-bold text-sm">
                                                {similar.price.toLocaleString()} FCFA
                                            </span>
                                            <span className="text-xs text-amber-500">⭐ {similar.rating}</span>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            {/* Sticky Book Button */}
            <div className="fixed bottom-20 left-0 right-0 p-4 bg-white border-t border-gray-200 z-40">
                <div className="flex items-center justify-between max-w-lg mx-auto">
                    <div>
                        <p className="text-xs text-gray-500">À partir de</p>
                        <p className="text-xl font-bold text-emerald-600">
                            {activity.price.toLocaleString()} <span className="text-sm font-normal text-gray-500">FCFA</span>
                        </p>
                    </div>
                    <button className="btn-primary px-8">
                        Réserver
                    </button>
                </div>
            </div>
        </main>
    );
}
