import React from "react";
import { Play } from "lucide-react";
import LivePositions from "./LivePositions";
import MainLayoutColor from "../../components/Ui/MainLayoutUI/MainLayoutColor";
import MainLayoutTextSize from "../../components/Ui/MainLayoutUI/MainLayoutTextSize";

export default function DashboardMapPanel({
  selectedVehicle,
  focusedStop = null,
  showRoutePath = false,
  onViewMap,
  onPlayRoute,
}) {
  return (
    <div className="relative w-full h-full min-h-0 min-w-0">
      <LivePositions
        selectedVehicle={selectedVehicle}
        focusedStop={focusedStop}
        showRoutePath={showRoutePath}
        openInNewTab={false}
        onViewMap={onViewMap}
      />

      {selectedVehicle ? (
        <button
          type="button"
          onClick={onPlayRoute}
          className="absolute top-14 left-3 z-20 inline-flex items-center gap-1.5 h-8 px-3 rounded-lg bg-[#141414]/95 border border-[#FDB914]/70 text-[#FDB914] cursor-pointer hover:bg-[#FDB914]/10 transition-colors"
        >
          <Play size={12} className="text-[#FDB914]" fill="#FDB914" />
          <MainLayoutColor
            as={MainLayoutTextSize}
            color="yellow"
            size="captionText"
            className="font-semibold"
          >
            Play Route
          </MainLayoutColor>
        </button>
      ) : null}
    </div>
  );
}
