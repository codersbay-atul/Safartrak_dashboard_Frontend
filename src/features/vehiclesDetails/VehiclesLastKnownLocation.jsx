import React, { useEffect } from "react";
import { MapContainer, TileLayer, Marker, useMap } from "react-leaflet";
import L from "leaflet";
import { MapPin, Truck } from "lucide-react";
import "leaflet/dist/leaflet.css";

// Fix Leaflet CSS Z-Index conflict with Tailwind UI
import ReactDOMServer from "react-dom/server";

// 1. Custom Truck Marker Icon (Matching Image Design)
const createTruckIcon = () => {
  const iconHtml = ReactDOMServer.renderToString(
    <div className="w-10 h-10 bg-[#1a1712] border border-amber-500/60 rounded-xl flex items-center justify-center shadow-lg shadow-black/80">
      <Truck className="w-5 h-5 text-amber-500" />
    </div>
  );

  return L.divIcon({
    html: iconHtml,
    className: "custom-leaflet-marker",
    iconSize: [40, 40],
    iconAnchor: [20, 20],
  });
};

// Map Recenter Helper Component
function RecenterMap({ center }) {
  const map = useMap();
  useEffect(() => {
    if (center) map.setView(center, map.getZoom());
  }, [center, map]);
  return null;
}

export default function VehiclesLastKnownLocation({ selectedVehicle }) {
  // Default Coordinates (Pune / New Delhi area as shown in image)
  const position = selectedVehicle?.coordinates || [18.5204, 73.8567];
  const address = selectedVehicle?.address || "NH48, Near Pune Toll Plaza, Pune Maharashtra412308";

  return (
    <div className="w-full h-full bg-[#12151a] border border-gray-800/80 rounded-xl flex flex-col min-h-0 overflow-hidden relative">
      
      {/* 1. Header Area */}
      <div className="px-3 py-2 bg-[#12151a] shrink-0 border-b border-gray-800/40">
        <h3 className="text-xs font-bold text-white tracking-wide">
          Last Known Location
        </h3>
      </div>

      {/* 2. Map View Container */}
      <div className="flex-1 min-h-0 w-full relative overflow-hidden">
        <MapContainer
          center={position}
          zoom={12}
          zoomControl={false}
          attributionControl={false}
          className="w-full h-full z-0 bg-[#0e1013]"
        >
          {/* Dark Mode Map Tiles */}
          <TileLayer
            url="https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png"
            maxZoom={20}
          />

          <RecenterMap center={position} />

          {/* Vehicle Marker */}
          <Marker position={position} icon={createTruckIcon()} />
        </MapContainer>

        {/* Custom Dark Overlay to maintain deep pitch-black UI look */}
        <div className="absolute inset-0 bg-black/20 pointer-events-none z-[1]"></div>

        {/* 3. Bottom Address & Action Overlay Card */}
        <div className="absolute bottom-2 left-2 right-2 bg-[#0e1116]/95 backdrop-blur-md p-2 rounded-lg border border-gray-800/80 flex items-center justify-between z-[10] shadow-xl">
          {/* Address Text */}
          <div className="flex items-start gap-1.5 min-w-0 pr-2">
            <MapPin className="w-3.5 h-3.5 text-gray-400 shrink-0 mt-0.5" />
            <p className="text-[9.5px] text-gray-300 font-medium leading-tight line-clamp-2">
              {address}
            </p>
          </div>

          {/* View on Map Button */}
          <button
            onClick={() => window.open(`https://maps.google.com/?q=${position[0]},${position[1]}`, "_blank")}
            className="bg-[#161a20] hover:bg-[#1f2630] text-amber-400 border border-amber-500/50 px-2.5 py-1 rounded-md text-[10px] font-semibold transition shrink-0 shadow-sm"
          >
            View on Map
          </button>
        </div>
      </div>

    </div>
  );
}