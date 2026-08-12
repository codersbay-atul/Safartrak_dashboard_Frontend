import React from "react";
import { ArrowRight } from "lucide-react";
import { useFleetHealth } from "../../hooks/useFleetHealth";
import { useInsights } from "../../hooks/useInsights";
import { useTrackSummary } from "../../hooks/useTrackSummary";
import { useActions } from "../../hooks/useActions";

const CARD_STYLE =
  "bg-[#121214] border border-[#1f1f23] rounded-xl p-3 flex flex-col overflow-hidden";

const VALUE_SKELETON = (
  <span
    className="inline-block h-2.5 w-4 rounded bg-zinc-700/80 animate-pulse align-middle"
    aria-hidden="true"
  />
);

const FLEET_HEALTH_STATUS_COLOR = "#22C55E";
const FLEET_HEALTH_PROGRESS_COLOR = "#22C55E";

const FLEET_HEALTH_LEGEND_META = [
  { id: "healthy", label: "Healthy Vehicles", color: "#22C55E" },
  { id: "warning", label: "Warning", color: "#F59E0B" },
  { id: "critical", label: "Critical", color: "#EF4444" },
  { id: "offline", label: "Offline", color: "#CFCFCF" },
];

const SUMMARY_ROWS_META = [
  { id: "running", label: "Running", key: "running" },
  { id: "distance", label: "Distance Covered", key: "distanceKm" },
  { id: "fuel", label: "Fuel Consumed", key: "fuelL" },
  { id: "trips-completed", label: "Trips Completed", key: "tripsCompleted" },
  { id: "trips-active", label: "Trips Active", key: "tripsActive" },
  { id: "avg-speed", label: "Average Speed", key: "avgSpeedKmh" },
  { id: "idle-time", label: "Idle Time", key: "idleTimeMin" },
];

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
  const { insights, isLoading, isError, data } = useInsights();
  const {
    actions,
    isLoading: isActionsLoading,
    isError: isActionsError,
    data: actionsData,
  } = useActions();

  const showLoadingSkeleton = isLoading && !data;
  const showActionsLoading = isActionsLoading && !actionsData;

  return (
    <div className="flex flex-col gap-3 h-full overflow-hidden select-none">
      <div className={`${CARD_STYLE} flex-1 min-h-0`}>
        <CardHeader title="AI Insights" linkText="View All Insights" />

        <div className="flex flex-col gap-y-2">
          {showLoadingSkeleton ? (
            [0, 1, 2].map((key) => (
              <div
                key={key}
                className="flex items-center gap-2 py-1 shrink-0"
              >
                <div className="w-7 h-7 rounded-md bg-zinc-800/80 animate-pulse shrink-0" />
                <div className="flex-1 min-w-0">{VALUE_SKELETON}</div>
                <div className="text-right shrink-0 leading-tight">
                  {VALUE_SKELETON}
                </div>
              </div>
            ))
          ) : isError || insights.length === 0 ? (
            <div className="flex flex-1 items-center justify-center py-6">
              <p className="text-[10px] text-zinc-500 font-medium">
                No insights available
              </p>
            </div>
          ) : (
            insights.map((insight) => {
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
            })
          )}
        </div>
      </div>

      <div className={`${CARD_STYLE} flex-1 min-h-0`}>
        <CardHeader title="Action Center" linkText="View All" />

        <div className="flex flex-col gap-y-2">
          {showActionsLoading ? (
            [0, 1, 2, 3].map((key) => (
              <div
                key={key}
                className="flex items-center gap-2 py-1 shrink-0"
              >
                <div className="w-7 h-7 rounded-md bg-zinc-800/80 animate-pulse shrink-0" />
                <div className="flex-1 min-w-0">{VALUE_SKELETON}</div>
                <div className="text-right shrink-0 leading-tight">
                  {VALUE_SKELETON}
                </div>
              </div>
            ))
          ) : isActionsError || actions.length === 0 ? (
            <div className="flex flex-1 items-center justify-center py-6">
              <p className="text-[10px] text-zinc-500 font-medium">
                No actions available
              </p>
            </div>
          ) : (
            actions.map((action) => {
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
            })
          )}
        </div>
      </div>
    </div>
  );
}

export function FleetInsightsRightColumn() {
  const { health, isLoading, data } = useFleetHealth();
  const {
    summary: trackSummary,
    isLoading: isTrackLoading,
    data: trackData,
  } = useTrackSummary("today");

  const showLoadingSkeleton = isLoading && !data;
  const showTrackLoading = isTrackLoading && !trackData;

  const scoreDisplay = showLoadingSkeleton
    ? VALUE_SKELETON
    : health.scorePct === "Not Available" || health.scorePct === "-"
      ? "Not Available"
      : `${health.scorePct}%`;

  const labelDisplay = showLoadingSkeleton ? VALUE_SKELETON : health.label;

  const legend = FLEET_HEALTH_LEGEND_META.map((item) => ({
    ...item,
    count: showLoadingSkeleton ? VALUE_SKELETON : health[item.id],
  }));

  const summaryRows = SUMMARY_ROWS_META.map((row) => ({
    ...row,
    value: showTrackLoading
      ? VALUE_SKELETON
      : trackSummary[row.key] ?? "Not Available",
  }));

  const totalVehiclesValue = showTrackLoading
    ? VALUE_SKELETON
    : trackSummary.totalVehicles ?? "Not Available";

  return (
    <div className="flex flex-col gap-3 h-full overflow-hidden select-none">
      <div className={`${CARD_STYLE} flex-1 min-h-0`}>
        <CardHeader title="Fleet Health" />

        <div className="flex items-center justify-between mb-2 shrink-0">
          <p className="text-[14px] font-bold text-white tracking-tight leading-none whitespace-nowrap">
            {scoreDisplay}
          </p>
          <span
            className="text-[9px] font-semibold whitespace-nowrap"
            style={{ color: FLEET_HEALTH_STATUS_COLOR }}
          >
            {labelDisplay}
          </span>
        </div>

        <div className="w-full h-[2.5px] bg-zinc-800 rounded-full overflow-hidden mb-2.5 shrink-0">
          <div
            className="h-full rounded-full transition-all duration-500"
            style={{
              width: `${showLoadingSkeleton ? 0 : health.scoreWidth}%`,
              backgroundColor: FLEET_HEALTH_PROGRESS_COLOR,
            }}
          />
        </div>

        <div className="flex flex-col gap-y-2">
          {legend.map((item) => (
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
          {summaryRows.map((row) => (
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
          <span className="text-zinc-400 font-medium">Total Vehicles</span>
          <span className="font-bold text-white whitespace-nowrap text-right">
            {totalVehiclesValue}
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
