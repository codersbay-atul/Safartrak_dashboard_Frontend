import React, { useState } from "react";
import { Search, ArrowUpDown } from "lucide-react";

const INITIAL_DATA = [
  {
    id: "1",
    vehicleNumber: "MH12AB3482",
    vehicleType: "Heavy Truck",
    distance: "842 km",
    change: "↑ 12.6%",
    contribution: "25.9%",
  },
  {
    id: "2",
    vehicleNumber: "MH12AB3482",
    vehicleType: "Container",
    distance: "842 km",
    change: "↑ 12.6%",
    contribution: "25.9%",
  },
];

export default function PerformanceSummaryList() {
  const [searchTerm, setSearchTerm] = useState("");
  const [data, setData] = useState(INITIAL_DATA);

  const filteredData = data.filter(
    (item) =>
      item.vehicleNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.vehicleType.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="w-full bg-[#121214] border border-[#1f1f23] rounded-2xl p-4 font-sans text-white shadow-xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
        <h3 className="text-sm font-semibold tracking-wide text-white">
          Performance Summary
        </h3>

        <div className="flex items-center gap-2">
          <button
            type="button"
            className="flex items-center gap-2 px-3 py-1.5 bg-[#18181c] hover:bg-[#222226] border border-[#27272a] rounded-xl text-xs font-medium text-[#a1a1aa] transition-colors"
          >
            <span>Sort by</span>
            <ArrowUpDown className="w-3.5 h-3.5 text-[#a1a1aa]" />
          </button>

          <div className="relative flex items-center">
            <input
              type="text"
              placeholder="Search Vehicle..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-48 sm:w-56 bg-[#09090b] border border-[#27272a] focus:border-[#3f3f46] rounded-xl pl-3 pr-8 py-1.5 text-xs text-white placeholder-[#71717a] outline-none transition-all"
            />
            <Search className="w-3.5 h-3.5 text-[#71717a] absolute right-2.5 pointer-events-none" />
          </div>
        </div>
      </div>

      <div className="w-full overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[600px]">
          <thead>
            <tr className="bg-[#18181c]/60 text-[11px] font-normal text-[#8e8e93]">
              <th className="py-2.5 px-4 rounded-l-lg">Vehicle Number</th>
              <th className="py-2.5 px-4">Vehicle Type</th>
              <th className="py-2.5 px-4">Distance</th>
              <th className="py-2.5 px-4">Change</th>
              <th className="py-2.5 px-4 rounded-r-lg">Contribution</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-[#1c1c20] text-xs">
            {filteredData.map((row) => (
              <tr
                key={row.id}
                className="hover:bg-[#18181c]/40 transition-colors"
              >
                <td className="py-3 px-4 font-semibold text-white">
                  {row.vehicleNumber}
                </td>
                <td className="py-3 px-4 text-[#d4d4d8] font-medium">
                  {row.vehicleType}
                </td>
                <td className="py-3 px-4 text-white font-semibold">
                  {row.distance}
                </td>
                <td className="py-3 px-4 text-[#e4e4e7] font-medium">
                  {row.change}
                </td>
                <td className="py-3 px-4 text-white font-semibold">
                  {row.contribution}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
