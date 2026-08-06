import { Truck, TriangleAlert, Circle, CircleSmall, LocateOff } from "lucide-react";
import { StatCard } from "../../components/Ui/StatsCards";
import { useDashboardSummary } from "../../hooks/useDashboardSummary";
import { useNavigate } from "react-router-dom";
import {
  DASHBOARD_SUMMARY_PLACEHOLDER,
  mapDashboardSummary,
} from "./mapDashboardSummary";

const VALUE_SKELETON = (
  <span
    className="inline-block h-3.5 w-8 rounded bg-zinc-700/80 animate-pulse align-middle"
    aria-hidden="true"
  />
);

function buildStatsData(summary, { isLoading = false } = {}) {
  const values = summary ?? DASHBOARD_SUMMARY_PLACEHOLDER;

  const valueOrSkeleton = (value) => (isLoading ? VALUE_SKELETON : value);

  return [
    {
      id: "total",
      icon: Truck,
      value: valueOrSkeleton(values.totalVehicles),
      subtitle:
        values.activeVehicles === "-"
          ? "Active Vehicles"
          : `${values.activeVehicles} Active Vehicles`,
      title: "Total Vehicles",
      bgIcon: "bg-[#3B2A00]",
      colorIcon: "text-[#ffd60a]",
      showArrow: false,
    },
    {
      id: "active_vehicles",
      icon: Circle,
      value: valueOrSkeleton(values.activeVehicles),
      subtitle: "69% of Total Fleet",
      title: "Active Vehicle",
      bgIcon: "bg-[#052E16]",
      colorIcon: "text-[#16A34A]",
      showArrow: true,
    },
    {
      id: "maintenance-due",
      icon: Circle,
      value: valueOrSkeleton(values.maintenanceDue),
      subtitle: "6% of Total Fleet",
      title: "Idle",
      bgIcon: "bg-[#3B2A00]",
      colorIcon: "text-[#ffd60a]",
      showArrow: true,
    },
    {
      id: "offline_vehicles",
      icon: Circle,
      value: valueOrSkeleton(values.noGps),
      subtitle: "Need Attention",
      title: "Offline",
      bgIcon: "bg-[#450A0A]",
      colorIcon: "text-[#B91C1C]",
      showArrow: true,
    },
    {
      id: "no-gps",
      icon: LocateOff,
      value: valueOrSkeleton(values.noGps),
      subtitle: "Last Sync: 12 sec ago",
      title: "No GPS",
      bgIcon: "bg-[#172554]",
      colorIcon: "text-[#3b82f6]",
      showArrow: true,
    },
  ];
}

export default function StatsCard() {
  const { summary, isLoading, isError, data } = useDashboardSummary();
  const navigate = useNavigate();

  const showLoadingSkeleton = isLoading && !data;

  // Error / empty / unmapped → "-" (never hardcoded KPI numbers).
  const resolvedSummary = isError
    ? DASHBOARD_SUMMARY_PLACEHOLDER
    : summary ??
      (data ? mapDashboardSummary(data) : null) ??
      DASHBOARD_SUMMARY_PLACEHOLDER;

  const statsData = buildStatsData(resolvedSummary, {
    isLoading: showLoadingSkeleton,
  });

  return (
    <div className="grid grid-cols-[repeat(5,minmax(0,1fr))] gap-2 mt-0 pt-0 select-none w-full shrink-0">
      {statsData.map((card) => (
        <div key={card.id} className="min-h-[112px] [&>*]:h-full">
          <StatCard
            {...card}
            onClick={card.id === "active_vehicles" ? () => navigate("/vehicles") : card.onClick}
          />
        </div>
      ))}
    </div>
  );
}
