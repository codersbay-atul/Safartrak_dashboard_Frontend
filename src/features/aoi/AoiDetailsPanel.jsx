import React, { useState } from "react";
import { MoreVertical, Pencil, Search, ArrowRight } from "lucide-react";

const TABS = ["Overview", "Vehicle", "Alerts", "Activity"];

export default function AoiDetailsPanel({ aoi, onEdit, onDelete, onViewVehicle }) {
  const [activeTab, setActiveTab] = useState("Overview");

  // Tab internal search and filter states
  const [vehicleSearch, setVehicleSearch] = useState("");
  const [vehicleFilter, setVehicleFilter] = useState("all");

  const [alertSearch, setAlertSearch] = useState("");
  const [alertFilter, setAlertFilter] = useState("all");

  if (!aoi) {
    return (
      <div className="w-full h-full bg-[#121214] border border-[#1f1f23] rounded-2xl p-4 flex items-center justify-center select-none text-white">
        <p className="text-xs text-[#71717a]">Select an AOI to view details</p>
      </div>
    );
  }

  const isActive = aoi.status === "active";
  const displayType = aoi.type || aoi.raw?.geometry?.shape || "";
  const displayRadius = aoi.radius ?? aoi.size ?? "";
  const displayLocation = aoi.location || (aoi.center
    ? `${aoi.center[0]?.toFixed?.(4) ?? aoi.center[0]}°, ${aoi.center[1]?.toFixed?.(4) ?? aoi.center[1]}°`
    : "");
  const displayCreatedBy = aoi.createdBy || aoi.raw?.created_by || aoi.raw?.createdBy || "";
  const insideCount = aoi.inside ?? aoi.raw?.inside_count ?? 0;
  const enteredTodayCount = aoi.enteredToday ?? aoi.raw?.entered_today ?? 0;
  const exitedTodayCount = aoi.exitedToday ?? aoi.raw?.exited_today ?? 0;
  const entryAlertStatus = aoi.entryAlertStatus || aoi.raw?.entry_alert_status || "";
  const exitAlertStatus = aoi.exitAlertStatus || aoi.raw?.exit_alert_status || "";
  const assignedVehicles = Array.isArray(aoi.assignedVehicles) && aoi.assignedVehicles.length > 0
    ? aoi.assignedVehicles
    : Array.isArray(aoi.raw?.assigned_vehicles)
      ? aoi.raw.assigned_vehicles
      : [];

  const vehiclesList = Array.isArray(aoi.vehiclesList)
    ? aoi.vehiclesList
    : Array.isArray(aoi.raw?.vehicles)
      ? aoi.raw.vehicles
      : Array.isArray(aoi.raw?.assigned_vehicles)
        ? aoi.raw.assigned_vehicles
        : [];

  const alertsList = Array.isArray(aoi.alertsList)
    ? aoi.alertsList
    : Array.isArray(aoi.raw?.alerts)
      ? aoi.raw.alerts
      : [];

  const activitiesList = Array.isArray(aoi.activitiesList)
    ? aoi.activitiesList
    : Array.isArray(aoi.raw?.activities)
      ? aoi.raw.activities
      : Array.isArray(aoi.raw?.activity_log)
        ? aoi.raw.activity_log
        : [];

  const totalInsideVehicles = vehiclesList.filter((item) => item.isInside).length;
  const totalOutsideVehicles = vehiclesList.filter((item) => !item.isInside).length;

  // Filters for Vehicle tab
  const filteredVehicles = vehiclesList.filter((item) => {
    const matchesSearch =
      (item.plate || "").toLowerCase().includes(vehicleSearch.toLowerCase()) ||
      (item.driver || "").toLowerCase().includes(vehicleSearch.toLowerCase());

    if (vehicleFilter === "inside") return matchesSearch && item.isInside;
    if (vehicleFilter === "outside") return matchesSearch && !item.isInside;
    return matchesSearch;
  });

  // Filters for Alerts tab
  const filteredAlerts = alertsList.filter((item) => {
    const matchesSearch =
      (item.title || "").toLowerCase().includes(alertSearch.toLowerCase()) ||
      (item.plate || "").toLowerCase().includes(alertSearch.toLowerCase());

    if (alertFilter === "entry") return matchesSearch && item.isEntry;
    if (alertFilter === "exit") return matchesSearch && !item.isEntry;
    return matchesSearch;
  });

  return (
    <div className="w-full h-full bg-[#121214] border border-[#1f1f23] rounded-2xl p-4 flex flex-col select-none overflow-hidden text-white font-sans">
      {/* Header Section */}
      <div className="shrink-0 mb-4">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold text-white tracking-tight truncate">
            {aoi.name}
          </h3>
          <button
            type="button"
            className="text-[#71717a] hover:text-white transition-colors p-1"
          >
            <MoreVertical size={18} />
          </button>
        </div>

        {/* Active Badge */}
        <div className="mt-2">
          <span
            className={`px-3 py-1 rounded-full text-xs font-medium inline-block ${
              isActive
                ? "bg-[#042814] text-[#10b981]"
                : "bg-[#2e1d05] text-[#d97706]"
            }`}
          >
            {isActive ? "Active" : "Inactive"}
          </span>
        </div>
      </div>

      {/* Tabs Navigation (Underline Style) */}
      <div className="flex items-center border-b border-[#1f1f23] mb-4 shrink-0 w-full">
        {TABS.map((tab) => {
          const isSelected = activeTab === tab;
          return (
            <button
              key={tab}
              type="button"
              onClick={() => setActiveTab(tab)}
              className={`flex-1 py-2 text-xs font-medium transition-all text-center relative cursor-pointer ${
                isSelected ? "text-[#f59e0b]" : "text-[#71717a] hover:text-white"
              }`}
            >
              {tab}
              {isSelected && (
                <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#f59e0b] rounded-full" />
              )}
            </button>
          );
        })}
      </div>

      <div className="flex-1 min-h-0 overflow-y-auto custom-scrollbar pr-1">
        {activeTab === "Overview" && (
          <div className="space-y-6">
            {/* AOI Information Section */}
            <div>
              <h4 className="text-xs font-semibold text-white mb-3">
                AOI Information
              </h4>
              <div className="space-y-2.5 text-xs">
                <div className="flex justify-between items-center">
                  <span className="text-[#71717a]">Type</span>
                  <span className="text-[#a1a1aa] font-medium">
                    {displayType}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[#71717a]">Radius</span>
                  <span className="text-[#a1a1aa] font-medium">
                    {displayRadius}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[#71717a]">Center Location</span>
                  <span className="text-[#a1a1aa] font-medium">
                    {displayLocation}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[#71717a]">Created By</span>
                  <span className="text-[#a1a1aa] font-medium">
                    {displayCreatedBy}
                  </span>
                </div>
              </div>
            </div>

            <div className="w-full h-[1px] bg-[#1f1f23]/60" />

            {/* Vehicle Status Section */}
            <div>
              <h4 className="text-xs font-semibold text-white mb-3">
                Vehicle Status
              </h4>
              <div className="space-y-2 text-xs">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-white">
                    {insideCount}
                  </span>
                  <span className="text-[#71717a]">Inside AOI</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-white">
                    {enteredTodayCount}
                  </span>
                  <span className="text-[#71717a]">Entered Today</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-white">
                    {exitedTodayCount}
                  </span>
                  <span className="text-[#71717a]">Exited Today</span>
                </div>
              </div>
            </div>

            <div className="w-full h-[1px] bg-[#1f1f23]/60" />

            
            <div>
              <h4 className="text-xs font-semibold text-white mb-3">
                Vehicle Alert Status
              </h4>
              <div className="space-y-2.5 text-xs">
                <div className="flex justify-between items-center">
                  <span className="text-[#71717a]">Vehicle Entry Alert</span>
                  <span className="text-[#10b981] font-medium">
                    {entryAlertStatus}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[#71717a]">Vehicle Exit Alert</span>
                  <span className="text-[#10b981] font-medium">
                    {exitAlertStatus}
                  </span>
                </div>
              </div>
            </div>

            <div className="w-full h-[1px] bg-[#1f1f23]/60" />

           
            <div>
              <h4 className="text-xs font-semibold text-white mb-3">
                Assigned Vehicle
              </h4>
              <div className="space-y-2.5 text-xs">
                {assignedVehicles.length > 0 ? (
                  assignedVehicles.map((vehicle, idx) => (
                    <div
                      key={vehicle.plate || idx}
                      className="flex justify-between items-center"
                    >
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-white">
                          {vehicle.plate || vehicle.name || vehicle.vehicle_number || ""}
                        </span>
                        <span className="text-[#71717a] text-[11px]">
                          {vehicle.type || vehicle.vehicle_type || ""}
                        </span>
                      </div>
                      <span
                        className={`font-medium ${
                          vehicle.status === "Inside"
                            ? "text-[#10b981]"
                            : "text-[#ef4444]"
                        }`}
                      >
                        {vehicle.status || ""}
                      </span>
                    </div>
                  ))
                ) : (
                  <p className="text-[11px] text-[#71717a]">No assigned vehicle data available</p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* ==================== VEHICLE TAB ==================== */}
        {activeTab === "Vehicle" && (
          <div className="space-y-4">
            {/* Search Input */}
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Search Vehicle..."
                value={vehicleSearch}
                onChange={(e) => setVehicleSearch(e.target.value)}
                className="w-full rounded-full bg-[#09090b] border border-[#27272a] focus:border-[#3f3f46] text-xs py-2 pl-4 pr-10 text-white placeholder-[#52525b] outline-none"
              />
              <Search
                size={15}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#71717a] pointer-events-none"
              />
            </div>

            {/* Filter Pills */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar shrink-0">
              <button
                type="button"
                onClick={() => setVehicleFilter("all")}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-medium cursor-pointer transition-all ${
                  vehicleFilter === "all"
                    ? "bg-[#27272a] text-white"
                    : "bg-[#18181b] text-[#8e8e93] hover:text-white"
                }`}
              >
                <span className="w-2 h-2 rounded-[2px] bg-[#71717a]" />
                All
              </button>
              <button
                type="button"
                onClick={() => setVehicleFilter("inside")}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-medium cursor-pointer transition-all ${
                  vehicleFilter === "inside"
                    ? "bg-[#27272a] text-white"
                    : "bg-[#18181b] text-[#8e8e93] hover:text-white"
                }`}
              >
                <span className="w-2 h-2 rounded-[2px] bg-[#10b981]" />
                {insideCount || totalInsideVehicles || 0} Inside
              </button>
              <button
                type="button"
                onClick={() => setVehicleFilter("outside")}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-medium cursor-pointer transition-all ${
                  vehicleFilter === "outside"
                    ? "bg-[#27272a] text-white"
                    : "bg-[#18181b] text-[#8e8e93] hover:text-white"
                }`}
              >
                <span className="w-2 h-2 rounded-[2px] bg-[#f59e0b]" />
                {totalOutsideVehicles || 0} Outside
              </button>
            </div>

            {/* Vehicle Cards List */}
            <div className="space-y-4 pt-1">
              {filteredVehicles.length > 0 ? (
                filteredVehicles.map((v) => (
                  <div
                    key={v.id || v.plate}
                    className="border-b border-[#1f1f23]/60 pb-3.5 last:border-0"
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-bold text-white">
                        {v.plate}
                      </span>
                      <span
                        className={`px-3 py-0.5 rounded-full text-[10px] font-medium ${
                          v.isInside
                            ? "bg-[#042814] text-[#10b981]"
                            : "bg-[#2e1d05] text-[#d97706]"
                        }`}
                      >
                        • {v.status}
                      </span>
                    </div>

                    <p className="text-[11px] text-[#71717a]">
                      {v.type} <span className="mx-1">•</span> {v.driver}
                    </p>
                    <p className="text-[11px] text-[#71717a] mt-0.5">{v.time}</p>

                    <button
                      type="button"
                      onClick={() => onViewVehicle && onViewVehicle(v)}
                      className="mt-3 flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-[#2b2106] border border-[#523e0c] text-[#f59e0b] hover:bg-[#3d2e08] text-xs font-medium transition-colors cursor-pointer"
                    >
                      View Vehicle
                      <ArrowRight size={13} />
                    </button>
                  </div>
                ))
              ) : (
                <div className="py-8 text-center text-xs text-[#71717a]">
                  No vehicles found
                </div>
              )}
            </div>
          </div>
        )}

        {/* ==================== ALERTS TAB ==================== */}
        {activeTab === "Alerts" && (
          <div className="space-y-4">
            {/* Search Input */}
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Search Vehicle..."
                value={alertSearch}
                onChange={(e) => setAlertSearch(e.target.value)}
                className="w-full rounded-full bg-[#09090b] border border-[#27272a] focus:border-[#3f3f46] text-xs py-2 pl-4 pr-10 text-white placeholder-[#52525b] outline-none"
              />
              <Search
                size={15}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#71717a] pointer-events-none"
              />
            </div>

            {/* Filter Pills */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar shrink-0">
              <button
                type="button"
                onClick={() => setAlertFilter("all")}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-medium cursor-pointer transition-all ${
                  alertFilter === "all"
                    ? "bg-[#27272a] text-white"
                    : "bg-[#18181b] text-[#8e8e93] hover:text-white"
                }`}
              >
                <span className="w-2 h-2 rounded-[2px] bg-[#71717a]" />
                All
              </button>
              <button
                type="button"
                onClick={() => setAlertFilter("entry")}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-medium cursor-pointer transition-all ${
                  alertFilter === "entry"
                    ? "bg-[#27272a] text-white"
                    : "bg-[#18181b] text-[#8e8e93] hover:text-white"
                }`}
              >
                <span className="w-2 h-2 rounded-[2px] bg-[#10b981]" />
                Entry
              </button>
              <button
                type="button"
                onClick={() => setAlertFilter("exit")}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-medium cursor-pointer transition-all ${
                  alertFilter === "exit"
                    ? "bg-[#27272a] text-white"
                    : "bg-[#18181b] text-[#8e8e93] hover:text-white"
                }`}
              >
                <span className="w-2 h-2 rounded-[2px] bg-[#f59e0b]" />
                Exit
              </button>
            </div>

            {/* Alert Cards List */}
            <div className="space-y-3 pt-1">
              {filteredAlerts.length > 0 ? (
                filteredAlerts.map((alt, idx) => (
                  <div
                    key={alt.id || idx}
                    className="border-b border-[#1f1f23]/60 pb-3 last:border-0"
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-bold text-white">
                        {alt.title}
                      </span>
                      <span
                        className={`px-3 py-0.5 rounded-full text-[10px] font-medium ${
                          alt.isEntry
                            ? "bg-[#042814] text-[#10b981]"
                            : "bg-[#2e1d05] text-[#d97706]"
                        }`}
                      >
                        • {alt.badgeText}
                      </span>
                    </div>

                    <p className="text-[11px] text-[#71717a]">
                      {alt.plate} <span className="mx-1">•</span> {alt.driver}
                    </p>
                    <p className="text-[11px] text-[#71717a] mt-0.5">{alt.time}</p>
                  </div>
                ))
              ) : (
                <div className="py-8 text-center text-xs text-[#71717a]">
                  No alerts found
                </div>
              )}
            </div>
          </div>
        )}

        {/* ==================== ACTIVITY TAB ==================== */}
        {activeTab === "Activity" && (
          <div className="space-y-4 pt-1">
            {activitiesList.length > 0 ? (
              activitiesList.map((act, idx) => (
                <div
                  key={act.id || idx}
                  className="border-b border-[#1f1f23]/60 pb-3 last:border-0"
                >
                  <p className="text-xs font-bold text-white">{act.time}</p>
                  <p className="text-[11px] text-[#71717a] mt-0.5">{act.text}</p>
                </div>
              ))
            ) : (
              <div className="py-8 text-center text-xs text-[#71717a]">
                No recent activity
              </div>
            )}
          </div>
        )}
      </div>

      {/* Action Buttons Footer */}
      <div className="shrink-0 pt-4 mt-2 border-t border-[#1f1f23] flex items-center gap-3">
        <button
          type="button"
          onClick={onEdit}
          className="flex-1 py-2.5 px-4 rounded-xl bg-[#27272a] hover:bg-[#3f3f46] text-white text-xs font-semibold flex items-center justify-center gap-2 transition-colors cursor-pointer"
        >
          <Pencil size={14} />
          Edit AOI
        </button>
        <button
          type="button"
          onClick={onDelete}
          className="flex-1 py-2.5 px-4 rounded-xl bg-[#dc2626] hover:bg-[#b91c1c] text-white text-xs font-semibold transition-colors cursor-pointer"
        >
          Delete AOI
        </button>
      </div>
    </div>
  );
}