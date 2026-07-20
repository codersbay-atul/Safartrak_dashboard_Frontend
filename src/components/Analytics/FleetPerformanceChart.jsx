import React from "react";
import { RefreshCw } from "lucide-react";

export default function FleetPerformanceChart() {
  return (
    <div className="w-full h-full bg-[#121214] border border-[#1f1f23] rounded-2xl p-4 flex flex-col justify-between shadow-xl select-none">
      
      {/* Top Controls Header Area */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-2">
        <div className="flex items-center gap-3">
          <div>
            <h3 className="text-[13px] font-bold tracking-tight text-white">Fleet Distance</h3>
            <p className="text-[9px] text-zinc-500 mt-0.5">Last Updated: 11:49 AM</p>
          </div>
          {/* Live Indicator Badge */}
          <span className="flex items-center gap-1 bg-[#052e16] border border-[#14532d] text-[#22c55e] text-[9px] font-bold px-2 py-0.5 rounded-full">
            <span className="w-1.5 h-1.5 rounded-full bg-[#22c55e] animate-pulse" />
            Live
          </span>
        </div>

        {/* Timeframe Selector Button Controls */}
        <div className="flex items-center gap-3">
          <button className="text-zinc-500 hover:text-white transition-colors cursor-pointer">
            <RefreshCw size={13} className="stroke-[2.5]" />
          </button>
          <div className="flex items-center bg-[#18181b] border border-[#27272a] rounded-lg p-0.5">
            <button className="px-2.5 py-0.5 bg-[#27272a] text-white text-[10px] font-bold rounded-md shadow">
              24H
            </button>
            <button className="px-2.5 py-0.5 text-zinc-400 hover:text-zinc-200 text-[10px] font-semibold transition-colors cursor-pointer">
              7D
            </button>
            <button className="px-2.5 py-0.5 text-zinc-400 hover:text-zinc-200 text-[10px] font-semibold transition-colors cursor-pointer">
              1 Month
            </button>
          </div>
        </div>
      </div>

      {/* Chart Canvas Graphic Panel */}
      <div className="relative flex-1 min-h-[200px] mt-2 flex">
        
        {/* Y-Axis Metrics Labels */}
        <div className="flex flex-col justify-between text-[9px] text-zinc-600 font-bold pr-2.5 select-none pb-5 pt-1">
          <span>5K</span>
          <span>4K</span>
          <span>3K</span>
          <span>2K</span>
          <span>1K</span>
          <span>0</span>
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
          <svg className="w-full h-full pb-5 pt-1 overflow-visible" viewBox="0 0 600 200" preserveAspectRatio="none">
            <defs>
              <linearGradient id="blueGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#2563eb" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#2563eb" stopOpacity="0.0" />
              </linearGradient>
            </defs>

          
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
              transform="scale(0.588, 1)"
            />

            {/* Top Glowing Stroke */}
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
              strokeWidth="2.5"
              strokeLinecap="round"
              transform="scale(0.588, 1)"
            />

            {/* Endpoint Neon Anchor Point */}
            <circle cx="600" cy="30" r="4.5" fill="#ffffff" stroke="#2563eb" strokeWidth="2" />
          </svg>

          {/* Tooltip Metrics Bubble */}
          <div className="absolute right-0 top-0 -translate-y-[80%] pointer-events-none z-10">
            <div className="bg-[#1c1c1f] border border-zinc-800 text-[9.5px] font-bold text-white px-2 py-0.5 rounded shadow-lg">
              4016 km
            </div>
          </div>

          {/* X-Axis Days Timeline Row */}
          <div className="absolute bottom-0 left-0 right-0 flex justify-between text-[9.5px] text-zinc-500 font-bold px-1 select-none">
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
  );
}