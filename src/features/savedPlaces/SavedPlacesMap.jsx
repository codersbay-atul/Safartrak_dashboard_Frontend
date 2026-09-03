import { Marker, Circle } from "@react-google-maps/api";
import { Layers, LocateFixed, Maximize2, Plus, Minus } from "lucide-react";
import { Fragment, useEffect, useMemo, useRef } from "react";
import GoogleMapView from "../../components/Ui/GoogleMapView";
import { toLatLng } from "../../components/Ui/googleMapTheme";

const COLOR_PALETTE = [
  "#f59e0b",
  "#8b5cf6",
  "#10b981",
  "#3b82f6",
  "#ef4444",
  "#ec4899",
  "#06b6d4",
];

const parseRadiusMeters = (place) => {
  if (place.radiusMeters) return Number(place.radiusMeters);
  if (place.raw?.geometry?.radius_m) return Number(place.raw.geometry.radius_m);
  if (place.raw?.geometry?.radius_km) return Number(place.raw.geometry.radius_km) * 1000;
  if (place.radius) {
    const parsed = parseFloat(place.radius);
    return parsed < 100 ? parsed * 1000 : parsed;
  }
  return 3000;
};

const warehouseIcon = (color) => ({
  path: "M3 21V8l9-5 9 5v13H3zm6-2h2v-4h2v4h2v-6H9v6z",
  fillColor: color,
  fillOpacity: 1,
  strokeColor: "#0d0d11",
  strokeWeight: 1.2,
  scale: 1.1,
  anchor: { x: 12, y: 12 },
});

export default function SavedPlacesMap({ places = [], selectedPlace }) {
  const mapRef = useRef(null);
  const selectedCenter = toLatLng(selectedPlace?.center) || { lat: 20.5937, lng: 78.9629 };
  const zoom = selectedPlace ? 12 : 5;

  const mappedPlaces = useMemo(
    () =>
      (places || [])
        .map((place, index) => {
          const center = toLatLng(place.center);
          if (!center) return null;
          return {
            ...place,
            center,
            radiusMeters: parseRadiusMeters(place),
            color: COLOR_PALETTE[index % COLOR_PALETTE.length],
          };
        })
        .filter(Boolean),
    [places]
  );

  useEffect(() => {
    const map = mapRef.current;
    if (!map || !selectedCenter) return;
    map.panTo(selectedCenter);
    map.setZoom(zoom);
  }, [selectedCenter.lat, selectedCenter.lng, zoom]);

  return (
    <div className="relative h-full w-full bg-[#0c0c0e] rounded-xl overflow-hidden border border-[#1f1f23]">
      <GoogleMapView center={selectedCenter} zoom={zoom} mapRef={mapRef}>
        {mappedPlaces.map((place) => {
          const isSelected = selectedPlace?.id === place.id;
          return (
            <Fragment key={place.id}>
              <Circle
                center={place.center}
                radius={place.radiusMeters}
                options={{
                  strokeColor: place.color,
                  fillColor: place.color,
                  fillOpacity: isSelected ? 0.12 : 0.06,
                  strokeWeight: isSelected ? 2 : 1,
                  strokeOpacity: isSelected ? 0.8 : 0.5,
                }}
              />
              <Marker position={place.center} icon={warehouseIcon(place.color)} title={place.name} />
            </Fragment>
          );
        })}
      </GoogleMapView>

      <div className="absolute right-3 top-3 z-[1000]">
        <button
          type="button"
          className="w-8.5 h-8.5 rounded-lg bg-[#17171C] border border-[#2A2A2F] text-zinc-400 hover:text-white flex items-center justify-center transition-colors shadow-lg cursor-pointer"
        >
          <Layers size={15} />
        </button>
      </div>

      <div className="absolute right-3 bottom-3 z-[1000] flex flex-col gap-2">
        <button
          type="button"
          className="w-8.5 h-8.5 rounded-lg bg-[#17171C] border border-[#2A2A2F] text-zinc-400 hover:text-white flex items-center justify-center transition-colors shadow-lg cursor-pointer"
        >
          <Maximize2 size={14} />
        </button>
        <button
          type="button"
          onClick={() => {
            if (!mapRef.current || !selectedCenter) return;
            mapRef.current.panTo(selectedCenter);
            mapRef.current.setZoom(12);
          }}
          className="w-8.5 h-8.5 rounded-lg bg-[#17171C] border border-[#2A2A2F] text-zinc-400 hover:text-white flex items-center justify-center transition-colors shadow-lg cursor-pointer"
        >
          <LocateFixed size={14} />
        </button>
        <div className="flex flex-col rounded-lg bg-[#17171C] border border-[#2A2A2F] shadow-xl overflow-hidden">
          <button
            type="button"
            onClick={() => mapRef.current?.setZoom((mapRef.current.getZoom() || 12) + 1)}
            className="w-8.5 h-8.5 text-zinc-400 hover:text-white border-b border-[#2A2A2F]/60 flex items-center justify-center transition-colors cursor-pointer hover:bg-[#202026]"
          >
            <Plus size={14} />
          </button>
          <button
            type="button"
            onClick={() => mapRef.current?.setZoom((mapRef.current.getZoom() || 12) - 1)}
            className="w-8.5 h-8.5 text-zinc-400 hover:text-white flex items-center justify-center transition-colors cursor-pointer hover:bg-[#202026]"
          >
            <Minus size={14} />
          </button>
        </div>
      </div>
    </div>
  );
}
