import React from "react";
import { ArrowUpRight } from "lucide-react";

export default function PerformanceSummary() {
  return (
    <div className="w-full h-full bg-[#121214] border border-[#1f1f23] rounded-2xl p-4 flex flex-col justify-between shadow-xl select-none">
      
      {/* Header Info Block */}
      <div className="flex items-start justify-between border-b border-zinc-800/50 pb-3">
        <div>
          <h3 className="text-[13px] font-bold text-white tracking-tight">Performance Summary</h3>
          <p className="text-[9px] text-zinc-500 mt-0.5">Jun 30 – Jul 6 • All Vehicles</p>
        </div>
        <div className="text-right">
          <p className="text-[8px] text-zinc-500 font-bold uppercase tracking-wider">Total Distance</p>
          <div className="flex items-center gap-1 mt-0.5 justify-end">
            <span className="text-[15px] font-extrabold text-white">3,248 km</span>
            <span className="flex items-center text-[9.5px] font-bold text-[#22c55e]">
              <ArrowUpRight size={10} className="stroke-[2.5]" />
              8.4%
            </span>
          </div>
        </div>
      </div>

      {/* Row Containers */}
      <div className="flex flex-col gap-4 pt-3 flex-1 justify-center">
        
        {/* Row 1: Top Performer */}
        <div className="flex items-center justify-between gap-4">
          <div className="flex flex-col gap-0.75">
            <div className="flex items-center gap-1.5 text-[10.5px] font-bold">
              <span className="text-white">MH12AB3482</span>
              <span className="text-zinc-500 font-medium text-[9.5px]">Heavy Truck</span>
            </div>
            <p className="text-[16px] font-extrabold text-[#22c55e]">842 km</p>
            
            {/* Pill Badge */}
            <div className="inline-flex items-center gap-1 bg-[#052e16] border border-[#14532d] text-[#22c55e] text-[7.5px] font-extrabold px-1.5 py-0.5 rounded-md w-max">
              <span className="w-1.5 h-1.5 rounded-full bg-[#22c55e]" />
              TOP PERFORMER
            </div>
          </div>

          {/* Green Sparkline Mini SVG */}
          <div className="w-[90px] h-[40px] shrink-0">
            <svg className="w-full h-full" viewBox="0 0 100 50">
              <path
                d="M 0 35 Q 15 45, 25 30 T 55 15 T 85 30 T 100 10"
                fill="none"
                stroke="#22c55e"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
              <circle cx="100" cy="10" r="3" fill="#ffffff" stroke="#22c55e" strokeWidth="2" />
            </svg>
          </div>
        </div>

        {/* Separator Divider */}
        <div className="border-b border-dashed border-zinc-800/60 w-full" />

        {/* Row 2: Lowest Distance */}
        <div className="flex items-center justify-between gap-4">
          <div className="flex flex-col gap-0.75">
            <div className="flex items-center gap-1.5 text-[10.5px] font-bold">
              <span className="text-white">MH15AB2211</span>
              <span className="text-zinc-500 font-medium text-[9.5px]">Container</span>
            </div>
            <p className="text-[16px] font-extrabold text-[#ef4444]">510 km</p>
            
            {/* Pill Badge */}
            <div className="inline-flex items-center gap-1 bg-[#450a0a] border border-[#7f1d1d] text-[#f87171] text-[7.5px] font-extrabold px-1.5 py-0.5 rounded-md w-max">
              <span className="w-1.5 h-1.5 rounded-full bg-[#ef4444]" />
              LOWEST DISTANCE
            </div>
          </div>

          {/* Red Sparkline Mini SVG */}
          <div className="w-[90px] h-[40px] shrink-0">
            <svg className="w-full h-full" viewBox="0 0 100 50">
              <path
                d="M 0 40 Q 15 42, 25 35 T 50 15 T 75 35 T 100 45"
                fill="none"
                stroke="#ef4444"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
              <circle cx="100" cy="45" r="3" fill="#ffffff" stroke="#ef4444" strokeWidth="2" />
            </svg>
          </div>
        </div>

      </div>

    </div>
  );
}