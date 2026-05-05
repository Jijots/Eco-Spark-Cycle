import AppLayout from '@/Layouts/AppLayout';
import { Link, usePage } from '@inertiajs/react';
import { useEffect, useRef, useState } from 'react';

const ITEM_ICONS = {
    Smartphone: '📱', Laptop: '💻', Tablet: '📲', Monitor: '🖥️',
    Desktop: '🖥️', Keyboard: '⌨️', 'Battery Pack': '🔋', Earbuds: '🎧',
    Headphones: '🎧', Camera: '📷', Printer: '🖨️', Mouse: '🖱️',
    Charger: '🔌', Cable: '🔗', Smartwatch: '⌚', Battery: '🔋',
};

function useCountUp(target, duration = 1100, delay = 0) {
    const [value, setValue] = useState(0);
    useEffect(() => {
        let frame;
        const timeout = setTimeout(() => {
            const start = performance.now();
            const tick = (now) => {
                const elapsed = now - start;
                const progress = Math.min(elapsed / duration, 1);
                // ease-out cubic
                const eased = 1 - Math.pow(1 - progress, 3);
                setValue(Math.floor(eased * target));
                if (progress < 1) frame = requestAnimationFrame(tick);
                else setValue(target);
            };
            frame = requestAnimationFrame(tick);
        }, delay);
        return () => { clearTimeout(timeout); cancelAnimationFrame(frame); };
    }, [target, duration, delay]);
    return value;
}

