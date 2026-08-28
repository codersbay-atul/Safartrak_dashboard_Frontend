import React, { useState } from "react";
import { ChartNoAxesCombined } from "lucide-react";
import MainLayout from "../layouts/MainLayout";
import AnalyticsHeader from "../features/analytics/AnalyticsHeader";
import AnalyticsStatsCard from "../features/analytics/AnalyticsStatsCard";
import FleetPerformanceChart from "../features/analytics/FleetPerformanceChart";
import PerformanceSummary from "../features/analytics/PerformanceSummary";
import PerformanceSummaryList from "../features/analytics/PerformanceSummaryList";
import { getAnalyticsExport } from "../services/analyticsService";
import { toast } from "../components/Ui/toast";
import MainSectionHeader from "../components/Ui/MainLayoutUI/MainSectionHeader";

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
    <MainLayout activeTab="Analytics" allowPageScroll>
      <div className="flex-1 flex flex-col gap-4 xl:gap-5 min-h-0 min-w-0 overflow-y-auto overflow-x-hidden no-scrollbar pr-0.5 text-white">
        <div className="shrink-0 w-full min-w-0">
          <AnalyticsHeader onExportClick={handleExport} />
        </div>

        <div className="shrink-0 w-full min-w-0">
          <AnalyticsStatsCard range={range} />
        </div>

        <div className="shrink-0">
          <MainSectionHeader icon={ChartNoAxesCombined} title="Fleet Performance" />
        </div>

        <div className="flex flex-col xl:flex-row gap-4 xl:gap-5 w-full shrink-0 items-stretch">
          <div className="flex-1 min-w-0 w-full h-[320px] sm:h-[380px] md:h-[420px] xl:h-[440px] bg-[#141416] border border-[#222226] rounded-xl sm:rounded-2xl p-3 sm:p-4 overflow-hidden relative z-0">
            <FleetPerformanceChart range={range} onRangeChange={setRange} />
          </div>

          <div className="w-full xl:w-[360px] 2xl:w-[400px] shrink-0 h-[280px] sm:h-[320px] xl:h-[440px] overflow-hidden rounded-xl sm:rounded-2xl border border-[#222226] relative z-0">
            <PerformanceSummary range={range} />
          </div>
        </div>

        <div className="w-full min-w-0 shrink-0 relative z-10 pb-2">
          <PerformanceSummaryList range={range} />
        </div>
      </div>
    </MainLayout>
  );
}