import React, { useState } from "react";
import { MoreVertical, Loader2, AlertCircle, RefreshCw } from "lucide-react";
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

export default function VehicleListTable() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFleet, setSelectedFleet] = useState("");
  const [selectedVehicleType, setSelectedVehicleType] = useState("");
  const [selectedTrackingStatus, setSelectedTrackingStatus] = useState("");
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
    page,
    pageSize: 25,
  });

  return (
    <div className="w-full bg-[#0d0e12] border border-[#1d1d20] rounded-xl overflow-hidden select-none">
      
      <div className="px-4 py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#1d1d20]">
        
       
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

      {/* Table Section */}
      <div className="overflow-x-auto min-h-[250px] flex flex-col justify-center">
        
        {isLoading ? (
          <div className="py-16 flex flex-col items-center justify-center text-[#71717a] gap-2.5">
            <Loader2 size={24} className="animate-spin text-[#ffd60a]" />
            <p className="text-[11px] tracking-wide">Fetching vehicle fleet data...</p>
          </div>
        ) : 
        
      
        isError ? (
          <div className="py-12 flex flex-col items-center justify-center text-center px-4">
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
        ) : 
        
        
        vehicles.length === 0 ? (
          <div className="py-16 text-center text-[#71717a] text-[11px]">
            No vehicles found matching your criteria.
          </div>
        ) : 
        
       
        (
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#09090b] border-b border-[#1d1d20] text-[#71717a] text-[10px] font-medium">
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
                const vehicleType = item.type || item.raw?.vehicle_type || item.raw?.vehicleCategory || "--";
                const fleetGroup = item.fleetGroup || item.location || item.raw?.fleet_group || "--";
                const driverName = item.driver || item.raw?.driver_name || "Unassigned";
                const deviceStatus = item.deviceStatus || item.raw?.device_status || "Connected";
                const lastUpdated = item.lastUpdated || item.info || item.raw?.last_updated || item.raw?.lastUpdated || "N/A";
                const statusLabel = item.status || item.raw?.status || "Active";
                const isOffline = String(statusLabel).toLowerCase().includes("offline") || String(deviceStatus).toLowerCase().includes("disconnected");

                return (
                  <tr key={vehicleId} className="hover:bg-[#18181b]/30 transition-colors">
                    <td className="py-3 px-3 pl-4">
                      <div className="flex items-center gap-2.5">
                        <div className="w-6 h-6 rounded bg-[#27272a]/60 shrink-0" />
                        <div>
                          <p className="font-semibold text-white leading-tight">
                            {vehicleNumber}
                          </p>
                          <p className="text-[9px] text-[#71717a]">
                            {item.model || item.raw?.model || "--"}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="py-3 px-3">
                      <p className="text-[#a1a1aa] leading-tight whitespace-pre-line">
                        {vehicleType}
                      </p>
                    </td>

                    <td className="py-3 px-3">
                      <p className="text-[#a1a1aa] font-medium">
                        {fleetGroup}
                      </p>
                    </td>

                    <td className="py-3 px-3">
                      <div className="flex items-center gap-2">
                        <div className="w-5 h-5 rounded-full bg-[#27272a]/80 shrink-0" />
                        <div>
                          <p className="font-medium text-white leading-tight">
                            {driverName}
                          </p>
                          <p className="text-[8.5px] text-[#71717a]">
                            {item.raw?.driver_type || item.raw?.driverType || "--"}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="py-3 px-3">
                      <div>
                        <p className="font-medium text-emerald-500 leading-tight">
                          {deviceStatus}
                        </p>
                        <p className="text-[8.5px] text-[#71717a]">
                          {item.speed || item.raw?.speed_kmh || "--"}
                        </p>
                      </div>
                    </td>

                    <td className="py-3 px-3 text-[#a1a1aa]">
                      {lastUpdated}
                    </td>

                    <td className="py-3 px-3">
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

                    
                    <td className="py-3 px-3 text-right pr-4">
                      <Button
                        variant="ghost"
                        size="sm"
                        icon={MoreVertical}
                        className="p-1 text-[#71717a] hover:text-white hover:bg-[#27272a]/50"
                      />
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