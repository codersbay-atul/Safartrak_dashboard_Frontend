import React, { useState } from "react";
import MainLayoutColor from "../../components/Ui/MainLayoutUI/MainLayoutColor";
import MainLayoutTextSize from "../../components/Ui/MainLayoutUI/MainLayoutTextSize";
import MainLayoutButton from "../../components/Ui/MainLayoutUI/MainLayoutButton";
import MainStatusBadge from "../../components/Ui/MainLayoutUI/MainStatusBadge";
import MainLayoutIcon from "../../components/Ui/MainLayoutUI/MainLayoutIcon";
import {
  Gauge,
  Fuel,
  Battery,
  ShieldCheck,
  Milestone,
  Waypoints,
  Clock,
  Radio,
} from "lucide-react";

function displayValue(value) {
  if (value == null) return "Not Available";
  if (typeof value === "string" && (value.trim() === "" || value.trim() === "-")) {
    return "Not Available";
  }
  return String(value);
}

function resolveStatusLabel(vehicle) {
  const raw = vehicle?.raw ?? {};
  if (raw.in_maintenance ?? raw.inMaintenance) return "Maintenance";

  const status = String(raw.status ?? "").toLowerCase().trim();
  if (status === "moving") return "Running";
  if (status === "idle") return "Idle";
  if (status === "offline") return "Offline";

  return displayValue(vehicle?.status);
}

function getVehicleMetrics(vehicle) {
  return [
    { key: "speed", label: "Speed", value: displayValue(vehicle?.speed), icon: Gauge },
    { key: "fuel", label: "Fuel Level", value: "Not Available", icon: Fuel },
    { key: "battery", label: "Battery", value: "Not Available", icon: Battery },
    { key: "engineHealth", label: "Engine Health", value: "Not Available", icon: ShieldCheck },
    { key: "odometer", label: "Odometer", value: "Not Available", icon: Milestone },
    { key: "tripProgress", label: "Trip Progress", value: "Not Available", icon: Waypoints },
    { key: "eta", label: "ETA", value: "Not Available", icon: Clock },
    { key: "vehicleType", label: "Vehicle Type", value: displayValue(vehicle?.type), icon: Milestone },
    { key: "model", label: "Model", value: displayValue(vehicle?.model), icon: ShieldCheck },
    { key: "deviceStatus", label: "Connection Status", value: displayValue(vehicle?.deviceStatus), icon: Radio },
  ];
}

