import React from "react";
import MainLayoutColor, { MAIN_LAYOUT_COLORS } from "./MainLayoutColor";
import MainLayoutTextSize from "./MainLayoutTextSize";

export default function MainHeaderActionButton({
  children,
  variant = "primary",
  icon: Icon,
  iconPosition = "left",
  className = "",
  type = "button",
  ...props
}) {
  const isPrimary = variant === "primary";

  if (isPrimary) {
    return (
      <button
        type={type}
        className={`inline-flex items-center justify-center gap-1.5 h-8 px-3.5 rounded-lg font-medium select-none shrink-0 cursor-pointer shadow-sm transition-opacity hover:opacity-90 bg-[#FDB914] text-black ${className}`.trim()}
        {...props}
      >
        {Icon && iconPosition === "left" && (
          <Icon size={14} className="shrink-0 text-black" />
        )}
        {children && (
          <MainLayoutTextSize
            size="headerButtonText"
            className="leading-none text-black font-semibold"
          >
            {children}
          </MainLayoutTextSize>
        )}
        {Icon && iconPosition === "right" && (
          <Icon size={14} className="shrink-0 text-black" />
        )}
      </button>
    );
  }

  return (
    <MainLayoutColor
      as="button"
      type={type}
      background="surface"
      border="cardBorder"
      borderHover="cardBorderHover"
      color="subtitle"
      className={`inline-flex items-center justify-center gap-1.5 h-8 px-3.5 rounded-lg select-none shrink-0 cursor-pointer transition-colors hover:text-white ${className}`.trim()}
      {...props}
    >
      {Icon && iconPosition === "left" && (
        <Icon size={14} className="shrink-0" />
      )}
      {children && (
        <MainLayoutTextSize size="headerButtonText" className="leading-none">
          {children}
        </MainLayoutTextSize>
      )}
      {Icon && iconPosition === "right" && (
        <Icon size={14} className="shrink-0" />
      )}
    </MainLayoutColor>
  );
}