import React, { useState, useEffect, useRef } from "react";
import {
  MoreVertical,
  Loader2,
  AlertCircle,
  RefreshCw,
  Edit2,
  Trash2,
} from "lucide-react";
import SearchInput from "../../components/Ui/SearchInput";
import Dropdown from "../../components/Ui/DropDown";
import Button from "../../components/Ui/Button";
import useVehiclesList from "../../hooks/useVehiclesList";

const FLEET_OPTIONS = [
  { label: "Fleet Group", value: "" },
  { label: "West Fleet", value: "west" },
  { label: "East Fleet", value: "east" },
];

const VEHICLE_OPTIONS = [
  { label: "Vehicle Type", value: "" },
  { label: "Heavy Truck", value: "heavy" },
  { label: "Light Truck", value: "light" },
];

const TRACKING_OPTIONS = [
  { label: "Tracking status", value: "" },
  { label: "Active", value: "active" },
  { label: "Inactive", value: "inactive" },
];

const STATUS_TABS = [
  { id: "all", label: "All" },
  { id: "tracking", label: "Tracking" },
  { id: "offline", label: "Offline" },
  { id: "maintenance", label: "Maintenance" },
  { id: "unassigned", label: "Unassigned" },
];

export default function VehicleListTable() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFleet, setSelectedFleet] = useState("");
  const [selectedVehicleType, setSelectedVehicleType] = useState("");
  const [selectedTrackingStatus, setSelectedTrackingStatus] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [page, setPage] = useState(1);

  // State to track which row's action menu is open
  const [openMenuId, setOpenMenuId] = useState(null);
  const menuRef = useRef(null);

  const {
    vehicles = [],
    total = 0,
    isLoading,
    isFetching,
    isError,
    error,
    refetch,
  } = useVehiclesList({
    search: searchQuery,
    tab: activeTab,
    fleetGroup: selectedFleet,
    vehicleType: selectedVehicleType,
    trackingStatus: selectedTrackingStatus,
    page,
    pageSize: 25,
  });

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpenMenuId(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleEditStatus = (vehicle) => {
    console.log("Edit status clicked for vehicle:", vehicle);
    setOpenMenuId(null);
    // Add your Edit Status modal/action logic here
  };

  const handleDeleteVehicle = (vehicle) => {
    console.log("Delete clicked for vehicle:", vehicle);
    setOpenMenuId(null);
    // Add your Delete confirmation/action logic here
  };

  return (
    <div className="w-full h-full flex flex-col min-h-0 bg-[#0d0e12] border border-[#1d1d20] rounded-xl overflow-hidden select-none">
      {/* Header & Controls Area (Fixed Top Section) */}
      <div className="px-4 py-3 flex flex-col gap-3 border-b border-[#1d1d20] shrink-0 bg-[#0d0e12] z-20">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <h2 className="text-[13px] font-bold text-white tracking-wide shrink-0">
              Vehicle List
            </h2>

            {total > 0 && (
              <span className="text-[10px] bg-[#27272a] text-[#a1a1aa] px-2 py-0.5 rounded-full font-medium">
                {total}
              </span>
            )}

            {isFetching && !isLoading && (
              <Loader2 size={13} className="animate-spin text-[#ffd60a]" />
            )}
          </div>

          <div className="flex flex-wrap items-center justify-end gap-2.5">
            <Dropdown
              label="Fleet Group"
              options={FLEET_OPTIONS}
              selectedValue={selectedFleet}
              onSelect={(value) => {
                setSelectedFleet(value);
                setPage(1);
              }}
              className="rounded-full bg-[#121215] border-[#27272a] text-[#a1a1aa] py-1.5"
            />

            <Dropdown
              label="Vehicle Type"
              options={VEHICLE_OPTIONS}
              selectedValue={selectedVehicleType}
              onSelect={(value) => {
                setSelectedVehicleType(value);
                setPage(1);
              }}
              className="rounded-full bg-[#121215] border-[#27272a] text-[#a1a1aa] py-1.5"
            />

            <Dropdown
              label="Tracking status"
              options={TRACKING_OPTIONS}
              selectedValue={selectedTrackingStatus}
              onSelect={(value) => {
                setSelectedTrackingStatus(value);
                setPage(1);
              }}
              className="rounded-full bg-[#121215] border-[#27272a] text-[#a1a1aa] py-1.5"
            />

            <div className="w-[150px] sm:w-[170px]">
              <SearchInput
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setPage(1);
                }}
                placeholder="Search Vehicle..."
                className="text-[11px] py-1.5 bg-[#121215] border-[#27272a] rounded-full"
              />
            </div>
          </div>
        </div>

        {/* Status Filter Tabs */}
        <div className="flex items-center gap-1.5 pt-1 overflow-x-auto no-scrollbar">
          {STATUS_TABS.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id);
                  setPage(1);
                }}
                className={`px-3 py-1 rounded-full text-[11px] font-medium transition-all duration-200 shrink-0 ${
                  isActive
                    ? "bg-[#27272a] text-white shadow-sm border border-[#3f3f46]"
                    : "bg-[#121215] text-[#71717a] hover:text-white hover:bg-[#1d1d20] border border-transparent"
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Internal Scrollable Table Content */}
      <div className="flex-1 min-h-0 w-full overflow-y-auto overflow-x-auto custom-scrollbar relative">
        {isLoading ? (
          <div className="h-full min-h-[250px] flex flex-col items-center justify-center text-[#71717a] gap-2.5">
            <Loader2 size={24} className="animate-spin text-[#ffd60a]" />
            <p className="text-[11px] tracking-wide">Fetching vehicle fleet data...</p>
          </div>
        ) : isError ? (
          <div className="h-full min-h-[250px] flex flex-col items-center justify-center text-center px-4">
            <AlertCircle size={26} className="text-rose-500 mb-2" />
            <p className="text-rose-400 text-[12px] font-medium">
              {error?.message || "Failed to load vehicles data"}
            </p>
            <button
              onClick={() => refetch()}
              className="mt-3 flex items-center gap-1.5 text-[11px] bg-[#1d1d20] hover:bg-[#27272a] text-white px-3 py-1.5 rounded-md transition-colors"
            >
              <RefreshCw size={12} /> Retry
            </button>
          </div>
        ) : vehicles.length === 0 ? (
          <div className="h-full min-h-[250px] flex items-center justify-center text-[#71717a] text-[11px]">
            No vehicles found matching your criteria.
          </div>
        ) : (
          <table className="w-full text-left border-collapse min-w-[850px]">
            <thead className="sticky top-0 bg-[#09090b] border-b border-[#1d1d20] z-10 shadow-md">
              <tr className="text-[#71717a] text-[10px] font-medium uppercase tracking-wider">
                <th className="py-2.5 px-3 pl-4">Vehicle Number</th>
                <th className="py-2.5 px-3">Vehicle Type</th>
                <th className="py-2.5 px-3">Fleet Group</th>
                <th className="py-2.5 px-3">Driver</th>
                <th className="py-2.5 px-3">Device Status</th>
                <th className="py-2.5 px-3">Last Updated</th>
                <th className="py-2.5 px-3">Status</th>
                <th className="py-2.5 px-3 text-right pr-4">Action</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-[#1d1d20]/50 text-[10.5px]">
              {vehicles.map((item, index) => {
                const vehicleId = item.id || item.plate || item.uniqueId || index;
                const vehicleNumber = item.plate || item.vehicleNumber || item.raw?.vehicle_number || "--";
                const vehicleType = item.type || item.raw?.vehicle_type || item.raw?.vehicleCategory || "Unknown";
                const fleetGroup = item.fleetGroup || item.location || item.raw?.fleet_group || "--";
                const driverName = item.driver || item.raw?.driver_name || "Unassigned";
                const deviceStatus = item.deviceStatus || item.raw?.device_status || "Disconnected";
                const lastUpdated = item.lastUpdated || item.info || item.raw?.last_updated || item.raw?.lastUpdated || "N/A";
                const statusLabel = item.status || item.raw?.status || "Offline";
                const isOffline = String(statusLabel).toLowerCase().includes("offline") || String(deviceStatus).toLowerCase().includes("disconnected");

                const isMenuOpen = openMenuId === vehicleId;

                return (
                  <tr key={vehicleId} className="hover:bg-[#18181b]/40 transition-colors">
                    <td className="py-2.5 px-3 pl-4">
                      <div className="flex items-center gap-2.5">
                        <div className="w-6 h-6 rounded bg-[#27272a]/60 shrink-0" />
                        <div>
                          <p className="font-semibold text-white leading-tight">
                            {vehicleNumber}
                          </p>
                          <p className="text-[9px] text-[#71717a]">
                            {item.model || item.raw?.model || "Unknown"}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="py-2.5 px-3">
                      <p className="text-[#a1a1aa] leading-tight whitespace-pre-line">
                        {vehicleType}
                      </p>
                    </td>

                    <td className="py-2.5 px-3">
                      <p className="text-[#a1a1aa] font-medium">
                        {fleetGroup}
                      </p>
                    </td>

                    <td className="py-2.5 px-3">
                      <div className="flex items-center gap-2">
                        <div className="w-5 h-5 rounded-full bg-[#27272a]/80 shrink-0" />
                        <div>
                          <p className="font-medium text-white leading-tight">
                            {driverName === "Unassigned" ? "-" : driverName}
                          </p>
                          <p className="text-[8.5px] text-[#71717a]">
                            {item.raw?.driver_type || item.raw?.driverType || "--"}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="py-2.5 px-3">
                      <div>
                        <p className={`font-medium leading-tight ${isOffline ? 'text-emerald-500' : 'text-emerald-500'}`}>
                          {deviceStatus}
                        </p>
                        <p className="text-[8.5px] text-[#71717a]">
                          {item.speed || item.raw?.speed_kmh || "0 km/h"}
                        </p>
                      </div>
                    </td>

                    <td className="py-2.5 px-3 text-[#a1a1aa]">
                      {lastUpdated}
                    </td>

                    <td className="py-2.5 px-3">
                      {isOffline ? (
                        <span className="inline-block px-2 py-0.5 text-[9px] font-semibold text-rose-400 bg-rose-950/50 border border-rose-900/60 rounded-full">
                          {statusLabel}
                        </span>
                      ) : (
                        <span className="inline-block px-2 py-0.5 text-[9px] font-semibold text-amber-400 bg-amber-950/50 border border-amber-900/60 rounded-full">
                          {statusLabel}
                        </span>
                      )}
                    </td>

                    {/* Action Column with Dropdown */}
                    <td className="py-2.5 px-3 text-right pr-4 relative">
                      <Button
                        variant="ghost"
                        size="sm"
                        icon={MoreVertical}
                        onClick={(e) => {
                          e.stopPropagation();
                          setOpenMenuId(isMenuOpen ? null : vehicleId);
                        }}
                        className="p-1 text-[#71717a] hover:text-white hover:bg-[#27272a]/50"
                      />

                      {/* Dropdown Action Menu */}
                      {isMenuOpen && (
                        <div
                          ref={menuRef}
                          className="absolute right-4 top-9 w-36 bg-[#18181b] border border-[#27272a] rounded-lg shadow-xl z-50 py-1 text-left animate-in fade-in zoom-in-95 duration-100"
                        >
                          <button
                            onClick={() => handleEditStatus(item)}
                            className="w-full flex items-center gap-2 px-3 py-1.5 text-[11px] text-[#e4e4e7] hover:bg-[#27272a] hover:text-white transition-colors"
                          >
                            <Edit2 size={12} className="text-[#a1a1aa]" />
                            <span>Edit Status</span>
                          </button>
                          
                          <button
                            onClick={() => handleDeleteVehicle(item)}
                            className="w-full flex items-center gap-2 px-3 py-1.5 text-[11px] text-rose-400 hover:bg-rose-500/10 hover:text-rose-300 transition-colors"
                          >
                            <Trash2 size={12} className="text-rose-400" />
                            <span>Delete</span>
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}