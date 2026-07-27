import React, { useState, useEffect } from "react";
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

  return (
    <MainLayout activeTab="Dashboard" isRouteView={isRouteView}>
      {isRouteView ? (
        /* Route Details View */
        <div className="flex-1 flex flex-col gap-3 overflow-hidden min-h-0">
          <div className="shrink-0 flex items-center gap-3">
            <button
              onClick={() => setIsRouteView(false)}
              className="px-2.5 py-1 text-[11px] font-bold bg-[#18181b] border border-[#27272a] hover:bg-[#27272a] rounded-md transition-colors cursor-pointer text-[#a1a1aa] hover:text-white"
            >
              &larr; Back
            </button>
            <div className="flex-1">
              <RouteDashboardHeader />
            </div>
          </div>

          <div className="shrink-0">
            <TripStatsCard />
          </div>

          <div className="flex flex-row gap-3.5 items-stretch w-full flex-1 min-h-0 overflow-hidden">
            <div className="flex-1 min-w-0 h-full min-h-0 overflow-hidden rounded-lg">
              <LivePositions selectedVehicle={selectedVehicle} showRoutePath={true} />
            </div>
            <div className="w-[320px] xl:w-87.5 shrink-0 h-full min-h-0 overflow-hidden">
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
      ) : (
        /* Standard Dashboard View */
        <div className="flex-1 flex flex-col gap-3 overflow-hidden min-h-0">
          <div className="shrink-0">
            <DashboardHeader onSearch={setVehicleSearch} />
          </div>
          <div className="shrink-0">
            <StatsCard />
          </div>

          <div className="flex flex-row gap-3.5 items-stretch w-full flex-1 min-h-0 overflow-hidden">
            <div
              className={`h-full min-h-0 overflow-hidden transition-all duration-300 ${
                selectedVehicle && showDetailsPanel
                  ? "flex-[1.2] min-w-0"
                  : "w-[400px] xl:w-[420px] shrink-0"
              }`}
            >
              <VehiclesList
                search={vehicleSearch}
                selectedVehicle={selectedVehicle}
                onSelectVehicle={(v) => {
                  setSelectedVehicle(v);
                  setShowDetailsPanel(true);
                }}
              />
            </div>

            <div className="flex-1 min-w-0 h-full min-h-0 overflow-hidden">
              <LivePositions
                selectedVehicle={selectedVehicle}
                showRoutePath={false}
              />
            </div>

            {selectedVehicle && showDetailsPanel && (
              <div className="w-75 xl:w-[320px] shrink-0 h-full min-h-0 overflow-hidden animate-in slide-in-from-right-5 duration-300">
                <DashboardVehicleDetails
                  vehicle={selectedVehicle}
                  onViewRoute={() => setIsRouteView(true)}
                />
              </div>
            )}
          </div>
        </div>
      )}
    </MainLayout>
  );
}
