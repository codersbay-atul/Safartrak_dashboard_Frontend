import React from "react";

const MAIN_LAYOUT_COLORS = {
  // Surfaces & Backgrounds
  surface: "bg-[#121212]",
  background: "bg-[#09090b]",
  filterActiveBg: "bg-[#292a30]",
  filterInactiveBg: "bg-[#0d0e10]",
  selectedRowBg: "bg-[#07080a]",

  // Text Typography
  title: "text-[rgb(255,255,255)]",
  white: "text-[rgb(255,255,255)]",
  text: "text-[rgb(255,255,255)]",
  subtitle: "text-[#A8A8A8]",
  footerText: "text-[#9D6F00]",
  kpiTitle: "text-[#9D6F00]",
  grey: "text-[#A8A8A8]",
  muted: "text-[#A1A1AA]",
  yellow: "text-[#FDB914]", 

  // Filter Buttons & Counts
  filterTextActive: "text-[rgb(255,255,255)]",
  filterTextInactive: "text-[#8e8e93]",
  filterCount: "text-[#8e8e93]",

  // Filter Indicator Dots
  filterDotAll: "bg-[#8e8e93]",
  filterDotMoving: "bg-[#10b981]",
  filterDotIdle: "bg-[#f59e0b]",
  filterDotCritical: "bg-[#f97316]",
  filterDotOffline: "bg-[#ef4444]",

  // Vehicle List & Card Specific
  vehiclePlate: "text-[rgb(255,255,255)]",
  vehicleSubtext: "text-[#A8A8A8]",
  vehicleSpeed: "text-[rgb(255,255,255)]",
  vehicleLocation: "text-[#8e8e93]",
  separator: "text-[#52525b]",

  // Metrics Items
  metricLabel: "text-[#A1A1AA]",
  metricValue: "text-[rgb(255,255,255)]",
  metricIcon: "text-[#71717A]",

  // Status Colors
  running: "text-[#10b981]",
  runningBg: "bg-[#10b981]/10",
  runningDot: "bg-[#10b981]",

  idle: "text-[#f59e0b]",
  idleBg: "bg-[#f59e0b]/10",
  idleDot: "bg-[#f59e0b]",

  critical: "text-[#f97316]",
  criticalBg: "bg-[#f97316]/10",
  criticalDot: "bg-[#f97316]",

  maintenance: "text-[#f97316]",
  maintenanceBg: "bg-[#f97316]/10",
  maintenanceDot: "bg-[#f97316]",

  offline: "text-[#ef4444]",
  offlineBg: "bg-[#ef4444]/10",
  offlineDot: "bg-[#ef4444]",

  defaultStatus: "text-[#d4d4d8]",
  defaultStatusBg: "bg-zinc-500/10",
  defaultStatusDot: "bg-[#a1a1aa]",

  // Action / UI Elements & Buttons
  arrowIcon: "text-[#FDB914]",
  buttonText: "text-[#FDB914]",
  buttonBorder: "border-[#FDB914]/70",
  actionButtonText: "text-[#FDB914]",
  actionButtonBorder: "border-[#FDB914]/70",
  actionButtonHoverBg: "hover:bg-[#FDB914]/10",
};

export default function MainLayoutColor({
  as: Component = "span",
  color,
  background,
  className = "",
  children,
  style,
  ...props
}) {
  const colorClass = color ? MAIN_LAYOUT_COLORS[color] || "" : "";
  const backgroundClass = background ? MAIN_LAYOUT_COLORS[background] || "" : "";
  const backgroundStyle = background === "surface" ? { backgroundColor: "#141414" } : {};

  return (
    <Component
      className={`${colorClass} ${backgroundClass} ${className}`.trim()}
      style={{ ...backgroundStyle, ...style }}
      {...props}
    >
      {children}
    </Component>
  );
}