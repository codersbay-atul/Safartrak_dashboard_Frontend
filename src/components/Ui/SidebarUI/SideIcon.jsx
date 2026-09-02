import React from "react";
import SideColor from "./SideColor";

const SLIDER_ICON_SRC = "/images/sliderIcon.svg";

export default function SideIcon({
  icon: Icon,
  src = SLIDER_ICON_SRC,
  size = 24,
  strokeWidth = 2,
  className = "",
  alt = "",
  ...props
}) {
  return (
    <SideColor
      as="span"
      color="icon"
      className={`inline-flex items-center justify-center shrink-0 ${className}`.trim()}
    >
      {Icon ? (
        <Icon size={size} strokeWidth={strokeWidth} {...props} />
      ) : (
        <img
          src={src}
          alt={alt}
          width={size}
          height={size}
          className="object-contain rounded-[4px]"
          {...props}
        />
      )}
    </SideColor>
  );
}
