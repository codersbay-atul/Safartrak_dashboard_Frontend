import React, { useMemo } from "react";
import { useAnalyticsDistanceSeries } from "../../hooks/useAnalyticsDistanceSeries";
import MainLayoutTextSize from "../../components/Ui/MainLayoutUI/MainLayoutTextSize";
import MainLayoutIcon from "../../components/Ui/MainLayoutUI/MainLayoutIcon";
import MainLayoutColor from "../../components/Ui/MainLayoutUI/MainLayoutColor";

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
  const { series, lastUpdated, isLoading, isFetching, refetch } =
    useAnalyticsDistanceSeries(range);

  const geometry = useMemo(() => buildChartGeometry(series), [series]);
  const hasData = series.length > 0 && geometry != null;

  const primaryAccent = "#2563eb";

  return (
    <MainLayoutColor
      as="div"
      background="surface"
      className="w-full h-full flex flex-col justify-between select-none"
    >
      <div className="flex flex-wrap items-center justify-between gap-4 pb-2">
        <div className="flex items-center gap-3">
          <div>
            <MainLayoutColor
              as={MainLayoutTextSize}
              color="title"
              size="sectionTitle"
            >
              Fleet Distance
            </MainLayoutColor>
            <MainLayoutColor
              as={MainLayoutTextSize}
              color="subtitle"
              size="subInfoText"
              className="mt-0.5 block"
            >
              Last Updated: {formatLastUpdated(lastUpdated)}
            </MainLayoutColor>
          </div>

          <MainLayoutTextSize
            as="span"
            size="badgeText"
            className="flex items-center gap-1 bg-[#052e16] border border-[#14532d] text-[#22c55e] font-bold px-2 py-0.5 rounded-full"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#22c55e] animate-pulse" />
            Live
          </MainLayoutTextSize>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => refetch()}
            className="text-zinc-500 hover:text-white transition-colors cursor-pointer"
            aria-label="Refresh chart"
          >
            <MainLayoutIcon
              name="refresh"
              size="refresh"
              loading={isFetching}
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
                  className={`px-2.5 py-0.5 rounded-md transition-colors ${
                    isActive
                      ? "bg-[#27272a] text-white shadow"
                      : "text-zinc-400 hover:text-zinc-200 font-semibold cursor-pointer"
                  }`}
                >
                  <MainLayoutTextSize size="filterText">
                    {option.label}
                  </MainLayoutTextSize>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div className="relative flex-1 min-h-[200px] mt-2 flex">
        {!hasData ? (
          <MainLayoutColor
            as={MainLayoutTextSize}
            color="subtitle"
            size="subInfoText"
            className="flex-1 flex items-center justify-center font-medium"
          >
            {isLoading ? "Loading..." : "No data available"}
          </MainLayoutColor>
        ) : (
          <>
            <div className="flex flex-col justify-between font-bold pr-2.5 select-none pb-5 pt-1">
              {geometry.yTicks.map((tick, index) => (
                <MainLayoutColor
                  as={MainLayoutTextSize}
                  color="subtitle"
                  size="captionText"
                  key={`${tick}-${index}`}
                >
                  {tick}
                </MainLayoutColor>
              ))}
            </div>

            <div className="flex-1 relative">
              <div className="absolute inset-0 flex flex-col justify-between pb-5 pt-1 pointer-events-none opacity-20">
                <div className="border-b border-dashed border-zinc-700 w-full" />
                <div className="border-b border-dashed border-zinc-700 w-full" />
                <div className="border-b border-dashed border-zinc-700 w-full" />
                <div className="border-b border-dashed border-zinc-700 w-full" />
                <div className="border-b border-dashed border-zinc-700 w-full" />
                <div className="border-b border-dashed border-zinc-700 w-full" />
              </div>

              <svg
                className="w-full h-full pb-5 pt-1 overflow-visible"
                viewBox={`0 0 ${CHART_WIDTH} ${CHART_HEIGHT}`}
                preserveAspectRatio="none"
              >
                <defs>
                  <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={primaryAccent} stopOpacity="0.4" />
                    <stop offset="100%" stopColor={primaryAccent} stopOpacity="0.0" />
                  </linearGradient>
                </defs>

                <path
                  d={geometry.areaPath}
                  fill="url(#chartGradient)"
                />

                <path
                  d={geometry.linePath}
                  fill="none"
                  stroke={primaryAccent}
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />

                <circle
                  cx={geometry.last.x}
                  cy={geometry.last.y}
                  r="4.5"
                  fill="#ffffff"
                  stroke={primaryAccent}
                  strokeWidth="2"
                />
              </svg>

              <div className="absolute right-0 top-0 -translate-y-[80%] pointer-events-none z-10">
                <MainLayoutColor
                  as={MainLayoutTextSize}
                  background="surface"
                  color="title"
                  size="captionText"
                  className="border border-zinc-800 font-bold px-2 py-0.5 rounded shadow-lg"
                >
                  {Number(geometry.last.value).toLocaleString("en-US", {
                    maximumFractionDigits: 1,
                  })}{" "}
                  km
                </MainLayoutColor>
              </div>

              <div className="absolute bottom-0 left-0 right-0 flex justify-between font-bold px-1 select-none">
                {geometry.xLabels.map((label, index) => (
                  <MainLayoutColor
                    as={MainLayoutTextSize}
                    color="subtitle"
                    size="captionText"
                    key={`${label}-${index}`}
                  >
                    {label}
                  </MainLayoutColor>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </MainLayoutColor>
  );
}