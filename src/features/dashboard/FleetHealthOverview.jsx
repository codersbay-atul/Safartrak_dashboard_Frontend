import React, { useState } from "react";
import { RefreshCw, Radio } from "lucide-react";

const timeRanges = ["24H", "7D"];

const summaryStats = [
  {
    id: "vehicle",
    label: "Vehicle",
    value: 5,
    bg: "bg-[#1e3a8a]",
    textColor: "text-blue-200",
  },
  {
    id: "healthy",
    label: "Healthy",
    value: 5,
    bg: "bg-[#14532d]",
    textColor: "text-green-300",
  },
  {
    id: "warning",
    label: "Warning",
    value: 5,
    bg: "bg-[#92400e]",
    textColor: "text-amber-200",
  },
  {
    id: "critical",
    label: "Critical",
    value: 0,
    bg: "bg-[#9a3412]",
    textColor: "text-orange-200",
  },
  {
    id: "alert",
    label: "Alert",
    value: 0,
    bg: "bg-[#991b1b]",
    textColor: "text-red-200",
  },
];

export default function FleetHealthOverview() {
  const [activeRange, setActiveRange] = useState("24H");

  return (
    <div className="w-full h-full bg-[#121214] border border-[#1f1f23] rounded-xl p-5 flex flex-col select-none overflow-hidden">
      {/* Header */}
      <div className="flex items-start justify-between gap-3 shrink-0">
        <div className="min-w-0">
          <h3 className="text-[12px] font-bold text-white tracking-tight">
            Fleet Health Overview
          </h3>
          <p className="text-[8.5px] text-zinc-500 mt-0.5">
            Last Updated : 11:49 AM
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <span className="flex items-center gap-1 text-[8px] font-bold text-[#22c55e] bg-[#004d1f] px-2 py-1 rounded-full shrink-0">
            <Radio size={9} className="stroke-[2.5]" />
            Live
          </span>

          <button
            type="button"
            className="text-zinc-500 hover:text-white transition-colors cursor-pointer"
          >
            <RefreshCw size={11} className="stroke-[2.5]" />
          </button>

          <div className="flex items-center bg-black rounded-xl p-0.5 shrink-0">
            {timeRanges.map((range) => (
              <button
                key={range}
                type="button"
                onClick={() => setActiveRange(range)}
                className={`px-2.5 py-1 rounded-lg text-[9px] font-semibold transition-all cursor-pointer ${
                  activeRange === range
                    ? "bg-[#27272a] text-white"
                    : "text-zinc-500 hover:text-zinc-300"
                }`}
              >
                {range}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content — charts will go here */}
      <div className="flex-1" />

      {/* Bottom Summary Chips */}
      <div className="grid grid-cols-5 gap-2 shrink-0">
        {summaryStats.map((stat) => (
          <div
            key={stat.id}
            className={`${stat.bg} ${stat.textColor} w-full h-8 rounded-xl flex items-center justify-center gap-0.5 overflow-hidden`}
          >
            <span className="text-[11px] font-extrabold text-white">
              {stat.value}
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
