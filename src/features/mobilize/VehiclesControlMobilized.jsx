import React from "react";
import { ShieldCheck, Zap, Gauge, Clock, HelpCircle, Loader2 } from "lucide-react";
import MainLayoutColor from "../../components/Ui/MainLayoutUI/MainLayoutColor";
import MainLayoutTextSize from "../../components/Ui/MainLayoutUI/MainLayoutTextSize";
import MainHeaderActionButton from "../../components/Ui/MainLayoutUI/MainHeaderActionButton";

export default function VehiclesControlMobilized({
  vehicle,
  onCancel,
  onSendCommand,
  isSending,
  error,
}) {
  const plate =
    vehicle?.plate || vehicle?.reg_no || vehicle?.vehicle_number || "—";
  const driver = vehicle?.driver || vehicle?.driver_name || "—";
  const type = vehicle?.type || vehicle?.vehicle_type || "—";
  const status =
    vehicle?.status ||
    vehicle?.current_status ||
    vehicle?.state ||
    vehicle?.command_state ||
    "—";
  const isOnline =
    vehicle?.online ??
    vehicle?.is_online ??
    (vehicle?.connection_status
      ? vehicle.connection_status !== "offline"
      : undefined);
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
      className="w-full max-w-[440px] border border-[#27272a] rounded-2xl p-5 md:p-6 shadow-2xl flex flex-col gap-4 select-none font-sans"
    >
      {/* Header */}
      <div className="flex items-center justify-between gap-2">
        <MainLayoutColor
          as={MainLayoutTextSize}
          color="title"
          size="sectionTitle"
          className="font-medium tracking-tight block text-[14px]"
        >
          Vehicle Control
        </MainLayoutColor>

        <div
          className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full ${
            isOnline
              ? "bg-emerald-500/10 border border-emerald-500/20 text-emerald-400"
              : "bg-rose-500/10 border border-rose-500/20 text-rose-400"
          }`}
        >
          <span
            className={`w-1.5 h-1.5 rounded-full ${
              isOnline ? "bg-emerald-400 animate-pulse" : "bg-rose-400"
            }`}
          />
          <MainLayoutTextSize size="badgeText" className="font-medium text-[11px]">
            {isOnline === undefined
              ? "Unknown"
              : isOnline
              ? "Online"
              : "Offline"}
          </MainLayoutTextSize>
        </div>
      </div>

      {/* Vehicle Info Card */}
      <MainLayoutColor
        as="div"
        background="surface"
        className="flex items-center gap-3 p-3 rounded-xl border border-[#27272a] bg-[#18181b]/80"
      >
        <div className="w-10 h-10 bg-white rounded-xl shrink-0 flex items-center justify-center text-xs font-bold text-black">
          {String(plate).slice(0, 2)}
        </div>
        <div className="flex flex-col min-w-0 leading-tight">
          <MainLayoutColor
            as={MainLayoutTextSize}
            color="title"
            size="sectionTitle"
            className="font-bold tracking-wide truncate text-[13px]"
          >
            {plate}
          </MainLayoutColor>
          <div className="flex items-center gap-1.5 mt-1 truncate">
            <MainLayoutColor
              as={MainLayoutTextSize}
              color="subtitle"
              size="subInfoText"
              className="truncate font-medium text-[11px]"
            >
              {driver}
            </MainLayoutColor>
            <span className="text-[#71717a]">•</span>
            <MainLayoutColor
              as={MainLayoutTextSize}
              color="subtitle"
              size="subInfoText"
              className="truncate font-medium text-[11px]"
            >
              {type}
            </MainLayoutColor>
          </div>
        </div>
      </MainLayoutColor>

      {/* Current Status */}
      <div className="flex flex-col gap-1 my-1">
        <MainLayoutColor
          as={MainLayoutTextSize}
          color="subtitle"
          size="subInfoText"
          className="font-medium text-[11px]"
        >
          Current Status
        </MainLayoutColor>
        <div
          className={`flex items-center gap-2 ${
            isOnline ? "text-emerald-400" : "text-rose-400"
          }`}
        >
          <ShieldCheck className="w-5 h-5 stroke-2" />
          <span className="text-lg font-bold">
            {String(status).toUpperCase()}
          </span>
        </div>
      </div>

      <hr className="border-[#27272a]" />

      {/* Details Grid */}
      <div className="flex flex-col gap-3 my-1">
        {/* Ignition */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Zap className="w-4 h-4 text-[#a1a1aa]" />
            <MainLayoutColor
              as={MainLayoutTextSize}
              color="subtitle"
              size="subInfoText"
              className="font-medium text-[12px]"
            >
              Ignition
            </MainLayoutColor>
          </div>
          <span
            className={`font-bold text-[12px] ${
              ignition === true
                ? "text-emerald-400"
                : ignition === false
                ? "text-rose-400"
                : "text-white"
            }`}
          >
            {ignitionLabel}
          </span>
        </div>

        {/* Speed */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Gauge className="w-4 h-4 text-[#a1a1aa]" />
            <MainLayoutColor
              as={MainLayoutTextSize}
              color="subtitle"
              size="subInfoText"
              className="font-medium text-[12px]"
            >
              Speed
            </MainLayoutColor>
          </div>
          <span className="font-semibold text-white text-[12px]">{speed}</span>
        </div>

        {/* Last Updated */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-[#a1a1aa]" />
            <MainLayoutColor
              as={MainLayoutTextSize}
              color="subtitle"
              size="subInfoText"
              className="font-medium text-[12px]"
            >
              Last Updated
            </MainLayoutColor>
          </div>
          <span className="font-semibold text-white text-[12px]">
            {lastUpdated}
          </span>
        </div>
      </div>

      <hr className="border-[#27272a]" />

      {/* Warning / Note Box */}
      <MainLayoutColor
        as="div"
        background="surface"
        className="flex items-center gap-2 border border-[#27272a] bg-[#18181b]/80 rounded-xl p-3"
      >
        <HelpCircle className="w-4 h-4 text-[#a1a1aa] shrink-0 mt-0.5" />
        <MainLayoutColor
          as={MainLayoutTextSize}
          color="subtitle"
          size="subInfoText"
          className="text-[11px] leading-relaxed font-medium"
        >
          The vehicle may not be able to restart until a mobilization command is successfully executed.
        </MainLayoutColor>
      </MainLayoutColor>

      {/* Error Alert */}
      {error && (
        <div className="text-[11px] text-rose-400 bg-rose-500/10 border border-rose-500/20 rounded-xl p-3">
          {error}
        </div>
      )}

      {/* Action Buttons: Cancel & Send Command */}
      <div className="grid grid-cols-2 gap-2.5 pt-2 mt-1 border-t border-[#27272a]">
        {/* Cancel Button */}
        <MainHeaderActionButton
          type="button"
          variant="secondary"
          onClick={onCancel}
          disabled={isSending}
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
          }}
          className="w-full py-2.5 px-4 rounded-xl bg-[#18181b] hover:bg-[#27272a] text-[#a1a1aa] hover:text-white border border-[#27272a] cursor-pointer disabled:opacity-50"
        >
          <span className="text-[14px] font-medium whitespace-nowrap leading-none">
            Cancel
          </span>
        </MainHeaderActionButton>

        {/* Send Command Button */}
        <MainHeaderActionButton
          type="button"
          variant="danger"
          onClick={onSendCommand}
          disabled={isSending}
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
          }}
          className="w-full py-2.5 px-4 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-medium border border-rose-600 cursor-pointer disabled:opacity-60 transition-all shadow-md shadow-rose-950/40"
        >
          {isSending && <Loader2 className="w-4 h-4 animate-spin mr-1.5" />}
          <span className="text-[14px] font-medium whitespace-nowrap leading-none text-white">
            {isSending ? "Sending..." : "Immobilize"}
          </span>
        </MainHeaderActionButton>
      </div>
    </MainLayoutColor>
  );
}