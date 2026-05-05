import AppLayout from '@/Layouts/AppLayout';
import { useForm } from '@inertiajs/react';
import { useState } from 'react';

const ITEM_TYPES = [
    { label: 'Smartphone',  icon: '📱' },
    { label: 'Tablet',      icon: '📲' },
    { label: 'Laptop',      icon: '💻' },
    { label: 'Charger',     icon: '🔌' },
    { label: 'Cable',       icon: '🔗' },
    { label: 'Battery',     icon: '🔋' },
    { label: 'Headphones',  icon: '🎧' },
    { label: 'Smartwatch',  icon: '⌚' },
    { label: 'Camera',      icon: '📷' },
    { label: 'Power Bank',  icon: '🪫' },
    { label: 'Mouse',       icon: '🖱️' },
    { label: 'Keyboard',    icon: '⌨️' },
    { label: 'Other',       icon: '📦' },
];

const POINT_RATES = {
    Smartphone: 40, Laptop: 100, Tablet: 80, Charger: 25,
    Cable: 15, Battery: 50, Headphones: 35, Smartwatch: 45,
    Camera: 55, 'Power Bank': 50, Mouse: 20, Keyboard: 30, Other: 30,
};

export default function ScanItem({ kiosks = [] }) {
    const [step, setStep] = useState('type');
    const { data, setData, post, processing, errors, reset } = useForm({
        item_type: '', item_brand: '', weight_kg: '', kiosk_id: '',
    });

    const estimated = data.item_type && data.weight_kg
        ? Math.round((POINT_RATES[data.item_type] ?? 30) + (parseFloat(data.weight_kg) || 0) * 20)
        : null;

    const submit = (e) => {
        e.preventDefault();
        post(route('scan.store'), { onSuccess: () => { reset(); setStep('type'); } });
    };

    return (
        <AppLayout title="Scan E-Waste" showBack>
            {step === 'type' ? (
                <>
                    <p className="text-slate-500 text-sm mb-4 mt-1 animate-fade-up">Select item type to get started</p>
                    <div className="grid grid-cols-3 gap-2 mb-6">
                        {ITEM_TYPES.map((item, i) => (
                            <button
                                key={item.label}
                                onClick={() => { setData('item_type', item.label); setStep('details'); }}
                                className="bg-white rounded-2xl p-4 flex flex-col items-center gap-2 border-2 border-transparent hover:border-[#2541b2] card-hover animate-fade-up"
                                style={{
                                    boxShadow: '0 0 6px rgba(0,0,0,0.06), 0 2px 8px rgba(0,0,0,0.08)',
                                    animationDelay: `${i * 0.04}s`,
                                }}
                            >
                                <span className="text-3xl">{item.icon}</span>
                                <span className="text-xs text-slate-600 font-medium text-center leading-tight">{item.label}</span>
                            </button>
                        ))}
                    </div>

                    <button
                        onClick={() => setStep('details')}
                        className="w-full bg-[#2541b2] text-white font-semibold py-4 rounded-2xl flex items-center justify-center gap-2 mb-3 animate-fade-up"
                        style={{ boxShadow: '0 4px 16px rgba(37,65,178,0.35)', animationDelay: '0.55s' }}
                    >
                        <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" stroke="white" strokeWidth="2">
                            <circle cx="12" cy="12" r="10" />
                            <path d="M9.5 9.5a2.5 2.5 0 115 0c0 2-2.5 2.5-2.5 4" />
                            <circle cx="12" cy="18" r=".5" fill="white" />
                        </svg>
                        Open Camera
                    </button>

                    <button
                        className="w-full bg-white text-slate-700 font-semibold py-4 rounded-2xl flex items-center justify-center gap-2 border border-slate-100 animate-fade-up"
                        style={{ animationDelay: '0.6s' }}
                    >
                        <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" stroke="#64748b" strokeWidth="2">
                            <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M17 8l-5-5-5 5M12 3v12" />
                        </svg>
                        Upload from Gallery
                    </button>
                </>
            ) : (
                <form onSubmit={submit} className="mt-1 space-y-4">
                    {data.item_type && (
                        <div className="bg-[#2541b2]/10 border border-[#2541b2]/20 rounded-2xl p-4 flex items-center gap-3 animate-fade-up">
                            <span className="text-3xl">{ITEM_TYPES.find(i => i.label === data.item_type)?.icon ?? '📦'}</span>
                            <div>
                                <div className="text-xs text-[#2541b2] font-semibold">Selected Item</div>
                                <div className="font-bold text-slate-800">{data.item_type}</div>
                            </div>
                            <button type="button" onClick={() => { setData('item_type', ''); setStep('type'); }} className="ml-auto text-slate-400 text-sm hover:text-slate-600 transition-colors">Change</button>
                        </div>
                    )}

                    {!data.item_type && (
                        <div className="bg-white rounded-2xl p-4 animate-fade-up">
                            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">Item Type</label>
                            <div className="grid grid-cols-3 gap-2">
                                {ITEM_TYPES.map(item => (
                                    <button
                                        key={item.label}
                                        type="button"
                                        onClick={() => setData('item_type', item.label)}
                                        className={`py-2 px-1 rounded-xl text-xs font-medium border-2 transition-all ${data.item_type === item.label ? 'border-[#2541b2] bg-[#2541b2]/10 text-[#2541b2]' : 'border-slate-100 bg-slate-50 text-slate-600'}`}
                                    >
                                        {item.icon} {item.label}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    <div className="bg-white rounded-2xl p-5 space-y-4 animate-fade-up" style={{ boxShadow: '0 0 6px rgba(0,0,0,0.06)', animationDelay: '0.1s' }}>
                        <div>
                            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Brand</label>
                            <input
                                type="text"
                                value={data.item_brand}
                                onChange={e => setData('item_brand', e.target.value)}
                                placeholder="e.g. Samsung, Apple, Dell..."
                                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#2541b2]/30 focus:border-[#2541b2] transition-all"
                            />
                        </div>

                        <div>
                            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Weight (kg) *</label>
                            <input
                                type="number"
                                step="0.01"
                                min="0.01"
                                value={data.weight_kg}
                                onChange={e => setData('weight_kg', e.target.value)}
                                placeholder="0.00"
                                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#2541b2]/30 focus:border-[#2541b2] transition-all"
                            />
                            {errors.weight_kg && <p className="text-red-500 text-xs mt-1">{errors.weight_kg}</p>}
                        </div>

                        <div>
                            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Drop-off Kiosk</label>
                            <select
                                value={data.kiosk_id}
                                onChange={e => setData('kiosk_id', e.target.value)}
                                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#2541b2]/30 focus:border-[#2541b2] transition-all"
                            >
                                <option value="">Select a kiosk (optional)</option>
                                {kiosks.map(k => (
                                    <option key={k.id} value={k.id}>{k.name}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {/* Points preview */}
                    {estimated !== null && (
                        <div className="bg-[#00c896]/10 border border-[#00c896]/20 rounded-2xl p-4 flex items-center gap-4 animate-pop-in">
                            <div className="w-12 h-12 bg-[#00c896] rounded-xl flex items-center justify-center text-white text-xl font-bold">⭐</div>
                            <div>
                                <div className="text-slate-500 text-xs">You'll earn</div>
                                <div className="text-2xl font-bold text-[#00c896]">+{estimated} <span className="text-base font-normal text-slate-500">points</span></div>
                            </div>
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={processing || !data.item_type || !data.weight_kg}
                        className="w-full bg-[#2541b2] disabled:bg-slate-200 disabled:text-slate-400 text-white font-semibold py-4 rounded-2xl transition-all animate-fade-up"
                        style={{ boxShadow: '0 4px 16px rgba(37,65,178,0.35)', animationDelay: '0.2s' }}
                    >
                        {processing ? '⏳ Submitting...' : '♻️ Submit & Earn Points'}
                    </button>
                </form>
            )}
        </AppLayout>
    );
}
