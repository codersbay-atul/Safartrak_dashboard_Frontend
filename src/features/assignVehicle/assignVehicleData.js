/**
 * Dummy trip assignments until GET /v1/assign-vehicle/trips (or equivalent)
 * is wired. Pass mapped API rows into AssignVehicleTable via the `trips` prop.
 *
 * Trip ID format: YYMMDD + SFT + 4-digit sequence
 * Example: 260731SFT0001
 *
 * Status values: Upcoming | Ongoing | Delivered | Expired
 */

export const TRIP_STATUSES = ["Upcoming", "Ongoing", "Delivered", "Expired"];

function buildTripId(yyMMdd, sequence) {
  return `${yyMMdd}SFT${String(sequence).padStart(4, "0")}`;
}

export const ASSIGN_VEHICLE_TRIPS_DUMMY = [
  {
    id: buildTripId("260731", 1),
    tripId: buildTripId("260731", 1),
    vehicleNumber: "TRK-4029",
    driverName: "John Doe",
    status: "Upcoming",
    pickupDate: "Jul 31, 2026",
    pickupTime: "08:00 AM",
    deliveryDate: "Jul 31, 2026",
    deliveryTime: "04:30 PM",
    tempAbuse: "None",
  },
  {
    id: buildTripId("260731", 2),
    tripId: buildTripId("260731", 2),
    vehicleNumber: "TRK-1182",
    driverName: "Sarah Miller",
    status: "Ongoing",
    pickupDate: "Jul 31, 2026",
    pickupTime: "07:45 AM",
    deliveryDate: "Jul 31, 2026",
    deliveryTime: "03:15 PM",
    tempAbuse: "None",
  },
  {
    id: buildTripId("260731", 3),
    tripId: buildTripId("260731", 3),
    vehicleNumber: "VAN-3301",
    driverName: "Robert Jones",
    status: "Delivered",
    pickupDate: "Jul 31, 2026",
    pickupTime: "09:15 AM",
    deliveryDate: "Jul 31, 2026",
    deliveryTime: "06:00 PM",
    tempAbuse: "High (2°C)",
  },
  {
    id: buildTripId("260801", 1),
    tripId: buildTripId("260801", 1),
    vehicleNumber: "TRK-4029",
    driverName: "Alice Kim",
    status: "Expired",
    pickupDate: "Aug 01, 2026",
    pickupTime: "06:30 AM",
    deliveryDate: "Aug 01, 2026",
    deliveryTime: "01:45 PM",
    tempAbuse: "None",
  },
  {
    id: buildTripId("260801", 2),
    tripId: buildTripId("260801", 2),
    vehicleNumber: "TRK-5502",
    driverName: "Mike Brown",
    status: "Upcoming",
    pickupDate: "Aug 01, 2026",
    pickupTime: "10:00 AM",
    deliveryDate: "Aug 01, 2026",
    deliveryTime: "07:20 PM",
    tempAbuse: "None",
  },
  {
    id: buildTripId("260815", 1),
    tripId: buildTripId("260815", 1),
    vehicleNumber: "TRK-2208",
    driverName: "Priya Sharma",
    status: "Ongoing",
    pickupDate: "Aug 15, 2026",
    pickupTime: "05:50 AM",
    deliveryDate: "Aug 15, 2026",
    deliveryTime: "02:10 PM",
    tempAbuse: "None",
  },
  {
    id: buildTripId("260815", 2),
    tripId: buildTripId("260815", 2),
    vehicleNumber: "VAN-1180",
    driverName: "David Chen",
    status: "Delivered",
    pickupDate: "Aug 15, 2026",
    pickupTime: "11:20 AM",
    deliveryDate: "Aug 15, 2026",
    deliveryTime: "08:00 PM",
    tempAbuse: "High (1°C)",
  },
  {
    id: buildTripId("260820", 1),
    tripId: buildTripId("260820", 1),
    vehicleNumber: "TRK-7741",
    driverName: "Anita Rao",
    status: "Expired",
    pickupDate: "Aug 20, 2026",
    pickupTime: "04:15 AM",
    deliveryDate: "Aug 20, 2026",
    deliveryTime: "12:30 PM",
    tempAbuse: "None",
  },
  {
    id: buildTripId("260825", 1),
    tripId: buildTripId("260825", 1),
    vehicleNumber: "TRK-3304",
    driverName: "James Wilson",
    status: "Upcoming",
    pickupDate: "Aug 25, 2026",
    pickupTime: "01:00 PM",
    deliveryDate: "Aug 25, 2026",
    deliveryTime: "08:45 PM",
    tempAbuse: "None",
  },
  {
    id: buildTripId("260825", 2),
    tripId: buildTripId("260825", 2),
    vehicleNumber: "VAN-9021",
    driverName: "Neha Patel",
    status: "Ongoing",
    pickupDate: "Aug 25, 2026",
    pickupTime: "07:10 AM",
    deliveryDate: "Aug 25, 2026",
    deliveryTime: "03:40 PM",
    tempAbuse: "None",
  },
  {
    id: buildTripId("260828", 1),
    tripId: buildTripId("260828", 1),
    vehicleNumber: "TRK-1182",
    driverName: "Omar Hassan",
    status: "Delivered",
    pickupDate: "Aug 28, 2026",
    pickupTime: "09:40 AM",
    deliveryDate: "Aug 28, 2026",
    deliveryTime: "05:20 PM",
    tempAbuse: "High (3°C)",
  },
  {
    id: buildTripId("260828", 2),
    tripId: buildTripId("260828", 2),
    vehicleNumber: "TRK-5502",
    driverName: "Lisa Park",
    status: "Expired",
    pickupDate: "Aug 28, 2026",
    pickupTime: "06:05 AM",
    deliveryDate: "Aug 28, 2026",
    deliveryTime: "02:55 PM",
    tempAbuse: "None",
  },
  {
    id: buildTripId("260831", 1),
    tripId: buildTripId("260831", 1),
    vehicleNumber: "VAN-3301",
    driverName: "Rahul Mehta",
    status: "Upcoming",
    pickupDate: "Aug 31, 2026",
    pickupTime: "02:30 PM",
    deliveryDate: "Aug 31, 2026",
    deliveryTime: "09:15 PM",
    tempAbuse: "None",
  },
  {
    id: buildTripId("260831", 2),
    tripId: buildTripId("260831", 2),
    vehicleNumber: "TRK-4029",
    driverName: "Emily Davis",
    status: "Ongoing",
    pickupDate: "Aug 31, 2026",
    pickupTime: "08:20 AM",
    deliveryDate: "Aug 31, 2026",
    deliveryTime: "04:50 PM",
    tempAbuse: "High (2°C)",
  },
  {
    id: buildTripId("260831", 3),
    tripId: buildTripId("260831", 3),
    vehicleNumber: "TRK-2208",
    driverName: "Carlos Rivera",
    status: "Delivered",
    pickupDate: "Aug 31, 2026",
    pickupTime: "05:00 AM",
    deliveryDate: "Aug 31, 2026",
    deliveryTime: "01:00 PM",
    tempAbuse: "None",
  },
  {
    id: buildTripId("260831", 4),
    tripId: buildTripId("260831", 4),
    vehicleNumber: "TRK-7741",
    driverName: "Meera Iyer",
    status: "Expired",
    pickupDate: "Aug 31, 2026",
    pickupTime: "03:45 PM",
    deliveryDate: "Aug 31, 2026",
    deliveryTime: "10:30 PM",
    tempAbuse: "None",
  },
];

