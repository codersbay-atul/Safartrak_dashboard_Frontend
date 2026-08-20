import React from "react";

const SIDEBAR_COLORS = {
  text: "text-[rgb(255,255,255)]",
  title: "text-[#A8A8A8]", // Reusable title color (#A8A8A8)
  background: "bg-[#141414]",
  icon: "text-[#FDB914]",
};

export default function SideColor({
  as: Component = "span",
  color,
  bg,
  className = "",
  children,
  ...props
}) {
  const textColorClass = color ? SIDEBAR_COLORS[color] || "" : "";
  const backgroundColorClass = bg ? SIDEBAR_COLORS[bg] || "" : "";

  return (
    <Component
      className={`${textColorClass} ${backgroundColorClass} ${className}`.trim()}
      {...props}
    >
      {children}
    </Component>
  );
}