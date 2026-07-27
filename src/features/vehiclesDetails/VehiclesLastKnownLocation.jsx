import React, { useEffect } from "react";
import { MapContainer, TileLayer, Marker, useMap } from "react-leaflet";
import L from "leaflet";
import { MapPin, Truck } from "lucide-react";
import "leaflet/dist/leaflet.css";
import ReactDOMServer from "react-dom/server";


const createTruckIcon = () => {
  const iconHtml = ReactDOMServer.renderToString(
    <div className="w-10 h-10 bg-[#111115] border-2 border-[#FDBB24] rounded-xl flex items-center justify-center shadow-[0_4px_16px_rgba(253,187,36,0.4)]">
      <Truck className="w-5 h-5 text-[#FDBB24]" />
    </div>
  );

  return L.divIcon({
    html: iconHtml,
    className: "custom-leaflet-marker",
    iconSize: [40, 40],
    iconAnchor: [20, 20],
  });
};

function RecenterMap({ center }) {
  const map = useMap();
  useEffect(() => {
    if (center) map.setView(center, map.getZoom());
  }, [center, map]);
  return null;
}

export default function VehiclesLastKnownLocation({ selectedVehicle }) {

  const position = selectedVehicle?.coordinates || [18.5204, 73.8567];
  const address =
    selectedVehicle?.address ||
    "NH48, Near Pune Toll Plaza, Pune Maharashtra 412308";

  return (
    <div className="w-full h-full bg-[#12151a] border border-gray-800/80 rounded-xl flex flex-col min-h-0 overflow-hidden relative">
      
      {/* 1. Header Area */}
      <div className="px-3 py-2 bg-[#12151a] shrink-0 border-b border-gray-800/40">
        <h3 className="text-xs font-bold text-white tracking-wide">
          Last Known Location
        </h3>
      </div>

      
      <div className="flex-1 min-h-0 w-full relative overflow-hidden">
        <MapContainer
          center={position}
          zoom={12}
          zoomControl={false}
          attributionControl={false}
          className="w-full h-full z-0 bg-[#0B0F19]"
        >
          <TileLayer
            url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
            maxZoom={19}
            subdomains="abcd"
          />

          <RecenterMap center={position} />

          {/* Vehicle Marker */}
          <Marker position={position} icon={createTruckIcon()} />
        </MapContainer>

        {/* Custom Dark Layer Overlay */}
        <div className="absolute inset-0 bg-black/10 pointer-events-none z-[1]"></div>

        {/* 3. Bottom Address HUD Card */}
        <div className="absolute bottom-2.5 left-2.5 right-2.5 bg-[#17171C] border border-[#2A2A2F] p-2.5 rounded-lg flex items-center justify-between z-[1000] shadow-2xl">
          <div className="flex items-start gap-2 min-w-0 pr-2">
            <MapPin className="w-3.5 h-3.5 text-[#FDBB24] shrink-0 mt-0.5" />
            <p className="text-[9.5px] text-gray-300 font-medium leading-tight line-clamp-2">
              {address}
            </p>
          </div>

          <button className="px-2.5 py-1 bg-[#FDBB24]/10 border border-[#FDBB24]/40 hover:bg-[#FDBB24]/20 text-[#FDBB24] rounded-md text-[9.5px] font-bold transition shrink-0 cursor-pointer">
            View on Map
          </button>
        </div>
      </div>

    </div>
  );
}