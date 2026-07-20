import React from "react";
import { Truck, ArrowRight, Ban } from "lucide-react";

const cards = [
  {
    id: "total",
    icon: Truck,
    value: "59",
    subtitle: "56 Active Vehicles",
    title: "Total Vehicles",
    bgIcon: "bg-[#ffd60a]/10 border border-[#ffd60a]/20",
    colorIcon: "text-[#ffd60a]",
    showArrow: false,
  },
  {
    id: "active",
    isDot: true,
    dotColor: "bg-[#00b4d8]",
    value: "41",
    subtitle: "69% of Total Fleet",
    title: "Active",
    bgIcon: "bg-[#032d1d] border border-[#054d31]",
    colorIcon: "text-[#10b981]",
    showArrow: true,
  },
  {
    id: "idle",
    isDot: true,
    dotColor: "bg-[#ffb703]",
    value: "12",
    subtitle: "20% of Total Fleet",
    title: "Idle",
    bgIcon: "bg-[#2d2203] border border-[#4d3a05]",
    colorIcon: "text-[#f59e0b]",
    showArrow: true,
  },
  {
    id: "offline",
    isDot: true,
    dotColor: "bg-[#ef4444]",
    value: "3",
    subtitle: "Need Attention",
    title: "Offline",
    bgIcon: "bg-[#2d0505] border border-[#4d0b0b]",
    colorIcon: "text-[#ef4444]",
    showArrow: true,
  },
  {
    id: "no-gps",
    icon: Ban,
    value: "3",
    subtitle: "Last Sync: 12s ago",
    title: "No GPS",
    bgIcon: "bg-[#0c1a30] border border-[#14325c]",
    colorIcon: "text-[#3b82f6]",
    showArrow: true,
  },
];

export default function StatsCards() {
  return (
    <div className="grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-3 lg:grid-cols-5 gap-2 mt-0 pt-0 select-none w-full shrink-0">
      {cards.map((card, index) => {
        const Icon = card.icon;

        return (
          <div
            key={index}
            className="bg-[#121214] border border-[#1d1d20] rounded-lg p-2 flex flex-col justify-between hover:border-[#27272a] transition-all relative overflow-hidden group cursor-pointer w-full"
          >
            {/* Top Row */}
            <div className="flex items-center gap-1.5 min-w-0">
              <div className={`w-7 h-7 rounded-md ${card.bgIcon} flex items-center justify-center shrink-0`}>
                {card.isDot ? (
                  <span className={`w-1.5 h-1.5 rounded-full ${card.dotColor}`} />
                ) : (
                  <Icon size={12} className={card.colorIcon} />
                )}
              </div>

              <div className="leading-none min-w-0">
                <h2 className="text-[14px] font-bold text-white tracking-tight">
                  {card.value}
                </h2>
                <p className="text-[8.5px] text-[#71717a] truncate mt-0.5">
                  {card.subtitle}
                </p>
              </div>
            </div>

            {/* Footer Row */}
            <div className="flex items-center justify-between w-full pt-1 mt-1 border-t border-[#1d1d20]/30">
              <span className="text-[9px] font-semibold text-[#a16207] tracking-wide">
                {card.title}
              </span>

              {card.showArrow && (
                <ArrowRight
                  size={10}
                  className="text-[#a16207] group-hover:translate-x-0.5 transition-transform"
                />
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}