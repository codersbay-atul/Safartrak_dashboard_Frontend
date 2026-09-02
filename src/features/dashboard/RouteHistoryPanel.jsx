import React, { useMemo, useState } from "react";
import { RefreshCw, Play, Download, X } from "lucide-react";
import { useActivityList } from "../../hooks/useActivityList";
import { getActivityExport } from "../../services/activityService";
import MainLayoutColor from "../../components/Ui/MainLayoutUI/MainLayoutColor";
import MainLayoutTextSize from "../../components/Ui/MainLayoutUI/MainLayoutTextSize";
import MainDropDown from "../../components/Ui/MainLayoutUI/MainDropDown";
import MainHeaderActionButton from "../../components/Ui/MainLayoutUI/MainHeaderActionButton";
// import { mapRouteHistoryEvents } from "./mapRouteHistory";
// import { getVehicleApiId } from "./mapVehiclesList";
import RouteHistoryTimeline from "./RouteHistoryTimeline";
import {
  DUMMY_ROUTE_HISTORY_EVENTS,
  DUMMY_ROUTE_HISTORY_SUMMARY,
} from "./routeHistoryData";
import { toast } from "../../components/Ui/toast";

const PERIOD_OPTIONS = [
  { label: "Today", value: "today" },
  { label: "Yesterday", value: "yesterday" },
  { label: "Last 7 days", value: "7d" },
];

function IconCircleButton({ icon: Icon, onClick, title, spinning = false }) {
  return (
    <button
      type="button"
      onClick={onClick}
      title={title}
      className="w-8 h-8 rounded-full border border-[#3f3f46] flex items-center justify-center text-[#a1a1aa] hover:text-white hover:border-[#71717a] cursor-pointer shrink-0"
    >
      <Icon size={14} className={spinning ? "animate-spin" : ""} />
    </button>
  );
}

