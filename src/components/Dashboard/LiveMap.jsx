import React from "react";
import { MapContainer, TileLayer, Marker, Polyline } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { Layers, LocateFixed, Maximize2, Plus, Minus } from "lucide-react";

// Custom Active Truck Icon (MH14ZZ8765)
const activeTruckIcon = L.divIcon({
  className: "",
  html: `
    <div style="
      width:32px;
      height:32px;
      background:#FDBB24;
      border-radius:6px;
      display:flex;
      justify-content:center;
      align-items:center;
      font-size:16px;
      border: 1px solid rgba(253, 187, 36, 0.6);
      box-shadow: 0 4px 12px rgba(0,0,0,0.5);
    ">
      🚚
    </div>
  `,
  iconSize: [32, 32],
});

// Destination Pin Icon for Page 2
const destinationIcon = L.divIcon({
  className: "",
  html: `<div style="font-size: 24px; filter: drop-shadow(0px 2px 4px rgba(0,0,0,0.5))">📍</div>`,
  iconSize: [30, 30],
  iconAnchor: [15, 30]
});

const defaultVehicle = {
  position: [28.6139, 77.209],
  plate: "MH14ZZ8765",
  type: "Heavy Truck",
  speed: "52 km/h",
  distance: "48 km",
};

// Route coordinates connecting Dhaula Kuan -> Chanakyapuri -> Central Delhi (Page 2)
const routeCoordinates = [
  [28.5921, 77.1682], 
  [28.5983, 77.1825], 
  [28.6015, 77.1950], 
  [28.6139, 77.2090]
];

