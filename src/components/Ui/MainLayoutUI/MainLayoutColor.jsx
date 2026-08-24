import React from "react";

const MAIN_LAYOUT_COLORS = {
  // Surfaces & Backgrounds
  surface: "bg-[#141414]",
  background: "bg-[#09090b]",
  filterInactiveBg: "bg-[#292a30]",
  filterInInactiveBg: "bg-[#0d0e10]",
  selectedRowBg: "bg-[#07080a]",

  // Active Status Badges
  greenStatusBadge: "text-[#34D399]",
  greenStatusBadgeBg: "bg-[#052E1A]",
  greenStatusBadgeBorder: "border-[#0E9F6E]",

  // Inactive Status Badges
  inactiveStatusBadge: "text-[#D1D5DB]",
  inactiveStatusBadgeBg: "bg-[#1F2937]",
  inactiveStatusBadgeBorder: "border-[#4B5563]",

  // Expired Status Badges
  expiredStatusBadge: "text-[#F87171]",
  expiredStatusBadgeBg: "bg-[#3B0A12]",
  expiredStatusBadgeBorder: "border-[#DC2626]",

  // Pending Status Badges
  pendingStatusBadge: "text-amber-400",
  pendingStatusBadgeBg: "bg-amber-500/10",
  pendingStatusBadgeBorder: "border-amber-500/20",

  // KYC Specific Badges
  kycYesStatusBadge: "text-[#34D399]",
  kycYesStatusBadgeBg: "bg-[#052E1A]",
  kycYesStatusBadgeBorder: "border-[#0E9F6E]",

  kycNoStatusBadge: "text-[#FBBF24]",
  kycNoStatusBadgeBg: "bg-[#3A1D00]",
  kycNoStatusBadgeBorder: "border-[#D97706]",

  // Standard Red Status Fallback
  redStatusBadge: "text-[#F87171]",
  redStatusBadgeBg: "bg-[#3B0A12]",
  redStatusBadgeBorder: "border-[#DC2626]",

  // Global Borders
  cardBorder: "border-[#232329]",
  cardBorderHover: "hover:border-[#FDBB24]/35",
  border: "border-[#232329]",
  borderHover: "hover:border-[#FDBB24]/35",

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
  filterTextInactive: "text-[rgb(255,255,255)]",
  filterTextInInactive: "text-[#8e8e93]",
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
  border,
  borderHover,
  className = "",
  children,
  style,
  ...props
}) {
  const colorClass = color ? MAIN_LAYOUT_COLORS[color] || "" : "";
  const backgroundClass = background ? MAIN_LAYOUT_COLORS[background] || "" : "";
  const borderClass = border ? MAIN_LAYOUT_COLORS[border] || "" : "";
  const borderHoverClass = borderHover ? MAIN_LAYOUT_COLORS[borderHover] || "" : "";

  return (
    <Component
      className={`${colorClass} ${backgroundClass} ${borderClass} ${borderHoverClass} ${className}`.trim()}
      style={{ ...style }}
      {...props}
    >
      {children}
    </Component>
  );
}