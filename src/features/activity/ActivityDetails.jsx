import React from "react";
import {
  Gauge,
  Fuel,
  Battery,
  HeartPulse,
  GaugeCircle,
  Route,
  Clock3,
  MapPin,
  Satellite,
  Power,
  RefreshCw,
  Share2,
  Pencil,
  Image,
  Video,
  StickyNote,
  TriangleAlert,
} from "lucide-react";
import Button from "../../components/Ui/Button";
import StatusBadge from "../../components/Ui/StatusBadge";
import { ACTIVITY_DETAILS } from "./activityData";

const ATTACHMENT_ICONS = {
  "Dashcam Snap": Image,
  "Camera Clip": Video,
  "Driver Notes": StickyNote,
};

function DetailRow({ icon: Icon, label, value, valueClass = "text-white", children }) {
  return (
    <div className="flex items-start justify-between gap-2 py-1.5 border-b border-[#1d1d20]/60 last:border-0">
      <div className="flex items-center gap-1.5 min-w-0">
        <Icon size={11} className="text-[#71717a] shrink-0" />
        <span className="text-[10px] text-[#a1a1aa]">{label}</span>
      </div>
      <div className="flex flex-col items-end gap-1 min-w-0 max-w-[55%]">
        <span className={`text-[10.5px] font-semibold text-right truncate ${valueClass}`}>
          {value}
        </span>
        {children}
      </div>
    </div>
  );
}

function ProgressBar({ value, color = "bg-[#22c55e]" }) {
  return (
    <div className="w-full h-1 rounded-full bg-[#27272a] overflow-hidden">
      <div
        className={`h-full rounded-full ${color}`}
        style={{ width: `${Math.min(100, Math.max(0, value))}%` }}
      />
    </div>
  );
}

export default function ActivityDetails({
  details = ACTIVITY_DETAILS,
  onShare,
  onAddNote,
}) {
  if (!details) {
    return (
      <div className="w-full h-full bg-[#121214] border border-[#1f1f23] rounded-xl p-4 flex items-center justify-center select-none">
        <p className="text-[11px] text-[#71717a]">Select an event to view details</p>
      </div>
    );
  }

  return (
    <div className="w-full h-full bg-[#121214] border border-[#1f1f23] rounded-xl flex flex-col overflow-hidden select-none">
      <div className="shrink-0 px-3 pt-3 pb-2.5 flex items-center justify-between gap-2 border-b border-[#1f1f23]">
        <h3 className="text-[12.5px] font-bold text-white tracking-tight">
          Activity Details
        </h3>
        <StatusBadge label={details.status} variant="active" pulse />
      </div>

      <div className="flex-1 min-h-0 overflow-y-auto custom-scrollbar px-3 py-3 flex flex-col gap-3">
        {details.alert && (
          <div className="flex items-stretch gap-0 rounded-lg overflow-hidden border border-[#FDBB24]/25 bg-[#FDBB24]/08">
            <div className="w-1 shrink-0 bg-[#ef4444]" />
            <div className="flex-1 flex items-center gap-2 px-2.5 py-2">
              <span className="text-[10px] text-[#a1a1aa] tabular-nums shrink-0">
                {details.alert.time}
              </span>
              <TriangleAlert size={13} className="text-[#FDBB24] shrink-0" />
              <span className="text-[11px] font-bold text-[#FDBB24]">
                {details.alert.label}
              </span>
            </div>
          </div>
        )}

        <div className="rounded-lg border border-[#1f1f23] bg-[#161619]/40 px-2.5 py-1">
          <DetailRow icon={Gauge} label="Speed" value={details.speed} />
          <DetailRow icon={Fuel} label="Fuel Level" value={`${details.fuelLevel}%`}>
            <ProgressBar value={details.fuelLevel} color="bg-[#22c55e]" />
          </DetailRow>
          <DetailRow icon={Battery} label="Battery" value={details.battery} />
          <DetailRow
            icon={HeartPulse}
            label="Engine Health"
            value={details.engineHealth}
            valueClass="text-[#22c55e]"
          />
          <DetailRow icon={GaugeCircle} label="Odometer" value={details.odometer} />
          <DetailRow
            icon={Route}
            label="Trip Process"
            value={`${details.tripProgress}%`}
          >
            <ProgressBar value={details.tripProgress} color="bg-[#FDBB24]" />
          </DetailRow>
          <DetailRow icon={Clock3} label="ETA" value={details.eta} />
          <DetailRow icon={MapPin} label="Current Address" value={details.address} />
          <DetailRow
            icon={Satellite}
            label="GPS Signal"
            value={details.gpsSignal}
            valueClass="text-[#22c55e]"
          />
          <DetailRow
            icon={Power}
            label="Ignition"
            value={details.ignition}
            valueClass="text-[#22c55e]"
          />
          <DetailRow
            icon={RefreshCw}
            label="Last Updated"
            value={details.lastUpdated}
          />
        </div>

        <div>
          <p className="text-[10px] font-bold text-white mb-2">Event Attachments</p>
          <div className="grid grid-cols-3 gap-2">
            {details.attachments.map((item) => {
              const Icon = ATTACHMENT_ICONS[item.label] || Image;
              return (
                <button
                  key={item.id}
                  type="button"
                  className="aspect-square rounded-lg border border-[#27272a] bg-[#18181b] flex flex-col items-center justify-center gap-1.5 hover:border-[#FDBB24]/35 transition-colors cursor-pointer"
                >
                  <Icon size={16} className="text-[#71717a]" />
                  <span className="text-[8px] text-[#a1a1aa] text-center px-1 leading-tight">
                    {item.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div className="shrink-0 px-3 py-2.5 border-t border-[#1f1f23] flex items-center gap-2">
        <Button
          variant="secondary"
          size="sm"
          icon={Share2}
          onClick={onShare}
          className="flex-1 justify-center font-semibold"
        >
          Share Event
        </Button>
        <Button
          variant="primary"
          size="sm"
          icon={Pencil}
          onClick={onAddNote}
          className="flex-1 justify-center font-bold"
        >
          Add Note
        </Button>
      </div>
    </div>
  );
}
