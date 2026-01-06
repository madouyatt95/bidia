'use client';

import { useState } from 'react';

interface ReviewFormProps {
    onSubmit: (rating: number, comment: string) => void;
}

export function ReviewForm({ onSubmit }: ReviewFormProps) {
    const [rating, setRating] = useState(0);
    const [hoverRating, setHoverRating] = useState(0);
    const [comment, setComment] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = async () => {
        if (rating === 0 || !comment.trim()) return;

        setIsSubmitting(true);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 500));
        onSubmit(rating, comment);
        setIsSubmitting(false);
        setSubmitted(true);
    };

    if (submitted) {
        return (
            <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 text-center">
                <span className="text-2xl">✅</span>
                <p className="text-emerald-700 font-medium mt-2">Merci pour votre avis !</p>
            </div>
        );
    }

    return (
        <div className="bg-white border border-gray-200 rounded-xl p-4">
            <h4 className="font-semibold text-gray-900 mb-3">Laisser un avis</h4>

            {/* Star Rating Selector */}
            <div className="flex gap-1 mb-4">
                {[1, 2, 3, 4, 5].map((star) => (
                    <button
                        key={star}
                        type="button"
                        onClick={() => setRating(star)}
                        onMouseEnter={() => setHoverRating(star)}
                        onMouseLeave={() => setHoverRating(0)}
                        className="text-2xl transition-transform hover:scale-110"
                    >
                        <span className={`${star <= (hoverRating || rating)
                                ? 'text-amber-400'
                                : 'text-gray-300'
                            }`}>
                            ★
                        </span>
                    </button>
                ))}
                {rating > 0 && (
                    <span className="ml-2 text-sm text-gray-500 self-center">
                        {rating === 1 && 'Décevant'}
                        {rating === 2 && 'Moyen'}
                        {rating === 3 && 'Bien'}
                        {rating === 4 && 'Très bien'}
                        {rating === 5 && 'Excellent !'}
                    </span>
                )}
            </div>

            {/* Comment Textarea */}
            <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Partagez votre expérience..."
                rows={3}
                className="w-full bg-gray-50 border border-gray-200 rounded-lg p-3 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
            />

            {/* Submit Button */}
            <button
                onClick={handleSubmit}
                disabled={rating === 0 || !comment.trim() || isSubmitting}
                className="mt-3 w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
            >
                {isSubmitting ? 'Envoi...' : 'Publier mon avis'}
            </button>
        </div>
    );
}
