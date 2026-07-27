import { Truck, TriangleAlert, Wrench, Target, Ban } from "lucide-react";
import { StatCard } from "../../components/Ui/StatsCards";
import { useDashboardSummary } from "../../hooks/useDashboardSummary";
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
      bgIcon: "bg-[#ffd60a]/10 border border-[#ffd60a]/20",
      colorIcon: "text-[#ffd60a]",
      showArrow: false,
    },
    {
      id: "critical-alert",
      icon: TriangleAlert,
      value: valueOrSkeleton(values.criticalAlerts),
      subtitle: "69% of Total Fleet",
      title: "Critical Alert",
      bgIcon: "bg-[#ffd60a]/10 border border-[#ffd60a]/20",
      colorIcon: "text-[#ffd60a]",
      showArrow: true,
    },
    {
      id: "maintenance-due",
      icon: Wrench,
      value: valueOrSkeleton(values.maintenanceDue),
      subtitle: "6% of Total Fleet",
      title: "Maintenance Due",
      bgIcon: "bg-[#ffd60a]/10 border border-[#ffd60a]/20",
      colorIcon: "text-[#ffd60a]",
      showArrow: true,
    },
    {
      id: "prediction-accuracy",
      icon: Target,
      value: valueOrSkeleton(values.predictionAccuracy),
      subtitle: "Need Attention",
      title: "Prediction Accuracy",
      bgIcon: "bg-[#ffd60a]/10 border border-[#ffd60a]/20",
      colorIcon: "text-[#ffd60a]",
      showArrow: true,
    },
    {
      id: "no-gps",
      icon: Ban,
      value: valueOrSkeleton(values.noGps),
      subtitle: "Last Sync: 12 sec ago",
      title: "No GPS",
      bgIcon: "bg-[#0c1a30] border border-[#14325c]",
      colorIcon: "text-[#3b82f6]",
      showArrow: true,
    },
  ];
}

export default function StatsCard() {
  const { summary, isLoading, isError, data } = useDashboardSummary();

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
          <StatCard {...card} />
        </div>
      ))}
    </div>
  );
}
