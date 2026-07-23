import React from "react";
import MainLayout from "../layouts/MainLayout";
import AnalyticsHeader from "../features/analytics/AnalyticsHeader";
import AnalyticsStatsCard from "../features/analytics/AnalyticsStatsCard";
import FleetPerformanceChart from "../features/analytics/FleetPerformanceChart";
import PerformanceSummary from "../features/analytics/PerformanceSummary";


export default function Analytics() {
  return (
    <MainLayout activeTab="Analytics">
      <div className="flex-1 flex flex-col gap-3.5 min-h-0 overflow-y-auto lg:overflow-hidden pr-0.5">
        <div className="shrink-0">
          <AnalyticsHeader />
        </div>

        <div className="shrink-0">
          <AnalyticsStatsCard/>
        </div>

        <div className="flex flex-col lg:flex-row gap-3.5 w-full flex-1 min-h-0 items-stretch">
          <div className="flex-1 min-w-0 bg-[#16161a] border border-[#1f1f23] rounded-xl p-3 h-full min-h-[300px] lg:min-h-0">
            <FleetPerformanceChart />
          </div>
          <div className="w-full lg:w-[360px] xl:w-[400px] shrink-0 h-full">
            <PerformanceSummary />
          </div>
        </div>
      </div>
    </MainLayout>
  );
}