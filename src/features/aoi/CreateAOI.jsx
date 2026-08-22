import React, { useEffect, useState } from "react";
import { X } from "lucide-react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";

import MainSearchInput from "../../components/Ui/MainLayoutUI/MainSearchInput";
import MainDropDown from "../../components/Ui/MainLayoutUI/MainDropDown";
import MainLayoutColor from "../../components/Ui/MainLayoutUI/MainLayoutColor";
import MainLayoutTextSize from "../../components/Ui/MainLayoutUI/MainLayoutTextSize";

function MapController({ center, zoom }) {
  const map = useMap();

  useEffect(() => {
    map.setView(center, zoom);
  }, [center, zoom, map]);

  return null;
}

export default function CreateAOI({
  isOpen = true,
  initialData = null,
  mode = "create",
  onClose,
  onSubmit,
}) {
  const [name, setName] = useState("");
  const [alerts, setAlerts] = useState({ entry: false, exit: false });
  const [selectedVehicles, setSelectedVehicles] = useState([]);
  const [aoiType, setAoiType] = useState("polygon");
  const [searchLocation, setSearchLocation] = useState("");
  const [mapCenter, setMapCenter] = useState([28.6139, 77.209]);
  const [mapZoom, setMapZoom] = useState(11);

  const resetForm = () => {
    setName("");
    setAlerts({ entry: false, exit: false });
    setSelectedVehicles([]);
    setAoiType("polygon");
    setSearchLocation("");
    setMapCenter([28.6139, 77.209]);
    setMapZoom(11);
  };

  useEffect(() => {
    if (!isOpen) {
      resetForm();
      return;
    }

    if (!initialData) {
      resetForm();
      return;
    }

    const raw = initialData.raw || initialData;

    setName(raw.name || initialData.name || "");
    setAlerts({
      entry: Boolean(
        raw.entry_alert ??
          raw.entryAlert ??
          raw.alerts?.entry ??
          initialData.alerts?.entry
      ),
      exit: Boolean(
        raw.exit_alert ??
          raw.exitAlert ??
          raw.alerts?.exit ??
          initialData.alerts?.exit
      ),
    });

    const assignedVehicles = Array.isArray(raw.assigned_vehicles)
      ? raw.assigned_vehicles
      : Array.isArray(raw.assignedVehicles)
      ? raw.assignedVehicles
      : Array.isArray(raw.vehicles)
      ? raw.vehicles
      : [];

    setSelectedVehicles(
      assignedVehicles.length > 0
        ? [
            typeof assignedVehicles[0] === "string"
              ? assignedVehicles[0]
              : assignedVehicles[0]?.plate ||
                assignedVehicles[0]?.vehicle_number ||
                assignedVehicles[0]?.id ||
                "",
          ]
        : []
    );

    const shape = raw.geometry?.shape || raw.shape || "polygon";
    setAoiType(shape === "circle" ? "circle" : "polygon");

    const parsedGeo =
      typeof raw.geo_position === "string"
        ? raw.geo_position.split(",").map(Number)
        : null;
    if (
      parsedGeo?.length === 2 &&
      !Number.isNaN(parsedGeo[0]) &&
      !Number.isNaN(parsedGeo[1])
    ) {
      setMapCenter([parsedGeo[0], parsedGeo[1]]);
      setMapZoom(13);
      setSearchLocation(raw.geo_position || "");
    } else if (Array.isArray(raw.center) && raw.center.length >= 2) {
      const [lat, lng] = raw.center.map(Number);
      if (!Number.isNaN(lat) && !Number.isNaN(lng)) {
        setMapCenter([lat, lng]);
        setMapZoom(13);
        setSearchLocation(`${lat},${lng}`);
      }
    } else {
      setSearchLocation("");
    }
  }, [isOpen, initialData]);

  useEffect(() => {
    const trimmedLocation = searchLocation.trim();
    if (!isOpen || !trimmedLocation) return;

    const timer = setTimeout(async () => {
      try {
        const response = await fetch(
          `https://nominatim.openstreetmap.org/search?format=jsonv2&limit=1&q=${encodeURIComponent(
            trimmedLocation
          )}`
        );
        const data = await response.json();

        if (data?.[0]) {
          const lat = parseFloat(data[0].lat);
          const lng = parseFloat(data[0].lon);

          if (!Number.isNaN(lat) && !Number.isNaN(lng)) {
            setMapCenter([lat, lng]);
            setMapZoom(13);
          }
        }
      } catch (error) {
        console.error("Failed to geocode place location", error);
      }
    }, 600);

    return () => clearTimeout(timer);
  }, [isOpen, searchLocation]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) return;

    if (onSubmit) {
      onSubmit({
        name: name.trim(),
        alerts,
        selectedVehicles,
        aoiType,
        searchLocation: searchLocation.trim(),
        entry_alert: alerts.entry,
        exit_alert: alerts.exit,
        assigned_vehicles: selectedVehicles,
        geo_position: `${mapCenter[0]},${mapCenter[1]}`,
      });
    }
    onClose?.();
  };

  const vehicleOptions = [
    { label: "Select vehicles...", value: "" },
    { label: "Vehicle 01 (DL-01-AB-1234)", value: "Vehicle 01" },
    { label: "Vehicle 02 (DL-02-CD-5678)", value: "Vehicle 02" },
  ];

  const aoiTypeOptions = [
    { label: "Circle", value: "circle" },
    { label: "Polygon", value: "polygon" },
  ];

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/70 backdrop-blur-sm p-3 sm:p-4">
      <MainLayoutColor
        as="div"
        background="surface"
        className="w-full max-w-2xl border border-[#232328] rounded-2xl shadow-2xl overflow-hidden flex flex-col font-sans"
      >
        {/* Header */}
        <div className="px-4 py-3 border-b border-[#232328] flex items-center justify-between shrink-0">
          <div>
            {/* 14px Section Title */}
            <MainLayoutColor
              as={MainLayoutTextSize}
              color="title"
              size="sectionTitle"
              className="font-semibold block"
            >
              {mode === "edit" ? "Edit Place" : "Create New Places"}
            </MainLayoutColor>
            {/* 12px Sub Info */}
            <MainLayoutColor
              as={MainLayoutTextSize}
              color="subtitle"
              size="subInfoText"
              className="mt-0.5 block"
            >
              {mode === "edit"
                ? "Update the selected place details and save your changes."
                : "Fill in the details below and create the place."}
            </MainLayoutColor>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-zinc-400 hover:text-white transition-colors cursor-pointer p-1 rounded-md"
          >
            <X size={18} />
          </button>
        </div>

        {/* Content Body */}
        <div className="grid grid-cols-1 md:grid-cols-12 min-h-[360px]">
          <div className="md:col-span-5 p-4 flex flex-col gap-3.5 border-b md:border-b-0 md:border-r border-[#232328]">
            <div className="flex flex-col gap-1.5">
              <MainLayoutColor
                as={MainLayoutTextSize}
                color="subtitle"
                size="subInfoText"
                className="font-medium tracking-wide block"
              >
                Place Name
              </MainLayoutColor>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter Place Name"
                className="w-full px-3.5 py-2 rounded-xl bg-[#1c1c20] border border-[#2a2a30] text-[12px] text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-emerald-500/60 transition-colors"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <MainLayoutColor
                as={MainLayoutTextSize}
                color="subtitle"
                size="subInfoText"
                className="font-medium tracking-wide block"
              >
                Alerts
              </MainLayoutColor>
              <div className="flex items-center gap-5">
                <label className="flex items-center gap-2 cursor-pointer text-zinc-300 hover:text-white">
                  <input
                    type="checkbox"
                    checked={alerts.entry}
                    onChange={(e) =>
                      setAlerts((prev) => ({
                        ...prev,
                        entry: e.target.checked,
                      }))
                    }
                    className="w-3.5 h-3.5 rounded bg-[#1c1c20] border-[#2a2a30] accent-emerald-500 focus:ring-0 cursor-pointer"
                  />
                  <MainLayoutTextSize size="subInfoText">
                    Vehicle Entry
                  </MainLayoutTextSize>
                </label>
                <label className="flex items-center gap-2 cursor-pointer text-zinc-300 hover:text-white">
                  <input
                    type="checkbox"
                    checked={alerts.exit}
                    onChange={(e) =>
                      setAlerts((prev) => ({
                        ...prev,
                        exit: e.target.checked,
                      }))
                    }
                    className="w-3.5 h-3.5 rounded bg-[#1c1c20] border-[#2a2a30] accent-emerald-500 focus:ring-0 cursor-pointer"
                  />
                  <MainLayoutTextSize size="subInfoText">
                    Vehicle Exit
                  </MainLayoutTextSize>
                </label>
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <MainLayoutColor
                as={MainLayoutTextSize}
                color="subtitle"
                size="subInfoText"
                className="font-medium tracking-wide block"
              >
                Assign Vehicles
              </MainLayoutColor>
              <MainDropDown
                label="Select vehicles..."
                options={vehicleOptions}
                selectedValue={selectedVehicles[0] || ""}
                onSelect={(value) =>
                  setSelectedVehicles(value ? [value] : [])
                }
                className="w-full justify-between rounded-full bg-[#05070B] border-[#22252B]"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <MainLayoutColor
                as={MainLayoutTextSize}
                color="subtitle"
                size="subInfoText"
                className="font-medium tracking-wide block"
              >
                Type of Place
              </MainLayoutColor>
              <MainDropDown
                label="Select type"
                options={aoiTypeOptions}
                selectedValue={aoiType}
                onSelect={setAoiType}
                className="w-full justify-between rounded-full bg-[#05070B] border-[#22252B]"
              />
            </div>

            <div className="flex flex-col gap-1.5 mt-auto">
              <MainLayoutColor
                as={MainLayoutTextSize}
                color="subtitle"
                size="subInfoText"
                className="font-medium tracking-wide block"
              >
                Search Location
              </MainLayoutColor>
              <MainSearchInput
                value={searchLocation}
                onChange={(e) => setSearchLocation(e.target.value)}
                placeholder="Search address or location..."
                containerClassName="w-full"
                className="w-full rounded-full bg-[#05070B] border-[#22252B]"
              />
            </div>
          </div>

          <div className="md:col-span-7 relative bg-[#0b0f19] min-h-[240px] md:min-h-[300px]">
            <MapContainer
              center={mapCenter}
              zoom={mapZoom}
              zoomControl={false}
              className="h-full w-full z-0 min-h-[240px] md:min-h-[300px]"
            >
              <MapController center={mapCenter} zoom={mapZoom} />
              <TileLayer
                url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
                attribution="&copy; OpenStreetMap"
              />
              <Marker position={mapCenter}>
                <Popup>{searchLocation.trim() || "Selected location"}</Popup>
              </Marker>
            </MapContainer>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="px-4 py-3 border-t border-[#232328] flex items-center justify-between gap-3 shrink-0">
          <button
            type="button"
            onClick={onClose}
            className="w-1/2 py-2 rounded-xl bg-[#222226] hover:bg-[#2a2a30] text-zinc-300 hover:text-white transition-colors cursor-pointer"
          >
            <MainLayoutTextSize size="headerButtonText">
              Cancel
            </MainLayoutTextSize>
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            className="w-1/2 py-2 rounded-xl bg-[#10b981] hover:bg-[#059669] text-black transition-colors cursor-pointer shadow-lg shadow-emerald-500/10"
          >
            <MainLayoutTextSize size="headerButtonText">
              {mode === "edit" ? "Save Changes" : "Create Place"}
            </MainLayoutTextSize>
          </button>
        </div>
      </MainLayoutColor>
    </div>
  );
}