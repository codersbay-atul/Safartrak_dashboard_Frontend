import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Megaphone, ArrowRight } from "lucide-react";
import MainLayoutColor from "../MainLayoutUI/MainLayoutColor";
import MainLayoutTextSize from "../MainLayoutUI/MainLayoutTextSize";
import MainLayoutButton from "../MainLayoutUI/MainLayoutButton";
import MainLayoutIcon from "../MainLayoutUI/MainLayoutIcon";

const SLIDE_MS = 360;

const ANNOUNCEMENTS = [
  {
    id: "idle-alerts",
    time: "15 hours ago",
    title: "Smarter alerts for idle and offline vehicles",
  },
  {
    id: "live-map",
    time: "Yesterday",
    title: "Faster live map refresh for large fleets",
  },
  {
    id: "geofence",
    time: "2 days ago",
    title: "Improved geofence tools for saved places",
  },
  {
    id: "maintenance",
    time: "4 days ago",
    title: "New maintenance reminders on vehicle details",
  },
  {
    id: "route-playback",
    time: "4 days ago",
    title: "Route playback now includes stop duration",
  },
  {
    id: "driver-assign",
    time: "5 days ago",
    title: "Driver assignment is now available from Users",
  },
  {
    id: "report-export",
    time: "6 days ago",
    title: "Export reports in Excel and PDF",
  },
  {
    id: "immobilize",
    time: "Last week",
    title: "Immobilize commands now show confirmation status",
  },
  {
    id: "billing",
    time: "Last week",
    title: "Bills & Payments invoice history is live",
  },
  {
    id: "security",
    time: "Last week",
    title: "Stronger session security for portal access",
  },
];

export default function AnnouncementSlider({ isOpen, onClose }) {
  const [isMounted, setIsMounted] = useState(isOpen);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsMounted(true);
      let innerFrame = 0;
      const outerFrame = requestAnimationFrame(() => {
        innerFrame = requestAnimationFrame(() => setIsVisible(true));
      });
      return () => {
        cancelAnimationFrame(outerFrame);
        cancelAnimationFrame(innerFrame);
      };
    }

    setIsVisible(false);
    const timeout = setTimeout(() => setIsMounted(false), SLIDE_MS);
    return () => clearTimeout(timeout);
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return undefined;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") onClose();
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isMounted) return null;

  return createPortal(
    <div className="fixed inset-0 z-[1000] select-none">
      <div
        onClick={onClose}
        className={`announcement-slider-backdrop absolute inset-0 bg-black/70 backdrop-blur-xs ${
          isVisible ? "is-open" : ""
        }`}
      />

      <MainLayoutColor
        as="aside"
        role="dialog"
        aria-modal="true"
        aria-labelledby="announcement-slider-title"
        background="surface"
        className={`announcement-slider-panel absolute inset-y-0 right-0 w-[min(100vw,380px)] border-l border-[#27272a] shadow-2xl flex flex-col ${
          isVisible ? "is-open" : "is-closing"
        }`}
      >
        <div className="flex items-center justify-between gap-3 px-4 py-3.5 border-b border-[#27272a] shrink-0">
          <div className="flex items-center gap-2.5 min-w-0">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#FDB914]/10 border border-[#FDB914]/20 shrink-0">
              <MainLayoutIcon
                icon={Megaphone}
                size="md"
                className="text-[#FDB914]"
              />
            </span>
            <MainLayoutColor
              as={MainLayoutTextSize}
              id="announcement-slider-title"
              color="title"
              size="sectionTitle"
              className="truncate"
            >
              Latest from our changelog
            </MainLayoutColor>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="flex h-7 w-7 items-center justify-center rounded-lg text-[#a1a1aa] hover:text-white hover:bg-white/5 transition-colors cursor-pointer shrink-0"
          >
            <MainLayoutIcon name="close" size="close" />
          </button>
        </div>

        <div className="flex-1 min-h-0 overflow-y-auto custom-scrollbar px-4 py-4">
          <div className="relative pl-4">
            <div className="absolute left-[5px] top-1.5 bottom-1.5 w-px bg-[#2e2e36]" />

            <ul className="flex flex-col gap-4">
              {ANNOUNCEMENTS.map((item, index) => (
                <li key={item.id} className="relative">
                  <span
                    className={`absolute -left-4 top-1.5 h-2.5 w-2.5 rounded-full border-2 ${
                      index === 0
                        ? "bg-[#FDB914] border-[#FDB914]"
                        : "bg-[#141414] border-[#52525b]"
                    }`}
                  />
                  <MainLayoutColor
                    as={MainLayoutTextSize}
                    color="muted"
                    size="captionText"
                    className="block"
                  >
                    {item.time}
                  </MainLayoutColor>
                  <MainLayoutColor
                    as={MainLayoutTextSize}
                    color="title"
                    size="metricText"
                    className="mt-0.5 block leading-snug"
                  >
                    {item.title}
                  </MainLayoutColor>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* <div className="px-4 py-3 border-t border-[#27272a] shrink-0 ">
          <MainLayoutButton
            variant="outlineYellow"
            size="sm"
            onClick={onClose}
            className="w-full gap-1.5"
          >
            <div className="flex items-center gap-1.5">
              View changelog
              <ArrowRight size={13} />
            </div>
          </MainLayoutButton>
        </div> */}
      </MainLayoutColor>
    </div>,
    document.body,
  );
}
