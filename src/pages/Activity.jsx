import React, { useMemo, useState } from "react";
import MainLayout from "../layouts/MainLayout";
import ActivityHeader from "../features/activity/ActivityHeader";
import ActivityStats from "../features/activity/ActivityStats";
import ActivityList from "../features/activity/ActivityList";
import RoutePlayback from "../features/activity/RoutePlayback";
import ActivityDetails from "../features/activity/ActivityDetails";
import { ACTIVITY_EVENTS } from "../features/activity/activityData";

export default function Activity() {
  const [vehicleFilter, setVehicleFilter] = useState("all");
  const [eventFilter, setEventFilter] = useState("all");
  const [driverFilter, setDriverFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [listSearch, setListSearch] = useState("");
  const [selectedId, setSelectedId] = useState(
    ACTIVITY_EVENTS.find((e) => e.severity === "alert")?.id ||
      ACTIVITY_EVENTS[0]?.id ||
      null
  );

  const filteredEvents = useMemo(() => {
    return ACTIVITY_EVENTS.filter((event) => {
      const headerQuery = searchQuery.trim().toLowerCase();
      const listQuery = listSearch.trim().toLowerCase();

      const matchesHeaderSearch =
        !headerQuery ||
        event.vehicle.toLowerCase().includes(headerQuery) ||
        event.driver.toLowerCase().includes(headerQuery) ||
        event.location.toLowerCase().includes(headerQuery);

      const matchesListSearch =
        !listQuery ||
        event.title.toLowerCase().includes(listQuery) ||
        event.location.toLowerCase().includes(listQuery) ||
        event.vehicle.toLowerCase().includes(listQuery);

      const matchesVehicle =
        vehicleFilter === "all" || event.vehicle === vehicleFilter;

      const matchesEvent =
        eventFilter === "all" || event.type === eventFilter;

      const matchesDriver =
        driverFilter === "all" ||
        event.driver.toLowerCase().includes(driverFilter);

      return (
        matchesHeaderSearch &&
        matchesListSearch &&
        matchesVehicle &&
        matchesEvent &&
        matchesDriver
      );
    });
  }, [
    searchQuery,
    listSearch,
    vehicleFilter,
    eventFilter,
    driverFilter,
  ]);

  return (
    <MainLayout activeTab="Activity">
      <div className="flex-1 flex flex-col gap-3.5 min-h-0 overflow-y-auto lg:overflow-hidden pr-0.5 custom-scrollbar">
        <ActivityHeader
          vehicleFilter={vehicleFilter}
          onVehicleChange={setVehicleFilter}
          eventFilter={eventFilter}
          onEventChange={setEventFilter}
          driverFilter={driverFilter}
          onDriverChange={setDriverFilter}
          searchQuery={searchQuery}
          onSearchChange={(e) => setSearchQuery(e.target.value)}
          onExportClick={() => {}}
        />

        <ActivityStats />

        <div className="flex flex-col xl:flex-row gap-3.5 w-full flex-1 min-h-[560px] xl:min-h-0 overflow-hidden">
          <div className="w-full xl:w-[300px] shrink-0 h-[320px] xl:h-full min-h-0 overflow-hidden">
            <ActivityList
              events={filteredEvents}
              selectedId={selectedId}
              onSelect={(event) => setSelectedId(event.id)}
              searchQuery={listSearch}
              onSearchChange={(e) => setListSearch(e.target.value)}
              onFilterClick={() => {}}
            />
          </div>

          <div className="flex-1 min-w-0 h-[360px] xl:h-full min-h-0 overflow-hidden">
            <RoutePlayback />
          </div>

          <div className="w-full xl:w-[300px] shrink-0 h-[480px] xl:h-full min-h-0 overflow-hidden">
            <ActivityDetails onShare={() => {}} onAddNote={() => {}} />
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
