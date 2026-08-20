import React from "react";

export default function NavIconButton({
  icon: Icon,
  badgeCount = 0,
  onClick,
  ariaLabel,
  className = "",
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={ariaLabel}
      className={`p-1.5 rounded-full bg-[#18181b] border border-[#27272a] text-[#a1a1aa] hover:text-white transition-colors relative cursor-pointer ${className}`}
    >
      <Icon size={16} />
      {badgeCount > 0 && (
        <span className="absolute -top-1 -right-1 min-w-[18px] h-4 px-1.5 leading-4 text-[10px] font-semibold text-white bg-[#ef4444] rounded-full flex items-center justify-center">
          {badgeCount > 9 ? "9+" : badgeCount}
        </span>
      )}
    </button>
  );
}