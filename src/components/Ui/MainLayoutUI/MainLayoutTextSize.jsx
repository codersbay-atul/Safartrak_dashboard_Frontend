import React from "react";

export const MAIN_LAYOUT_TEXT_SIZES = {
  title: "text-[16px] leading-[20px]",
  subtitle: "text-[13px] leading-[20px]",
  sectionTitle: "text-[14px] leading-[21px]",
  livePositionTitle: "text-[14px] leading-[21px] font-bold",
  badgeText: "text-[8px] leading-tight",
  metricText: "text-[12px] leading-tight",
  captionText: "text-[9px] leading-tight",
  filterText: "text-[11px] leading-tight font-medium",
  plateText: "text-[12px] xl:text-[14px] leading-tight font-semibold",
  subInfoText: "text-[12px] leading-tight",
  speedText: "text-[12px] xl:text-[13px] leading-tight font-bold",
  locationText: "text-[10px] leading-tight",
  buttonText: "text-[12px] xl:text-[14px] leading-none font-semibold",
};

export function formatDisplayValue(value, fallback = "Not Available") {
  if (value == null) return fallback;
  if (typeof value === "string") {
    const trimmed = value.trim();
    if (trimmed === "" || trimmed === "-" || trimmed.toLowerCase() === "not available") {
      return fallback;
    }
    return trimmed;
  }
  return String(value);
}

export function formatVehicleLocation(vehicle, fallback = "Not Available") {
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

export default function MainLayoutTextSize({
  as: Component = "span",
  size = "title",
  className = "",
  children,
  ...props
}) {
  const fontBase =
    "font-['Segoe_UI',-apple-system,BlinkMacSystemFont,Roboto,'Helvetica_Neue',Arial,sans-serif] not-italic";
  const selectedSize = MAIN_LAYOUT_TEXT_SIZES[size] || MAIN_LAYOUT_TEXT_SIZES.title;

  return (
    <Component
      className={`${fontBase} ${selectedSize} ${className}`.trim()}
      {...props}
    >
      {children}
    </Component>
  );
}