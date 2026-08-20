import { Plus } from "lucide-react";
import MainSearchInput from "../../components/Ui/MainLayoutUI/MainSearchInput";
import MainLayoutHeader from "../../components/Ui/MainLayoutUI/MainLayoutHeader";
import MainHeaderActionButton from "../../components/Ui/MainLayoutUI/MainHeaderActionButton";

export default function ReportsHeader({
  searchQuery = "",
  onSearchChange,
  onCreateClick,
}) {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-2.5 w-full select-none shrink-0">
      <MainLayoutHeader
        title="Reports"
        subtitle="Generate, review and export fleet operational reports."
      />

      <div className="flex flex-wrap items-center gap-2 w-full md:w-auto shrink-0 justify-start sm:justify-end">
        <MainSearchInput
          placeholder="Search Report"
          value={searchQuery}
          onChange={onSearchChange}
          iconPosition="left"
          containerClassName="min-w-40 sm:min-w-48"
          className="sm:w-52 rounded-xl bg-[#18181b] py-1.5"
        />

        <MainHeaderActionButton
          icon={Plus}
          iconPosition="right"
          onClick={onCreateClick}
          className="min-w-[170px]"
        >
          Create Custom Report
        </MainHeaderActionButton>
      </div>
    </div>
  );
}
