import React, { useState } from "react";
import MainLayout from "../layouts/MainLayout";
import AnalyticsHeader from "../features/analytics/AnalyticsHeader";
import AnalyticsStatsCard from "../features/analytics/AnalyticsStatsCard";
import FleetPerformanceChart from "../features/analytics/FleetPerformanceChart";
import PerformanceSummary from "../features/analytics/PerformanceSummary";
import PerformanceSummaryList from "../features/analytics/PerformanceSummaryList";
import { getAnalyticsExport } from "../services/analyticsService";
import { toast } from "../components/Ui/toast";

export default function Analytics() {
  const [range, setRange] = useState("24h");

  const handleExport = async () => {
    try {
      const response = await getAnalyticsExport({ range });

      const disposition =
        response.headers?.["content-disposition"] ||
        response.headers?.["Content-Disposition"];
      let filename = "analytics_export";
      if (disposition) {
        const match = /filename\*?=([^;]+)/i.exec(disposition);
        if (match) {
          filename = match[1].replace(/UTF-8''/, "").replace(/"/g, "");
        }
      }

      const blob = new Blob([response.data], {
        type: response.data.type || "application/octet-stream",
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
      console.error("Export failed", err);
      toast.error(err?.message || "Export failed");
    }
  };

  return (
    <MainLayout activeTab="Analytics">
      <div className="flex-1 flex flex-col gap-2.5 min-h-0 overflow-y-auto min-[1152px]:overflow-hidden pr-0.5 text-white custom-scrollbar">
        <div className="shrink-0">
          <AnalyticsHeader onExportClick={handleExport} />
        </div>

        <div className="shrink-0">
          <AnalyticsStatsCard range={range} />
        </div>

        <div className="flex flex-col lg:flex-row gap-3.5 w-full shrink-0 items-stretch">
          <div className="flex-1 min-w-0 bg-[#141416] border border-[#222226] rounded-2xl p-3.5 min-h-[340px]">
            <FleetPerformanceChart range={range} onRangeChange={setRange} />
          </div>

          <div className="w-full lg:w-[360px] xl:w-[400px] shrink-0">
            <PerformanceSummary range={range} />
          </div>
        </div>

        <div className="w-full shrink-0 bg-[#141416] border border-[#222226] rounded-2xl p-4 shadow-xl">
          <PerformanceSummaryList range={range} />
        </div>
      </div>
    </MainLayout>
  );
}