import React from "react";
import { Truck, Gauge, Clock, Route, Timer, ArrowRight } from "lucide-react";

const cards = [
  {
    id: "trip-progress",
    icon: Truck,
    value: "72%",
    subtitle: "118 km Remaining",
    title: "Trip Progress",
    bgIcon: "bg-[#FDBB24]/10 border border-[#FDBB24]/20",
    colorIcon: "text-[#FDBB24]",
    showArrow: false,
  },
  {
    id: "current-speed",
    icon: Gauge,
    value: "52 km/h",
    subtitle: "Average: 48 km/h",
    title: "Current Speed",
    bgIcon: "bg-[#FDBB24]/10 border border-[#FDBB24]/20",
    colorIcon: "text-[#FDBB24]",
    showArrow: true,
  },
  {
    id: "eta",
    icon: Clock,
    value: "1h 24m",
    subtitle: "Expected at 11:25 AM",
    title: "ETA",
    bgIcon: "bg-[#FDBB24]/10 border border-[#FDBB24]/20",
    colorIcon: "text-[#FDBB24]",
    showArrow: true,
  },
  {
    id: "distance-travelled",
    icon: Route,
    value: "186 km",
    subtitle: "118 km Remaining",
    title: "Distance Travelled",
    bgIcon: "bg-[#FDBB24]/10 border border-[#FDBB24]/20",
    colorIcon: "text-[#FDBB24]",
    showArrow: true,
  },
  {
    id: "trip-duration",
    icon: Timer,
    value: "2h 18m",
    subtitle: "Started at 08:42 AM",
    title: "Trip Duration",
    bgIcon: "bg-[#FDBB24]/10 border border-[#FDBB24]/20",
    colorIcon: "text-[#FDBB24]",
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
         
            <div className="flex items-center gap-1.5 min-w-0">
              <div className={`w-7 h-7 rounded-md ${card.bgIcon} flex items-center justify-center shrink-0`}>
                <Icon size={12} className={card.colorIcon} />
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

           
            <div className="flex items-center justify-between w-full pt-1 mt-1 border-t border-[#1d1d20]/30">
              <span className="text-[9px] font-semibold text-[#bfa141] tracking-wide">
                {card.title}
              </span>

              {card.showArrow && (
                <ArrowRight
                  size={10}
                  className="text-[#bfa141] group-hover:translate-x-0.5 transition-transform"
                />
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}