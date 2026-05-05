import AppLayout from '@/Layouts/AppLayout';
import { Link, useForm, usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';

const AVAILABLE_REWARDS = [
    { name: 'SM Gift Card ₱100',  points: 500,  icon: '🎁' },
    { name: 'Grab Food Voucher',   points: 300,  icon: '🍔' },
    { name: 'Shopee ₱200 Voucher', points: 800,  icon: '🛍️' },
    { name: 'Meralco Bill Credit', points: 1200, icon: '⚡' },
    { name: 'Lazada ₱150 Voucher', points: 600,  icon: '📦' },
    { name: 'Plant a Tree',        points: 100,  icon: '🌱' },
];

const ITEM_ICONS = {
    Smartphone: '📱', Laptop: '💻', Tablet: '📲', Monitor: '🖥️',
    Charger: '🔌', Cable: '🔗', Battery: '🔋', Headphones: '🎧',
    Smartwatch: '⌚', Camera: '📷', 'Power Bank': '🪫', Mouse: '🖱️',
    Keyboard: '⌨️', 'Battery Pack': '🔋',
};

export default function Profile({ user, redemptions = [], recyclingRecords = [] }) {
    const { flash } = usePage().props;
    const [activeTab, setActiveTab] = useState('breakdown');
    const [toast, setToast] = useState(null);
    const { post, processing } = useForm();

    useEffect(() => {
        if (flash?.success) { setToast(flash.success); setTimeout(() => setToast(null), 3500); }
    }, [flash]);

    const breakdown = recyclingRecords.reduce((acc, r) => {
        acc[r.item_type] = (acc[r.item_type] || 0) + 1;
        return acc;
    }, {});
    const maxCount = Math.max(1, ...Object.values(breakdown));
    const co2 = recyclingRecords.reduce((sum, r) => sum + (parseFloat(r.weight_kg) * 2.3), 0).toFixed(1);

    const handleRedeem = (reward) => {
        if ((user?.points_balance ?? 0) < reward.points) {
            setToast('Not enough points for this reward.');
            setTimeout(() => setToast(null), 3000);
            return;
        }
        if (!window.confirm(`Redeem "${reward.name}" for ${reward.points} points?`)) return;
        post(route('profile.redeem'), {
            data: { reward_name: reward.name, points_spent: reward.points },
            preserveScroll: true,
        });
    };

    return (
        <AppLayout title="Profile" showBack>
            {/* Toast */}
            {toast && (
                <div className="fixed top-4 left-4 right-4 z-50 text-white text-sm font-semibold px-4 py-3 rounded-2xl shadow-lg flex items-center gap-2 animate-slide-down" style={{ background: '#2541b2' }}>
                    <span>✅</span> {toast}
                </div>
            )}

            {/* Avatar + info */}
            <div className="flex flex-col items-center pt-3 pb-5 animate-fade-up">
                <div className="w-20 h-20 rounded-full flex items-center justify-center text-3xl font-bold text-slate-600 mb-3 shadow-sm" style={{ background: '#e0e7ff' }}>
                    {user?.name?.[0]?.toUpperCase() ?? 'U'}
                </div>
                <h2 className="text-xl font-bold text-slate-900">{user?.name}</h2>
                <p className="text-slate-400 text-sm mb-3">{user?.email}</p>
                <span className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full animate-pop-in" style={{ background: '#e6faf5', color: '#00c896', border: '1px solid #00c89630', animationDelay: '0.2s' }}>
                    🏅 Eco Warrior
                </span>
            </div>

            {/* Stats row */}
            <div className="grid grid-cols-3 gap-2 mb-5">
                {[
                    { icon: '🪙', color: '#f5a623', value: (user?.points_balance ?? 0).toLocaleString(), label: 'Points' },
                    { icon: '🌿', color: '#00c896', value: co2,                                           label: 'kg CO₂' },
                    { icon: '♻️', color: '#2541b2', value: recyclingRecords.length,                      label: 'Recycled' },
                ].map((s, i) => (
                    <div key={s.label} className="bg-white rounded-2xl p-4 text-center card-hover animate-fade-up" style={{ boxShadow: '0 0 6px rgba(0,0,0,0.06), 0 2px 8px rgba(0,0,0,0.08)', animationDelay: `${0.15 + i * 0.07}s` }}>
                        <div className="text-xl mb-1">{s.icon}</div>
                        <div className="font-bold text-slate-800 text-xl">{s.value}</div>
                        <div className="text-slate-400 text-xs">{s.label}</div>
                    </div>
                ))}
            </div>

            {/* Tabs */}
            <div className="flex gap-1 p-1 rounded-2xl mb-4 animate-fade-up" style={{ background: '#e8f4f8', animationDelay: '0.35s' }}>
                {[
                    { key: 'breakdown',   label: 'Breakdown' },
                    { key: 'rewards',     label: '🎁 Rewards' },
                    { key: 'redemptions', label: 'History' },
                ].map(tab => (
                    <button
                        key={tab.key}
                        onClick={() => setActiveTab(tab.key)}
                        className="flex-1 py-2 rounded-xl text-xs font-semibold transition-all"
                        style={activeTab === tab.key
                            ? { background: '#fff', color: '#1e293b', boxShadow: '0 1px 4px rgba(0,0,0,0.1)' }
                            : { color: '#94a3b8' }}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>

            {/* Breakdown tab */}
            {activeTab === 'breakdown' && (
                <div className="bg-white rounded-2xl p-5" style={{ boxShadow: '0 0 6px rgba(0,0,0,0.06), 0 2px 8px rgba(0,0,0,0.08)' }}>
                    <div className="flex items-center gap-2 mb-4">
                        <span className="text-lg">📈</span>
                        <span className="font-bold text-slate-800 text-sm">Recycling Breakdown</span>
                    </div>
                    {Object.keys(breakdown).length === 0 ? (
                        <p className="text-slate-400 text-sm text-center py-6">No recycling records yet.</p>
                    ) : (
                        <div className="space-y-4">
                            {Object.entries(breakdown).sort((a, b) => b[1] - a[1]).map(([type, count]) => (
                                <div key={type}>
                                    <div className="flex items-center justify-between mb-1.5">
                                        <span className="text-slate-700 text-sm font-medium flex items-center gap-2">
                                            <span>{ITEM_ICONS[type] ?? '📦'}</span>{type}
                                        </span>
                                        <span className="text-slate-500 text-xs font-semibold">{count}</span>
                                    </div>
                                    <div className="h-2 rounded-full overflow-hidden" style={{ background: '#f1f5f9' }}>
                                        <div
                                            className="h-full rounded-full"
                                            style={{
                                                width: `${(count / maxCount) * 100}%`,
                                                background: 'linear-gradient(90deg, #00c896, #2541b2)',
                                                transition: 'width 0.6s ease',
                                            }}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            )}

            {/* Rewards tab */}
            {activeTab === 'rewards' && (
                <div className="space-y-3">
                    <div className="rounded-2xl px-4 py-3 flex items-center justify-between" style={{ background: 'rgba(37,65,178,0.08)', border: '1px solid rgba(37,65,178,0.15)' }}>
                        <span className="text-xs font-bold" style={{ color: '#2541b2' }}>Available balance</span>
                        <span className="font-bold text-lg" style={{ color: '#2541b2' }}>{(user?.points_balance ?? 0).toLocaleString()} pts</span>
                    </div>
                    {AVAILABLE_REWARDS.map(reward => {
                        const canAfford = (user?.points_balance ?? 0) >= reward.points;
                        return (
                            <div
                                key={reward.name}
                                className="bg-white rounded-2xl p-4 flex items-center gap-3 card-hover animate-fade-up"
                                style={{ boxShadow: '0 0 6px rgba(0,0,0,0.06), 0 2px 8px rgba(0,0,0,0.08)', opacity: canAfford ? 1 : 0.55, animationDelay: `${0.05 * AVAILABLE_REWARDS.indexOf(reward)}s` }}
                            >
                                <span className="text-3xl flex-shrink-0">{reward.icon}</span>
                                <div className="flex-1">
                                    <p className="font-semibold text-slate-800 text-sm">{reward.name}</p>
                                    <p className="font-bold text-sm" style={{ color: '#f5a623' }}>{reward.points.toLocaleString()} pts</p>
                                </div>
                                <button
                                    onClick={() => handleRedeem(reward)}
                                    disabled={!canAfford || processing}
                                    className="px-4 py-2 rounded-xl text-xs font-bold transition-transform active:scale-95"
                                    style={canAfford
                                        ? { background: '#2541b2', color: '#fff' }
                                        : { background: '#f1f5f9', color: '#94a3b8', cursor: 'not-allowed' }}
                                >
                                    Redeem
                                </button>
                            </div>
                        );
                    })}
                </div>
            )}

            {/* Redemption history */}
            {activeTab === 'redemptions' && (
                <div className="bg-white rounded-2xl overflow-hidden" style={{ boxShadow: '0 0 6px rgba(0,0,0,0.06), 0 2px 8px rgba(0,0,0,0.08)' }}>
                    <div className="flex items-center gap-2 p-4 border-b border-slate-50">
                        <span className="text-lg">🎁</span>
                        <span className="font-bold text-slate-800 text-sm">Redemption History</span>
                    </div>
                    {redemptions.length === 0 ? (
                        <p className="py-10 text-center text-slate-400 text-sm">No redemptions yet</p>
                    ) : (
                        <div className="divide-y divide-slate-50">
                            {redemptions.map(r => (
                                <div key={r.id} className="flex items-center gap-3 px-4 py-3">
                                    <span className="text-2xl flex-shrink-0">🎁</span>
                                    <div className="flex-1 min-w-0">
                                        <p className="font-medium text-slate-800 text-sm truncate">{r.reward_name}</p>
                                        <p className="text-slate-400 text-xs">{r.redeemed_at ? new Date(r.redeemed_at).toLocaleDateString('en-PH', { month: 'short', day: 'numeric', year: 'numeric' }) : ''}</p>
                                    </div>
                                    <div className="text-right flex-shrink-0">
                                        <p className="text-red-500 font-bold text-sm">-{r.points_spent}</p>
                                        <span className="text-[10px] px-2 py-0.5 rounded-full font-semibold" style={r.status === 'completed' ? { background: '#e6faf5', color: '#00c896' } : { background: '#fef9e7', color: '#d97706' }}>
                                            {r.status}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            )}

            {/* Logout */}
            <div className="mt-6 pb-4 flex justify-center">
                <Link
                    href="/logout"
                    method="post"
                    as="button"
                    className="flex items-center gap-2 text-slate-400 text-sm py-3 px-6 hover:text-red-400 transition-colors"
                >
                    <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4" stroke="currentColor" strokeWidth="2">
                        <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4M16 17l5-5-5-5M21 12H9" />
                    </svg>
                    Sign Out
                </Link>
            </div>
        </AppLayout>
    );
}
