import React, { useState } from "react";
import { MoreVertical, ArrowUpDown } from "lucide-react";
import SearchInput from "../../components/Ui/SearchInput";
import Dropdown from "../../components/Ui/DropDown";
import Button from "../../components/Ui/Button";

const MOCK_VEHICLES = [
  {
    id: "1",
    vehicleNumber: "MH12AB3482",
    vehicleCategory: "Heavy Truck",
    dateTime: "Jul 6, 2026\n10:42 AM",
    fleetGroup: "West Fleet",
    driverName: "Ashoke Sharma",
    driverType: "Heavy Truck",
    deviceStatus: "GPS connected",
    signalStrength: "Strong Signal",
    lastUpdated: "15 sec ago",
    status: "Offline",
    statusType: "offline",
  },
  {
    id: "2",
    vehicleNumber: "MH12AB3482",
    vehicleCategory: "Heavy Truck",
    dateTime: "Jul 6, 2026\n10:42 AM",
    fleetGroup: "West Fleet",
    driverName: "Ashoke Sharma",
    driverType: "Heavy Truck",
    deviceStatus: "GPS connected",
    signalStrength: "Strong Signal",
    lastUpdated: "15 sec ago",
    status: "Weak Signal",
    statusType: "warning",
  },
];

// Options matched to Dropdown component expectations
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
  // States store standard string values
  const [selectedFleet, setSelectedFleet] = useState("");
  const [selectedVehicleType, setSelectedVehicleType] = useState("");
  const [selectedTrackingStatus, setSelectedTrackingStatus] = useState("");

  return (
    <div className="w-full bg-[#0d0e12] border border-[#1d1d20] rounded-xl overflow-hidden select-none">
      
      {/* --- HEADER BAR --- */}
      <div className="px-4 py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#1d1d20]">
        
        {/* Title */}
        <h2 className="text-[13px] font-bold text-white tracking-wide shrink-0">
          Vehicle List
        </h2>

        {/* Right Controls */}
        <div className="flex flex-wrap items-center justify-end gap-2.5">
          
          {/* 1. Fleet Group Dropdown */}
          <Dropdown
            label="Fleet Group"
            options={FLEET_OPTIONS}
            selectedValue={selectedFleet}
            onSelect={(value) => setSelectedFleet(value)}
            className="rounded-full bg-[#121215] border-[#27272a] text-[#a1a1aa] py-1.5"
          />

          {/* 2. Vehicle Type Dropdown */}
          <Dropdown
            label="Vehicle Type"
            options={VEHICLE_OPTIONS}
            selectedValue={selectedVehicleType}
            onSelect={(value) => setSelectedVehicleType(value)}
            className="rounded-full bg-[#121215] border-[#27272a] text-[#a1a1aa] py-1.5"
          />

          {/* 3. Tracking Status Dropdown */}
          <Dropdown
            label="Tracking status"
            options={TRACKING_OPTIONS}
            selectedValue={selectedTrackingStatus}
            onSelect={(value) => setSelectedTrackingStatus(value)}
            className="rounded-full bg-[#121215] border-[#27272a] text-[#a1a1aa] py-1.5"
          />

          {/* Search Input */}
          <div className="w-[150px] sm:w-[170px]">
            <SearchInput
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search Vehicle..."
              className="text-[11px] py-1.5 bg-[#121215] border-[#27272a] rounded-full"
            />
          </div>

        </div>
      </div>

      {/* --- TABLE SECTION --- */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-[#09090b] border-b border-[#1d1d20] text-[#71717a] text-[10px] font-medium">
              <th className="py-2.5 px-3 pl-4">Vehicle Number</th>
              <th className="py-2.5 px-3">
                <div className="flex items-center gap-1 cursor-pointer hover:text-white">
                  Vehicle Type
                  <ArrowUpDown size={10} />
                </div>
              </th>
              <th className="py-2.5 px-3">Fleet Group</th>
              <th className="py-2.5 px-3">Driver</th>
              <th className="py-2.5 px-3">Device Status</th>
              <th className="py-2.5 px-3">Last Updated</th>
              <th className="py-2.5 px-3">Status</th>
              <th className="py-2.5 px-3 text-right pr-4">Action</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-[#1d1d20]/50 text-[10.5px]">
            {MOCK_VEHICLES.map((item) => (
              <tr key={item.id} className="hover:bg-[#18181b]/30 transition-colors">
                <td className="py-3 px-3 pl-4">
                  <div className="flex items-center gap-2.5">
                    <div className="w-6 h-6 rounded bg-[#27272a]/60 shrink-0" />
                    <div>
                      <p className="font-semibold text-white leading-tight">{item.vehicleNumber}</p>
                      <p className="text-[9px] text-[#71717a]">{item.vehicleCategory}</p>
                    </div>
                  </div>
                </td>

                <td className="py-3 px-3">
                  <p className="text-[#a1a1aa] leading-tight whitespace-pre-line">{item.dateTime}</p>
                </td>

                <td className="py-3 px-3">
                  <p className="text-[#a1a1aa] font-medium">{item.fleetGroup}</p>
                </td>

                <td className="py-3 px-3">
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 rounded-full bg-[#27272a]/80 shrink-0" />
                    <div>
                      <p className="font-medium text-white leading-tight">{item.driverName}</p>
                      <p className="text-[8.5px] text-[#71717a]">{item.driverType}</p>
                    </div>
                  </div>
                </td>

                <td className="py-3 px-3">
                  <div>
                    <p className="font-medium text-emerald-500 leading-tight">{item.deviceStatus}</p>
                    <p className="text-[8.5px] text-[#71717a]">{item.signalStrength}</p>
                  </div>
                </td>

                <td className="py-3 px-3 text-[#a1a1aa]">
                  {item.lastUpdated}
                </td>

                <td className="py-3 px-3">
                  {item.statusType === "offline" ? (
                    <span className="inline-block px-2 py-0.5 text-[9px] font-semibold text-rose-400 bg-rose-950/50 border border-rose-900/60 rounded-full">
                      {item.status}
                    </span>
                  ) : (
                    <span className="inline-block px-2 py-0.5 text-[9px] font-semibold text-amber-400 bg-amber-950/50 border border-amber-900/60 rounded-full">
                      {item.status}
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
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
}