export default function DashboardVehicleDetails({
  vehicle,
  onViewRoute,
  onRefresh,
  onClose,
}) {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const metrics = getVehicleMetrics(vehicle);
  const statusLabel = resolveStatusLabel(vehicle);

  const handleRefreshClick = async (e) => {
    e.stopPropagation();
    if (onRefresh) {
      setIsRefreshing(true);
      try {
        await onRefresh();
      } finally {
        setIsRefreshing(false);
      }
    }
  };

  return (
    <MainLayoutColor
      as="div"
      background="surface"
      className="w-full h-full border border-[#1f1f23] rounded-xl p-2.5 xl:p-3 flex flex-col justify-between select-none overflow-hidden min-w-0"
    >
      {/* Header with Title, Status Badge, Refresh & Close Icons */}
      <div className="flex items-center justify-between pb-1.5 shrink-0 border-b border-zinc-800/40">
        <div className="flex items-center gap-1.5 min-w-0">
          <MainLayoutColor
            as={MainLayoutTextSize}
            color="title"
            size="sectionTitle"
            className="tracking-tight truncate block font-medium"
          >
            Vehicle Details
          </MainLayoutColor>

          <MainStatusBadge status={statusLabel} />
        </div>

        {/* Action Icons: Refresh & Cross using MainLayoutIcon */}
        <div className="flex items-center gap-1.5 shrink-0">
          <button
            type="button"
            onClick={handleRefreshClick}
            className="text-zinc-500 hover:text-white transition-colors cursor-pointer p-0.5"
            title="Refresh Details"
          >
            <MainLayoutIcon
              name="refresh"
              size="refresh"
              loading={isRefreshing}
            />
          </button>

          {onClose && (
            <button
              type="button"
              onClick={onClose}
              className="text-zinc-500 hover:text-white transition-colors cursor-pointer p-0.5"
              title="Close"
            >
              <MainLayoutIcon
                name="cross"
                size="cross"
              />
            </button>
          )}
        </div>
      </div>

      {/* Vehicle Info & Distance Summary */}
      <div className="flex items-center justify-between my-2.5 shrink-0 gap-2">
        {/* Left Side: Vehicle Plate (14px) + Driver (12px) */}
        <div className="flex items-center gap-2 min-w-0">
          <div className="w-7 h-7 bg-zinc-800 border border-zinc-700/50 rounded-md shadow-inner shrink-0" />
          <div className="leading-tight min-w-0">
            <MainLayoutColor
              as={MainLayoutTextSize}
              color="title"
              size="plateText"
              className="font-medium tracking-tight truncate block"
            >
              {displayValue(vehicle?.plate)}
            </MainLayoutColor>
            <MainLayoutColor
              as={MainLayoutTextSize}
              color="subtitle"
              size="subInfoText"
              className="truncate block font-normal mt-0.5"
            >
              {displayValue(vehicle?.driver)}
            </MainLayoutColor>
          </div>
        </div>

        {/* Right Side: Not Available (14px) + Remaining Distance (12px) */}
        <div className="text-right leading-tight shrink-0">
          <MainLayoutColor
            as={MainLayoutTextSize}
            color="title"
            size="plateText"
            className="font-medium block"
          >
            Not Available
          </MainLayoutColor>
          <MainLayoutColor
            as={MainLayoutTextSize}
            color="subtitle"
            size="subInfoText"
            className="block font-normal mt-0.5"
          >
            Remaining Distance
          </MainLayoutColor>
        </div>
      </div>

      {/* Progress Track Line */}
      <div className="mb-2 mt-0.5 px-1 shrink-0">
        <div className="relative w-full h-3 flex items-center">
          <div className="absolute left-0 right-0 h-[1.5px] bg-zinc-800 rounded-full" />
          <div className="absolute left-0 w-1.5 h-1.5 rounded-full bg-[#141414] border-[1.5px] border-zinc-700 transform -translate-x-1/2 z-10" />
          <div className="absolute right-0 w-1.5 h-1.5 rounded-full bg-[#141414] border-[1.5px] border-zinc-700 transform translate-x-1/2 z-10" />
        </div>

        <MainLayoutColor
          as={MainLayoutTextSize}
          color="subtitle"
          size="subInfoText"
          className="font-normal tracking-wide mt-1 block"
        >
          Not Available
        </MainLayoutColor>
      </div>

      <div className="border-b border-zinc-800/20 w-full shrink-0 mb-1.5" />

      {/* Metrics List */}
      <div className="flex flex-col flex-1 py-1 gap-y-2 overflow-y-auto pr-0.5 mb-1.5 no-scrollbar">
        {metrics.map(({ key, label, value, icon: Icon }) => (
          <div key={key} className="flex items-center justify-between shrink-0 gap-2">
            <div className="flex items-center gap-1.5 min-w-0">
              <MainLayoutColor color="metricIcon">
                <MainLayoutIcon icon={Icon} size="metric" />
              </MainLayoutColor>
              <MainLayoutColor
                as={MainLayoutTextSize}
                color="subtitle"
                size="subInfoText"
                className="truncate font-normal"
              >
                {label}
              </MainLayoutColor>
            </div>

            <MainLayoutColor
              as={MainLayoutTextSize}
              color="metricValue"
              size="subInfoText"
              className="shrink-0 font-medium"
            >
              {value}
            </MainLayoutColor>
          </div>
        ))}
      </div>

      <div className="border-b border-zinc-800/20 w-full shrink-0" />

      {/* View Route Action Button */}
      <div className="pt-2 shrink-0">
        <MainLayoutButton
          variant="outlineYellow"
          size="xs"
          onClick={onViewRoute}
          className="w-full h-8"
        >
          View Route
        </MainLayoutButton>
      </div>
    </MainLayoutColor>
  );
}