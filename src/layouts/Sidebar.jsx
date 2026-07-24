import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Map,
  Truck,
  Car,
  Wrench,
  ClipboardList,
  BarChart3,
  ChartNoAxesColumn,
  AlertTriangle,
  Settings,
  ShieldAlert,
  Users,
  Headphones,
  Menu,
  X,
  // Clock3,
  // TriangleAlert,
  // ScanSearch,
  // Route,
  // GitBranch,
  // Send,
  // IdCard,
} from "lucide-react";

export default function Sidebar({ activeTab, setActiveTab }) {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Route path mapping table
  const routeMap = {
    "Dashboard": "/",
    "Live Tracking": "/live-tracking",
    "Vehicles": "/vehicles",
    "AI Intelligence": "/ai-intelligence",
    "Maintenance": "/maintenance",
    "Diagnostics": "/diagnostics",
    "Analytics": "/analytics",
    "Report": "/reports",
    "Alert": "/alerts",
    "Settings": "/settings",
    "Integrations": "/integrations",
    "Team": "/team",
    // Previous routes — preserved for future use
    // "Dashboard": "/",
    // "Analytics": "/analytics",
    // "Reports": "/reports",
    // "Mobilize / Immobilize": "/mobilize",
    // "Alerts": "/alerts",
    // "Area of Interest (AOI)": "/aoi",
    // "Routes": "/routes",
    // "Trips": "/trips",
    // "Activity": "/activity",
    // "Vehicles": "/vehicles",
    // "Drivers": "/drivers",
    // "Vehicle Details": "/vehicle-details",
    // "Users": "/users",
  };

  const dashboardItem = { icon: LayoutDashboard, label: "Dashboard" };

  const sections = [
    {
      title: "MONITOR",
      items: [
        { icon: Map, label: "Live Tracking" },
        { icon: Truck, label: "Vehicles" },
        { icon: Car, label: "AI Intelligence" },
        { icon: Wrench, label: "Maintenance" },
        { icon: ClipboardList, label: "Diagnostics" },
        { icon: BarChart3, label: "Analytics" },
      ],
    },
    {
      title: "MANAGEMENT",
      items: [
        { icon: ChartNoAxesColumn, label: "Report" },
        { icon: AlertTriangle, label: "Alert" },
      ],
    },
    {
      title: "ADMINISTRATION",
      items: [
        { icon: Settings, label: "Settings" },
        { icon: ShieldAlert, label: "Integrations" },
        { icon: Users, label: "Team" },
      ],
    },
  ];

  // Previous sidebar sections — preserved for future use
  // const sections = [
  //   {
  //     title: "HOME",
  //     items: [
  //       { icon: LayoutDashboard, label: "Dashboard" },
  //       { icon: BarChart3, label: "Analytics" },
  //       { icon: Clock3, label: "Reports" },
  //     ],
  //   },
  //   {
  //     title: "ACTIONS & EVENTS",
  //     items: [
  //       { icon: Clock3, label: "Mobilize / Immobilize" },
  //       { icon: TriangleAlert, label: "Alerts" },
  //     ],
  //   },
  //   {
  //     title: "GEO SERVICES",
  //     items: [
  //       { icon: ScanSearch, label: "Area of Interest (AOI)" },
  //       { icon: Route, label: "Routes" },
  //       { icon: GitBranch, label: "Trips" },
  //       { icon: Send, label: "Activity" },
  //     ],
  //   },
  //   {
  //     title: "MANAGEMENT",
  //     items: [
  //       { icon: Truck, label: "Vehicles" },
  //       { icon: IdCard, label: "Drivers" },
  //       { icon: Car, label: "Vehicle Details" },
  //       { icon: Users, label: "Users" },
  //     ],
  //   },
  // ];

  const handleNavigation = (label) => {
    // 1. Agar state handler pass hua ho toh use update karo
    if (setActiveTab) {
      setActiveTab(label);
    }

    // 2. Real React Router Navigation
    const path = routeMap[label] || "/";
    navigate(path);

    // 3. Mobile drawer close karo
    setIsOpen(false);
  };

  return (
    <>
      {/* 1. Mobile Menu Open Toggle Button */}
      {!isOpen && (
        <div className="lg:hidden fixed top-2.5 left-2.5 z-50">
          <button
            onClick={() => setIsOpen(true)}
            className="flex items-center justify-center w-8 h-8 bg-[#17171C] text-white border border-[#2A2A2F] rounded-lg shadow-lg hover:bg-[#232328] cursor-pointer"
          >
            <Menu size={16} />
          </button>
        </div>
      )}

      {/* 2. Backdrop Overlay */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="lg:hidden fixed inset-0 bg-black/60 backdrop-blur-xs z-40 transition-opacity duration-300"
        />
      )}

      {/* 3. Main Sidebar Container */}
      <aside
        className={`fixed lg:static top-0 left-0 z-45 w-56.25 h-screen bg-[#17171C] border-r border-[#2A2A2F] flex flex-col justify-between overflow-hidden select-none py-3 transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}
      >
        {/* Top Header & Navigation Container */}
        <div className="flex flex-col flex-1 min-h-0">
          {/* Brand Logo */}
          <div className="h-8 flex items-center justify-between px-4 mb-2 shrink-0">
            <h1 className="text-[20px] font-semibold tracking-tight text-white cursor-pointer" onClick={() => navigate("/")}>
              Safar<span className="text-[#F6B100]">Trak</span>
            </h1>

            {/* Mobile Close Button (X) */}
            {isOpen && (
              <button
                onClick={() => setIsOpen(false)}
                className="lg:hidden flex items-center justify-center w-7 h-7 text-[#A1A1AA] hover:text-white hover:bg-[#232328] rounded-md cursor-pointer transition"
              >
                <X size={16} />
              </button>
            )}
          </div>

          {/* Navigation Section Wrapper */}
          <div className="px-4 overflow-hidden flex-1 flex flex-col justify-between">
            <div className="flex flex-col gap-0.5 mb-1">
              {[dashboardItem].map((item) => {
                const targetPath = routeMap[item.label];
                const isItemActive =
                  activeTab === item.label ||
                  (targetPath && location.pathname === targetPath);

                return (
                  <button
                    key={item.label}
                    onClick={() => handleNavigation(item.label)}
                    className={`relative w-full h-7 flex items-center gap-2.5 rounded-md pl-3 transition cursor-pointer
                      ${
                        isItemActive
                          ? "bg-[#18181B] text-white font-semibold border border-zinc-800/60"
                          : "text-[#D4D4D8] hover:bg-[#232328]/70"
                      }`}
                  >
                    {isItemActive && (
                      <span className="absolute left-0 top-1 h-5 w-0.75 rounded-r bg-[#F6B100]" />
                    )}

                    <item.icon
                      size={13}
                      className={
                        isItemActive ? "text-[#F6B100]" : "text-[#D4D4D8]"
                      }
                      strokeWidth={isItemActive ? 2.5 : 2}
                    />

                    <span className="text-[11.5px] font-medium truncate">
                      {item.label}
                    </span>
                  </button>
                );
              })}
            </div>

            {sections.map((section) => (
              <div key={section.title} className="flex flex-col gap-0.5">
                {/* Category Title */}
                <h4 className="text-[10.5px] font-bold tracking-wider uppercase text-[#71717A] mb-0.5">
                  {section.title}
                </h4>

                {/* Navigation buttons */}
                <div className="space-y-0.5">
                  {section.items.map((item) => {
                    // Check active state via URL path or prop
                    const targetPath = routeMap[item.label];
                    const isItemActive =
                      activeTab === item.label ||
                      (targetPath && location.pathname === targetPath);

                    return (
                      <button
                        key={item.label}
                        onClick={() => handleNavigation(item.label)}
                        className={`relative w-full h-7 flex items-center gap-2.5 rounded-md pl-3 transition cursor-pointer
                          ${
                            isItemActive
                              ? "bg-[#18181B] text-white font-semibold border border-zinc-800/60"
                              : "text-[#D4D4D8] hover:bg-[#232328]/70"
                          }`}
                      >
                        {/* Yellow Side Indicator for Active Item */}
                        {isItemActive && (
                          <span className="absolute left-0 top-1 h-5 w-0.75 rounded-r bg-[#F6B100]" />
                        )}

                        <item.icon
                          size={13}
                          className={
                            isItemActive ? "text-[#F6B100]" : "text-[#D4D4D8]"
                          }
                          strokeWidth={isItemActive ? 2.5 : 2}
                        />

                        <span className="text-[11.5px] font-medium truncate">
                          {item.label}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Section: Help Card */}
        <div className="px-4 mt-2 shrink-0">
          <div className="rounded-lg border border-[#303036] bg-[#1D1D22] px-3 py-1.5 flex items-center justify-between">
            <div>
              <p className="text-[10.5px] font-semibold text-white">
                Need Help?
              </p>
              <p className="text-[8.5px] text-[#9CA3AF]">
                Contact support
              </p>
            </div>
            <Headphones size={14} className="text-[#A1A1AA]" />
          </div>
        </div>
      </aside>
    </>
  );
}