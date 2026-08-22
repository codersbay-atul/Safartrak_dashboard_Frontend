import React from "react";
import MainLayoutTextSize from "../MainLayoutUI/MainLayoutTextSize";

export default function NavMenuItem({
  icon: Icon,
  label,
  onClick,
  danger = false,
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`w-full flex items-center gap-2.5 px-3 py-2 hover:bg-[#18181b] rounded-lg transition-colors cursor-pointer text-left ${
        danger ? "text-[#ef4444]" : "text-[#a1a1aa] hover:text-white"
      }`}
    >
      {Icon && (
        <Icon
          size={16}
          className={`shrink-0 ${danger ? "text-[#ef4444]" : "text-[#a1a1aa]"}`}
        />
      )}
      <MainLayoutTextSize
        size="PopOverText"
        className={danger ? "text-[#ef4444]" : ""}
      >
        {label}
      </MainLayoutTextSize>
    </button>
  );
}