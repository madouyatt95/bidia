'use client';

interface Review {
    id: string;
    author: string;
    avatar: string;
    rating: number;
    comment: string;
    date: string;
}

interface ReviewCardProps {
    review: Review;
}

function StarRating({ rating }: { rating: number }) {
    return (
        <div className="flex gap-0.5">
            {[1, 2, 3, 4, 5].map((star) => (
                <span
                    key={star}
                    className={`text-sm ${star <= rating ? 'text-amber-400' : 'text-gray-300'}`}
                >
                    ★
                </span>
            ))}
        </div>
    );
}

export function ReviewCard({ review }: ReviewCardProps) {
    return (
        <div className="bg-gray-50 rounded-xl p-4">
            <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center text-lg flex-shrink-0">
                    {review.avatar}
                </div>
                <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                        <h4 className="font-semibold text-gray-900 text-sm">{review.author}</h4>
                        <span className="text-xs text-gray-400">{review.date}</span>
                    </div>
                    <StarRating rating={review.rating} />
                    <p className="text-sm text-gray-600 mt-2 leading-relaxed">{review.comment}</p>
                </div>
            </div>
        </div>
    );
}

export { StarRating };
export type { Review };
