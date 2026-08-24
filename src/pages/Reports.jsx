import React, { useState } from "react";
import MainLayout from "../layouts/MainLayout";
import ReportsHeader from "../features/reports/ReportsHeader";
import ReportCard from "../features/reports/ReportCard";
import ReportResults from "../features/reports/ReportResults";
import TripReportHeader from "../features/reports/TripReportHeader";
import VehicleFilterReport from "../features/reports/VehiclesFilterReport";
import TripPerformanceSummary from "../features/reports/TripPerformanceSummary";

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
  const type = report?.type || "trip";
  const body = {
    type,
    from,
    to,
    sort: "distance",
  };

  if (type === "trip" || report?.raw?.requires_vehicles === true) {
    body.vehicles = vehicles;
  }

  return body;
}

export default function Reports() {
  const [isCustomReportView, setIsCustomReportView] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [InactiveReport, setInactiveReport] = useState(null);
  const [reportResult, setReportResult] = useState(null);
  const [resultError, setResultError] = useState(null);
  const [lastPayload, setLastPayload] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isExporting, setIsExporting] = useState(false);

  const [filterData, setFilterData] = useState({
    vehicle: "",
    dateRange: "7days",
    fromDate: defaultDateRange().from,
    toDate: defaultDateRange().to,
  });

  const generateMutation = useGenerateReport();

  const handleReportSelect = ({ report, result, error, lastPayload: payload, isLoading }) => {
    setInactiveReport(report);
    setReportResult(result);
    setResultError(error);
    setLastPayload(payload);
    setIsGenerating(isLoading);
  };

  const handleGenerateCustomReport = async (filtersOverride) => {
    const targetReport = { type: "trip" };
    setResultError(null);

    const currentFilters = filtersOverride || filterData;
    const from = currentFilters.fromDate || defaultDateRange().from;
    const to = currentFilters.toDate || defaultDateRange().to;
    let vehicles = [];

    const formatDisplayTime = (iso) => {
      if (!iso) return "-";
      try {
        const d = new Date(iso);
        return d.toLocaleString();
      } catch {
        return iso;
      }
    };

    try {
      if (currentFilters.vehicle) {
        vehicles = [currentFilters.vehicle];
      } else {
        const vehiclePayload = await getVehiclesList({ page: 1, page_size: 100 });
        vehicles = (vehiclePayload?.results ?? [])
          .map((v) => v.unique_id ?? v.uniqueId)
          .filter(Boolean);
      }

      const body = buildGenerateBody(targetReport, { from, to, vehicles });
      setLastPayload(body);

      const result = await generateMutation.mutateAsync(body);
      const apiResult = result ?? { rows: [], totals: {}, count: 0 };

      const mappedRows = (apiResult.rows ?? []).map((r) => ({
        id: r.unique_id ?? r.uniqueId ?? r.id,
        vehicleName: r.vehicle ?? r.vehicle_number ?? r.plate ?? "-",
        startTime: formatDisplayTime(r.start_time ?? r.startTime),
        endTime: formatDisplayTime(r.end_time ?? r.endTime),
        distance: (r.distance_km != null ? `${Number(r.distance_km).toFixed(2)} km` : "0 km"),
        duration: "-",
        maxSpeed: (r.max_speed_kmh != null ? `${r.max_speed_kmh} km/h` : "0 km/h"),
        avgSpeed: (r.avg_speed_kmh != null ? `${r.avg_speed_kmh} km/h` : "0 km/h"),
      }));

      setReportResult({ ...apiResult, rows: mappedRows });
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
    setInactiveReport(null);
    setReportResult(null);
    setResultError(null);
    setLastPayload(null);
    setIsGenerating(false);
    setIsCustomReportView(false);
  };

  const handleFilterChange = (updatedFilters) => {
    setFilterData(updatedFilters);
  };

  const handleResetFilter = () => {
    const reset = {
      vehicle: "",
      dateRange: "7days",
      fromDate: defaultDateRange().from,
      toDate: defaultDateRange().to,
    };
    setFilterData(reset);
    setReportResult(null);
    setResultError(null);
  };

  const showResultsView = InactiveReport != null;

  return (
    <MainLayout InactiveTab="Reports">
      <div className="flex-1 flex flex-col gap-2.5 min-h-0 overflow-y-auto pr-0.5 custom-scrollbar">
        {isCustomReportView ? (
          <div className="flex-1 flex flex-col gap-4 min-h-0">
            <div className="shrink-0">
              <TripReportHeader
                onExportClick={handleExport}
                onFilterChange={handleFilterChange}
              />
            </div>

            <div className="shrink-0">
              <VehicleFilterReport
                onFilterChange={handleFilterChange}
                onGenerateReport={(filters) => handleGenerateCustomReport(filters)}
                onReset={handleResetFilter}
              />
            </div>

            <div className="flex-1 min-h-0">
              <TripPerformanceSummary
                data={reportResult?.rows ?? []}
                isLoading={generateMutation.isPending}
                errorMessage={resultError}
                onSearch={(query) => setSearchQuery(query)}
                onSort={() => {}}
                onActionClick={(row) => {}}
              />
            </div>
          </div>
        ) : (
          <>
            <div className="shrink-0">
              <ReportsHeader
                searchQuery={searchQuery}
                onSearchChange={(e) => setSearchQuery(e.target.value)}
                onCreateClick={() => setIsCustomReportView(true)}
              />
            </div>

            {showResultsView ? (
              <ReportResults
                title={InactiveReport.title}
                result={reportResult}
                isLoading={isGenerating || generateMutation.isPending}
                isExporting={isExporting}
                errorMessage={resultError}
                onBack={handleBack}
                onExport={handleExport}
              />
            ) : (
              <ReportCard
                searchQuery={searchQuery}
                onReportSelect={handleReportSelect}
              />
            )}
          </>
        )}
      </div>
    </MainLayout>
  );
}