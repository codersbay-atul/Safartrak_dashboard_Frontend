import React from 'react';
import { 
  LayoutDashboard, 
  BarChart3, 
  Clock3,
  Power,
  TriangleAlert, 
  ScanSearch, 
  Route, 
  GitBranch, 
  Send, 
  Truck, 
  IdCard, 
  FileSearch, 
  Users, 
  Bell, 
  Calendar 
} from 'lucide-react';


const iconMap = {
  "Dashboard": LayoutDashboard,
  "Analytics": BarChart3,
  "Reports": Clock3,
  "Mobilize / Immobilize": Power,
  "Alerts": TriangleAlert,
  "Area of Interest (AOI)": ScanSearch,
  "Routes": Route,
  "Trips": GitBranch,
  "Activity": Send,
  "Vehicles": Truck,
  "Drivers": IdCard,
  "Vehicle Details": FileSearch,
  "Users": Users
};

export default function Navbar({ activeTab, isRouteView }) {
  const ActiveIcon = iconMap[activeTab] || LayoutDashboard;

  return (
    <header className="flex items-center justify-between px-3 sm:px-6 py-2.5 border-b border-[#1f1f23] bg-[#09090b] sticky top-0 z-30 select-none">
      
      <div className="flex items-center gap-2 text-[15px] text-[#a1a1aa] font-medium tracking-wide min-w-0">
        
      
        <div className="w-10 h-1 shrink-0 lg:hidden" />

       
        <ActiveIcon size={15} className="text-[#71717a] shrink-0 transition-all duration-200" />
        
        
        <div className="flex items-center gap-1.5 min-w-0">
          
      
          {activeTab === "Dashboard" && isRouteView ? (
            <>
              <span className="text-[#71717a] cursor-pointer">Dashboard</span>
              <span className="text-[#4b5563] font-normal shrink-0">/</span>
              <span className="text-white font-semibold truncate max-w-[120px] sm:max-w-none">
                Route Details
              </span>
            </>
          ) : (
           
            <span className="text-white font-semibold truncate">
              {activeTab || "Dashboard"}
            </span>
          )}

        </div>
      </div>

      {/* Right Side: Actions and User Controls */}
      <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
        
        {/* Notification Button */}
        <button className="p-2 rounded-full bg-[#18181b] border border-[#27272a] text-[#a1a1aa] hover:text-white transition-colors relative cursor-pointer shrink-0 flex items-center justify-center">
          <Bell size={18} />
          <span className="absolute top-1 right-1 w-1.5 h-1.5 bg-[#ef4444] rounded-full"></span>
        </button>

        {/* Calendar Button */}
        <button className="p-2 rounded-full bg-[#18181b] border border-[#27272a] text-[#a1a1aa] hover:text-white transition-colors cursor-pointer shrink-0 flex items-center justify-center">
          <Calendar size={18} />
        </button>

        {/* Current Date Details */}
        <div className="hidden sm:block text-right leading-none shrink-0">
          <p className="text-[15px] font-semibold text-white">Friday,</p>
          <p className="text-[10px] text-[#a1a1aa] mt-0.5">July 17, 2026</p>
        </div>

        {/* User Account Info */}
        <div className="flex items-center gap-1.5 sm:gap-2 pl-1.5 sm:pl-3 border-l border-[#27272a] shrink-0">
          {/* User Avatar */}
          <div className="w-6.5 h-6.5 sm:w-7 sm:h-7 rounded-full bg-[#3b82f6] flex items-center justify-center text-white font-bold text-[10px] sm:text-xs shadow-sm shrink-0">
            AT
          </div>
          {/* User Details */}
          <div className="leading-none hidden md:block">
            <p className="text-[15px] font-semibold text-white">Atul</p>
            <p className="text-[10px] text-[#a1a1aa] mt-0.5">Operations Admin</p>
          </div>
        </div>

      </div>

    </header>
  );
}