import React from "react";
import { Truck, Ban } from "lucide-react";
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
    id: "active",
    isDot: true,
    dotColor: "bg-[#00b4d8]",
    value: "41",
    subtitle: "69% of Total Fleet",
    title: "Active",
    bgIcon: "bg-[#032d1d] border border-[#054d31]",
    colorIcon: "text-[#10b981]",
    showArrow: true,
  },
  {
    id: "idle",
    isDot: true,
    dotColor: "bg-[#ffb703]",
    value: "12",
    subtitle: "20% of Total Fleet",
    title: "Idle",
    bgIcon: "bg-[#2d2203] border border-[#4d3a05]",
    colorIcon: "text-[#f59e0b]",
    showArrow: true,
  },
  {
    id: "offline",
    isDot: true,
    dotColor: "bg-[#ef4444]",
    value: "3",
    subtitle: "Need Attention",
    title: "Offline",
    bgIcon: "bg-[#2d0505] border border-[#4d0b0b]",
    colorIcon: "text-[#ef4444]",
    showArrow: true,
  },
  {
    id: "no-gps",
    icon: Ban,
    value: "3",
    subtitle: "Last Sync: 12s ago",
    title: "No GPS",
    bgIcon: "bg-[#0c1a30] border border-[#14325c]",
    colorIcon: "text-[#3b82f6]",
    showArrow: true,
  },
];

export default function StatsCard() {
  return (
    <div className="grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-3 lg:grid-cols-5 gap-2 mt-0 pt-0 select-none w-full shrink-0">
      {STATS_DATA.map((card) => (
        <StatCard key={card.id} {...card} />
      ))}
    </div>
  );
}