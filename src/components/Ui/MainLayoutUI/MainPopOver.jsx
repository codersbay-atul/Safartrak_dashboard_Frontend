import React from "react";
import MainLayoutColor from "./MainLayoutColor";
import MainLayoutTextSize from "./MainLayoutTextSize";

export default function MainPopOver({
  isOpen,
  children,
  className = "w-64 right-0",
}) {
  if (!isOpen) return null;

  return (
    <MainLayoutColor
      as={MainLayoutTextSize}
      background="surface"
      size="PopOverText"
      className={`absolute top-full mt-2 border border-[#27272a] rounded-xl shadow-2xl z-50 animate-in fade-in zoom-in-95 duration-150 select-none font-sans ${className}`}
    >
      {children}
    </MainLayoutColor>
  );
}