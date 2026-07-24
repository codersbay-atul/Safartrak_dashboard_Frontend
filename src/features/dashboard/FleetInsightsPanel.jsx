import React from "react";
import {
  Battery,
  Wrench,
  Truck,
  Thermometer,
  AlertTriangle,
  ArrowRight,
} from "lucide-react";

const CARD_STYLE =
  "bg-[#121214] border border-[#1f1f23] rounded-xl p-3 flex flex-col overflow-hidden";

const aiInsights = [
  {
    id: 1,
    icon: Battery,
    iconBg: "#5A0028",
    title: "Battery degradation detected in Truck MH12AB3482",
    value: "₹42,000",
    subtitle: "Potential annual savings",
  },
  {
    id: 2,
    icon: Wrench,
    iconBg: "#5A2D00",
    title: "Optimize Route Assignment",
    value: "₹18,000",
    subtitle: "Estimated fuel savings",
  },
  {
    id: 3,
    icon: Truck,
    iconBg: "#004D22",
    title: "Fleet Health Improved Idle time reduced by 12% this week.",
    value: "8.5 Hours",
    subtitle: "Estimated productivity gain",
  },
];

const actionCenter = [
  {
    id: 1,
    icon: Battery,
    iconBg: "#5A0028",
    title: "Battery Failure",
    vehicle: "Truck MH14XZ8765",
    amount: "₹42,000",
    severity: "Critical",
    severityColor: "#FF3B30",
  },
  {
    id: 2,
    icon: Wrench,
    iconBg: "#5A2D00",
    title: "Brake Wear Detected",
    vehicle: "Truck MH20KL9921",
    amount: "₹18,000",
    severity: "High",
    severityColor: "#FF7A00",
  },
  {
    id: 3,
    icon: Thermometer,
    iconBg: "#4D2800",
    title: "Engine Temperature High",
    vehicle: "Truck MH09XY1234",
    amount: "₹18,000",
    severity: "Medium",
    severityColor: "#FFD84D",
  },
  {
    id: 4,
    icon: AlertTriangle,
    iconBg: "#4D0A0A",
    title: "Fuel Theft Suspected",
    vehicle: "Truck MH15AB2211",
    amount: "₹18,000",
    severity: "Critical",
    severityColor: "#FF3B30",
  },
];

const fleetHealth = {
  score: 96,
  status: "Excellent",
  statusColor: "#22C55E",
  progressColor: "#22C55E",
  legend: [
    { id: "healthy", label: "Healthy Vehicles", count: 48, color: "#22C55E" },
    { id: "warning", label: "Warning", count: 8, color: "#F59E0B" },
    { id: "critical", label: "Critical", count: 4, color: "#EF4444" },
    { id: "offline", label: "Offline", count: 1, color: "#CFCFCF" },
  ],
};

const todaysSummary = {
  rows: [
    { id: "running", label: "Running", value: "56" },
    { id: "distance", label: "Distance Covered", value: "3,248 km" },
    { id: "fuel", label: "Fuel Consumed", value: "412 L" },
    { id: "trips-completed", label: "Trips Completed", value: "132" },
    { id: "trips-active", label: "Trips Active", value: "17" },
    { id: "avg-speed", label: "Average Speed", value: "58 km/h" },
    { id: "idle-time", label: "Idle Time", value: "1h 42m" },
  ],
  totalVehicles: { label: "Total Vehicles", value: "59" },
};

function CardHeader({ title, linkText }) {
  return (
    <div className="flex items-center justify-between mb-2 shrink-0">
      <h3 className="text-[12px] font-bold text-white tracking-tight">
        {title}
      </h3>
      {linkText && (
        <button
          type="button"
          className="flex items-center gap-0.5 text-[9px] font-semibold text-[#a16207] hover:text-[#FDBB24] transition-colors cursor-pointer shrink-0"
        >
          {linkText}
          <ArrowRight size={10} />
        </button>
      )}
    </div>
  );
}

