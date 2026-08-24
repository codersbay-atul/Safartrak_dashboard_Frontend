import React, { useState } from "react";
import {
  Loader2,
  AlertCircle,
  RefreshCw,
} from "lucide-react";

import useVehiclesList from "../../hooks/useVehiclesList";
import MainSearchInput from "../../components/Ui/MainLayoutUI/MainSearchInput";
import MainDropDown from "../../components/Ui/MainLayoutUI/MainDropDown";
import MainLayoutColor from "../../components/Ui/MainLayoutUI/MainLayoutColor";
import MainLayoutTextSize from "../../components/Ui/MainLayoutUI/MainLayoutTextSize";

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
  { label: "Inactive", value: "Inactive" },
  { label: "InInactive", value: "inInactive" },
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
  const [InactiveTab, setInactiveTab] = useState("all");
  const [page, setPage] = useState(1);

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
    tab: InactiveTab,
    fleetGroup: selectedFleet,
    vehicleType: selectedVehicleType,
    trackingStatus: selectedTrackingStatus,
    page,
    pageSize: 25,
  });

  return (
    <MainLayoutColor
      as="div"
      background="surface"
      className="w-full h-auto min-[1152px]:h-full flex flex-col min-h-0 border border-[#1d1d20] rounded-xl overflow-hidden select-none font-sans"
    >
      {/* Header & Controls Area */}
      <div className="px-4 py-3 flex flex-col gap-3 border-b border-[#1d1d20] shrink-0 z-20">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            {/* 14px Section Title (Font 500) */}
            <MainLayoutColor
              as={MainLayoutTextSize}
              color="title"
              size="sectionTitle"
              className="font-medium tracking-wide shrink-0 block"
            >
              Vehicle List
            </MainLayoutColor>

            {total > 0 && (
              <span className="bg-[#27272a] text-[#a1a1aa] px-2 py-0.5 rounded-full">
                <MainLayoutTextSize size="captionText" className="font-medium">
                  {total}
                </MainLayoutTextSize>
              </span>
            )}

            {isFetching && !isLoading && (
              <Loader2 size={13} className="animate-spin text-[#ffd60a]" />
            )}
          </div>

          <div className="flex flex-wrap items-center justify-end gap-2.5">
            <MainDropDown
              label="Fleet Group"
              options={FLEET_OPTIONS}
              selectedValue={selectedFleet}
              onSelect={(value) => {
                setSelectedFleet(value);
                setPage(1);
              }}
              className="rounded-full bg-[#121215] border-[#27272a] text-[#a1a1aa] py-1.5 font-medium"
            />

            <MainDropDown
              label="Vehicle Type"
              options={VEHICLE_OPTIONS}
              selectedValue={selectedVehicleType}
              onSelect={(value) => {
                setSelectedVehicleType(value);
                setPage(1);
              }}
              className="rounded-full bg-[#121215] border-[#27272a] text-[#a1a1aa] py-1.5 font-medium"
            />

            <MainDropDown
              label="Tracking status"
              options={TRACKING_OPTIONS}
              selectedValue={selectedTrackingStatus}
              onSelect={(value) => {
                setSelectedTrackingStatus(value);
                setPage(1);
              }}
              className="rounded-full bg-[#121215] border-[#27272a] text-[#a1a1aa] py-1.5 font-medium"
            />

            <div className="w-[150px] sm:w-[170px]">
              <MainSearchInput
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setPage(1);
                }}
                placeholder="Search Vehicle..."
                className="text-[12px] py-1.5 bg-[#121215] border-[#27272a] rounded-full font-medium"
              />
            </div>
          </div>
        </div>

        {/* Status Filter Tabs */}
        <div className="flex items-center gap-1.5 pt-1 overflow-x-auto no-scrollbar">
          {STATUS_TABS.map((tab) => {
            const isInactive = InactiveTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  setInactiveTab(tab.id);
                  setPage(1);
                }}
                className={`px-3 py-1 rounded-full transition-all duration-200 shrink-0 cursor-pointer ${
                  isInactive
                    ? "bg-[#27272a] text-white shadow-sm border border-[#3f3f46]"
                    : "bg-[#121215] text-[#71717a] hover:text-white hover:bg-[#1d1d20] border border-transparent"
                }`}
              >
                <MainLayoutTextSize size="badgeText" className="font-medium">
                  {tab.label}
                </MainLayoutTextSize>
              </button>
            );
          })}
        </div>
      </div>

      {/* Internal Scrollable Table Content */}
      <div className="flex-none min-[1152px]:flex-1 min-h-0 min-w-0 w-full overflow-x-auto min-[1152px]:overflow-y-auto custom-scrollbar relative">
        {isLoading ? (
          <div className="h-full min-h-[250px] flex flex-col items-center justify-center text-[#71717a] gap-2.5">
            <Loader2 size={24} className="animate-spin text-[#ffd60a]" />
            <MainLayoutColor as={MainLayoutTextSize} color="subtitle" size="subInfoText" className="font-medium">
              Fetching vehicle fleet data...
            </MainLayoutColor>
          </div>
        ) : isError ? (
          <div className="h-full min-h-[250px] flex flex-col items-center justify-center text-center px-4">
            <AlertCircle size={26} className="text-rose-500 mb-2" />
            <MainLayoutTextSize size="subInfoText" className="text-rose-400 font-medium">
              {error?.message || "Failed to load vehicles data"}
            </MainLayoutTextSize>
            <button
              onClick={() => refetch()}
              className="mt-3 flex items-center gap-1.5 bg-[#1d1d20] hover:bg-[#27272a] text-white px-3 py-1.5 rounded-md transition-colors cursor-pointer"
            >
              <RefreshCw size={12} />
              <MainLayoutTextSize size="captionText" className="font-medium">Retry</MainLayoutTextSize>
            </button>
          </div>
        ) : vehicles.length === 0 ? (
          <div className="h-full min-h-[250px] flex items-center justify-center">
            <MainLayoutColor as={MainLayoutTextSize} color="subtitle" size="subInfoText" className="font-medium">
              No vehicles found matching your criteria.
            </MainLayoutColor>
          </div>
        ) : (
          <table className="w-full text-left border-collapse min-w-[850px]">
            <thead className="sticky top-0 bg-[#09090b] border-b border-[#1d1d20] z-10 shadow-md">
              <tr className="border-b border-[#1d1d20]">
                <th className="py-2.5 px-3 pl-4">
                  <MainLayoutColor as={MainLayoutTextSize} color="subtitle" size="subInfoText" className="font-medium uppercase tracking-wider block">
                    Vehicle Number
                  </MainLayoutColor>
                </th>
                <th className="py-2.5 px-3">
                  <MainLayoutColor as={MainLayoutTextSize} color="subtitle" size="subInfoText" className="font-medium uppercase tracking-wider block">
                    Vehicle Type
                  </MainLayoutColor>
                </th>
                <th className="py-2.5 px-3">
                  <MainLayoutColor as={MainLayoutTextSize} color="subtitle" size="subInfoText" className="font-medium uppercase tracking-wider block">
                    Fleet Group
                  </MainLayoutColor>
                </th>
                <th className="py-2.5 px-3">
                  <MainLayoutColor as={MainLayoutTextSize} color="subtitle" size="subInfoText" className="font-medium uppercase tracking-wider block">
                    Driver
                  </MainLayoutColor>
                </th>
                <th className="py-2.5 px-3">
                  <MainLayoutColor as={MainLayoutTextSize} color="subtitle" size="subInfoText" className="font-medium uppercase tracking-wider block">
                    Device Status
                  </MainLayoutColor>
                </th>
                <th className="py-2.5 px-3">
                  <MainLayoutColor as={MainLayoutTextSize} color="subtitle" size="subInfoText" className="font-medium uppercase tracking-wider block">
                    Last Updated
                  </MainLayoutColor>
                </th>
                <th className="py-2.5 px-3 pr-4">
                  <MainLayoutColor as={MainLayoutTextSize} color="subtitle" size="subInfoText" className="font-medium uppercase tracking-wider block">
                    Status
                  </MainLayoutColor>
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-[#1d1d20]/50">
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

                return (
                  <tr key={vehicleId} className="hover:bg-[#18181b]/40 transition-colors">
                    {/* 14px Plate Text + 12px Sub Info (Font 500) */}
                    <td className="py-2.5 px-3 pl-4">
                      <div className="flex items-center gap-2.5">
                        <div className="w-6 h-6 rounded bg-[#27272a]/60 shrink-0" />
                        <div>
                          <MainLayoutColor
                            as={MainLayoutTextSize}
                            color="title"
                            size="plateText"
                            className="font-medium leading-tight block"
                          >
                            {vehicleNumber}
                          </MainLayoutColor>
                          <MainLayoutColor
                            as={MainLayoutTextSize}
                            color="subtitle"
                            size="subInfoText"
                            className="font-medium block"
                          >
                            {item.model || item.raw?.model || "Unknown"}
                          </MainLayoutColor>
                        </div>
                      </div>
                    </td>

                    {/* 14px Detail Text (Font 500) */}
                    <td className="py-2.5 px-3">
                      <MainLayoutColor
                        as={MainLayoutTextSize}
                        color="subtitle"
                        size="sectionTitle"
                        className="font-medium leading-tight whitespace-pre-line block"
                      >
                        {vehicleType}
                      </MainLayoutColor>
                    </td>

                    {/* 14px Fleet Group (Font 500) */}
                    <td className="py-2.5 px-3">
                      <MainLayoutColor
                        as={MainLayoutTextSize}
                        color="subtitle"
                        size="sectionTitle"
                        className="font-medium block"
                      >
                        {fleetGroup}
                      </MainLayoutColor>
                    </td>

                    {/* 14px Driver Name + 12px Driver Sub Info (Font 500) */}
                    <td className="py-2.5 px-3">
                      <div className="flex items-center gap-2">
                        <div className="w-5 h-5 rounded-full bg-[#27272a]/80 shrink-0" />
                        <div>
                          <MainLayoutColor
                            as={MainLayoutTextSize}
                            color="title"
                            size="sectionTitle"
                            className="font-medium leading-tight block"
                          >
                            {driverName === "Unassigned" ? "-" : driverName}
                          </MainLayoutColor>
                          <MainLayoutColor
                            as={MainLayoutTextSize}
                            color="subtitle"
                            size="subInfoText"
                            className="font-medium block"
                          >
                            {item.raw?.driver_type || item.raw?.driverType || "Unknown"}
                          </MainLayoutColor>
                        </div>
                      </div>
                    </td>

                    {/* 14px Device Status + 12px Speed (Font 500) */}
                    <td className="py-2.5 px-3">
                      <div>
                        <MainLayoutTextSize
                          size="sectionTitle"
                          className="font-medium leading-tight text-emerald-500 block"
                        >
                          {deviceStatus}
                        </MainLayoutTextSize>
                        <MainLayoutColor
                          as={MainLayoutTextSize}
                          color="subtitle"
                          size="subInfoText"
                          className="font-medium block"
                        >
                          {item.speed || item.raw?.speed_kmh || "0 km/h"}
                        </MainLayoutColor>
                      </div>
                    </td>

                    {/* 14px Last Updated (Font 500) */}
                    <td className="py-2.5 px-3">
                      <MainLayoutColor
                        as={MainLayoutTextSize}
                        color="subtitle"
                        size="sectionTitle"
                        className="font-medium block"
                      >
                        {lastUpdated}
                      </MainLayoutColor>
                    </td>

                    {/* Badge Text (Font 500) */}
                    <td className="py-2.5 px-3 pr-4">
                      {isOffline ? (
                        <span className="inline-block px-2 py-0.5 text-rose-400 bg-rose-950/50 border border-rose-900/60 rounded-full">
                          <MainLayoutTextSize size="badgeText" className="font-medium">
                            {statusLabel}
                          </MainLayoutTextSize>
                        </span>
                      ) : (
                        <span className="inline-block px-2 py-0.5 text-amber-400 bg-amber-950/50 border border-amber-900/60 rounded-full">
                          <MainLayoutTextSize size="badgeText" className="font-medium">
                            {statusLabel}
                          </MainLayoutTextSize>
                        </span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </MainLayoutColor>
  );
}