import React from "react";
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
  Headphones,
} from "lucide-react";

export default function Sidebar() {
  const sections = [
    {
      title: "HOME",
      items: [
        {
          icon: LayoutDashboard,
          label: "Dashboard",
          active: true,
        },
        {
          icon: BarChart3,
          label: "Analytics",
        },
        {
          icon: Clock3,
          label: "Reports",
        },
      ],
    },
    {
      title: "ACTIONS & EVENTS",
      items: [
        {
          icon: Clock3,
          label: "Mobilize / Immobilize",
        },
        {
          icon: TriangleAlert,
          label: "Alerts",
        },
      ],
    },
    {
      title: "GEO SERVICES",
      items: [
        {
          icon: ScanSearch,
          label: "Area of Interest (AOI)",
        },
        {
          icon: Route,
          label: "Routes",
        },
        {
          icon: GitBranch,
          label: "Trips",
        },
        {
          icon: Send,
          label: "Activity",
        },
      ],
    },
    {
      title: "MANAGEMENT",
      items: [
        {
          icon: Truck,
          label: "Vehicles",
        },
        {
          icon: IdCard,
          label: "Drivers",
        },
        {
          icon: Car,
          label: "Vehicle Details",
        },
        {
          icon: Users,
          label: "Users",
        },
      ],
    },
  ];

  return (
    <aside className="w-61.25 h-screen bg-[#17171C] border-r border-[#2A2A2F] flex flex-col justify-between overflow-hidden">
      
      <div>
        <div className="h-8 flex items-center px-4 ">
          <h1 className="text-[20px] font-semibold tracking-tight text-white">
            Safar<span className="text-[#F6B100]">Trak</span>
          </h1>
        </div>

        <div className="px-4">
          {sections.map((section) => (
            <div key={section.title} className="mb-1">
              
              <h4 className="text-[12px] font-semibold uppercase text-[#A1A1AA]">
                {section.title}
              </h4>

              <div className="space-y-0">
                {section.items.map((item) => (
                  <button
                    key={item.label}
                    className={`relative w-full h-7 flex items-center gap-2.5 rounded-md pl-3.5 transition
                    ${
                      item.active
                        ? "bg-[#4A3205] text-white"
                        : "text-[#D4D4D8] hover:bg-[#232328]"
                    }`}
                  >
                    {item.active && (
                      <span className="absolute left-0 top-0 h-full w-0.75 rounded-r bg-[#F6B100]" />
                    )}

                    <item.icon size={14} strokeWidth={2} />

                    <span className="text-[11px] font-medium">
                      {item.label}
                    </span>
                  </button>
                ))}
              </div>

            </div>
          ))}
        </div>
      </div>

      {/* Help Card - Made more compact */}
      <div className="p-4 pt-1 shrink-0">
        <div className="rounded-lg border border-[#303036] bg-[#1D1D22] px-3 py-2 flex items-center justify-between">
          <div>
            <p className="text-[11px] font-semibold text-white">
              Need Help?
            </p>
            <p className="text-[9px] text-[#9CA3AF]">
              Contact support
            </p>
          </div>
          <Headphones
            size={16}
            className="text-[#A1A1AA]"
          />
        </div>
      </div>

    </aside>
  );
}