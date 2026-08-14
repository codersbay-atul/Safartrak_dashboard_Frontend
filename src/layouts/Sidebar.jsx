import React, { useState } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
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
  Key,
} from "lucide-react";
import Logo from "../assets/images/Logo.svg";

export default function Sidebar({ activeTab, setActiveTab }) {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const routeMap = {
    Dashboard: "/dashboard",
    Analytics: "/analytics",
    Reports: "/reports",
    "Mobilize / Immobilize": "/mobilize",
    Alerts: "/alerts",
    "Saved Places": "/saved-places",
    // Routes: "/routes",
    // Trips: "/trips",
    Activity: "/activity",
    Vehicles: "/vehicles",
    // Drivers: "/drivers",
    "Vehicle Details": "/vehicle-overview",
    Users: "/users",
    Contact: "/contact",
    "API Credentials": "/api-credentials",
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
        { icon: ScanSearch, label: "Saved Places" },
        // { icon: Route, label: "Routes" },
        // { icon: GitBranch, label: "Trips" },
        { icon: Send, label: "Activity" },
      ],
    },
    {
      title: "MANAGEMENT",
      items: [
        { icon: Truck, label: "Vehicles" },
        // { icon: IdCard, label: "Drivers" },
        { icon: FileSearch, label: "Vehicle Details" },
        { icon: Users, label: "Users" },
      ],
    },
    {
      title: "DEVELOPER",
      items: [
        { icon: Key, label: "API Credentials" },
      ],
    },
  ];

  const handleNavigation = () => {
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
            <Menu size={14} />
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
        className={`fixed lg:static top-0 left-0 z-45 w-52 xl:w-56.25 h-screen bg-[#121212] border-r border-[#2A2A2F] flex flex-col justify-between overflow-hidden select-none py-3 transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}
      >
        <div className="flex flex-col flex-1 min-h-0">
          <div className="h-8 flex items-center justify-between px-4 mb-8 shrink-0">
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
                <X size={15} />
              </button>
            )}
          </div>

          <div className="px-3 overflow-y-auto flex-1 flex flex-col gap-4 custom-scrollbar">
            {sections.map((section) => (
              <div key={section.title} className="flex flex-col gap-0.5">
                <h4 className="text-[10px] font-semibold leading-[10px] tracking-wider uppercase text-[#71717A] mb-1 px-1">
                  {section.title}
                </h4>

                <div className="flex flex-col gap-2">
                  {section.items.map((item) => {
                    const targetPath = routeMap[item.label] || "/";

                    return (
                      <NavLink
                        key={item.label}
                        to={targetPath}
                        onClick={handleNavigation}
                        className={({ isActive }) =>
                          `flex items-center w-full h-8 gap-3 rounded-lg px-2.5 transition min-w-0 ${
                            isActive
                              ? "bg-[#232328] text-white"
                              : "text-[#D4D4D8] hover:bg-[#232328]/70"
                          }`
                        }
                      >
                        <item.icon
                          size={18}
                          className="text-[#F5B700] shrink-0"
                          strokeWidth={location.pathname === targetPath ? 2.5 : 2}
                        />

                        <span className="text-[14px] font-normal leading-[20px] truncate">
                          {item.label}
                        </span>
                      </NavLink>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="px-4 mt-2 shrink-0">
          <button
            type="button"
            onClick={() => navigate("/contact")}
            className="w-full rounded-lg border border-[#303036] bg-[#1D1D22] px-3 py-1.5 flex items-center justify-between text-left hover:border-[#4d5563] hover:bg-[#22252c] transition-colors"
          >
            <div>
              <p className="text-[10.5px] font-semibold text-white">
                Need Help?
              </p>
              <p className="text-[8.5px] text-[#9CA3AF]">Contact support</p>
            </div>
            <Headphones size={14} className="text-[#A1A1AA]" />
          </button>
        </div>
      </aside>
    </>
  );
}
