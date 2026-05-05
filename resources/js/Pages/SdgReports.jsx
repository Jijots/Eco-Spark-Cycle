import AppLayout from '@/Layouts/AppLayout';

const SDG_DATA = [
    {
        num: 12,
        color: '#f97316',
        icon: '♻️',
        title: 'Responsible Consumption & Production',
        body: 'Global e-waste generated in 2024 reached 62 million tonnes — only 22.3% was formally collected and recycled. Electronics recycling rates must increase by 40% by 2030 to meet targets.',
        source: 'UN Environment Programme',
        date: 'Feb 2026',
        isNew: true,
    },
    {
        num: 13,
        color: '#22c55e',
        icon: '🌍',
        title: 'Climate Action',
        body: 'Improper disposal of e-waste contributes 50+ million tonnes of CO₂ equivalent annually. Recycling one smartphone saves approximately 0.8 kg of CO₂ — equivalent to 3 km of car travel.',
        source: 'IPCC Working Group III',
        date: 'Jan 2026',
        isNew: true,
    },
    {
        num: 11,
        color: '#f97316',
        icon: '🏙️',
        title: 'Sustainable Cities & Communities',
        body: 'Cities account for 70% of global e-waste. Urban reverse vending machine networks have shown a 35% increase in citizen recycling participation in pilot programs across Southeast Asia.',
        source: 'UN-Habitat',
        date: 'Jan 2026',
        isNew: false,
    },
    {
        num: 6,
        color: '#3b82f6',
        icon: '💧',
        title: 'Clean Water & Sanitation',
        body: 'Toxic chemicals from improperly disposed batteries and circuit boards contaminate groundwater in 57 countries. Proper e-waste recycling prevents heavy metal leaching into water sources.',
        source: 'WHO Water Safety Report',
        date: 'Dec 2025',
        isNew: false,
    },
    {
        num: 7,
        color: '#eab308',
        icon: '⚡',
        title: 'Affordable & Clean Energy',
        body: 'Recovered materials from e-waste recycling reduce the energy demand for primary mining by up to 95% for aluminum, 85% for copper, and 60% for rare earth elements.',
        source: 'IEA Critical Minerals Report',
        date: 'Dec 2025',
        isNew: false,
    },
];

export default function SdgReports({ totalCo2 = 0, totalItems = 0, totalWeight = 0 }) {
    const newCount = SDG_DATA.filter(s => s.isNew).length;

    return (
        <AppLayout title="SDG Reports" showBack>
            {/* Header */}
            <div className="flex items-center justify-between mb-1 mt-1 animate-fade-up">
                <p className="text-slate-500 text-xs flex-1">Latest sustainability updates related to e-waste recycling</p>
                {newCount > 0 && (
                    <span className="bg-red-500 text-white text-xs font-bold px-2.5 py-1 rounded-full flex-shrink-0 ml-2 animate-pop-in">
                        {newCount} NEW
                    </span>
                )}
            </div>

            {/* Impact summary */}
            <div className="grid grid-cols-3 gap-2 mt-3 mb-4">
                {[
                    { icon: '♻️', color: '#f5a623', value: totalItems,  label: 'Recycled' },
                    { icon: '🌍', color: '#00c896', value: totalCo2,    label: 'kg CO₂' },
                    { icon: '⚖️', color: '#2541b2', value: totalWeight, label: 'kg diverted' },
                ].map((s, i) => (
                    <div
                        key={s.label}
                        className="bg-white rounded-2xl p-3 text-center card-hover animate-fade-up"
                        style={{ boxShadow: '0 0 6px rgba(0,0,0,0.06)', animationDelay: `${0.05 + i * 0.08}s` }}
                    >
                        <div className="text-xl mb-1">{s.icon}</div>
                        <div className="font-bold text-slate-800 text-lg">{s.value}</div>
                        <div className="text-slate-400 text-xs">{s.label}</div>
                    </div>
                ))}
            </div>

            {/* SDG cards */}
            <div className="space-y-3">
                {SDG_DATA.map((sdg, i) => (
                    <div
                        key={sdg.num}
                        className="bg-white rounded-2xl overflow-hidden card-hover animate-fade-up"
                        style={{
                            borderLeft: `4px solid ${sdg.color}`,
                            boxShadow: '0 0 6px rgba(0,0,0,0.06), 0 2px 8px rgba(0,0,0,0.08)',
                            animationDelay: `${0.3 + i * 0.08}s`,
                        }}
                    >
                        <div className="p-4">
                            <div className="flex items-center gap-2 mb-2">
                                <span className="text-xs font-bold" style={{ color: sdg.color }}>SDG {sdg.num}</span>
                                {sdg.isNew && (
                                    <span className="bg-red-100 text-red-600 text-[10px] font-bold px-1.5 py-0.5 rounded animate-pop-in">NEW</span>
                                )}
                                <span className="ml-auto text-slate-400 text-xs">{sdg.date}</span>
                            </div>

                            <div className="flex items-start gap-2 mb-2">
                                <span className="text-xl flex-shrink-0">{sdg.icon}</span>
                                <h3 className="font-bold text-slate-800 text-sm leading-tight">{sdg.title}</h3>
                            </div>

                            <p className="text-slate-500 text-xs leading-relaxed mb-3">{sdg.body}</p>

                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-1">
                                    <svg viewBox="0 0 24 24" fill="none" className="w-3 h-3" stroke="#94a3b8" strokeWidth="2">
                                        <circle cx="12" cy="12" r="10" /><path d="M12 8v4l3 3" />
                                    </svg>
                                    <span className="text-slate-400 text-xs">{sdg.source}</span>
                                </div>
                                <button className="text-xs font-semibold flex items-center gap-1 transition-opacity hover:opacity-70" style={{ color: sdg.color }}>
                                    Read more
                                    <svg viewBox="0 0 24 24" fill="none" className="w-3 h-3" stroke={sdg.color} strokeWidth="2.5">
                                        <path d="M7 17L17 7M17 7H7M17 7v10" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </AppLayout>
    );
}
