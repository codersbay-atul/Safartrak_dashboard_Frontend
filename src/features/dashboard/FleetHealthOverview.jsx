import React, { useMemo, useState } from "react";
import { RefreshCw, Radio } from "lucide-react";
import { useDashboardHealth } from "../../hooks/useDashboardHealth";

const RANGE_OPTIONS = [
  { key: "24h", label: "24H" },
  { key: "7d", label: "7D" },
  { key: "30d", label: "30D" },
];

const SERIES_COLORS = {
  healthy: "#22c55e",
  warning: "#f59e0b",
  critical: "#f97316",
  unknown: "#ef4444",
};

const CHIP_META = [
  {
    id: "vehicle",
    label: "Vehicle",
    bg: "bg-[#1e3a8a]",
    textColor: "text-blue-200",
  },
  {
    id: "healthy",
    label: "Healthy",
    bg: "bg-[#14532d]",
    textColor: "text-green-300",
  },
  {
    id: "warning",
    label: "Warning",
    bg: "bg-[#92400e]",
    textColor: "text-amber-200",
  },
  {
    id: "critical",
    label: "Critical",
    bg: "bg-[#9a3412]",
    textColor: "text-orange-200",
  },
  {
    id: "alert",
    label: "Alert",
    bg: "bg-[#991b1b]",
    textColor: "text-red-200",
  },
];

function formatLastUpdated(value) {
  if (value == null || value === "" || value === "-") return "Not Available";
  try {
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return String(value);
    return date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
    });
  } catch {
    return String(value);
  }
}

function HealthSeriesChart({ series }) {
  const geometry = useMemo(() => {
    if (!Array.isArray(series) || series.length === 0) return null;

    const maxTotal = Math.max(
      ...series.map(
        (p) => p.healthy + p.warning + p.critical + p.unknown
      ),
      1
    );

    const width = Math.max(series.length * 28, 200);
    const height = 120;
    const gap = 6;
    const barWidth = Math.max(
      4,
      (width - gap * (series.length + 1)) / series.length
    );

    const bars = series.map((point, index) => {
      const x = gap + index * (barWidth + gap);
      let y = height;
      const segments = ["healthy", "warning", "critical", "unknown"].map(
        (key) => {
          const value = point[key] ?? 0;
          const h = (value / maxTotal) * (height - 4);
          y -= h;
          return {
            key,
            value,
            x,
            y,
            width: barWidth,
            height: h,
            fill: SERIES_COLORS[key],
          };
        }
      );
      return { label: point.label, segments };
    });

    return { width, height, bars };
  }, [series]);

  if (!geometry) return null;

  return (
    <div className="w-full h-full flex flex-col min-h-0">
      <div className="flex-1 min-h-0 overflow-x-auto overflow-y-hidden">
        <svg
          className="w-full h-full min-h-[100px]"
          viewBox={`0 0 ${geometry.width} ${geometry.height}`}
          preserveAspectRatio="none"
        >
          {geometry.bars.map((bar, barIndex) =>
            bar.segments.map((seg) =>
              seg.height > 0 ? (
                <rect
                  key={`${barIndex}-${seg.key}`}
                  x={seg.x}
                  y={seg.y}
                  width={seg.width}
                  height={seg.height}
                  fill={seg.fill}
                  rx="1.5"
                />
              ) : null
            )
          )}
        </svg>
      </div>
      <div className="flex justify-between gap-1 pt-1 shrink-0 overflow-hidden">
        {series.map((point, index) => (
          <span
            key={`${point.label}-${index}`}
            className="text-[7.5px] text-zinc-500 font-medium truncate text-center flex-1 min-w-0"
          >
            {point.label || "Not Available"}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function FleetHealthOverview() {
  const [activeRange, setActiveRange] = useState("24h");
  const {
    series,
    current,
    isLoading,
    isFetching,
    isError,
    refetch,
    lastUpdated,
  } = useDashboardHealth(activeRange);

  const summaryStats = CHIP_META.map((chip) => ({
    ...chip,
    value: current?.[chip.id] ?? "Not Available",
  }));

  const hasSeries = series.length > 0;

  return (
    <div className="w-full h-full bg-[#121214] border border-[#1f1f23] rounded-xl p-5 flex flex-col select-none overflow-hidden">
      {/* Header */}
      <div className="flex items-start justify-between gap-3 shrink-0">
        <div className="min-w-0">
          <h3 className="text-[12px] font-bold text-white tracking-tight">
            Fleet Health Overview
          </h3>
          <p className="text-[8.5px] text-zinc-500 mt-0.5">
            Last Updated : {formatLastUpdated(lastUpdated)}
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <span className="flex items-center gap-1 text-[8px] font-bold text-[#22c55e] bg-[#004d1f] px-2 py-1 rounded-full shrink-0">
            <Radio size={9} className="stroke-[2.5]" />
            Live
          </span>

          <button
            type="button"
            onClick={() => refetch()}
            className="text-zinc-500 hover:text-white transition-colors cursor-pointer"
            aria-label="Refresh health data"
          >
            <RefreshCw
              size={11}
              className={`stroke-[2.5] ${isFetching ? "animate-spin" : ""}`}
            />
          </button>

          <div className="flex items-center bg-black rounded-xl p-0.5 shrink-0">
            {RANGE_OPTIONS.map((range) => (
              <button
                key={range.key}
                type="button"
                onClick={() => setActiveRange(range.key)}
                className={`px-2.5 py-1 rounded-lg text-[9px] font-semibold transition-all cursor-pointer ${
                  activeRange === range.key
                    ? "bg-[#27272a] text-white"
                    : "text-zinc-500 hover:text-zinc-300"
                }`}
              >
                {range.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content — chart from API series */}
      <div className="flex-1 min-h-0 py-3">
        {isLoading && !hasSeries ? (
          <div className="w-full h-full flex items-center justify-center">
            <span className="inline-block h-3 w-16 rounded bg-zinc-700/80 animate-pulse" />
          </div>
        ) : !hasSeries || isError ? (
          <div className="w-full h-full flex items-center justify-center">
            <p className="text-[10px] text-zinc-500 font-medium">
              No data available
            </p>
          </div>
        ) : (
          <HealthSeriesChart series={series} />
        )}
      </div>

      {/* Bottom Summary Chips */}
      <div className="grid grid-cols-5 gap-2 shrink-0">
        {summaryStats.map((stat) => (
          <div
            key={stat.id}
            className={`${stat.bg} ${stat.textColor} w-full h-8 rounded-xl flex items-center justify-center gap-0.5 overflow-hidden`}
          >
            <span className="text-[11px] font-extrabold text-white">
              {isLoading && !hasSeries ? (
                <span
                  className="inline-block h-2.5 w-3 rounded bg-white/30 animate-pulse"
                  aria-hidden="true"
                />
              ) : (
                stat.value
              )}
            </span>
            <span className="text-[8.5px] font-medium opacity-90">
              {stat.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
