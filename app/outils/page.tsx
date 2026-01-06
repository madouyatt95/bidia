import { CurrencyConverter } from '@/components/CurrencyConverter';
import { NearbyServices } from '@/components/NearbyServices';
import { WeatherWidget } from '@/components/WeatherWidget';

export default function OutilsPage() {
    return (
        <main className="flex-1 min-h-screen bg-gray-50">
            {/* Header */}
            <header className="bg-white px-4 pt-10 pb-6 safe-area-top shadow-sm">
                <h1 className="text-2xl font-bold text-gray-900">Outils Voyageur</h1>
                <p className="text-sm text-gray-500">Tout pour faciliter votre séjour</p>
            </header>

            <div className="px-4 py-6 space-y-6 pb-24">
                {/* Weather */}
                <WeatherWidget />

                {/* Currency Converter */}
                <CurrencyConverter />

                {/* Nearby Services */}
                <NearbyServices />

                {/* Emergency Numbers */}
                <div className="card p-4">
                    <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                        🆘 Numéros d'Urgence
                    </h3>
                    <div className="grid grid-cols-2 gap-3">
                        <a href="tel:17" className="flex items-center gap-3 p-3 bg-red-50 rounded-xl">
                            <span className="text-2xl">🚔</span>
                            <div>
                                <p className="font-bold text-red-600">17</p>
                                <p className="text-xs text-gray-500">Police</p>
                            </div>
                        </a>
                        <a href="tel:18" className="flex items-center gap-3 p-3 bg-orange-50 rounded-xl">
                            <span className="text-2xl">🚒</span>
                            <div>
                                <p className="font-bold text-orange-600">18</p>
                                <p className="text-xs text-gray-500">Pompiers</p>
                            </div>
                        </a>
                        <a href="tel:1515" className="flex items-center gap-3 p-3 bg-blue-50 rounded-xl">
                            <span className="text-2xl">🏥</span>
                            <div>
                                <p className="font-bold text-blue-600">1515</p>
                                <p className="text-xs text-gray-500">SAMU</p>
                            </div>
                        </a>
                        <a href="tel:800001515" className="flex items-center gap-3 p-3 bg-purple-50 rounded-xl">
                            <span className="text-2xl">📞</span>
                            <div>
                                <p className="font-bold text-purple-600">800 00 15 15</p>
                                <p className="text-xs text-gray-500">SOS Médecin</p>
                            </div>
                        </a>
                    </div>
                </div>

                {/* Useful Info */}
                <div className="card p-4">
                    <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                        ℹ️ Infos Pratiques
                    </h3>
                    <div className="space-y-3 text-sm">
                        <div className="flex justify-between py-2 border-b border-gray-100">
                            <span className="text-gray-500">🕐 Fuseau horaire</span>
                            <span className="font-medium text-gray-900">UTC+0 (GMT)</span>
                        </div>
                        <div className="flex justify-between py-2 border-b border-gray-100">
                            <span className="text-gray-500">🔌 Électricité</span>
                            <span className="font-medium text-gray-900">220V / Type C, D, E</span>
                        </div>
                        <div className="flex justify-between py-2 border-b border-gray-100">
                            <span className="text-gray-500">📱 Indicatif</span>
                            <span className="font-medium text-gray-900">+221</span>
                        </div>
                        <div className="flex justify-between py-2">
                            <span className="text-gray-500">💵 Monnaie</span>
                            <span className="font-medium text-gray-900">Franc CFA (XOF)</span>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
