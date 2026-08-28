import React from "react";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";
import { useAnalyticsPerformance } from "../../hooks/useAnalyticsPerformance";
import MainLayoutTextSize from "../../components/Ui/MainLayoutUI/MainLayoutTextSize";
import MainLayoutColor from "../../components/Ui/MainLayoutUI/MainLayoutColor";

function buildSparklinePath(values) {
  if (!Array.isArray(values) || values.length === 0) return null;

  const width = 100;
  const height = 50;
  const min = Math.min(...values);
  const max = Math.max(...values);
  const range = max - min || 1;

  const points = values.map((value, index) => {
    const x =
      values.length === 1 ? width / 2 : (index / (values.length - 1)) * width;
    const y = height - ((value - min) / range) * (height - 8) - 4;
    return { x, y };
  });

  const d = points
    .map((p, i) => `${i === 0 ? "M" : "L"} ${p.x.toFixed(2)} ${p.y.toFixed(2)}`)
    .join(" ");

  return { d, last: points[points.length - 1] };
}

function PerformanceRow({ item, variant }) {
  const isTop = variant === "top";
  const color = isTop ? "#22c55e" : "#ef4444";
  const badgeBg = isTop
    ? "bg-[#052e16] border border-[#14532d] text-[#22c55e]"
    : "bg-[#450a0a] border border-[#7f1d1d] text-[#f87171]";
  const badgeDot = isTop ? "bg-[#22c55e]" : "bg-[#ef4444]";
  const badgeLabel = isTop ? "TOP PERFORMER" : "LOWEST DISTANCE";
  const sparkline = buildSparklinePath(item.sparkline);

  return (
    <div className="flex items-center justify-between gap-2 sm:gap-4 min-w-0">
      <div className="flex flex-col gap-0.75 min-w-0">
        <div className="flex flex-wrap items-center gap-1.5 font-bold min-w-0">
          <MainLayoutColor
            as={MainLayoutTextSize}
            color="title"
            size="filterText"
            className="truncate"
          >
            {item.plate}
          </MainLayoutColor>
          <MainLayoutColor
            as={MainLayoutTextSize}
            color="subtitle"
            size="captionText"
            className="font-medium truncate"
          >
            {item.vehicleType}
          </MainLayoutColor>
        </div>
        <p className="text-[15px] sm:text-[16px] font-extrabold" style={{ color }}>
          {item.distance}
        </p>

        <MainLayoutTextSize
          as="div"
          size="captionText"
          className={`inline-flex items-center gap-1 ${badgeBg} font-extrabold px-1.5 py-0.5 rounded-md w-max max-w-full`}
        >
          <span className={`w-1.5 h-1.5 rounded-full ${badgeDot} shrink-0`} />
          <span className="truncate">{badgeLabel}</span>
        </MainLayoutTextSize>
      </div>

      <div className="w-[72px] sm:w-[90px] h-[40px] shrink-0">
        {sparkline ? (
          <svg className="w-full h-full" viewBox="0 0 100 50">
            <path
              d={sparkline.d}
              fill="none"
              stroke={color}
              strokeWidth="2.5"
              strokeLinecap="round"
            />
            <circle
              cx={sparkline.last.x}
              cy={sparkline.last.y}
              r="3"
              fill="#ffffff"
              stroke={color}
              strokeWidth="2"
            />
          </svg>
        ) : null}
      </div>
    </div>
  );
}

export default function PerformanceSummary({ range = "24h" }) {
  const { results, totalDistance, totalChange, periodLabel, isLoading } =
    useAnalyticsPerformance(range, "distance");

  let top = null;
  let lowest = null;
  if (results.length === 1) {
    top = results[0];
  } else if (results.length > 1) {
    const ranked = [...results].sort((a, b) => {
      const av = a.distanceRaw ?? -Infinity;
      const bv = b.distanceRaw ?? -Infinity;
      return bv - av;
    });
    top = ranked[0];
    lowest = ranked[ranked.length - 1];
    if (top === lowest) lowest = null;
  }

  const ChangeIcon =
    totalChange && !totalChange.isPositive ? ArrowDownRight : ArrowUpRight;
  const changeColor =
    totalChange && !totalChange.isPositive
      ? "text-[#ef4444]"
      : "text-[#22c55e]";

  return (
    <MainLayoutColor
      as="div"
      background="surface"
      className="w-full h-full p-3 sm:p-4 flex flex-col justify-between select-none min-w-0"
    >
      <div className="flex flex-col sm:flex-row items-start justify-between gap-3 border-b border-zinc-800/50 pb-3 min-w-0">
        <div className="min-w-0">
          <MainLayoutColor
            as={MainLayoutTextSize}
            color="title"
            size="sectionTitle"
            className="font-bold tracking-tight block truncate"
          >
            Performance Summary
          </MainLayoutColor>
          <MainLayoutColor
            as={MainLayoutTextSize}
            color="subtitle"
            size="subInfoText"
            className="mt-0.5 block"
          >
            {periodLabel ?? "-"}
          </MainLayoutColor>
        </div>
        <div className="text-left sm:text-right shrink-0">
          <MainLayoutColor
            as={MainLayoutTextSize}
            color="subtitle"
            size="metricText"
            className="font-bold uppercase tracking-wider block"
          >
            Total Distance
          </MainLayoutColor>
          <div className="flex items-center gap-1 mt-0.5 justify-start sm:justify-end">
            <MainLayoutColor
              as={MainLayoutTextSize}
              color="title"
              size="plateText"
              className="font-extrabold"
            >
              {isLoading && totalDistance === "-" ? "-" : totalDistance}
            </MainLayoutColor>
            {totalChange ? (
              <span
                className={`flex items-center text-[9.5px] font-bold ${changeColor}`}
              >
                <ChangeIcon size={10} className="stroke-[2.5]" />
                {totalChange.label}
              </span>
            ) : null}
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-4 pt-3 flex-1 justify-center min-w-0">
        {results.length === 0 ? (
          <MainLayoutColor
            as={MainLayoutTextSize}
            color="subtitle"
            size="subInfoText"
            className="flex-1 flex items-center justify-center font-medium min-h-[120px]"
          >
            {isLoading ? "Loading..." : "No data available"}
          </MainLayoutColor>
        ) : (
          <>
            {top ? <PerformanceRow item={top} variant="top" /> : null}

            {top && lowest ? (
              <div className="border-b border-dashed border-zinc-800/60 w-full" />
            ) : null}

            {lowest ? <PerformanceRow item={lowest} variant="lowest" /> : null}
          </>
        )}
      </div>
    </MainLayoutColor>
  );
}