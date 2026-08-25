import React, { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import MainLayoutColor from "./MainLayoutColor";
import MainLayoutTextSize from "./MainLayoutTextSize";

export default function MainDropDown({
  label,
  options = [],
  selectedValue,
  onSelect,
  className = "",
  children,
  customTrigger,
  isOpen: controlledIsOpen,
  onClose,
}) {
  const [internalIsOpen, setInternalIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const isControlled = controlledIsOpen !== undefined;
  const isOpen = isControlled ? controlledIsOpen : internalIsOpen;

  const closeDropdown = () => {
    if (isControlled) {
      onClose?.();
    } else {
      setInternalIsOpen(false);
    }
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        if (isControlled) {
          onClose?.();
        } else {
          setInternalIsOpen(false);
        }
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isControlled, onClose]);

  const currentLabel =
    options.find((opt) => opt.value === selectedValue)?.label || label;

  const trigger = customTrigger || (
    <MainLayoutColor
      as="button"
      type="button"
      background="dropdownBg"
      border="dropdownBorder"
      borderHover="dropdownBorderHover"
      color="dropdownText"
      onClick={() =>
        isControlled
          ? onClose?.()
          : setInternalIsOpen((previous) => !previous)
      }
      className={`w-full sm:w-auto flex items-center justify-between gap-2 h-8 sm:h-9 px-3 rounded-full hover:text-white transition-colors cursor-pointer focus:outline-none ${className}`.trim()}
    >
      <MainLayoutTextSize size="dropdownText" className="truncate">
        {currentLabel}
      </MainLayoutTextSize>

      <MainLayoutColor
        as={ChevronDown}
        color="dropdownIcon"
        size={13}
        className={`shrink-0 transition-transform duration-200 ${
          isOpen ? "rotate-180" : ""
        }`}
      />
    </MainLayoutColor>
  );

  return (
    <div className="relative inline-block w-full sm:w-auto" ref={dropdownRef}>
      {trigger}

      {isOpen && (
        <MainLayoutColor
          as="div"
          background={customTrigger ? "surface" : "dropdownMenuBg"}
          border="dropdownMenuBorder"
          className={`absolute right-0 mt-1.5 w-full sm:w-44 rounded-xl shadow-2xl overflow-hidden z-50 animate-in fade-in duration-100 ${customTrigger ? className : ""}`.trim()}
        >
          {children || (
            <div className="py-1">
              {options.map((option) => {
                const isSelected = option.value === selectedValue;
                return (
                  <MainLayoutColor
                    key={option.value}
                    as="button"
                    type="button"
                    background={isSelected ? "dropdownOptionActiveBg" : "transparent"}
                    color={isSelected ? "dropdownOptionActiveText" : "dropdownOptionText"}
                    onClick={() => {
                      onSelect(option.value);
                      closeDropdown();
                    }}
                    className={`w-full text-left px-3 py-2 transition-colors cursor-pointer block truncate hover:text-white ${
                      isSelected ? "font-semibold" : "hover:bg-[#18181b]"
                    }`.trim()}
                  >
                    <MainLayoutTextSize size="dropdownOptionText" className="block truncate">
                      {option.label}
                    </MainLayoutTextSize>
                  </MainLayoutColor>
                );
              })}
            </div>
          )}
        </MainLayoutColor>
      )}
    </div>
  );
}