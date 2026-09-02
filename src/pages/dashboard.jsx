import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import MainLayout from "../layouts/MainLayout";
import StatsCard, { KpiToggleButton } from "../features/dashboard/StatsCard";
// import DashboardHeader from "../features/dashboard/DashboardHeader";
import LivePositions from "../features/dashboard/LivePositions";
import DashboardVehicleCards from "../features/dashboard/DashboardVehicleCards";
import RouteHistorySlider from "../features/dashboard/RouteHistorySlider";
import DashboardMapPanel from "../features/dashboard/DashboardMapPanel";
import { getVehicleApiId } from "../features/dashboard/mapVehiclesList";
// import { getDashboardExport } from "../services/dashboardService";
// import { toast } from "../components/Ui/toast";
import { Truck } from "lucide-react";
import MainSectionHeader from "../components/Ui/MainLayoutUI/MainSectionHeader";
import { selectAuthUser } from "../store/slices/authSlice";
import useAccountProfile from "../hooks/useAccountProfile";

const DUMMY_VEHICLE_ADDRESS =
  "57 M From Sri Ranganatha Swamy Tours & Travel, Bangalore Bellary Road, Hunasamaranahalli, Yelahanka, Bengaluru, Bengaluru Urban District, Karnataka, 562157, India";
const DUMMY_VEHICLE_LAT = 13.1358;
const DUMMY_VEHICLE_LNG = 77.6184;

// Old dashboard imports kept for the commented layout below.
// import RouteDashboardHeader from "../features/route-details/RouteDashboardHeader";
// import TripStatsCard from "../features/route-details/TripStatsCard";
// import VehicleRouteDetails from "../features/route-details/VehicleRouteDetails";
// import VehiclesList from "../features/dashboard/VehiclesList";
// import VehiclesDetail from "../features/dashboard/VehiclesDetail";

function getGreeting(d = new Date()) {
  const h = d.getHours();
  if (h >= 5 && h < 12) return "Good morning";
  if (h >= 12 && h < 17) return "Good afternoon";
  return "Good evening";
}

