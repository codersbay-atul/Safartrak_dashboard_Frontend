import React, { useState, useEffect } from "react";
import Sidebar from "../layouts/Sidebar";
import Navbar from "../layouts/Navbar";
import DashboardHeader from "../components/Dashboard/DashboardHeader";
import StatsCard from "../components/Dashboard/StatsCard";
import VehicleList from "../components/Dashboard/VehicleList";
import LivePosition from "../components/Dashboard/LivePostion";
import VehicleDetails from "../components/Dashboard/VehicleDetails";
import RouteDashboardHeader from "../components/RouteDetails/RouteDashboardHeader";
import RouteStatsCards from "../components/RouteDetails/RouteStatsCard";
import PerformanceSummary from "../components/Analytics/PerformanceSummary"; 
import FleetPerformanceChart from "../components/Analytics/FleetPerformanceChart";
import VehicleRouteDetails from "../components/RouteDetails/VehicleRouteDetails";
import AnalyticsHeader from "../components/Analytics/AnalyticsHeader";
import AnalyticsStatsCard from "../components/Analytics/AnalyticsStatsCard";

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

  // State to control when the details panel should actually be visible
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


  useEffect(() => {
    if (activeTab !== "Dashboard") {
      setIsRouteView(false);
    }
  }, [activeTab]);


  const renderWorkspace = () => {
    switch (activeTab) {
      case "Dashboard":
        return isRouteView ? (
         
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
              <RouteStatsCards />
            </div>

            <div className="flex flex-row gap-3.5 items-stretch w-full flex-1 min-h-0 overflow-hidden">
              <div className="flex-1 min-w-0 h-full min-h-0 overflow-hidden rounded-lg">
                <LivePosition selectedVehicle={selectedVehicle} showRoutePath={true} />
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
          <div className="flex-1 flex flex-col gap-3 overflow-hidden min-h-0">
            <div className="shrink-0">
              <DashboardHeader />
            </div>
            <div className="shrink-0">
              <StatsCard />
            </div>

            <div className="flex flex-row gap-3.5 items-stretch w-full flex-1 min-h-0 overflow-hidden">
              {/* Vehicle List Section */}
              <div className={`h-full min-h-0 overflow-hidden transition-all duration-300
                ${selectedVehicle && showDetailsPanel 
                  ? "flex-1 min-w-0" 
                  : "w-90 xl:w-95 shrink-0"}`}>
                <VehicleList 
                  onSelectVehicle={(v) => {
                    setSelectedVehicle(v);
                    setShowDetailsPanel(true);
                  }} 
                />
              </div>

              {/* Map Section */}
              <div className="flex-1 min-w-0 h-full min-h-0 overflow-hidden">
                <LivePosition selectedVehicle={selectedVehicle} showRoutePath={false} />
              </div>

              {/* Vehicle Details Panel */}
              {selectedVehicle && showDetailsPanel && (
                <div className="w-75 xl:w-[320px] shrink-0 h-full min-h-0 overflow-hidden animate-in slide-in-from-right-5 duration-300">
                  <VehicleDetails 
                    vehicle={selectedVehicle} 
                    onClose={() => {
                      setSelectedVehicle(null);
                      setShowDetailsPanel(false);
                    }} 
                    onViewRoute={() => setIsRouteView(true)} 
                  />
                </div>
              )}
            </div>
          </div>
        );

      case "Analytics":
        return (
          <div className="flex-1 flex flex-col gap-3.5 min-h-0 overflow-y-auto lg:overflow-hidden pr-0.5">
            
            <div className="shrink-0">
              <AnalyticsHeader/>
            </div>
            
            <div className="shrink-0">
              <AnalyticsStatsCard/>
            </div>

            <div className="flex flex-col lg:flex-row gap-3.5 w-full flex-1 min-h-0 items-stretch">
              <div className="flex-1 min-w-0 bg-[#16161a] border border-[#1f1f23] rounded-xl p-3 h-full min-h-[300px] lg:min-h-0">
                <FleetPerformanceChart />
              </div>
              <div className="w-full lg:w-[360px] xl:w-[400px] shrink-0 h-full">
                <PerformanceSummary />
              </div>
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
      
      {/* 1. SIDEBAR */}
      <div className="h-full shrink-0 z-50 bg-[#121214]">
        <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      </div>

      {/* MAIN WORKSPACE */}
      <div className="flex flex-1 flex-col min-w-0 h-full overflow-hidden">
        
        {/* 2. NAVBAR */}
        <Navbar isRouteView={isRouteView} activeTab={activeTab} />

        {/* 3. DYNAMIC INSIDE WORKSPACE RENDERER */}
        <main className="flex-1 p-3.5 bg-[#070708] flex flex-col gap-3 overflow-hidden min-h-0">
          {renderWorkspace()}
        </main>
      </div>
    </div>
  );
}