import React, { useEffect, useMemo, useState } from "react";
import MainLayout from "../layouts/MainLayout";
import ActivityHeader from "../features/activity/ActivityHeader";
import ActivityStats from "../features/activity/ActivityStats";
import ActivityList from "../features/activity/ActivityList";
import RoutePlayback from "../features/activity/RoutePlayback";
import ActivityDetails from "../features/activity/ActivityDetails";
import { useActivityList } from "../hooks/useActivityList";
import { getActivityExport } from "../services/activityService";
import { toast } from "../components/Ui/toast";

export default function Activity() {
  const [vehicleFilter, setVehicleFilter] = useState("all");
  const [eventFilter, setEventFilter] = useState("all");
  const [driverFilter, setDriverFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [page, setPage] = useState(1);
  const [pageSize] = useState(25);

  const vehicleParam = vehicleFilter === "all" ? undefined : vehicleFilter;
  const eventParam = eventFilter === "all" ? undefined : eventFilter;
  const driverParam = driverFilter === "all" ? undefined : driverFilter;

  const { activityList, isLoading } = useActivityList({
    period: "today",
    vehicle: vehicleParam,
    driver: driverParam,
    event: eventParam,
    search: searchQuery || undefined,
    page,
    page_size: pageSize,
  });

  const events = useMemo(() => {
    return activityList.activities || [];
  }, [activityList.activities]);

  useEffect(() => {
    if (selectedEvent === null && events.length > 0) {
      setSelectedEvent(events[0]);
    }

    if (
      selectedEvent !== null &&
      events.length > 0 &&
      !events.some((event) => event.id === selectedEvent?.id)
    ) {
      setSelectedEvent(events[0] ?? null);
    }

    if (events.length === 0) {
      setSelectedEvent(null);
    }
  }, [events, selectedEvent]);

  const handleExport = async () => {
    try {
      const response = await getActivityExport({ period: "today" });
      const disposition =
        response.headers?.["content-disposition"] ||
        response.headers?.["Content-Disposition"];
      let filename = "activity_export.csv";
      if (disposition) {
        const match = /filename\*?=([^;]+)/i.exec(disposition);
        if (match) {
          filename = match[1].replace(/UTF-8''/, "").replace(/"/g, "");
        }
      }

      const blob = new Blob([response.data], {
        type: response.data?.type || "application/octet-stream",
      });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error("Activity export failed", err);
      toast.error(err?.message || "Activity export failed.");
    }
  };

  return (
    <MainLayout activeTab="Activity">
      <div className="flex-1 flex flex-col gap-2.5 min-h-0 overflow-y-auto min-[1152px]:overflow-hidden pr-0.5 custom-scrollbar">
        <div className="shrink-0">
          <ActivityHeader
            vehicleFilter={vehicleFilter}
            onVehicleChange={setVehicleFilter}
            eventFilter={eventFilter}
            onEventChange={setEventFilter}
            driverFilter={driverFilter}
            onDriverChange={setDriverFilter}
            searchQuery={searchQuery}
            onSearchChange={(e) => setSearchQuery(e.target.value)}
            onExportClick={handleExport}
          />
        </div>

        <div className="shrink-0">
          <ActivityStats />
        </div>

        <div className="flex flex-col min-[1152px]:flex-row gap-3.5 items-stretch w-full flex-1 min-h-0 overflow-y-auto min-[1152px]:overflow-hidden">
          <div className="w-full min-[1152px]:w-[300px] shrink-0 h-[320px] min-[1152px]:h-full min-h-0 overflow-hidden">
            <ActivityList
              events={isLoading ? [] : events}
              selectedId={selectedEvent?.id}
              onSelect={(event) => setSelectedEvent(event)}
              searchQuery={searchQuery}
              onSearchChange={(e) => setSearchQuery(e.target.value)}
              onFilterClick={() => {}}
            />
          </div>

          <div className="w-full shrink-0 h-[360px] min-[1152px]:flex-1 min-[1152px]:h-full min-w-0 min-h-0 overflow-hidden">
            <RoutePlayback />
          </div>

          <div className="w-full min-[1152px]:w-[300px] shrink-0 h-[480px] min-[1152px]:h-full min-h-0 overflow-hidden">
            <ActivityDetails
              event={selectedEvent}
              onShare={() => {}}
              onAddNote={() => {}}
            />
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
