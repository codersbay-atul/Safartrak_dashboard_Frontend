import React from "react";
import { ScanSearch, CircleDot, Truck, Bell } from "lucide-react";
import { useSavedPlacesSummary } from "../../hooks/useSavedPlacesSummary";
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
  total_places: 0,
  inactive_places: 0,
  vehicles_covered: 0,
  alerts_today: 0,
};

export default function SavedPlacesStats() {
  const { summary, isLoading } = useSavedPlacesSummary();
  const data = summary && typeof summary === "object" ? summary : DEFAULT_SUMMARY;

  const cards = [
    {
      id: "total",
      icon: ScanSearch,
      value: data.total_places,
      subtitle: `${data.inactive_places} inactive`,
      title: "Total Saved Places",
      accent: "red",
    },
    {
      id: "Inactive",
      icon: CircleDot,
      value: data.inactive_places,
      subtitle: "Monitoring enabled",
      title: "Inactive Places",
      accent: "orange",
    },
    {
      id: "vehicles",
      icon: Truck,
      value: data.vehicles_covered,
      subtitle: "Across all Saved Places",
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
    <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-3 min-[1152px]:gap-3.5 xl:gap-4 w-full min-w-0 select-none shrink-0">
      {cards.map((card) => {
        const accent = ACCENT_STYLES[card.accent] || ACCENT_STYLES.yellow;

        return (
          <div
            key={card.id}
            className="min-w-0 h-full min-h-[96px] sm:min-h-[112px] xl:min-h-[124px]"
          >
            <MainStatsCard
              value={isLoading && !summary ? "Loading..." : card.value}
              subtitle={card.subtitle}
              title={card.title}
              icon={card.icon}
              bgIcon={accent.iconWrap}
              colorIcon={accent.icon}
              padding="p-2.5 sm:p-3 min-[1152px]:p-3.5 xl:p-4"
              footerSpacing="pt-2 mt-1.5 sm:pt-2.5 sm:mt-2"
            />
          </div>
        );
      })}
    </div>
  );
}