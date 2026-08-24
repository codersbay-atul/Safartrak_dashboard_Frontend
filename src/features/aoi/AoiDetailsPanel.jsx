import React, { useState } from "react";
import { Pencil, Search, ArrowRight } from "lucide-react";
import MainLayoutColor from "../../components/Ui/MainLayoutUI/MainLayoutColor";
import MainLayoutTextSize from "../../components/Ui/MainLayoutUI/MainLayoutTextSize";

const TABS = ["Overview", "Vehicle", "Alerts", "Activity"];

export default function AoiDetailsPanel({
  aoi,
  onEdit,
  onDelete,
  onViewVehicle,
}) {
  const [InactiveTab, setInactiveTab] = useState("Overview");

  const [vehicleSearch, setVehicleSearch] = useState("");
  const [vehicleFilter, setVehicleFilter] = useState("all");

  const [alertSearch, setAlertSearch] = useState("");
  const [alertFilter, setAlertFilter] = useState("all");

  if (!aoi) {
    return (
      <MainLayoutColor
        as="div"
        background="surface"
        className="w-full h-full border border-[#1f1f23] rounded-2xl p-4 flex items-center justify-center select-none"
      >
        <MainLayoutColor
          as={MainLayoutTextSize}
          color="subtitle"
          size="subInfoText"
        >
          Select a Saved Place to view details
        </MainLayoutColor>
      </MainLayoutColor>
    );
  }

  const isInactive = aoi.status === "Inactive";
  const displayType = aoi.type || aoi.raw?.geometry?.shape || "";
  const displayRadius = aoi.radius ?? aoi.size ?? "";
  const displayLocation =
    aoi.location ||
    (aoi.center
      ? `${aoi.center[0]?.toFixed?.(4) ?? aoi.center[0]}°, ${
          aoi.center[1]?.toFixed?.(4) ?? aoi.center[1]
        }°`
      : "");
  const displayCreatedBy =
    aoi.createdBy || aoi.raw?.created_by || aoi.raw?.createdBy || "";
  const insideCount = aoi.inside ?? aoi.raw?.inside_count ?? 0;
  const enteredTodayCount = aoi.enteredToday ?? aoi.raw?.entered_today ?? 0;
  const exitedTodayCount = aoi.exitedToday ?? aoi.raw?.exited_today ?? 0;
  const entryAlertStatus =
    aoi.entryAlertStatus || aoi.raw?.entry_alert_status || "";
  const exitAlertStatus =
    aoi.exitAlertStatus || aoi.raw?.exit_alert_status || "";
  const assignedVehicles =
    Array.isArray(aoi.assignedVehicles) && aoi.assignedVehicles.length > 0
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

  const filteredVehicles = vehiclesList.filter((item) => {
    const matchesSearch =
      (item.plate || "").toLowerCase().includes(vehicleSearch.toLowerCase()) ||
      (item.driver || "").toLowerCase().includes(vehicleSearch.toLowerCase());

    if (vehicleFilter === "inside") return matchesSearch && item.isInside;
    if (vehicleFilter === "outside") return matchesSearch && !item.isInside;
    return matchesSearch;
  });

  const filteredAlerts = alertsList.filter((item) => {
    const matchesSearch =
      (item.title || "").toLowerCase().includes(alertSearch.toLowerCase()) ||
      (item.plate || "").toLowerCase().includes(alertSearch.toLowerCase());

    if (alertFilter === "entry") return matchesSearch && item.isEntry;
    if (alertFilter === "exit") return matchesSearch && !item.isEntry;
    return matchesSearch;
  });

  return (
    <MainLayoutColor
      as="div"
      background="surface"
      className="w-full h-auto lg:h-full border border-[#1f1f23] rounded-2xl p-4 flex flex-col select-none overflow-hidden font-sans"
    >
      {/* Top Header */}
      <div className="shrink-0 mb-4">
        <div className="flex items-center justify-between">
          <MainLayoutColor
            as={MainLayoutTextSize}
            color="title"
            size="sectionTitle"
            className="font-bold tracking-tight truncate block text-[14px]"
          >
            {aoi.name}
          </MainLayoutColor>
        </div>

        {/* Badge */}
        <div className="mt-2">
          <span
            className={`px-3 py-1 rounded-full inline-block ${
              isInactive
                ? "bg-[#042814] text-[#10b981]"
                : "bg-[#2e1d05] text-[#d97706]"
            }`}
          >
            <MainLayoutTextSize size="badgeText" className="font-medium">
              {isInactive ? "Inactive" : "InInactive"}
            </MainLayoutTextSize>
          </span>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center border-b border-[#1f1f23] mb-4 shrink-0 w-full">
        {TABS.map((tab) => {
          const isSelected = InactiveTab === tab;
          return (
            <button
              key={tab}
              type="button"
              onClick={() => setInactiveTab(tab)}
              className={`flex-1 py-2 transition-all text-center relative cursor-pointer ${
                isSelected
                  ? "text-[#f59e0b]"
                  : "text-[#71717a] hover:text-white"
              }`}
            >
              <MainLayoutTextSize
                size="dropdownText"
                className="font-medium block"
              >
                {tab}
              </MainLayoutTextSize>
              {isSelected && (
                <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#f59e0b] rounded-full" />
              )}
            </button>
          );
        })}
      </div>

      <div className="flex-none lg:flex-1 min-h-0 overflow-y-visible lg:overflow-y-auto custom-scrollbar pr-1">
        {/* ==================== OVERVIEW TAB ==================== */}
        {InactiveTab === "Overview" && (
          <div className="space-y-6">
            <div>
              <MainLayoutColor
                as={MainLayoutTextSize}
                color="title"
                size="sectionTitle"
                className="font-semibold mb-3 block"
              >
                Place Information
              </MainLayoutColor>
              <div className="space-y-2.5">
                <div className="flex justify-between items-center">
                  <MainLayoutColor as={MainLayoutTextSize} color="subtitle" size="subInfoText">
                    Type
                  </MainLayoutColor>
                  <MainLayoutColor as={MainLayoutTextSize} color="title" size="subInfoText" className="font-medium">
                    {displayType}
                  </MainLayoutColor>
                </div>
                <div className="flex justify-between items-center">
                  <MainLayoutColor as={MainLayoutTextSize} color="subtitle" size="subInfoText">
                    Radius
                  </MainLayoutColor>
                  <MainLayoutColor as={MainLayoutTextSize} color="title" size="subInfoText" className="font-medium">
                    {displayRadius}
                  </MainLayoutColor>
                </div>
                <div className="flex justify-between items-center">
                  <MainLayoutColor as={MainLayoutTextSize} color="subtitle" size="subInfoText">
                    Center Location
                  </MainLayoutColor>
                  <MainLayoutColor as={MainLayoutTextSize} color="title" size="subInfoText" className="font-medium">
                    {displayLocation}
                  </MainLayoutColor>
                </div>
                <div className="flex justify-between items-center">
                  <MainLayoutColor as={MainLayoutTextSize} color="subtitle" size="subInfoText">
                    Created By
                  </MainLayoutColor>
                  <MainLayoutColor as={MainLayoutTextSize} color="title" size="subInfoText" className="font-medium">
                    {displayCreatedBy}
                  </MainLayoutColor>
                </div>
              </div>
            </div>

            <div className="w-full h-[1px] bg-[#1f1f23]/60" />

            <div>
              <MainLayoutColor
                as={MainLayoutTextSize}
                color="title"
                size="sectionTitle"
                className="font-semibold mb-3 block"
              >
                Vehicle Status
              </MainLayoutColor>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <MainLayoutColor as={MainLayoutTextSize} color="title" size="sectionTitle" className="font-semibold">
                    {insideCount}
                  </MainLayoutColor>
                  <MainLayoutColor as={MainLayoutTextSize} color="subtitle" size="subInfoText">
                    Inside Place
                  </MainLayoutColor>
                </div>
                <div className="flex items-center gap-2">
                  <MainLayoutColor as={MainLayoutTextSize} color="title" size="sectionTitle" className="font-semibold">
                    {enteredTodayCount}
                  </MainLayoutColor>
                  <MainLayoutColor as={MainLayoutTextSize} color="subtitle" size="subInfoText">
                    Entered Today
                  </MainLayoutColor>
                </div>
                <div className="flex items-center gap-2">
                  <MainLayoutColor as={MainLayoutTextSize} color="title" size="sectionTitle" className="font-semibold">
                    {exitedTodayCount}
                  </MainLayoutColor>
                  <MainLayoutColor as={MainLayoutTextSize} color="subtitle" size="subInfoText">
                    Exited Today
                  </MainLayoutColor>
                </div>
              </div>
            </div>

            <div className="w-full h-[1px] bg-[#1f1f23]/60" />

            <div>
              <MainLayoutColor
                as={MainLayoutTextSize}
                color="title"
                size="sectionTitle"
                className="font-semibold mb-3 block"
              >
                Vehicle Alert Status
              </MainLayoutColor>
              <div className="space-y-2.5">
                <div className="flex justify-between items-center">
                  <MainLayoutColor as={MainLayoutTextSize} color="subtitle" size="subInfoText">
                    Vehicle Entry Alert
                  </MainLayoutColor>
                  <MainLayoutTextSize size="subInfoText" className="text-[#10b981] font-medium">
                    {entryAlertStatus}
                  </MainLayoutTextSize>
                </div>
                <div className="flex justify-between items-center">
                  <MainLayoutColor as={MainLayoutTextSize} color="subtitle" size="subInfoText">
                    Vehicle Exit Alert
                  </MainLayoutColor>
                  <MainLayoutTextSize size="subInfoText" className="text-[#10b981] font-medium">
                    {exitAlertStatus}
                  </MainLayoutTextSize>
                </div>
              </div>
            </div>

            <div className="w-full h-[1px] bg-[#1f1f23]/60" />

            <div>
              <MainLayoutColor
                as={MainLayoutTextSize}
                color="title"
                size="sectionTitle"
                className="font-semibold mb-3 block"
              >
                Assigned Vehicle
              </MainLayoutColor>
              <div className="space-y-2.5">
                {assignedVehicles.length > 0 ? (
                  assignedVehicles.map((vehicle, idx) => (
                    <div
                      key={vehicle.plate || idx}
                      className="flex justify-between items-center"
                    >
                      <div className="flex items-center gap-2">
                        <MainLayoutColor
                          as={MainLayoutTextSize}
                          color="title"
                          size="plateText"
                          className="font-semibold"
                        >
                          {vehicle.plate ||
                            vehicle.name ||
                            vehicle.vehicle_number ||
                            ""}
                        </MainLayoutColor>
                        <MainLayoutColor
                          as={MainLayoutTextSize}
                          color="subtitle"
                          size="subInfoText"
                        >
                          {vehicle.type || vehicle.vehicle_type || ""}
                        </MainLayoutColor>
                      </div>
                      <MainLayoutTextSize
                        size="subInfoText"
                        className={`font-medium ${
                          vehicle.status === "Inside"
                            ? "text-[#10b981]"
                            : "text-[#ef4444]"
                        }`}
                      >
                        {vehicle.status || ""}
                      </MainLayoutTextSize>
                    </div>
                  ))
                ) : (
                  <MainLayoutColor as={MainLayoutTextSize} color="subtitle" size="subInfoText">
                    No assigned vehicle data available
                  </MainLayoutColor>
                )}
              </div>
            </div>
          </div>
        )}

        {/* ==================== VEHICLE TAB ==================== */}
        {InactiveTab === "Vehicle" && (
          <div className="space-y-4">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Search Vehicle..."
                value={vehicleSearch}
                onChange={(e) => setVehicleSearch(e.target.value)}
                className="w-full rounded-full bg-[#09090b] border border-[#27272a] focus:border-[#3f3f46] text-[12px] py-2 pl-4 pr-10 text-white placeholder-[#52525b] outline-none"
              />
              <Search
                size={15}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#71717a] pointer-events-none"
              />
            </div>

            <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar shrink-0">
              <button
                type="button"
                onClick={() => setVehicleFilter("all")}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-full cursor-pointer transition-all ${
                  vehicleFilter === "all"
                    ? "bg-[#27272a] text-white"
                    : "bg-[#18181b] text-[#8e8e93] hover:text-white"
                }`}
              >
                <span className="w-2 h-2 rounded-[2px] bg-[#71717a]" />
                <MainLayoutTextSize size="badgeText" className="font-medium">
                  All
                </MainLayoutTextSize>
              </button>
              <button
                type="button"
                onClick={() => setVehicleFilter("inside")}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-full cursor-pointer transition-all ${
                  vehicleFilter === "inside"
                    ? "bg-[#27272a] text-white"
                    : "bg-[#18181b] text-[#8e8e93] hover:text-white"
                }`}
              >
                <span className="w-2 h-2 rounded-[2px] bg-[#10b981]" />
                <MainLayoutTextSize size="badgeText" className="font-medium">
                  {insideCount || totalInsideVehicles || 0} Inside
                </MainLayoutTextSize>
              </button>
              <button
                type="button"
                onClick={() => setVehicleFilter("outside")}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-full cursor-pointer transition-all ${
                  vehicleFilter === "outside"
                    ? "bg-[#27272a] text-white"
                    : "bg-[#18181b] text-[#8e8e93] hover:text-white"
                }`}
              >
                <span className="w-2 h-2 rounded-[2px] bg-[#f59e0b]" />
                <MainLayoutTextSize size="badgeText" className="font-medium">
                  {totalOutsideVehicles || 0} Outside
                </MainLayoutTextSize>
              </button>
            </div>

            <div className="space-y-4 pt-1">
              {filteredVehicles.length > 0 ? (
                filteredVehicles.map((v) => (
                  <div
                    key={v.id || v.plate}
                    className="border-b border-[#1f1f23]/60 pb-3.5 last:border-0"
                  >
                    <div className="flex items-center justify-between mb-1">
                      <MainLayoutColor
                        as={MainLayoutTextSize}
                        color="title"
                        size="plateText"
                        className="font-bold"
                      >
                        {v.plate}
                      </MainLayoutColor>
                      <span
                        className={`px-3 py-0.5 rounded-full ${
                          v.isInside
                            ? "bg-[#042814] text-[#10b981]"
                            : "bg-[#2e1d05] text-[#d97706]"
                        }`}
                      >
                        <MainLayoutTextSize size="badgeText" className="font-medium">
                          • {v.status}
                        </MainLayoutTextSize>
                      </span>
                    </div>

                    <MainLayoutColor
                      as={MainLayoutTextSize}
                      color="subtitle"
                      size="subInfoText"
                      className="block"
                    >
                      {v.type} <span className="mx-1">•</span> {v.driver}
                    </MainLayoutColor>
                    <MainLayoutColor
                      as={MainLayoutTextSize}
                      color="subtitle"
                      size="subInfoText"
                      className="mt-0.5 block"
                    >
                      {v.time}
                    </MainLayoutColor>

                    <button
                      type="button"
                      onClick={() => onViewVehicle && onViewVehicle(v)}
                      className="mt-3 flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-[#2b2106] border border-[#523e0c] text-[#f59e0b] hover:bg-[#3d2e08] transition-colors cursor-pointer"
                    >
                      <MainLayoutTextSize size="subInfoText" className="font-medium">
                        View Vehicle
                      </MainLayoutTextSize>
                      <ArrowRight size={13} />
                    </button>
                  </div>
                ))
              ) : (
                <div className="py-8 text-center">
                  <MainLayoutColor as={MainLayoutTextSize} color="subtitle" size="subInfoText">
                    No vehicles found
                  </MainLayoutColor>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ==================== ALERTS TAB ==================== */}
        {InactiveTab === "Alerts" && (
          <div className="space-y-4">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Search Vehicle..."
                value={alertSearch}
                onChange={(e) => setAlertSearch(e.target.value)}
                className="w-full rounded-full bg-[#09090b] border border-[#27272a] focus:border-[#3f3f46] text-[12px] py-2 pl-4 pr-10 text-white placeholder-[#52525b] outline-none"
              />
              <Search
                size={15}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#71717a] pointer-events-none"
              />
            </div>

            <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar shrink-0">
              <button
                type="button"
                onClick={() => setAlertFilter("all")}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-full cursor-pointer transition-all ${
                  alertFilter === "all"
                    ? "bg-[#27272a] text-white"
                    : "bg-[#18181b] text-[#8e8e93] hover:text-white"
                }`}
              >
                <span className="w-2 h-2 rounded-[2px] bg-[#71717a]" />
                <MainLayoutTextSize size="badgeText" className="font-medium">
                  All
                </MainLayoutTextSize>
              </button>
              <button
                type="button"
                onClick={() => setAlertFilter("entry")}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-full cursor-pointer transition-all ${
                  alertFilter === "entry"
                    ? "bg-[#27272a] text-white"
                    : "bg-[#18181b] text-[#8e8e93] hover:text-white"
                }`}
              >
                <span className="w-2 h-2 rounded-[2px] bg-[#10b981]" />
                <MainLayoutTextSize size="badgeText" className="font-medium">
                  Entry
                </MainLayoutTextSize>
              </button>
              <button
                type="button"
                onClick={() => setAlertFilter("exit")}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-full cursor-pointer transition-all ${
                  alertFilter === "exit"
                    ? "bg-[#27272a] text-white"
                    : "bg-[#18181b] text-[#8e8e93] hover:text-white"
                }`}
              >
                <span className="w-2 h-2 rounded-[2px] bg-[#f59e0b]" />
                <MainLayoutTextSize size="badgeText" className="font-medium">
                  Exit
                </MainLayoutTextSize>
              </button>
            </div>

            <div className="space-y-3 pt-1">
              {filteredAlerts.length > 0 ? (
                filteredAlerts.map((alt, idx) => (
                  <div
                    key={alt.id || idx}
                    className="border-b border-[#1f1f23]/60 pb-3 last:border-0"
                  >
                    <div className="flex items-center justify-between mb-1">
                      <MainLayoutColor
                        as={MainLayoutTextSize}
                        color="title"
                        size="sectionTitle"
                        className="font-bold"
                      >
                        {alt.title}
                      </MainLayoutColor>
                      <span
                        className={`px-3 py-0.5 rounded-full ${
                          alt.isEntry
                            ? "bg-[#042814] text-[#10b981]"
                            : "bg-[#2e1d05] text-[#d97706]"
                        }`}
                      >
                        <MainLayoutTextSize size="badgeText" className="font-medium">
                          • {alt.badgeText}
                        </MainLayoutTextSize>
                      </span>
                    </div>

                    <MainLayoutColor
                      as={MainLayoutTextSize}
                      color="subtitle"
                      size="subInfoText"
                      className="block"
                    >
                      {alt.plate} <span className="mx-1">•</span> {alt.driver}
                    </MainLayoutColor>
                    <MainLayoutColor
                      as={MainLayoutTextSize}
                      color="subtitle"
                      size="subInfoText"
                      className="mt-0.5 block"
                    >
                      {alt.time}
                    </MainLayoutColor>
                  </div>
                ))
              ) : (
                <div className="py-8 text-center">
                  <MainLayoutColor as={MainLayoutTextSize} color="subtitle" size="subInfoText">
                    No alerts found
                  </MainLayoutColor>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ==================== ACTIVITY TAB ==================== */}
        {InactiveTab === "Activity" && (
          <div className="space-y-4 pt-1">
            {activitiesList.length > 0 ? (
              activitiesList.map((act, idx) => (
                <div
                  key={act.id || idx}
                  className="border-b border-[#1f1f23]/60 pb-3 last:border-0"
                >
                  <MainLayoutColor
                    as={MainLayoutTextSize}
                    color="title"
                    size="sectionTitle"
                    className="font-bold block"
                  >
                    {act.time}
                  </MainLayoutColor>
                  <MainLayoutColor
                    as={MainLayoutTextSize}
                    color="subtitle"
                    size="subInfoText"
                    className="mt-0.5 block"
                  >
                    {act.text}
                  </MainLayoutColor>
                </div>
              ))
            ) : (
              <div className="py-8 text-center">
                <MainLayoutColor as={MainLayoutTextSize} color="subtitle" size="subInfoText">
                  No recent activity
                </MainLayoutColor>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Footer Buttons */}
      <div className="shrink-0 pt-4 mt-2 border-t border-[#1f1f23] flex items-center gap-3">
        <button
          type="button"
          onClick={onEdit}
          className="flex-1 py-2.5 px-4 rounded-xl bg-[#27272a] hover:bg-[#3f3f46] text-white flex items-center justify-center gap-2 transition-colors cursor-pointer"
        >
          <Pencil size={14} />
          <MainLayoutTextSize size="headerButtonText">
            Edit Places
          </MainLayoutTextSize>
        </button>
        <button
          type="button"
          onClick={onDelete}
          className="flex-1 py-2.5 px-4 rounded-xl bg-[#dc2626] hover:bg-[#b91c1c] text-white transition-colors cursor-pointer"
        >
          <MainLayoutTextSize size="headerButtonText">
            Delete
          </MainLayoutTextSize>
        </button>
      </div>
    </MainLayoutColor>
  );
}