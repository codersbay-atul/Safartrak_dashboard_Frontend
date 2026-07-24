import { Truck, Lock, RefreshCw, FileCheck } from "lucide-react";

export const FLEET_OPTIONS = [
  { label: "All Fleets", value: "all" },
  { label: "Mumbai Fleet", value: "mumbai" },
  { label: "Pune Fleet", value: "pune" },
  { label: "Nashik Fleet", value: "nashik" },
];

export const MOBILIZE_STATS = [
  {
    id: "total",
    icon: Truck,
    value: "53",
    subtitle: "56 Active",
    title: "Total Vehicle",
    accent: "yellow",
  },
  {
    id: "immobilized",
    icon: Lock,
    value: "9",
    subtitle: "Currently restricted",
    title: "Immobilized",
    accent: "red",
  },
  {
    id: "pending",
    icon: RefreshCw,
    value: "2",
    subtitle: "Awaiting device response",
    title: "Commands Pending",
    accent: "orange",
  },
  {
    id: "success",
    icon: FileCheck,
    value: "98.6%",
    subtitle: "Last 30 days",
    title: "Command Success Rate",
    accent: "green",
  },
];

export const STATUS_FILTERS = [
  { label: "All", value: "all", color: "bg-[#71717a]" },
  { label: "Mobilized", value: "mobilized", color: "bg-[#10b981]" },
  { label: "Immobilized", value: "immobilized", color: "bg-[#FDBB24]" },
  { label: "Offline", value: "offline", color: "bg-[#ef4444]" },
];

export const MOBILIZE_VEHICLES = [
  {
    id: 1,
    plate: "MH12AB3482",
    city: "Mumbai",
    driver: "Ashok Sharma",
    info: "Last Seen 18 mins ago",
    status: "immobilized",
  },
  {
    id: 2,
    plate: "MH09XY1234",
    city: "Pune",
    driver: "Rahul Singh",
    info: "Last Seen 12 mins ago",
    status: "mobilized",
  },
  {
    id: 3,
    plate: "MH14ZZ8765",
    city: "Mumbai",
    driver: "Ashok Sharma",
    info: "Last Seen 18 mins ago",
    status: "offline",
  },
  {
    id: 4,
    plate: "MH12CD9012",
    city: "Nashik",
    driver: "Suresh Patil",
    info: "Last Seen 5 mins ago",
    status: "mobilized",
  },
  {
    id: 5,
    plate: "MH15EF4455",
    city: "Mumbai",
    driver: "Ramesh Kumar",
    info: "Last Seen 22 mins ago",
    status: "immobilized",
  },
  {
    id: 6,
    plate: "MH04GH7788",
    city: "Pune",
    driver: "Vikram Joshi",
    info: "Last Seen 40 mins ago",
    status: "offline",
  },
  {
    id: 7,
    plate: "MH12IJ3344",
    city: "Mumbai",
    driver: "Amit Deshmukh",
    info: "Last Seen 8 mins ago",
    status: "mobilized",
  },
  {
    id: 8,
    plate: "MH09KL5566",
    city: "Pune",
    driver: "Pranav Mehta",
    info: "Last Seen 15 mins ago",
    status: "immobilized",
  },
];
