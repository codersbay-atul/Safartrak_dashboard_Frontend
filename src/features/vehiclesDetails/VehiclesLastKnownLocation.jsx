import React, { useEffect } from "react";
import { MapContainer, TileLayer, Marker, useMap } from "react-leaflet";
import L from "leaflet";
import { MapPin, Truck } from "lucide-react";
import "leaflet/dist/leaflet.css";
import ReactDOMServer from "react-dom/server";

import MainLayoutColor from "../../components/Ui/MainLayoutUI/MainLayoutColor";
import MainLayoutTextSize from "../../components/Ui/MainLayoutUI/MainLayoutTextSize";

const createTruckIcon = () => {
  const iconHtml = ReactDOMServer.renderToString(
    <div className="w-10 h-10 bg-[#111115] border-2 border-[var(--color-yellow,#ffd60a)] rounded-xl flex items-center justify-center shadow-[0_4px_16px_rgba(255,214,10,0.4)]">
      <Truck className="w-5 h-5 text-[var(--color-yellow,#ffd60a)]" />
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
    <MainLayoutColor
      as="div"
      background="surface"
      className="w-full h-full border border-[#27272a] rounded-xl flex flex-col min-h-0 overflow-hidden relative select-none font-sans"
    >
      {/* 1. Header Area */}
      <div className="px-3.5 py-2.5 shrink-0 border-b border-[#27272a]">
        <MainLayoutColor
          as={MainLayoutTextSize}
          color="title"
          size="sectionTitle"
          className="font-medium tracking-tight block"
        >
          Last Known Location
        </MainLayoutColor>
      </div>

      {/* 2. Map Container Area */}
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
        <div className="absolute inset-0 bg-black/10 pointer-events-none z-[1]" />

        {/* 3. Bottom Address HUD Card */}
        <div className="absolute bottom-2.5 left-2.5 right-2.5 bg-[#18181b]/95 border border-[#27272a] p-2.5 rounded-xl flex items-center justify-between z-[1000] shadow-2xl backdrop-blur-md">
          <div className="flex items-start gap-2 min-w-0 pr-2">
            <MainLayoutColor
              color="yellow"
              as={MapPin}
              className="w-3.5 h-3.5 shrink-0 mt-0.5"
            />
            <MainLayoutColor
              as={MainLayoutTextSize}
              color="title"
              size="subInfoText"
              className="font-medium leading-tight line-clamp-2"
            >
              {address}
            </MainLayoutColor>
          </div>

          <button className="px-2.5 py-1 bg-[var(--color-yellow,#ffd60a)]/10 border border-[var(--color-yellow,#ffd60a)]/30 hover:bg-[var(--color-yellow,#ffd60a)]/20 rounded-lg transition-all shrink-0 cursor-pointer">
            <MainLayoutColor
              as={MainLayoutTextSize}
              color="yellow"
              size="badgeText"
              className="font-medium"
            >
              View on Map
            </MainLayoutColor>
          </button>
        </div>
      </div>
    </MainLayoutColor>
  );
}