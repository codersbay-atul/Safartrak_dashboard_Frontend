import React from "react";
import { MoreVertical, BellRing } from "lucide-react";
import MainLayoutColor from "../../components/Ui/MainLayoutUI/MainLayoutColor";
import MainLayoutTextSize from "../../components/Ui/MainLayoutUI/MainLayoutTextSize";
import MainTableHeader from "../../components/Ui/MainLayoutUI/MainTableHeader";
import MainStatusBadge from "../../components/Ui/MainLayoutUI/MainStatusBadge";

const TABLE_HEADINGS = [
  "Date & Time",
  "Vehicle",
  "Driver",
  "Location",
  "Recorded Speed",
  "Speed Limit",
  "Status",
  "Action",
];

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
    <div className="w-full min-w-0 flex flex-col gap-2 font-sans select-none shrink-0 mt-4">
      {/* 1. Outside Header Toolbar */}
      <div className="flex items-center justify-between gap-2 px-1 shrink-0">
        <div className="flex items-center gap-2">
          <MainLayoutColor
            as={BellRing}
            color="yellow"
            className="w-4 h-4 shrink-0"
          />
          <MainLayoutColor
            as={MainLayoutTextSize}
            color="title"
            size="sectionTitle"
            className="font-bold tracking-tight block"
          >
            Recent Alerts
          </MainLayoutColor>
        </div>
      </div>

      {/* 2. End-to-End Table Card Container */}
      <MainLayoutColor
        as="div"
        background="surface"
        border="cardBorder"
        className="w-full min-w-0 flex-none min-h-[280px] rounded-2xl flex flex-col overflow-hidden shadow-2xl"
      >
        <div className="w-full overflow-x-auto custom-scrollbar flex-1 min-h-0 relative">
          <table className="w-full min-w-[760px] border-collapse">
            <thead className="sticky top-0 z-10 shadow-sm">
              <MainLayoutColor
                as="tr"
                background="tableHeaderBg"
                border="cardBorder"
                className="border-b w-full"
              >
                {TABLE_HEADINGS.map((heading, index) => (
                  <MainTableHeader
                    key={heading}
                    className={`py-3 text-left ${
                      index === 0
                        ? "pl-4 pr-3"
                        : index === TABLE_HEADINGS.length - 1
                        ? "pr-4 pl-3"
                        : "px-3"
                    }`}
                  >
                    {heading}
                  </MainTableHeader>
                ))}
              </MainLayoutColor>
            </thead>

            <tbody className="divide-y divide-[#27272a]/50">
              {isLoading ? (
                <tr>
                  <td colSpan={8} className="px-3 py-10 text-center">
                    <MainLayoutColor
                      as={MainLayoutTextSize}
                      color="subtitle"
                      size="subInfoText"
                    >
                      Loading alerts...
                    </MainLayoutColor>
                  </td>
                </tr>
              ) : isError ? (
                <tr>
                  <td colSpan={8} className="px-3 py-10 text-center">
                    <MainLayoutColor
                      as={MainLayoutTextSize}
                      color="expiredStatusBadge"
                      size="subInfoText"
                    >
                      Failed to load alerts
                    </MainLayoutColor>
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
                    <MainLayoutColor
                      key={alert.id}
                      as="tr"
                      className="border-b transition-colors hover:bg-[#18181b]/40 cursor-pointer"
                    >
                      {/* Date & Time */}
                      <td className="pl-4 pr-3 py-3 whitespace-nowrap">
                        <MainLayoutColor
                          as={MainLayoutTextSize}
                          color="subtitle"
                          size="subInfoText"
                          className="font-normal"
                        >
                          {alert.dateTime}
                        </MainLayoutColor>
                      </td>

                      {/* Vehicle Plate */}
                      <td className="px-3 py-3 whitespace-nowrap">
                        <MainLayoutColor
                          as={MainLayoutTextSize}
                          color="title"
                          size="plateText"
                          className="font-semibold"
                        >
                          {alert.vehicle}
                        </MainLayoutColor>
                      </td>

                      {/* Driver */}
                      <td className="px-3 py-3 whitespace-nowrap">
                        <MainLayoutColor
                          as={MainLayoutTextSize}
                          color="subtitle"
                          size="subInfoText"
                          className="font-normal"
                        >
                          {alert.driver}
                        </MainLayoutColor>
                      </td>

                      {/* Location */}
                      <td className="px-3 py-3 max-w-[180px] truncate">
                        <MainLayoutColor
                          as={MainLayoutTextSize}
                          color="subtitle"
                          size="subInfoText"
                          className="truncate block font-normal"
                        >
                          {alert.location}
                        </MainLayoutColor>
                      </td>

                      {/* Recorded Speed */}
                      <td className="px-3 py-3 whitespace-nowrap">
                        <MainLayoutColor
                          as={MainLayoutTextSize}
                          color={overLimit ? "expiredStatusBadge" : "title"}
                          size="subInfoText"
                          className="font-semibold"
                        >
                          {formatSpeed(recorded)}
                        </MainLayoutColor>
                      </td>

                      {/* Speed Limit */}
                      <td className="px-3 py-3 whitespace-nowrap">
                        <MainLayoutColor
                          as={MainLayoutTextSize}
                          color="subtitle"
                          size="subInfoText"
                          className="font-normal"
                        >
                          {formatSpeed(limit)}
                        </MainLayoutColor>
                      </td>

                      {/* Badge Status */}
                      <td className="px-3 py-3 whitespace-nowrap">
                        <MainStatusBadge
                          status={alert.status || "Inactive"}
                          showDot={false}
                        />
                      </td>

                      {/* Action Menu Button */}
                      <td className="pr-4 pl-3 py-3 whitespace-nowrap">
                        <MainLayoutColor
                          as="button"
                          type="button"
                          color="subtitle"
                          className="p-1 rounded-md transition-colors cursor-pointer hover:text-white"
                        >
                          <MoreVertical size={14} />
                        </MainLayoutColor>
                      </td>
                    </MainLayoutColor>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={8} className="px-3 py-10 text-center">
                    <MainLayoutColor
                      as={MainLayoutTextSize}
                      color="subtitle"
                      size="subInfoText"
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
    </div>
  );
}