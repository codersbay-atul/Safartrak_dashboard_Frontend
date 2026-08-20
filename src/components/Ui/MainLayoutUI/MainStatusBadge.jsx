import React from "react";
import MainLayoutColor from "./MainLayoutColor";
import MainLayoutTextSize from "./MainLayoutTextSize";

const STATUS_CONFIG = {
  running: {
    color: "running",
    bg: "runningBg",
    dot: "runningDot",
    border: "border-[#10b981]/25",
    label: "Running",
  },
  moving: {
    color: "running",
    bg: "runningBg",
    dot: "runningDot",
    border: "border-[#10b981]/25",
    label: "Running",
  },
  idle: {
    color: "idle",
    bg: "idleBg",
    dot: "idleDot",
    border: "border-[#f59e0b]/25",
    label: "Idle",
  },
  critical: {
    color: "critical",
    bg: "criticalBg",
    dot: "criticalDot",
    border: "border-[#f97316]/25",
    label: "Critical",
  },
  maintenance: {
    color: "maintenance",
    bg: "maintenanceBg",
    dot: "maintenanceDot",
    border: "border-[#f97316]/25",
    label: "Maintenance",
  },
  offline: {
    color: "offline",
    bg: "offlineBg",
    dot: "offlineDot",
    border: "border-[#ef4444]/25",
    label: "Offline",
  },
};

const DEFAULT_CONFIG = {
  color: "defaultStatus",
  bg: "defaultStatusBg",
  dot: "defaultStatusDot",
  border: "border-zinc-700/50",
  label: "Unknown",
};

export default function MainStatusBadge({ status, className = "" }) {
  const normalizedKey = String(status || "").toLowerCase().trim();
  const config = STATUS_CONFIG[normalizedKey] || DEFAULT_CONFIG;
  const displayLabel = status || config.label;

  return (
    <MainLayoutColor
      as={MainLayoutTextSize}
      color={config.color}
      background={config.bg}
      size="badgeText"
      className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full border ${config.border} font-semibold leading-none shrink-0 ${className}`.trim()}
    >
      <MainLayoutColor
        as="span"
        background={config.dot}
        className="w-1.5 h-1.5 rounded-full shrink-0"
      />
      <span className="truncate">{displayLabel}</span>
    </MainLayoutColor>
  );
}