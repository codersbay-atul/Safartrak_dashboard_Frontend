import React from "react";
import { RefreshCw, ArrowUpRight } from "lucide-react";

export default function FleetPerformanceChart() {
  return (
    <div className="flex flex-col lg:flex-row gap-4 w-full p-6 bg-[#0c0c0e] min-h-screen text-zinc-100 font-sans select-none">
      
      <div className="flex-1 bg-[#121214] border border-[#1f1f23] rounded-2xl p-5 flex flex-col justify-between shadow-xl">
        
        <div className="flex flex-wrap items-center justify-between gap-4 pb-4">
          <div className="flex items-center gap-3">
            <div>
              <h3 className="text-[15px] font-bold tracking-tight text-white">Fleet Distance</h3>
              <p className="text-[10px] text-zinc-500 mt-0.5">Last Updated : 11:49 AM</p>
            </div>
            {/* Live Indicator Badge */}
            <span className="flex items-center gap-1 bg-[#052e16] border border-[#14532d] text-[#22c55e] text-[9.5px] font-bold px-2 py-0.5 rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-[#22c55e] animate-pulse" />
              Live
            </span>
          </div>

          {/* Timeframe Controls */}
          <div className="flex items-center gap-3">
            <button className="text-zinc-500 hover:text-white transition-colors cursor-pointer">
              <RefreshCw size={14} className="stroke-[2.5]" />
            </button>
            <div className="flex items-center bg-[#18181b] border border-[#27272a] rounded-lg p-0.5">
              <button className="px-3 py-1 bg-[#27272a] text-white text-[11px] font-bold rounded-md shadow">
                24H
              </button>
              <button className="px-3 py-1 text-zinc-400 hover:text-zinc-200 text-[11px] font-semibold">
                7D
              </button>
              <button className="px-3 py-1 text-zinc-400 hover:text-zinc-200 text-[11px] font-semibold">
                1 Month
              </button>
            </div>
          </div>
        </div>

        {/* Chart Canvas & Axes Area */}
        <div className="relative flex-1 min-h-[220px] mt-4 flex">
          
          {/* Y-Axis Labels */}
          <div className="flex flex-col justify-between text-[10px] text-zinc-600 font-bold pr-3 select-none pb-6 pt-2">
            <span>5K</span>
            <span>4K</span>
            <span>3K</span>
            <span>2K</span>
            <span>1K</span>
            <span>0</span>
          </div>

          {/* Core SVG Chart Area */}
          <div className="flex-1 relative">
            
            {/* Grid Lines Overlay */}
            <div className="absolute inset-0 flex flex-col justify-between pb-6 pt-2 pointer-events-none opacity-20">
              <div className="border-b border-dashed border-zinc-700 w-full" />
              <div className="border-b border-dashed border-zinc-700 w-full" />
              <div className="border-b border-dashed border-zinc-700 w-full" />
              <div className="border-b border-dashed border-zinc-700 w-full" />
              <div className="border-b border-dashed border-zinc-700 w-full" />
              <div className="border-b border-zinc-700 w-full" />
            </div>

            {/* Area Line and Gradient */}
            <svg className="w-full h-full pb-6 pt-2 overflow-visible" viewBox="0 0 600 200" preserveAspectRatio="none">
              <defs>
                {/* Area Gradient */}
                <linearGradient id="blueGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#2563eb" stopOpacity="0.5" />
                  <stop offset="100%" stopColor="#2563eb" stopOpacity="0.0" />
                </linearGradient>
              </defs>

              {/* Area Path */}
              <path
                d="M 0 110 
                   C 30 90, 50 70, 80 95
                   C 110 120, 130 110, 150 125
                   C 170 140, 190 100, 210 90
                   C 230 80, 250 110, 270 115
                   C 290 120, 310 70, 340 60
                   C 370 50, 390 85, 410 75
                   C 430 65, 450 120, 480 150
                   C 500 170, 520 145, 540 140
                   C 560 135, 580 145, 600 135
                   C 620 125, 640 135, 660 120
                   C 680 105, 700 115, 720 105
                   C 740 95, 760 125, 780 135
                   C 800 145, 820 120, 840 130
                   C 860 140, 880 160, 900 150
                   C 920 140, 940 120, 960 100
                   C 980 80, 1000 45, 1020 30 L 1020 200 L 0 200 Z"
                fill="url(#blueGradient)"
                transform="scale(0.588, 1)" /* Adjust scale to fit 600px width perfectly */
              />

              {/* Top Smooth Neon Stroke Path */}
              <path
                d="M 0 110 
                   C 30 90, 50 70, 80 95
                   C 110 120, 130 110, 150 125
                   C 170 140, 190 100, 210 90
                   C 230 80, 250 110, 270 115
                   C 290 120, 310 70, 340 60
                   C 370 50, 390 85, 410 75
                   C 430 65, 450 120, 480 150
                   C 500 170, 520 145, 540 140
                   C 560 135, 580 145, 600 135
                   C 620 125, 640 135, 660 120
                   C 680 105, 700 115, 720 105
                   C 740 95, 760 125, 780 135
                   C 800 145, 820 120, 840 130
                   C 860 140, 880 160, 900 150
                   C 920 140, 940 120, 960 100
                   C 980 80, 1000 45, 1020 30"
                fill="none"
                stroke="#2563eb"
                strokeWidth="3.2"
                strokeLinecap="round"
                transform="scale(0.588, 1)"
              />

              {/* End Active Highlight Dot */}
              <circle cx="600" cy="30" r="6" fill="#2563eb" />
              <circle cx="600" cy="30" r="11" fill="#2563eb" fillOpacity="0.3" className="animate-ping" />
            </svg>

            {/* Tooltip Overlay matching exact placement at final peak */}
            <div className="absolute right-[-6px] top-[-2px] -translate-y-full flex flex-col items-center pointer-events-none z-10">
              <div className="bg-[#1c1c1f] border border-zinc-800 text-[10.5px] font-bold text-white px-2 py-1 rounded shadow-lg">
                4016 km
              </div>
            </div>

            {/* X-Axis Labels Row */}
            <div className="absolute bottom-0 left-0 right-0 flex justify-between text-[10px] text-zinc-500 font-bold px-1 select-none">
              <span>Mon</span>
              <span>Tue</span>
              <span>Wed</span>
              <span>Thu</span>
              <span>Fri</span>
              <span>Sat</span>
              <span>Sun</span>
            </div>

          </div>
        </div>

      </div>

      {/* =========================================================================
         RIGHT CARD: PERFORMANCE SUMMARY
         ========================================================================= */}
      <div className="w-full lg:w-[380px] xl:w-[420px] bg-[#121214] border border-[#1f1f23] rounded-2xl p-5 flex flex-col justify-between shadow-xl shrink-0">
        
        {/* Header Block */}
        <div className="flex items-start justify-between border-b border-zinc-800/50 pb-4">
          <div>
            <h3 className="text-[14px] font-bold text-white tracking-tight">Performance Summary</h3>
            <p className="text-[10px] text-zinc-500 mt-0.5">Jun 30 – Jul 6  •  All Vehicles</p>
          </div>
          <div className="text-right">
            <p className="text-[9px] text-zinc-500 font-bold uppercase tracking-wider">Total Distance</p>
            <div className="flex items-center gap-1 mt-0.5">
              <span className="text-[16px] font-extrabold text-white">3,248 km</span>
              <span className="flex items-center text-[10px] font-bold text-[#22c55e]">
                <ArrowUpRight size={11} className="stroke-[2.5]" />
                8.4%
              </span>
            </div>
          </div>
        </div>

        {/* Performance Rows */}
        <div className="flex flex-col gap-5 pt-5 flex-1 justify-center">
          
          {/* Row 1: Top Performer */}
          <div className="flex items-center justify-between gap-4">
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-1.5 text-[11px] font-bold">
                <span className="text-white">MH12AB3482</span>
                <span className="text-zinc-500 font-medium">Heavy Truck</span>
              </div>
              <p className="text-[18px] font-extrabold text-[#22c55e]">842 km</p>
              
              {/* Green Pill Badge */}
              <div className="inline-flex items-center gap-1 bg-[#052e16] border border-[#14532d] text-[#22c55e] text-[8px] font-extrabold px-1.5 py-0.5 rounded-md w-max">
                <span className="w-1.5 h-1.5 rounded-full bg-[#22c55e]" />
                TOP PERFORMER
              </div>
            </div>

            {/* Custom Green Mini Graph */}
            <div className="w-[110px] h-[55px] relative">
              <svg className="w-full h-full" viewBox="0 0 100 50">
                <path
                  d="M 0 35 Q 15 45, 25 30 T 55 15 T 85 30 T 100 10"
                  fill="none"
                  stroke="#22c55e"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
                <circle cx="100" cy="10" r="3.5" fill="#ffffff" stroke="#22c55e" strokeWidth="2" />
              </svg>
            </div>
          </div>

          {/* Subtle Row Divider */}
          <div className="border-b border-dashed border-zinc-800/80 w-full" />

          {/* Row 2: Lowest Distance */}
          <div className="flex items-center justify-between gap-4">
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-1.5 text-[11px] font-bold">
                <span className="text-white">MH15AB2211</span>
                <span className="text-zinc-500 font-medium">Container</span>
              </div>
              <p className="text-[18px] font-extrabold text-[#ef4444]">510 km</p>
              
              {/* Red Pill Badge */}
              <div className="inline-flex items-center gap-1 bg-[#450a0a] border border-[#7f1d1d] text-[#f87171] text-[8px] font-extrabold px-1.5 py-0.5 rounded-md w-max">
                <span className="w-1.5 h-1.5 rounded-full bg-[#ef4444]" />
                LOWEST DISTANCE
              </div>
            </div>

            {/* Custom Red Mini Graph */}
            <div className="w-[110px] h-[55px] relative">
              <svg className="w-full h-full" viewBox="0 0 100 50">
                <path
                  d="M 0 40 Q 15 42, 25 35 T 50 15 T 75 35 T 100 45"
                  fill="none"
                  stroke="#ef4444"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
                <circle cx="100" cy="45" r="3.5" fill="#ffffff" stroke="#ef4444" strokeWidth="2" />
              </svg>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}