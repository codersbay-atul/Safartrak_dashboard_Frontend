import React from "react";
import { Truck, Gauge, Clock, Route, Timer } from "lucide-react";
import { useAnalyticsSummary } from "../../hooks/useAnalyticsSummary";
import {
  ANALYTICS_SUMMARY_PLACEHOLDER,
  formatChangeSubtitle,
  mapAnalyticsSummary,
} from "./mapAnalyticsSummary";
import { MainStatsCard } from "../../components/Ui/MainLayoutUI/MainStatsCard";

const VALUE_SKELETON = (
  <span
    className="inline-block h-3.5 w-8 rounded bg-zinc-700/80 animate-pulse align-middle"
    aria-hidden="true"
  />
);

function buildCards(summary, { isLoading = false } = {}) {
  const values = summary ?? ANALYTICS_SUMMARY_PLACEHOLDER;
  const valueOrSkeleton = (value) => (isLoading ? VALUE_SKELETON : value);
  const subtitleOrDash = (change) =>
    formatChangeSubtitle(change) ?? "-";

  return [
    {
      id: "fleet-distance",
      icon: Truck,
      value: valueOrSkeleton(values.fleetDistance),
      subtitle: isLoading ? "-" : subtitleOrDash(values.fleetDistanceChange),
      title: "Fleet Distance",
      showArrow: false,
    },
    {
      id: "running-time",
      icon: Gauge,
      value: valueOrSkeleton(values.runningTime),
      subtitle: isLoading ? "-" : subtitleOrDash(values.runningTimeChange),
      title: "Running Time",
      // showArrow: true,
    },
    {
      id: "idle-time",
      icon: Clock,
      value: valueOrSkeleton(values.idleTime),
      subtitle: isLoading ? "-" : subtitleOrDash(values.idleTimeChange),
      title: "Idle Time",
      // showArrow: true,
    },
    {
      id: "halt-time",
      icon: Route,
      value: valueOrSkeleton(values.haltTime),
      subtitle: isLoading ? "-" : subtitleOrDash(values.haltTimeChange),
      title: "Halt Time",
      // showArrow: true,
    },
    {
      id: "fleet-score",
      icon: Timer,
      value: valueOrSkeleton(values.fleetScore),
      subtitle: isLoading ? "-" : subtitleOrDash(values.fleetScoreChange),
      title: "Fleet Score",
      // showArrow: true,
    },
  ];
}

export default function AnalyticsStatsCard({ range = "24h" }) {
  const { summary, isLoading, isError, data } = useAnalyticsSummary(range);

  const showLoadingSkeleton = isLoading && !data;

  const resolvedSummary = isError
    ? ANALYTICS_SUMMARY_PLACEHOLDER
    : summary ??
      (data ? mapAnalyticsSummary(data) : null) ??
      ANALYTICS_SUMMARY_PLACEHOLDER;

  const cards = buildCards(resolvedSummary, {
    isLoading: showLoadingSkeleton,
  });

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2.5 mt-0 pt-0 select-none w-full">
      {cards.map((card, index) => (
        <div key={card.id ?? index} className="min-h-[112px] min-w-0 [&>*]:h-full">
          <MainStatsCard
            value={card.value}
            subtitle={card.subtitle}
            title={card.title}
            icon={card.icon}
            showArrow={card.showArrow}
          />
        </div>
      ))}
    </div>
  );
}