export default function Dashboard({ user, recentActivity = [], stats = {}, monthlyCount = 0 }) {
    const { flash } = usePage().props;
    const [toast, setToast] = useState(flash?.success || null);
    const confettiFired = useRef(false);

    useEffect(() => {
        if (flash?.success) {
            setToast(flash.success);
            setTimeout(() => setToast(null), 3500);

            // Confetti on successful scan submission
            if (!confettiFired.current) {
                confettiFired.current = true;
                import('canvas-confetti').then(({ default: confetti }) => {
                    confetti({ particleCount: 100, spread: 70, origin: { y: 0.55 }, colors: ['#2541b2', '#00c896', '#f5a623', '#ffffff'] });
                    setTimeout(() => {
                        confetti({ particleCount: 50, spread: 50, origin: { y: 0.4 }, angle: 60, colors: ['#2541b2', '#00c896'] });
                        confetti({ particleCount: 50, spread: 50, origin: { y: 0.4 }, angle: 120, colors: ['#f5a623', '#00c896'] });
                    }, 250);
                });
            }
        }
    }, [flash]);

    const MONTHLY_GOAL = 20;
    const pct = Math.min(100, Math.round((monthlyCount / MONTHLY_GOAL) * 100));
    const circumference = 2 * Math.PI * 15.9;
    const dashOffset = circumference - (pct / 100) * circumference;

    const animCo2    = useCountUp(parseFloat(stats.co2Avoided ?? 0), 1200, 100);
    const animPoints = useCountUp(user?.points_balance ?? 0, 1300, 50);
    const animItems  = useCountUp(stats.totalItems ?? 0, 1000, 200);

    return (
        <AppLayout>
            {/* Toast */}
            {toast && (
                <div className="fixed top-4 left-4 right-4 z-50 text-white text-sm font-semibold px-4 py-3 rounded-2xl shadow-lg flex items-center gap-2 animate-slide-down" style={{ background: '#2541b2' }}>
                    <span>✅</span> {toast}
                </div>
            )}

            {/* Hero stat cards */}
            <div className="grid grid-cols-2 gap-3 mt-2 mb-3">
                <div
                    className="rounded-2xl p-4 text-white card-hover animate-fade-up"
                    style={{ background: '#2541b2', boxShadow: '0 4px 16px rgba(37,65,178,0.3)', animationDelay: '0.05s' }}
                >
                    <p className="text-[10px] font-bold uppercase tracking-widest text-blue-200 mb-2">CO₂ SAVED</p>
                    <p className="text-3xl font-bold">{animCo2}<span className="text-base font-normal ml-1">kg</span></p>
                    <div className="flex justify-end mt-1 opacity-50"><span className="text-2xl">🌍</span></div>
                </div>

                <div
                    className="rounded-2xl p-4 text-white card-hover animate-fade-up"
                    style={{ background: '#f5a623', boxShadow: '0 4px 16px rgba(245,166,35,0.3)', animationDelay: '0.1s' }}
                >
                    <p className="text-[10px] font-bold uppercase tracking-widest text-amber-100 mb-2">POINTS</p>
                    <p className="text-3xl font-bold">{animPoints.toLocaleString()}</p>
                    <div className="flex justify-end mt-1 opacity-50"><span className="text-2xl">🪙</span></div>
                </div>
            </div>

            {/* Items recycled */}
            <div
                className="bg-white rounded-2xl p-4 mb-3 flex items-center justify-between card-hover animate-fade-up"
                style={{ boxShadow: '0 0 6px rgba(0,0,0,0.06), 0 2px 8px rgba(0,0,0,0.08)', animationDelay: '0.15s' }}
            >
                <div>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1">ITEMS RECYCLED</p>
                    <p className="text-2xl font-bold text-slate-900">
                        {animItems} <span className="text-base font-normal text-slate-400">items</span>
                    </p>
                </div>
                <span className="text-3xl opacity-20">♻️</span>
            </div>

            {/* Monthly goal — circular progress */}
            <div
                className="bg-white rounded-2xl p-5 mb-3 card-hover animate-fade-up"
                style={{ boxShadow: '0 0 6px rgba(0,0,0,0.06), 0 2px 8px rgba(0,0,0,0.08)', animationDelay: '0.2s' }}
            >
                <div className="flex items-center justify-between mb-4">
                    <span className="font-semibold text-slate-800 text-sm">Monthly Goal</span>
                    <span className="text-xs font-bold" style={{ color: '#00c896' }}>{monthlyCount}/{MONTHLY_GOAL} items</span>
                </div>
                <div className="flex flex-col items-center">
                    <div className="relative w-28 h-28 mb-2">
                        <svg viewBox="0 0 36 36" className="w-full h-full" style={{ transform: 'rotate(-90deg)' }}>
                            <circle cx="18" cy="18" r="15.9" fill="none" stroke="#f1f5f9" strokeWidth="3" />
                            <circle
                                cx="18" cy="18" r="15.9" fill="none"
                                stroke="#00c896" strokeWidth="3.2"
                                strokeDasharray={`${circumference}`}
                                strokeDashoffset={dashOffset}
                                strokeLinecap="round"
                                style={{ transition: 'stroke-dashoffset 1.2s cubic-bezier(0.34, 1.56, 0.64, 1)' }}
                            />
                        </svg>
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                            <span className="text-2xl font-bold text-slate-800">{pct}%</span>
                        </div>
                    </div>
                    <p className="text-slate-400 text-xs">of monthly target</p>
                </div>
            </div>

            {/* SDG Reports teaser */}
            <Link
                href="/reports"
                className="bg-white rounded-2xl p-4 mb-3 flex items-center gap-3 block card-hover animate-fade-up"
                style={{ boxShadow: '0 0 6px rgba(0,0,0,0.06), 0 2px 8px rgba(0,0,0,0.08)', animationDelay: '0.25s' }}
            >
                <div className="relative flex-shrink-0">
                    <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center text-xl">🔔</div>
                    <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center animate-pop-in">
                        <span className="text-white text-[9px] font-bold">2</span>
                    </div>
                </div>
                <div className="flex-1">
                    <p className="font-semibold text-slate-800 text-sm">SDG Reports</p>
                    <p className="text-slate-400 text-xs">2 new sustainability updates</p>
                </div>
                <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5 text-slate-300 flex-shrink-0" stroke="currentColor" strokeWidth="2">
                    <path d="M9 18l6-6-6-6" />
                </svg>
            </Link>

            {/* Scan CTA banner */}
            <Link
                href="/scan"
                className="rounded-2xl p-4 mb-5 flex items-center justify-between block transition-transform active:scale-[0.98] animate-fade-up"
                style={{ background: '#2541b2', boxShadow: '0 4px 16px rgba(37,65,178,0.35)', animationDelay: '0.3s' }}
            >
                <div className="flex items-center gap-3">
                    <div className="w-9 h-9 bg-white/20 rounded-xl flex items-center justify-center">
                        <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" stroke="white" strokeWidth="2.5">
                            <path d="M4 8V5a1 1 0 011-1h3M16 4h3a1 1 0 011 1v3M20 16v3a1 1 0 01-1 1h-3M8 20H5a1 1 0 01-1-1v-3" />
                            <rect x="8" y="8" width="8" height="8" rx="1" />
                        </svg>
                    </div>
                    <div>
                        <p className="text-white font-semibold text-sm">Scan E-Waste</p>
                        <p className="text-blue-200 text-xs">Identify &amp; recycle items</p>
                    </div>
                </div>
                <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5 flex-shrink-0" stroke="white" strokeWidth="2">
                    <path d="M9 18l6-6-6-6" />
                </svg>
            </Link>

            {/* Recent Activity */}
            <h3 className="font-bold text-slate-800 text-base mb-3 animate-fade-up" style={{ animationDelay: '0.32s' }}>Recent Activity</h3>
            {recentActivity.length === 0 ? (
                <div className="bg-white rounded-2xl p-8 text-center text-slate-400 text-sm animate-fade-up" style={{ boxShadow: '0 0 6px rgba(0,0,0,0.06)', animationDelay: '0.35s' }}>
                    No activity yet. Start recycling!
                </div>
            ) : (
                <div className="space-y-2">
                    {recentActivity.map((record, index) => (
                        <div
                            key={record.id}
                            className="bg-white rounded-2xl px-4 py-3 flex items-center gap-3 card-hover animate-fade-up"
                            style={{
                                boxShadow: '0 0 6px rgba(0,0,0,0.06), 0 2px 8px rgba(0,0,0,0.08)',
                                animationDelay: `${0.35 + index * 0.07}s`,
                            }}
                        >
                            <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl flex-shrink-0" style={{ background: '#e6faf5' }}>
                                {ITEM_ICONS[record.item_type] ?? '📦'}
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="font-semibold text-slate-800 text-sm truncate">
                                    {record.item_brand ? `${record.item_brand} ${record.item_type}` : record.item_type}
                                </p>
                                <p className="text-slate-400 text-xs mt-0.5">
                                    {record.recycled_at
                                        ? new Date(record.recycled_at).toLocaleDateString('en-PH', { month: 'short', day: 'numeric', year: 'numeric' })
                                        : 'Recently'}
                                </p>
                            </div>
                            <div className="text-right flex-shrink-0">
                                <p className="font-bold text-sm" style={{ color: '#00c896' }}>+{record.points_earned}</p>
                                <p className="text-slate-400 text-xs">pts</p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </AppLayout>
    );
}
