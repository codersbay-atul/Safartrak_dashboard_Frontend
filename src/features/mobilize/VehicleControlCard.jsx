import React, { useState, useEffect } from "react";
import { Check, ShieldCheck, HelpCircle, Lock } from "lucide-react";
import { getCommandVehicle } from "../../api/mobilizeApi";

export default function VehicleControlCard({ vehicle, onRequestImmobilize }) {
  const [detail, setDetail] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;
    if (!vehicle?.id) {
      setDetail(null);
      return;
    }

    setLoading(true);
    setError(null);
    getCommandVehicle(vehicle.id)
      .then((data) => {
        if (!mounted) return;
        setDetail(data || null);
      })
      .catch((err) => {
        if (!mounted) return;
        setError(err);
        setDetail(null);
      })
      .finally(() => {
        if (!mounted) return;
        setLoading(false);
      });

    return () => {
      mounted = false;
    };
  }, [vehicle?.id]);

  const isEligible = detail?.eligible_to_immobilize ?? true;
  const online = detail?.online ?? true;
  const currentStatus =
    vehicle?.status ?? detail?.current_status ?? detail?.state ?? "unknown";

  const plate = detail?.reg_no ?? vehicle?.plate ?? "—";
  const driver = detail?.driver_name ?? vehicle?.driver ?? "—";
  const vtype = detail?.vehicle_type ?? vehicle?.type ?? "—";
  const gps = detail?.gps_signal ?? undefined;
  const ignition = detail?.ignition ?? undefined;
  const location = detail?.location ?? vehicle?.city ?? "—";

  return (
    <div className="w-full max-w-sm bg-[#141416] text-white rounded-xl p-3.5 border border-[#222226] shadow-xl font-sans flex flex-col gap-2.5">
      <div className="flex items-center justify-between gap-2 shrink-0">
        <h2 className="text-xs font-semibold text-white tracking-wide uppercase">Vehicle Control</h2>
        <div
          className={`flex items-center gap-1.5 px-2 py-0.5 rounded-full shrink-0 ${
            online ? "bg-[#0d2818] border border-[#164e27]" : "bg-[#2a1a1a] border border-[#3a3636]"
          }`}
        >
          <span className={`w-1.5 h-1.5 rounded-full ${online ? "bg-[#10b981] animate-pulse" : "bg-[#ef4444]"}`} />
          <span className="text-[10px] font-medium text-[#10b981]">{online ? "Online" : "Offline"}</span>
        </div>
      </div>

      <div className="flex items-center gap-2.5 shrink-0 bg-[#1a1a1e] p-2 rounded-lg border border-[#26262b]">
        <div className="w-8 h-8 bg-white/10 rounded-lg shrink-0 flex items-center justify-center text-xs font-bold text-white">{String(plate).slice(0, 2)}</div>
        <div className="flex flex-col min-w-0 leading-tight">
          <span className="text-xs font-bold text-white tracking-wide truncate">{plate}</span>
          <div className="flex items-center gap-1 text-[11px] text-[#8e8e93] mt-0.5 truncate">
            <span className="truncate">{driver}</span>
            <span>•</span>
            <span className="truncate">{vtype}</span>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="text-xs text-[#9ca3af]">Loading vehicle details…</div>
      ) : error ? (
        <div className="text-xs text-[#ffb4b4]">Unable to load details</div>
      ) : (
        <>
          <div
            className={`flex items-center gap-2 ${isEligible ? "bg-[#082813] border-[#0f4a21] text-[#10b981]" : "bg-[#2b1d1d] border-[#4b2a2a] text-[#fca5a5]"} border rounded-lg px-2.5 py-1.5`}
          >
            <div className="w-3.5 h-3.5 rounded flex items-center justify-center shrink-0">
              <Check className="w-2.5 h-2.5 text-black stroke-3" />
            </div>
            <p className={`text-[11px] font-medium ${isEligible ? "text-[#10b981]" : "text-[#fca5a5]"}`}>
              {isEligible ? "Vehicle is eligible for remote immobilization." : detail?.ineligible_reasons?.[0] ?? "Not eligible for immobilization"}
            </p>
          </div>

          <div className="flex items-center justify-between bg-[#1a1a1e] px-2.5 py-1.5 rounded-lg border border-[#26262b] shrink-0">
            <span className="text-[11px] text-[#71717a] font-medium">Current Status</span>
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-[#10b981]" />
              <span className="text-xs font-semibold text-[#10b981]">{currentStatus}</span>
            </div>
          </div>

          <div className="grid grid-cols-4 gap-1.5 text-left shrink-0 bg-[#18181b] p-2 rounded-lg text-[10px]">
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

          <div className="flex items-center gap-2 bg-[#1f1f23] border border-[#2a2a2e] rounded-lg p-2 shrink-0">
            <HelpCircle className="w-3.5 h-3.5 text-[#a1a1aa] shrink-0" />
            <span className="text-[10px] text-[#a1a1aa] leading-tight">Do not immobilize if vehicle is in motion.</span>
          </div>
        </>
      )}

      <button
        type="button"
        onClick={() => onRequestImmobilize?.(detail ?? vehicle)}
        className="w-full flex items-center justify-center gap-2 bg-[#f59e0b] hover:bg-[#d97706] text-black active:scale-[0.99] font-semibold text-xs py-2 px-3 rounded-lg transition-all duration-150 shrink-0 mt-0.5"
      >
        <Lock className="w-3.5 h-3.5 stroke-2" />
        <span>Immobilize Vehicle</span>
      </button>
    </div>
  );
}