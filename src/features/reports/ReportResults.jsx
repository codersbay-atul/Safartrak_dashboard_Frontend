import React, { useMemo } from "react";
import { ArrowLeft, Download, Loader2 } from "lucide-react";
import { MAIN_LAYOUT_TEXT_SIZES } from "../../components/Ui/MainLayoutUI/MainLayoutTextSize";
import MainLayoutColor from "../../components/Ui/MainLayoutUI/MainLayoutColor";
import MainHeaderActionButton from "../../components/Ui/MainLayoutUI/MainHeaderActionButton";

function isMissingValue(value) {
  if (value == null) return true;
  if (typeof value === "number" && Number.isNaN(value)) return true;
  if (typeof value === "string" && value.trim() === "") return true;
  return false;
}

function displayValue(value) {
  if (isMissingValue(value)) return "-";
  if (typeof value === "object") {
    try {
      return JSON.stringify(value);
    } catch {
      return "-";
    }
  }
  return String(value);
}

function humanizeKey(key) {
  return String(key)
    .replace(/_/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

function formatTotalValue(value) {
  if (isMissingValue(value)) return "-";
  if (typeof value === "number") {
    return value.toLocaleString("en-US", { maximumFractionDigits: 2 });
  }
  return String(value);
}

/**
 * Renders generate-report API response (rows / totals / count).
 * Visual language matches existing Reports empty-state / dark panels.
 */
export default function ReportResults({
  title = "Report",
  result,
  isLoading = false,
  isExporting = false,
  errorMessage = null,
  onBack,
  onExport,
}) {
  const rows = Array.isArray(result?.rows) ? result.rows : [];
  const totals =
    result?.totals && typeof result.totals === "object" ? result.totals : null;
  const count =
    result?.count != null && Number.isFinite(Number(result.count))
      ? Number(result.count)
      : rows.length;

  const columns = useMemo(() => {
    if (rows.length === 0) return [];
    const keys = new Set();
    rows.forEach((row) => {
      if (row && typeof row === "object") {
        Object.keys(row).forEach((key) => keys.add(key));
      }
    });
    return Array.from(keys);
  }, [rows]);

  return (
    <div className="flex flex-col gap-3 flex-1 min-h-0">
      <div className="flex flex-wrap items-center justify-between gap-2 shrink-0">
        <div className="flex items-center gap-2 min-w-0">
          <button
            type="button"
            onClick={onBack}
            className="flex items-center gap-1.5 text-[11px] text-[#a1a1aa] hover:text-white transition-colors cursor-pointer"
          >
            <ArrowLeft
              size={13}
              className="stroke-[2.5] text-[#9D6F00]"
            />
            Back
          </button>
          <h2 className="text-[13px] font-bold text-white tracking-tight truncate">
            {title}
          </h2>
          {!isLoading && !errorMessage ? (
            <span className="text-[10px] text-[#71717a] font-medium">
              {count} {count === 1 ? "row" : "rows"}
            </span>
          ) : null}
        </div>

        {onExport ? (
          <MainHeaderActionButton
            icon={isExporting ? Loader2 : Download}
            iconPosition="right"
            onClick={onExport}
            disabled={isExporting || isLoading || Boolean(errorMessage)}
          >
            Export
          </MainHeaderActionButton>
        ) : null}
      </div>

      {totals && Object.keys(totals).length > 0 ? (
        <div className="flex flex-wrap gap-2 shrink-0">
          {Object.entries(totals).map(([key, value]) => (
            <div
              key={key}
              className="rounded-lg border border-[#232329] bg-[#16161a] px-3 py-2 min-w-[120px]"
            >
              <p className={`uppercase tracking-wider ${MAIN_LAYOUT_TEXT_SIZES.metricText}`}>
                <MainLayoutColor color="subtitle">
                  {humanizeKey(key)}
                </MainLayoutColor>
              </p>
              <p className="text-[13px] font-bold text-white mt-0.5">
                {formatTotalValue(value)}
              </p>
            </div>
          ))}
        </div>
      ) : null}

      <div className="flex-1 min-h-[280px] rounded-xl border border-[#1f1f23] bg-[#121214] overflow-hidden flex flex-col">
        {isLoading ? (
          <div className="flex flex-1 items-center justify-center px-4 py-16">
            <p className="text-[11px] text-[#71717a]">Loading...</p>
          </div>
        ) : errorMessage ? (
          <div className="flex flex-1 items-center justify-center px-4 py-16">
            <p className="text-[11px] text-[#71717a]">{errorMessage}</p>
          </div>
        ) : rows.length === 0 ? (
          <div className="flex flex-1 items-center justify-center px-4 py-16">
            <p className="text-[11px] text-[#71717a]">No data available</p>
          </div>
        ) : (
          <div className="flex-1 overflow-auto custom-scrollbar">
            <table className="w-full min-w-[640px] border-collapse">
              <thead className="sticky top-0 bg-[#09090b] border-b border-[#1d1d20] z-10">
                <tr>
                  {columns.map((col) => (
                    <th
                      key={col}
                      className={`text-left tracking-wider px-3 py-2.5 whitespace-nowrap uppercase ${MAIN_LAYOUT_TEXT_SIZES.metricText}`}
                    >
                      <MainLayoutColor color="subtitle">
                        {humanizeKey(col)}
                      </MainLayoutColor>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-[#1d1d20]/50">
                {rows.map((row, index) => (
                  <tr
                    key={row?.id ?? row?.unique_id ?? index}
                    className="hover:bg-[#16161a]/80"
                  >
                    {columns.map((col) => (
                      <td
                        key={col}
                        className={`px-3 py-2.5 whitespace-nowrap ${MAIN_LAYOUT_TEXT_SIZES.plateText}`}
                      >
                        <MainLayoutColor color="white">
                          {displayValue(row?.[col])}
                        </MainLayoutColor>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}