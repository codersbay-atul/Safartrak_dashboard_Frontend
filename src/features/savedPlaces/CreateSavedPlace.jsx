import { useEffect, useRef, useState } from "react";
import { X } from "lucide-react";
import { Marker } from "@react-google-maps/api";

import MainSearchInput from "../../components/Ui/MainLayoutUI/MainSearchInput";
import MainLayoutColor from "../../components/Ui/MainLayoutUI/MainLayoutColor";
import MainLayoutTextSize from "../../components/Ui/MainLayoutUI/MainLayoutTextSize";
import MainLayoutButton from "../../components/Ui/MainLayoutUI/MainLayoutButton";
import GoogleMapView from "../../components/Ui/GoogleMapView";
import { consumeMapsQuota } from "../../api/mapsApi";

export default function CreateSavedPlace({
  isOpen = true,
  initialData = null,
  mode = "create",
  isSubmitting = false,
  onClose,
  onSubmit,
}) {
  const [searchLocation, setSearchLocation] = useState("");
  const [lat, setLat] = useState("28.6139");
  const [lng, setLng] = useState("77.209");
  const [name, setName] = useState("");
  // const [alerts, setAlerts] = useState({ entry: false, exit: false });
  // const [selectedVehicles, setSelectedVehicles] = useState([]);
  // const [placeType, setPlaceType] = useState("polygon");
  const [mapCenter, setMapCenter] = useState([28.6139, 77.209]);
  const [mapZoom, setMapZoom] = useState(11);
  const skipGeocodeRef = useRef(false);

  const applyCoordinates = (nextLat, nextLng, zoom = 13) => {
    const parsedLat = Number(nextLat);
    const parsedLng = Number(nextLng);
    if (Number.isNaN(parsedLat) || Number.isNaN(parsedLng)) return;

    setLat(String(nextLat));
    setLng(String(nextLng));
    setMapCenter([parsedLat, parsedLng]);
    setMapZoom(zoom);
  };

  const resetForm = () => {
    setSearchLocation("");
    setLat("28.6139");
    setLng("77.209");
    setName("");
    // setAlerts({ entry: false, exit: false });
    // setSelectedVehicles([]);
    // setPlaceType("polygon");
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
    // setAlerts({
      // entry: Boolean(
      //   raw.entry_alert ??
      //   raw.entryAlert ??
      //   raw.alerts?.entry ??
      //   initialData.alerts?.entry
      // ),
      // exit: Boolean(
        // raw.exit_alert ??
        // raw.exitAlert ??
      //   raw.alerts?.exit ??
      //   initialData.alerts?.exit
      // ),
    // });

    const nextLat = Number(
      raw.lat ??
        initialData.lat ??
        raw.geometry?.center?.lat ??
        raw.center?.[0],
    );
    const nextLng = Number(
      raw.lng ??
        initialData.lng ??
        raw.geometry?.center?.lng ??
        raw.center?.[1],
    );
    const hasCoords = !Number.isNaN(nextLat) && !Number.isNaN(nextLng);
    const nextSearch =
      initialData.address ||
      initialData.searchLocation ||
      raw.address ||
      raw.searchLocation ||
      "";

    const parsedGeo =
      typeof raw.geo_position === "string"
        ? raw.geo_position.split(",").map(Number)
        : null;
    const geoLat = parsedGeo?.[0];
    const geoLng = parsedGeo?.[1];
    const resolvedLat = hasCoords
      ? nextLat
      : !Number.isNaN(Number(geoLat))
        ? Number(geoLat)
        : NaN;
    const resolvedLng = hasCoords
      ? nextLng
      : !Number.isNaN(Number(geoLng))
        ? Number(geoLng)
        : NaN;
    const resolvedHasCoords =
      !Number.isNaN(resolvedLat) && !Number.isNaN(resolvedLng);

    if (resolvedHasCoords) {
      skipGeocodeRef.current = Boolean(nextSearch);
      applyCoordinates(resolvedLat, resolvedLng);
    }

    setSearchLocation(
      nextSearch ||
        (resolvedHasCoords ? `${resolvedLat},${resolvedLng}` : ""),
    );
  }, [isOpen, initialData]);

  useEffect(() => {
    const trimmedLocation = searchLocation.trim();
    if (!isOpen || !trimmedLocation) return;
    if (skipGeocodeRef.current) {
      skipGeocodeRef.current = false;
      return;
    }

    const timer = setTimeout(async () => {
      try {
        if (!window.google?.maps?.Geocoder) return;
        await consumeMapsQuota(1).catch(() => null);
        const geocoder = new window.google.maps.Geocoder();
        geocoder.geocode({ address: trimmedLocation }, (results, status) => {
          if (status !== "OK" || !results?.[0]) return;
          const loc = results[0].geometry.location;
          applyCoordinates(loc.lat(), loc.lng());
        });
      } catch (error) {
        console.error("Failed to geocode place location", error);
      }
    }, 700);

    return () => clearTimeout(timer);
  }, [isOpen, searchLocation]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) return;

    if (isSubmitting) return;

    if (onSubmit) {
      onSubmit({
        name: name.trim(),
        searchLocation: searchLocation.trim(),
        lat: Number(lat),
        lng: Number(lng),
        geo_position: `${mapCenter[0]},${mapCenter[1]}`,
        // alerts,
        // selectedVehicles,
        // placeType,
        // entry_alert: alerts.entry,
        // exit_alert: alerts.exit,
        // assigned_vehicles: selectedVehicles,
      });
    }
  };

  // const vehicleOptions = [
  //   { label: "Select vehicles...", value: "" },
  //   { label: "Vehicle 01 (DL-01-AB-1234)", value: "Vehicle 01" },
  //   { label: "Vehicle 02 (DL-02-CD-5678)", value: "Vehicle 02" },
  // ];

  // const placeTypeOptions = [
  //   { label: "Circle", value: "circle" },
  //   { label: "Polygon", value: "polygon" },
  // ];

  const handleLatChange = (value) => {
    setLat(value);
    const parsedLat = parseFloat(value);
    const parsedLng = parseFloat(lng);
    if (!Number.isNaN(parsedLat) && !Number.isNaN(parsedLng)) {
      setMapCenter([parsedLat, parsedLng]);
      setMapZoom(13);
    }
  };

  const handleLngChange = (value) => {
    setLng(value);
    const parsedLat = parseFloat(lat);
    const parsedLng = parseFloat(value);
    if (!Number.isNaN(parsedLat) && !Number.isNaN(parsedLng)) {
      setMapCenter([parsedLat, parsedLng]);
      setMapZoom(13);
    }
  };

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

            <div className="grid grid-cols-2 gap-3">
              <div className="flex flex-col gap-1.5">
                <MainLayoutColor
                  as={MainLayoutTextSize}
                  color="subtitle"
                  size="subInfoText"
                  className="font-medium tracking-wide block"
                >
                  Latitude
                </MainLayoutColor>
                <input
                  type="text"
                  inputMode="decimal"
                  value={lat}
                  onChange={(e) => handleLatChange(e.target.value)}
                  placeholder="28.6139"
                  className="w-full px-3.5 py-2 rounded-xl bg-[#1c1c20] border border-[#2a2a30] text-[12px] text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-[#FDBB24]/40 transition-colors"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <MainLayoutColor
                  as={MainLayoutTextSize}
                  color="subtitle"
                  size="subInfoText"
                  className="font-medium tracking-wide block"
                >
                  Longitude
                </MainLayoutColor>
                <input
                  type="text"
                  inputMode="decimal"
                  value={lng}
                  onChange={(e) => handleLngChange(e.target.value)}
                  placeholder="77.209"
                  className="w-full px-3.5 py-2 rounded-xl bg-[#1c1c20] border border-[#2a2a30] text-[12px] text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-[#FDBB24]/40 transition-colors"
                />
              </div>
            </div>

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
                className="w-full px-3.5 py-2 rounded-xl bg-[#1c1c20] border border-[#2a2a30] text-[12px] text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-[#FDBB24]/40 transition-colors"
              />
            </div>

            {/* <div className="flex flex-col gap-1.5">
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
            </div> */}

            {/* <div className="flex flex-col gap-1.5">
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
                options={placeTypeOptions}
                selectedValue={placeType}
                onSelect={setPlaceType}
                className="w-full justify-between rounded-full bg-[#05070B] border-[#22252B]"
              />
            </div> */}
          </div>

          <div className="md:col-span-7 relative bg-[#0b0f19] min-h-[240px] md:min-h-[300px]">
            <GoogleMapView
              center={mapCenter}
              zoom={mapZoom}
              followCenter
              className="h-full w-full min-h-[240px] md:min-h-[300px]"
              onClick={(event) => {
                const latLng = event?.latLng;
                if (!latLng) return;
                applyCoordinates(latLng.lat(), latLng.lng());
                setSearchLocation(`${latLng.lat().toFixed(5)}, ${latLng.lng().toFixed(5)}`);
              }}
            >
              <Marker position={{ lat: Number(lat), lng: Number(lng) }} title={searchLocation.trim() || "Selected location"} />
            </GoogleMapView>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="px-4 py-3 border-t border-[#232328] flex items-center justify-between gap-3 shrink-0">
          <MainLayoutButton
            type="button"
            variant="outlineMuted"
            size="md"
            onClick={onClose}
            className="w-1/2"
          >
            Cancel
          </MainLayoutButton>
          <MainLayoutButton
            type="button"
            variant="solidYellow"
            size="md"
            disabled={isSubmitting || !name.trim() || !searchLocation.trim() || !lat || !lng}
            onClick={handleSubmit}
            className="w-1/2 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-[#FDB914]"
          >
            {isSubmitting
              ? "Saving..."
              : mode === "edit"
                ? "Save Changes"
                : "Create Place"}
          </MainLayoutButton>
        </div>
      </MainLayoutColor>
    </div>
  );
}