import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import LiveMap from "./LiveMap"; 
import MainLayoutColor from '../../components/Ui/MainLayoutUI/MainLayoutColor';
import MainLayoutTextSize from '../../components/Ui/MainLayoutUI/MainLayoutTextSize';

export default function LivePositions({
  selectedVehicle,
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
      className="w-full h-full min-h-0 border border-[#1f1f23]/60 rounded-xl flex flex-col select-none overflow-hidden relative"
    >
      {/* Header Area */}
      <div className="flex items-center justify-between p-3 border-b border-[#1f1f23]/60 bg-[#141414]/90 z-10 shrink-0">
        <MainLayoutColor
          as={MainLayoutTextSize}
          color="title"
          size="sectionTitle"
          className="tracking-tight block truncate"
        >
          Live Position
        </MainLayoutColor>

        {!hideViewMapButton && (
          <button
            type="button"
            onClick={handleViewMap}
            className="flex items-center gap-0.5 transition-colors cursor-pointer"
          >
            <MainLayoutColor
              as={MainLayoutTextSize}
              color="yellow"
              size="subtitle"
              className="flex items-center gap-0.5 text-[10.5px] hover:opacity-90"
            >
              View Map <ChevronRight size={13} />
            </MainLayoutColor>
          </button>
        )}
      </div>

      <div className="flex-1 min-h-0 w-full h-full relative overflow-hidden bg-[#161619]">
        <LiveMap selectedVehicle={selectedVehicle} showRoutePath={showRoutePath} />
      </div>
    </MainLayoutColor>
  );
}