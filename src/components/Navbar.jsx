import React from 'react';
import { 
  LayoutDashboard, 
  BarChart3, 
  Clock3, 
  TriangleAlert, 
  ScanSearch, 
  Route, 
  GitBranch, 
  Send, 
  Truck, 
  IdCard, 
  Car, 
  Users, 
  Bell, 
  Calendar 
} from 'lucide-react';

// FIX 1: Sidebar tab mapping system register kiya taaki icons dynamic response dein
const iconMap = {
  "Dashboard": LayoutDashboard,
  "Analytics": BarChart3,
  "Reports": Clock3,
  "Mobilize / Immobilize": Clock3,
  "Alerts": TriangleAlert,
  "Area of Interest (AOI)": ScanSearch,
  "Routes": Route,
  "Trips": GitBranch,
  "Activity": Send,
  "Vehicles": Truck,
  "Drivers": IdCard,
  "Vehicle Details": Car,
  "Users": Users
};

export default function Navbar({ activeTab, isRouteView }) {
  // Current tab ke icon ko map se uthaya, agar kuch na mile toh fallback default dashboard icon
  const ActiveIcon = iconMap[activeTab] || LayoutDashboard;

  return (
    <header className="flex items-center justify-between px-3 sm:px-6 py-2.5 border-b border-[#1f1f23] bg-[#09090b] sticky top-0 z-30 select-none">
      
      {/* Left Side: Breadcrumb & Menu Button Spacer */}
      <div className="flex items-center gap-2 text-[11px] text-[#a1a1aa] font-medium tracking-wide min-w-0">
        
        {/* Mobile menu spacer - Toggle button ke liye space reserve rakhega */}
        <div className="w-10 h-1 shrink-0 lg:hidden" />

        {/* FIX 2: Dynamic matching wrapper logic inject kiya dynamically icons toggle karne ke liye */}
        <ActiveIcon size={14} className="text-[#71717a] shrink-0 transition-all duration-200" />
        
        {/* Dynamic Text Logic */}
        <div className="flex items-center gap-1.5 min-w-0">
          
          {/* CASE 1: Agar Dashboard active hai aur Route details view open hai */}
          {activeTab === "Dashboard" && isRouteView ? (
            <>
              <span className="text-[#71717a] cursor-pointer">Dashboard</span>
              <span className="text-[#4b5563] font-normal shrink-0">/</span>
              <span className="text-white font-semibold truncate max-w-[120px] sm:max-w-none">
                Route Details
              </span>
            </>
          ) : (
            /* CASE 2: Jab normal Dashboard ho ya sidebar ka koi aur feature (Analytics, Reports) active ho */
            <span className="text-white font-semibold truncate">
              {activeTab || "Dashboard"}
            </span>
          )}

        </div>
      </div>

      {/* Right Side: Actions and User Controls */}
      <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
        
        {/* Notification Button */}
        <button className="p-1.5 rounded-full bg-[#18181b] border border-[#27272a] text-[#a1a1aa] hover:text-white transition-colors relative cursor-pointer shrink-0">
          <Bell size={13} />
          <span className="absolute top-1 right-1 w-1.5 h-1.5 bg-[#ef4444] rounded-full"></span>
        </button>

        {/* Calendar Button */}
        <button className="p-1.5 rounded-full bg-[#18181b] border border-[#27272a] text-[#a1a1aa] hover:text-white transition-colors cursor-pointer shrink-0">
          <Calendar size={13} />
        </button>

        {/* Current Date Details */}
        <div className="hidden sm:block text-right leading-none shrink-0">
          <p className="text-[10px] font-semibold text-white">Friday,</p>
          <p className="text-[8.5px] text-[#a1a1aa] mt-0.5">July 17, 2026</p>
        </div>

        {/* User Account Info */}
        <div className="flex items-center gap-1.5 sm:gap-2 pl-1.5 sm:pl-3 border-l border-[#27272a] shrink-0">
          {/* User Avatar */}
          <div className="w-6.5 h-6.5 sm:w-7 sm:h-7 rounded-full bg-[#3b82f6] flex items-center justify-center text-white font-bold text-[10px] sm:text-xs shadow-sm shrink-0">
            AT
          </div>
          {/* User Details */}
          <div className="leading-none hidden md:block">
            <p className="text-[10px] font-semibold text-white">Atul</p>
            <p className="text-[8.5px] text-[#a1a1aa] mt-0.5">Operations Admin</p>
          </div>
        </div>

      </div>

    </header>
  );
}