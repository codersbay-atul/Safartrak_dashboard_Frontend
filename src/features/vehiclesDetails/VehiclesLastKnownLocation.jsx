import React, { useEffect, useRef } from "react";
import { Marker } from "@react-google-maps/api";
import { MapPin } from "lucide-react";

import MainLayoutColor from "../../components/Ui/MainLayoutUI/MainLayoutColor";
import MainLayoutTextSize from "../../components/Ui/MainLayoutUI/MainLayoutTextSize";
import GoogleMapView from "../../components/Ui/GoogleMapView";
import { toLatLng } from "../../components/Ui/googleMapTheme";

const FALLBACK = { lat: 18.5204, lng: 73.8567 };

export default function VehiclesLastKnownLocation({ selectedVehicle }) {
  const mapRef = useRef(null);
  const position = toLatLng(selectedVehicle?.coordinates) || FALLBACK;
  const address =
    selectedVehicle?.address ||
    "NH48, Near Pune Toll Plaza, Pune Maharashtra 412308";

  useEffect(() => {
    mapRef.current?.panTo(position);
  }, [position.lat, position.lng]);

  return (
    <MainLayoutColor
      as="div"
      background="surface"
      className="w-full h-full border border-[#27272a] rounded-xl flex flex-col min-h-0 overflow-hidden relative select-none font-sans"
    >
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

      <div className="flex-1 min-h-0 w-full relative overflow-hidden">
        <GoogleMapView center={position} zoom={12} mapRef={mapRef} followCenter>
          <Marker position={position} title={selectedVehicle?.vehicleNumber || "Vehicle"} />
        </GoogleMapView>

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
