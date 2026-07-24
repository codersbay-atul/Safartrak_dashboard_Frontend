import React, { useState } from "react";
import MainLayout from "../layouts/MainLayout";
import AlertsHeader from "../features/alerts/AlertsHeader";
import AlertsStats from "../features/alerts/AlertsStats";
import AlertTypeGrid from "../features/alerts/AlertTypeGrid";
import RecentAlertsTable from "../features/alerts/RecentAlertsTable";
import { RECENT_ALERTS } from "../features/alerts/alertsData";

export default function Alerts() {
  const [searchQuery, setSearchQuery] = useState("");
  const [fleetFilter, setFleetFilter] = useState("all");
  const [severityFilter, setSeverityFilter] = useState("all");
  const [activeType, setActiveType] = useState("all");

  const filteredAlerts = RECENT_ALERTS.filter((alert) => {
    const query = searchQuery.trim().toLowerCase();
    const matchesSearch =
      !query ||
      alert.vehicle.toLowerCase().includes(query) ||
      alert.driver.toLowerCase().includes(query) ||
      alert.location.toLowerCase().includes(query);

    const matchesFleet =
      fleetFilter === "all" || alert.fleet === fleetFilter;

    const matchesSeverity =
      severityFilter === "all" ||
      alert.status.toLowerCase() === severityFilter;

    const matchesType =
      activeType === "all" || alert.type === activeType;

    return matchesSearch && matchesFleet && matchesSeverity && matchesType;
  });

  return (
    <MainLayout activeTab="Alerts">
      <div className="flex-1 flex flex-col gap-3.5 min-h-0 overflow-y-auto pr-0.5 custom-scrollbar">
        <AlertsHeader
          searchQuery={searchQuery}
          onSearchChange={(e) => setSearchQuery(e.target.value)}
          fleetFilter={fleetFilter}
          onFleetChange={setFleetFilter}
          severityFilter={severityFilter}
          onSeverityChange={setSeverityFilter}
          onConfigClick={() => {}}
        />

        <AlertsStats />

        <AlertTypeGrid
          activeType={activeType}
          onTypeSelect={setActiveType}
        />

        <RecentAlertsTable alerts={filteredAlerts} />
      </div>
    </MainLayout>
  );
}
