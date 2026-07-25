import React from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

export default function MainLayout({ children, activeTab, setActiveTab, isRouteView }) {
  return (
    <div className="flex h-screen w-screen bg-[#09090b] text-white overflow-hidden select-none">
      <div className="h-full shrink-0 z-50 bg-[#121214]">
        <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      </div>
      {/* Main Container */}
      <div className="flex flex-1 flex-col min-w-0 h-full overflow-hidden">
        {/* Persistent Navbar */}
        <Navbar isRouteView={isRouteView} activeTab={activeTab} /> 
        {/* Dynamic Page Workspace Content */}
        <main className="flex-1 p-3.5 bg-[#070708] flex flex-col gap-3 overflow-hidden min-h-0">
          {children}
        </main>
      </div>
    </div>
  );
}