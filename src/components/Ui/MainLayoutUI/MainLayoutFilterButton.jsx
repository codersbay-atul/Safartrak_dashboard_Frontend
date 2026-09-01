import React from "react";
import MainLayoutColor from "./MainLayoutColor";
import MainLayoutTextSize from "./MainLayoutTextSize";

export default function MainLayoutFilterButton({
  label,
  children,
  isActive = false,
  onClick,
  className = "",
  ...props
}) {
  return (
    <MainLayoutColor
      as="button"
      type="button"
      onClick={onClick}
      background={isActive ? "filterActiveBg" : "filterBg"}
      border={isActive ? "filterActiveBorder" : "filterBorder"}
      borderHover="filterBorderHover"
      color={isActive ? "filterActiveText" : "filterText"}
      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full whitespace-nowrap shrink-0 transition-all select-none cursor-pointer font-medium outline-none focus:outline-none ring-0 focus:ring-0 ${className}`.trim()}
      {...props}
    >
      {children ? (
        children
      ) : (
        <MainLayoutTextSize
          size="filterText"
          className="leading-none whitespace-nowrap"
        >
          {label || "Filter"}
        </MainLayoutTextSize>
      )}
    </MainLayoutColor>
  );
}