export default function Dashboard() {
  const navigate = useNavigate();
  const authUser = useSelector(selectAuthUser);
  const { profile: accountProfile } = useAccountProfile();
  const displayName = authUser?.name ?? accountProfile?.name ?? "";
  const headerTitle = displayName
    ? `${getGreeting()}, ${displayName}`
    : getGreeting();

  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [focusedStop, setFocusedStop] = useState(null);
  const [vehicleSearch, setVehicleSearch] = useState("");
  const [isFullMapView, setIsFullMapView] = useState(false);
  const [kpisExpanded, setKpisExpanded] = useState(false);

  // Old dashboard state:
  // const [isRouteView, setIsRouteView] = useState(false);
  // const [showDetailsPanel, setShowDetailsPanel] = useState(false);
  // const exitRouteView = () => setIsRouteView(false);
  // const handleOpenRouteDetails = () => setIsRouteView(true);

  const handleSelectVehicle = (vehicle) => {
    const isSameVehicle =
      selectedVehicle &&
      vehicle &&
      (selectedVehicle.id === vehicle.id ||
        getVehicleApiId(selectedVehicle) === getVehicleApiId(vehicle));

    if (isSameVehicle) {
      setSelectedVehicle(null);
      setFocusedStop(null);
      return;
    }

    setSelectedVehicle(vehicle);
    setFocusedStop(null);
  };

  const handleSelectStop = (event) => {
    setFocusedStop(event);
  };

  const handleOpenFullMap = () => {
    setIsFullMapView(true);
  };

  const navigateToSavedPlaces = ({ address, lat, lng }) => {
    const params = new URLSearchParams({ create: "1" });
    if (address) params.set("address", address);
    if (lat != null && !Number.isNaN(Number(lat))) params.set("lat", String(lat));
    if (lng != null && !Number.isNaN(Number(lng))) params.set("lng", String(lng));
    navigate(`/saved-places?${params.toString()}`);
  };

  const handleSaveStop = (event) => {
    navigateToSavedPlaces({
      address: event?.address || DUMMY_VEHICLE_ADDRESS,
      lat: event?.lat ?? DUMMY_VEHICLE_LAT,
      lng: event?.lng ?? DUMMY_VEHICLE_LNG,
    });
  };

  const handleOpenVehicle = (vehicle) => {
    const vehicleId = getVehicleApiId(vehicle);
    navigate(
      vehicleId
        ? `/vehicle-overview?vehicle=${encodeURIComponent(vehicleId)}`
        : "/vehicle-overview",
    );
  };

  const handleSavePlaceFromVehicle = (vehicle) => {
    const address =
      vehicle?.address ||
      vehicle?.raw?.address ||
      vehicle?.raw?.formatted_address ||
      vehicle?.raw?.location_name ||
      DUMMY_VEHICLE_ADDRESS;
    const lat = Number(vehicle?.lat ?? vehicle?.raw?.lat);
    const lng = Number(vehicle?.lng ?? vehicle?.raw?.lng);
    const hasCoords = !Number.isNaN(lat) && !Number.isNaN(lng);

    navigateToSavedPlaces({
      address,
      lat: hasCoords ? lat : DUMMY_VEHICLE_LAT,
      lng: hasCoords ? lng : DUMMY_VEHICLE_LNG,
    });
  };

  /*
  const handleExport = async (opts = {}) => {
    try {
      const { dateRange, region, status, fleet, search } = opts || {};
      const params = {};
      if (status && status !== "all") params.status = status;
      if (fleet && fleet !== "all") params.group = fleet;
      if (search) params.search = search;
      if (dateRange) params.range = dateRange;

      const response = await getDashboardExport(params);
      const disposition =
        response.headers?.["content-disposition"] ||
        response.headers?.["Content-Disposition"];
      let filename = "dashboard-export.csv";
      if (disposition) {
        const match = /filename\*?=([^;]+)/i.exec(disposition);
        if (match) {
          filename = match[1].replace(/UTF-8''/, "").replace(/"/g, "");
        }
      }

      const blob = new Blob([response.data], {
        type: response.headers?.["content-type"] || "text/csv;charset=utf-8;",
      });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
      toast.success("Export started");
    } catch (err) {
      console.error("Dashboard export failed", err);
      toast.error(err?.message || "Dashboard export failed");
    }
  };
  */

  return (
    <MainLayout
      activeTab="Dashboard"
      headerTitle={headerTitle}
      headerSubtitle="Monitor vehicle locations, movement and fleet status in real time."
      onHeaderSearch={setVehicleSearch}
      headerSearchPlaceholder="Search"
    >
      <div className="relative flex-1 min-h-0 overflow-hidden flex flex-col">
        <div
          className={`absolute inset-0 flex flex-col gap-4 xl:gap-5 overflow-y-auto overflow-x-hidden no-scrollbar min-h-0 ${
            isFullMapView
              ? "invisible pointer-events-none"
              : "visible pointer-events-auto"
          }`}
        >
          {/* Old in-page header — greeting, subtitle and search now live in the navbar.
          <div className="shrink-0">
            <DashboardHeader
              onSearch={setVehicleSearch}
              onExportClick={handleExport}
              onAddVehicleClick={() => navigate("/vehicles")}
            />
          </div>
          */}
          <div className="flex-1 min-h-0 grid grid-rows-[auto_auto_minmax(0,1fr)] gap-4 xl:gap-5">
            <div className="min-w-0">
              <StatsCard
                isExpanded={kpisExpanded}
                onExpand={() => setKpisExpanded(!kpisExpanded)}
              />
            </div>

            <MainSectionHeader icon={Truck} title="Vehicles" className="mt-0">
              <div
                className={`transition-opacity duration-[280ms] ease-in-out ${
                  kpisExpanded
                    ? "opacity-100"
                    : "opacity-0 pointer-events-none"
                }`}
              >
                <KpiToggleButton
                  expanded
                  onClick={() => setKpisExpanded(!kpisExpanded)}
                />
              </div>
            </MainSectionHeader>

            <div className="dashboard-vehicle-section flex flex-col min-[1152px]:flex-row gap-4 min-[1152px]:gap-4 xl:gap-5 items-stretch w-full overflow-y-auto no-scrollbar min-[1152px]:overflow-hidden">
              <div className="w-full min-[1152px]:w-[clamp(300px,30%,380px)] xl:w-[360px] 2xl:w-[400px] h-[440px] min-[1152px]:h-full min-h-0 overflow-hidden shrink-0">
                <DashboardVehicleCards
                  search={vehicleSearch}
                  selectedVehicle={selectedVehicle}
                  onSelectVehicle={handleSelectVehicle}
                  onOpenVehicle={handleOpenVehicle}
                  onSavePlace={handleSavePlaceFromVehicle}
                />
              </div>

              <RouteHistorySlider
                vehicle={selectedVehicle}
                onClose={() => {
                  setSelectedVehicle(null);
                  setFocusedStop(null);
                }}
                onPlayRoute={handleOpenFullMap}
                onSaveStop={handleSaveStop}
                onSelectStop={handleSelectStop}
                selectedStopId={focusedStop?.id}
              />

              <div className="w-full shrink-0 h-[440px] min-[1152px]:flex-1 min-[1152px]:h-full min-w-0 min-[1152px]:min-w-[240px] min-h-0 overflow-hidden">
                <DashboardMapPanel
                  selectedVehicle={selectedVehicle}
                  focusedStop={focusedStop}
                  showRoutePath={Boolean(selectedVehicle)}
                  onViewMap={handleOpenFullMap}
                  onPlayRoute={handleOpenFullMap}
                />
              </div>
            </div>
          </div>
        </div>

        {isFullMapView && (
          <div className="fixed inset-0 z-[9999] bg-[#0c0c0e] w-screen h-screen flex flex-col overflow-hidden">
            <div className="absolute top-4 left-4 z-[10000]">
              <button
                type="button"
                onClick={() => setIsFullMapView(false)}
                className="px-3.5 py-2 text-xs font-bold bg-[#121214]/90 hover:bg-[#1f1f23] text-white border border-[#27272a] rounded-xl shadow-2xl backdrop-blur-md cursor-pointer transition-all flex items-center gap-1.5"
              >
                <span>&larr;</span>
                <span>Back</span>
              </button>
            </div>

            <div className="w-full h-full">
              <LivePositions
                selectedVehicle={selectedVehicle}
                focusedStop={focusedStop}
                showRoutePath={true}
                hideViewMapButton={true}
              />
            </div>
          </div>
        )}

        {/*
          OLD DASHBOARD LAYOUT (kept for reference)
          Vehicle list + live map + vehicle details panel, plus in-page route view.
          Replaced by star cards, route history (after vehicle select), and map.

          <div
            className={`absolute inset-0 flex flex-col gap-4 xl:gap-5 overflow-y-auto overflow-x-hidden no-scrollbar min-h-0 ${
              isRouteView || isFullMapView
                ? "invisible pointer-events-none"
                : "visible pointer-events-auto"
            }`}
          >
            <DashboardHeader
              onSearch={setVehicleSearch}
              onExportClick={handleExport}
              onAddVehicleClick={() => navigate("/vehicles")}
            />
            <StatsCard />
            <MainSectionHeader icon={Truck} title="Vehicles" />
            <div className="flex flex-col min-[1152px]:flex-row gap-4 items-stretch w-full flex-1 min-h-[40vh]">
              <VehiclesList
                search={vehicleSearch}
                selectedVehicle={selectedVehicle}
                onSelectVehicle={(v) => setSelectedVehicle(v)}
                onViewDetails={(v) => {
                  setSelectedVehicle(v);
                  setShowDetailsPanel(true);
                }}
              />
              <LivePositions
                selectedVehicle={selectedVehicle}
                showRoutePath={false}
                openInNewTab={false}
                onViewMap={handleOpenFullMap}
              />
              {selectedVehicle && showDetailsPanel && (
                <VehiclesDetail
                  vehicle={selectedVehicle}
                  onViewRoute={handleOpenRouteDetails}
                  onClose={() => {
                    setShowDetailsPanel(false);
                    setSelectedVehicle(null);
                  }}
                />
              )}
            </div>
          </div>

          {isRouteView && !isFullMapView ? (
            <div className="absolute inset-0 flex flex-col gap-4 overflow-hidden min-h-0 z-20 bg-[#070708]">
              <button onClick={exitRouteView}>&larr; Back</button>
              <RouteDashboardHeader />
              <TripStatsCard vehicle={selectedVehicle} />
              <LivePositions
                selectedVehicle={selectedVehicle}
                showRoutePath={true}
                openInNewTab={false}
                onViewMap={handleOpenFullMap}
              />
              <VehicleRouteDetails
                vehicle={selectedVehicle}
                onClose={() => {
                  setSelectedVehicle(null);
                  setIsRouteView(false);
                  setShowDetailsPanel(false);
                }}
              />
            </div>
          ) : null}
        */}
      </div>
    </MainLayout>
  );
}
