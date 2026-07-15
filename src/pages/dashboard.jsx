import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import DashboardHeader from "../components/Dashboard/DashboardHeader";
import StatsCard from "../components/Dashboard/StatsCard";
import VehicleList from "../components/Dashboard/VehicleList";
import LivePosition from "../components/Dashboard/LivePostion";
import VehicleDetails from "../components/Dashboard/VehicleDetails";
import RouteDashboardHeader from "../components/RouteDetails/RouteDashboardHeader";
import RouteStatsCards from "../components/RouteDetails/RouteStatsCard";

// Humare naye components import karenge
import FleetDistanceChart from "../components/Analytics/FleetDistanceChart"; 
import PerformanceSummary from "../components/Analytics/PerformanceSummary"; 

export default function Dashboard() {
  // Tab Management State
  const [activeTab, setActiveTab] = useState("Dashboard");

  const [selectedVehicle, setSelectedVehicle] = useState(() => {
    const savedVehicle = localStorage.getItem("selectedVehicle");
    return savedVehicle ? JSON.parse(savedVehicle) : null;
  });
  
  const [isRouteView, setIsRouteView] = useState(() => {
    const savedRouteView = localStorage.getItem("isRouteView");
    return savedRouteView === "true";
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

  // Dynamic Workspace Content Renderer
  const renderWorkspace = () => {
    switch (activeTab) {
      case "Dashboard":
        // Purana Dashboard & Route View Code bilkul unaltered rahega
        return isRouteView ? (
          // PAGE 2: ROUTE DETAILS VIEW
          <div className="flex-1 flex flex-col gap-3 overflow-hidden min-h-0">
            <div className="shrink-0 flex items-center gap-3">
              <button 
                onClick={() => setIsRouteView(false)}
                className="px-2.5 py-1 text-[11px] font-bold bg-[#18181b] border border-[#27272a] hover:bg-[#27272a] rounded-md transition-colors cursor-pointer text-[#a1a1aa] hover:text-white"
              >
                ← Back
              </button>
              <div className="flex-1">
                <RouteDashboardHeader />
              </div>
            </div>

            <div className="shrink-0">
              <RouteStatsCards />
            </div>

            <div className="flex flex-row gap-3.5 items-stretch w-full flex-1 min-h-0 overflow-hidden">
              <div className="flex-1 min-w-0 h-full min-h-0 overflow-hidden rounded-lg">
                <LivePosition selectedVehicle={selectedVehicle} showRoutePath={true} />
              </div>
              <div className="w-[320px] xl:w-87.5 shrink-0 h-full min-h-0 overflow-hidden">
                <VehicleDetails 
                  vehicle={selectedVehicle} 
                  onClose={() => {
                    setSelectedVehicle(null);
                    setIsRouteView(false);
                  }} 
                />
              </div>
            </div>
          </div>
        ) : (
          // PAGE 1: VEHICLE DIRECTORY VIEW
          <div className="flex-1 flex flex-col gap-3 overflow-hidden min-h-0">
            <div className="shrink-0">
              <DashboardHeader />
            </div>
            <div className="shrink-0">
              <StatsCard />
            </div>

            <div className="flex flex-row gap-3.5 items-stretch w-full flex-1 min-h-0 overflow-hidden">
              <div className="w-90 xl:w-95 shrink-0 h-full min-h-0 overflow-hidden">
                <VehicleList onSelectVehicle={(v) => setSelectedVehicle(v)} />
              </div>

              <div className="flex-1 min-w-0 h-full min-h-0 overflow-hidden">
                <LivePosition selectedVehicle={selectedVehicle} />
              </div>

              {selectedVehicle && (
                <div className="w-75 xl:w-[320px] shrink-0 h-full min-h-0 overflow-hidden animate-in slide-in-from-right-5 duration-300">
                  <VehicleDetails 
                    vehicle={selectedVehicle} 
                    onClose={() => setSelectedVehicle(null)} 
                    onViewRoute={() => setIsRouteView(true)} 
                  />
                </div>
              )}
            </div>
          </div>
        );

      case "Analytics":
        // Naya extracted components layout jo click karne par seamless load hoga
        return (
          <div className="flex flex-col lg:flex-row gap-4 w-full h-full min-h-0 overflow-y-auto">
            <div className="flex-1 min-w-0 h-full">
              <FleetDistanceChart />
            </div>
            <div className="w-full lg:w-[380px] xl:w-[420px] shrink-0">
              <PerformanceSummary />
            </div>
          </div>
        );

      default:
        return (
          <div className="flex-1 flex items-center justify-center text-zinc-500">
            <p className="text-sm font-semibold">{activeTab} section is under construction...</p>
          </div>
        );
    }
  };

  return (
    <div className="flex h-screen w-screen bg-[#09090b] text-white overflow-hidden select-none">
      
      {/* 1. SIDEBAR (Sidebar ko state variables bypass kar rahe hain) */}
      <div className="h-full shrink-0 z-50 bg-[#121214]">
        <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      </div>

      {/* MAIN WORKSPACE */}
      <div className="flex flex-1 flex-col min-w-0 h-full overflow-hidden">
        
        {/* 2. NAVBAR (Always static inside the workflow) */}
        <Navbar isRouteView={isRouteView} activeTab={activeTab} />

        {/* 3. DYNAMIC INSIDE WORKSPACE RENDERER */}
        <main className="flex-1 p-3.5 bg-[#070708] flex flex-col gap-3 overflow-hidden min-h-0">
          {renderWorkspace()}
        </main>
      </div>
    </div>
  );
}