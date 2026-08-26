import React from "react";
import { Search } from "lucide-react";
import MainLayoutColor from "./MainLayoutColor";
import { MAIN_LAYOUT_TEXT_SIZES } from "./MainLayoutTextSize";

export default function MainSearchInput({
  placeholder = "Search...",
  value,
  onChange,
  iconPosition = "right",
  className = "",
  containerClassName = "",
  ...props
}) {
  const isLeft = iconPosition === "left";
  const textToken = MAIN_LAYOUT_TEXT_SIZES.searchText;

  return (
    <div
      className={`relative flex items-center w-full min-w-0 ${containerClassName}`.trim()}
    >
      <MainLayoutColor
        as="input"
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        background="surface"
        border="cardBorder"
        borderHover="cardBorderHover"
        color="title"
        className={`w-full h-[34px] px-3.5 rounded-full ${textToken} placeholder:font-medium placeholder-[#8B8D97] focus:outline-none transition-all box-border ${
          isLeft ? "pl-9 pr-3.5" : "pr-9 pl-3.5"
        } ${className}`.trim()}
        {...props}
      />
      <div
        className={`absolute top-1/2 -translate-y-1/2 pointer-events-none flex items-center justify-center ${
          isLeft ? "left-3" : "right-3"
        }`}
      >
        <Search size={13} className="text-[#8B8D97]" />
      </div>
    </div>
  );
}