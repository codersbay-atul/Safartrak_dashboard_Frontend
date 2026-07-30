import React, { useMemo, useState } from "react";
import MainLayout from "../layouts/MainLayout";
import ReportsHeader from "../features/reports/ReportsHeader";
import ReportCard from "../components/Ui/ReportCard";
import ReportResults from "../features/reports/ReportResults";
import { useReportTypes } from "../hooks/useReportTypes";
import {
  isReportTypeUnavailableError,
  useGenerateReport,
} from "../hooks/useGenerateReport";
import { getVehiclesList } from "../services/vehicleService";
import { exportReport } from "../services/reportsService";
import { toast } from "../components/Ui/toast";

function formatDateInput(date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

function defaultDateRange() {
  const to = new Date();
  const from = new Date();
  from.setDate(from.getDate() - 7);
  return {
    from: formatDateInput(from),
    to: formatDateInput(to),
  };
}

function buildGenerateBody(report, { from, to, vehicles = [] }) {
  const type = report.type;
  const body = {
    type,
    from,
    to,
    sort: "distance",
  };

  // Trip-style reports require vehicle unique IDs.
  if (type === "trip" || report.raw?.requires_vehicles === true) {
    body.vehicles = vehicles;
  }

  return body;
}

export default function Reports() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeReport, setActiveReport] = useState(null);
  const [reportResult, setReportResult] = useState(null);
  const [resultError, setResultError] = useState(null);
  const [lastPayload, setLastPayload] = useState(null);
  const [isExporting, setIsExporting] = useState(false);

  const { reports, isLoading, isError } = useReportTypes();
  const generateMutation = useGenerateReport();

  const filteredReports = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) return reports;
    return reports.filter((report) => {
      return (
        report.title.toLowerCase().includes(query) ||
        report.description.toLowerCase().includes(query)
      );
    });
  }, [reports, searchQuery]);

  const handleGenerate = async (report) => {
    setActiveReport(report);
    setReportResult(null);
    setResultError(null);

    // Prediction is not a valid generate choice on the API today.
    if (report.type === "prediction") {
      setResultError("Report type currently unavailable");
      return;
    }

    const { from, to } = defaultDateRange();
    let vehicles = [];

    try {
      if (report.type === "trip" || report.raw?.requires_vehicles === true) {
        const vehiclePayload = await getVehiclesList({ page: 1, page_size: 100 });
        vehicles = (vehiclePayload?.results ?? [])
          .map((v) => v.unique_id ?? v.uniqueId)
          .filter(Boolean);
      }

      const body = buildGenerateBody(report, { from, to, vehicles });
      setLastPayload(body);

      const result = await generateMutation.mutateAsync(body);
      setReportResult(result ?? { rows: [], totals: {}, count: 0 });
    } catch (error) {
      if (isReportTypeUnavailableError(error)) {
        setResultError("Report type currently unavailable");
      } else {
        setResultError(error?.message || "Failed to generate report");
      }
      setReportResult(null);
    }
  };

  const handleExport = async () => {
    if (!lastPayload) return;
    setIsExporting(true);
    try {
      const response = await exportReport(lastPayload);
      const disposition =
        response.headers?.["content-disposition"] ||
        response.headers?.["Content-Disposition"];
      let filename = "report_export";
      if (disposition) {
        const match = /filename\*?=([^;]+)/i.exec(disposition);
        if (match) {
          filename = match[1].replace(/UTF-8''/, "").replace(/"/g, "");
        }
      }

      const blob = new Blob([response.data], {
        type: response.data?.type || "application/octet-stream",
      });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
      toast.success("Export started");
    } catch (err) {
      console.error("Report export failed", err);
      toast.error(err?.message || "Export failed");
    } finally {
      setIsExporting(false);
    }
  };

  const handleBack = () => {
    setActiveReport(null);
    setReportResult(null);
    setResultError(null);
    setLastPayload(null);
  };

  const showResultsView = activeReport != null;

  return (
    <MainLayout activeTab="Reports">
      <div className="flex-1 flex flex-col gap-3.5 min-h-0 overflow-y-auto pr-0.5 custom-scrollbar">
        <ReportsHeader
          searchQuery={searchQuery}
          onSearchChange={(e) => setSearchQuery(e.target.value)}
          onCreateClick={() => {}}
        />

        {showResultsView ? (
          <ReportResults
            title={activeReport.title}
            result={reportResult}
            isLoading={generateMutation.isPending}
            isExporting={isExporting}
            errorMessage={resultError}
            onBack={handleBack}
            onExport={handleExport}
          />
        ) : isLoading ? (
          <div className="flex flex-1 items-center justify-center rounded-xl border border-dashed border-[#27272a] bg-[#121214]/60 px-4 py-16">
            <p className="text-[11px] text-[#71717a]">Loading...</p>
          </div>
        ) : isError ? (
          <div className="flex flex-1 items-center justify-center rounded-xl border border-dashed border-[#27272a] bg-[#121214]/60 px-4 py-16">
            <p className="text-[11px] text-[#71717a]">Failed to load reports</p>
          </div>
        ) : reports.length === 0 ? (
          <div className="flex flex-1 items-center justify-center rounded-xl border border-dashed border-[#27272a] bg-[#121214]/60 px-4 py-16">
            <p className="text-[11px] text-[#71717a]">No reports available</p>
          </div>
        ) : filteredReports.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 pb-1">
            {filteredReports.map((report) => (
              <ReportCard
                key={report.id}
                title={report.title}
                description={report.description}
                icon={report.icon}
                onClick={() => handleGenerate(report)}
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-1 items-center justify-center rounded-xl border border-dashed border-[#27272a] bg-[#121214]/60 px-4 py-16">
            <p className="text-[11px] text-[#71717a]">
              No reports match &ldquo;{searchQuery}&rdquo;
            </p>
          </div>
        )}
      </div>
    </MainLayout>
  );
}
