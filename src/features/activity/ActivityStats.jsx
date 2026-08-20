import React, { useMemo } from "react";
import {
  Route,
  Milestone,
  Timer,
  CirclePause,
  BellRing,
} from "lucide-react";
import { MainStatsCard } from "../../components/Ui/MainLayoutUI/MainStatsCard";
import { ACTIVITY_STATS } from "./activityData";
import { useActivitySummary } from "../../hooks/useActivitySummary";

const ICON_MAP = {
  trips: Route,
  distance: Milestone,
  drive: Timer,
  idle: CirclePause,
  events: BellRing,
};

function formatDistance(km) {
  if (km == null || Number.isNaN(Number(km))) return "0 km";
  return `${Math.round(km)} km`;
}

function formatTime(minutes) {
  if (minutes == null || Number.isNaN(Number(minutes))) return "0m";
  const mins = Math.round(minutes);
  const hours = Math.floor(mins / 60);
  const remainder = mins % 60;
  return hours > 0 ? `${hours}h ${remainder}m` : `${remainder}m`;
}

function formatCount(count, label) {
  if (count == null || Number.isNaN(Number(count))) return `0 ${label}`;
  return `${Math.round(count)} ${label}`;
}

export default function ActivityStats() {
  const { summary } = useActivitySummary("today");

  const stats = useMemo(() => {
    return ACTIVITY_STATS.map((stat) => {
      let value = stat.value || "—";

      if (summary) {
        switch (stat.id) {
          case "trips":
            value = formatCount(summary.total_trips, "Trips");
            break;
          case "distance":
            value = formatDistance(summary.distance_km);
            break;
          case "drive":
            value = formatTime(summary.drive_time_min);
            break;
          case "idle":
            value = formatTime(summary.idle_time_min);
            break;
          case "events":
            value = formatCount(summary.events_recorded, "Events");
            break;
          default:
            value = stat.value;
        }
      }

      return {
        ...stat,
        value,
      };
    });
  }, [summary]);

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-5 gap-2.5 shrink-0">
      {stats.map((stat) => (
        <MainStatsCard
          key={stat.id}
          value={stat.value}
          subtitle={stat.subtitle}
          bottomLabel={stat.bottomLabel}
          icon={ICON_MAP[stat.id]}
          showArrow
        />
      ))}
    </div>
  );
}
