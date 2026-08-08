import React from "react";
import { ShieldCheck, Zap, Gauge, Clock, HelpCircle, Loader2 } from "lucide-react";

export default function VehiclesControlMobilized({ vehicle, onCancel, onSendCommand, isSending, error }) {
  const plate =
    vehicle?.plate || vehicle?.reg_no || vehicle?.vehicle_number || "—";
  const driver = vehicle?.driver || vehicle?.driver_name || "—";
  const type = vehicle?.type || vehicle?.vehicle_type || "—";
  const status =
    vehicle?.status || vehicle?.current_status || vehicle?.state || vehicle?.command_state || "—";
  const isOnline =
    vehicle?.online ?? vehicle?.is_online ??
    (vehicle?.connection_status ? vehicle.connection_status !== "offline" : undefined);
  const ignition =
    vehicle?.ignition ?? vehicle?.ignition_status ??
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
  const location = vehicle?.location || vehicle?.city || "—";

  return (
    <div className="w-full max-w-110 bg-[#141416] text-white rounded-2xl p-5 md:p-6 border border-[#222226] shadow-2xl flex flex-col gap-4">
      <div className="flex items-center justify-between gap-2">
        <h2 className="text-sm font-bold text-white tracking-wide">
          Vehicle Control
        </h2>
        <div
          className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full ${
            isOnline ? "bg-[#0d2818] border border-[#164e27]" : "bg-[#2a1a1a] border border-[#3a3636]"
          }`}
        >
          <span
            className={`w-1.5 h-1.5 rounded-full ${
              isOnline ? "bg-[#10b981] animate-pulse" : "bg-[#ef4444]"
            }`}
          />
          <span className={`text-[11px] font-medium ${isOnline ? "text-[#10b981]" : "text-[#ef4444]"}`}>
            {isOnline === undefined ? "Unknown" : isOnline ? "Online" : "Offline"}
          </span>
        </div>
      </div>

      <div className="flex items-center gap-3 bg-[#1c1c20]/60 p-3 rounded-xl border border-[#26262b]">
        <div className="w-10 h-10 bg-white rounded-xl shrink-0 flex items-center justify-center text-xs font-bold text-black">
          {String(plate).slice(0, 2)}
        </div>
        <div className="flex flex-col min-w-0 leading-tight">
          <span className="text-sm font-bold text-white tracking-wide truncate">
            {plate}
          </span>
          <div className="flex items-center gap-1.5 text-xs text-[#8e8e93] mt-1 truncate">
            <span className="truncate">{driver}</span>
            <span>•</span>
            <span className="truncate">{type}</span>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-1 my-1">
        <span className="text-xs text-[#71717a] font-medium">Current Status</span>
        <div className={`flex items-center gap-2 ${isOnline ? 'text-[#10b981]' : 'text-[#ef4444]'}`}>
          <ShieldCheck className="w-5 h-5 stroke-2" />
          <span className="text-lg font-bold">{String(status).toUpperCase()}</span>
        </div>
      </div>

      <hr className="border-[#222226]" />

      <div className="flex flex-col gap-3 text-xs my-1">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-[#8e8e93]">
            <Zap className="w-4 h-4 text-[#8e8e93]" />
            <span>Ignition</span>
          </div>
          <span className={`font-bold ${ignition === true ? 'text-[#10b981]' : ignition === false ? 'text-[#ef4444]' : 'text-white'}`}>{ignitionLabel}</span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-[#8e8e93]">
            <Gauge className="w-4 h-4 text-[#8e8e93]" />
            <span>Speed</span>
          </div>
          <span className="font-semibold text-white">{speed}</span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-[#8e8e93]">
            <Clock className="w-4 h-4 text-[#8e8e93]" />
            <span>Last Updated</span>
          </div>
          <span className="font-semibold text-white">{lastUpdated}</span>
        </div>
      </div>

      <hr className="border-[#222226]" />

      <div className="flex items-center gap-2 bg-[#202024] border border-[#2a2a2e] rounded-xl p-3.5">
        <HelpCircle className="w-5 h-5 text-[#a1a1aa] shrink-0 mt-0.5" />
        <span className="text-xs text-[#d4d4d8] leading-relaxed">
          The vehicle may not be able to restart until a mobilization command is successfully executed.
        </span>
      </div>

      {error ? (
        <div className="text-xs text-[#f87171] bg-[#3f1f1f] border border-[#7f1d1d] rounded-xl p-3 mt-2">
          {error}
        </div>
      ) : null}
      <button
        type="button"
        onClick={onSendCommand}
        disabled={isSending}
        className={`w-full flex items-center justify-center gap-2 ${
          isSending
            ? "bg-[#b91c1c] cursor-wait"
            : "bg-[#dc2626] hover:bg-[#b91c1c] cursor-pointer"
        } text-white font-medium text-xs py-3 rounded-xl transition-all duration-150 ${
          isSending ? "opacity-90" : ""
        } mt-1`}
      >
        {isSending ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
        <span>{isSending ? "Sending Command..." : "Send Immobilization Command"}</span>
      </button>
    </div>
  );
}
