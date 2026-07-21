import React from "react";
import { Search } from "lucide-react";

export default function SearchInput({
  placeholder = "Search...",
  value,
  onChange,
  iconPosition = "right", 
  className = "",
  containerClassName = "",
  ...props
}) {
  return (
    <div className={`relative flex-1 sm:flex-initial min-w-36 ${containerClassName}`}>
      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`w-full sm:w-44 py-1 text-[10.5px] rounded-2xl bg-[#18181b]/40 border border-[#27272a] placeholder-[#71717a] focus:outline-none focus:border-[#FDBB24] text-white transition-all
          ${iconPosition === "left" ? "pl-7 pr-3" : "pr-8 pl-3"} 
          ${className}`}
        {...props}
      />
      <Search
        size={12}
        className={`absolute top-1/2 -translate-y-1/2 text-[#71717a] pointer-events-none
          ${iconPosition === "left" ? "left-2.5" : "right-2.5"}`}
      />
    </div>
  );
}