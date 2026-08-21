import React from "react";
import { MAIN_LAYOUT_TEXT_SIZES } from "./MainLayoutTextSize"; 

export default function MainHeaderActionButton({
  children,
  variant = "primary",
  icon: Icon,
  iconPosition = "left",
  className = "",
  type = "button",
  ...props
}) {
  const fontBase =
    "font-['Segoe_UI',-apple-system,BlinkMacSystemFont,Roboto,'Helvetica_Neue',Arial,sans-serif] not-italic";

  const baseStyles = `inline-flex items-center justify-center gap-1.5 h-8 px-3 rounded-lg ${fontBase} ${MAIN_LAYOUT_TEXT_SIZES.headerButtonText} transition-colors cursor-pointer select-none shrink-0`;

  const variantStyles =
    variant === "primary"
      ? "bg-[#FDBB24] text-black hover:bg-[#e0a31f]"
      : "bg-[#18181b]/70 border border-[#27272a] text-[#d4d4d8] hover:bg-[#27272a] hover:text-white";

  return (
    <button
      type={type}
      className={`${baseStyles} ${variantStyles} ${className}`.trim()}
      {...props}
    >
      {Icon && iconPosition === "left" && (
        <Icon size={14} className="shrink-0" />
      )}
      {children && <span>{children}</span>}
      {Icon && iconPosition === "right" && (
        <Icon size={14} className="shrink-0" />
      )}
    </button>
  );
}