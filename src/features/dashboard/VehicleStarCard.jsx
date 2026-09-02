import React from "react";
import {
  Truck,
  Battery,
  BatteryLow,
  BatteryFull,
  BatteryMedium,
  Signal,
  SignalLow,
  SignalMedium,
  SignalHigh,
  SignalZero,
  KeyRound,
  Bookmark,
  FileText,
  Copy,
} from "lucide-react";
import MainLayoutColor from "../../components/Ui/MainLayoutUI/MainLayoutColor";
import MainLayoutTextSize, {
  formatDisplayValue,
} from "../../components/Ui/MainLayoutUI/MainLayoutTextSize";
import { toast } from "../../components/Ui/toast";

const YELLOW = "text-[#FDB914]";

function BatteryIcon({ pct }) {
  if (pct == null) return <Battery size={14} className="text-white" />;
  if (pct <= 20) return <BatteryLow size={14} className="text-white" />;
  if (pct <= 50) return <BatteryMedium size={14} className="text-white" />;
  return <BatteryFull size={14} className="text-white" />;
}

function SignalIcon({ bars }) {
  if (!bars) return <SignalZero size={14} className="text-white" />;
  if (bars === 1) return <SignalLow size={14} className="text-white" />;
  if (bars === 2) return <SignalMedium size={14} className="text-white" />;
  if (bars === 3) return <SignalHigh size={14} className="text-white" />;
  return <Signal size={14} className="text-white" />;
}

export default function VehicleStarCard({
  vehicle,
  index = 0,
  isSelected = false,
  onSelect,
  onOpenVehicle,
  onSavePlace,
}) {
  const plate = formatDisplayValue(vehicle?.vehicleNumber || vehicle?.name);
  const speedDisplay = formatDisplayValue(vehicle?.speed, "0");
  const speedMatch = String(speedDisplay).match(/-?\d+(\.\d+)?/);
  const speedNumber = speedMatch ? speedMatch[0] : "0";
  const lastUpdated = formatDisplayValue(
    vehicle?.lastSeenAgo,
    "Not Available",
  );
  const address = formatDisplayValue(
    vehicle?.address,
    "57 M From Sri Ranganatha Swamy Tours & Travel, Bangalore Bellary Road, Hunasamaranahalli, Yelahanka, Bengaluru, Bengaluru Urban District, Karnataka, 562157, India",
  );
  const todayDistance = vehicle?.todayDistance || "116 km today";
  const todayLabel = String(todayDistance).toLowerCase().includes("today")
    ? todayDistance
    : `${todayDistance} today`;
  const stoppedSince = vehicle?.stoppedSince || "1 hrs : 6 min";
  const drivingFor = vehicle?.drivingFor || "8 min : 54 sec";
  const isRunning =
    String(vehicle?.liveStatus ?? vehicle?.statusLabel ?? "")
      .toLowerCase() === "running" ||
    String(vehicle?.liveStatus ?? vehicle?.statusLabel ?? "")
      .toLowerCase() === "moving";
  const ignition = isRunning ? "ON" : "OFF";
  const alertCount = vehicle?.alertCount ?? 3;
  const activityLine = isRunning
    ? `Driving for ${drivingFor}`
    : `Stopped since ${stoppedSince}`;

  const handleSelect = () => onSelect?.(vehicle);

  const handleCopy = async (event) => {
    event.stopPropagation();
    try {
      await navigator.clipboard.writeText(address);
      toast.success("Address copied");
    } catch {
      toast.error("Unable to copy address");
    }
  };

  return (
    <MainLayoutColor
      as="div"
      role="button"
      tabIndex={0}
      onClick={handleSelect}
      onKeyDown={(event) => {
        if (event.currentTarget !== event.target) return;
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          handleSelect();
        }
      }}
      background={isSelected ? "selectedRowBg" : "surface"}
      border="cardBorder"
      className={`relative group w-full text-left rounded-xl p-3 min-h-[210px] transition-all duration-150 cursor-pointer shrink-0 overflow-hidden ${isSelected ? "" : "hover:bg-[#1a1a1d]"
        }`}
    >
      {/* {isSelected ? (
        <span
          aria-hidden="true"
          className="absolute left-0 top-0 bottom-0 w-0.5 bg-[#ffd60a]"
        />
      ) : null} */}
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-2 min-w-0">
          <div className="min-w-8 h-8 px-1 rounded-md bg-[#FDB914] text-black flex items-center justify-center shrink-0 text-[11px] font-bold leading-none tabular-nums whitespace-nowrap overflow-hidden">
            {speedNumber}
          </div>
          <MainLayoutColor
            as={MainLayoutTextSize}
            color="title"
            size="plateText"
            className="font-semibold tracking-tight truncate"
          >
            {plate}
          </MainLayoutColor>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <BatteryIcon pct={vehicle?.batteryPct || 100} />
          <SignalIcon bars={vehicle?.signalBars || 3} />


          <KeyRound size={13} className="text-white" />
          <MainLayoutColor
            as={MainLayoutTextSize}
            color="title"
            size="captionText"
            className="font-bold"
          >
            {ignition}
          </MainLayoutColor>
        </div>
      </div>

      <div className="mt-2.5 flex items-baseline justify-start gap-2">
        <MainLayoutColor
          as={MainLayoutTextSize}
          color="subtitle"
          size="sectionTitle"
          className="font-semibold"
        >
          kmph
        </MainLayoutColor>
        <span className="text-white/50">·</span>
        <MainLayoutColor
          as={MainLayoutTextSize}
          color="subtitle"
          size="subInfoText"
        >
          {lastUpdated}
        </MainLayoutColor>
      </div>
      <hr className="my-2.5 border-[#2a2a2f]" />

      <div className="flex items-start justify-between gap-3">
        <MainLayoutColor
          as={MainLayoutTextSize}
          color="title"
          size="subInfoText"
          className="flex-1 min-w-0 block leading-[1.45] font-normal break-words"
        >
          {address}
        </MainLayoutColor>

        <div className="flex items-center gap-2.5 shrink-0 pt-0.5 group-hover:opacity-100 opacity-0 transition-opacity duration-150">
          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              onSavePlace?.(vehicle);
            }}
            className="cursor-pointer"
            aria-label="Save place"
          >
            <Bookmark size={15} className="text-zinc-400" />
          </button>
          <button
            type="button"
            onClick={handleCopy}
            className="cursor-pointer"
            aria-label="Copy address"
          >
            <Copy size={15} className="text-zinc-400" />
          </button>
        </div>
      </div>

      <div className="mt-3 flex items-end justify-between gap-3">
        <MainLayoutColor
          as={MainLayoutTextSize}
          color="subtitle"
          size="subInfoText"
          className="font-normal leading-snug"
        >
          {todayLabel} | {activityLine}
        </MainLayoutColor>

        {/* <span className="relative inline-flex items-center justify-center w-8 h-8 rounded-full bg-[#ef4444]/20 shrink-0">
          <FileText size={14} className="text-[#ef4444]" />
          {alertCount > 0 && (
            <span className="absolute -top-1 -right-1 min-w-[14px] h-[14px] px-0.5 rounded-full bg-[#ef4444] text-[8px] font-bold text-white flex items-center justify-center">
              {alertCount}
            </span>
          )}
        </span> */}
      </div>
    </MainLayoutColor>
  );
}
