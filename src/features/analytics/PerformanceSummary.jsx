import React from "react";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";
import { useAnalyticsPerformance } from "../../hooks/useAnalyticsPerformance";

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
    <div className="flex items-center justify-between gap-4">
      <div className="flex flex-col gap-0.75">
        <div className="flex items-center gap-1.5 text-[10.5px] font-bold">
          <span className="text-white">{item.plate}</span>
          <span className="text-zinc-500 font-medium text-[9.5px]">
            {item.vehicleType}
          </span>
        </div>
        <p
          className="text-[16px] font-extrabold"
          style={{ color }}
        >
          {item.distance}
        </p>

        {/* Pill Badge */}
        <div
          className={`inline-flex items-center gap-1 ${badgeBg} text-[7.5px] font-extrabold px-1.5 py-0.5 rounded-md w-max`}
        >
          <span className={`w-1.5 h-1.5 rounded-full ${badgeDot}`} />
          {badgeLabel}
        </div>
      </div>

      {/* Sparkline Mini SVG — only real series points */}
      <div className="w-[90px] h-[40px] shrink-0">
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
  const {
    results,
    totalDistance,
    totalChange,
    periodLabel,
    isLoading,
  } = useAnalyticsPerformance(range, "distance");

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
    totalChange && !totalChange.isPositive ? "text-[#ef4444]" : "text-[#22c55e]";

  return (
    <div className="w-full h-full bg-[#121214] border border-[#1f1f23] rounded-2xl p-4 flex flex-col justify-between shadow-xl select-none">
      
      {/* Header Info Block */}
      <div className="flex items-start justify-between border-b border-zinc-800/50 pb-3">
        <div>
          <h3 className="text-[15px] font-bold text-white tracking-tight">Performance Summary</h3>
          <p className="text-[12px] text-zinc-500 mt-0.5">
            {periodLabel ?? "-"}
          </p>
        </div>
        <div className="text-right">
          <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider">Total Distance</p>
          <div className="flex items-center gap-1 mt-0.5 justify-end">
            <span className="text-[15px] font-extrabold text-white">
              {isLoading && totalDistance === "-" ? "-" : totalDistance}
            </span>
            {totalChange ? (
              <span className={`flex items-center text-[9.5px] font-bold ${changeColor}`}>
                <ChangeIcon size={10} className="stroke-[2.5]" />
                {totalChange.label}
              </span>
            ) : null}
          </div>
        </div>
      </div>

      {/* Row Containers */}
      <div className="flex flex-col gap-4 pt-3 flex-1 justify-center">
        {results.length === 0 ? (
          <div className="flex-1 flex items-center justify-center text-[12px] text-zinc-500 font-medium min-h-[120px]">
            {isLoading ? "Loading..." : "No data available"}
          </div>
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

    </div>
  );
}
