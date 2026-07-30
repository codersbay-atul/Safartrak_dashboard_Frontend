import React from "react";
import {
  Route,
  Milestone,
  Timer,
  CirclePause,
  BellRing,
} from "lucide-react";
import { StatCard } from "../../components/Ui/StatsCards";
import { ACTIVITY_STATS } from "./activityData";

const ICON_MAP = {
  trips: Route,
  distance: Milestone,
  drive: Timer,
  idle: CirclePause,
  events: BellRing,
};

export default function ActivityStats() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-5 gap-2.5 shrink-0">
      {ACTIVITY_STATS.map((stat) => (
        <StatCard
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
