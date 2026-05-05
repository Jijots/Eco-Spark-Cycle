import { Link, usePage } from '@inertiajs/react';
import { useState } from 'react';

/* ─── Nav icon components ─────────────────────────────────────────────── */
function DashboardIcon({ active }) {
    return (
        <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6" stroke={active ? '#2541b2' : '#94a3b8'} strokeWidth={active ? 2.5 : 2}>
            <rect x="3" y="3" width="7" height="7" rx="1.5" />
            <rect x="14" y="3" width="7" height="7" rx="1.5" />
            <rect x="3" y="14" width="7" height="7" rx="1.5" />
            <rect x="14" y="14" width="7" height="7" rx="1.5" />
        </svg>
    );
}
function MapIcon({ active }) {
    return (
        <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6" stroke={active ? '#2541b2' : '#94a3b8'} strokeWidth={active ? 2.5 : 2}>
            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
            <circle cx="12" cy="9" r="2.5" fill={active ? '#2541b2' : 'none'} stroke={active ? '#2541b2' : '#94a3b8'} />
        </svg>
    );
}
function SdgIcon({ active }) {
    return (
        <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6" stroke={active ? '#2541b2' : '#94a3b8'} strokeWidth={active ? 2.5 : 2}>
            <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9" />
            <path d="M13.73 21a2 2 0 01-3.46 0" />
        </svg>
    );
}
function ProfileIcon({ active }) {
    return (
        <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6" stroke={active ? '#2541b2' : '#94a3b8'} strokeWidth={active ? 2.5 : 2}>
            <circle cx="12" cy="8" r="4" />
            <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
        </svg>
    );
}

const GHOST_ICONS = ['💻','📱','🖥️','⌨️','🖨️','📷','🎧','🖱️','📲','🔋'];
const GHOST_POS = [
    { top: '8%',  left: '5%',  rotate: '-15deg', duration: '5.2s', delay: '0s'    },
    { top: '18%', left: '72%', rotate: '10deg',  duration: '4.1s', delay: '0.8s'  },
    { top: '35%', left: '20%', rotate: '-8deg',  duration: '6.0s', delay: '1.5s'  },
    { top: '52%', left: '85%', rotate: '20deg',  duration: '4.8s', delay: '0.3s'  },
    { top: '65%', left: '10%', rotate: '-12deg', duration: '5.5s', delay: '2.1s'  },
    { top: '75%', left: '60%', rotate: '5deg',   duration: '4.3s', delay: '0.6s'  },
    { top: '12%', left: '90%', rotate: '-20deg', duration: '6.2s', delay: '1.1s'  },
    { top: '42%', left: '40%', rotate: '15deg',  duration: '5.0s', delay: '1.8s'  },
    { top: '28%', left: '55%', rotate: '-5deg',  duration: '4.6s', delay: '0.4s'  },
    { top: '58%', left: '30%', rotate: '18deg',  duration: '5.8s', delay: '2.4s'  },
];

const navItems = [
    { href: '/dashboard', label: 'Dashboard', Icon: DashboardIcon },
    { href: '/map',       label: 'Map',       Icon: MapIcon },
    { href: '/scan',      label: 'Scan',      center: true },
    { href: '/reports',   label: 'SDGs',      Icon: SdgIcon },
    { href: '/profile',   label: 'Profile',   Icon: ProfileIcon },
];

