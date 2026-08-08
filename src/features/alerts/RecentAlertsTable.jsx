import React from "react";
import { MoreVertical } from "lucide-react";

const STATUS_STYLES = {
  Critical: "bg-[#ef4444]/15 text-[#ef4444] border-[#ef4444]/30",
  High: "bg-[#ef4444]/15 text-[#ef4444] border-[#ef4444]/30",
  Medium: "bg-[#FDBB24]/15 text-[#FDBB24] border-[#FDBB24]/30",
  Low: "bg-[#71717a]/15 text-[#a1a1aa] border-[#71717a]/30",
};

function formatSpeed(value) {
  if (value == null || value === "" || value === "-") return "-";
  const n = Number(value);
  if (!Number.isFinite(n)) return "-";
  return `${n} km/h`;
}

export default function RecentAlertsTable({
  alerts = [],
  isLoading = false,
  isError = false,
}) {
  return (
    <div className="w-full flex-1 min-h-[280px] lg:min-h-0 bg-[#121214] border border-[#1f1f23] rounded-xl p-3 flex flex-col select-none overflow-hidden">
      <div className="flex items-center justify-between mb-2.5 shrink-0">
        <h3 className="text-[12px] font-bold text-white tracking-tight">
          Recent VIEW
        </h3>
      </div>

      <div className="flex-1 min-h-0 min-w-0 overflow-x-auto overflow-y-auto custom-scrollbar !overflow-x-auto">
        <table className="w-full min-w-[900px] border-collapse">
          <thead className="sticky top-0 z-10 bg-[#121214]">
            <tr className="border-b border-[#1f1f23]">
              {[
                "Date & Time",
                "Vehicle",
                "Driver",
                "Location",
                "Recorded Speed",
                "Speed Limit",
                "Status",
                "Action",
              ].map((heading) => (
                <th
                  key={heading}
                  className="text-left text-[9px] font-semibold uppercase tracking-wide text-[#71717a] px-2.5 py-2 whitespace-nowrap"
                >
                  {heading}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {isLoading ? (
              <tr>
                <td
                  colSpan={8}
                  className="px-2.5 py-10 text-center text-[11px] text-[#71717a]"
                >
                  Loading...
                </td>
              </tr>
            ) : isError ? (
              <tr>
                <td
                  colSpan={8}
                  className="px-2.5 py-10 text-center text-[11px] text-[#71717a]"
                >
                  Failed to load alerts
                </td>
              </tr>
            ) : alerts.length > 0 ? (
              alerts.map((alert) => {
                const recorded = alert.recordedSpeed;
                const limit = alert.speedLimit;
                const overLimit =
                  recorded != null &&
                  limit != null &&
                  Number.isFinite(Number(recorded)) &&
                  Number.isFinite(Number(limit)) &&
                  Number(recorded) > Number(limit);

                return (
                  <tr
                    key={alert.id}
                    className="border-b border-[#1f1f23]/70 hover:bg-[#16161a]/80 transition-colors"
                  >
                    <td className="px-2.5 py-2.5 text-[10px] text-[#d4d4d8] whitespace-nowrap">
                      {alert.dateTime}
                    </td>
                    <td className="px-2.5 py-2.5 text-[10px] font-semibold text-white whitespace-nowrap">
                      {alert.vehicle}
                    </td>
                    <td className="px-2.5 py-2.5 text-[10px] text-[#d4d4d8] whitespace-nowrap">
                      {alert.driver}
                    </td>
                    <td className="px-2.5 py-2.5 text-[10px] text-[#a1a1aa] max-w-[180px] truncate">
                      {alert.location}
                    </td>
                    <td
                      className={`px-2.5 py-2.5 text-[10px] font-semibold whitespace-nowrap ${
                        overLimit ? "text-[#ef4444]" : "text-[#d4d4d8]"
                      }`}
                    >
                      {formatSpeed(recorded)}
                    </td>
                    <td className="px-2.5 py-2.5 text-[10px] text-[#a1a1aa] whitespace-nowrap">
                      {formatSpeed(limit)}
                    </td>
                    <td className="px-2.5 py-2.5 whitespace-nowrap">
                      <span
                        className={`inline-flex items-center px-2 py-0.5 rounded-full border text-[9px] font-bold ${
                          STATUS_STYLES[alert.status] || STATUS_STYLES.Low
                        }`}
                      >
                        {alert.status}
                      </span>
                    </td>
                    <td className="px-2.5 py-2.5 whitespace-nowrap">
                      <button
                        type="button"
                        className="p-1 rounded-md text-[#71717a] hover:text-white hover:bg-[#1f1f23] transition-colors cursor-pointer"
                      >
                        <MoreVertical size={14} />
                      </button>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td
                  colSpan={8}
                  className="px-2.5 py-10 text-center text-[11px] text-[#71717a]"
                >
                  No alerts found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