export default function RouteHistoryPanel({
  vehicle,
  onClose,
  onPlayRoute,
  onSaveStop,
  onSelectStop,
  selectedStopId,
}) {
  const [period, setPeriod] = useState("today");
  const [listFilter, setListFilter] = useState("all");
  // const vehicleId = getVehicleApiId(vehicle);

  const { activityList, isLoading, isFetching, refetch } = useActivityList({
    period,
    vehicle: vehicle?.id || undefined,
    page: 1,
    page_size: 100,
    enabled: Boolean(vehicle?.id),
  });

  const { events, summary } = useMemo(() => {
    const apiEvents = Array.isArray(activityList?.activities)
      ? activityList.activities
      : [];
    const hasMappedEvents = apiEvents.length > 0 && Boolean(apiEvents[0]?.kind);

    if (hasMappedEvents) {
      return {
        events: apiEvents,
        summary: activityList?.summary ?? DUMMY_ROUTE_HISTORY_SUMMARY,
      };
    }

    return {
      events: DUMMY_ROUTE_HISTORY_EVENTS,
      summary: DUMMY_ROUTE_HISTORY_SUMMARY,
    };
  }, [activityList]);

  const visibleEvents = useMemo(() => {
    if (listFilter === "stopped") {
      return events.filter((event) => event.kind === "stop");
    }
    return events;
  }, [events, listFilter]);

  const handleExport = async () => {
    try {
      const response = await getActivityExport({
        period,
        vehicle: vehicle?.id,
      });
      const disposition =
        response.headers?.["content-disposition"] ||
        response.headers?.["Content-Disposition"];
      let filename = "route-history.csv";
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
      toast.success("Route history download started");
    } catch (err) {
      toast.error(err?.message || "Unable to download route history");
    }
  };

  return (
    <MainLayoutColor
      as="div"
      background="surface"
      border="cardBorder"
      className="w-full h-full rounded-xl flex flex-col select-none overflow-hidden min-w-0"
    >
      <div className="px-3 pt-3 pb-1 shrink-0 flex items-center justify-between">
        <MainLayoutColor
          as={MainLayoutTextSize}
          color="title"
          size="sectionTitle"
          className="font-semibold tracking-tight"
        >
          Route History
        </MainLayoutColor>
        <div className="flex items-center gap-2">
          <div className="w-[110px]">
            <MainDropDown
              label="Today"
              options={PERIOD_OPTIONS}
              selectedValue={period}
              onSelect={setPeriod}
            />
          </div>
          <IconCircleButton
            icon={RefreshCw}
            onClick={() => refetch()}
            title="Refresh"
            spinning={isFetching}
          />
          <IconCircleButton
            icon={Play}
            onClick={onPlayRoute}
            title="Play route"
          />
          {/* <MainHeaderActionButton
            variant="secondary"
            icon={X}
            onClick={onClose}
            aria-label="Close"
            title="Close"
            className="w-8 !px-0"
          /> */}
        </div>
      </div>
      <hr className="my-2 border-white/10" />
      <div className="flex items-center justify-between gap-2 px-3 pt-2 pb-2 shrink-0">
        <div className="flex items-center gap-2">
          {/* <IconCircleButton
            icon={RefreshCw}
            onClick={() => refetch()}
            title="Refresh"
            spinning={isFetching}
          />
          <IconCircleButton
            icon={Play}
            onClick={onPlayRoute}
            title="Play route"
          /> */}
          {/* <IconCircleButton
            icon={Download}
            onClick={handleExport}
            title="Download"
          /> */}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2 px-3 pb-3 shrink-0">
        <MainLayoutColor
          as="button"
          type="button"
          onClick={() => setListFilter("all")}
          background="selectedRowBg"
          className={`rounded-lg p-2.5 text-left cursor-pointer ${
            listFilter === "all"
              ? "border border-[#FDBB24]/40"
              : "border border-[#232329]"
          }`}
        >
          <MainLayoutColor
            as={MainLayoutTextSize}
            color={listFilter === "all" ? "yellow" : "title"}
            size="subInfoText"
            className="font-semibold block"
          >
            All
          </MainLayoutColor>
          <MainLayoutColor
            as={MainLayoutTextSize}
            color="title"
            size="sectionTitle"
            className="mt-1 block font-semibold"
          >
            {summary.distance}
          </MainLayoutColor>
          <MainLayoutColor
            as={MainLayoutTextSize}
            color="subtitle"
            size="subInfoText"
            className="mt-0.5 block font-normal"
          >
            {summary.runningTime}
          </MainLayoutColor>
        </MainLayoutColor>

        <MainLayoutColor
          as="button"
          type="button"
          onClick={() => setListFilter("stopped")}
          background="selectedRowBg"
          className={`rounded-lg p-2.5 text-left cursor-pointer ${
            listFilter === "stopped"
              ? "border border-[#FDBB24]/40"
              : "border border-[#232329]"
          }`}
        >
          <MainLayoutColor
            as={MainLayoutTextSize}
            color="title"
            size="subInfoText"
            className={`font-semibold block ${
              listFilter === "stopped" ? "text-[#FDB914]" : ""
            }`}
          >
            Stopped
          </MainLayoutColor>
          <div className="mt-1 flex items-baseline gap-1.5 flex-wrap">
            <MainLayoutColor
              as={MainLayoutTextSize}
              color="title"
              size="sectionTitle"
              className="font-semibold"
            >
              {summary.stopCount} stops
            </MainLayoutColor>
            <MainLayoutColor
              as={MainLayoutTextSize}
              color="subtitle"
              size="subInfoText"
              className="font-normal"
            >
              {summary.stoppedTime}
            </MainLayoutColor>
          </div>
        </MainLayoutColor>
      </div>

      <div className="flex-1 min-h-0 overflow-y-auto px-3 pb-1 scrollbar-thin scrollbar-thumb-zinc-800 scrollbar-track-transparent">
        {isLoading && visibleEvents.length === 0 ? (
          <div className="h-full flex items-center justify-center">
            <MainLayoutColor
              as={MainLayoutTextSize}
              color="subtitle"
              size="subInfoText"
            >
              Loading route history...
            </MainLayoutColor>
          </div>
        ) : visibleEvents.length === 0 ? (
          <div className="h-full flex items-center justify-center">
            <MainLayoutColor
              as={MainLayoutTextSize}
              color="subtitle"
              size="subInfoText"
            >
              No route history for this vehicle
            </MainLayoutColor>
          </div>
        ) : (
          <RouteHistoryTimeline
            events={visibleEvents}
            vehicle={vehicle}
            onSaveStop={onSaveStop}
            onSelectStop={onSelectStop}
            selectedStopId={selectedStopId}
          />
        )}
      </div>
    </MainLayoutColor>
  );
}
