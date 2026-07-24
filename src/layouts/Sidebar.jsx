import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
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
  Headphones,
  Menu,
  X,
} from "lucide-react";
import Logo from "../assets/images/Logo.svg";

export default function Sidebar({ activeTab, setActiveTab }) {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const routeMap = {
    Dashboard: "/",
    Analytics: "/analytics",
    Reports: "/reports",
    "Mobilize / Immobilize": "/mobilize",
    Alerts: "/alerts",
    "Area of Interest (AOI)": "/aoi",
    Routes: "/routes",
    Trips: "/trips",
    Activity: "/activity",
    Vehicles: "/vehicles",
    Drivers: "/drivers",
    "Vehicle Details": "/vehicle-details",
    Users: "/users",
  };

  const sections = [
    {
      title: "HOME",
      items: [
        { icon: LayoutDashboard, label: "Dashboard" },
        { icon: BarChart3, label: "Analytics" },
        { icon: Clock3, label: "Reports" },
      ],
    },
    {
      title: "ACTIONS & EVENTS",
      items: [
        { icon: Power, label: "Mobilize / Immobilize" },
        { icon: TriangleAlert, label: "Alerts" },
      ],
    },
    {
      title: "GEO SERVICES",
      items: [
        { icon: ScanSearch, label: "Area of Interest (AOI)" },
        { icon: Route, label: "Routes" },
        { icon: GitBranch, label: "Trips" },
        { icon: Send, label: "Activity" },
      ],
    },
    {
      title: "MANAGEMENT",
      items: [
        { icon: Truck, label: "Vehicles" },
        { icon: IdCard, label: "Drivers" },
        { icon: FileSearch, label: "Vehicle Details" },
        { icon: Users, label: "Users" },
      ],
    },
  ];

  const handleNavigation = (label) => {
    if (setActiveTab) {
      setActiveTab(label);
    }

    const path = routeMap[label] || "/";
    navigate(path);
    setIsOpen(false);
  };

  return (
    <>
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

      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="lg:hidden fixed inset-0 bg-black/60 backdrop-blur-xs z-40 transition-opacity duration-300"
        />
      )}

      <aside
        className={`fixed lg:static top-0 left-0 z-45 w-56.25 h-screen bg-[#17171C] border-r border-[#2A2A2F] flex flex-col justify-between overflow-hidden select-none py-3 transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}
      >
        <div className="flex flex-col flex-1 min-h-0">
          <div className="h-8 flex items-center justify-between px-4 mb-2 shrink-0">
            <div
              onClick={() => navigate("/")}
              className="cursor-pointer flex items-center"
            >
              <img
                src={Logo}
                alt="SafarTrak"
                className="h-5 w-auto object-contain"
              />
            </div>

            {isOpen && (
              <button
                onClick={() => setIsOpen(false)}
                className="lg:hidden flex items-center justify-center w-7 h-7 text-[#A1A1AA] hover:text-white hover:bg-[#232328] rounded-md cursor-pointer transition"
              >
                <X size={16} />
              </button>
            )}
          </div>

          <div className="px-4 overflow-y-auto flex-1 flex flex-col gap-3">
            {sections.map((section) => (
              <div key={section.title} className="flex flex-col gap-0.5">
                <h4 className="text-[12px] font-bold tracking-wider uppercase text-[#71717A] mb-0.5">
                  {section.title}
                </h4>

                <div className="space-y-4">
                  {section.items.map((item) => {
                    const targetPath = routeMap[item.label];
                    const isItemActive =
                      activeTab === item.label ||
                      (targetPath && location.pathname === targetPath);

                    return (
                      <div
                        key={item.label}
                        className={`flex items-center w-full ${isItemActive ? "gap-3" : ""}`}
                      >
                        {isItemActive && (
                          <span className="w-1 h-10 rounded-full bg-[#F6B100] shrink-0" />
                        )}

                        <button
                          onClick={() => handleNavigation(item.label)}
                          className={`flex items-center transition cursor-pointer min-w-0 ${
                            isItemActive
                              ? "flex-1 h-10 gap-4 rounded-xl px-4 py-2 bg-[#3B2A00] text-white"
                              : "relative w-full h-7 gap-2.5 rounded-md pl-3 text-[#D4D4D8] hover:bg-[#232328]/70"
                          }`}
                        >
                          <item.icon
                            size={15}
                            className={
                              isItemActive ? "text-white shrink-0" : "text-[#D4D4D8] shrink-0"
                            }
                            strokeWidth={isItemActive ? 2.5 : 2}
                          />

                          <span
                            className={`text-[15px] font-medium truncate ${
                              isItemActive
                                ? "leading-[20px] text-white"
                                : "leading-[30px]"
                            }`}
                          >
                            {item.label}
                          </span>
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="px-4 mt-2 shrink-0">
          <div className="rounded-lg border border-[#303036] bg-[#1D1D22] px-3 py-1.5 flex items-center justify-between">
            <div>
              <p className="text-[10.5px] font-semibold text-white">
                Need Help?
              </p>
              <p className="text-[8.5px] text-[#9CA3AF]">Contact support</p>
            </div>
            <Headphones size={14} className="text-[#A1A1AA]" />
          </div>
        </div>
      </aside>
    </>
  );
}