function readField(source, ...keys) {
  if (source == null || typeof source !== "object") return undefined;
  for (const key of keys) {
    if (Object.prototype.hasOwnProperty.call(source, key) && source[key] != null) {
      return source[key];
    }
  }
  return undefined;
}

function toDisplay(value, fallback = "-") {
  if (value == null) return fallback;
  const trimmed = String(value).trim();
  return trimmed === "" ? fallback : trimmed;
}

function normalizeStatus(value) {
  const raw = toDisplay(value, "Upcoming");
  const key = raw.toLowerCase();
  if (key === "upcomming") return "Upcoming";
  if (key === "experied") return "Expired";
  const match = TRIP_STATUSES.find((status) => status.toLowerCase() === key);
  return match || "Upcoming";
}

export function getDriverInitials(name) {
  const parts = String(name || "")
    .trim()
    .split(/\s+/)
    .filter(Boolean);
  if (parts.length === 0) return "--";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return `${parts[0].charAt(0)}${parts[parts.length - 1].charAt(0)}`.toUpperCase();
}

export function mapAssignVehicleTrip(item, index = 0) {
  if (item == null || typeof item !== "object") return null;

  const driverName = toDisplay(
    readField(item, "driverName", "driver_name", "driver"),
    "Unassigned",
  );

  return {
    id: toDisplay(readField(item, "id", "tripId", "trip_id"), `trip-${index}`),
    tripId: toDisplay(readField(item, "tripId", "trip_id"), "-"),
    vehicleNumber: toDisplay(
      readField(item, "vehicleNumber", "vehicle_number", "vehicle"),
      "-",
    ),
    driverName,
    status: normalizeStatus(readField(item, "status")),
    pickupDate: toDisplay(readField(item, "pickupDate", "pickup_date"), "-"),
    pickupTime: toDisplay(readField(item, "pickupTime", "pickup_time"), "-"),
    deliveryDate: toDisplay(readField(item, "deliveryDate", "delivery_date"), "-"),
    deliveryTime: toDisplay(readField(item, "deliveryTime", "delivery_time"), "-"),
    tempAbuse: toDisplay(readField(item, "tempAbuse", "temp_abuse"), "None"),
  };
}

