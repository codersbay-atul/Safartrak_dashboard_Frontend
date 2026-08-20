import React, { useMemo } from "react";
import { Truck, Gauge, Clock, Route, Timer } from "lucide-react";
import {
  displayOrDash,
  getTripField,
  shouldShowNoActiveTrip,
} from "./routeVehicleDisplay";

function formatKm(value) {
  if (value == null || value === "" || value === "-") return "Not Available";
  const n = Number(value);
  if (!Number.isFinite(n)) return displayOrDash(value);
  return `${n.toLocaleString("en-US", { maximumFractionDigits: 1 })} km`;
}

function formatPct(value) {
  if (value == null || value === "" || value === "-") return "Not Available";
  const raw = String(value).trim();
  if (raw.endsWith("%")) return raw;
  const n = Number(value);
  if (!Number.isFinite(n)) return "Not Available";
  return `${n}%`;
}

function buildTripStats(vehicle) {
  const noTrip = shouldShowNoActiveTrip(vehicle);

  const progress = noTrip
    ? null
    : getTripField(vehicle, [
        "trip_progress_pct",
        "trip_progress",
        "tripProgress",
        "progress_pct",
      ]);
  const remaining = noTrip
    ? null
    : getTripField(vehicle, [
        "remaining_distance_km",
        "remaining_km",
        "remainingDistanceKm",
        "remainingDistance",
      ]);
  const eta = noTrip
    ? null
    : getTripField(vehicle, ["eta", "eta_text", "etaText", "estimated_arrival"]);
  const etaSubtitle = noTrip
    ? null
    : getTripField(vehicle, [
        "eta_at",
        "expected_at",
        "expectedAt",
        "eta_label",
      ]);
  const distanceTravelled = noTrip
    ? null
    : getTripField(vehicle, [
        "distance_travelled_km",
        "distance_km",
        "distanceTravelledKm",
        "distance",
      ]);
  const tripDuration = noTrip
    ? null
    : getTripField(vehicle, [
        "trip_duration",
        "tripDuration",
        "duration",
        "duration_text",
      ]);
  const startedAt = noTrip
    ? null
    : getTripField(vehicle, [
        "started_at",
        "trip_started_at",
        "startedAt",
        "start_time",
      ]);
  const avgSpeed = noTrip
    ? null
    : getTripField(vehicle, [
        "avg_speed_kmh",
        "average_speed_kmh",
        "avgSpeedKmh",
      ]);

  const speedDisplay = displayOrDash(vehicle?.speed);
  const remainingLabel =
    remaining == null
      ? "Not Available"
      : `${formatKm(remaining)} Remaining`;

  return [
    {
      id: "trip-progress",
      icon: Truck,
      value: formatPct(progress),
      subtitle: remainingLabel,
      title: "Trip Progress",
      bgIcon: "bg-[#FDBB24]/10 border border-[#FDBB24]/20",
      colorIcon: "text-[#FDBB24]",
      showArrow: false,
    },
    {
      id: "current-speed",
      icon: Gauge,
      value: speedDisplay,
          subtitle:
            avgSpeed == null
              ? "Not Available"
              : `Average: ${Number(avgSpeed).toLocaleString("en-US", {
                  maximumFractionDigits: 1,
                })} km/h`,
      title: "Current Speed",
      bgIcon: "bg-[#FDBB24]/10 border border-[#FDBB24]/20",
      colorIcon: "text-[#FDBB24]",
      showArrow: true,
    },
    {
      id: "eta",
      icon: Clock,
      value: displayOrDash(eta),
      subtitle: displayOrDash(etaSubtitle),
      title: "ETA",
      bgIcon: "bg-[#FDBB24]/10 border border-[#FDBB24]/20",
      colorIcon: "text-[#FDBB24]",
      showArrow: true,
    },
    {
      id: "distance-travelled",
      icon: Route,
      value: formatKm(distanceTravelled),
      subtitle: remainingLabel,
      title: "Distance Travelled",
      bgIcon: "bg-[#FDBB24]/10 border border-[#FDBB24]/20",
      colorIcon: "text-[#FDBB24]",
      showArrow: true,
    },
    {
      id: "trip-duration",
      icon: Timer,
      value: displayOrDash(tripDuration),
      subtitle:
        startedAt == null
          ? "Not Available"
          : `Started at ${displayOrDash(startedAt)}`,
      title: "Trip Duration",
      bgIcon: "bg-[#FDBB24]/10 border border-[#FDBB24]/20",
      colorIcon: "text-[#FDBB24]",
      showArrow: true,
    },
  ];
}

export default function TripStatsCards({ vehicle = null }) {
  const cards = useMemo(() => buildTripStats(vehicle), [vehicle]);

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-1.5 min-[1152px]:gap-2 xl:gap-2.5 mt-0 pt-0 select-none w-full shrink-0 min-w-0">
      {cards.map((card) => (
        <div key={card.id} className="min-w-0">
          <MainStatsCard {...card} />
        </div>
      ))}
    </div>
  );
}
