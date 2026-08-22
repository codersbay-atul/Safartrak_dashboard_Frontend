import { useRef, useState } from "react";
import MainLayoutColor from "../MainLayoutUI/MainLayoutColor";
import MainLayoutTextSize from "../MainLayoutUI/MainLayoutTextSize";

const CLOSE_DELAY_MS = 150;

export default function NavTooltip({
  label,
  children,
  disabled = false,
  align = "center",
}) {
  const [isOpen, setIsOpen] = useState(false);
  const closeTimerRef = useRef(null);

  const clearCloseTimer = () => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
  };

  const openTooltip = () => {
    if (disabled) return;
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

  const showTooltip = isOpen && !disabled;
  const alignClass = align === "right" ? "right-0" : "left-1/2 -translate-x-1/2";

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
      {children}
      {showTooltip ? (
        <div
          role="tooltip"
          className={`absolute top-full z-50 pt-2 w-max max-w-[calc(100vw-1.5rem)] pointer-events-none ${alignClass}`}
        >
          <MainLayoutColor
            as={MainLayoutTextSize}
            color="white"
            size="subtitle"
            className="block text-[12px] whitespace-nowrap font-normal leading-snug rounded-xl bg-[#121214] border border-[#27272a] shadow-2xl px-3 py-1.5"
          >
            {label}
          </MainLayoutColor>
        </div>
      ) : null}
    </div>
  );
}
