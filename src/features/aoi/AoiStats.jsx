import React from "react";
import { ScanSearch, CircleDot, Truck, Bell } from "lucide-react";
import { useAoiSummary } from "../../hooks/useAoiSummary";

const ACCENT_STYLES = {
  yellow: {
    iconWrap: "bg-[#FDBB24]/10 border border-[#FDBB24]/20",
    icon: "text-[#FDBB24]",
    title: "text-[#bfa141]",
  },
  red: {
    iconWrap: "bg-[#ef4444]/10 border border-[#ef4444]/20",
    icon: "text-[#ef4444]",
    title: "text-[#ef4444]",
  },
  orange: {
    iconWrap: "bg-[#f59e0b]/10 border border-[#f59e0b]/20",
    icon: "text-[#f59e0b]",
    title: "text-[#f59e0b]",
  },
  green: {
    iconWrap: "bg-[#10b981]/10 border border-[#10b981]/20",
    icon: "text-[#10b981]",
    title: "text-[#10b981]",
  },
};

const DEFAULT_SUMMARY = {
  total_aois: 0,
  active_aois: 0,
  inactive_aois: 0,
  vehicles_covered: 0,
  alerts_today: 0,
};

export default function AoiStats() {
  const { summary, isLoading } = useAoiSummary();
  const data = summary && typeof summary === "object" ? summary : DEFAULT_SUMMARY;

  const cards = [
    {
      id: "total",
      icon: ScanSearch,
      value: data.total_aois,
      subtitle: `${data.inactive_aois} Inactive`,
      title: "Total Saved Places",
      accent: "red",
    },
    {
      id: "active",
      icon: CircleDot,
      value: data.active_aois,
      subtitle: "Monitoring enabled",
      title: "Active Places",
      accent: "orange",
    },
    {
      id: "vehicles",
      icon: Truck,
      value: data.vehicles_covered,
      subtitle: "Across all AOIs",
      title: "Vehicles Covered",
      accent: "yellow",
    },
    {
      id: "alerts",
      icon: Bell,
      value: data.alerts_today,
      subtitle: "Entry & exit events",
      title: "Alerts Today",
      accent: "green",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 w-full select-none shrink-0">
      {cards.map((card) => {
        const Icon = card.icon;
        const accent = ACCENT_STYLES[card.accent] || ACCENT_STYLES.yellow;

        return (
          <div
            key={card.id}
            className="bg-[#16161a] border border-[#232329] rounded-xl p-3 flex flex-col justify-between hover:border-[#2e2e36] transition-all relative overflow-hidden group cursor-pointer w-full min-h-[76px]"
          >
            <div className="flex items-center gap-3">
              <div
                className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${accent.iconWrap}`}
              >
                <Icon size={16} className={accent.icon} />
              </div>

              <div className="leading-tight min-w-0">
                <h2 className="text-[15px] font-bold text-zinc-100 tracking-tight">
                  {isLoading && !summary ? "Loading..." : card.value}
                </h2>
                <p className="text-[10px] text-zinc-500 font-medium truncate mt-0.5">
                  {card.subtitle}
                </p>
              </div>
            </div>

            <div className="flex items-center justify-between w-full pt-2 mt-3 border-t border-zinc-800/40">
              <span
                className={`text-[10.5px] font-bold tracking-wide ${accent.title}`}
              >
                {card.title}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
