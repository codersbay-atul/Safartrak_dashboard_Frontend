import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import MobileUnsupported from "../components/common/MobileUnsupported";
import { selectAuthUser } from "../store/slices/authSlice";

export default function MainLayout({ children, activeTab, setActiveTab, isRouteView, onExitRouteView }) {
  const [isUnsupported, setIsUnsupported] = useState(() => {
    if (typeof window === "undefined") return false;
    return window.innerWidth < 640;
  });

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 639px)");

    const update = (event) => {
      setIsUnsupported(event.matches);
    };

    setIsUnsupported(mediaQuery.matches);

    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener("change", update);
      return () => mediaQuery.removeEventListener("change", update);
    }

    mediaQuery.addListener(update);
    return () => mediaQuery.removeListener(update);
  }, []);

  const authUser = useSelector(selectAuthUser);

  if (isUnsupported) {
    return <MobileUnsupported />;
  }

  return (
    <div className="flex h-screen w-screen bg-[#09090b] text-white overflow-hidden select-none">
      <div className="h-full shrink-0 z-50 bg-[#121214]">
        <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      </div>
      {/* Main Container */}
      <div className="flex flex-1 flex-col min-w-0 h-full overflow-hidden">
        {/* Persistent Navbar */}
        <Navbar
          isRouteView={isRouteView}
          onExitRouteView={onExitRouteView}
          activeTab={activeTab}
          user={authUser}
        />
        {/* Dynamic Page Workspace Content */}
        <main className="flex-1 p-3 bg-[#070708] flex flex-col gap-2.5 overflow-hidden min-h-0">
          {children}
        </main>
      </div>
    </div>
  );
}
