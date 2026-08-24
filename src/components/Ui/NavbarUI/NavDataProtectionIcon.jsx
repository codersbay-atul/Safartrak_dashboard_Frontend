import { useRef, useState } from "react";
import { ShieldCheck } from "lucide-react";
import MainLayoutColor from "../MainLayoutUI/MainLayoutColor";
import MainLayoutTextSize from "../MainLayoutUI/MainLayoutTextSize";

const DATA_PROTECTION_URL = "https://www.safartrak.com/data-protection";
const CLOSE_DELAY_MS = 150;

export default function NavDataProtectionIcon() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLinkActive, setIsLinkActive] = useState(false);
  const closeTimerRef = useRef(null);

  const clearCloseTimer = () => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
  };

  const openTooltip = () => {
    clearCloseTimer();
    setIsOpen(true);
  };

  const scheduleClose = () => {
    clearCloseTimer();
    closeTimerRef.current = setTimeout(() => {
      setIsOpen(false);
      closeTimerRef.current = null;
    }, CLOSE_DELAY_MS);
  };

  return (
    <div
      className="relative shrink-0"
      onMouseEnter={openTooltip}
      onMouseLeave={scheduleClose}
      onFocus={openTooltip}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) {
          scheduleClose();
        }
      }}
    >
      <button
        type="button"
        aria-label="Enterprise data protection"
        aria-expanded={isOpen}
        className="p-1.5 text-[#4ade80] hover:text-[#86efac] transition-colors relative cursor-pointer shrink-0"
      >
        <ShieldCheck size={18} strokeWidth={1.75} />
      </button>

      {isOpen && (
        <div
          role="tooltip"
          className="absolute top-full right-0 z-50 pt-2 w-max max-w-[calc(100vw-1.5rem)]"
        >
          <MainLayoutColor
            as={MainLayoutTextSize}
            color="white"
            size="subtitle"
            className="block text-[12px] whitespace-nowrap font-normal leading-snug rounded-xl bg-[#121214] border border-[#27272a] shadow-2xl px-3.5 py-2"
          >
            <MainLayoutColor
              as="a"
              color={isLinkActive ? "yellow" : "white"}
              href={DATA_PROTECTION_URL}
              target="_blank"
              rel="noopener noreferrer"
              onMouseEnter={() => setIsLinkActive(true)}
              onMouseLeave={() => setIsLinkActive(false)}
              onFocus={() => setIsLinkActive(true)}
              onBlur={() => setIsLinkActive(false)}
              className="underline underline-offset-2 focus:outline-none transition-colors"
            >
              Enterprise data protection
            </MainLayoutColor>
            {" applies to this work space."}
          </MainLayoutColor>
        </div>
      )}
    </div>
  );
}
