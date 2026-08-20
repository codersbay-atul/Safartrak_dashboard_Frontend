import { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";

export default function Dropdown({
  label,
  options = [], 
  selectedValue,
  onSelect,
  className = ""
}) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

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
        className={`w-full sm:w-auto flex items-center justify-between gap-2 h-8 sm:h-9 px-3 text-[11px] sm:text-[12px] rounded-full bg-[#05070B] border border-[#22252B] text-[#d4d4d8] hover:border-[#FDBB24]/40 hover:text-white transition-colors cursor-pointer focus:outline-none ${className}`}
      >
        <span>{currentLabel}</span>
        <ChevronDown size={12} className={`text-[#8B8D97] transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-1.5 w-full sm:w-44 bg-[#0f1115] border border-[#22252B] rounded-xl shadow-2xl overflow-hidden z-50 animate-in fade-in duration-100">
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