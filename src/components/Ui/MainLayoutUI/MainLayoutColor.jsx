import React from "react";

const MAIN_LAYOUT_COLORS = {
  background: "bg-[#09090B]",
  surface: "bg-[#141414]",
  text: "text-[rgb(255,255,255)]",
  white: "text-[rgb(255,255,255)]",
  grey: "text-[#A1A1AA]",
  yellow: "text-[#FCBA12]",
};

export default function MainLayoutColor({
  as: Component = "span",
  color = "white",
  background,
  className = "",
  children,
  style,
  ...props
}) {
  const colorClass = color ? MAIN_LAYOUT_COLORS[color] || "text-[rgb(255,255,255)]" : "";
  const backgroundClass = background ? MAIN_LAYOUT_COLORS[background] || "" : "";
  const backgroundStyle = background === "surface" ? { backgroundColor: "#141414" } : {};

  return (
    <Component
      className={`${colorClass} ${backgroundClass} ${className}`.trim()}
      style={{ ...backgroundStyle, ...style }}
      {...props}
    >
      {children}
    </Component>
  );
}