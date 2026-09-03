import React from "react";
import { useSelector } from "react-redux";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import { selectAuthUser } from "../store/slices/authSlice";
import VersionUpdateBanner from "../components/Ui/VersionUpdateBanner";

export default function MainLayout({
  children,
  activeTab,
  InactiveTab,
  setActiveTab,
  isRouteView,
  onExitRouteView,
  allowPageScroll = false,
  headerTitle,
  headerSubtitle,
  onHeaderSearch,
  headerSearchPlaceholder,
}) {
  const authUser = useSelector(selectAuthUser);

  return (
    <div className="flex flex-col h-screen w-screen bg-[#09090b] text-white overflow-hidden select-none">
      <VersionUpdateBanner />

      <div className="relative flex flex-1 min-h-0 min-w-0 overflow-hidden">
        <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

        <div className="flex flex-1 flex-col min-w-0 min-h-0 overflow-hidden">
          <Navbar
            isRouteView={isRouteView}
            onExitRouteView={onExitRouteView}
            InactiveTab={InactiveTab || activeTab}
            user={authUser}
            headerTitle={headerTitle}
            headerSubtitle={headerSubtitle}
            onHeaderSearch={onHeaderSearch}
            headerSearchPlaceholder={headerSearchPlaceholder}
          />
          <main
            className={`flex-1 p-3.5 min-[1152px]:p-4 xl:p-4 bg-[#000000] flex flex-col gap-4 min-[1152px]:gap-4 min-h-0 ${
              allowPageScroll
                ? "overflow-y-auto overflow-x-hidden no-scrollbar"
                : "overflow-hidden"
            }`}
          >
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}
