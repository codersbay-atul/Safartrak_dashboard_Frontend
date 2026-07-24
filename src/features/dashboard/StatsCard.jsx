import React from "react";
import { Truck, TriangleAlert, Wrench, Target, Ban } from "lucide-react";
import { StatCard } from "../../components/Ui/StatsCards";

const STATS_DATA = [
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
    id: "critical-alert",
    icon: TriangleAlert,
    value: "41",
    subtitle: "69% of Total Fleet",
    title: "Critical Alert",
    bgIcon: "bg-[#ffd60a]/10 border border-[#ffd60a]/20",
    colorIcon: "text-[#ffd60a]",
    showArrow: true,
  },
  {
    id: "maintenance-due",
    icon: Wrench,
    value: "6",
    subtitle: "6% of Total Fleet",
    title: "Maintenance Due",
    bgIcon: "bg-[#ffd60a]/10 border border-[#ffd60a]/20",
    colorIcon: "text-[#ffd60a]",
    showArrow: true,
  },
  {
    id: "prediction-accuracy",
    icon: Target,
    value: "94%",
    subtitle: "Need Attention",
    title: "Prediction Accuracy",
    bgIcon: "bg-[#ffd60a]/10 border border-[#ffd60a]/20",
    colorIcon: "text-[#ffd60a]",
    showArrow: true,
  },
  {
    id: "no-gps",
    icon: Ban,
    value: "3",
    subtitle: "Last Sync: 12 sec ago",
    title: "No GPS",
    bgIcon: "bg-[#0c1a30] border border-[#14325c]",
    colorIcon: "text-[#3b82f6]",
    showArrow: true,
  },
];

export default function StatsCard() {
  return (
    <div className="grid grid-cols-[repeat(5,minmax(0,1fr))] gap-2 mt-0 pt-0 select-none w-full shrink-0">
      {STATS_DATA.map((card) => (
        <div key={card.id} className="min-h-[112px] [&>*]:h-full">
          <StatCard {...card} />
        </div>
      ))}
    </div>
  );
}