export function FleetInsightsCenterColumn() {
  return (
    <div className="flex flex-col gap-3 h-full overflow-hidden select-none">
      <div className={`${CARD_STYLE} flex-1 min-h-0`}>
        <CardHeader title="AI Insights" linkText="View All Insights" />

        <div className="flex flex-col gap-y-2">
          {aiInsights.map((insight) => {
            const Icon = insight.icon;
            return (
              <div
                key={insight.id}
                className="flex items-center gap-2 py-1 shrink-0"
              >
                <div
                  className="w-7 h-7 rounded-md flex items-center justify-center shrink-0"
                  style={{ backgroundColor: insight.iconBg }}
                >
                  <Icon size={12} className="text-white/90" />
                </div>

                <p className="flex-1 text-[10px] font-bold text-white leading-tight line-clamp-2 min-w-0">
                  {insight.title}
                </p>

                <div className="text-right shrink-0 leading-tight">
                  <p className="text-[11px] font-extrabold text-white">
                    {insight.value}
                  </p>
                  <p className="text-[8.5px] text-zinc-500 mt-0.5">
                    {insight.subtitle}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className={`${CARD_STYLE} flex-1 min-h-0`}>
        <CardHeader title="Action Center" linkText="View All" />

        <div className="flex flex-col gap-y-2">
          {actionCenter.map((action) => {
            const Icon = action.icon;
            return (
              <div
                key={action.id}
                className="flex items-center gap-2 py-1 shrink-0"
              >
                <div
                  className="w-7 h-7 rounded-md flex items-center justify-center shrink-0"
                  style={{ backgroundColor: action.iconBg }}
                >
                  <Icon size={12} className="text-white/90" />
                </div>

                <div className="flex-1 min-w-0 leading-tight">
                  <p className="text-[10px] font-bold text-white truncate">
                    {action.title}
                  </p>
                  <p className="text-[8.5px] text-zinc-500 mt-0.5 truncate">
                    {action.vehicle}
                  </p>
                </div>

                <div className="text-right shrink-0 leading-tight">
                  <p className="text-[11px] font-extrabold text-white">
                    {action.amount}
                  </p>
                  <p
                    className="text-[9px] font-semibold mt-0.5"
                    style={{ color: action.severityColor }}
                  >
                    {action.severity}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export function FleetInsightsRightColumn() {
  return (
    <div className="flex flex-col gap-3 h-full overflow-hidden select-none">
      <div className={`${CARD_STYLE} flex-1 min-h-0`}>
        <CardHeader title="Fleet Health" />

        <div className="flex items-center justify-between mb-2 shrink-0">
          <p className="text-[14px] font-bold text-white tracking-tight leading-none whitespace-nowrap">
            {fleetHealth.score}%
          </p>
          <span
            className="text-[9px] font-semibold whitespace-nowrap"
            style={{ color: fleetHealth.statusColor }}
          >
            {fleetHealth.status}
          </span>
        </div>

        <div className="w-full h-[2.5px] bg-zinc-800 rounded-full overflow-hidden mb-2.5 shrink-0">
          <div
            className="h-full rounded-full transition-all duration-500"
            style={{
              width: `${fleetHealth.score}%`,
              backgroundColor: fleetHealth.progressColor,
            }}
          />
        </div>

        <div className="flex flex-col gap-y-2">
          {fleetHealth.legend.map((item) => (
            <div
              key={item.id}
              className="grid grid-cols-[1fr_auto] items-center gap-x-3 shrink-0"
            >
              <div className="flex items-center gap-1.5 min-w-0">
                <span
                  className="w-1.5 h-1.5 rounded-sm shrink-0"
                  style={{ backgroundColor: item.color }}
                />
                <span className="text-[9.5px] text-zinc-400 font-medium truncate">
                  {item.label}
                </span>
              </div>
              <span className="text-[9.5px] font-bold text-white shrink-0 whitespace-nowrap text-right">
                {item.count}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className={`${CARD_STYLE} flex-1 min-h-0`}>
        <CardHeader title="Today's Summary" />

        <div className="flex flex-col gap-y-2 text-[9.5px]">
          {todaysSummary.rows.map((row) => (
            <div
              key={row.id}
              className="grid grid-cols-[1fr_auto] items-center gap-x-3 shrink-0"
            >
              <span className="text-zinc-400 font-medium truncate">
                {row.label}
              </span>
              <span className="font-bold text-white shrink-0 whitespace-nowrap text-right">
                {row.value}
              </span>
            </div>
          ))}
        </div>

        <div className="border-t border-dashed border-zinc-800/60 my-2 shrink-0" />

        <div className="grid grid-cols-[1fr_auto] items-center gap-x-3 shrink-0 text-[9.5px]">
          <span className="text-zinc-400 font-medium">
            {todaysSummary.totalVehicles.label}
          </span>
          <span className="font-bold text-white whitespace-nowrap text-right">
            {todaysSummary.totalVehicles.value}
          </span>
        </div>
      </div>
    </div>
  );
}

export default function FleetInsightsPanel() {
  return (
    <div className="grid grid-cols-[1.4fr_1fr] gap-3 h-full min-h-0 overflow-hidden">
      <FleetInsightsCenterColumn />
      <div className="min-w-0">
        <FleetInsightsRightColumn />
      </div>
    </div>
  );
}
