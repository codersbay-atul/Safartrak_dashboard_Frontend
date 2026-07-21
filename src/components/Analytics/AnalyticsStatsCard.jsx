import React from "react";
import { Truck, Gauge, Clock, Route, Timer, ArrowRight } from "lucide-react";

const cards = [
  {
    id: "trip-progress",
    icon: Truck,
    value: "3,248 km",
    subtitle: "+8.4% vs previous period",
    title: "Fleet Distance",
    showArrow: false,
  },
  {
    id: "current-speed",
    icon: Gauge,
    value: "186 hrs",
    subtitle: "+5.2% vs previous period",
    title: "Running Time",
    showArrow: true,
  },
  {
    id: "eta",
    icon: Clock,
    value: "42 hrs",
    subtitle: "-12% vs previous period",
    title: "Idle Time",
    showArrow: true,
  },
  {
    id: "distance-travelled",
    icon: Route,
    value: "18 hrs",
    subtitle: "-4.8% vs previous period",
    title: "Halt Time",
    showArrow: true,
  },
  {
    id: "trip-duration",
    icon: Timer,
    value: "2h 18m",
    subtitle: "Started at 08:42 AM",
    title: "Trip Duration",
    showArrow: true,
  },
];

export default function AnalyticsStatsCard() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2.5 mt-0 pt-0 select-none w-full">
      {cards.map((card, index) => {
        const Icon = card.icon;

        return (
          <div
            key={index}
            className="bg-[#16161a] border border-[#232329] rounded-xl p-3 flex flex-col justify-between hover:border-[#2e2e36] transition-all relative overflow-hidden group cursor-pointer w-full"
          >
          
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-[#FDBB24]/10 border border-[#FDBB24]/20 flex items-center justify-center shrink-0">
                <Icon size={16} className="text-[#FDBB24]" />
              </div>

              {/* Value & Subtitle */}
              <div className="leading-tight min-w-0">
                <h2 className="text-[15px] font-bold text-zinc-100 tracking-tight">
                  {card.value}
                </h2>
                <p className="text-[10px] text-zinc-500 font-medium truncate mt-0.5">
                  {card.subtitle}
                </p>
              </div>
            </div>

        
            <div className="flex items-center justify-between w-full pt-2 mt-3 border-t border-zinc-800/40">
              <span className="text-[10.5px] font-bold text-[#bfa141] tracking-wide">
                {card.title}
              </span>

              {card.showArrow && (
                <ArrowRight
                  size={12}
                  className="text-[#bfa141] group-hover:translate-x-0.5 transition-transform stroke-[2.5]"
                />
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}