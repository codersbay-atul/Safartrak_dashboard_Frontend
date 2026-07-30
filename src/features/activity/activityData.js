export const VEHICLE_OPTIONS = [
  { label: "Select Vehicle", value: "all" },
  { label: "MH14ZZ8765", value: "MH14ZZ8765" },
  { label: "MH12AB3421", value: "MH12AB3421" },
  { label: "DL01CD9087", value: "DL01CD9087" },
];

export const EVENT_OPTIONS = [
  { label: "Select Event", value: "all" },
  { label: "Trip Started", value: "trip_started" },
  { label: "Waypoint", value: "waypoint" },
  { label: "Vehicle Idle", value: "idle" },
  { label: "Entered AOI", value: "aoi" },
  { label: "Overspeed", value: "overspeed" },
];

export const DRIVER_OPTIONS = [
  { label: "Select Driver", value: "all" },
  { label: "Rahul Sharma", value: "rahul" },
  { label: "Amit Verma", value: "amit" },
  { label: "Suresh Patil", value: "suresh" },
];

export const ACTIVITY_STATS = [
  {
    id: "trips",
    value: "6 Trips",
    subtitle: "Completed Today",
    bottomLabel: "Total Trips",
  },
  {
    id: "distance",
    value: "324 km",
    subtitle: "Today's Distance",
    bottomLabel: "Distance Covered",
  },
  {
    id: "drive",
    value: "7h 42m",
    subtitle: "Engine Running",
    bottomLabel: "Drive Time",
  },
  {
    id: "idle",
    value: "42 hrs",
    subtitle: "Vehicle Stopped",
    bottomLabel: "Idle Time",
  },
  {
    id: "events",
    value: "32 Events",
    subtitle: "Today's Activity",
    bottomLabel: "Events Recorded",
  },
];

export const ROUTE_COORDINATES = [
  [28.5921, 77.1682],
  [28.5955, 77.1748],
  [28.5983, 77.1825],
  [28.6015, 77.195],
  [28.6062, 77.2012],
  [28.6105, 77.2058],
  [28.6139, 77.209],
];

export const ACTIVITY_EVENTS = [
  {
    id: "evt-1",
    type: "trip_started",
    title: "Trip Started",
    time: "08:42 AM",
    severity: "normal",
    location: "Mumbai Warehouse",
    driver: "Rahul Sharma",
    vehicle: "MH14ZZ8765",
    meta: null,
  },
  {
    id: "evt-2",
    type: "waypoint",
    title: "Waypoint Crossed",
    time: "09:12 AM",
    severity: "normal",
    location: "Andheri East Junction",
    driver: "Rahul Sharma",
    vehicle: "MH14ZZ8765",
    meta: { distance: "18.4 km" },
  },
  {
    id: "evt-3",
    type: "idle",
    title: "Vehicle Idle",
    time: "09:44 AM",
    severity: "normal",
    location: "Bandra Kurla Complex",
    driver: "Rahul Sharma",
    vehicle: "MH14ZZ8765",
    meta: { duration: "12 min", fuel: "0.6L" },
  },
  {
    id: "evt-4",
    type: "waypoint",
    title: "Waypoint Crossed",
    time: "10:08 AM",
    severity: "normal",
    location: "Powai Lake Road",
    driver: "Rahul Sharma",
    vehicle: "MH14ZZ8765",
    meta: { distance: "31.2 km" },
  },
  {
    id: "evt-5",
    type: "aoi",
    title: "Entered AOI",
    time: "10:42 AM",
    severity: "alert",
    location: "Restricted Zone — Midc",
    driver: "Rahul Sharma",
    vehicle: "MH14ZZ8765",
    meta: {
      alert: "Overspeed",
      speed: "84 km/h",
      allowed: "60 km/h",
    },
  },
  {
    id: "evt-6",
    type: "waypoint",
    title: "Waypoint Crossed",
    time: "11:15 AM",
    severity: "normal",
    location: "Eastern Express Hwy",
    driver: "Rahul Sharma",
    vehicle: "MH14ZZ8765",
    meta: { distance: "48.6 km" },
  },
  {
    id: "evt-7",
    type: "idle",
    title: "Vehicle Idle",
    time: "11:48 AM",
    severity: "normal",
    location: "Thane Depot",
    driver: "Rahul Sharma",
    vehicle: "MH14ZZ8765",
    meta: { duration: "8 min", fuel: "0.3L" },
  },
];

export const ACTIVITY_DETAILS = {
  status: "In Progress",
  alert: {
    time: "10:42 AM",
    label: "Overspeed Alert",
  },
  speed: "52 km/h",
  fuelLevel: 82,
  battery: "12.8V",
  engineHealth: "Excellent",
  odometer: "186,240 km",
  tripProgress: 72,
  eta: "1 hr 24 min",
  address: "Andheri East, Mumbai",
  gpsSignal: "Strong",
  ignition: "ON",
  lastUpdated: "12 Second ago",
  attachments: [
    { id: "att-1", label: "Dashcam Snap" },
    { id: "att-2", label: "Camera Clip" },
    { id: "att-3", label: "Driver Notes" },
  ],
};
