import React from "react";

const MAIN_LAYOUT_TEXT_SIZES = {
  title: "text-[16px] leading-[20px]",
  subtitle: "text-[12px] leading-[20px]",
  sectionTitle: "text-[14px] leading-[21px]",
  badgeText: "text-[8px] leading-tight",
  metricText: "text-[11px] leading-tight",
  captionText: "text-[9px] leading-tight",
  filterText: "text-[11px] leading-tight font-medium",
  plateText: "text-[12px] xl:text-[13px] leading-tight font-bold",
  subInfoText: "text-[11px] leading-tight",
  speedText: "text-[12px] xl:text-[13px] leading-tight font-bold",
  locationText: "text-[10px] leading-tight",
  buttonText: "text-[10px] xl:text-[11px] leading-tight font-semibold",
};

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