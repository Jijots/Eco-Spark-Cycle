import { Link } from '@inertiajs/react';

export default function Welcome({ canLogin, canRegister }) {
  const stats = [
    { value: '12,400+', label: 'Items Recycled' },
    { value: '28.5 tonnes', label: 'CO₂ Avoided' },
    { value: '3,200+', label: 'Active Users' },
    { value: '6', label: 'Kiosk Locations' },
  ];

  const steps = [
    { icon: '📱', title: 'Find a Kiosk', desc: 'Locate your nearest E-Cycle drop-off kiosk using our interactive map.' },
    { icon: '♻️', title: 'Drop Off E-Waste', desc: 'Bring your old electronics — phones, laptops, batteries, and more.' },
    { icon: '⭐', title: 'Earn Points', desc: 'Get rewarded instantly based on the type and weight of your items.' },
    { icon: '🎁', title: 'Redeem Rewards', desc: 'Use your points for gift cards, vouchers, and eco-friendly perks.' },
  ];

  const items = [
    { icon: '📱', name: 'Smartphones' },
    { icon: '💻', name: 'Laptops' },
    { icon: '📲', name: 'Tablets' },
    { icon: '🖥️', name: 'Monitors' },
    { icon: '🔋', name: 'Batteries' },
    { icon: '🎧', name: 'Earbuds' },
    { icon: '📷', name: 'Cameras' },
    { icon: '🖨️', name: 'Printers' },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Nav */}
      <nav className="flex items-center justify-between px-6 lg:px-16 py-5 border-b border-slate-100">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 bg-green-500 rounded-xl flex items-center justify-center text-lg">♻️</div>
          <div>
            <span className="font-bold text-slate-900">E-Cycle</span>
            <span className="font-bold text-green-500"> Rewards</span>
          </div>
        </div>
        <div className="flex items-center gap-3">
          {canLogin && (
            <Link href="/login" className="text-slate-600 hover:text-slate-900 text-sm font-medium">Sign in</Link>
          )}
          {canRegister && (
            <Link href="/register" className="bg-green-500 hover:bg-green-600 text-white text-sm font-semibold px-4 py-2 rounded-xl transition-colors">
              Get Started
            </Link>
          )}
        </div>
      </nav>

      {/* Hero */}
      <section className="px-6 lg:px-16 pt-20 pb-16 text-center max-w-4xl mx-auto">
        <div className="inline-flex items-center gap-2 bg-green-50 border border-green-100 rounded-full px-4 py-1.5 mb-6">
          <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
          <span className="text-green-700 text-sm font-medium">6 active kiosks in Metro Manila</span>
        </div>
        <h1 className="text-5xl lg:text-6xl font-bold text-slate-900 leading-tight mb-6">
          Recycle E-Waste.<br />
          <span className="text-green-500">Earn Rewards.</span>
        </h1>
        <p className="text-xl text-slate-500 mb-10 max-w-2xl mx-auto leading-relaxed">
          Drop off your old electronics at any E-Cycle kiosk and earn points redeemable for real rewards. Every device recycled is a step toward a cleaner planet.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          {canRegister && (
            <Link href="/register" className="bg-green-500 hover:bg-green-600 text-white font-semibold px-8 py-3.5 rounded-2xl transition-colors text-base">
              Start Recycling →
            </Link>
          )}
          <Link href="/login" className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold px-8 py-3.5 rounded-2xl transition-colors text-base">
            Sign In
          </Link>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-slate-900 py-12">
        <div className="max-w-4xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-8 px-6 lg:px-16">
          {stats.map(s => (
            <div key={s.label} className="text-center">
              <div className="text-3xl font-bold text-green-400 mb-1">{s.value}</div>
              <div className="text-slate-400 text-sm">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="px-6 lg:px-16 py-20 max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-slate-900 mb-3">How It Works</h2>
          <p className="text-slate-500">Four simple steps to start earning rewards for recycling</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, i) => (
            <div key={i} className="text-center">
              <div className="w-14 h-14 bg-green-50 rounded-2xl flex items-center justify-center text-2xl mx-auto mb-4">
                {step.icon}
              </div>
              <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-white text-xs font-bold mx-auto mb-3">
                {i + 1}
              </div>
              <h3 className="font-semibold text-slate-900 mb-2">{step.title}</h3>
              <p className="text-slate-500 text-sm leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Accepted items */}
      <section className="bg-slate-50 py-16 px-6 lg:px-16">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-slate-900 mb-3">We Accept</h2>
          <p className="text-slate-500 mb-10">All common consumer electronics and accessories</p>
          <div className="grid grid-cols-4 lg:grid-cols-8 gap-4">
            {items.map(item => (
              <div key={item.name} className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100 flex flex-col items-center gap-2">
                <span className="text-3xl">{item.icon}</span>
                <span className="text-xs font-medium text-slate-600">{item.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-r from-green-600 to-emerald-500 py-16 px-6 lg:px-16 text-center text-white">
        <h2 className="text-3xl font-bold mb-3">Ready to make an impact?</h2>
        <p className="text-green-100 mb-8 text-lg">Join thousands of Filipinos recycling responsibly and earning rewards.</p>
        {canRegister && (
          <Link href="/register" className="bg-white text-green-700 font-bold px-8 py-3.5 rounded-2xl hover:bg-green-50 transition-colors inline-block">
            Create Free Account
          </Link>
        )}
      </section>

      {/* Footer */}
      <footer className="px-6 lg:px-16 py-8 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="text-xl">♻️</span>
          <span className="text-slate-600 text-sm font-medium">E-Cycle Rewards</span>
        </div>
        <p className="text-slate-400 text-sm">© 2025 E-Cycle Rewards. Contributing to UN SDG Goals 12 & 13.</p>
      </footer>
    </div>
  );
}
