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
            className="bg-[#16161a] border border-[#232329] rounded-lg px-3.5 py-3 flex flex-col justify-between hover:border-[#2e2e36] transition-all relative overflow-hidden group cursor-pointer w-full h-full min-h-[112px]"
          >
            <div className="flex-1 flex items-center min-h-0">
              <div className="flex items-center gap-4 min-w-0 w-full">
                <div className="w-8 h-8 rounded-md bg-[#FDBB24]/10 border border-[#FDBB24]/20 flex items-center justify-center shrink-0">
                  <Icon size={14} className="text-[#FDBB24]" />
                </div>

                {/* Value & Subtitle */}
                <div className="leading-none min-w-0">
                  <h2 className="text-[15px] font-bold text-zinc-100 tracking-tight leading-none">
                    {card.value}
                  </h2>
                  <p className="text-[10px] text-zinc-500 font-medium truncate mt-1 leading-none">
                    {card.subtitle}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between w-full pt-2.5 mt-2.5 border-t border-zinc-800/40 shrink-0">
              <span className="text-[10.5px] font-bold text-[#bfa141] tracking-wide leading-none truncate pr-1">
                {card.title}
              </span>

              {card.showArrow && (
                <ArrowRight
                  size={12}
                  className="text-[#bfa141] group-hover:translate-x-0.5 transition-transform stroke-[2.5] shrink-0"
                />
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
