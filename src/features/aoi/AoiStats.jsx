import React from "react";
import { ScanSearch, CircleDot, Truck, Bell } from "lucide-react";
import { useAoiSummary } from "../../hooks/useAoiSummary";
import { MainStatsCard } from "../../components/Ui/MainLayoutUI/MainStatsCard";

const ACCENT_STYLES = {
  yellow: {
    iconWrap: "bg-[#FDBB24]/10 border border-[#FDBB24]/20",
    icon: "text-[#FDBB24]",
  },
  red: {
    iconWrap: "bg-[#ef4444]/10 border border-[#ef4444]/20",
    icon: "text-[#ef4444]",
  },
  orange: {
    iconWrap: "bg-[#f59e0b]/10 border border-[#f59e0b]/20",
    icon: "text-[#f59e0b]",
  },
  green: {
    iconWrap: "bg-[#10b981]/10 border border-[#10b981]/20",
    icon: "text-[#10b981]",
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
        const accent = ACCENT_STYLES[card.accent] || ACCENT_STYLES.yellow;

        return (
          <div key={card.id} className="min-w-0 h-full">
            <MainStatsCard
              value={isLoading && !summary ? "Loading..." : card.value}
              subtitle={card.subtitle}
              title={card.title}
              icon={card.icon}
              bgIcon={accent.iconWrap}
              colorIcon={accent.icon}
            />
          </div>
        );
      })}
    </div>
  );
}