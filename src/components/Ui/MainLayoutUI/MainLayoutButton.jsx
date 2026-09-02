import React from "react";
import MainLayoutTextSize from "./MainLayoutTextSize";

export default function MainLayoutButton({
  children,
  variant = "outlineYellow",
  size = "xs",
  icon: Icon,
  iconPosition = "right",
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
    outlineGray:
      "border border-[#A8A8A8]/70 text-[#A8A8A8] bg-transparent hover:bg-[#A8A8A8]/10 hover:border-[#A8A8A8] transition-colors duration-150 font-medium",
    solidYellow:
      "bg-[#FDB914] text-black hover:bg-[#FDB914]/90 transition-colors duration-150 font-semibold",
    primary:
      "bg-[#F5B700] text-black border border-[#F5B700] hover:bg-[#d9a200] hover:border-[#d9a200] transition-colors duration-150 font-semibold",
    outlineMuted:
      "border border-zinc-700 text-zinc-300 hover:bg-zinc-800 transition-colors duration-150",
  };

  const chosenSize = sizeClasses[size] || sizeClasses.xs;
  const chosenVariant = variantClasses[variant] || variantClasses.outlineYellow;
  const iconEl = Icon ? (
    <Icon size={14} strokeWidth={2.25} className="shrink-0" />
  ) : null;

  return (
    <button
      type="button"
      onClick={onClick}
      className={`inline-flex items-center justify-center gap-1.5 cursor-pointer select-none whitespace-nowrap focus:outline-none ${chosenSize} ${chosenVariant} ${className}`.trim()}
      {...props}
    >
      {iconEl && iconPosition === "left" ? iconEl : null}
      {children ? (
        <MainLayoutTextSize size="buttonText">{children}</MainLayoutTextSize>
      ) : null}
      {iconEl && iconPosition === "right" ? iconEl : null}
    </button>
  );
}
