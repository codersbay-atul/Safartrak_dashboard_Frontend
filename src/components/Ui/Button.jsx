import React from "react";

export default function Button({
  children,
  variant = "primary",
  size = "md",
  icon: Icon,
  iconPosition = "left",
  fullWidthOnMobile = false,
  className = "",
  type = "button",
  ...props
}) {
  const baseStyles =
    "inline-flex flex-row items-center justify-center font-medium transition-all duration-150 rounded-lg select-none disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer focus:outline-none shrink-0 min-w-0";


  const widthStyle = fullWidthOnMobile ? "w-full sm:w-auto" : "";

  // 3. Color Variants
  const variants = {
    primary:
      "bg-[#FDBB24] text-black hover:bg-[#e0a31f] active:scale-[0.98]",
    secondary:
      "bg-[#18181b]/60 border border-[#27272a] text-[#d4d4d8] hover:bg-[#27272a] hover:text-white",
    danger:
      "bg-rose-500/10 border border-rose-500/20 text-rose-400 hover:bg-rose-500/20",
    ghost:
      "text-[#71717a] hover:text-white hover:bg-[#18181b]",
  };

  const sizes = {
    sm: "px-2.5 py-1 text-[10px] sm:text-[10.5px] gap-1.5",
    md: "px-3 py-1.5 text-[10.5px] sm:text-[11px] gap-1.5",
    lg: "px-3.5 sm:px-4 py-2 text-xs sm:text-sm gap-2",
  };

  const iconSizes = {
    sm: 11,
    md: 12,
    lg: 14,
  };

  return (
    <button
      type={type}
      className={`${baseStyles} ${widthStyle} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
     
      {Icon && iconPosition === "left" && (
        <Icon size={iconSizes[size] || 12} className="shrink-0" />
      )}
      
      {children && (
        <span className="truncate max-w-full leading-none">{children}</span>
      )}
      {Icon && iconPosition === "right" && (
        <Icon size={iconSizes[size] || 12} className="shrink-0" />
      )}
    </button>
  );
}