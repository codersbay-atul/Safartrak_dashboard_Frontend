import React, { useState } from "react";
import {
  Loader2,
  AlertCircle,
  RefreshCw,
  Truck,
} from "lucide-react";

import useVehiclesList from "../../hooks/useVehiclesList";
import MainSearchInput from "../../components/Ui/MainLayoutUI/MainSearchInput";
import MainDropDown from "../../components/Ui/MainLayoutUI/MainDropDown";
import MainLayoutFilterButton from "../../components/Ui/MainLayoutUI/MainLayoutFilterButton";
import MainLayoutColor from "../../components/Ui/MainLayoutUI/MainLayoutColor";
import MainLayoutTextSize from "../../components/Ui/MainLayoutUI/MainLayoutTextSize";
import MainTableHeader from "../../components/Ui/MainLayoutUI/MainTableHeader";
import MainStatusBadge from "../../components/Ui/MainLayoutUI/MainStatusBadge";

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

  return (
    <div className="w-full h-full flex flex-col font-sans select-none gap-2.5">
      {/* 1. OUT OF CARD: Title & Total Count */}
      <div className="flex items-center gap-2 px-1 shrink-0">
        <MainLayoutColor
          as={Truck}
          color="yellow"
          className="w-4 h-4 shrink-0"
        />
        <MainLayoutColor
          as={MainLayoutTextSize}
          color="title"
          size="sectionTitle"
          className="font-bold tracking-tight shrink-0 block"
        >
          Vehicle List
        </MainLayoutColor>

      

        {isFetching && !isLoading && (
          <MainLayoutColor as={Loader2} color="yellow" size={13} className="animate-spin" />
        )}
      </div>

      {/* 2. CARD CONTAINER: Tabs + Filters + Search + Table */}
      <MainLayoutColor
        as="div"
        background="surface"
        border="cardBorder"
        className="w-full h-auto min-[1152px]:h-full flex flex-col min-h-0 rounded-2xl overflow-hidden shadow-2xl"
      >
        {/* Card Header Toolbar Area */}
        <MainLayoutColor
          as="div"
          border="cardBorder"
          className="px-4 py-3 flex flex-col gap-3 border-b shrink-0 z-20"
        >
          {/* Status tabs on the left, filters + search on the right */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
              {STATUS_TABS.map((tab) => {
                const isSelected = activeTab === tab.id;
                return (
                  <MainLayoutFilterButton
                    key={tab.id}
                    isActive={isSelected}
                    onClick={() => {
                      setActiveTab(tab.id);
                      setPage(1);
                    }}
                  >
                    <MainLayoutTextSize size="filterText">
                      {tab.label}
                    </MainLayoutTextSize>
                  </MainLayoutFilterButton>
                );
              })}
            </div>

            <div className="flex w-full sm:w-auto flex-wrap items-center justify-end gap-2 shrink-0">
              <MainDropDown
                options={FLEET_OPTIONS}
                selectedValue={selectedFleet}
                onSelect={(value) => {
                  setSelectedFleet(value);
                  setPage(1);
                }}
                label="Fleet Group"
              />

              <MainDropDown
                options={VEHICLE_OPTIONS}
                selectedValue={selectedVehicleType}
                onSelect={(value) => {
                  setSelectedVehicleType(value);
                  setPage(1);
                }}
                label="Vehicle Type"
              />

              <MainDropDown
                options={TRACKING_OPTIONS}
                selectedValue={selectedTrackingStatus}
                onSelect={(value) => {
                  setSelectedTrackingStatus(value);
                  setPage(1);
                }}
                label="Tracking status"
              />

              <div className="w-full sm:w-[220px] shrink-0">
                <MainSearchInput
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setPage(1);
                  }}
                  placeholder="Search Vehicle..."
                  iconPosition="right"
                />
              </div>
            </div>
          </div>
        </MainLayoutColor>

        {/* Scrollable Table Area with Fixed Header */}
        <div className="flex-none min-[1152px]:flex-1 min-h-0 min-w-0 w-full overflow-x-auto min-[1152px]:overflow-y-auto custom-scrollbar relative">
          {isLoading ? (
            <div className="h-full min-h-[250px] flex flex-col items-center justify-center gap-2.5">
              <MainLayoutColor as={Loader2} color="yellow" size={24} className="animate-spin" />
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
              <MainLayoutColor
                as="button"
                type="button"
                background="filterActiveBg"
                border="cardBorder"
                color="title"
                onClick={() => refetch()}
                className="mt-3 flex items-center gap-1.5 px-3 py-1.5 rounded-md cursor-pointer transition-colors"
              >
                <RefreshCw size={12} />
                <MainLayoutTextSize size="captionText" className="font-medium">Retry</MainLayoutTextSize>
              </MainLayoutColor>
            </div>
          ) : vehicles.length === 0 ? (
            <div className="h-full min-h-[250px] flex items-center justify-center">
              <MainLayoutColor as={MainLayoutTextSize} color="subtitle" size="subInfoText" className="font-medium">
                No vehicles found matching your criteria.
              </MainLayoutColor>
            </div>
          ) : (
            <table className="w-full text-left border-collapse min-w-[850px]">
              <thead className="sticky top-0 z-10 shadow-md">
                <MainLayoutColor as="tr" background="tableHeaderBg" border="cardBorder" className="border-b">
                  <MainTableHeader className="py-3 px-3 pl-4">
                    Vehicle Number
                  </MainTableHeader>
                  <MainTableHeader className="py-3 px-3">
                    Vehicle Type
                  </MainTableHeader>
                  <MainTableHeader className="py-3 px-3">
                    Fleet Group
                  </MainTableHeader>
                  <MainTableHeader className="py-3 px-3">
                    Driver
                  </MainTableHeader>
                  <MainTableHeader className="py-3 px-3">
                    Device Status
                  </MainTableHeader>
                  <MainTableHeader className="py-3 px-3">
                    Last Updated
                  </MainTableHeader>
                  <MainTableHeader className="py-3 px-3 pr-4">
                    Status
                  </MainTableHeader>
                </MainLayoutColor>
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

                  return (
                    <tr key={vehicleId} className="hover:bg-[#1f2025] transition-colors">
                      <td className="py-2.5 px-3 pl-4">
                        <div className="flex items-center gap-2.5">
                          {/* <MainLayoutColor as="div" background="filterActiveBg" className="w-6 h-6 rounded shrink-0" /> */}
                          <img src={"/images/truck.png"} alt={vehicleNumber} className="w-16 h-16 aspect-square object-contain" />
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

                      <td className="py-2.5 px-3">
                        <div className="flex items-center gap-2">
                          {/* <MainLayoutColor as="div" background="filterActiveBg" className="w-5 h-5 rounded-full shrink-0" /> */}
                          <img src={"/images/man.png"} alt={vehicleNumber} className="w-8 h-8 aspect-square object-contain" />
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

                      <td className="py-2.5 px-3">
                        <div>
                          <MainLayoutColor
                            as={MainLayoutTextSize}
                            color="greenStatusBadge"
                            size="sectionTitle"
                            className="font-medium leading-tight block"
                          >
                            {deviceStatus}
                          </MainLayoutColor>
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

                      <td className="py-2.5 px-3 pr-4">
                        <MainStatusBadge status={statusLabel} showDot={false} />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </MainLayoutColor>
    </div>
  );
}