import React, { useMemo } from "react";
import { useReportTypes } from "../../hooks/useReportTypes";
import {
  isReportTypeUnavailableError,
  useGenerateReport,
} from "../../hooks/useGenerateReport";
import { getVehiclesList } from "../../services/vehicleService";
import MainReportCard from "../../components/Ui/MainLayoutUI/MainReportsCard";

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

export default function ReportCard({
  searchQuery = "",
  onReportSelect,
}) {
  const { reports = [], isLoading, isError } = useReportTypes();
  const generateMutation = useGenerateReport();

  const filteredReports = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) return reports;
    return reports.filter((report) => {
      return (
        report.title?.toLowerCase().includes(query) ||
        report.description?.toLowerCase().includes(query)
      );
    });
  }, [reports, searchQuery]);

  const handleGenerateCardReport = async (report) => {
    onReportSelect?.({
      report,
      result: null,
      error: null,
      lastPayload: null,
      isLoading: true,
    });

    if (report.type === "prediction") {
      onReportSelect?.({
        report,
        result: null,
        error: "Report type currently unavailable",
        lastPayload: null,
        isLoading: false,
      });
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
      const result = await generateMutation.mutateAsync(body);

      onReportSelect?.({
        report,
        result: result ?? { rows: [], totals: {}, count: 0 },
        error: null,
        lastPayload: body,
        isLoading: false,
      });
    } catch (error) {
      const errorMsg = isReportTypeUnavailableError(error)
        ? "Report type currently unavailable"
        : error?.message || "Failed to generate report";

      onReportSelect?.({
        report,
        result: null,
        error: errorMsg,
        lastPayload: null,
        isLoading: false,
      });
    }
  };

  if (isLoading) {
    return (
      <div className="flex flex-1 items-center justify-center rounded-xl border border-dashed border-[#27272a] bg-[#121214]/60 px-4 py-16">
        <p className="text-[11px] text-[#71717a]">Loading...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex flex-1 items-center justify-center rounded-xl border border-dashed border-[#27272a] bg-[#121214]/60 px-4 py-16">
        <p className="text-[11px] text-[#71717a]">Failed to load reports</p>
      </div>
    );
  }

  if (reports.length === 0) {
    return (
      <div className="flex flex-1 items-center justify-center rounded-xl border border-dashed border-[#27272a] bg-[#121214]/60 px-4 py-16">
        <p className="text-[11px] text-[#71717a]">No reports available</p>
      </div>
    );
  }

  if (filteredReports.length === 0) {
    return (
      <div className="flex flex-1 items-center justify-center rounded-xl border border-dashed border-[#27272a] bg-[#121214]/60 px-4 py-16">
        <p className="text-[11px] text-[#71717a]">
          No reports match &ldquo;{searchQuery}&rdquo;
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 pb-1">
      {filteredReports.map((report) => (
        <MainReportCard
          key={report.id}
          title={report.title}
          description={report.description}
          icon={report.icon}
          onClick={() => handleGenerateCardReport(report)}
        />
      ))}
    </div>
  );
}