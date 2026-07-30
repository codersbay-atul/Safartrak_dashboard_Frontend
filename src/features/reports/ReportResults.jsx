import React, { useMemo } from "react";
import { ArrowLeft, Download, Loader2 } from "lucide-react";
import Button from "../../components/Ui/Button";

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
            <ArrowLeft size={13} className="stroke-[2.5]" />
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
          <Button
            variant="primary"
            size="sm"
            icon={isExporting ? Loader2 : Download}
            iconPosition="right"
            onClick={onExport}
            disabled={isExporting || isLoading || Boolean(errorMessage)}
            className="!w-[120px] min-w-[120px] !h-[35px] !rounded-[8px] !bg-[#FFC107] hover:!bg-[#e6ac00] active:scale-[0.98] !text-black !font-normal !text-[14px] !px-[14px] !py-0 gap-2 whitespace-nowrap flex-nowrap flex-shrink-0 [&_svg]:size-[14px]"
          >
            Export
          </Button>
        ) : null}
      </div>

      {totals && Object.keys(totals).length > 0 ? (
        <div className="flex flex-wrap gap-2 shrink-0">
          {Object.entries(totals).map(([key, value]) => (
            <div
              key={key}
              className="rounded-lg border border-[#232329] bg-[#16161a] px-3 py-2 min-w-[120px]"
            >
              <p className="text-[9.5px] text-[#71717a] font-bold uppercase tracking-wider">
                {humanizeKey(key)}
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
                      className="text-left text-[10px] font-bold text-[#71717a] uppercase tracking-wider px-3 py-2.5 whitespace-nowrap"
                    >
                      {humanizeKey(col)}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-[#1d1d20]/50 text-[10.5px]">
                {rows.map((row, index) => (
                  <tr
                    key={row?.id ?? row?.unique_id ?? index}
                    className="hover:bg-[#16161a]/80"
                  >
                    {columns.map((col) => (
                      <td
                        key={col}
                        className="px-3 py-2.5 text-[#d4d4d8] whitespace-nowrap"
                      >
                        {displayValue(row?.[col])}
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
