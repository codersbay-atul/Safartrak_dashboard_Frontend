import { useState, useRef, useLayoutEffect } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  BarChart3,
  Clock3,
  Power,
  TriangleAlert,
  ScanSearch,
  Send,
  Truck,
  FileSearch,
  Users,
  Headphones,
  Menu,
  X,
  Key,
  ShoppingCart,
  CreditCard,
} from "lucide-react";
import Logo from "../assets/images/Logo.svg";
import SideColor from "../components/Ui/SidebarUI/SideColor";
import SideIcon from "../components/Ui/SidebarUI/SideIcon";
import SideTextSize from "../components/Ui/SidebarUI/SideTextSize";

let globalSidebarScrollTop = 0;

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const scrollContainerRef = useRef(null);

  const handleScroll = (e) => {
    globalSidebarScrollTop = e.currentTarget.scrollTop;
  };

  useLayoutEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop = globalSidebarScrollTop;
    }
  });

  const routeMap = {
    Dashboard: "/dashboard",
    Analytics: "/analytics",
    Reports: "/reports",
    "Mobilize / Immobilize": "/mobilize",
    Alerts: "/alerts",
    "Saved Places": "/saved-places",
    Activity: "/activity",
    Vehicles: "/vehicles",
    "Vehicle Details": "/vehicle-overview",
    Users: "/users",
    Contact: "/contact",
    "API Credentials": "/api-credentials",
    "Your Products": "/products",
    "Bills & Payments": "/billing",
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
        { icon: Send, label: "Activity" },
      ],
    },
    {
      title: "MANAGEMENT",
      items: [
        { icon: Truck, label: "Vehicles" },
        { icon: FileSearch, label: "Vehicle Details" },
        { icon: Users, label: "Users" },
      ],
    },
    {
      title: "DEVELOPER SETTINGS",
      items: [
        { 
          icon: Key, 
          label: "API Credentials",
          badge: "New" 
        },
      ],
    },
    {
      title: "BILLING",
      items: [
        { icon: ShoppingCart, label: "Your Products", badge: "New" },
        { icon: CreditCard, label: "Bills & Payments", badge: "New" },
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

      <SideColor
        as="aside"
        bg="background"
        className={`fixed lg:static top-0 left-0 z-45 w-56 xl:w-60 h-screen border-r border-[#2A2A2F] flex flex-col justify-between overflow-hidden select-none py-3 transition-transform duration-300 ease-in-out
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

          <div
            ref={scrollContainerRef}
            onScroll={handleScroll}
            style={{ scrollBehavior: "auto" }}
            className="px-3 overflow-y-auto flex-1 flex flex-col gap-4 custom-scrollbar"
          >
            {sections.map((section) => (
              <div key={section.title} className="flex flex-col gap-0.5">
                <SideColor
                  as="h4"
                  color="title"
                  className="text-[10px] font-semibold leading-[10px] tracking-wider uppercase mb-1 px-1"
                >
                  {section.title}
                </SideColor>

                <div className="flex flex-col gap-2">
                  {section.items.map((item) => {
                    const targetPath = routeMap[item.label] || "/";

                    return (
                      <NavLink
                        key={item.label}
                        to={targetPath}
                        preventScrollReset={true}
                        onClick={handleNavigation}
                        className={({ isActive }) =>
                          `flex items-center gap-2.5 w-full h-8 px-2 rounded-lg transition ${
                            isActive
                              ? "bg-[#232328] text-white"
                              : "hover:bg-[#232328]"
                          }`
                        }
                      >
                        <SideIcon
                          icon={item.icon}
                          strokeWidth={location.pathname === targetPath ? 2.5 : 2}
                        />

                        <SideColor
                          as={SideTextSize}
                          color="text"
                          className="flex-1 min-w-0 truncate"
                        >
                          {item.label}
                        </SideColor>

                        {item.badge && (
                          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-semibold bg-[#2a1f00] text-[#F5B700] shrink-0 leading-none whitespace-nowrap">
                            {item.badge}
                          </span>
                        )}
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
            className="w-full rounded-lg border border-[#303036] bg-[#121214] px-3 py-1.5 flex items-center justify-between text-left hover:border-[#4d5563] hover:bg-[#1f2025] transition-colors"
          >
            <div>
              <p className="text-[14px] font-semibold text-white">
                Need Help?
              </p>
              <p className="text-[13px] text-[#9CA3AF]">Contact support</p>
            </div>
            <SideColor color="icon">
              <Headphones size={16} />
            </SideColor>
          </button>
        </div>
      </SideColor>
    </>
  );
}