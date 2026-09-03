import { useEffect, useRef, useState } from "react";
import { useJsApiLoader } from "@react-google-maps/api";
import { consumeMapsQuota, getMapsStatus } from "../../api/mapsApi";

const libraries = [];

export default function GoogleMapLoader({ children, loadingMessage = "Loading map..." }) {
  const [quota, setQuota] = useState({ enabled: true, checked: false });
  const consumedRef = useRef(false);
  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY || "";

  const { isLoaded, loadError } = useJsApiLoader({
    id: "safartrak-google-maps",
    googleMapsApiKey: apiKey,
    libraries,
  });

  useEffect(() => {
    let cancelled = false;
    getMapsStatus()
      .then((status) => {
        if (!cancelled) {
          setQuota({
            enabled: status?.enabled !== false && Number(status?.mapsRemaining ?? 1) > 0,
            checked: true,
          });
        }
      })
      .catch(() => {
        if (!cancelled) setQuota({ enabled: true, checked: true });
      });
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (!isLoaded || !quota.enabled || consumedRef.current) return;
    consumedRef.current = true;
    consumeMapsQuota(1).catch((err) => {
      consumedRef.current = false;
      if (err?.status === 429 || err?.code === "GOOGLE_MAPS_QUOTA") {
        setQuota({ enabled: false, checked: true });
      }
    });
  }, [isLoaded, quota.enabled]);

  if (!apiKey) {
    return (
      <div className="h-full w-full flex items-center justify-center bg-[#0b0f19] text-white text-sm px-4 text-center">
        Add VITE_GOOGLE_MAPS_API_KEY to enable Google Maps.
      </div>
    );
  }

  if (loadError) {
    return (
      <div className="h-full w-full flex items-center justify-center bg-[#0b0f19] text-white text-sm">
        Failed to load Google Maps.
      </div>
    );
  }

  if (!quota.checked || !isLoaded) {
    return (
      <div className="h-full w-full flex items-center justify-center bg-[#0b0f19] text-white text-sm">
        {loadingMessage}
      </div>
    );
  }

  if (!quota.enabled) {
    return (
      <div className="h-full w-full flex items-center justify-center bg-[#0b0f19] text-white text-sm px-4 text-center">
        Daily Google Maps limit reached (7000/day). Try again tomorrow.
      </div>
    );
  }

  return children;
}
