import React, { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import MainLayoutColor from "./MainLayoutColor";
import MainLayoutTextSize from "./MainLayoutTextSize";

const SLIDE_MS = 220;
const WIDTH_EXTRA_PX = 5;

function LabelWidthLock({ texts = [], size, extraPx = WIDTH_EXTRA_PX, children }) {
  const uniqueTexts = [...new Set(texts.filter(Boolean).map((text) => String(text)))];

  return (
    <span className="grid w-max shrink-0 justify-items-start">
      {uniqueTexts.map((text) => (
        <MainLayoutTextSize
          key={text}
          size={size}
          aria-hidden="true"
          className="invisible col-start-1 row-start-1 whitespace-nowrap font-semibold"
          style={{ paddingRight: extraPx }}
        >
          {text}
        </MainLayoutTextSize>
      ))}
      <span className="col-start-1 row-start-1 min-w-0 truncate">{children}</span>
    </span>
  );
}

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
  menuAlign = "right",
}) {
  const [internalIsOpen, setInternalIsOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
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

  const toggleDropdown = () => {
    if (isControlled) {
      onClose?.();
    } else {
      setInternalIsOpen((previous) => !previous);
    }
  };

  if (isOpen && !isMounted) {
    setIsMounted(true);
  }

  useEffect(() => {
    if (isOpen) {
      let innerFrame = 0;
      const outerFrame = requestAnimationFrame(() => {
        innerFrame = requestAnimationFrame(() => setIsVisible(true));
      });
      return () => {
        cancelAnimationFrame(outerFrame);
        cancelAnimationFrame(innerFrame);
      };
    }

    const hideFrame = requestAnimationFrame(() => setIsVisible(false));
    const timeout = setTimeout(() => setIsMounted(false), SLIDE_MS);
    return () => {
      cancelAnimationFrame(hideFrame);
      clearTimeout(timeout);
    };
  }, [isOpen]);

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
  const optionLabels = options.map((option) => option.label);
  const widthLockLabels = [label, ...optionLabels];

  const trigger = customTrigger || (
    <MainLayoutColor
      as="button"
      type="button"
      background="dropdownBg"
      border="dropdownBorder"
      borderHover="dropdownBorderHover"
      color="dropdownText"
      onClick={toggleDropdown}
      className={`w-full flex items-center justify-between gap-2 h-8 sm:h-9 px-3 rounded-full hover:text-white transition-colors cursor-pointer focus:outline-none ${className}`.trim()}
    >
      <LabelWidthLock texts={widthLockLabels} size="dropdownText">
        <MainLayoutTextSize size="dropdownText" className="block truncate">
          {currentLabel}
        </MainLayoutTextSize>
      </LabelWidthLock>

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

  const menuContent = children || (
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
            className={`w-full text-left px-3 py-2 transition-colors cursor-pointer block whitespace-nowrap hover:text-white ${
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
  );

  return (
    <div className="relative inline-block w-full sm:w-max" ref={dropdownRef}>
      {trigger}

      {/* Previous fade-in menu (no slide, unmounted immediately on close)
      {isOpen && (
        <MainLayoutColor
          as="div"
          background={customTrigger ? "surface" : "dropdownMenuBg"}
          border="dropdownMenuBorder"
          className={`absolute ${menuAlign === "left" ? "left-0" : "right-0"} mt-1.5 w-full sm:w-44 rounded-xl shadow-2xl overflow-hidden z-50 animate-in fade-in duration-100 ${customTrigger ? className : ""}`.trim()}
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
      */}

      {isMounted && (
        <MainLayoutColor
          as="div"
          background={customTrigger ? "surface" : "dropdownMenuBg"}
          border="dropdownMenuBorder"
          className={`dropdown-menu-panel absolute mt-1.5 rounded-xl shadow-2xl overflow-hidden z-50 ${
            customTrigger
              ? `${menuAlign === "left" ? "left-0" : "right-0"}`
              : "left-0 right-0 w-full"
          } ${
            isVisible ? "is-open" : "is-closing"
          } ${customTrigger ? className : ""}`.trim()}
        >
          {menuContent}
        </MainLayoutColor>
      )}
    </div>
  );
}
