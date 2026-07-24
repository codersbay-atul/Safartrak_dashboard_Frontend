import {
  Route,
  CirclePause,
  Timer,
  Gauge,
  Fuel,
  MapPinned,
  Ruler,
  BellRing,
  Sparkles,
} from "lucide-react";

export const REPORTS = [
  {
    id: "trip",
    title: "Trip Report",
    description: "Review completed and ongoing trip activity.",
    icon: Route,
  },
  {
    id: "halt",
    title: "Halt Report",
    description: "Analyze vehicle halt duration and locations.",
    icon: CirclePause,
  },
  {
    id: "idle",
    title: "Idle Report",
    description: "Track vehicle idle time and identify excessive idling.",
    icon: Timer,
  },
  {
    id: "overspeed",
    title: "Overspeed Report",
    description: "Review speed violations and overspeed events.",
    icon: Gauge,
  },
  {
    id: "fuel",
    title: "Fuel Report",
    description: "Analyze vehicle fuel usage and related events.",
    icon: Fuel,
  },
  {
    id: "geofence",
    title: "Geofence Report",
    description: "Review geofence entry and exit activity.",
    icon: MapPinned,
  },
  {
    id: "distance",
    title: "Distance Report",
    description: "Compare distance travelled across vehicles.",
    icon: Ruler,
  },
  {
    id: "alert",
    title: "Alert Report",
    description: "Review vehicle alerts and event history.",
    icon: BellRing,
  },
  {
    id: "prediction",
    title: "Prediction Report",
    description: "Review available predictive fleet insights.",
    icon: Sparkles,
  },
];
