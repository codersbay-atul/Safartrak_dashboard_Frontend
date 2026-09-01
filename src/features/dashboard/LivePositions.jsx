import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import LiveMap from "./LiveMap"; 
import MainLayoutColor from '../../components/Ui/MainLayoutUI/MainLayoutColor';
import MainLayoutTextSize from '../../components/Ui/MainLayoutUI/MainLayoutTextSize';

export default function LivePositions({
  selectedVehicle,
  focusedStop = null,
  showRoutePath,
  onViewMap,
  openInNewTab = true,
  hideViewMapButton = false,
}) {
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
    <MainLayoutColor
      as="div"
      background="surface"
      ref={panelRef}
      className="w-full h-full min-h-0 min-w-0 border border-[#1f1f23]/60 rounded-xl flex flex-col select-none overflow-hidden relative"
    >
      {/* Header Area */}
      <div className="flex items-center justify-between px-4 py-3 xl:px-4 xl:py-3.5 border-b border-[#1f1f23]/60 bg-[#141414]/90 z-10 shrink-0">
        <div className="flex items-center gap-2">
          <MainLayoutColor
            as={MainLayoutTextSize}
            color="title"
            size="sectionTitle"
            className="tracking-tight block truncate text-[13px] xl:text-[14px]"
          >
            Live Position
          </MainLayoutColor>

         
          <span className="relative flex top-[2px] w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
        </div>

        {!hideViewMapButton && (
          <button
            type="button"
            onClick={handleViewMap}
            className="flex items-center gap-0.5 transition-opacity hover:opacity-85 cursor-pointer shrink-0"
          >
            <MainLayoutColor
              as={MainLayoutTextSize}
              color="yellow"
              size="captionText"
              className="flex items-center gap-0.5 leading-none font-semibold text-[11px] xl:text-[12px]"
            >
              <span>View Map</span>
              <ChevronRight size={13} className="shrink-0" />
            </MainLayoutColor>
          </button>
        )}
      </div>

      <div className="flex-1 min-h-0 w-full relative overflow-hidden bg-[#161619]">
        <LiveMap
          selectedVehicle={selectedVehicle}
          focusedStop={focusedStop}
          showRoutePath={showRoutePath}
        />
      </div>
    </MainLayoutColor>
  );
}