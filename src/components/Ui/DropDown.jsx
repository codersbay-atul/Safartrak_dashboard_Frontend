import React, { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";

export default function Dropdown({
  label,
  options = [], // [{ label: 'All Vehicles', value: 'all' }]
  selectedValue,
  onSelect,
  className = ""
}) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Bahar click karne par dropdown select layer close ho jayegi
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const currentLabel = options.find(opt => opt.value === selectedValue)?.label || label;

  return (
    <div className="relative inline-block w-full sm:w-auto" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full sm:w-auto flex items-center justify-between gap-4 px-3 py-1 text-[10.5px] rounded-2xl bg-[#18181b]/40 border border-[#27272a] text-[#d4d4d8] hover:border-zinc-600 transition-colors cursor-pointer focus:outline-none ${className}`}
      >
        <span>{currentLabel}</span>
        <ChevronDown size={12} className={`text-[#71717a] transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-1.5 w-full sm:w-44 bg-[#16161a] border border-[#232329] rounded-xl shadow-2xl overflow-hidden z-50 animate-in fade-in duration-100">
          <div className="py-1">
            {options.map((option) => (
              <button
                key={option.value}
                onClick={() => {
                  onSelect(option.value);
                  setIsOpen(false);
                }}
                className={`w-full text-left px-3 py-1.5 text-[10.5px] transition-colors cursor-pointer
                  ${option.value === selectedValue 
                    ? "bg-[#FDBB24]/10 text-[#FDBB24] font-semibold" 
                    : "text-[#a1a1aa] hover:bg-[#18181b] hover:text-white"
                  }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}