import React from "react";
import { Plus } from "lucide-react";
import SearchInput from "../../components/Ui/SearchInput";
import HeaderActionButton from "../../components/Ui/HeaderActionButton";

export default function ReportsHeader({
  searchQuery = "",
  onSearchChange,
  onCreateClick,
}) {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-2.5 w-full select-none shrink-0">
      <div className="flex-1 min-w-0">
        <h1 className="text-[16px] sm:text-lg font-bold text-white tracking-tight leading-none">
          Reports
        </h1>
        <p className="mt-1 text-[10px] text-[#a1a1aa] leading-normal max-w-2xl">
          Generate, review and export fleet operational reports.
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-2 w-full md:w-auto shrink-0 justify-start sm:justify-end">
        <SearchInput
          placeholder="Search Report"
          value={searchQuery}
          onChange={onSearchChange}
          iconPosition="left"
          containerClassName="min-w-40 sm:min-w-48"
          className="sm:w-52 rounded-xl bg-[#18181b] py-1.5"
        />

        <HeaderActionButton
          icon={Plus}
          iconPosition="right"
          onClick={onCreateClick}
          className="min-w-[170px]"
        >
          Create Custom Report
        </HeaderActionButton>
      </div>
    </div>
  );
}
