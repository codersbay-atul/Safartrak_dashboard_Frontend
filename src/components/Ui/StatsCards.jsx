import React from "react";
import { ArrowRight } from "lucide-react";

export const StatCard = ({
  value,
  subtitle,
  title,
  bgIcon = "",
  colorIcon = "",
  icon: Icon,
  isDot = false,
  dotColor = "",
  showArrow = false,
  onClick,
}) => {
  return (
    <div
      onClick={onClick}
      className="bg-[#121214] border border-[#1d1d20] rounded-lg p-2 flex flex-col justify-between hover:border-[#27272a] transition-all relative overflow-hidden group cursor-pointer w-full"
    >
      {/* Top Section */}
      <div className="flex items-center gap-1.5 min-w-0">
        <div
          className={`w-7 h-7 rounded-md ${bgIcon} flex items-center justify-center shrink-0`}
        >
          {isDot ? (
            <span className={`w-1.5 h-1.5 rounded-full ${dotColor}`} />
          ) : (
            Icon && <Icon size={12} className={colorIcon} />
          )}
        </div>

        <div className="leading-none min-w-0">
          <h2 className="text-[14px] font-bold text-white tracking-tight">
            {value}
          </h2>
          <p className="text-[8.5px] text-[#71717a] truncate mt-0.5">
            {subtitle}
          </p>
        </div>
      </div>

      {/* Footer Section */}
      <div className="flex items-center justify-between w-full pt-1 mt-1 border-t border-[#1d1d20]/30">
        <span className="text-[9px] font-semibold text-[#a16207] tracking-wide">
          {title}
        </span>

        {showArrow && (
          <ArrowRight
            size={10}
            className="text-[#a16207] group-hover:translate-x-0.5 transition-transform"
          />
        )}
      </div>
    </div>
  );
};