export const ASSIGN_VEHICLE_OPTIONS = [
  ...new Map(
    ASSIGN_VEHICLE_TRIPS_DUMMY.map((trip) => [
      trip.vehicleNumber,
      { label: trip.vehicleNumber, value: trip.vehicleNumber },
    ]),
  ).values(),
];

export const ASSIGN_DRIVER_OPTIONS = [
  ...new Map(
    ASSIGN_VEHICLE_TRIPS_DUMMY.map((trip) => [
      trip.driverName,
      { label: trip.driverName, value: trip.driverName },
    ]),
  ).values(),
];

export const CHECKPOINT_SUGGESTIONS = [
  {
    name: "Okhla Warehouse",
    search: "Okhla Industrial Area, Delhi",
    lat: "28.5273",
    lng: "77.2764",
  },
  {
    name: "Gurgaon Hub",
    search: "Cyber City, Gurugram",
    lat: "28.4942",
    lng: "77.0883",
  },
  {
    name: "Jaipur Depot",
    search: "Sitapura, Jaipur",
    lat: "26.7855",
    lng: "75.8508",
  },
  {
    name: "Mumbai Port",
    search: "Nhava Sheva, Navi Mumbai",
    lat: "18.9490",
    lng: "72.9490",
  },
  {
    name: "Pune Warehouse",
    search: "Chakan MIDC, Pune",
    lat: "18.7603",
    lng: "73.8636",
  },
  {
    name: "Ahmedabad Yard",
    search: "Naroda, Ahmedabad",
    lat: "23.0704",
    lng: "72.6570",
  },
  {
    name: "Hyderabad Hub",
    search: "Patancheru, Hyderabad",
    lat: "17.5314",
    lng: "78.2650",
  },
  {
    name: "Bengaluru Depot",
    search: "Electronic City, Bengaluru",
    lat: "12.8452",
    lng: "77.6602",
  },
  {
    name: "Chennai Port",
    search: "Ennore, Chennai",
    lat: "13.2325",
    lng: "80.3310",
  },
  {
    name: "Kolkata Warehouse",
    search: "Howrah, Kolkata",
    lat: "22.5958",
    lng: "88.2636",
  },
];

export function mapAssignVehicleTrips(payload) {
  const list = Array.isArray(payload)
    ? payload
    : Array.isArray(payload?.results)
      ? payload.results
      : Array.isArray(payload?.trips)
        ? payload.trips
        : [];

  return list.map(mapAssignVehicleTrip).filter(Boolean);
}
