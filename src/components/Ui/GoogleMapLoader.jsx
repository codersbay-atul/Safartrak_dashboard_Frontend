import React from "react";
import { useJsApiLoader } from "@react-google-maps/api";

const libraries = ["places"];

export default function GoogleMapLoader({ children, loadingMessage = "Loading map..." }) {
  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
    libraries,
  });

  if (loadError) {
    return (
      <div className="h-full w-full flex items-center justify-center bg-[#0b0f19] text-white text-sm">
        Failed to load Google Maps.
      </div>
    );
  }

  if (!isLoaded) {
    return (
      <div className="h-full w-full flex items-center justify-center bg-[#0b0f19] text-white text-sm">
        {loadingMessage}
      </div>
    );
  }

  return <>{children}</>;
}