export default function AppLayout({ children, showBack = false, title = '' }) {
    const { auth } = usePage().props;
    const currentPath = typeof window !== 'undefined' ? window.location.pathname : '';
    const firstName   = auth?.user?.name?.split(' ')[0] ?? 'User';
    const initial     = auth?.user?.name?.[0] ?? 'U';
    const points      = auth?.user?.points_balance ?? 0;
    const [activeNav, setActiveNav] = useState(null);

    return (
        <div className="min-h-screen flex flex-col relative overflow-hidden" style={{ background: '#d4eef6', fontFamily: "'Inter', system-ui, sans-serif" }}>

            {/* ── Background watermark ── */}
            <div aria-hidden="true" className="fixed inset-0 flex items-center justify-center pointer-events-none z-0 select-none overflow-hidden">
                <span
                    className="text-[110px] font-black text-center leading-tight tracking-tight opacity-[0.045]"
                    style={{ color: '#2541b2', whiteSpace: 'nowrap', transform: 'rotate(-15deg)' }}
                >
                    E-CYCLE<br/>REWARDS
                </span>
            </div>

            {/* ── Ghost electronics icons (floating) ── */}
            <div className="fixed inset-0 pointer-events-none overflow-hidden z-0 select-none">
                {GHOST_ICONS.map((icon, i) => (
                    <span
                        key={i}
                        className="absolute text-4xl float-icon"
                        style={{
                            opacity: 0.07,
                            top: GHOST_POS[i].top,
                            left: GHOST_POS[i].left,
                            '--icon-rotate': GHOST_POS[i].rotate,
                            '--float-duration': GHOST_POS[i].duration,
                            '--float-delay': GHOST_POS[i].delay,
                        }}
                    >
                        {icon}
                    </span>
                ))}
            </div>

            {/* ── Top header ── */}
            <header className="relative z-10 px-5 pt-10 pb-3 flex items-center gap-3 animate-fade-in">
                {showBack ? (
                    <button
                        onClick={() => window.history.back()}
                        className="w-9 h-9 bg-white rounded-full flex items-center justify-center transition-transform active:scale-95"
                        style={{ boxShadow: '0 0 6px rgba(0,0,0,0.06), 0 2px 8px rgba(0,0,0,0.08)' }}
                    >
                        <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" stroke="#1e293b" strokeWidth="2.5">
                            <path d="M15 18l-6-6 6-6" />
                        </svg>
                    </button>
                ) : (
                    <div className="w-9 h-9 bg-white rounded-xl flex items-center justify-center text-lg flex-shrink-0" style={{ boxShadow: '0 0 6px rgba(0,0,0,0.06), 0 2px 8px rgba(0,0,0,0.08)' }}>
                        ♻️
                    </div>
                )}

                <div className="flex-1">
                    {!showBack ? (
                        <>
                            <div className="text-[11px] font-bold uppercase tracking-[0.12em] leading-none" style={{ color: '#2541b2' }}>
                                E-CYCLE REWARDS
                            </div>
                            <div className="text-slate-500 text-xs leading-tight mt-0.5">
                                Welcome back, <span className="font-semibold text-slate-800">{firstName} 👋</span>
                            </div>
                        </>
                    ) : (
                        <h1 className="font-bold text-lg text-slate-900 tracking-tight">{title}</h1>
                    )}
                </div>

                {!showBack && (
                    <div
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-full animate-pop-in"
                        style={{ background: '#fef9e7', border: '1px solid #f4b00030', animationDelay: '0.2s' }}
                    >
                        <span className="text-sm">🪙</span>
                        <span className="text-xs font-bold" style={{ color: '#d97706' }}>
                            {points.toLocaleString()}
                        </span>
                    </div>
                )}

                {showBack && (
                    <div className="w-9 h-9 rounded-full flex items-center justify-center text-white font-bold text-sm" style={{ background: '#2541b2' }}>
                        {initial}
                    </div>
                )}
            </header>

            {/* ── Page content ── */}
            <main key={currentPath} className="relative z-10 flex-1 px-4 pb-28 animate-fade-up">
                {children}
            </main>

            {/* ── Bottom navigation ── */}
            <nav
                className="fixed bottom-0 left-0 right-0 z-20 bg-white"
                style={{ boxShadow: '0 -1px 0 rgba(0,0,0,0.06), 0 -4px 16px rgba(0,0,0,0.08)' }}
            >
                <div className="flex items-end justify-around px-2 py-2 max-w-md mx-auto">
                    {navItems.map((item) => {
                        if (item.center) {
                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className="-mt-7 flex flex-col items-center transition-transform active:scale-95"
                                >
                                    <div className="relative">
                                        {/* Pulse ring behind scan button */}
                                        <span
                                            className="absolute inset-0 rounded-full"
                                            style={{
                                                background: '#2541b2',
                                                animation: 'pulseRing 2s ease-out infinite',
                                            }}
                                        />
                                        <div
                                            className="relative w-14 h-14 rounded-full flex items-center justify-center"
                                            style={{ background: '#2541b2', boxShadow: 'rgba(0,0,0,0.4) 0px 8px 24px' }}
                                        >
                                            <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6" stroke="white" strokeWidth="2.5">
                                                <path d="M4 8V5a1 1 0 011-1h3M16 4h3a1 1 0 011 1v3M20 16v3a1 1 0 01-1 1h-3M8 20H5a1 1 0 01-1-1v-3" />
                                                <rect x="8" y="8" width="8" height="8" rx="1" />
                                            </svg>
                                        </div>
                                    </div>
                                    <span className="text-[10px] text-slate-400 mt-1 font-medium">Scan</span>
                                </Link>
                            );
                        }

                        const isActive = currentPath === item.href;
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                onClick={() => setActiveNav(item.href)}
                                className="flex flex-col items-center gap-0.5 px-2 py-1 min-w-[44px] transition-transform active:scale-95"
                            >
                                <span className={activeNav === item.href ? 'animate-nav-bounce' : ''}>
                                    <item.Icon active={isActive} />
                                </span>
                                <span
                                    className="text-[10px] font-semibold transition-colors duration-200"
                                    style={{ color: isActive ? '#2541b2' : '#94a3b8' }}
                                >
                                    {item.label}
                                </span>
                                {isActive && (
                                    <div className="w-1 h-1 rounded-full animate-pop-in" style={{ background: '#2541b2' }} />
                                )}
                            </Link>
                        );
                    })}
                </div>
            </nav>
        </div>
    );
}
