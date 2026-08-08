import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import RouteDashboardHeader from "../features/route-details/RouteDashboardHeader";
import TripStatsCard from "../features/route-details/TripStatsCard";
import VehicleRouteDetails from "../features/route-details/VehicleRouteDetails";
import StatsCard from "../features/dashboard/StatsCard";
import DashboardHeader from "../features/dashboard/DashboardHeader";
import LivePositions from "../features/dashboard/LivePositions";
import VehiclesList from "../features/dashboard/VehiclesList";
import DashboardVehicleDetails from "../features/dashboard/DashboardVehicleDetails";

export default function Dashboard() {
  const navigate = useNavigate();
  const [selectedVehicle, setSelectedVehicle] = useState(() => {
    const savedVehicle = localStorage.getItem("selectedVehicle");
    return savedVehicle ? JSON.parse(savedVehicle) : null;
  });

  const [vehicleSearch, setVehicleSearch] = useState("");

  const [isRouteView, setIsRouteView] = useState(() => {
    return localStorage.getItem("isRouteView") === "true";
  });

  const [showDetailsPanel, setShowDetailsPanel] = useState(() => {
    return localStorage.getItem("showDetailsPanel") === "true";
  });

  useEffect(() => {
    if (selectedVehicle) {
      localStorage.setItem("selectedVehicle", JSON.stringify(selectedVehicle));
    } else {
      localStorage.removeItem("selectedVehicle");
    }
  }, [selectedVehicle]);

  useEffect(() => {
    localStorage.setItem("isRouteView", isRouteView);
  }, [isRouteView]);

  useEffect(() => {
    localStorage.setItem("showDetailsPanel", showDetailsPanel);
  }, [showDetailsPanel]);

  const exitRouteView = () => setIsRouteView(false);

  return (
    <MainLayout
      activeTab="Dashboard"
      isRouteView={isRouteView}
      onExitRouteView={exitRouteView}
    >
    
      <div
        className={`relative flex-1 min-h-0 overflow-hidden ${
          isRouteView ? "" : "flex flex-col"
        }`}
      >
        <div
          className={`absolute inset-0 flex flex-col gap-2.5 xl:gap-3 overflow-hidden min-h-0 ${
            isRouteView
              ? "invisible pointer-events-none"
              : "visible pointer-events-auto"
          }`}
          aria-hidden={isRouteView}
        >
          <div className="shrink-0">
            <DashboardHeader onSearch={setVehicleSearch} onAddVehicleClick={() => navigate("/vehicles")} />
          </div>
          <div className="shrink-0">
            <StatsCard />
          </div>

          <div className="flex flex-col min-[1152px]:flex-row gap-2.5 min-[1152px]:gap-3 xl:gap-3.5 items-stretch w-full flex-1 min-h-0 overflow-y-auto min-[1152px]:overflow-hidden">
            <div className="w-full min-[1152px]:w-[clamp(260px,32%,360px)] xl:w-[380px] 2xl:w-[400px] h-[320px] min-[1152px]:h-full min-h-0 overflow-hidden transition-all duration-300 shrink-0">
              <VehiclesList
                search={vehicleSearch}
                selectedVehicle={selectedVehicle}
                onSelectVehicle={(v) => {
                  setSelectedVehicle(v);
                  setShowDetailsPanel(true);
                }}
              />
            </div>

            <div className="w-full shrink-0 h-[360px] min-[1152px]:flex-1 min-[1152px]:h-full min-w-0 min-[1152px]:min-w-[200px] min-h-0 overflow-hidden">
              <LivePositions
                selectedVehicle={selectedVehicle}
                showRoutePath={false}
                onViewMap={() => setIsRouteView(true)}
              />
            </div>

            {selectedVehicle && showDetailsPanel && (
              <div className="w-full min-[1152px]:w-[clamp(220px,24%,280px)] xl:w-[300px] 2xl:w-[320px] shrink-0 h-[480px] min-[1152px]:h-full min-h-0 overflow-hidden animate-in slide-in-from-right-5 duration-300">
                <DashboardVehicleDetails
                  vehicle={selectedVehicle}
                  onViewRoute={() => setIsRouteView(true)}
                />
              </div>
            )}
          </div>
        </div>

        {isRouteView ? (
          <div className="absolute inset-0 flex flex-col gap-2.5 overflow-hidden min-h-0">
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
      </div>
    </MainLayout>
  );
}
