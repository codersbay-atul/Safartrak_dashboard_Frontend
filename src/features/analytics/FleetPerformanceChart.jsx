import React, { useMemo } from "react";
import { RefreshCw } from "lucide-react";
import { useAnalyticsDistanceSeries } from "../../hooks/useAnalyticsDistanceSeries";

const RANGE_OPTIONS = [
  { key: "24h", label: "24H" },
  { key: "7d", label: "7D" },
  { key: "30d", label: "1 Month" },
];

const CHART_WIDTH = 600;
const CHART_HEIGHT = 200;

function formatAxisLabel(value) {
  if (!Number.isFinite(value) || value <= 0) return "0";
  if (value >= 1000) {
    const k = value / 1000;
    return `${Number.isInteger(k) ? k : k.toFixed(1)}K`;
  }
  return String(Math.round(value));
}

function buildChartGeometry(series) {
  if (!Array.isArray(series) || series.length === 0) return null;

  const values = series.map((p) => p.value);
  const maxValue = Math.max(...values, 0);
  const yMax = maxValue > 0 ? maxValue : 1;
  const n = series.length;

  const points = series.map((point, index) => {
    const x = n === 1 ? CHART_WIDTH / 2 : (index / (n - 1)) * CHART_WIDTH;
    const y = CHART_HEIGHT - (point.value / yMax) * CHART_HEIGHT;
    return { x, y, label: point.label, value: point.value };
  });

  const linePath = points
    .map((p, i) => `${i === 0 ? "M" : "L"} ${p.x.toFixed(2)} ${p.y.toFixed(2)}`)
    .join(" ");

  const areaPath = `${linePath} L ${points[points.length - 1].x.toFixed(2)} ${CHART_HEIGHT} L ${points[0].x.toFixed(2)} ${CHART_HEIGHT} Z`;

  const last = points[points.length - 1];
  const yTicks = [1, 0.8, 0.6, 0.4, 0.2, 0].map((ratio) =>
    formatAxisLabel(yMax * ratio)
  );

  return {
    linePath,
    areaPath,
    last,
    yTicks,
    xLabels: series.map((p) => p.label),
  };
}

function formatLastUpdated(value) {
  if (value == null || value === "") return "-";
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

export default function FleetPerformanceChart({
  range = "24h",
  onRangeChange,
}) {
  const { series, lastUpdated, isLoading, isFetching, refetch, isError } =
    useAnalyticsDistanceSeries(range);

  const geometry = useMemo(() => buildChartGeometry(series), [series]);
  const hasData = series.length > 0 && geometry != null;

  return (
    <div className="w-full h-full bg-[#121214] border border-[#1f1f23] rounded-2xl p-4 flex flex-col justify-between shadow-xl select-none">
      
      {/* Top Controls Header Area */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-2">
        <div className="flex items-center gap-3">
          <div>
            <h3 className="text-[15px] font-bold tracking-tight text-white">Fleet Distance</h3>
            <p className="text-[12px] text-zinc-500 mt-0.5">
              Last Updated: {formatLastUpdated(lastUpdated)}
            </p>
          </div>
          {/* Live Indicator Badge */}
          <span className="flex items-center gap-1 bg-[#052e16] border border-[#14532d] text-[#22c55e] text-[9px] font-bold px-2 py-0.5 rounded-full">
            <span className="w-1.5 h-1.5 rounded-full bg-[#22c55e] animate-pulse" />
            Live
          </span>
        </div>

        {/* Timeframe Selector Button Controls */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => refetch()}
            className="text-zinc-500 hover:text-white transition-colors cursor-pointer"
            aria-label="Refresh chart"
          >
            <RefreshCw
              size={13}
              className={`stroke-[2.5] ${isFetching ? "animate-spin" : ""}`}
            />
          </button>
          <div className="flex items-center bg-[#18181b] border border-[#27272a] rounded-lg p-0.5">
            {RANGE_OPTIONS.map((option) => {
              const isActive = range === option.key;
              return (
                <button
                  key={option.key}
                  type="button"
                  onClick={() => onRangeChange?.(option.key)}
                  className={
                    isActive
                      ? "px-2.5 py-0.5 bg-[#27272a] text-white text-[10px] font-bold rounded-md shadow"
                      : "px-2.5 py-0.5 text-zinc-400 hover:text-zinc-200 text-[10px] font-semibold transition-colors cursor-pointer"
                  }
                >
                  {option.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Chart Canvas Graphic Panel */}
      <div className="relative flex-1 min-h-[200px] mt-2 flex">
        {!hasData ? (
          <div className="flex-1 flex items-center justify-center text-[12px] text-zinc-500 font-medium">
            {isLoading ? "Loading..." : isError ? "No data available" : "No data available"}
          </div>
        ) : (
          <>
            {/* Y-Axis Metrics Labels */}
            <div className="flex flex-col justify-between text-[9px] text-zinc-600 font-bold pr-2.5 select-none pb-5 pt-1">
              {geometry.yTicks.map((tick, index) => (
                <span key={`${tick}-${index}`}>{tick}</span>
              ))}
            </div>

            {/* SVG Wrapper Area */}
            <div className="flex-1 relative">
              
              {/* Dashed Grid Lines Overlay */}
              <div className="absolute inset-0 flex flex-col justify-between pb-5 pt-1 pointer-events-none opacity-20">
                <div className="border-b border-dashed border-zinc-700 w-full" />
                <div className="border-b border-dashed border-zinc-700 w-full" />
                <div className="border-b border-dashed border-zinc-700 w-full" />
                <div className="border-b border-dashed border-zinc-700 w-full" />
                <div className="border-b border-dashed border-zinc-700 w-full" />
                <div className="border-b border-zinc-700 w-full" />
              </div>

              {/* Core Paths Shape container */}
              <svg className="w-full h-full pb-5 pt-1 overflow-visible" viewBox={`0 0 ${CHART_WIDTH} ${CHART_HEIGHT}`} preserveAspectRatio="none">
                <defs>
                  <linearGradient id="blueGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#2563eb" stopOpacity="0.4" />
                    <stop offset="100%" stopColor="#2563eb" stopOpacity="0.0" />
                  </linearGradient>
                </defs>

                <path
                  d={geometry.areaPath}
                  fill="url(#blueGradient)"
                />

                {/* Top Glowing Stroke */}
                <path
                  d={geometry.linePath}
                  fill="none"
                  stroke="#2563eb"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />

                {/* Endpoint Neon Anchor Point */}
                <circle
                  cx={geometry.last.x}
                  cy={geometry.last.y}
                  r="4.5"
                  fill="#ffffff"
                  stroke="#2563eb"
                  strokeWidth="2"
                />
              </svg>

              {/* Tooltip Metrics Bubble */}
              <div className="absolute right-0 top-0 -translate-y-[80%] pointer-events-none z-10">
                <div className="bg-[#1c1c1f] border border-zinc-800 text-[9.5px] font-bold text-white px-2 py-0.5 rounded shadow-lg">
                  {Number(geometry.last.value).toLocaleString("en-US", {
                    maximumFractionDigits: 1,
                  })}{" "}
                  km
                </div>
              </div>

              {/* X-Axis Days Timeline Row */}
              <div className="absolute bottom-0 left-0 right-0 flex justify-between text-[9.5px] text-zinc-500 font-bold px-1 select-none">
                {geometry.xLabels.map((label, index) => (
                  <span key={`${label}-${index}`}>{label}</span>
                ))}
              </div>
            </div>
          </>
        )}
      </div>

    </div>
  );
}
