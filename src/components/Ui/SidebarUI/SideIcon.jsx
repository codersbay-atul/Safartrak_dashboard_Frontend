import React from "react";
import SideColor from "./SideColor";

export default function SideIcon({
  icon: Icon,
  size = 16,
  strokeWidth = 2,
  className = "",
  ...props
}) {
  if (!Icon) return null;

  return (
    <SideColor
      as="span"
      color="icon"
      className={`inline-flex items-center justify-center shrink-0 ${className}`.trim()}
    >
      <Icon size={size} strokeWidth={strokeWidth} {...props} />
    </SideColor>
  );
}