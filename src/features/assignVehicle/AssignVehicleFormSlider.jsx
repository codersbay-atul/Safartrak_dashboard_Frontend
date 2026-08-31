import React, { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { GripVertical, MapPin, Plus, Search, X } from "lucide-react";
import FormSlider from "../../components/Ui/MainLayoutUI/FormSlider";
import MainDropDown from "../../components/Ui/MainLayoutUI/MainDropDown";
import MainLayoutColor from "../../components/Ui/MainLayoutUI/MainLayoutColor";
import MainLayoutTextSize from "../../components/Ui/MainLayoutUI/MainLayoutTextSize";
import MainHeaderActionButton from "../../components/Ui/MainLayoutUI/MainHeaderActionButton";
import {
  ASSIGN_VEHICLE_OPTIONS,
  CHECKPOINT_SUGGESTIONS,
} from "./assignVehicleData";

const STEPS = [
  { id: "form", label: "Trip details" },
  { id: "review", label: "Review" },
];

// const TRIP_TYPES = [
//   { label: "Intra City", value: "intra" },
//   { label: "Inter City", value: "inter" },
// ];

const INPUT_BASE =
  "w-full bg-[#18181b]/60 border focus:border-[var(--color-yellow,#FDB914)] rounded-xl px-3 py-2.5 text-white text-[12px] font-medium placeholder-[#52525b] focus:outline-none transition-all [color-scheme:dark]";

const DROPDOWN_BASE =
  "w-full justify-between rounded-xl bg-[#18181b]/60 py-2.5 px-3 text-white text-[12px] font-medium focus:border-[var(--color-yellow,#FDB914)]";

function inputClass(hasError) {
  return `${INPUT_BASE} ${
    hasError ? "border-[#EF4444]" : "border-[#27272a]"
  }`;
}

function dropdownClass(hasError) {
  return `${DROPDOWN_BASE} ${
    hasError ? "!border-[#EF4444]" : "border-[#27272a]"
  }`;
}

function createPoint() {
  return {
    id: `pt-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    search: "",
    lat: "",
    lng: "",
    name: "",
  };
}

function emptyForm() {
  return {
    driver: "",
    vehicle: "",
    reportingStart: "",
    reportingEnd: "",
    // tripType: "",
    temperatureEnabled: false,
    tempMin: "",
    tempMax: "",
    startPoint: createPoint(),
    endPoint: createPoint(),
    stops: [],
  };
}

function isFilled(value) {
  return String(value || "").trim() !== "";
}

function sanitizeCoordinate(value) {
  let dotted = false;
  let result = "";

  for (const char of String(value ?? "")) {
    if (char >= "0" && char <= "9") {
      result += char;
      continue;
    }
    if (char === "." && !dotted) {
      result += char;
      dotted = true;
    }
  }

  return result;
}

function isValidCoordinate(value) {
  if (!isFilled(value)) return false;
  const trimmed = String(value).trim();
  if (trimmed === ".") return false;
  return Number.isFinite(Number(trimmed));
}

function formatDateTime(value) {
  if (!value) return "—";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

/** datetime-local value (YYYY-MM-DDTHH:mm) from a Date */
function toDateTimeLocalValue(date) {
  if (!(date instanceof Date) || Number.isNaN(date.getTime())) return "";
  const pad = (n) => String(n).padStart(2, "0");
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}`;
}

function getNowLocalValue() {
  return toDateTimeLocalValue(new Date());
}

function isEndAfterStart(start, end) {
  if (!isFilled(start) || !isFilled(end)) return true;
  return new Date(end) > new Date(start);
}

function FieldLabel({ children, optional = false, required = false }) {
  return (
    <div className="flex items-center justify-start gap-2 mb-2">
      <MainLayoutColor
        as={MainLayoutTextSize}
        color="subtitle"
        size="subInfoText"
        className="font-medium"
      >
        {children}
        {/* {required ? <span className="text-rose-500"> *</span> : null} */}
      </MainLayoutColor>
      {optional ? (
        <span className="text-[11px] text-[#71717a] italic font-medium">(Optional)</span>
      ) : null}
    </div>
  );
}

function ErrorText({ message }) {
  if (!message) return null;
  return (
    <p className="text-[#EF4444] text-[11px] mt-1.5 leading-tight font-medium">
      {message}
    </p>
  );
}

function SectionHeader({ title, action }) {
  return (
    <div className="flex items-center justify-between gap-2 pb-3 mb-4 border-b border-[#27272a]">
      <MainLayoutColor
        as={MainLayoutTextSize}
        color="title"
        size="sectionTitle"
        className="font-medium tracking-tight"
      >
        {title}
      </MainLayoutColor>
      {action}
    </div>
  );
}

function FooterButton({ variant = "primary", children, ...props }) {
  return (
    <MainHeaderActionButton
      type="button"
      variant={variant}
      className="min-w-[84px]"
      {...props}
    >
      {children}
    </MainHeaderActionButton>
  );
}

function CheckpointSearch({ value, onChange, onSelect, onCreate, error }) {
  const [isOpen, setIsOpen] = useState(false);
  const wrapRef = useRef(null);
  const query = value.trim().toLowerCase();

  const matches = useMemo(() => {
    if (!query) return CHECKPOINT_SUGGESTIONS.slice(0, 6);
    return CHECKPOINT_SUGGESTIONS.filter(
      (item) =>
        item.name.toLowerCase().includes(query) ||
        item.search.toLowerCase().includes(query),
    ).slice(0, 6);
  }, [query]);

  const hasExactMatch = useMemo(
    () =>
      CHECKPOINT_SUGGESTIONS.some(
        (item) =>
          item.name.toLowerCase() === query ||
          item.search.toLowerCase() === query,
      ),
    [query],
  );

  const showCreate = Boolean(query) && !hasExactMatch;
  const showMenu = isOpen && (matches.length > 0 || showCreate);

  useEffect(() => {
    function handleClickOutside(event) {
      if (wrapRef.current && !wrapRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={wrapRef}>
      <Search
        size={13}
        className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8B8D97] pointer-events-none"
      />
      <input
        type="text"
        value={value}
        onChange={(event) => {
          onChange(event.target.value);
          setIsOpen(true);
        }}
        onFocus={() => setIsOpen(true)}
        onKeyDown={(event) => {
          if (event.key === "Enter" && showCreate) {
            event.preventDefault();
            onCreate(value.trim());
            setIsOpen(false);
          }
        }}
        placeholder="Search or enter a new checkpoint"
        className={`${inputClass(error)} pl-8`}
      />
      {showMenu ? (
        <div className="absolute left-0 right-0 mt-1.5 z-30 rounded-xl border border-[#22252B] bg-[#0f1115] shadow-2xl overflow-hidden max-h-56 overflow-y-auto custom-scrollbar">
          {matches.map((item) => (
            <button
              key={`${item.name}-${item.lat}`}
              type="button"
              onClick={() => {
                onSelect(item);
                setIsOpen(false);
              }}
              className="w-full text-left px-3 py-2 hover:bg-[#18181b] transition-colors cursor-pointer"
            >
              <MainLayoutColor
                as={MainLayoutTextSize}
                color="title"
                size="subInfoText"
                className="block"
              >
                {item.name}
              </MainLayoutColor>
              <MainLayoutColor
                as={MainLayoutTextSize}
                color="muted"
                size="captionText"
                className="block mt-0.5 font-normal"
              >
                {item.search} · {item.lat}, {item.lng}
              </MainLayoutColor>
            </button>
          ))}
          {showCreate ? (
            <button
              type="button"
              onClick={() => {
                onCreate(value.trim());
                setIsOpen(false);
              }}
              className="w-full text-left px-3 py-2 hover:bg-[#18181b] transition-colors cursor-pointer border-t border-[#22252B]"
            >
              <span className="flex items-center gap-1.5">
                <MainLayoutColor as={Plus} color="yellow" className="shrink-0" size={13} />
                <MainLayoutColor
                  as={MainLayoutTextSize}
                  color="yellow"
                  size="subInfoText"
                  className="font-medium"
                >
                  Add “{value.trim()}” as a new point
                </MainLayoutColor>
              </span>
              <MainLayoutColor
                as={MainLayoutTextSize}
                color="muted"
                size="captionText"
                className="block mt-0.5 font-normal"
              >
                Enter latitude, longitude and name below
              </MainLayoutColor>
            </button>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}

function PointCard({
  title,
  point,
  onChange,
  onRemove,
  errors = {},
  dragHandle = null,
  isDragging = false,
  isDropTarget = false,
}) {
  function update(patch) {
    onChange({ ...point, ...patch });
  }

  return (
    <div
      className={`rounded-xl border bg-[#18181b]/40 p-4 flex flex-col gap-4 transition-opacity ${
        isDropTarget ? "border-[#FDB914]" : "border-[#27272a]"
      } ${isDragging ? "opacity-40" : ""}`}
    >
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2 min-w-0">
          {dragHandle}
          <MainLayoutColor as={MapPin} color="yellow" className="shrink-0" size={13} />
          <MainLayoutColor
            as={MainLayoutTextSize}
            color="title"
            size="subInfoText"
            className="font-medium"
          >
            {title}
          </MainLayoutColor>
        </div>
        {onRemove ? (
          <button
            type="button"
            onClick={onRemove}
            aria-label={`Remove ${title}`}
            className="flex h-6 w-6 items-center justify-center rounded-md text-[#71717a] hover:text-white hover:bg-white/5 cursor-pointer"
          >
            <X size={13} />
          </button>
        ) : null}
      </div>

      <div>
        <FieldLabel optional>Search checkpoint</FieldLabel>
        <CheckpointSearch
          value={point.search}
          error={errors.search}
          onChange={(search) => {
            const next = { search };
            if (!isFilled(point.name) || point.name === point.search) {
              next.name = search;
            }
            update(next);
          }}
          onSelect={(item) =>
            update({
              search: item.search,
              name: item.name,
              lat: sanitizeCoordinate(item.lat),
              lng: sanitizeCoordinate(item.lng),
            })
          }
          onCreate={(query) =>
            update({
              search: query,
              name: isFilled(point.name) && point.name !== point.search ? point.name : query,
            })
          }
        />
        <MainLayoutColor
          as={MainLayoutTextSize}
          color="muted"
          size="captionText"
          className="block mt-1.5 font-normal"
        >
          Pick a suggestion or add a new point with name and coordinates
        </MainLayoutColor>
        <ErrorText message={errors.search} />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <FieldLabel required>Latitude</FieldLabel>
          <input
            type="text"
            inputMode="decimal"
            pattern="[0-9.]*"
            value={point.lat}
            onChange={(event) => update({ lat: sanitizeCoordinate(event.target.value) })}
            placeholder="28.6139"
            className={inputClass(errors.lat)}
          />
          <ErrorText message={errors.lat} />
        </div>
        <div>
          <FieldLabel required>Longitude</FieldLabel>
          <input
            type="text"
            inputMode="decimal"
            pattern="[0-9.]*"
            value={point.lng}
            onChange={(event) => update({ lng: sanitizeCoordinate(event.target.value) })}
            placeholder="77.2090"
            className={inputClass(errors.lng)}
          />
          <ErrorText message={errors.lng} />
        </div>
      </div>

      <div>
        <FieldLabel required>Name</FieldLabel>
        <input
          type="text"
          value={point.name}
          onChange={(event) => update({ name: event.target.value })}
          placeholder="Checkpoint name"
          className={inputClass(errors.name)}
        />
        <ErrorText message={errors.name} />
      </div>
    </div>
  );
}

function StopDragHandle({ disabled, isDragging, onPointerDown }) {
  if (disabled) return null;

  return (
    <span
      role="button"
      tabIndex={0}
      aria-label="Drag to reorder stop"
      title="Drag to reorder"
      onPointerDown={onPointerDown}
      className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-md touch-none ${
        isDragging
          ? "cursor-grabbing text-white bg-white/10"
          : "cursor-grab text-[#71717a] hover:text-white hover:bg-white/5"
      }`}
    >
      <GripVertical size={14} />
    </span>
  );
}

function StopDragGhost({ stop, title, width, x, y, ghostRef }) {
  if (!stop) return null;

  return createPortal(
    <div
      ref={ghostRef}
      className="fixed top-0 left-0 z-[1200] pointer-events-none will-change-transform"
      style={{
        width,
        transform: `translate3d(${x}px, ${y}px, 0) scale(1.03) rotate(1deg)`,
      }}
    >
      <div className="rounded-xl border border-[#FDB914] bg-[#1a1a1e] p-4 shadow-[0_20px_50px_rgba(0,0,0,0.55)]">
        <div className="flex items-center gap-2 min-w-0">
          <MainLayoutColor as={GripVertical} color="yellow" className="shrink-0" size={14} />
          <MainLayoutColor as={MapPin} color="yellow" className="shrink-0" size={13} />
          <span className="text-white text-[12px] font-medium truncate">{title}</span>
        </div>
        <p className="mt-2 text-[12px] text-[#a1a1aa] truncate">
          {stop.name || stop.search || "New stop"}
        </p>
        {isFilled(stop.lat) || isFilled(stop.lng) ? (
          <p className="mt-1 text-[11px] text-[#71717a]">
            {stop.lat || "—"}, {stop.lng || "—"}
          </p>
        ) : null}
      </div>
    </div>,
    document.body,
  );
}

function ReviewRow({ label, value, error }) {
  return (
    <div className="py-1.5">
      <div className="flex items-start justify-between gap-4">
        <MainLayoutColor
          as={MainLayoutTextSize}
          color="muted"
          size="subInfoText"
          className="font-normal shrink-0"
        >
          {label}
        </MainLayoutColor>
        <MainLayoutColor
          as={MainLayoutTextSize}
          color={error ? "expiredText" : "title"}
          size="subInfoText"
          className="text-right"
        >
          {error ? "—" : value || "—"}
        </MainLayoutColor>
      </div>
      <ErrorText message={error} />
    </div>
  );
}

function ReviewSection({ title, onEdit, children }) {
  return (
    <div className="pb-5 mb-5 border-b border-[#27272a] last:border-b-0 last:mb-0 last:pb-0">
      <div className="flex items-center justify-between gap-2 mb-3">
        <MainLayoutColor
          as={MainLayoutTextSize}
          color="title"
          size="sectionTitle"
          className="font-medium tracking-tight"
        >
          {title}
        </MainLayoutColor>
        <button
          type="button"
          onClick={onEdit}
          className="hover:underline underline-offset-2 cursor-pointer"
        >
          <MainLayoutColor
            as={MainLayoutTextSize}
            color="yellow"
            size="subInfoText"
            className="font-medium"
          >
            Edit
          </MainLayoutColor>
        </button>
      </div>
      {children}
    </div>
  );
}

function collectErrors(form) {
  const errors = {};

  if (!isFilled(form.vehicle)) errors.vehicle = "Vehicle is required";
  if (!isFilled(form.reportingStart)) {
    errors.reportingStart = "Start date & time is required";
  }
  if (!isFilled(form.reportingEnd)) {
    errors.reportingEnd = "End date & time is required";
  }
  if (
    isFilled(form.reportingStart) &&
    isFilled(form.reportingEnd) &&
    !isEndAfterStart(form.reportingStart, form.reportingEnd)
  ) {
    errors.reportingEnd = "End date & time must be after the start";
  }
  if (
    isFilled(form.reportingStart) &&
    new Date(form.reportingStart) < new Date(Date.now() - 60_000)
  ) {
    errors.reportingStart = "Start date & time cannot be in the past";
  }
  // if (!isFilled(form.tripType)) errors.tripType = "Trip type is required";

  if (form.temperatureEnabled) {
    if (!isFilled(form.tempMin)) errors.tempMin = "Min temperature is required";
    if (!isFilled(form.tempMax)) errors.tempMax = "Max temperature is required";
    if (
      isFilled(form.tempMin) &&
      isFilled(form.tempMax) &&
      Number(form.tempMax) <= Number(form.tempMin)
    ) {
      errors.tempMax = "Max must be greater than min";
    }
  }

  function pointErrors(point, prefix, label) {
    if (!isFilled(point.lat)) {
      errors[`${prefix}.lat`] = `${label} latitude is required`;
    } else if (!isValidCoordinate(point.lat)) {
      errors[`${prefix}.lat`] = `${label} latitude must be a number`;
    }
    if (!isFilled(point.lng)) {
      errors[`${prefix}.lng`] = `${label} longitude is required`;
    } else if (!isValidCoordinate(point.lng)) {
      errors[`${prefix}.lng`] = `${label} longitude must be a number`;
    }
    if (!isFilled(point.name)) {
      errors[`${prefix}.name`] = `${label} name is required`;
    }
  }

  pointErrors(form.startPoint, "startPoint", "Start point");
  pointErrors(form.endPoint, "endPoint", "End point");
  form.stops.forEach((stop, index) =>
    pointErrors(stop, `stops.${index}`, `Stop ${index + 1}`),
  );

  return errors;
}

function pointFieldErrors(errors, prefix) {
  return {
    search: errors[`${prefix}.search`],
    lat: errors[`${prefix}.lat`],
    lng: errors[`${prefix}.lng`],
    name: errors[`${prefix}.name`],
  };
}

function formatPoint(point) {
  if (!isFilled(point.name) && !isFilled(point.search)) return "—";
  const coords =
    isFilled(point.lat) && isFilled(point.lng)
      ? ` (${point.lat}, ${point.lng})`
      : "";
  return `${point.name || point.search}${coords}`;
}

function reorderList(list, fromIndex, toIndex) {
  if (
    fromIndex === toIndex ||
    fromIndex < 0 ||
    toIndex < 0 ||
    fromIndex >= list.length ||
    toIndex >= list.length
  ) {
    return list;
  }
  const next = [...list];
  const [item] = next.splice(fromIndex, 1);
  next.splice(toIndex, 0, item);
  return next;
}

function remapStopFieldErrors(errors, fromIndex, toIndex, stopCount) {
  if (fromIndex === toIndex || stopCount < 2) return errors;
  const fields = ["search", "lat", "lng", "name"];
  const hasStopErrors = Object.keys(errors).some((key) =>
    key.startsWith("stops."),
  );
  if (!hasStopErrors) return errors;

  const groups = Array.from({ length: stopCount }, (_, index) => {
    const group = {};
    for (const field of fields) {
      group[field] = errors[`stops.${index}.${field}`];
    }
    return group;
  });
  const nextGroups = reorderList(groups, fromIndex, toIndex);
  const next = { ...errors };
  for (const key of Object.keys(next)) {
    if (key.startsWith("stops.")) delete next[key];
  }
  nextGroups.forEach((group, index) => {
    for (const field of fields) {
      if (group[field]) next[`stops.${index}.${field}`] = group[field];
    }
  });
  return next;
}

export default function AssignVehicleFormSlider({
  isOpen,
  onClose,
  onSubmit,
}) {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState(emptyForm);
  const [errors, setErrors] = useState({});
  const [showStepErrors, setShowStepErrors] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [dragState, setDragState] = useState(null);
  const stopListRef = useRef(null);
  const stopsRef = useRef([]);
  const draggingStopIdRef = useRef(null);
  const dragStateRef = useRef(null);
  const ghostRef = useRef(null);
  const itemRectsRef = useRef(new Map());

  stopsRef.current = form.stops;

  useEffect(() => {
    if (!isOpen) return;
    setStep(0);
    setForm(emptyForm());
    setErrors({});
    setShowStepErrors(false);
    setIsSubmitting(false);
    setDragState(null);
    draggingStopIdRef.current = null;
    dragStateRef.current = null;
    itemRectsRef.current.clear();
  }, [isOpen]);

  function patchForm(patch) {
    setForm((prev) => ({ ...prev, ...patch }));
  }

  function clearFilledPointErrors(prefix, point) {
    setErrors((prev) => {
      const next = { ...prev };
      let changed = false;

      if (prev[`${prefix}.lat`] && isFilled(point.lat) && isValidCoordinate(point.lat)) {
        next[`${prefix}.lat`] = "";
        changed = true;
      }
      if (prev[`${prefix}.lng`] && isFilled(point.lng) && isValidCoordinate(point.lng)) {
        next[`${prefix}.lng`] = "";
        changed = true;
      }
      if (prev[`${prefix}.name`] && isFilled(point.name)) {
        next[`${prefix}.name`] = "";
        changed = true;
      }
      if (prev[`${prefix}.search`] && isFilled(point.search)) {
        next[`${prefix}.search`] = "";
        changed = true;
      }

      return changed ? next : prev;
    });
  }

  function goToReview() {
    const nextErrors = collectErrors(form);
    setErrors(nextErrors);
    setShowStepErrors(true);

    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    setStep(1);
  }

  function goToForm() {
    setStep(0);
  }

  function resetStopDrag() {
    draggingStopIdRef.current = null;
    dragStateRef.current = null;
    itemRectsRef.current.clear();
    const container = stopListRef.current;
    if (container) {
      container.querySelectorAll("[data-stop-id]").forEach((node) => {
        node.style.transition = "";
        node.style.transform = "";
      });
    }
    setDragState(null);
  }

  function snapshotStopRects() {
    const container = stopListRef.current;
    if (!container) return;
    const next = new Map();
    container.querySelectorAll("[data-stop-id]").forEach((node) => {
      next.set(node.dataset.stopId, node.getBoundingClientRect());
    });
    itemRectsRef.current = next;
  }

  function getInsertIndex(clientY) {
    const draggingId = draggingStopIdRef.current;
    const stops = stopsRef.current;
    const container = stopListRef.current;
    if (!draggingId || !container || stops.length < 2) return -1;

    const fromIndex = stops.findIndex((stop) => stop.id === draggingId);
    if (fromIndex < 0) return -1;

    const nodes = Array.from(container.querySelectorAll("[data-stop-id]"));
    for (const node of nodes) {
      const id = node.dataset.stopId;
      if (id === draggingId) continue;
      const rect = node.getBoundingClientRect();
      if (clientY < rect.top + rect.height / 2) {
        const index = stops.findIndex((stop) => stop.id === id);
        if (index < 0) continue;
        return index > fromIndex ? index - 1 : index;
      }
    }

    return stops.length - 1;
  }

  function moveStop(fromIndex, toIndex) {
    snapshotStopRects();
    setForm((prev) => {
      const nextStops = reorderList(prev.stops, fromIndex, toIndex);
      if (nextStops === prev.stops) return prev;
      return { ...prev, stops: nextStops };
    });
    setErrors((prev) =>
      remapStopFieldErrors(prev, fromIndex, toIndex, stopsRef.current.length),
    );
  }

  function handleStopPointerDown(event, stopId) {
    if (stopsRef.current.length < 2) return;
    if (event.button !== undefined && event.button !== 0) return;

    const card = event.currentTarget.closest("[data-stop-id]");
    if (!card) return;

    event.preventDefault();
    event.stopPropagation();

    const rect = card.getBoundingClientRect();
    const nextState = {
      id: stopId,
      width: rect.width,
      height: rect.height,
      x: rect.left,
      y: rect.top,
      grabX: event.clientX - rect.left,
      grabY: event.clientY - rect.top,
    };

    draggingStopIdRef.current = stopId;
    dragStateRef.current = nextState;
    setDragState(nextState);
  }

  useLayoutEffect(() => {
    if (!dragState) return;
    const container = stopListRef.current;
    if (!container) return;

    container.querySelectorAll("[data-stop-id]").forEach((node) => {
      const first = itemRectsRef.current.get(node.dataset.stopId);
      if (!first) return;
      const last = node.getBoundingClientRect();
      const dy = first.top - last.top;
      if (Math.abs(dy) < 1) return;
      node.style.transition = "none";
      node.style.transform = `translateY(${dy}px)`;
      void node.offsetHeight;
      node.style.transition = "transform 220ms cubic-bezier(0.2, 0, 0, 1)";
      node.style.transform = "translateY(0)";
    });
  }, [form.stops, dragState]);

  useEffect(() => {
    if (!dragState) return;

    const previousCursor = document.body.style.cursor;
    const previousSelect = document.body.style.userSelect;
    document.body.style.cursor = "grabbing";
    document.body.style.userSelect = "none";

    function onMove(event) {
      const state = dragStateRef.current;
      if (!state) return;

      const x = event.clientX - state.grabX;
      const y = event.clientY - state.grabY;
      state.x = x;
      state.y = y;

      if (ghostRef.current) {
        ghostRef.current.style.transform = `translate3d(${x}px, ${y}px, 0) scale(1.03) rotate(1deg)`;
      }

      const fromIndex = stopsRef.current.findIndex((stop) => stop.id === state.id);
      const toIndex = getInsertIndex(event.clientY);
      if (fromIndex >= 0 && toIndex >= 0 && fromIndex !== toIndex) {
        moveStop(fromIndex, toIndex);
      }
    }

    function onUp() {
      document.body.style.cursor = previousCursor;
      document.body.style.userSelect = previousSelect;
      resetStopDrag();
    }

    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
    window.addEventListener("pointercancel", onUp);
    return () => {
      document.body.style.cursor = previousCursor;
      document.body.style.userSelect = previousSelect;
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
      window.removeEventListener("pointercancel", onUp);
    };
  }, [dragState?.id]);

  async function handleFinish() {
    const nextErrors = collectErrors(form);
    setErrors(nextErrors);
    setShowStepErrors(true);

    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    const payload = {
      driver: form.driver || null,
      vehicle: form.vehicle,
      reportingStart: form.reportingStart,
      reportingEnd: form.reportingEnd,
      // tripType: form.tripType,
      temperature: form.temperatureEnabled
        ? { min: Number(form.tempMin), max: Number(form.tempMax) }
        : null,
      startPoint: form.startPoint,
      stops: form.stops,
      endPoint: form.endPoint,
    };

    try {
      setIsSubmitting(true);
      await onSubmit?.(payload);
      onClose?.();
    } catch {
    } finally {
      setIsSubmitting(false);
    }
  }

  const hasFormErrors = Object.values(errors).some(Boolean);
  const errorStepIds = showStepErrors && hasFormErrors ? ["form"] : [];
  // const tripTypeLabel =
  //   TRIP_TYPES.find((item) => item.value === form.tripType)?.label || "";

  return (
    <FormSlider
      title="Assign Vehicle"
      isOpen={isOpen}
      onClose={onClose}
      closeConfirmTitle="Are you sure you want to close?"
      closeConfirmMessage="All the info you've entered for this vehicle assignment will be lost."
      steps={STEPS}
      currentStep={step}
      errorStepIds={errorStepIds}
      onStepSelect={(index) => {
        if (index === 1) goToReview();
        else goToForm();
      }}
      footer={
        step === 0 ? (
          <FooterButton onClick={goToReview}>Next</FooterButton>
        ) : (
          <>
            <FooterButton variant="secondary" onClick={goToForm}>
              Back
            </FooterButton>
            <FooterButton onClick={handleFinish} disabled={isSubmitting}>
              {isSubmitting ? "Assigning..." : "Finish"}
            </FooterButton>
          </>
        )
      }
    >
      {step === 0 ? (
        <form className="flex flex-col gap-8" onSubmit={(event) => event.preventDefault()}>
          <section>
            <SectionHeader title="Schedule" />
            <div className="flex flex-col gap-5">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <FieldLabel required>Start Date & Time</FieldLabel>
                  <input
                    type="datetime-local"
                    value={form.reportingStart}
                    min={getNowLocalValue()}
                    max={form.reportingEnd || undefined}
                    onChange={(event) => {
                      const reportingStart = event.target.value;
                      const next = { reportingStart };
                      const nextErrors = { ...errors, reportingStart: "" };

                      if (
                        isFilled(reportingStart) &&
                        isFilled(form.reportingEnd) &&
                        !isEndAfterStart(reportingStart, form.reportingEnd)
                      ) {
                        next.reportingEnd = "";
                        nextErrors.reportingEnd = "";
                      }

                      patchForm(next);
                      setErrors(nextErrors);
                    }}
                    className={inputClass(errors.reportingStart)}
                  />
                  <ErrorText message={errors.reportingStart} />
                </div>
                <div>
                  <FieldLabel required>End Date & Time</FieldLabel>
                  <input
                    type="datetime-local"
                    value={form.reportingEnd}
                    min={form.reportingStart || getNowLocalValue()}
                    disabled={!isFilled(form.reportingStart)}
                    onChange={(event) => {
                      const reportingEnd = event.target.value;

                      if (
                        isFilled(form.reportingStart) &&
                        isFilled(reportingEnd) &&
                        !isEndAfterStart(form.reportingStart, reportingEnd)
                      ) {
                        setErrors((prev) => ({
                          ...prev,
                          reportingEnd: "End date & time must be after the start",
                        }));
                        return;
                      }

                      patchForm({ reportingEnd });
                      setErrors((prev) => ({ ...prev, reportingEnd: "" }));
                    }}
                    className={`${inputClass(errors.reportingEnd)} disabled:opacity-50 disabled:cursor-not-allowed`}
                  />
                  <ErrorText message={errors.reportingEnd} />
                  {!isFilled(form.reportingStart) ? (
                    <MainLayoutColor
                      as={MainLayoutTextSize}
                      color="muted"
                      size="captionText"
                      className="block mt-1.5 font-normal"
                    >
                      Select a start date & time first
                    </MainLayoutColor>
                  ) : null}
                </div>
                {/* <div>
                  <FieldLabel required>Trip type</FieldLabel>
                  <MainDropDown
                    fullWidth
                    label="Select trip type"
                    options={TRIP_TYPES}
                    selectedValue={form.tripType}
                    onSelect={(tripType) => {
                      patchForm({ tripType });
                      if (errors.tripType) {
                        setErrors((prev) => ({ ...prev, tripType: "" }));
                      }
                    }}
                    className={dropdownClass(errors.tripType)}
                  />
                  <ErrorText message={errors.tripType} />
                </div> */}
              </div>

            </div>
          </section>

          <section>
            <SectionHeader title="Assignment" />
            <div className="grid grid-cols-2 gap-4">
              <div>
                <FieldLabel required>Vehicle</FieldLabel>
                <MainDropDown
                  fullWidth
                  label="Select a vehicle"
                  options={ASSIGN_VEHICLE_OPTIONS}
                  selectedValue={form.vehicle}
                  onSelect={(vehicle) => {
                    patchForm({ vehicle });
                    if (errors.vehicle) {
                      setErrors((prev) => ({ ...prev, vehicle: "" }));
                    }
                  }}
                  className={dropdownClass(errors.vehicle)}
                />
                <ErrorText message={errors.vehicle} />
              </div>

              <div>
                <FieldLabel optional>Driver</FieldLabel>
                <input
                  type="text"
                  value={form.driver}
                  onChange={(event) => patchForm({ driver: event.target.value })}
                  placeholder="Enter driver name"
                  className={inputClass(false)}
                />
              </div>

              <div className="flex items-center justify-between px-3.5 py-3 rounded-xl bg-[#18181b]/60 border border-[#27272a]">
                <MainLayoutColor
                  as={MainLayoutTextSize}
                  color="subtitle"
                  size="subInfoText"
                  className="font-medium leading-none"
                >
                  Enable Temperature
                </MainLayoutColor>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={form.temperatureEnabled}
                    onChange={(event) =>
                      patchForm({
                        temperatureEnabled: event.target.checked,
                        tempMin: event.target.checked ? form.tempMin : "",
                        tempMax: event.target.checked ? form.tempMax : "",
                      })
                    }
                    className="sr-only peer"
                  />
                  <div className="w-8 h-4.5 bg-[#27272a] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-3.5 after:w-3.5 after:transition-all peer-checked:bg-[var(--color-yellow,#FDB914)]" />
                </label>
              </div>

              {form.temperatureEnabled ? (
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <FieldLabel required>Min (°C)</FieldLabel>
                    <input
                      type="number"
                      value={form.tempMin}
                      onChange={(event) => patchForm({ tempMin: event.target.value })}
                      placeholder="-10"
                      className={inputClass(errors.tempMin)}
                    />
                    <ErrorText message={errors.tempMin} />
                  </div>
                  <div>
                    <FieldLabel required>Max (°C)</FieldLabel>
                    <input
                      type="number"
                      value={form.tempMax}
                      onChange={(event) => patchForm({ tempMax: event.target.value })}
                      placeholder="8"
                      className={inputClass(errors.tempMax)}
                    />
                    <ErrorText message={errors.tempMax} />
                  </div>
                </div>
              ) : null}
            </div>
          </section>

          <section>
            <SectionHeader
              title="Route Points"
              action={
                <button
                  type="button"
                  onClick={() => patchForm({ stops: [...form.stops, createPoint()] })}
                  className="inline-flex items-center gap-1.5 hover:underline underline-offset-2 cursor-pointer"
                >
                  <MainLayoutColor as={Plus} color="yellow" className="shrink-0" size={13} />
                  <MainLayoutColor
                    as={MainLayoutTextSize}
                    color="yellow"
                    size="subInfoText"
                    className="font-medium"
                  >
                    Add Stop
                  </MainLayoutColor>
                </button>
              }
            />
            {form.stops.length > 1 ? (
              <MainLayoutColor
                as={MainLayoutTextSize}
                color="muted"
                size="captionText"
                className="block -mt-2 mb-4 font-normal"
              >
                Drag stops to reorder. Start and end points stay fixed.
              </MainLayoutColor>
            ) : null}
            <div ref={stopListRef} className="flex flex-col gap-5">
              <PointCard
                title="Start Point"
                point={form.startPoint}
                errors={pointFieldErrors(errors, "startPoint")}
                onChange={(startPoint) => {
                  patchForm({ startPoint });
                  clearFilledPointErrors("startPoint", startPoint);
                }}
              />

              {form.stops.map((stop, index) => {
                const isDragging = dragState?.id === stop.id;

                return (
                  <div
                    key={stop.id}
                    data-stop-id={stop.id}
                    className={isDragging ? "relative z-10" : ""}
                  >
                    {isDragging ? (
                      <div
                        className="rounded-xl border border-dashed border-[#FDB914]/45 bg-[#FDB914]/5"
                        style={{ height: dragState.height }}
                        aria-hidden="true"
                      />
                    ) : (
                      <PointCard
                        title={`Stop ${index + 1}`}
                        point={stop}
                        errors={pointFieldErrors(errors, `stops.${index}`)}
                        dragHandle={
                          <StopDragHandle
                            disabled={form.stops.length < 2}
                            isDragging={false}
                            onPointerDown={(event) =>
                              handleStopPointerDown(event, stop.id)
                            }
                          />
                        }
                        onChange={(updated) => {
                          const next = [...form.stops];
                          next[index] = updated;
                          patchForm({ stops: next });
                          clearFilledPointErrors(`stops.${index}`, updated);
                        }}
                        onRemove={() =>
                          patchForm({
                            stops: form.stops.filter((_, stopIndex) => stopIndex !== index),
                          })
                        }
                      />
                    )}
                  </div>
                );
              })}

              <PointCard
                title="End Point"
                point={form.endPoint}
                errors={pointFieldErrors(errors, "endPoint")}
                onChange={(endPoint) => {
                  patchForm({ endPoint });
                  clearFilledPointErrors("endPoint", endPoint);
                }}
              />
            </div>
            {dragState ? (
              <StopDragGhost
                ghostRef={ghostRef}
                stop={form.stops.find((stop) => stop.id === dragState.id)}
                title={`Stop ${(form.stops.findIndex((stop) => stop.id === dragState.id) + 1) || ""}`}
                width={dragState.width}
                x={dragState.x}
                y={dragState.y}
              />
            ) : null}
          </section>
        </form>
      ) : (
        <div className="flex flex-col gap-3">
          <div className="pb-3 mb-1 border-b border-[#27272a]">
            <MainLayoutColor
              as={MainLayoutTextSize}
              color="title"
              size="sectionTitle"
              className="font-medium tracking-tight block"
            >
              Review and finish
            </MainLayoutColor>
            <MainLayoutColor
              as={MainLayoutTextSize}
              color="subtitle"
              size="subInfoText"
              className="mt-1 block"
            >
              Review the trip details and confirm the vehicle and driver assignment before finishing.
            </MainLayoutColor>
          </div>

          <ReviewSection title="Vehicle and driver" onEdit={goToForm}>
            <ReviewRow
              label="Vehicle"
              value={form.vehicle}
              error={errors.vehicle}
            />
            <ReviewRow label="Driver" value={form.driver || "Not assigned"} />
          </ReviewSection>

          <ReviewSection title="Reporting window" onEdit={goToForm}>
            <ReviewRow
              label="Start"
              value={formatDateTime(form.reportingStart)}
              error={errors.reportingStart}
            />
            <ReviewRow
              label="End"
              value={formatDateTime(form.reportingEnd)}
              error={errors.reportingEnd}
            />
          </ReviewSection>

          {/* <ReviewSection title="Trip type" onEdit={goToForm}>
            <ReviewRow
              label="Type"
              value={tripTypeLabel}
              error={errors.tripType}
            />
          </ReviewSection> */}

          <ReviewSection title="Temperature" onEdit={goToForm}>
            <ReviewRow
              label="Monitoring"
              value={form.temperatureEnabled ? "On" : "Off"}
            />
            {form.temperatureEnabled ? (
              <>
                <ReviewRow
                  label="Min"
                  value={form.tempMin ? `${form.tempMin}°C` : "—"}
                  error={errors.tempMin}
                />
                <ReviewRow
                  label="Max"
                  value={form.tempMax ? `${form.tempMax}°C` : "—"}
                  error={errors.tempMax}
                />
              </>
            ) : null}
          </ReviewSection>

          <ReviewSection title="Route" onEdit={goToForm}>
            <ReviewRow
              label="Start"
              value={formatPoint(form.startPoint)}
              error={
                errors["startPoint.search"] ||
                errors["startPoint.name"] ||
                errors["startPoint.lat"] ||
                errors["startPoint.lng"]
              }
            />
            {form.stops.map((stop, index) => (
              <ReviewRow
                key={stop.id}
                label={`Stop ${index + 1}`}
                value={formatPoint(stop)}
                error={
                  errors[`stops.${index}.search`] ||
                  errors[`stops.${index}.name`] ||
                  errors[`stops.${index}.lat`] ||
                  errors[`stops.${index}.lng`]
                }
              />
            ))}
            <ReviewRow
              label="End"
              value={formatPoint(form.endPoint)}
              error={
                errors["endPoint.search"] ||
                errors["endPoint.name"] ||
                errors["endPoint.lat"] ||
                errors["endPoint.lng"]
              }
            />
          </ReviewSection>
        </div>
      )}
    </FormSlider>
  );
}
