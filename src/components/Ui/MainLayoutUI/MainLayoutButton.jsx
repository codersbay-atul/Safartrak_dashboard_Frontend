import React from "react";
import MainLayoutTextSize from "./MainLayoutTextSize";

export default function MainLayoutButton({
  children,
  variant = "outlineYellow",
  size = "xs",
  className = "",
  onClick,
  ...props
}) {
  const sizeClasses = {
    xs: "px-2.5 py-1 text-[11px] xl:text-[12px] h-7 rounded-lg",
    sm: "px-3 py-1.5 text-[12px] xl:text-[13px] h-8 rounded-lg",
    md: "px-4 py-2 text-[13px] xl:text-[14px] h-9 rounded-xl",
  };

  const variantClasses = {
    outlineYellow:
      "border border-[#FDB914]/70 text-[#FDB914] bg-transparent hover:bg-[#FDB914]/10 transition-colors duration-150 font-medium",
    solidYellow:
      "bg-[#FDB914] text-black hover:bg-[#FDB914]/90 transition-colors duration-150 font-semibold",
    outlineMuted:
      "border border-zinc-700 text-zinc-300 hover:bg-zinc-800 transition-colors duration-150",
  };

  const chosenSize = sizeClasses[size] || sizeClasses.xs;
  const chosenVariant = variantClasses[variant] || variantClasses.outlineYellow;

  return (
    <button
      type="button"
      onClick={onClick}
      className={`inline-flex items-center justify-center cursor-pointer select-none whitespace-nowrap focus:outline-none ${chosenSize} ${chosenVariant} ${className}`.trim()}
      {...props}
    >
      <MainLayoutTextSize size="buttonText">
        {children}
      </MainLayoutTextSize>
    </button>
  );
}