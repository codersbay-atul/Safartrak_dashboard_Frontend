import React from "react";
import { useSelector } from "react-redux";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import { selectAuthUser } from "../store/slices/authSlice";

export default function MainLayout({ children, activeTab, setActiveTab, isRouteView, onExitRouteView }) {
  const authUser = useSelector(selectAuthUser);

  return (
    <div className="flex h-screen w-screen bg-[#09090b] text-white overflow-hidden select-none">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <div className="flex flex-1 flex-col min-w-0 h-full overflow-hidden">
    
        <Navbar
          isRouteView={isRouteView}
          onExitRouteView={onExitRouteView}
          activeTab={activeTab}
          user={authUser}
        />
        <main className="flex-1 p-2.5 min-[1152px]:p-3 xl:p-3 bg-[#070708] flex flex-col gap-2 min-[1152px]:gap-2.5 overflow-hidden min-h-0">
          {children}
        </main>
      </div>
    </div>
  );
}
