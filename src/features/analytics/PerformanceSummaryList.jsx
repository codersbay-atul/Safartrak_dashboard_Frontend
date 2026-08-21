import React, { useState, useEffect } from "react";
import { ArrowUpDown } from "lucide-react";
import { getAnalyticsPerformance } from "../../api/analyticsApi";
import MainSearchInput from "../../components/Ui/MainLayoutUI/MainSearchInput";
import MainLayoutTextSize from "../../components/Ui/MainLayoutUI/MainLayoutTextSize";
import MainLayoutColor from "../../components/Ui/MainLayoutUI/MainLayoutColor";

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

  const filteredData = data.filter(
    (item) =>
      (item.vehicleNumber || "")
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      (item.vehicleType || "")
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
  );

  return (
    <MainLayoutColor
      as="div"
      background="surface"
      className="w-full h-full flex flex-col justify-between font-sans text-white select-none"
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
        <MainLayoutColor
          as={MainLayoutTextSize}
          color="title"
          size="sectionTitle"
          className="text-white"
        >
          Performance Summary
        </MainLayoutColor>

        <div className="flex items-center gap-2">
          <button
            type="button"
            className="flex items-center gap-2 px-3 py-1.5 bg-[#18181c] hover:bg-[#222226] border border-[#27272a] rounded-full text-xs font-medium text-[#a1a1aa] transition-colors h-[34px]"
          >
            <span>Sort by</span>
            <ArrowUpDown className="w-3.5 h-3.5 text-[#a1a1aa]" />
          </button>

          <MainSearchInput
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search Vehicle..."
            iconPosition="right"
            containerClassName="w-48 sm:w-56"
            className="!rounded-full !bg-[#09090b] !border-[#27272a] h-[34px] py-1.5 text-xs text-white placeholder-[#71717a]"
          />
        </div>
      </div>

      <div className="w-full overflow-x-auto">
        <table className="w-full table-fixed border-collapse min-w-[650px]">
          <thead>
            <tr className="bg-[#18181c]/60 font-normal">
              <th className="w-1/5 py-2.5 px-4 text-left rounded-l-lg">
                <MainLayoutColor
                  as={MainLayoutTextSize}
                  color="subtitle"
                  size="metricText"
                  className="font-normal"
                >
                  Vehicle Number
                </MainLayoutColor>
              </th>
              <th className="w-1/5 py-2.5 px-4 text-left">
                <MainLayoutColor
                  as={MainLayoutTextSize}
                  color="subtitle"
                  size="metricText"
                  className="font-normal"
                >
                  Vehicle Type
                </MainLayoutColor>
              </th>
              <th className="w-1/5 py-2.5 px-4 text-left">
                <MainLayoutColor
                  as={MainLayoutTextSize}
                  color="subtitle"
                  size="metricText"
                  className="font-normal"
                >
                  Distance
                </MainLayoutColor>
              </th>
              <th className="w-1/5 py-2.5 px-4 text-left">
                <MainLayoutColor
                  as={MainLayoutTextSize}
                  color="subtitle"
                  size="metricText"
                  className="font-normal"
                >
                  Change
                </MainLayoutColor>
              </th>
              <th className="w-1/5 py-2.5 px-4 text-left rounded-r-lg">
                <MainLayoutColor
                  as={MainLayoutTextSize}
                  color="subtitle"
                  size="metricText"
                  className="font-normal"
                >
                  Contribution
                </MainLayoutColor>
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-[#1c1c20] text-xs">
            {loading ? (
              <tr>
                <td colSpan={5} className="py-8 text-center">
                  <MainLayoutColor
                    as={MainLayoutTextSize}
                    color="subtitle"
                    size="subInfoText"
                  >
                    Loading...
                  </MainLayoutColor>
                </td>
              </tr>
            ) : filteredData.length === 0 ? (
              <tr>
                <td colSpan={5} className="py-8 text-center">
                  <MainLayoutColor
                    as={MainLayoutTextSize}
                    color="subtitle"
                    size="subInfoText"
                  >
                    No data available
                  </MainLayoutColor>
                </td>
              </tr>
            ) : (
              filteredData.map((row) => (
                <tr
                  key={row.id}
                  className="hover:bg-[#18181c]/40 transition-colors"
                >
                  <td className="w-1/5 py-3 px-4 text-left font-semibold text-white truncate">
                    {row.vehicleNumber}
                  </td>
                  <td className="w-1/5 py-3 px-4 text-left text-[#d4d4d8] font-medium truncate">
                    {row.vehicleType}
                  </td>
                  <td className="w-1/5 py-3 px-4 text-left text-white font-semibold truncate">
                    {row.distance}
                  </td>
                  <td className="w-1/5 py-3 px-4 text-left text-[#e4e4e7] font-medium truncate">
                    {row.change}
                  </td>
                  <td className="w-1/5 py-3 px-4 text-left text-white font-semibold truncate">
                    {row.contribution}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </MainLayoutColor>
  );
}