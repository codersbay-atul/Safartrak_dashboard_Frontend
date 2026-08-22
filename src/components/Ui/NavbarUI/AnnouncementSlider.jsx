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
    time: "Aug 22, 2026",
    title: "UI improvements and bug fixes",
  },
  {
    time: "Aug 21, 2026",
    title: "Enterprise data protection is now enabled for the portal",
  },
  {
    time: "Aug 20, 2026",
    title: "Manage your SafarTrak products and subscriptions",
  },
  {
    time: "Aug 19, 2026",
    title: "Bills & Payments now includes invoice history",
  },
  {
    time: "Aug 18, 2026",
    title: "API credentials management is now available",
  },
  {
    time: "Aug 17, 2026",
    title: "Saved Places are now available for fleet monitoring",
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
            {/* <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#FDB914]/10 border border-[#FDB914]/20 shrink-0">
              <MainLayoutIcon
                icon={Megaphone}
                size="md"
                className="text-[#FDB914]"
              />
            </span> */}
            <MainLayoutColor
              as={MainLayoutTextSize}
              id="announcement-slider-title"
              color="title"
              size="sectionTitle"
              className="truncate"
            >
              What's new?
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

            <ul className="flex flex-col gap-8">
              {ANNOUNCEMENTS.map((item) => (
                <li key={item.time} className="relative">
                  <span
                    className={`absolute -left-4 top-1 h-2.5 w-2.5 rounded-full border-2 bg-[#FDB914] border-[#FDB914]`}
                  />
                  <div className="flex flex-col gap-1 ml-5">
                    <div className="block font-normal leading-4.5 text-[12px] text-[#A1A1AA] font-['Segoe_UI',-apple-system,BlinkMacSystemFont,Roboto,'Helvetica_Neue',Arial,sans-serif] not-italic">
                      {item.time}
                    </div>
                    <div className="block font-normal leading-5.25 text-[14px] text-[rgb(255,255,255)] font-['Segoe_UI',-apple-system,BlinkMacSystemFont,Roboto,'Helvetica_Neue',Arial,sans-serif] not-italic">
                      {item.title}
                    </div>
                  </div>
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
