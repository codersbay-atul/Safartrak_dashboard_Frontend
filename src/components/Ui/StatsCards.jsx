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
  sideMetrics = [],
  onClick,
}) => {
  return (
    <div
      onClick={onClick}
      className="bg-[#121214] border border-[#1d1d20] rounded-lg px-3.5 py-3 flex flex-col justify-between hover:border-[#27272a] transition-all relative overflow-hidden group cursor-pointer w-full h-full min-h-[112px]"
    >
      {/* Top Section */}
      <div className="flex-1 flex items-center min-h-0">
        <div className="flex items-center justify-between gap-2 min-w-0 w-full">
          <div className="flex items-center gap-4 min-w-0">
            <div className={`w-8 h-8 rounded-md ${bgIcon || "bg-[#ffd60a]/10 border border-[#ffd60a]/20"} flex items-center justify-center shrink-0`}>
              {isDot ? (
                <span className={`w-1.5 h-1.5 rounded-full ${dotColor}`} />
              ) : (
                Icon && <Icon size={14} className={colorIcon || "text-[#ffd60a]"} />
              )}
            </div>

            <div className="leading-none min-w-0">
              <h2 className="text-[16px] font-bold text-white tracking-tight leading-none">
                {value}
              </h2>
              <p className="text-[12px] font-medium text-[#71717a] truncate whitespace-nowrap mt-1 leading-none">
                {subtitle}
              </p>
            </div>
          </div>

          {sideMetrics.length > 0 && (
            <div className="flex flex-col gap-0.5 shrink-0">
              {sideMetrics.map((metric) => (
                <div
                  key={metric.label}
                  className="flex items-center gap-1 justify-end"
                >
                  <span
                    className={`w-1.5 h-1.5 rounded-sm shrink-0 ${metric.color}`}
                  />
                  <span className="text-[8px] text-[#71717a] whitespace-nowrap">
                    {metric.label}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Footer Section */}
      <div className="flex items-center justify-between w-full pt-2.5 mt-2.5 border-t border-[#1d1d20]/30 shrink-0">
        <span className="text-[14px] font-semibold text-[#a16207] tracking-wide leading-none truncate pr-1">
          {title}
        </span>

        {showArrow && (
          <ArrowRight
            size={10}
            className="text-[#a16207] group-hover:translate-x-0.5 transition-transform shrink-0"
          />
        )}
      </div>
    </div>
  );
};
