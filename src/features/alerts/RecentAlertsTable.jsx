import React from "react";
import { MoreVertical } from "lucide-react";
import MainLayoutColor from "../../components/Ui/MainLayoutUI/MainLayoutColor";
import MainLayoutTextSize from "../../components/Ui/MainLayoutUI/MainLayoutTextSize";

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
    <MainLayoutColor
      as="div"
      background="surface"
      border="cardBorder"
      className="w-full min-w-0 flex-none min-h-[280px] border rounded-xl p-2.5 sm:p-3 flex flex-col select-none overflow-hidden"
    >
      <div className="flex items-center justify-between mb-2.5 shrink-0">
        {/* 14px Section Title */}
        <MainLayoutColor
          as={MainLayoutTextSize}
          color="title"
          size="sectionTitle"
          className="font-bold tracking-tight block"
        >
          Recent Alerts
        </MainLayoutColor>
      </div>

      <div className="flex-none min-w-0 overflow-x-auto custom-scrollbar">
        <table className="w-full min-w-[760px] border-collapse">
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
                  className="text-left px-2.5 py-2 whitespace-nowrap"
                >
                  {/* 12px Subtitle Color Header */}
                  <MainLayoutColor
                    as={MainLayoutTextSize}
                    color="subtitle"
                    size="subInfoText"
                    className=" uppercase tracking-wide block"
                  >
                    {heading}
                  </MainLayoutColor>
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan={8} className="px-2.5 py-10 text-center">
                  <MainLayoutColor
                    as={MainLayoutTextSize}
                    color="subtitle"
                    size="sectionTitle"
                  >
                    Loading...
                  </MainLayoutColor>
                </td>
              </tr>
            ) : isError ? (
              <tr>
                <td colSpan={8} className="px-2.5 py-10 text-center text-[#ef4444]">
                  <MainLayoutTextSize size="sectionTitle">
                    Failed to load alerts
                  </MainLayoutTextSize>
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
                    {/* 14px Date & Time */}
                    <td className="px-2.5 py-2.5 whitespace-nowrap">
                      <MainLayoutColor
                        as={MainLayoutTextSize}
                        color="subtitle"
                        size="sectionTitle"
                      >
                        {alert.dateTime}
                      </MainLayoutColor>
                    </td>

                    {/* 14px Vehicle Plate */}
                    <td className="px-2.5 py-2.5 whitespace-nowrap">
                      <MainLayoutColor
                        as={MainLayoutTextSize}
                        color="title"
                        size="plateText"
                        className="font-semibold"
                      >
                        {alert.vehicle}
                      </MainLayoutColor>
                    </td>

                    {/* 14px Driver */}
                    <td className="px-2.5 py-2.5 whitespace-nowrap">
                      <MainLayoutColor
                        as={MainLayoutTextSize}
                        color="subtitle"
                        size="sectionTitle"
                      >
                        {alert.driver}
                      </MainLayoutColor>
                    </td>

                    {/* 14px Location */}
                    <td className="px-2.5 py-2.5 max-w-[180px] truncate">
                      <MainLayoutColor
                        as={MainLayoutTextSize}
                        color="subtitle"
                        size="sectionTitle"
                        className="truncate block"
                      >
                        {alert.location}
                      </MainLayoutColor>
                    </td>

                    {/* 14px Recorded Speed */}
                    <td className="px-2.5 py-2.5 whitespace-nowrap">
                      <MainLayoutTextSize
                        size="sectionTitle"
                        className={`font-semibold ${
                          overLimit ? "text-[#ef4444]" : "text-[#d4d4d8]"
                        }`}
                      >
                        {formatSpeed(recorded)}
                      </MainLayoutTextSize>
                    </td>

                    {/* 14px Speed Limit */}
                    <td className="px-2.5 py-2.5 whitespace-nowrap">
                      <MainLayoutColor
                        as={MainLayoutTextSize}
                        color="subtitle"
                        size="sectionTitle"
                      >
                        {formatSpeed(limit)}
                      </MainLayoutColor>
                    </td>

                    {/* Badge Text */}
                    <td className="px-2.5 py-2.5 whitespace-nowrap">
                      <span
                        className={`inline-flex items-center px-2 py-0.5 rounded-full border ${
                          STATUS_STYLES[alert.status] || STATUS_STYLES.Low
                        }`}
                      >
                        <MainLayoutTextSize
                          size="badgeText"
                          className="font-bold"
                        >
                          {alert.status}
                        </MainLayoutTextSize>
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
                <td colSpan={8} className="px-2.5 py-10 text-center">
                  <MainLayoutColor
                    as={MainLayoutTextSize}
                    color="subtitle"
                    size="sectionTitle"
                  >
                    No alerts found
                  </MainLayoutColor>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </MainLayoutColor>
  );
}