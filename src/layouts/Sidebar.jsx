/**
 * Collapsible sidebar: icon rail that expands on hover.
 * Previous full-width sidebar is preserved in ./Sidebar.legacy.jsx
 */

import { useState, useRef, useLayoutEffect, useEffect } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";

import {
  LayoutDashboard,
  BarChart3,
  Clock3,
  TriangleAlert,
  ScanSearch,
  Send,
  Truck,
  ClipboardCheck,
  FileSearch,
  Users,
  Headphones,
  Menu,
  X,
  Key,
  ShoppingCart,
  CreditCard,
  ChevronDown,
} from "lucide-react";

import Logo from "../assets/images/Logo.svg";

import SideColor from "../components/Ui/SidebarUI/SideColor";
import SideIcon from "../components/Ui/SidebarUI/SideIcon";
import SideTextSize from "../components/Ui/SidebarUI/SideTextSize";
import SideNavDrawerItem from "../components/Ui/SidebarUI/SideNavDrawerItem";

let globalSidebarScrollTop = 0;

const COLLAPSED_WIDTH = 64;
const EXPANDED_WIDTH = 240;
const HOVER_EXPAND_DELAY_MS = 80;
const HOVER_COLLAPSE_DELAY_MS = 180;

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isHoverExpanded, setIsHoverExpanded] = useState(false);
  const [isProductsOpen, setIsProductsOpen] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const scrollContainerRef = useRef(null);
  const hoverTimerRef = useRef(null);

  const isExpanded = isOpen || isHoverExpanded;

  const handleScroll = (e) => {
    globalSidebarScrollTop = e.currentTarget.scrollTop;
  };

  useLayoutEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop = globalSidebarScrollTop;
    }
  });

  const clearHoverTimer = () => {
    if (hoverTimerRef.current) {
      clearTimeout(hoverTimerRef.current);
      hoverTimerRef.current = null;
    }
  };

  const isDesktop = () =>
    typeof window !== "undefined" && window.innerWidth >= 1024;

  const handleSidebarMouseEnter = () => {
    if (!isDesktop()) return;
    clearHoverTimer();
    hoverTimerRef.current = setTimeout(() => {
      setIsHoverExpanded(true);
    }, HOVER_EXPAND_DELAY_MS);
  };

  const handleSidebarMouseLeave = () => {
    if (!isDesktop()) return;
    clearHoverTimer();
    hoverTimerRef.current = setTimeout(() => {
      setIsHoverExpanded(false);
    }, HOVER_COLLAPSE_DELAY_MS);
  };

  useEffect(() => {
    const handleResize = () => {
      if (!isDesktop()) {
        clearHoverTimer();
        setIsHoverExpanded(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      clearHoverTimer();
    };
  }, []);

  const routeMap = {
    Dashboard: "/dashboard",
    Analytics: "/analytics",
    Reports: "/reports",
    Alerts: "/alerts",
    "Saved Places": "/saved-places",
    Activity: "/activity",
    Vehicles: "/vehicles",
    "Vehicle Details": "/vehicle-overview",
    Users: "/users",
    Contact: "/contact",
    "Trip Schedules": "/trip-schedules",
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
      items: [{ icon: TriangleAlert, label: "Alerts" }],
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
        { icon: ClipboardCheck, label: "Trip Schedules" },
        { icon: Truck, label: "Vehicles" },
        { icon: FileSearch, label: "Vehicle Details" },
        { icon: Users, label: "Users" },
      ],
    },
    {
      title: "DEVELOPER SETTINGS",
      items: [{ icon: Key, label: "API Credentials" }],
    },
    {
      title: "BILLING",
      items: [
        { icon: ShoppingCart, label: "Your Products", expandable: true },
        { icon: CreditCard, label: "Bills & Payments" },
      ],
    },
  ];

  const handleNavigation = () => {
    setIsOpen(false);
  };

  const handleProductsToggle = () => {
    setIsProductsOpen((prev) => !prev);
  };

  useLayoutEffect(() => {
    if (
      location.pathname.startsWith("/products") ||
      location.pathname.startsWith("/your-products")
    ) {
      setIsProductsOpen(true);
    }
  }, [location.pathname]);

  const navItemClass = (isActive) =>
    `
      flex
      items-center
      h-8
      rounded-lg
      transition-colors
      ${isExpanded ? "gap-2.5 w-full px-2" : "justify-center w-full px-0"}
      ${isActive ? "bg-[#232328] text-white" : "text-[#D4D4D4] hover:bg-[#232328]"}
    `;

  const labelClass = `
    flex-1
    min-w-0
    truncate
    whitespace-nowrap
    transition-opacity
    duration-200
    ${isExpanded ? "opacity-100" : "hidden"}
  `;

  return (
    <>
      {!isOpen && (
        <div className="lg:hidden fixed top-2.5 left-2.5 z-50">
          <button
            type="button"
            onClick={() => setIsOpen(true)}
            className="
              flex
              items-center
              justify-center
              w-8
              h-8
              bg-[#17171C]
              text-white
              border
              border-[#2A2A2F]
              rounded-lg
              shadow-lg
              hover:bg-[#232328]
              cursor-pointer
            "
          >
            <Menu size={14} />
          </button>
        </div>
      )}

      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="
            lg:hidden
            fixed
            inset-0
            bg-black/60
            backdrop-blur-xs
            z-40
          "
        />
      )}

      {/* Keeps main content from shifting while the rail expands on hover */}
      <div
        className="hidden lg:block shrink-0 h-full"
        style={{ width: COLLAPSED_WIDTH }}
        aria-hidden="true"
      />

      <SideColor
        as="aside"
        bg="background"
        aria-expanded={isExpanded}
        onMouseEnter={handleSidebarMouseEnter}
        onMouseLeave={handleSidebarMouseLeave}
        className={`
          fixed
          lg:absolute
          top-0
          left-0
          z-45
          h-screen
          lg:h-full
          border-r
          border-[#2A2A2F]
          flex
          flex-col
          justify-between
          overflow-hidden
          select-none
          py-3
          transition-[width,transform,box-shadow]
          duration-200
          ease-out

          ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
          ${isHoverExpanded ? "lg:shadow-[8px_0_28px_rgba(0,0,0,0.45)]" : ""}
        `}
        style={{
          width: isExpanded ? EXPANDED_WIDTH : COLLAPSED_WIDTH,
        }}
      >
        <div className="flex flex-col flex-1 min-h-0">
          <div
            className={`
              h-8
              flex
              items-center
              mb-8
              shrink-0
              ${isExpanded ? "px-4 justify-between" : "px-0 justify-center"}
            `}
          >
            <div
              onClick={() => navigate("/")}
              className="cursor-pointer flex items-center overflow-hidden"
            >
              {isExpanded ? (
                <img
                  src={Logo}
                  alt="SafarTrak"
                  className="h-5 w-auto object-contain object-left max-w-none"
                />
              ) : (
                <SideIcon size={32} alt="SafarTrak" />
              )}
            </div>

            {isOpen && (
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="
                  lg:hidden
                  flex
                  items-center
                  justify-center
                  w-7
                  h-7
                  text-[#A1A1AA]
                  hover:text-white
                  hover:bg-[#232328]
                  rounded-md
                  cursor-pointer
                "
              >
                <X size={15} />
              </button>
            )}
          </div>

          <div
            ref={scrollContainerRef}
            onScroll={handleScroll}
            style={{ scrollBehavior: "auto" }}
            className={`
              overflow-y-auto
              flex-1
              flex
              flex-col
              gap-4
              custom-scrollbar
              ${isExpanded ? "px-3" : "px-2"}
            `}
          >
            {sections.map((section, sectionIndex) => (
              <div key={section.title} className="flex flex-col gap-0.5">
                {isExpanded ? (
                  <SideColor
                    as="h4"
                    color="title"
                    className="
                      text-[10px]
                      font-semibold
                      leading-[10px]
                      tracking-wider
                      uppercase
                      mb-1
                      px-1
                      whitespace-nowrap
                    "
                  >
                    {section.title}
                  </SideColor>
                ) : sectionIndex > 0 ? (
                  <div className="h-px bg-[#2A2A2F] mx-1 mb-1" />
                ) : null}

                <div className="flex flex-col gap-3">
                  {section.items.map((item) => {
                    if (item.expandable) {
                      const isProductRoute =
                        location.pathname.startsWith("/products") ||
                        location.pathname.startsWith("/your-products");

                      if (!isExpanded) {
                        return (
                          <NavLink
                            key={item.label}
                            to={routeMap[item.label] || "/products"}
                            preventScrollReset
                            onClick={handleNavigation}
                            className={navItemClass(isProductRoute)}
                          >
                            <SideIcon
                              icon={item.icon}
                              strokeWidth={isProductRoute ? 2.5 : 2}
                            />
                          </NavLink>
                        );
                      }

                      return (
                        <div key={item.label}>
                          <div
                            className={`
                              flex
                              items-center
                              gap-2.5
                              w-full
                              h-8
                              px-2
                              rounded-lg
                              transition-colors
                              cursor-pointer

                              ${
                                isProductRoute || isProductsOpen
                                  ? "bg-[#232328] text-white"
                                  : "text-[#D4D4D4] hover:bg-[#232328]"
                              }
                            `}
                          >
                            <NavLink
                              to={location.pathname}
                              preventScrollReset
                              onClick={handleProductsToggle}
                              className="flex min-w-0 flex-1 items-center gap-2.5"
                            >
                              <SideIcon
                                icon={item.icon}
                                strokeWidth={isProductRoute ? 2.5 : 2}
                              />

                              <SideColor
                                as={SideTextSize}
                                color="text"
                                className="flex-1 min-w-0 truncate text-left"
                              >
                                {item.label}
                              </SideColor>
                            </NavLink>

                            <button
                              type="button"
                              aria-label="Toggle products submenu"
                              onClick={(event) => {
                                event.stopPropagation();
                                handleProductsToggle();
                              }}
                              className="flex h-6 w-6 shrink-0 items-center justify-center cursor-pointer"
                            >
                              <ChevronDown
                                size={14}
                                strokeWidth={2}
                                className={`
                                  text-[#FDB914]
                                  transition-transform
                                  duration-200
                                  ${isProductsOpen ? "rotate-180" : "rotate-0"}
                                `}
                              />
                            </button>
                          </div>

                          {isProductsOpen && (
                            <SideNavDrawerItem onNavigate={handleNavigation} />
                          )}
                        </div>
                      );
                    }

                    const targetPath = routeMap[item.label] || "/";

                    return (
                      <NavLink
                        key={item.label}
                        to={targetPath}
                        preventScrollReset
                        onClick={handleNavigation}
                        className={({ isActive }) => navItemClass(isActive)}
                      >
                        <SideIcon
                          icon={item.icon}
                          strokeWidth={
                            location.pathname === targetPath ? 2.5 : 2
                          }
                        />

                        <SideColor
                          as={SideTextSize}
                          color="text"
                          className={labelClass}
                        >
                          {item.label}
                        </SideColor>
                      </NavLink>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className={`mt-2 shrink-0 ${isExpanded ? "px-4" : "px-2"}`}>
          <button
            type="button"
            onClick={() => navigate("/contact")}
            className={`
              w-full
              rounded-lg
              border
              border-[#303036]
              bg-[#121214]
              flex
              items-center
              hover:border-[#4d5563]
              hover:bg-[#1f2025]
              transition-colors
              ${isExpanded ? "px-3 py-1.5 justify-between text-left" : "h-8 justify-center"}
            `}
          >
            {isExpanded ? (
              <>
                <div>
                  <p className="text-[14px] font-semibold text-white">
                    Need Help?
                  </p>
                  <p className="text-[13px] text-[#9CA3AF]">
                    Contact support
                  </p>
                </div>
                <SideColor color="icon">
                  <Headphones size={16} />
                </SideColor>
              </>
            ) : (
              <SideColor color="icon">
                <Headphones size={16} />
              </SideColor>
            )}
          </button>
        </div>
      </SideColor>
    </>
  );
}
