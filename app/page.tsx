import Link from 'next/link';
import { activities, touristPacks } from '@/lib/data';

const categories = [
  { id: 'tourisme', name: 'Tourisme', icon: '🏝️' },
  { id: 'transport', name: 'Transport', icon: '🚗' },
  { id: 'hebergement', name: 'Hébergement', icon: '🏨' },
  { id: 'restaurants', name: 'Restaurants', icon: '🍽️' },
];

export default function HomePage() {
  const popularActivities = activities.slice(0, 3);
  const featuredPacks = touristPacks.slice(0, 2);

  return (
    <main className="flex-1">
      {/* Hero Section */}
      <section className="hero-gradient text-white px-4 pt-10 pb-16 safe-area-top">
        <h1 className="text-3xl font-bold mb-2">Bienvenue sur <span className="text-emerald-200">BiDiA</span></h1>
        <p className="text-emerald-50/80 text-sm mb-6">Découvrez le Sénégal autrement</p>

        {/* Search Bar */}
        <div className="search-bar">
          <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input type="text" placeholder="Rechercher une activité, un lieu..." />
        </div>
      </section>

      <div className="px-4 -mt-6 space-y-6 pb-6 relative z-10">
        {/* Categories */}
        <section>
          <div className="flex gap-3 overflow-x-auto no-scrollbar py-2">
            {categories.map((cat) => (
              <Link
                key={cat.id}
                href={cat.id === 'transport' ? '/transport' : `/activites?category=${cat.id}`}
                className="category-pill whitespace-nowrap"
              >
                <span>{cat.icon}</span>
                <span>{cat.name}</span>
              </Link>
            ))}
          </div>
        </section>

        {/* Featured Packs */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-gray-900">🎁 Packs Populaires</h2>
            <Link href="/packs" className="text-emerald-600 text-sm font-medium">Voir tout</Link>
          </div>

          <div className="flex gap-4 overflow-x-auto no-scrollbar">
            {featuredPacks.map((pack) => (
              <Link
                key={pack.id}
                href={`/packs/${pack.id}`}
                className="card flex-shrink-0 w-64 overflow-hidden"
              >
                <div className="relative h-32">
                  <img
                    src={pack.image}
                    alt={pack.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  {pack.originalPrice && (
                    <div className="absolute top-2 left-2 bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                      PROMO
                    </div>
                  )}
                  <div className="absolute bottom-2 left-2 right-2">
                    <h3 className="text-white font-bold text-sm">{pack.title}</h3>
                    <p className="text-white/80 text-xs">{pack.duration}</p>
                  </div>
                </div>
                <div className="p-3">
                  <div className="flex items-center justify-between">
                    <span className="text-emerald-600 font-bold text-sm">
                      {pack.price.toLocaleString()} FCFA
                    </span>
                    <span className="text-xs text-amber-500">⭐ {pack.rating}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Popular Activities */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-gray-900">Activités Populaires</h2>
            <Link href="/activites" className="text-emerald-600 text-sm font-medium">Voir tout</Link>
          </div>

          <div className="space-y-4">
            {popularActivities.map((activity) => (
              <Link key={activity.id} href={`/activites/${activity.id}`} className="card flex">
                <img
                  src={activity.images[0]}
                  alt={activity.title}
                  className="w-24 h-24 object-cover"
                />
                <div className="flex-1 p-3 flex flex-col justify-between">
                  <div>
                    <h3 className="font-semibold text-gray-900 text-sm">{activity.title}</h3>
                    <p className="text-xs text-gray-500 flex items-center gap-1">
                      📍 {activity.location}
                    </p>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-emerald-600 font-bold text-sm">
                      {activity.price.toLocaleString()} FCFA
                    </span>
                    <span className="text-xs text-amber-500 font-medium flex items-center gap-1">
                      ⭐ {activity.rating}
                      <span className="text-gray-400">({activity.reviewCount})</span>
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Quick Transport */}
        <section>
          <Link href="/transport" className="card p-4 flex items-center gap-4 bg-emerald-50 border-emerald-100">
            <div className="w-12 h-12 rounded-full bg-emerald-500 flex items-center justify-center text-xl">
              🚗
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-gray-900">Réserver un transport</h3>
              <p className="text-xs text-gray-500">Taxi, bus, et plus encore</p>
            </div>
            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </section>
      </div>
    </main>
  );
}
