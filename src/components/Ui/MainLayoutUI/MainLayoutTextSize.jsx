import React from "react";

export const MAIN_LAYOUT_TEXT_SIZES = {
  title: "text-[18px] leading-[20px]",
  subtitle: "text-[13px] leading-[20px]",
  sectionTitle: "text-[14px] leading-[21px] font-medium",
  livePositionTitle: "text-[14px] leading-[21px] font-bold",
  badgeText: "text-[11px] leading-tight font-medium",
  metricText: "text-[12px] leading-tight font-medium",
  captionText: "text-[9px] leading-tight",
  filterText: "text-[11px] leading-tight font-medium",
  plateText: "text-[14px] leading-tight font-medium",
  subInfoText: "text-[12px] leading-tight",
  speedText: "text-[12px] xl:text-[13px] leading-tight font-medium",
  locationText: "text-[10px] leading-tight",
  lastSeenText: "text-[11px] xl:text-[12px] leading-tight",
  buttonText: "text-[12px] xl:text-[14px] leading-none",
  dropdownText: "text-[11px] sm:text-[12px] leading-tight font-medium",
  dropdownOptionText: "text-[10.5px] sm:text-[11.5px] leading-tight font-medium",
  kpiTitle: "text-[13px] xl:text-[13px] leading-tight font-medium tracking-wide",
  headerButtonText: "text-[14px] leading-[20px] font-medium",
  searchText: "text-[12px] leading-tight font-normal",
};

export function formatDisplayValue(value, fallback = "Not Available") {
  if (value == null) return fallback;
  if (typeof value === "string") {
    const trimmed = value.trim();
    if (
      trimmed === "" ||
      trimmed === "-" ||
      trimmed.toLowerCase() === "not available"
    ) {
      return fallback;
    }
    return trimmed;
  }
  return String(value);
}

export function formatVehicleLocation(vehicle, fallback = "—") {
  if (!vehicle) return fallback;
  const raw = vehicle.raw ?? {};

  const locationCandidate =
    vehicle.location ||
    vehicle.address ||
    vehicle.city ||
    raw.location ||
    raw.address ||
    raw.location_name ||
    raw.city ||
    raw.formatted_address;

  return formatDisplayValue(locationCandidate, fallback);
}

export function formatLastSeen(vehicle, fallback = "—") {
  if (!vehicle) return fallback;
  const raw = vehicle.raw ?? {};

  const dateVal =
    vehicle.lastSeen ||
    vehicle.last_seen ||
    vehicle.lastUpdated ||
    vehicle.updatedAt ||
    vehicle.updated_at ||
    vehicle.timestamp ||
    raw.last_seen ||
    raw.last_updated ||
    raw.updated_at ||
    raw.device_updated_at ||
    raw.timestamp;

  if (!dateVal) return fallback;

  if (typeof dateVal === "string" && isNaN(Date.parse(dateVal))) {
    return dateVal;
  }

  try {
    const past = new Date(dateVal).getTime();
    if (isNaN(past)) return fallback;

    const diffInSec = Math.floor((Date.now() - past) / 1000);
    if (diffInSec < 60) return "Just now";
    const diffInMin = Math.floor(diffInSec / 60);
    if (diffInMin < 60) return `${diffInMin}m ago`;
    const diffInHours = Math.floor(diffInMin / 60);
    if (diffInHours < 24) return `${diffInHours}h ago`;
    const diffInDays = Math.floor(diffInHours / 24);
    return `${diffInDays}d ago`;
  } catch {
    return fallback;
  }
}

export default function MainLayoutTextSize({
  as: Component = "span",
  size = "title",
  className = "",
  children,
  ...props
}) {
  const fontBase =
    "font-['Segoe_UI',-apple-system,BlinkMacSystemFont,Roboto,'Helvetica_Neue',Arial,sans-serif] not-italic";
  const selectedSize =
    MAIN_LAYOUT_TEXT_SIZES[size] || MAIN_LAYOUT_TEXT_SIZES.title;

  return (
    <Component
      className={`${fontBase} ${selectedSize} ${className}`.trim()}
      {...props}
    >
      {children}
    </Component>
  );
}