export default function LiveMap({ selectedVehicle, showRoutePath }) {
  const vehicle = selectedVehicle || defaultVehicle;

  return (
    <div className="relative h-full w-full bg-[#0c0c0e]">
      
      {/* ==========================================
         1. LEAFLET MAP CONTAINER
         ========================================== */}
      <MapContainer
        center={vehicle.position}
        zoom={showRoutePath ? 13 : 12}
        zoomControl={false}
        className="h-full w-full z-0"
      >
        <TileLayer url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png" />
        
        {showRoutePath ? (
          <>
            <Polyline 
              positions={routeCoordinates} 
              pathOptions={{ 
                color: '#FDBB24', 
                weight: 4, 
                opacity: 0.95,
                lineCap: 'round',
                lineJoin: 'round'
              }} 
            />
            <Marker position={routeCoordinates[0]} icon={activeTruckIcon} />
            <Marker position={routeCoordinates[routeCoordinates.length - 1]} icon={destinationIcon} />
          </>
        ) : (
          <Marker position={vehicle.position} icon={activeTruckIcon} />
        )}
      </MapContainer>

      {/* ==========================================
         2. CONDITIONAL HUD PANELS & OVERLAYS
         ========================================== */}
      
      {showRoutePath ? (
        // ------------------------------------------
        // PAGE 2 OVERLAYS (HUD Info Panels)
        // ------------------------------------------
        <>
          {/* Top Right Mini HUD */}
          <div className="absolute top-14 right-14 w-[180px] bg-[#16161a]/95 border border-[#27272a]/70 rounded-lg p-2.5 shadow-2xl z-[1000] animate-in fade-in duration-300">
            <div className="grid grid-cols-2 gap-2 border-b border-zinc-800/60 pb-1.5 mb-1.5">
              <div>
                <p className="text-[8px] text-zinc-500 font-bold uppercase tracking-wider">Started</p>
                <p className="text-[10px] text-zinc-100 font-extrabold mt-0.5">08:42 AM</p>
              </div>
              <div className="text-right">
                <p className="text-[8px] text-zinc-500 font-bold uppercase tracking-wider">ETA</p>
                <p className="text-[10px] text-zinc-100 font-extrabold mt-0.5">11:25 AM</p>
              </div>
            </div>
            <div>
              <p className="text-[8px] text-zinc-500 font-bold uppercase tracking-wider">Destination</p>
              <p className="text-[10px] text-zinc-100 font-bold truncate mt-0.5">
                Pune Distribution Center
              </p>
            </div>
          </div>

          {/* Bottom Left Main HUD */}
          <div className="absolute bottom-4 left-4 w-[240px] bg-[#16161a]/95 border border-[#27272a]/70 rounded-lg p-3 shadow-2xl z-[1000] animate-in fade-in duration-300">
            <div className="grid grid-cols-3 gap-2 border-b border-zinc-800/60 pb-2 mb-2">
              <div>
                <p className="text-[8px] text-zinc-500 font-bold uppercase tracking-wider">Trip ID</p>
                <p className="text-[10px] text-[#FDBB24] font-extrabold mt-0.5">TRP-240812</p>
              </div>
              <div className="text-center">
                <p className="text-[8px] text-zinc-500 font-bold uppercase tracking-wider">ETA</p>
                <p className="text-[10px] text-zinc-100 font-extrabold mt-0.5">11:25 AM</p>
              </div>
              <div className="text-right">
                <p className="text-[8px] text-zinc-500 font-bold uppercase tracking-wider">Started</p>
                <p className="text-[10px] text-zinc-100 font-extrabold mt-0.5">08:42 AM</p>
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <div className="flex items-center justify-between text-[10px]">
                <span className="text-zinc-500 font-semibold">Origin</span>
                <span className="text-zinc-200 font-bold">Mumbai Warehouse</span>
              </div>
              <div className="flex items-center justify-between text-[10px]">
                <span className="text-zinc-500 font-semibold">Destination</span>
                <span className="text-zinc-200 font-bold truncate max-w-[130px]">
                  Pune Distribution Center
                </span>
              </div>
            </div>
          </div>
        </>
      ) : (
        // ------------------------------------------
        // PAGE 1 OVERLAYS (Clusters, Ambient Trucks, Active Tooltip)
        // ------------------------------------------
        <>
          {/* City Labels */}
          <span className="absolute top-16 left-[62%] text-[10px] font-bold text-zinc-600 uppercase tracking-widest pointer-events-none z-[1000]">Delhi</span>
          <span className="absolute top-[36%] left-[50%] text-[11px] font-extrabold text-zinc-500/80 uppercase tracking-widest pointer-events-none z-[1000]">New Delhi</span>
          <span className="absolute top-[52%] left-[12%] text-[8px] font-semibold text-zinc-600 uppercase tracking-tight pointer-events-none z-[1000]">Dhaula Kuan</span>
          <span className="absolute top-[54%] left-[34%] text-[8px] font-semibold text-zinc-600 uppercase tracking-tight pointer-events-none z-[1000]">Chanakyapuri</span>

          {/* Status Clusters */}
          <div className="absolute top-5 right-[28%] w-6 h-6 bg-[#111113]/90 border border-zinc-800 rounded-lg flex items-center justify-center text-[10.5px] font-bold text-zinc-300 shadow-md z-[1000]">8</div>
          <div className="absolute top-24 right-[10%] w-6 h-6 bg-[#111113]/90 border border-zinc-800 rounded-lg flex items-center justify-center text-[10.5px] font-bold text-zinc-300 shadow-md z-[1000]">6</div>
          <div className="absolute top-[48%] left-[22%] w-6 h-6 bg-[#111113]/90 border border-zinc-800 rounded-lg flex items-center justify-center text-[10.5px] font-bold text-zinc-300 shadow-md z-[1000]">4</div>
          <div className="absolute bottom-[16%] left-[6%] w-6 h-6 bg-[#111113]/90 border border-zinc-800 rounded-lg flex items-center justify-center text-[10.5px] font-bold text-zinc-300 shadow-md z-[1000]">8</div>

          {/* Ambient Inactive Trucks */}
          <div className="absolute top-20 left-[54%] text-[15px] drop-shadow z-[1000] pointer-events-none">🚚</div>
          <div className="absolute top-[38%] right-[26%] text-[15px] drop-shadow z-[1000] pointer-events-none">🚚</div>
          <div className="absolute bottom-[20%] left-[26%] text-[15px] drop-shadow z-[1000] pointer-events-none">🚚</div>
          <div className="absolute bottom-[10%] left-[32%] text-[15px] drop-shadow opacity-90 z-[1000] pointer-events-none">🚚</div>

          {/* Fix applied here: changed w-[180p to w-[180px] */}
          <div className="absolute top-[56%] left-[47%] z-[1000] flex flex-col items-start pointer-events-auto">
            <div className="w-[180px] bg-[#121214]/95 border border-[#1f1f23] rounded-lg p-2 shadow-2xl backdrop-blur-sm">
              <div className="flex items-center justify-between border-b border-zinc-800/80 pb-1 mb-1.5">
                <span className="text-[10px] font-extrabold text-white tracking-tight">{vehicle.plate}</span>
                <span className="text-[8px] text-zinc-500 font-medium">{vehicle.type}</span>
              </div>
              <div className="flex justify-between text-[9.5px] leading-tight mb-1">
                <span className="text-zinc-500 font-medium">Speed</span>
                <span className="font-bold text-white">{vehicle.speed}</span>
              </div>
              <div className="flex justify-between text-[9.5px] leading-tight">
                <span className="text-zinc-500 font-medium">Distance Traveled</span>
                <span className="font-bold text-white">{vehicle.distance}</span>
              </div>
            </div>
          </div>
        </>
      )}

      {/* ==========================================
         3. MAP CONTROLLER BUTTONS
         ========================================== */}
      <div className="absolute right-3 top-3 z-[1000]">
        <button className="w-8 h-8 rounded-lg bg-[#121214]/90 border border-[#1f1f23] text-zinc-400 hover:text-white flex items-center justify-center transition-colors shadow-lg cursor-pointer">
          <Layers size={14} />
        </button>
      </div>

      <div className="absolute right-3 bottom-3 z-[1000] flex flex-col bg-[#121214]/90 border border-[#1f1f23] rounded-lg shadow-xl overflow-hidden">
        <button className="w-8 h-8 text-zinc-400 hover:text-white border-b border-[#1f1f23]/60 flex items-center justify-center transition-colors cursor-pointer">
          <Maximize2 size={13} />
        </button>
        <button className="w-8 h-8 text-zinc-400 hover:text-white border-b border-[#1f1f23]/60 flex items-center justify-center transition-colors cursor-pointer">
          <LocateFixed size={13} />
        </button>
        <button className="w-8 h-8 text-zinc-400 hover:text-white border-b border-[#1f1f23]/60 flex items-center justify-center transition-colors cursor-pointer">
          <Plus size={13} />
        </button>
        <button className="w-8 h-8 text-zinc-400 hover:text-white flex items-center justify-center transition-colors cursor-pointer">
          <Minus size={13} />
        </button>
      </div>

    </div>
  );
}