import React from "react";

export const MAIN_LAYOUT_COLORS = {
  // Surfaces & Backgrounds
  surface: "bg-[#141414]",
  background: "bg-[#09090b]",
  selectedRowBg: "bg-[#07080a]",

  // SearchInput
  SearchBorderHover: "hover:border-[#FDBB24]/40",
  SearchTextColor: "text-[#A8A8A8]",
  SearchBorder: "border border-[#22252B]",
  SearchPlaceholder: "placeholder-[#8B8D97]",

  // Table Headers
  tableHeaderBg: "bg-[#161618]",

  // Dropdown UI Colors
  dropdownBg: "bg-[#05070B]",
  dropdownBorder: "border border-[#22252B]",
  dropdownBorderHover: "hover:border-[#FDBB24]/40",
  dropdownText: "text-[#A8A8A8]",
  dropdownIcon: "text-[#8B8D97]",
  
  // Dropdown Menu & Options
  dropdownMenuBg: "bg-[#0f1115]",
  dropdownMenuBorder: "border border-[#22252B]",
  dropdownOptionText: "text-[#a1a1aa]",
  dropdownOptionHoverBg: "hover:bg-[#18181b]",
  dropdownOptionActiveText: "text-[#FDBB24]",
  dropdownOptionActiveBg: "bg-[#FDBB24]/10",

  // Filter Active / 
  filterActiveBg: "bg-[#292a30]",
  filterActiveText: "text-white",
  filterBg: "bg-[#000000]",
  filterBorder: "border border-[#7e7e7e]",
  filterBorderHover: "hover:border-[#A8A8A8]",
  filterText: "text-[#8e8e93]",
  filterCount: "text-[#8e8e93]",

  // Filter Dots
  filterDotAll: "bg-[#8e8e93]",
  filterDotMoving: "bg-[#10b981]",
  filterDotIdle: "bg-[#f59e0b]",
  filterDotCritical: "bg-[#f97316]",
  filterDotOffline: "bg-[#ef4444]",

  // --- BADGES (Exact Required Colors) ---
  // Pending
  pendingText: "text-[#FDB914]",
  pendingBg: "bg-[#372700]",

  // Idle
  idleText: "text-[#3B82F6]",
  idleBg: "bg-[#172554]",

  // Active / Online / Yes
  activeText: "text-[#10B981]",
  activeBg: "bg-[#022C22]",

  // Offline
  offlineText: "text-red-500",

  // Inactive
  inactiveText: "text-[#E4E4E7]",
  inactiveBg: "bg-[#27272A]",

  // Expired
  expiredText: "text-[#F87171]",
  expiredBg: "bg-[#450A0A]",

  // Global Borders & Typography
  cardBorder: "border border-[#232329]",
  cardBorderHover: "hover:border-[#FDBB24]/35",
  title: "text-white",
  subtitle: "text-[#A8A8A8]",
  muted: "text-[#A1A1AA]",
  yellow: "text-[#FDB914]",
};

export default function MainLayoutColor({
  as: Component = "span",
  color,
  background,
  border,
  borderHover,
  hoverBorder,
  className = "",
  children,
  style,
  ...props
}) {
  const colorClass = color ? MAIN_LAYOUT_COLORS[color] || "" : "";
  const backgroundClass = background ? MAIN_LAYOUT_COLORS[background] || "" : "";
  const borderClass = border ? MAIN_LAYOUT_COLORS[border] || "" : "";
  const hoverClassKey = borderHover || hoverBorder;
  const borderHoverClass = hoverClassKey ? MAIN_LAYOUT_COLORS[hoverClassKey] || "" : "";

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