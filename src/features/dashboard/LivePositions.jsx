import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import LiveMap from "./LiveMap"; 

export default function LivePositions({ selectedVehicle, showRoutePath, onViewMap, openInNewTab = true, hideViewMapButton = false }) {
  const panelRef = useRef(null);
  const navigate = useNavigate();

  const handleViewMap = () => {
    if (onViewMap) {
      onViewMap();
      return;
    }
    const vehicleId =
      selectedVehicle?.id ||
      selectedVehicle?.unique_id ||
      selectedVehicle?.vehicle_id ||
      selectedVehicle?.reg_no;

    const plate = selectedVehicle?.plate || selectedVehicle?.reg_no || "";

    const url = vehicleId
      ? `/full-map?vehicleId=${vehicleId}&plate=${plate}`
      : "/full-map";

    if (openInNewTab) {
      window.open(url, "_blank", "noopener,noreferrer");
    } else {
      navigate(url);
    }
  };

  return (
    <div
      ref={panelRef}
      className="w-full h-full min-h-0 bg-[#141414] border border-[#1f1f23]/60 rounded-xl flex flex-col select-none overflow-hidden relative"
    >
      {/* Header Area */}
      <div className="flex items-center justify-between p-3 border-b border-[#1f1f23]/60 bg-[#141414]/90 z-10 shrink-0">
        <h3 className="text-[12px] font-bold text-white tracking-tight">
          Live Position
        </h3>
        {!hideViewMapButton && (
          <button
            type="button"
            onClick={handleViewMap}
            className="flex items-center gap-0.5 text-[10.5px] font-bold text-[#FDBB24] hover:text-[#E9AE17] transition-colors cursor-pointer"
          >
            View Map <ChevronRight size={13} />
          </button>
        )}
      </div>

      
      <div className="flex-1 min-h-0 w-full h-full relative overflow-hidden bg-[#161619]">
        <LiveMap selectedVehicle={selectedVehicle} showRoutePath={showRoutePath} />
      </div>
    </div>
  );
}