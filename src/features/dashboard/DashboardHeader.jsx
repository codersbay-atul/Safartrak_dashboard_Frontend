import { useState } from "react";
import { Download } from "lucide-react";
import { useSelector } from "react-redux";
import MainLayoutHeader from "../../components/Ui/MainLayoutUI/MainLayoutHeader";
import MainDropDown from "../../components/Ui/MainLayoutUI/MainDropDown";
import MainSearchInput from "../../components/Ui/MainLayoutUI/MainSearchInput";
import { selectAuthUser } from "../../store/slices/authSlice";
import useAccountProfile from "../../hooks/useAccountProfile";

const FILTER_OPTIONS = {
  dateRange: [
    { label: "Today", value: "today" },
    { label: "Last 7 days", value: "7d" },
    { label: "Last 30 days", value: "30d" },
  ],
  region: [
    { label: "All Regions", value: "all" },
    { label: "North Zone", value: "north" },
    { label: "South Zone", value: "south" },
  ],
  status: [
    { label: "All Status", value: "all" },
    { label: "Active", value: "active" },
    { label: "Inactive", value: "inactive" },
  ],
};

export default function DashboardHeader({
  userName = '',
  onSearch,
  onExportClick,
}) {
  const authUser = useSelector(selectAuthUser);
  const { profile: accountProfile } = useAccountProfile();
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState({ dateRange: "", region: "", status: "" });
  const effectiveName = authUser?.name ?? accountProfile?.name ?? userName ?? '';
  const getGreeting = (d = new Date()) => {
    const h = d.getHours();
    if (h >= 5 && h < 12) return 'Good morning';
    if (h >= 12 && h < 17) return 'Good afternoon';
    return 'Good evening';
  };

  const displayName = effectiveName || '';
  const title = displayName ? `${getGreeting(new Date())}, ${displayName}` : getGreeting(new Date());

  const updateFilter = (key, value) => {
    setFilters((currentFilters) => ({ ...currentFilters, [key]: value }));
  };

  return (
    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-2.5 xl:gap-4 w-full select-none shrink-0 min-w-0">
      <MainLayoutHeader
        title={title}
        subtitle="Monitor vehicle locations, movement and fleet status in real time."
      />

      <div className="flex items-center gap-2 xl:gap-2.5 w-full lg:w-auto shrink-0 justify-between lg:justify-end min-w-0 flex-wrap">
        <MainDropDown
          label="Select Date Range"
          options={FILTER_OPTIONS.dateRange}
          selectedValue={filters.dateRange}
          onSelect={(value) => updateFilter("dateRange", value)}
        />
        <MainDropDown
          label="Region"
          options={FILTER_OPTIONS.region}
          selectedValue={filters.region}
          onSelect={(value) => updateFilter("region", value)}
        />
        <MainDropDown
          label="Status"
          options={FILTER_OPTIONS.status}
          selectedValue={filters.status}
          onSelect={(value) => updateFilter("status", value)}
        />
        <MainSearchInput
          value={searchQuery}
          onChange={(event) => {
            const value = event.target.value;
            setSearchQuery(value);
            onSearch?.(value);
          }}
          placeholder="Search"
          aria-label="Search dashboard"
          containerClassName="w-full min-w-0 lg:w-[160px] xl:w-[200px]"
        />
        <button
          type="button"
          onClick={() => onExportClick?.({ ...filters, search: searchQuery })}
          aria-label="Download dashboard data"
          className="h-[38px] w-[38px] rounded-full bg-[#05070B] border border-[#22252B] text-[#d4d4d8] hover:bg-[#12151c] hover:text-white flex items-center justify-center shrink-0 cursor-pointer"
        >
          <Download size={16} />
        </button>
      </div>
    </div>
  );
}
