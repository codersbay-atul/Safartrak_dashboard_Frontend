import React, { useState } from "react";
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
import MainLayoutButton from "../../components/Ui/MainLayoutUI/MainLayoutButton";
import MainLayoutColor from "../../components/Ui/MainLayoutUI/MainLayoutColor";
import MainLayoutTextSize from "../../components/Ui/MainLayoutUI/MainLayoutTextSize";
import { toast } from "../../components/Ui/toast";
import { ACTIVITY_DETAILS } from "./activityData";
import useActivityNote from "../../hooks/useActivityNote";
import MainStatusBadge from "../../components/Ui/MainLayoutUI/MainStatusBadge";

const ATTACHMENT_ICONS = {
  "Dashcam Snap": Image,
  "Camera Clip": Video,
  "Driver Notes": StickyNote,
};

function DetailRow({ icon: Icon, label, value, valueClass = "", children }) {
  return (
    <div className="flex items-start justify-between gap-2 py-1.5 border-b border-[#1d1d20]/60 last:border-0">
      <div className="flex items-center gap-1.5 min-w-0">
        <Icon size={12} className="text-[#71717a] shrink-0" />
        {/* 12px Label */}
        <MainLayoutColor
          as={MainLayoutTextSize}
          color="subtitle"
          size="subInfoText"
          className="truncate"
        >
          {label}
        </MainLayoutColor>
      </div>
      <div className="flex flex-col items-end gap-1 min-w-0 max-w-[55%]">
        {/* 12px Value */}
        <MainLayoutColor
          as={MainLayoutTextSize}
          color="title"
          size="subInfoText"
          className={`font-semibold text-right truncate ${valueClass}`}
        >
          {value}
        </MainLayoutColor>
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
  event,
  details = ACTIVITY_DETAILS,
  onShare,
  onAddNote,
}) {
  const [showNoteEditor, setShowNoteEditor] = useState(false);
  const [noteBody, setNoteBody] = useState("");
  const { mutateAsync: saveNote, isLoading: isSavingNote } = useActivityNote();

  const detailsData = event
    ? {
        ...details,
        status: event.severity === "alert" ? "Attention" : details.status,
        alert:
          event.severity === "alert"
            ? { time: event.time, label: event.title }
            : details.alert,
        speed: event.speed || details.speed,
        address: event.location || details.address,
      }
    : details;

  const handleSaveNote = async () => {
    if (!event || !noteBody.trim()) return;

    const payload = {
      unique_id:
        event.unique_id ||
        event.uniqueId ||
        event.id ||
        event.vehicle ||
        event.driver ||
        null,
      event_at: event.event_at || event.time || event.date || null,
      event_kind:
        event.event_kind ||
        event.eventKind ||
        event.type ||
        event.severity ||
        event.title ||
        null,
      body: noteBody.trim(),
    };

    if (!payload.unique_id || !payload.body) {
      toast.error("Note cannot be saved: missing event identifier or content.");
      return;
    }

    try {
      await saveNote(payload);
      setNoteBody("");
      setShowNoteEditor(false);
      if (typeof onAddNote === "function") {
        onAddNote(payload);
      }
    } catch (error) {
      console.error("Failed to save activity note", error);
      toast.error(error?.message || "Unable to save note. Please try again.");
    }
  };

  if (!detailsData) {
    return (
      <MainLayoutColor
        as="div"
        background="surface"
        className="w-full h-full border border-[#1f1f23] rounded-xl p-4 flex items-center justify-center select-none"
      >
        <MainLayoutColor
          as={MainLayoutTextSize}
          color="subtitle"
          size="subInfoText"
        >
          Select an event to view details
        </MainLayoutColor>
      </MainLayoutColor>
    );
  }

  return (
    <MainLayoutColor
      as="div"
      background="surface"
      className="w-full h-full border border-[#1f1f23] rounded-xl flex flex-col overflow-hidden select-none font-sans"
    >
      {/* 14px Header Title */}
      <div className="shrink-0 px-3 pt-3 pb-2.5 flex items-center justify-between gap-2 border-b border-[#1f1f23]">
        <MainLayoutColor
          as={MainLayoutTextSize}
          color="title"
          size="sectionTitle"
          className="font-bold tracking-tight block"
        >
          Activity Details
        </MainLayoutColor>
        <MainStatusBadge label={detailsData.status} variant="active" pulse />
      </div>

      <div className="flex-1 min-h-0 overflow-y-auto custom-scrollbar px-3 py-3 flex flex-col gap-3">
        {detailsData.alert && (
          <div className="flex items-stretch gap-0 rounded-lg overflow-hidden border border-[#FDBB24]/25 bg-[#FDBB24]/08">
            <div className="w-1 shrink-0 bg-[#ef4444]" />
            <div className="flex-1 flex items-center gap-2 px-2.5 py-2">
              <span className="text-[12px] text-[#a1a1aa] tabular-nums shrink-0">
                {detailsData.alert.time}
              </span>
              <TriangleAlert size={14} className="text-[#FDBB24] shrink-0" />
              <MainLayoutTextSize
                size="subInfoText"
                className="font-bold text-[#FDBB24]"
              >
                {detailsData.alert.label}
              </MainLayoutTextSize>
            </div>
          </div>
        )}

        {/* 12px Details Container */}
        <div className="rounded-lg border border-[#1f1f23] bg-[#161619]/40 px-2.5 py-1">
          <DetailRow icon={Gauge} label="Speed" value={detailsData.speed} />
          <DetailRow
            icon={Fuel}
            label="Fuel Level"
            value={`${detailsData.fuelLevel}%`}
          >
            <ProgressBar
              value={detailsData.fuelLevel}
              color="bg-[#22c55e]"
            />
          </DetailRow>
          <DetailRow
            icon={Battery}
            label="Battery"
            value={detailsData.battery}
          />
          <DetailRow
            icon={HeartPulse}
            label="Engine Health"
            value={detailsData.engineHealth}
            valueClass="text-[#22c55e]"
          />
          <DetailRow
            icon={GaugeCircle}
            label="Odometer"
            value={detailsData.odometer}
          />
          <DetailRow
            icon={Route}
            label="Trip Process"
            value={`${detailsData.tripProgress}%`}
          >
            <ProgressBar
              value={detailsData.tripProgress}
              color="bg-[#FDBB24]"
            />
          </DetailRow>
          <DetailRow icon={Clock3} label="ETA" value={detailsData.eta} />
          <DetailRow
            icon={MapPin}
            label="Current Address"
            value={detailsData.address}
          />
          <DetailRow
            icon={Satellite}
            label="GPS Signal"
            value={detailsData.gpsSignal}
            valueClass="text-[#22c55e]"
          />
          <DetailRow
            icon={Power}
            label="Ignition"
            value={detailsData.ignition}
            valueClass="text-[#22c55e]"
          />
          <DetailRow
            icon={RefreshCw}
            label="Last Updated"
            value={detailsData.lastUpdated}
          />
        </div>

        <div>
          {/* 12px Section Heading */}
          <MainLayoutColor
            as={MainLayoutTextSize}
            color="title"
            size="subInfoText"
            className="font-bold mb-2 block"
          >
            Event Attachments
          </MainLayoutColor>
          <div className="grid grid-cols-3 gap-2">
            {detailsData.attachments.map((item) => {
              const Icon = ATTACHMENT_ICONS[item.label] || Image;
              return (
                <button
                  key={item.id}
                  type="button"
                  className="aspect-square rounded-lg border border-[#27272a] bg-[#18181b] flex flex-col items-center justify-center gap-1.5 hover:border-[#FDBB24]/35 transition-colors cursor-pointer"
                >
                  <Icon size={16} className="text-[#71717a]" />
                  <MainLayoutColor
                    as={MainLayoutTextSize}
                    color="subtitle"
                    size="subInfoText"
                    className="text-center px-1 leading-tight block truncate w-full"
                  >
                    {item.label}
                  </MainLayoutColor>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div className="px-3 py-2.5 border-t border-[#1f1f23] space-y-3">
        {showNoteEditor && (
          <div className="space-y-2">
            <textarea
              rows={4}
              value={noteBody}
              onChange={(e) => setNoteBody(e.target.value)}
              placeholder={
                event
                  ? "Write your note here..."
                  : "Select an event to add a note."
              }
              disabled={!event || isSavingNote}
              className="w-full resize-none rounded-xl border border-[#27272a] bg-[#18181b] px-3 py-2 text-[12px] text-white placeholder:text-[#71717a] focus:outline-none focus:border-[#FDBB24]"
            />
            <div className="flex items-center gap-2">
              <MainLayoutButton
                variant="primary"
                size="sm"
                onClick={handleSaveNote}
                disabled={!event || isSavingNote || !noteBody.trim()}
                className="flex-1 justify-center font-bold"
              >
                <MainLayoutTextSize size="headerButtonText">
                  {isSavingNote ? "Saving..." : "Save Note"}
                </MainLayoutTextSize>
              </MainLayoutButton>
              <MainLayoutButton
                variant="secondary"
                size="sm"
                onClick={() => setNoteBody("")}
                disabled={!event || isSavingNote}
                className="flex-1 justify-center font-semibold"
              >
                <MainLayoutTextSize size="headerButtonText">
                  Clear
                </MainLayoutTextSize>
              </MainLayoutButton>
            </div>
          </div>
        )}

        <div className="flex items-center gap-2">
          <MainLayoutButton
            variant="secondary"
            size="sm"
            icon={Share2}
            onClick={onShare}
            className="flex-1 justify-center font-semibold"
          >
            <MainLayoutTextSize size="headerButtonText">
              Share Event
            </MainLayoutTextSize>
          </MainLayoutButton>
          <MainLayoutButton
            variant="primary"
            size="sm"
            icon={Pencil}
            onClick={() => setShowNoteEditor((prev) => !prev)}
            className="flex-1 justify-center font-bold"
          >
            <MainLayoutTextSize size="headerButtonText">
              {showNoteEditor ? "Hide Note" : "Add Note"}
            </MainLayoutTextSize>
          </MainLayoutButton>
        </div>
      </div>
    </MainLayoutColor>
  );
}