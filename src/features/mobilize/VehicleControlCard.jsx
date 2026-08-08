import React, { useState, useEffect, useRef } from "react";
import { Check, ShieldCheck, HelpCircle, Lock } from "lucide-react";
import { getCommandVehicle } from "../../api/mobilizeApi";

export default function VehicleControlCard({ vehicle, onRequestImmobilize, isListLoading }) {
  const [detail, setDetail] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const detailsCache = useRef({});

  useEffect(() => {
    let mounted = true;

    if (!vehicle?.id) {
      setDetail(null);
      return;
    }

    if (detailsCache.current[vehicle.id]) {
      setDetail(detailsCache.current[vehicle.id]);
      setLoading(false);
      setError(null);
      return;
    }

    setLoading(true);
    setError(null);

    getCommandVehicle(vehicle.id)
      .then((data) => {
        if (!mounted) return;
        const result = data || null;
        if (result) {
          detailsCache.current[vehicle.id] = result;
        }
        setDetail(result);
      })
      .catch((err) => {
        if (!mounted) return;
        setError(err);
      })
      .finally(() => {
        if (!mounted) return;
        setLoading(false);
      });

    return () => {
      mounted = false;
    };
  }, [vehicle?.id]);

  if (isListLoading || !vehicle) {
    return (
      <div className="w-full h-full min-h-0 bg-[#141416] text-white rounded-2xl p-3 border border-[#222226] shadow-2xl flex flex-col justify-between items-center text-center select-none">
        <div className="w-full flex items-center justify-between pb-2 border-b border-[#222226]">
          <span className="text-[11px] font-semibold text-[#71717a] uppercase">Vehicle Control</span>
          <span className="text-[9px] text-[#71717a] bg-[#1a1a1e] px-2 py-0.5 rounded-full">Offline</span>
        </div>
        <div className="flex flex-col items-center justify-center gap-1 my-auto">
          <p className="text-xs text-[#a1a1aa] font-medium">
            {isListLoading ? "Loading vehicle details..." : "Select a vehicle to control"}
          </p>
        </div>
        <button
          disabled
          type="button"
          className="w-full flex items-center justify-center gap-1.5 bg-[#27272a] text-[#71717a] font-bold text-[11px] py-2 px-3 rounded-xl cursor-not-allowed opacity-60"
        >
          <Lock className="w-3 h-3 stroke-2" />
          <span>Immobilize Vehicle</span>
        </button>
      </div>
    );
  }

  const plate = detail?.reg_no ?? vehicle?.plate ?? "—";
  const driver = detail?.driver_name ?? vehicle?.driver ?? "—";
  const vtype = detail?.vehicle_type ?? vehicle?.type ?? "—";
  const isEligible = detail?.eligible_to_immobilize ?? true;
  const online = detail?.online ?? (vehicle?.status !== "offline");
  const currentStatus = detail?.current_status ?? detail?.state ?? vehicle?.status ?? "unknown";
  const gps = detail?.gps_signal ?? undefined;
  const ignition = detail?.ignition ?? undefined;
  const location = detail?.location ?? vehicle?.city ?? "—";

  return (
    <div className="w-full h-full min-h-0 bg-[#141416] text-white rounded-2xl p-3 border border-[#222226] shadow-2xl font-sans flex flex-col gap-2 overflow-hidden">
      <div className="flex items-center justify-between gap-2 shrink-0">
        <h2 className="text-[11px] font-semibold text-white tracking-wide uppercase">Vehicle Control</h2>
        <div
          className={`flex items-center gap-1 px-2 py-0.5 rounded-full shrink-0 ${
            online ? "bg-[#0d2818] border border-[#164e27]" : "bg-[#2a1a1a] border border-[#3a3636]"
          }`}
        >
          <span className={`w-1.5 h-1.5 rounded-full ${online ? "bg-[#10b981] animate-pulse" : "bg-[#ef4444]"}`} />
          <span className={`text-[9px] font-medium ${online ? "text-[#10b981]" : "text-[#ef4444]"}`}>{online ? "Online" : "Offline"}</span>
        </div>
      </div>

      <div className="flex items-center gap-2 shrink-0 bg-[#1a1a1e] p-2 rounded-xl border border-[#26262b]">
        <div className="w-7 h-7 bg-white/10 rounded-lg shrink-0 flex items-center justify-center text-[10px] font-bold text-white">{String(plate).slice(0, 2)}</div>
        <div className="flex flex-col min-w-0 leading-tight">
          <span className="text-xs font-bold text-white tracking-wide truncate">{plate}</span>
          <div className="flex items-center gap-1 text-[10px] text-[#8e8e93] mt-0.5 truncate">
            <span className="truncate">{driver}</span>
            <span>•</span>
            <span className="truncate">{vtype}</span>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto custom-scrollbar space-y-2 min-h-0 pr-0.5">
        {loading && !detail ? (
          <div className="p-2 text-[10px] text-[#ffd60a] bg-[#18181b] rounded-xl animate-pulse">
            Fetching telemetry details...
          </div>
        ) : error ? (
          <div className="p-2 text-[10px] text-[#ffb4b4] bg-[#2b1d1d] rounded-xl">
            Failed to refresh full details
          </div>
        ) : null}

        <div
          className={`flex items-center gap-1.5 ${isEligible ? "bg-[#082813] border-[#0f4a21] text-[#10b981]" : "bg-[#2b1d1d] border-[#4b2a2a] text-[#fca5a5]"} border rounded-xl px-2.5 py-1.5`}
        >
          <div className="w-3 h-3 rounded flex items-center justify-center shrink-0">
            <Check className="w-2.5 h-2.5 text-black stroke-3" />
          </div>
          <p className={`text-[10px] font-medium ${isEligible ? "text-[#10b981]" : "text-[#fca5a5]"}`}>
            {isEligible ? "Vehicle is eligible for remote immobilization." : detail?.ineligible_reasons?.[0] ?? "Not eligible for immobilization"}
          </p>
        </div>

        <div className="flex items-center justify-between bg-[#1a1a1e] px-2.5 py-1.5 rounded-xl border border-[#26262b] shrink-0">
          <span className="text-[10px] text-[#71717a] font-medium">Current Status</span>
          <div className="flex items-center gap-1.5">
            <ShieldCheck className={`w-3.5 h-3.5 ${online ? 'text-[#10b981]' : 'text-[#ef4444]'}`} />
            <span className={`text-[11px] font-semibold ${online ? 'text-[#10b981]' : 'text-[#ef4444]'}`}>{currentStatus}</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-1.5 text-left shrink-0 bg-[#18181b] p-2 rounded-xl text-[9.5px]">
          <div className="min-w-0">
            <span className="text-[#71717a] block truncate">GPS Signal</span>
            <span className="font-semibold text-white truncate block">{gps == null ? "—" : gps ? "Strong" : "Weak"}</span>
          </div>
          <div className="min-w-0">
            <span className="text-[#71717a] block truncate">Updated</span>
            <span className="font-semibold text-white truncate block">{detail?.last_updated_sec ? `${detail.last_updated_sec} sec` : "—"}</span>
          </div>
          <div className="min-w-0">
            <span className="text-[#71717a] block truncate">Location</span>
            <span className="font-semibold text-white truncate block">{location}</span>
          </div>
          <div className="min-w-0">
            <span className="text-[#71717a] block truncate">Ignition</span>
            <span className="font-bold text-[#10b981] truncate block">
              {ignition === undefined ? "—" : ignition ? "ON" : "OFF"}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-1.5 bg-[#1f1f23] border border-[#2a2a2e] rounded-xl p-1.5 shrink-0">
          <HelpCircle className="w-3 h-3 text-[#a1a1aa] shrink-0" />
          <span className="text-[9.5px] text-[#a1a1aa] leading-tight">Do not immobilize if vehicle is in motion.</span>
        </div>
      </div>

      <button
        type="button"
        onClick={() => onRequestImmobilize?.(detail ?? vehicle)}
        className="w-full flex items-center justify-center gap-1.5 bg-[#f59e0b] hover:bg-[#d97706] text-black active:scale-[0.99] font-bold text-[11px] py-2 px-3 rounded-xl transition-all duration-150 shrink-0 cursor-pointer"
      >
        <Lock className="w-3 h-3 stroke-2" />
        <span>Immobilize Vehicle</span>
      </button>
    </div>
  );
}