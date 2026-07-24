import React, { useState } from "react";
import MainLayout from "../layouts/MainLayout";
import ReportsHeader from "../features/reports/ReportsHeader";
import ReportCard from "../components/Ui/ReportCard";
import { REPORTS } from "../features/reports/reportsData";

export default function Reports() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredReports = REPORTS.filter((report) => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) return true;
    return (
      report.title.toLowerCase().includes(query) ||
      report.description.toLowerCase().includes(query)
    );
  });

  return (
    <MainLayout activeTab="Reports">
      <div className="flex-1 flex flex-col gap-3.5 min-h-0 overflow-y-auto pr-0.5 custom-scrollbar">
        <ReportsHeader
          searchQuery={searchQuery}
          onSearchChange={(e) => setSearchQuery(e.target.value)}
          onCreateClick={() => {}}
        />

        {filteredReports.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 pb-1">
            {filteredReports.map((report) => (
              <ReportCard
                key={report.id}
                title={report.title}
                description={report.description}
                icon={report.icon}
                onClick={() => {}}
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
