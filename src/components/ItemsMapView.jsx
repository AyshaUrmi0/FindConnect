import React, { useEffect, useRef, useContext } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { ThemeContext } from '../context/Authcontext/ThemeContext';

// City Coordinates Dictionary
const CITY_COORDS = {
  dhaka: [23.8103, 90.4125],
  chittagong: [22.3569, 91.7832],
  chattogram: [22.3569, 91.7832],
  sylhet: [24.8949, 91.8687],
  rajshahi: [24.3636, 88.6241],
  khulna: [22.8456, 89.5403],
  barisal: [22.7010, 90.3535],
  rangpur: [25.7439, 89.2752],
  comilla: [23.4607, 91.1809],
  gazipur: [23.9999, 90.4203],
  london: [51.5074, -0.1278],
  chicago: [41.8781, -87.6298],
  'new york': [40.7128, -74.0060],
  'san francisco': [37.7749, -122.4194]
};

const ItemsMapView = ({ items = [] }) => {
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const { theme } = useContext(ThemeContext);
  const isDark = theme === 'dark';

  useEffect(() => {
    if (!mapRef.current) return;

    // Clean up previous map instance if initializing again
    if (mapInstanceRef.current) {
      try {
        mapInstanceRef.current.remove();
      } catch (e) {}
      mapInstanceRef.current = null;
    }

    const defaultCenter = [23.8103, 90.4125];

    // Initialize Leaflet Map
    const map = L.map(mapRef.current, {
      center: defaultCenter,
      zoom: 7,
      scrollWheelZoom: false,
    });
    mapInstanceRef.current = map;

    // Tile Layer
    const tileUrl = isDark
      ? 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png'
      : 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';

    L.tileLayer(tileUrl, {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      maxZoom: 18,
    }).addTo(map);

    // Invalidate size after mounting
    const timer = setTimeout(() => {
      if (map) map.invalidateSize();
    }, 200);

    const bounds = [];

    if (Array.isArray(items)) {
      items.forEach((item, idx) => {
        if (!item) return;
        const locationLower = (item.location || '').toLowerCase();
        let coords = null;

        for (const [city, cityCoords] of Object.entries(CITY_COORDS)) {
          if (locationLower.includes(city)) {
            coords = cityCoords;
            break;
          }
        }

        if (!coords) coords = [23.8103, 90.4125];

        const idStr = String(item._id || idx);
        const seed = idStr.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
        const latJitter = ((seed % 100) - 50) * 0.0008;
        const lngJitter = (((seed * 3) % 100) - 50) * 0.0008;
        const finalCoords = [coords[0] + latJitter, coords[1] + lngJitter];

        bounds.push(finalCoords);

        const isLost = (item.type || item.postType || '').toLowerCase() === 'lost';
        const colorClass = isLost ? '#ef4444' : '#10b981';
        const iconEmoji = isLost ? '🔍' : '🎁';

        const customIcon = L.divIcon({
          className: 'custom-leaflet-marker',
          html: `
            <div style="
              background-color: ${colorClass};
              width: 36px;
              height: 36px;
              border-radius: 50% 50% 50% 0;
              transform: rotate(-45deg);
              display: flex;
              align-items: center;
              justify-content: center;
              box-shadow: 0 4px 10px rgba(0,0,0,0.3);
              border: 3px solid white;
            ">
              <span style="transform: rotate(45deg); font-size: 14px; line-height: 1;">${iconEmoji}</span>
            </div>
          `,
          iconSize: [36, 36],
          iconAnchor: [18, 36],
          popupAnchor: [0, -36]
        });

        const popupContent = `
          <div style="width: 220px; font-family: system-ui, sans-serif; padding: 2px;">
            <div style="height: 110px; overflow: hidden; border-radius: 12px; margin-bottom: 8px; background-color: #f3f4f6;">
              <img src="${item.image || item.file || 'https://via.placeholder.com/200x120?text=No+Image'}" style="width: 100%; height: 100%; object-fit: cover;" />
            </div>
            <h4 style="font-weight: 700; font-size: 14px; margin: 0 0 4px 0; color: #111827; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${item.title || 'Item'}</h4>
            <p style="font-size: 12px; color: #6b7280; margin: 0 0 8px 0;">📍 ${item.location || 'Unknown'} | 🏷️ ${item.category || 'General'}</p>
            <a href="/items/${item._id}" style="display: block; text-align: center; background: #8b5cf6; color: white; padding: 7px 12px; border-radius: 10px; font-size: 12px; font-weight: 700; text-decoration: none; box-shadow: 0 2px 5px rgba(139,92,246,0.3);">View Details</a>
          </div>
        `;

        L.marker(finalCoords, { icon: customIcon })
          .addTo(map)
          .bindPopup(popupContent);
      });
    }

    if (bounds.length > 0) {
      try {
        map.fitBounds(bounds, { padding: [50, 50], maxZoom: 12 });
      } catch (e) {}
    }

    return () => {
      clearTimeout(timer);
      if (mapInstanceRef.current) {
        try {
          mapInstanceRef.current.remove();
        } catch (e) {}
        mapInstanceRef.current = null;
      }
    };
  }, [items, isDark]);

  return (
    <div className="w-full relative rounded-3xl overflow-hidden shadow-xl border border-gray-200 dark:border-gray-700/80 z-0">
      {/* Map Legend */}
      <div className="absolute top-4 right-4 z-20 bg-white/90 dark:bg-gray-900/90 backdrop-blur-md px-4 py-2.5 rounded-2xl shadow-lg border border-gray-200/80 dark:border-gray-700 text-xs font-bold flex items-center gap-4">
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-full bg-red-500 inline-block shadow-sm"></span>
          <span className="text-gray-700 dark:text-gray-200">Lost Item</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-full bg-emerald-500 inline-block shadow-sm"></span>
          <span className="text-gray-700 dark:text-gray-200">Found Item</span>
        </div>
      </div>

      {/* Direct Leaflet DOM Container */}
      <div
        ref={mapRef}
        style={{ width: '100%', height: '550px', minHeight: '550px' }}
        className="w-full h-[550px] z-0"
      />

      <style>
        {`
          .leaflet-popup-content-wrapper {
            border-radius: 1rem !important;
            padding: 4px !important;
            box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.2) !important;
          }
          .leaflet-popup-content {
            margin: 8px !important;
          }
        `}
      </style>
    </div>
  );
};

export default ItemsMapView;
