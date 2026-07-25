import React from "react";
import { ArrowRight } from "lucide-react";

export const StatCard = ({
  value,
  subtitle,
  title,
  bottomLabel,
  bgIcon = "bg-[#ffd60a]/10 border border-[#ffd60a]/20",
  colorIcon = "text-[#ffd60a]",
  icon: Icon,
  isDot = false,
  dotColor = "",
  showArrow = false,
  sideMetrics = [],
  onClick,
}) => {
  // 1. Vehicle Cards ke liye bottomLabel aur Baaki Cards ke liye title fallback
  const footerText = bottomLabel || title;

  return (
    <div
      onClick={onClick}
      className="bg-[#121214] border border-[#1d1d20] rounded-xl p-2.5 flex flex-col justify-between hover:border-[#27272a] transition-all relative overflow-hidden group cursor-pointer w-full h-full min-h-[76px]"
    >
      {/* Top Section: Icon + Value + Subtitle + Side Metrics */}
      <div className="flex-1 flex items-center min-h-0">
        <div className="flex items-center justify-between gap-1.5 min-w-0 w-full">
          
          {/* Left: Icon & Text */}
          <div className="flex items-center gap-2 min-w-0">
            {/* Dynamic Icon Container (Har card ka alag color background support karta hai) */}
            <div
              className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 transition-colors ${bgIcon}`}
            >
              {isDot ? (
                <span className={`w-2 h-2 rounded-full ${dotColor}`} />
              ) : (
                Icon && <Icon size={14} className={colorIcon} />
              )}
            </div>

            {/* Value & Subtitle */}
            <div className="leading-tight min-w-0">
              <h2 className="text-[13px] sm:text-[14px] font-bold text-white tracking-tight truncate">
                {value}
              </h2>
              <p className="text-[10px] text-[#71717a] truncate mt-0.5">
                {subtitle}
              </p>
            </div>
          </div>

          {/* Right: Side Metrics (Aapke Dashboard 'Total Vehicles' wale card ke liye) */}
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
                  <span className="text-[10px] text-[#71717a] whitespace-nowrap">
                    {metric.label}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Bottom Section: Label / Title & Arrow Icon */}
      {footerText && (
        <div className="flex items-center justify-between w-full pt-1.5 mt-1 border-t border-[#1d1d20]/40 shrink-0">
          <span className="text-[12px] font-medium text-[#ffd60a] tracking-wide truncate">
            {footerText}
          </span>

          {showArrow && (
            <ArrowRight
              size={12}
              className="text-[#ffd60a] group-hover:translate-x-0.5 transition-transform shrink-0"
            />
          )}
        </div>
      )}
    </div>
  );
};
