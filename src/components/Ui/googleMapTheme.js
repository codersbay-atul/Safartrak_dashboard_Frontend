export const DARK_MAP_STYLES = [
  { elementType: "geometry", stylers: [{ color: "#0b0f19" }] },
  { elementType: "labels.text.stroke", stylers: [{ color: "#0b0f19" }] },
  { elementType: "labels.text.fill", stylers: [{ color: "#8b8d97" }] },
  { featureType: "administrative", elementType: "geometry", stylers: [{ visibility: "off" }] },
  { featureType: "poi", stylers: [{ visibility: "off" }] },
  { featureType: "road", elementType: "geometry", stylers: [{ color: "#1c2230" }] },
  { featureType: "road", elementType: "geometry.stroke", stylers: [{ color: "#11151f" }] },
  { featureType: "road.highway", elementType: "geometry", stylers: [{ color: "#2a3142" }] },
  { featureType: "transit", stylers: [{ visibility: "off" }] },
  { featureType: "water", elementType: "geometry", stylers: [{ color: "#070b12" }] },
  { featureType: "water", elementType: "labels.text.fill", stylers: [{ color: "#3d4454" }] },
];

export const GOOGLE_MAP_OPTIONS = {
  disableDefaultUI: true,
  clickableIcons: false,
  keyboardShortcuts: false,
  gestureHandling: "greedy",
  backgroundColor: "#0b0f19",
  styles: DARK_MAP_STYLES,
};

export function toLatLng(value) {
  if (Array.isArray(value) && value.length >= 2) {
    const lat = Number(value[0]);
    const lng = Number(value[1]);
    if (Number.isFinite(lat) && Number.isFinite(lng)) return { lat, lng };
  }
  if (value && typeof value === "object") {
    const lat = Number(value.lat ?? value.latitude);
    const lng = Number(value.lng ?? value.lon ?? value.longitude);
    if (Number.isFinite(lat) && Number.isFinite(lng)) return { lat, lng };
  }
  return null;
}
