import React, { useState } from "react";
import { ArrowUpDown, Search, MoreHorizontal } from "lucide-react";

export default function TripPerformanceSummary({
  data = [],
  onSearch,
  onSort,
  onActionClick,
}) {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
    if (onSearch) onSearch(value);
  };

  return (
    <div className="w-full bg-[#121214] border border-[#27272a] rounded-2xl p-4 shadow-xl text-white select-none">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-4">
        <h2 className="text-[15px] font-bold text-white tracking-tight">
          Performance Summary
        </h2>

        <div className="flex items-center gap-2.5 w-full sm:w-auto">
          <button
            type="button"
            onClick={onSort}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#18181b]/80 border border-[#27272a] hover:bg-[#27272a] text-[#a1a1aa] hover:text-white text-[11.5px] transition-all cursor-pointer shrink-0"
          >
            <span>Sort by</span>
            <ArrowUpDown size={13} />
          </button>

          <div className="relative flex items-center w-full sm:w-[200px]">
            <input
              type="text"
              placeholder="Search Vehicle..."
              value={searchQuery}
              onChange={handleSearchChange}
              className="w-full bg-[#18181b]/80 border border-[#27272a] focus:border-[#ffd60a] rounded-full pl-3.5 pr-8 py-1.5 text-[11.5px] text-white placeholder-[#52525b] focus:outline-none transition-all"
            />
            <Search
              size={14}
              className="absolute right-3 text-[#71717a] pointer-events-none"
            />
          </div>
        </div>
      </div>

      <div className="w-full overflow-x-auto">
        <table className="w-full text-left text-[11.5px]">
          <thead>
            <tr className="border-b border-[#27272a]/60 text-[#71717a]">
              <th className="py-2.5 px-3 font-normal">Vehicle Name</th>
              <th className="py-2.5 px-3 font-normal">Start Time</th>
              <th className="py-2.5 px-3 font-normal">End Time</th>
              <th className="py-2.5 px-3 font-normal">Distance</th>
              <th className="py-2.5 px-3 font-normal">Duration</th>
              <th className="py-2.5 px-3 font-normal">Max Speed</th>
              <th className="py-2.5 px-3 font-normal">Avg Speed</th>
              <th className="py-2.5 px-3 font-normal text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#27272a]/40 text-[#d4d4d8]">
            {data && data.length > 0 ? (
              data.map((row, index) => (
                <tr
                  key={row.id || index}
                  className="hover:bg-[#18181b]/50 transition-colors"
                >
                  <td className="py-3 px-3 font-semibold text-white">
                    {row.vehicleName}
                  </td>
                  <td className="py-3 px-3">{row.startTime}</td>
                  <td className="py-3 px-3">{row.endTime}</td>
                  <td className="py-3 px-3">{row.distance}</td>
                  <td className="py-3 px-3">{row.duration}</td>
                  <td className="py-3 px-3">{row.maxSpeed}</td>
                  <td className="py-3 px-3">{row.avgSpeed}</td>
                  <td className="py-3 px-3 text-right">
                    <button
                      type="button"
                      onClick={() => onActionClick && onActionClick(row)}
                      className="p-1 hover:bg-[#27272a] rounded-lg text-[#a1a1aa] hover:text-white transition-colors cursor-pointer"
                    >
                      <MoreHorizontal size={15} />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={8}
                  className="py-8 text-center text-[#52525b] text-[12px]"
                >
                  No performance data available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}