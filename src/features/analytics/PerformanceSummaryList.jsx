import React, { useState, useEffect } from "react";
import { ArrowUpDown, Activity } from "lucide-react";
import { getAnalyticsPerformance } from "../../api/analyticsApi";
import MainSearchInput from "../../components/Ui/MainLayoutUI/MainSearchInput";
import MainLayoutTextSize from "../../components/Ui/MainLayoutUI/MainLayoutTextSize";
import MainLayoutColor from "../../components/Ui/MainLayoutUI/MainLayoutColor";
import MainLayoutFilterButton from "../../components/Ui/MainLayoutUI/MainLayoutFilterButton";
import MainTableHeader from "../../components/Ui/MainLayoutUI/MainTableHeader";

function formatDistance(item) {
  if (
    item.distance &&
    typeof item.distance === "string" &&
    item.distance.toLowerCase().includes("km")
  ) {
    return item.distance;
  }
  const val = item.distance_km ?? item.distance ?? item.total_distance_km;
  if (val == null || val === "" || String(val).toLowerCase() === "nan")
    return "-";
  const num = Number(val);
  if (Number.isFinite(num)) {
    return `${num.toLocaleString("en-US", { maximumFractionDigits: 1 })} km`;
  }
  return String(val);
}

function formatChange(item) {
  const val = item.change ?? item.change_pct ?? item.change_percentage;
  if (val == null || val === "" || String(val).toLowerCase() === "nan")
    return "-";
  if (typeof val === "object") return "-";

  if (typeof val === "number") {
    const abs = Math.abs(val).toLocaleString("en-US", {
      maximumFractionDigits: 1,
    });
    if (val > 0) return `↑ ${abs}%`;
    if (val < 0) return `↓ ${abs}%`;
    return `0%`;
  }

  const str = String(val).trim();
  if (str.startsWith("↑") || str.startsWith("↓")) return str;
  if (str.startsWith("+")) return `↑ ${str.slice(1).trim()}`;
  if (str.startsWith("-")) return `↓ ${str.slice(1).trim()}`;

  const num = Number(str.replace("%", "").trim());
  if (Number.isFinite(num)) {
    const abs = Math.abs(num).toLocaleString("en-US", {
      maximumFractionDigits: 1,
    });
    if (num > 0) return `↑ ${abs}%`;
    if (num < 0) return `↓ ${abs}%`;
    return `0%`;
  }

  return str;
}

function formatContribution(item) {
  const val =
    item.contribution ?? item.contribution_pct ?? item.contribution_percentage;
  if (val == null || val === "" || String(val).toLowerCase() === "nan")
    return "-";
  if (typeof val === "number") {
    return `${val.toLocaleString("en-US", { maximumFractionDigits: 1 })}%`;
  }
  const str = String(val).trim();
  if (str.endsWith("%")) return str;
  const num = Number(str);
  if (Number.isFinite(num)) {
    return `${num.toLocaleString("en-US", { maximumFractionDigits: 1 })}%`;
  }
  return str;
}

