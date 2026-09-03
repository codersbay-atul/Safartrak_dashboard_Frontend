import { useEffect, useRef } from "react";
import { GoogleMap } from "@react-google-maps/api";
import GoogleMapLoader from "./GoogleMapLoader";
import { GOOGLE_MAP_OPTIONS, toLatLng } from "./googleMapTheme";

const DEFAULT_CENTER = { lat: 28.6139, lng: 77.209 };

export default function GoogleMapView({
  center,
  zoom = 12,
  mapRef,
  onIdle,
  onClick,
  followCenter = false,
  children,
  className = "h-full w-full",
  options,
}) {
  const innerRef = useRef(null);
  const resolvedCenter = toLatLng(center) || DEFAULT_CENTER;

  useEffect(() => {
    if (!followCenter) return;
    const map = innerRef.current;
    if (!map) return;
    map.panTo(resolvedCenter);
    if (zoom) map.setZoom(zoom);
  }, [followCenter, resolvedCenter.lat, resolvedCenter.lng, zoom]);

  return (
    <GoogleMapLoader>
      <GoogleMap
        mapContainerClassName={className}
        center={resolvedCenter}
        zoom={zoom}
        onClick={onClick}
        onLoad={(map) => {
          innerRef.current = map;
          if (mapRef) mapRef.current = map;
        }}
        onIdle={() => {
          const map = innerRef.current;
          if (onIdle && map) onIdle(map);
        }}
        options={{ ...GOOGLE_MAP_OPTIONS, ...(options || {}) }}
      >
        {children}
      </GoogleMap>
    </GoogleMapLoader>
  );
}
