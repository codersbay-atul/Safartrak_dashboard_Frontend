import { useState } from "react";
import { useSelector } from "react-redux";
import MainLayoutHeader from "../../components/Ui/MainLayoutUI/MainLayoutHeader";
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
  userName = "",
  onSearch,
  onExportClick,
  onFilterChange,
}) {
  const authUser = useSelector(selectAuthUser);
  const { profile: accountProfile } = useAccountProfile();
  const [filters, setFilters] = useState({ dateRange: "", region: "", status: "" });

  const effectiveName = authUser?.name ?? accountProfile?.name ?? userName ?? "";

  const getGreeting = (d = new Date()) => {
    const h = d.getHours();
    if (h >= 5 && h < 12) return "Good morning";
    if (h >= 12 && h < 17) return "Good afternoon";
    return "Good evening";
  };

  const displayName = effectiveName || "";
  const title = displayName ? `${getGreeting(new Date())}, ${displayName}` : getGreeting(new Date());

  const handleFilterChange = (updatedFilters) => {
    setFilters(updatedFilters);
    onFilterChange?.(updatedFilters);
  };

  return (
    <MainLayoutHeader
      title={title}
      subtitle="Monitor vehicle locations, movement and fleet status in real time."
      searchPlaceholder="Search"
      searchIconPosition="right"
      // dateRangeOptions={FILTER_OPTIONS.dateRange}
      // regionOptions={FILTER_OPTIONS.region}
      // statusOptions={FILTER_OPTIONS.status}
      onSearch={onSearch}
    // onFilterChange={handleFilterChange}
    // onExportClick={(exportPayload) => onExportClick?.(exportPayload ?? filters)}
    showExport={false}
    />
  );
}