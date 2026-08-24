import React from "react";
import {
  RefreshCw,
  X,
  TrendingUp,
  Activity,
  Zap,
  Gauge,
  Fuel,
  Battery,
  ShieldCheck,
  Milestone,
  Waypoints,
  Clock,
  Radio,
  Truck,
  AlertTriangle,
  Copy,
  Check,
} from "lucide-react";

export const MAIN_LAYOUT_ICON_SIZES = {
  refresh: 14,
  cross: 13,
  close: 13,
  copy: 12.5,
  kpi: 16,
  kpiLarge: 20,
  metric: 11.5,
  statusDot: 6,
  filterDot: 8,
  xs: 10,
  sm: 12,
  md: 16,
  lg: 20,
  xl: 24,
};

const ICON_MAP = {
  refresh: RefreshCw,
  cross: X,
  close: X,
  copy: Copy,
  check: Check,
  trend: TrendingUp,
  activity: Activity,
  power: Zap,
  speed: Gauge,
  fuel: Fuel,
  battery: Battery,
  shield: ShieldCheck,
  milestone: Milestone,
  route: Waypoints,
  clock: Clock,
  signal: Radio,
  truck: Truck,
  alert: AlertTriangle,
};

export function getIconSize(sizeKey = "md", fallback = 16) {
  if (typeof sizeKey === "number") return sizeKey;
  return MAIN_LAYOUT_ICON_SIZES[sizeKey] ?? fallback;
}

export default function MainLayoutIcon({
  name,
  icon: CustomIcon,
  size = "md",
  loading = false,
  className = "",
  ...props
}) {
  const IconComponent = CustomIcon || (name ? ICON_MAP[name] : null);
  if (!IconComponent) return null;

  const numericSize = getIconSize(size);

  return (
    <IconComponent
      size={numericSize}
      className={`shrink-0 ${loading ? "animate-spin" : ""} ${className}`.trim()}
      {...props}
    />
  );
}