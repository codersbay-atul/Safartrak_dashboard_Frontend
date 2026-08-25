import React from "react";
import MainLayoutColor from "./MainLayoutColor";
import MainLayoutTextSize from "./MainLayoutTextSize";

const STATUS_CONFIG = {
  running: {
    color: "activeText",
    bg: "activeBg",
    label: "Running",
  },
  live: {
    color: "activeText",
    bg: "activeBg",
    label: "Live",
  },
  moving: {
    color: "activeText",
    bg: "activeBg",
    dot: "filterDotMoving",
    label: "Moving",
  },
  active: {
    color: "activeText",
    bg: "activeBg",
    dot: "filterDotMoving",
    label: "Active",
  },
  online: {
    color: "activeText",
    bg: "activeBg",
    dot: "filterDotMoving",
    label: "Online",
  },
  yes: {
    color: "activeText",
    bg: "activeBg",
    dot: "filterDotMoving",
    label: "Yes",
  },
  idle: {
    color: "idleText",
    bg: "idleBg",
    dot: "filterDotIdle",
    label: "Idle",
  },
  pending: {
    color: "pendingText",
    bg: "pendingBg",
    dot: "filterDotIdle",
    label: "Pending",
  },
  critical: {
    color: "expiredText",
    bg: "expiredBg",
    dot: "filterDotCritical",
    label: "Critical",
  },
  maintenance: {
    color: "expiredText",
    bg: "expiredBg",
    dot: "filterDotCritical",
    label: "Maintenance",
  },
  expired: {
    color: "expiredText",
    bg: "expiredBg",
    dot: "filterDotCritical",
    label: "Expired",
  },
  offline: {
    color: "offlineText",
    bg: "expiredBg",
    dot: "filterDotOffline",
    label: "Offline",
  },
  inactive: {
    color: "inactiveText",
    bg: "inactiveBg",
    dot: "filterDotAll",
    label: "Inactive",
  },
};

const DEFAULT_CONFIG = {
  color: "inactiveText",
  bg: "inactiveBg",
  dot: "filterDotAll",
  label: "Unknown",
};

export default function MainStatusBadge({
  status,
  showDot = true,
  className = "",
}) {
  const normalizedKey = String(status || "").toLowerCase().trim();
  const config = STATUS_CONFIG[normalizedKey] || DEFAULT_CONFIG;
  const displayLabel = status || config.label;

  return (
    <MainLayoutColor
      as="span"
      color={config.color}
      background={config.bg}
      className={`inline-flex items-center justify-center gap-1.5 px-2.5 py-0.5 rounded-full font-medium leading-none shrink-0 ${className}`.trim()}
    >
      {showDot && (
        <MainLayoutColor
          as="span"
          background={config.dot || "filterDotMoving"}
          className="w-1.5 h-1.5 rounded-full shrink-0"
        />
      )}
      <MainLayoutTextSize size="badgeText" className="truncate whitespace-nowrap">
        {displayLabel}
      </MainLayoutTextSize>
    </MainLayoutColor>
  );
}