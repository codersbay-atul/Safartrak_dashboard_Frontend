import React, { useState } from "react";
import MainLayout from "../layouts/MainLayout";
import MobilizeHeader from "../features/mobilize/MobilizeHeader";
import MobilizeStats from "../features/mobilize/MobilizeStats";
import MobilizeVehicleList from "../features/mobilize/MobilizeVehicleList";
import { MOBILIZE_VEHICLES } from "../features/mobilize/mobilizeData";

export default function Mobilize() {
  const [searchQuery, setSearchQuery] = useState("");
  const [fleetFilter, setFleetFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [vehicles, setVehicles] = useState(MOBILIZE_VEHICLES);

  const filteredVehicles = vehicles.filter((vehicle) => {
    const query = searchQuery.trim().toLowerCase();
    const matchesSearch =
      !query ||
      vehicle.plate.toLowerCase().includes(query) ||
      vehicle.driver.toLowerCase().includes(query) ||
      vehicle.city.toLowerCase().includes(query);

    const matchesStatus =
      statusFilter === "all" || vehicle.status === statusFilter;

    const matchesFleet =
      fleetFilter === "all" ||
      vehicle.city.toLowerCase() === fleetFilter.toLowerCase();

    return matchesSearch && matchesStatus && matchesFleet;
  });

  const handleAction = (vehicle) => {
    if (vehicle.status === "offline") return;

    setVehicles((prev) =>
      prev.map((item) => {
        if (item.id !== vehicle.id) return item;
        return {
          ...item,
          status: item.status === "mobilized" ? "immobilized" : "mobilized",
        };
      })
    );
  };

  return (
    <MainLayout activeTab="Mobilize / Immobilize">
      <div className="flex-1 flex flex-col gap-3.5 min-h-0 overflow-y-auto lg:overflow-hidden pr-0.5 custom-scrollbar">
        <MobilizeHeader
          searchQuery={searchQuery}
          onSearchChange={(e) => setSearchQuery(e.target.value)}
          fleetFilter={fleetFilter}
          onFleetChange={setFleetFilter}
          onHistoryClick={() => {}}
        />

        <MobilizeStats />

        <MobilizeVehicleList
          vehicles={filteredVehicles}
          activeFilter={statusFilter}
          onFilterChange={setStatusFilter}
          onAction={handleAction}
        />
      </div>
    </MainLayout>
  );
}
