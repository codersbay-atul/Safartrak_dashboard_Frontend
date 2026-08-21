import React from "react";
import { Search } from "lucide-react";
import MainLayoutTextSize from "./MainLayoutTextSize";

export default function MainSearchInput({
  placeholder = "Search...",
  value,
  onChange,
  iconPosition = "right",
  className = "",
  containerClassName = "",
  ...props
}) {
  return (
    <div className={`relative flex-1 min-w-0 sm:flex-initial ${containerClassName}`}>
      <MainLayoutTextSize
        as="input"
        size="searchText"
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`w-full h-8 sm:h-9 px-3 rounded-full bg-[#05070B] border border-[#22252B] placeholder-[#8B8D97] focus:outline-none focus:border-[#FDBB24] text-white transition-all
          ${iconPosition === "left" ? "pl-8 pr-3" : "pr-8 pl-3"}
          ${className}`}
        {...props}
      />
      <Search
        size={12}
        className={`absolute top-1/2 -translate-y-1/2 text-[#8B8D97] pointer-events-none
          ${iconPosition === "left" ? "left-2.5" : "right-2.5"}`}
      />
    </div>
  );
}