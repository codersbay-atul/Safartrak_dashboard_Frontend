import React, { useEffect, useState } from "react";
import RouteHistoryPanel from "./RouteHistoryPanel";

const SLIDE_MS = 360;
const PANEL_WIDTH =
  "w-[min(calc(100vw-1.75rem),440px)] min-[1152px]:w-[340px] xl:w-[380px] 2xl:w-[420px]";

export default function RouteHistorySlider({
  vehicle,
  onClose,
  onPlayRoute,
  onSaveStop,
  onSelectStop,
  selectedStopId,
}) {
  const isOpen = Boolean(vehicle);
  const [isMounted, setIsMounted] = useState(isOpen);
  const [isVisible, setIsVisible] = useState(false);
  const [displayedVehicle, setDisplayedVehicle] = useState(vehicle);

  if (isOpen && !isMounted) {
    setIsMounted(true);
  }

  useEffect(() => {
    if (isOpen) {
      setDisplayedVehicle(vehicle);
      let innerFrame = 0;
      const outerFrame = requestAnimationFrame(() => {
        innerFrame = requestAnimationFrame(() => setIsVisible(true));
      });
      return () => {
        cancelAnimationFrame(outerFrame);
        cancelAnimationFrame(innerFrame);
      };
    }

    const hideFrame = requestAnimationFrame(() => setIsVisible(false));
    const timeout = setTimeout(() => {
      setIsMounted(false);
      setDisplayedVehicle(null);
    }, SLIDE_MS);

    return () => {
      cancelAnimationFrame(hideFrame);
      clearTimeout(timeout);
    };
  }, [isOpen, vehicle]);

  if (!isMounted) return null;

  return (
    <div
      className={`route-history-slider-track overflow-hidden shrink-0 min-h-0 ${
        isVisible
          ? `${PANEL_WIDTH} h-[560px] min-[1152px]:h-full`
          : "w-0 h-0 min-[1152px]:h-full -mt-4 min-[1152px]:mt-0 min-[1152px]:-ml-4 pointer-events-none"
      }`}
    >
      <div
        className={`route-history-slider-panel h-full ${PANEL_WIDTH} ${
          isVisible ? "is-open" : "is-closing"
        }`}
      >
        {displayedVehicle ? (
          <RouteHistoryPanel
            vehicle={displayedVehicle}
            onClose={onClose}
            onPlayRoute={onPlayRoute}
            onSaveStop={onSaveStop}
            onSelectStop={onSelectStop}
            selectedStopId={selectedStopId}
          />
        ) : null}
      </div>
    </div>
  );
}
