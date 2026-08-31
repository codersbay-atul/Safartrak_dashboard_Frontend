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

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  // Your Products expand/collapse
  const [isProductsOpen, setIsProductsOpen] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const scrollContainerRef = useRef(null);

  /* =========================================
     SIDEBAR SCROLL
  ========================================= */

  const handleScroll = (e) => {
    globalSidebarScrollTop = e.currentTarget.scrollTop;
  };

  useLayoutEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop = globalSidebarScrollTop;
    }
  });

  /* =========================================
     ROUTES
  ========================================= */

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
    "Assign Vehicle": "/assign-vehicle",

    "API Credentials": "/api-credentials",

    "Your Products": "/products",

    "Bills & Payments": "/billing",
  };

  /* =========================================
     SIDEBAR SECTIONS
  ========================================= */

  const sections = [
    {
      title: "HOME",
      items: [
        {
          icon: LayoutDashboard,
          label: "Dashboard",
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
          icon: Power,
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
          label: "Saved Places",
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
          icon: ClipboardCheck,
          label: "Assign Vehicle",
        },
        {
          icon: Truck,
          label: "Vehicles",
        },
        {
          icon: FileSearch,
          label: "Vehicle Details",
        },
        {
          icon: Users,
          label: "Users",
        },
      ],
    },

    {
      title: "DEVELOPER SETTINGS",
      items: [
        {
          icon: Key,
          label: "API Credentials",
          // badge: "New",
        },
      ],
    },

    {
      title: "BILLING",
      items: [
        {
          icon: ShoppingCart,
          label: "Your Products",
          // badge: "New",
          expandable: true,
        },
        {
          icon: CreditCard,
          label: "Bills & Payments",
          // badge: "New",
        },
      ],
    },
  ];

  /* =========================================
     NORMAL NAVIGATION
  ========================================= */

  const handleNavigation = () => {
    setIsOpen(false);
  };

  /* =========================================
     YOUR PRODUCTS TOGGLE
  ========================================= */

  const handleProductsToggle = () => {
    setIsProductsOpen((prev) => !prev);
  };

  /* =========================================
     AUTO OPEN IF INSIDE PRODUCT ROUTE
  ========================================= */

  useLayoutEffect(() => {
    if (
      location.pathname.startsWith("/products") ||
      location.pathname.startsWith("/your-products")
    ) {
      setIsProductsOpen(true);
    }
  }, [location.pathname]);

  return (
    <>
      {/* =================================================
          MOBILE MENU BUTTON
      ================================================= */}

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

      {/* =================================================
          MOBILE OVERLAY
      ================================================= */}

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

      {/* =================================================
          SIDEBAR
      ================================================= */}

      <SideColor
        as="aside"
        bg="background"
        className={`
          fixed
          lg:static
          top-0
          left-0
          z-45
          w-56
          xl:w-60
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
          transition-transform
          duration-300
          ease-in-out

          ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        `}
      >
        <div className="flex flex-col flex-1 min-h-0">
          {/* =================================================
              LOGO
          ================================================= */}

          <div
            className="
              h-8
              flex
              items-center
              justify-between
              px-4
              mb-8
              shrink-0
            "
          >
            <div
              onClick={() => navigate("/")}
              className="
                cursor-pointer
                flex
                items-center
              "
            >
              <img
                src={Logo}
                alt="SafarTrak"
                className="h-5 w-auto object-contain"
              />
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

          {/* =================================================
              SCROLL AREA
          ================================================= */}

          <div
            ref={scrollContainerRef}
            onScroll={handleScroll}
            style={{ scrollBehavior: "auto" }}
            className="
              px-3
              overflow-y-auto
              flex-1
              flex
              flex-col
              gap-4
              custom-scrollbar
            "
          >
            {sections.map((section) => (
              <div key={section.title} className="flex flex-col gap-0.5">
                {/* =========================================
                    SECTION TITLE
                ========================================= */}

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
                  "
                >
                  {section.title}
                </SideColor>

                <div className="flex flex-col gap-2">
                  {section.items.map((item) => {
                    /* =====================================
                       YOUR PRODUCTS
                    ===================================== */

                    if (item.expandable) {
                      const isProductRoute =
                        location.pathname.startsWith("/products") ||
                        location.pathname.startsWith("/your-products");

                      return (
                        <div key={item.label}>
                          {/* =================================
                              YOUR PRODUCTS PARENT
                          ================================= */}

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
                              {/* Product icon */}

                              <SideIcon
                                icon={item.icon}
                                strokeWidth={isProductRoute ? 2.5 : 2}
                              />

                              {/* Product text */}

                              <SideColor
                                as={SideTextSize}
                                color="text"
                                className="
                                flex-1
                                min-w-0
                                truncate
                                text-left
                              "
                              >
                                {item.label}
                              </SideColor>

                              {/* New */}

                              {item.badge && (
                                <span
                                  className="
                                  inline-flex
                                  items-center
                                  px-2
                                  py-0.5
                                  rounded-full
                                  text-[11px]
                                  font-semibold
                                  bg-[#2A1F00]
                                  text-[#F5B700]
                                  shrink-0
                                  leading-none
                                  whitespace-nowrap
                                "
                                >
                                  {item.badge}
                                </span>
                              )}
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

                    /* =====================================
                       NORMAL SIDEBAR ITEM
                    ===================================== */

                    const targetPath = routeMap[item.label] || "/";

                    return (
                      <NavLink
                        key={item.label}
                        to={targetPath}
                        preventScrollReset
                        onClick={handleNavigation}
                        className={({ isActive }) =>
                          `
                            flex
                            items-center
                            gap-2.5
                            w-full
                            h-8
                            px-2
                            rounded-lg
                            transition-colors

                            ${
                              isActive
                                ? "bg-[#232328] text-white"
                                : "hover:bg-[#232328]"
                            }
                          `
                        }
                      >
                        {/* Icon */}

                        <SideIcon
                          icon={item.icon}
                          strokeWidth={
                            location.pathname === targetPath ? 2.5 : 2
                          }
                        />

                        {/* Text */}

                        <SideColor
                          as={SideTextSize}
                          color="text"
                          className="
                            flex-1
                            min-w-0
                            truncate
                          "
                        >
                          {item.label}
                        </SideColor>

                        {/* Badge */}

                        {item.badge && (
                          <span
                            className="
                              inline-flex
                              items-center
                              px-2
                              py-0.5
                              rounded-full
                              text-[11px]
                              font-semibold
                              bg-[#2A1F00]
                              text-[#F5B700]
                              shrink-0
                              leading-none
                              whitespace-nowrap
                            "
                          >
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

        {/* =================================================
            NEED HELP
        ================================================= */}

        <div className="px-4 mt-2 shrink-0">
          <button
            type="button"
            onClick={() => navigate("/contact")}
            className="
              w-full
              rounded-lg
              border
              border-[#303036]
              bg-[#121214]
              px-3
              py-1.5
              flex
              items-center
              justify-between
              text-left
              hover:border-[#4d5563]
              hover:bg-[#1f2025]
              transition-colors
            "
          >
            <div>
              <p className="text-[14px] font-semibold text-white">Need Help?</p>

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
