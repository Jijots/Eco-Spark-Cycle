import AppLayout from '@/Layouts/AppLayout';
import { useEffect, useRef, useState } from 'react';

export default function MapView({ kiosks = [] }) {
    const mapRef         = useRef(null);
    const mapInstanceRef = useRef(null);
    const [selected, setSelected] = useState(null);

    useEffect(() => {
        if (mapInstanceRef.current || !mapRef.current) return;

        import('leaflet').then(L => {
            delete L.Icon.Default.prototype._getIconUrl;
            L.Icon.Default.mergeOptions({
                iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
                iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
                shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
            });

            const map = L.map(mapRef.current).setView([14.5995, 120.9842], 12);
            mapInstanceRef.current = map;

            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '© OpenStreetMap',
            }).addTo(map);

            const greenIcon = new L.Icon({
                iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
                shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
                iconSize: [25, 41], iconAnchor: [12, 41], popupAnchor: [1, -34],
            });
            const greyIcon = new L.Icon({
                iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-grey.png',
                shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
                iconSize: [25, 41], iconAnchor: [12, 41], popupAnchor: [1, -34],
            });

            kiosks.forEach(kiosk => {
                const marker = L.marker([kiosk.latitude, kiosk.longitude], {
                    icon: kiosk.is_active ? greenIcon : greyIcon,
                }).addTo(map);

                marker.bindPopup(`
                    <div style="min-width:160px;font-family:system-ui">
                        <div style="font-weight:600;font-size:13px;margin-bottom:3px">${kiosk.name}</div>
                        <div style="color:#64748b;font-size:11px;margin-bottom:6px">${kiosk.address}</div>
                        <span style="background:${kiosk.is_active ? '#dcfce7' : '#fef3c7'};color:${kiosk.is_active ? '#16a34a' : '#d97706'};padding:2px 8px;border-radius:999px;font-size:11px;font-weight:600">
                            ${kiosk.is_active ? '● Online' : '● Maintenance'}
                        </span>
                    </div>
                `);
                marker.on('click', () => setSelected(kiosk));
            });
        });

        return () => {
            if (mapInstanceRef.current) {
                mapInstanceRef.current.remove();
                mapInstanceRef.current = null;
            }
        };
    }, []);

    return (
        <AppLayout title="Nearby Machines" showBack>
            <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />

            {/* Map */}
            <div className="rounded-2xl overflow-hidden mb-4 shadow-sm" style={{ height: 280 }}>
                <div ref={mapRef} className="w-full h-full" />
            </div>

            {/* Kiosk list */}
            <div className="mb-2">
                <p className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-3">NEARBY LOCATIONS</p>
                <div className="space-y-2">
                    {kiosks.map(kiosk => (
                        <div
                            key={kiosk.id}
                            onClick={() => setSelected(selected?.id === kiosk.id ? null : kiosk)}
                            className={`bg-white rounded-2xl px-4 py-4 flex items-start gap-3 shadow-sm cursor-pointer transition-all ${selected?.id === kiosk.id ? 'ring-2 ring-[#2541b2]' : ''}`}
                        >
                            <div className="mt-0.5 flex-shrink-0">
                                <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" stroke={kiosk.is_active ? '#00c896' : '#f59e0b'} strokeWidth="2">
                                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
                                    <circle cx="12" cy="9" r="2.5" />
                                </svg>
                            </div>

                            <div className="flex-1 min-w-0">
                                <div className="font-semibold text-slate-800 text-sm">{kiosk.name}</div>
                                <div className="text-slate-400 text-xs mb-1.5">{kiosk.address}</div>
                                <span className={`inline-flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full ${kiosk.is_active ? 'text-[#00c896]' : 'text-amber-500'}`}>
                                    <span className="w-1.5 h-1.5 rounded-full inline-block" style={{ background: kiosk.is_active ? '#00c896' : '#f59e0b' }} />
                                    {kiosk.is_active ? 'Online' : 'Maintenance'}
                                </span>
                            </div>

                            <button className="flex-shrink-0 mt-1">
                                <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" stroke="#2541b2" strokeWidth="2">
                                    <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />
                                </svg>
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </AppLayout>
    );
}
