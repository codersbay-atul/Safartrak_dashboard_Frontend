import React from "react";
import {
  ShieldCheck,
  Zap,
  Gauge,
  Clock,
  HelpCircle,
  Lock,
} from "lucide-react";
import MainLayoutColor from "../../components/Ui/MainLayoutUI/MainLayoutColor";
import MainLayoutTextSize from "../../components/Ui/MainLayoutUI/MainLayoutTextSize";

export default function VehicleControlConfirmation({
  vehicle,
  onCancel,
  onConfirm,
}) {
  const plate =
    vehicle?.plate || vehicle?.reg_no || vehicle?.vehicle_number || "—";
  const driver = vehicle?.driver || vehicle?.driver_name || "—";
  const type = vehicle?.type || vehicle?.vehicle_type || "—";
  const online =
    vehicle?.online ??
    vehicle?.is_online ??
    (vehicle?.connection_status
      ? vehicle.connection_status !== "offline"
      : undefined);
  const currentStatus =
    vehicle?.status ||
    vehicle?.current_status ||
    vehicle?.state ||
    vehicle?.command_state ||
    "—";
  const ignition =
    vehicle?.ignition ??
    vehicle?.ignition_status ??
    (vehicle?.is_ignition_on !== undefined
      ? vehicle.is_ignition_on
      : undefined);
  const ignitionLabel =
    ignition === true ? "ON" : ignition === false ? "OFF" : "—";
  const speed =
    vehicle?.speed || vehicle?.speed_kmh || vehicle?.velocity || "—";
  const lastUpdated =
    vehicle?.last_updated_sec != null
      ? `${vehicle.last_updated_sec} sec ago`
      : vehicle?.last_updated || "—";

  return (
    <MainLayoutColor
      as="div"
      background="surface"
      className="w-full max-w-[460px] border border-[#27272a] text-white rounded-2xl p-5 md:p-6 shadow-2xl font-sans flex flex-col gap-4 select-none animate-in fade-in zoom-in-95 duration-150"
    >
      {/* Header */}
      <div className="flex items-center justify-between gap-2">
        <MainLayoutColor
          as={MainLayoutTextSize}
          color="title"
          size="sectionTitle"
          className="font-bold text-white tracking-wide block text-[14px]"
        >
          Vehicle Control
        </MainLayoutColor>
        <div
          className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full ${
            online
              ? "bg-[#0d2818] border border-[#164e27]"
              : "bg-[#2a1a1a] border border-[#3a3636]"
          }`}
        >
          <span
            className={`w-1.5 h-1.5 rounded-full ${
              online ? "bg-[#10b981] animate-pulse" : "bg-[#ef4444]"
            }`}
          />
          <span
            className={`text-[11px] font-medium ${
              online ? "text-[#10b981]" : "text-[#ef4444]"
            }`}
          >
            {online === undefined ? "Unknown" : online ? "Online" : "Offline"}
          </span>
        </div>
      </div>

      {/* Vehicle Info Card */}
      <MainLayoutColor
        as="div"
        background="surface"
        className="flex items-center gap-3 p-3 rounded-xl border border-[#27272a] bg-[#18181b]/80"
      >
        <div className="w-10 h-10 bg-white/10 rounded-xl shrink-0 flex items-center justify-center text-xs font-bold text-white border border-[#3f3f46]">
          {String(plate).slice(0, 2)}
        </div>
        <div className="flex flex-col min-w-0 leading-tight">
          <MainLayoutColor
            as={MainLayoutTextSize}
            color="title"
            size="sectionTitle"
            className="text-sm font-bold text-white tracking-wide truncate block"
          >
            {plate}
          </MainLayoutColor>
          <div className="flex items-center gap-1.5 text-xs text-[#8e8e93] mt-1 truncate">
            <MainLayoutColor
              as={MainLayoutTextSize}
              color="subtitle"
              size="subInfoText"
              className="truncate"
            >
              {driver}
            </MainLayoutColor>
            <span>•</span>
            <MainLayoutColor
              as={MainLayoutTextSize}
              color="subtitle"
              size="subInfoText"
              className="truncate"
            >
              {type}
            </MainLayoutColor>
          </div>
        </div>
      </MainLayoutColor>

      {/* Current Status */}
      <div className="flex flex-col gap-1">
        <MainLayoutColor
          as={MainLayoutTextSize}
          color="subtitle"
          size="subInfoText"
          className="text-xs text-[#71717a] font-medium block"
        >
          Current Status
        </MainLayoutColor>
        <div
          className={`flex items-center gap-2 ${
            online ? "text-[#10b981]" : "text-[#ef4444]"
          }`}
        >
          <ShieldCheck className="w-5 h-5" />
          <span className="text-base font-bold">
            {String(currentStatus).toUpperCase()}
          </span>
        </div>
      </div>

      <hr className="border-[#27272a]" />

      {/* Telemetry Stats */}
      <div className="flex flex-col gap-2.5 text-xs">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-[#8e8e93]">
            <Zap className="w-4 h-4 text-[#8e8e93]" />
            <MainLayoutColor
              as={MainLayoutTextSize}
              color="subtitle"
              size="subInfoText"
            >
              Ignition
            </MainLayoutColor>
          </div>
          <span
            className={`font-bold ${
              ignition === true
                ? "text-[#10b981]"
                : ignition === false
                ? "text-[#ef4444]"
                : "text-white"
            }`}
          >
            {ignitionLabel}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-[#8e8e93]">
            <Gauge className="w-4 h-4 text-[#8e8e93]" />
            <MainLayoutColor
              as={MainLayoutTextSize}
              color="subtitle"
              size="subInfoText"
            >
              Speed
            </MainLayoutColor>
          </div>
          <span className="font-semibold text-white">{speed}</span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-[#8e8e93]">
            <Clock className="w-4 h-4 text-[#8e8e93]" />
            <MainLayoutColor
              as={MainLayoutTextSize}
              color="subtitle"
              size="subInfoText"
            >
              Last Updated
            </MainLayoutColor>
          </div>
          <span className="font-semibold text-white">{lastUpdated}</span>
        </div>
      </div>

      {/* Warning Box */}
      <MainLayoutColor
        as="div"
        background="surface"
        className="flex items-start gap-3 bg-[#18181b]/80 border border-[#27272a] rounded-xl p-3"
      >
        <HelpCircle className="w-4 h-4 text-[#a1a1aa] shrink-0 mt-0.5" />
        <MainLayoutColor
          as={MainLayoutTextSize}
          color="subtitle"
          size="subInfoText"
          className="text-xs text-[#d4d4d8] leading-relaxed"
        >
          The vehicle may not be able to restart until a mobilization command is successfully executed.
        </MainLayoutColor>
      </MainLayoutColor>

      {/* Original Action Buttons */}
      <div className="grid grid-cols-2 gap-3 mt-1">
        <button
          type="button"
          onClick={onCancel}
          className="w-full bg-[#27272a] hover:bg-[#3f3f46] Inactive:scale-[0.98] text-white font-medium text-xs py-2.5 rounded-xl transition-all duration-150 cursor-pointer"
        >
          Cancel
        </button>
        <button
          type="button"
          onClick={onConfirm}
          className="w-full flex items-center justify-center gap-2 bg-[#dc2626] hover:bg-[#b91c1c] Inactive:scale-[0.98] text-white font-medium text-xs py-2.5 rounded-xl transition-all duration-150 cursor-pointer shadow-md shadow-rose-950/40"
        >
          <Lock className="w-4 h-4 stroke-2" />
          <span>Confirm Immobilization</span>
        </button>
      </div>
    </MainLayoutColor>
  );
}