export default function PerformanceSummaryList({ range = "24h" }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortAsc, setSortAsc] = useState(true);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);

    getAnalyticsPerformance({ range: range || "24h", sort: "distance" })
      .then((res) => {
        if (!isMounted) return;
        const results = res?.results || [];
        const mapped = results.map((item, idx) => ({
          id:
            item.id ??
            item.vehicle_number ??
            item.registration_number ??
            item.plate ??
            `row-${idx}`,
          vehicleNumber:
            item.vehicleNumber ??
            item.vehicle_number ??
            item.registration_number ??
            item.plate ??
            item.reg_no ??
            item.registration ??
            item.vehicle_reg ??
            "-",
          vehicleType:
            item.vehicleType ??
            item.vehicle_type ??
            item.type ??
            item.category ??
            item.fleet_type ??
            "-",
          distance: formatDistance(item),
          change: formatChange(item),
          contribution: formatContribution(item),
        }));
        setData(mapped);
      })
      .catch((err) => {
        console.error("Failed to fetch analytics performance:", err);
        if (isMounted) setData([]);
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [range]);

  const filteredData = data
    .filter(
      (item) =>
        (item.vehicleNumber || "")
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        (item.vehicleType || "")
          .toLowerCase()
          .includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      return sortAsc
        ? a.vehicleNumber.localeCompare(b.vehicleNumber)
        : b.vehicleNumber.localeCompare(a.vehicleNumber);
    });

  return (
    <div className="w-full flex flex-col gap-3 font-sans select-none min-w-0">
      {/* Outside Header Toolbar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-1 mt-2 sm:mt-4 min-w-0">
        <div className="flex items-center gap-2 min-w-0">
          <MainLayoutColor
            as={Activity}
            color="yellow"
            className="w-4 h-4 shrink-0"
          />
          <MainLayoutColor
            as={MainLayoutTextSize}
            color="title"
            size="sectionTitle"
            className="font-bold tracking-wide block truncate"
          >
            Performance Summary
          </MainLayoutColor>
        </div>

        <div className="flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center sm:justify-end gap-2 w-full sm:w-auto shrink-0">
          <MainLayoutFilterButton
            isActive={!sortAsc}
            onClick={() => setSortAsc((prev) => !prev)}
            className="h-[34px] px-3.5 border border-[#27272a] hover:border-[#FDBB24]/40 rounded-full flex items-center justify-center gap-1.5 transition-colors w-full sm:w-auto"
          >
            <MainLayoutTextSize size="filterText">
              {sortAsc ? "Sort A-Z" : "Sort Z-A"}
            </MainLayoutTextSize>
            <ArrowUpDown size={11} className="shrink-0" />
          </MainLayoutFilterButton>

          <div className="w-full sm:w-[170px] shrink-0 h-[34px]">
            <MainSearchInput
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search Vehicle..."
              iconPosition="right"
              className="w-full h-[34px]"
            />
          </div>
        </div>
      </div>

      {/* Table Card Container */}
      <MainLayoutColor
        as="div"
        background="surface"
        border="cardBorder"
        className="w-full h-fit rounded-xl sm:rounded-2xl overflow-hidden shadow-2xl border min-w-0"
      >
        <div className="w-full overflow-x-auto [scrollbar-width:thin] custom-scrollbar">
          <table className="w-full text-left border-collapse min-w-[560px] sm:min-w-[650px]">
            <thead className="sticky top-0 z-10 shadow-sm">
              <MainLayoutColor
                as="tr"
                background="tableHeaderBg"
                border="cardBorder"
                className="border-b"
              >
                <MainTableHeader className="py-2.5 sm:py-3 px-3 sm:px-4 pl-4 sm:pl-5">
                  Vehicle Number
                </MainTableHeader>
                <MainTableHeader className="py-2.5 sm:py-3 px-3 sm:px-4">
                  Vehicle Type
                </MainTableHeader>
                <MainTableHeader className="py-2.5 sm:py-3 px-3 sm:px-4">
                  Distance
                </MainTableHeader>
                <MainTableHeader className="py-2.5 sm:py-3 px-3 sm:px-4">
                  Change
                </MainTableHeader>
                <MainTableHeader className="py-2.5 sm:py-3 px-3 sm:px-4 pr-4 sm:pr-5">
                  Contribution
                </MainTableHeader>
              </MainLayoutColor>
            </thead>

            <tbody className="divide-y divide-[#1d1d20]/50">
              {loading ? (
                <tr>
                  <td colSpan={5} className="py-8 text-center">
                    <MainLayoutColor
                      as={MainLayoutTextSize}
                      color="subtitle"
                      size="subInfoText"
                    >
                      Loading performance data...
                    </MainLayoutColor>
                  </td>
                </tr>
              ) : filteredData.length > 0 ? (
                filteredData.map((row) => (
                  <tr
                    key={row.id}
                    className="hover:bg-[#18181b]/40 transition-colors align-middle cursor-pointer"
                  >
                    <td className="py-3 sm:py-3.5 px-3 sm:px-4 pl-4 sm:pl-5 max-w-[140px]">
                      <MainLayoutColor
                        as={MainLayoutTextSize}
                        color="title"
                        size="sectionTitle"
                        className="font-medium block truncate"
                      >
                        {row.vehicleNumber}
                      </MainLayoutColor>
                    </td>

                    <td className="py-3 sm:py-3.5 px-3 sm:px-4 max-w-[140px]">
                      <MainLayoutColor
                        as={MainLayoutTextSize}
                        color="subtitle"
                        size="sectionTitle"
                        className="font-normal block truncate"
                      >
                        {row.vehicleType}
                      </MainLayoutColor>
                    </td>

                    <td className="py-3 sm:py-3.5 px-3 sm:px-4 whitespace-nowrap">
                      <MainLayoutColor
                        as={MainLayoutTextSize}
                        color="title"
                        size="sectionTitle"
                        className="font-medium block truncate"
                      >
                        {row.distance}
                      </MainLayoutColor>
                    </td>

                    <td className="py-3 sm:py-3.5 px-3 sm:px-4 whitespace-nowrap">
                      <MainLayoutColor
                        as={MainLayoutTextSize}
                        color="subtitle"
                        size="sectionTitle"
                        className="font-normal block truncate"
                      >
                        {row.change}
                      </MainLayoutColor>
                    </td>

                    <td className="py-3 sm:py-3.5 px-3 sm:px-4 pr-4 sm:pr-5 whitespace-nowrap">
                      <MainLayoutColor
                        as={MainLayoutTextSize}
                        color="title"
                        size="sectionTitle"
                        className="font-medium block truncate"
                      >
                        {row.contribution}
                      </MainLayoutColor>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="py-8 text-center">
                    <MainLayoutColor
                      as={MainLayoutTextSize}
                      color="subtitle"
                      size="subInfoText"
                    >
                      No matching performance data found.
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