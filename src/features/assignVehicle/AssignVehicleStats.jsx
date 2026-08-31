import React from "react";
import { Clock, Truck, Thermometer } from "lucide-react";
import { MainStatsCard } from "../../components/Ui/MainLayoutUI/MainStatsCard";

const ACCENT_STYLES = {
  yellow: {
    iconWrap: "bg-[#FDBB24]/10 border border-[#FDBB24]/20",
    icon: "text-[#FDBB24]",
  },
  green: {
    iconWrap: "bg-[#10b981]/10 border border-[#10b981]/20",
    icon: "text-[#10b981]",
  },
};

function buildCards(summary, { isLoading = false } = {}) {
  const values = summary ?? {};
  const valueOrLoading = (formatted) => (isLoading ? "Loading..." : formatted);
  console.log(values);

  return [
    {
      id: "trip-count",
      icon: Clock,
      value: valueOrLoading(values.tripCount),
      subtitle: "Completed trips",
      title: "No. of Trips",
      accent: "yellow",
    },
    {
      id: "total-km",
      icon: Truck,
      value: valueOrLoading(values.totalKm),
      subtitle: "Distance covered",
      title: "Total KM",
      accent: "yellow",
    },
    {
      id: "temp-compliance",
      icon: Thermometer,
      value: valueOrLoading(values.tempCompliancePct),
      subtitle: "Within safe range",
      title: "Temp Compliance",
      accent: "green",
    },
  ];
}

export default function AssignVehicleStats({
  summary = {},
  isLoading = false,
}) {
  const cards = buildCards(summary, { isLoading });

  return (
    <div className="flex flex-col gap-3 w-full shrink-0 min-w-0">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 min-[1152px]:gap-3.5 xl:gap-4 mt-0 pt-0 select-none w-full shrink-0">
        {cards.map((card) => {
          const accent = ACCENT_STYLES[card.accent] || ACCENT_STYLES.yellow;

          return (
            <div
              key={card.id}
              className="min-w-0 h-full min-h-[112px] xl:min-h-[124px] [&>*]:h-full"
            >
              <MainStatsCard
                value={card.value}
                subtitle={card.subtitle}
                title={card.title}
                icon={card.icon}
                bgIcon={accent.iconWrap}
                colorIcon={accent.icon}
                showArrow={false}
                padding="p-3 min-[1152px]:p-3.5 xl:p-4"
                footerSpacing="pt-2.5 mt-2"
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
