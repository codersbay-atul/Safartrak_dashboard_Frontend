import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import RouteDashboardHeader from "../features/route-details/RouteDashboardHeader";
import TripStatsCard from "../features/route-details/TripStatsCard";
import VehicleRouteDetails from "../features/route-details/VehicleRouteDetails";
import StatsCard from "../features/dashboard/StatsCard";
import DashboardHeader from "../features/dashboard/DashboardHeader";
import LivePositions from "../features/dashboard/LivePositions";
import VehiclesList from "../features/dashboard/VehiclesList";
import VehiclesDetail from "../features/dashboard/VehiclesDetail";
import { getDashboardExport } from "../services/dashboardService";
import { toast } from "../components/Ui/toast";

export default function Dashboard() {
  const navigate = useNavigate();

  // Refresh par initial state humesha null & false rahegi
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [vehicleSearch, setVehicleSearch] = useState("");
  const [isRouteView, setIsRouteView] = useState(false);
  const [isFullMapView, setIsFullMapView] = useState(false);
  const [showDetailsPanel, setShowDetailsPanel] = useState(false);

  const exitRouteView = () => setIsRouteView(false);

  const handleOpenFullMap = () => {
    setIsFullMapView(true);
  };

  const handleOpenRouteDetails = () => {
    setIsRouteView(true);
  };

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

  return (
    <MainLayout
      activeTab="Dashboard"
      isRouteView={isRouteView}
      onExitRouteView={exitRouteView}
    >
      <div className="relative flex-1 min-h-0 overflow-hidden flex flex-col">
        {/* A. NORMAL DASHBOARD VIEW */}
        <div
          className={`absolute inset-0 flex flex-col gap-2.5 xl:gap-3 overflow-hidden min-h-0 ${
            isRouteView || isFullMapView
              ? "invisible pointer-events-none"
              : "visible pointer-events-auto"
          }`}
        >
          <div className="shrink-0">
            <DashboardHeader
              onSearch={setVehicleSearch}
              onExportClick={handleExport}
              onAddVehicleClick={() => navigate("/vehicles")}
            />
          </div>
          <div className="shrink-0">
            <StatsCard />
          </div>

          <div className="flex flex-col min-[1152px]:flex-row gap-2.5 min-[1152px]:gap-3 xl:gap-3.5 items-stretch w-full flex-1 min-h-0 overflow-y-auto min-[1152px]:overflow-hidden">
            {/* 1. Vehicles List Panel */}
            <div className="w-full min-[1152px]:w-[clamp(380px,38%,440px)] xl:w-[450px] 2xl:w-[480px] h-[340px] min-[1152px]:h-full min-h-0 overflow-hidden transition-all duration-300 shrink-0">
              <VehiclesList
                search={vehicleSearch}
                selectedVehicle={selectedVehicle}
                onSelectVehicle={(v) => {
                  setSelectedVehicle(v);
                  // Row click par details card open nahi hoga
                }}
                onViewDetails={(v) => {
                  setSelectedVehicle(v);
                  setShowDetailsPanel(true); // Sirf "View Details" tap par card open hoga
                }}
              />
            </div>

            {/* 2. Live Position Map Panel */}
            <div className="w-full shrink-0 h-[360px] min-[1152px]:flex-1 min-[1152px]:h-full min-w-0 min-[1152px]:min-w-[240px] min-h-0 overflow-hidden">
              <LivePositions
                selectedVehicle={selectedVehicle}
                showRoutePath={false}
                openInNewTab={false}
                onViewMap={handleOpenFullMap}
              />
            </div>

            {/* 3. Vehicle Details Panel (Only opens when View Details button is clicked) */}
            {selectedVehicle && showDetailsPanel && (
              <div className="w-full min-[1152px]:w-[clamp(240px,22%,290px)] xl:w-[310px] 2xl:w-[330px] shrink-0 h-[480px] min-[1152px]:h-full min-h-0 overflow-hidden animate-in slide-in-from-right-5 duration-300">
                <VehiclesDetail
                  vehicle={selectedVehicle}
                  onViewRoute={handleOpenRouteDetails}
                  onClose={() => {
                    setShowDetailsPanel(false);
                    setSelectedVehicle(null);
                  }}
                />
              </div>
            )}
          </div>
        </div>

        {/* B. ROUTE DETAILS VIEW */}
        {isRouteView && !isFullMapView ? (
          <div className="absolute inset-0 flex flex-col gap-2.5 overflow-hidden min-h-0 z-20 bg-[#070708]">
            <div className="shrink-0 flex items-center gap-3">
              <button
                onClick={exitRouteView}
                className="px-2.5 py-1 text-[11px] font-bold bg-[#18181b] border border-[#27272a] hover:bg-[#27272a] rounded-md transition-colors cursor-pointer text-[#a1a1aa] hover:text-white"
              >
                &larr; Back
              </button>
              <div className="flex-1">
                <RouteDashboardHeader />
              </div>
            </div>

            <div className="shrink-0">
              <TripStatsCard vehicle={selectedVehicle} />
            </div>

            <div className="flex flex-row gap-2.5 min-[1152px]:gap-3 xl:gap-3.5 items-stretch w-full flex-1 min-h-0 overflow-hidden">
              <div className="flex-1 min-w-[220px] h-full min-h-0 overflow-hidden rounded-lg">
                <LivePositions
                  selectedVehicle={selectedVehicle}
                  showRoutePath={true}
                  openInNewTab={false}
                  onViewMap={handleOpenFullMap}
                />
              </div>
              <div className="w-[clamp(260px,28%,320px)] xl:w-[320px] 2xl:w-[350px] shrink-0 h-full min-h-0 overflow-hidden">
                <VehicleRouteDetails
                  vehicle={selectedVehicle}
                  onClose={() => {
                    setSelectedVehicle(null);
                    setIsRouteView(false);
                    setShowDetailsPanel(false);
                  }}
                />
              </div>
            </div>
          </div>
        ) : null}

        {/* C. FULL SCREEN MAP VIEW */}
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
                showRoutePath={true}
                hideViewMapButton={true}
              />
            </div>
          </div>
        )}
      </div>
    </MainLayout>
  );
}