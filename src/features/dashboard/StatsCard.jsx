import React from "react";
import { Truck, TriangleAlert, Wrench, Target } from "lucide-react";
import { StatCard } from "../../components/Ui/StatsCards";

const STATS_DATA = [
  {
    id: "total",
    icon: Truck,
    value: "59",
    subtitle: "56 Active",
    title: "Total Vehicles",
    bgIcon: "bg-[#ffd60a]/10 border border-[#ffd60a]/20",
    colorIcon: "text-[#ffd60a]",
    showArrow: false,
    sideMetrics: [
      { color: "bg-[#3b82f6]", label: "4 Today" },
      { color: "bg-[#10b981]", label: "56 Active" },
      { color: "bg-[#71717a]", label: "3 Offline" },
    ],
  },
  {
    id: "critical-alert",
    icon: TriangleAlert,
    value: "2,417",
    subtitle: "59+ more than last week",
    title: "Critical Alert",
    bgIcon: "bg-[#2d0505] border border-[#4d0b0b]",
    colorIcon: "text-[#ef4444]",
    showArrow: true,
  },
  {
    id: "maintenance-due",
    icon: Wrench,
    value: "6",
    subtitle: "2 Scheduled • 2 Overdue",
    title: "Maintenance Due",
    bgIcon: "bg-[#2d2203] border border-[#4d3a05]",
    colorIcon: "text-[#f59e0b]",
    showArrow: true,
  },
  {
    id: "prediction-accuracy",
    icon: Target,
    value: "94%",
    subtitle: "2,147 Predictions",
    title: "Prediction Accuracy",
    bgIcon: "bg-[#0c1a30] border border-[#14325c]",
    colorIcon: "text-[#3b82f6]",
    showArrow: true,
  },
];

export default function StatsCard() {
  return (
    <div className="grid grid-cols-[repeat(4,minmax(0,1fr))] gap-2 mt-0 pt-0 select-none w-full shrink-0">
      {STATS_DATA.map((card) => (
        <div key={card.id} className="min-h-[72px] [&>*]:h-full">
          <StatCard {...card} />
        </div>
      ))}
    </div>
  );
}
