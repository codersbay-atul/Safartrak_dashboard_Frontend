import React, { useMemo, useState } from "react";
import MainLayout from "../layouts/MainLayout";
import AlertsHeader from "../features/alerts/AlertsHeader";
import AlertsStats from "../features/alerts/AlertsStats";
import AlertTypeGrid from "../features/alerts/AlertTypeGrid";
import RecentAlertsTable from "../features/alerts/RecentAlertsTable";
import {
  getDefaultGeofenceRange,
  isGeofenceAlertType,
  mapAlertStatsCards,
} from "../features/alerts/mapAlerts";
import { useAlertCount } from "../hooks/useAlertCount";
import { useAlertSummary } from "../hooks/useAlertSummary";
import { useAlertTypes } from "../hooks/useAlertTypes";
import { useAlertsList } from "../hooks/useAlertsList";

export default function Alerts() {
  const [searchQuery, setSearchQuery] = useState("");
  const [fleetFilter, setFleetFilter] = useState("all");
  const [severityFilter, setSeverityFilter] = useState("all");
  const [activeType, setActiveType] = useState("all");

  const { count, isLoading: isCountLoading } = useAlertCount();
  const { summary, isLoading: isSummaryLoading } = useAlertSummary();

  const {
    types,
    isLoading: isTypesLoading,
    isError: isTypesError,
  } = useAlertTypes();

  const geofenceMode = isGeofenceAlertType(activeType);
  const geofenceRange = useMemo(
    () => (geofenceMode ? getDefaultGeofenceRange() : null),
    [geofenceMode]
  );

  const listParams = useMemo(
    () =>
      geofenceMode
        ? {
            type: "aoi",
            from: geofenceRange?.from,
            to: geofenceRange?.to,
          }
        : {},
    [geofenceMode, geofenceRange]
  );

  const {
    alerts,
    isLoading: isAlertsLoading,
    isError: isAlertsError,
  } = useAlertsList(listParams);

  const statsCards = useMemo(
    () =>
      mapAlertStatsCards(summary, count, {
        isLoading:
          (isCountLoading || isSummaryLoading) && !summary && !count,
      }),
    [summary, count, isCountLoading, isSummaryLoading]
  );

  const filteredAlerts = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    return alerts.filter((alert) => {
      const matchesSearch =
        !query ||
        String(alert.vehicle ?? "")
          .toLowerCase()
          .includes(query) ||
        String(alert.type ?? "")
          .toLowerCase()
          .includes(query) ||
        String(alert.component ?? "")
          .toLowerCase()
          .includes(query) ||
        String(alert.message ?? "")
          .toLowerCase()
          .includes(query);

      const matchesFleet =
        fleetFilter === "all" ||
        (alert.fleet != null && alert.fleet === fleetFilter);

      const matchesSeverity =
        severityFilter === "all" ||
        String(alert.severity ?? "")
          .toLowerCase() === severityFilter;

      const matchesType =
        activeType === "all" ||
        geofenceMode ||
        alert.type === activeType;

      return matchesSearch && matchesFleet && matchesSeverity && matchesType;
    });
  }, [
    alerts,
    searchQuery,
    fleetFilter,
    severityFilter,
    activeType,
    geofenceMode,
  ]);

  return (
    <MainLayout activeTab="Alerts">
      <div className="flex-1 flex flex-col gap-2.5 min-h-0 min-w-0 overflow-x-hidden overflow-y-auto pr-0.5 custom-scrollbar">
        <div className="shrink-0">
          <AlertsHeader
            searchQuery={searchQuery}
            onSearchChange={(e) => setSearchQuery(e.target.value)}
            fleetFilter={fleetFilter}
            onFleetChange={setFleetFilter}
            severityFilter={severityFilter}
            onSeverityChange={setSeverityFilter}
            onConfigClick={() => {}}
          />
        </div>

        <div className="shrink-0">
          <AlertsStats cards={statsCards} />
        </div>

        <div className="shrink-0">
          <AlertTypeGrid
            types={types}
            activeType={activeType}
            onTypeSelect={setActiveType}
            isLoading={isTypesLoading}
            isError={isTypesError}
          />
        </div>

        <div className="flex-none min-h-[280px] lg:flex-1 lg:min-h-0 flex flex-col">
          <RecentAlertsTable
            alerts={filteredAlerts}
            isLoading={isAlertsLoading}
            isError={isAlertsError}
          />
        </div>
      </div>
    </MainLayout>
  );
}