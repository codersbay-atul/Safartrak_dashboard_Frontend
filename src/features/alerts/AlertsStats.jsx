import React from "react";
import { TriangleAlert, ShieldAlert, Bell, FileCheck } from "lucide-react";
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
  green: {
    iconWrap: "bg-[#10b981]/10 border border-[#10b981]/20",
    icon: "text-[#10b981]",
  },
};

const EMPTY_STATS = [
  {
    id: "total",
    icon: TriangleAlert,
    value: "-",
    subtitle: "-",
    title: "Total Alerts",
    accent: "red",
  },
  {
    id: "critical",
    icon: ShieldAlert,
    value: "-",
    subtitle: "Requires immediate attention",
    title: "Critical Alerts",
    accent: "red",
  },
  {
    id: "new",
    icon: Bell,
    value: "-",
    subtitle: "Not yet reviewed",
    title: "New Alerts",
    accent: "yellow",
  },
  {
    id: "resolved",
    icon: FileCheck,
    value: "-",
    subtitle: "Issues handled",
    title: "Resolved",
    accent: "green",
  },
];

export default function AlertsStats({ cards }) {
  const stats = Array.isArray(cards) && cards.length > 0 ? cards : EMPTY_STATS;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 w-full select-none shrink-0">
      {stats.map((card) => {
        const accent = ACCENT_STYLES[card.accent] || ACCENT_STYLES.yellow;

        return (
          <div key={card.id} className="min-w-0 h-full">
            <MainStatsCard
              value={card.value ?? "-"}
              subtitle={card.subtitle ?? "-"}
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