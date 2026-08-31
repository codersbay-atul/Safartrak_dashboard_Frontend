import React, { useEffect, useMemo, useRef, useState } from "react";
import { MapPin, Plus, Search, X } from "lucide-react";
import FormSlider from "../../components/Ui/MainLayoutUI/FormSlider";
import MainDropDown from "../../components/Ui/MainLayoutUI/MainDropDown";
import MainLayoutColor from "../../components/Ui/MainLayoutUI/MainLayoutColor";
import MainLayoutTextSize from "../../components/Ui/MainLayoutUI/MainLayoutTextSize";
import MainHeaderActionButton from "../../components/Ui/MainLayoutUI/MainHeaderActionButton";
import { toast } from "../../components/Ui/toast";
import {
  ASSIGN_VEHICLE_OPTIONS,
  CHECKPOINT_SUGGESTIONS,
} from "./assignVehicleData";

const STEPS = [
  { id: "form", label: "Trip details" },
  { id: "review", label: "Review and finish" },
];

const TRIP_TYPES = [
  { label: "Intra City", value: "intra" },
  { label: "Inter City", value: "inter" },
];

const INPUT_BASE =
  "w-full bg-[#18181b]/60 border focus:border-[var(--color-yellow,#ffd60a)] rounded-xl px-3 py-2.5 text-white text-[12px] font-medium placeholder-[#52525b] focus:outline-none transition-all [color-scheme:dark]";

const DROPDOWN_BASE =
  "w-full justify-between rounded-xl bg-[#18181b]/60 py-2.5 px-3 text-white text-[12px] font-medium focus:border-[var(--color-yellow,#ffd60a)]";

function inputClass(hasError) {
  return `${INPUT_BASE} ${
    hasError ? "!border-rose-500 ring-1 ring-rose-500/50" : "border-[#27272a]"
  }`;
}

function dropdownClass(hasError) {
  return `${DROPDOWN_BASE} ${
    hasError ? "!border-rose-500 ring-1 ring-rose-500/50" : "border-[#27272a]"
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
    tripType: "",
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

function FieldLabel({ children, optional = false, required = false }) {
  return (
    <div className="flex items-center justify-between gap-2 mb-2">
      <MainLayoutColor
        as={MainLayoutTextSize}
        color="subtitle"
        size="subInfoText"
        className="font-medium"
      >
        {children}
        {required ? <span className="text-rose-500"> *</span> : null}
      </MainLayoutColor>
      {optional ? (
        <span className="text-[11px] text-[#71717a] italic font-medium">Optional</span>
      ) : null}
    </div>
  );
}

function ErrorText({ message }) {
  if (!message) return null;
  return (
    <p className="text-rose-500 text-[10px] mt-1 leading-tight">{message}</p>
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
  const isSecondary = variant === "secondary";
  return (
    <MainHeaderActionButton
      type="button"
      variant={isSecondary ? "secondary" : "primary"}
      className={
        isSecondary
          ? "h-8 min-w-[84px] px-3.5 rounded-lg bg-[#18181b] hover:bg-[#27272a] text-[#a1a1aa] hover:text-white border border-[#27272a] cursor-pointer disabled:opacity-50"
          : "h-8 min-w-[84px] px-3.5 rounded-lg text-black bg-[var(--color-yellow,#ffd60a)] hover:bg-[var(--color-yellow-hover,#e6c200)] border border-[var(--color-yellow,#ffd60a)] cursor-pointer disabled:opacity-60"
      }
      {...props}
    >
      <span
        className={`text-[13px] font-medium whitespace-nowrap leading-none ${
          isSecondary ? "" : "text-black"
        }`}
      >
        {children}
      </span>
    </MainHeaderActionButton>
  );
}

function CheckpointSearch({ value, onChange, onSelect, error }) {
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
        placeholder="Search checkpoint"
        className={`${inputClass(error)} pl-8`}
      />
      {isOpen && matches.length > 0 ? (
        <div className="absolute left-0 right-0 mt-1.5 z-30 rounded-xl border border-[#22252B] bg-[#0f1115] shadow-2xl overflow-hidden max-h-48 overflow-y-auto custom-scrollbar">
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
        </div>
      ) : null}
    </div>
  );
}

function PointCard({ title, point, onChange, onRemove, errors = {} }) {
  function update(patch) {
    onChange({ ...point, ...patch });
  }

  return (
    <div className="rounded-xl border border-[#27272a] bg-[#18181b]/40 p-4 flex flex-col gap-4">
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2 min-w-0">
          <MapPin size={13} className="text-[#ffd60a] shrink-0" />
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
        <FieldLabel required>Search checkpoint</FieldLabel>
        <CheckpointSearch
          value={point.search}
          error={errors.search}
          onChange={(search) => update({ search })}
          onSelect={(item) =>
            update({
              search: item.search,
              name: item.name,
              lat: item.lat,
              lng: item.lng,
            })
          }
        />
        <ErrorText message={errors.search} />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <FieldLabel required>Latitude</FieldLabel>
          <input
            type="text"
            inputMode="decimal"
            value={point.lat}
            onChange={(event) => update({ lat: event.target.value })}
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
            value={point.lng}
            onChange={(event) => update({ lng: event.target.value })}
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

function ReviewError({ message }) {
  return (
    <div className="flex items-center gap-2 rounded-lg bg-[#450A0A] border border-[#7f1d1d]/60 px-3 py-2">
      <span className="flex h-4 w-4 items-center justify-center rounded-full bg-[#ef4444] text-white shrink-0">
        <X size={9} strokeWidth={3} />
      </span>
      <span className="text-[12px] text-[#FCA5A5] font-medium leading-tight">
        {message}
      </span>
    </div>
  );
}

function ReviewRow({ label, value }) {
  return (
    <div className="flex items-start justify-between gap-4 py-1.5">
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
        color="title"
        size="subInfoText"
        className="text-right"
      >
        {value || "—"}
      </MainLayoutColor>
    </div>
  );
}

function ReviewSection({ title, onEdit, errors = [], children }) {
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
          className="text-[#ffd60a] text-[12px] font-medium hover:underline underline-offset-2 cursor-pointer"
        >
          Edit
        </button>
      </div>
      {errors.length > 0 ? (
        <div className="flex flex-col gap-1.5 mb-3">
          {errors.map((message) => (
            <ReviewError key={message} message={message} />
          ))}
        </div>
      ) : (
        children
      )}
    </div>
  );
}

function collectErrors(form) {
  const errors = {};

  if (!isFilled(form.vehicle)) errors.vehicle = "Please provide a vehicle.";
  if (!isFilled(form.reportingStart)) {
    errors.reportingStart = "Please provide a data reporting start time.";
  }
  if (!isFilled(form.reportingEnd)) {
    errors.reportingEnd = "Please provide a data reporting end time.";
  }
  if (
    isFilled(form.reportingStart) &&
    isFilled(form.reportingEnd) &&
    new Date(form.reportingEnd) <= new Date(form.reportingStart)
  ) {
    errors.reportingEnd = "End time must be after the start time.";
  }
  if (!isFilled(form.tripType)) errors.tripType = "Please select a trip type.";

  if (form.temperatureEnabled) {
    if (!isFilled(form.tempMin)) errors.tempMin = "Please provide a minimum temperature.";
    if (!isFilled(form.tempMax)) errors.tempMax = "Please provide a maximum temperature.";
    if (
      isFilled(form.tempMin) &&
      isFilled(form.tempMax) &&
      Number(form.tempMax) <= Number(form.tempMin)
    ) {
      errors.tempMax = "Maximum must be greater than minimum.";
    }
  }

  function pointErrors(point, prefix) {
    if (!isFilled(point.search) && !isFilled(point.name)) {
      errors[`${prefix}.search`] = "Please search or name this checkpoint.";
    }
    if (!isFilled(point.lat)) errors[`${prefix}.lat`] = "Please provide latitude.";
    if (!isFilled(point.lng)) errors[`${prefix}.lng`] = "Please provide longitude.";
    if (!isFilled(point.name)) errors[`${prefix}.name`] = "Please provide a name.";
  }

  pointErrors(form.startPoint, "startPoint");
  pointErrors(form.endPoint, "endPoint");
  form.stops.forEach((stop, index) => pointErrors(stop, `stops.${index}`));

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

  useEffect(() => {
    if (!isOpen) return;
    setStep(0);
    setForm(emptyForm());
    setErrors({});
    setShowStepErrors(false);
    setIsSubmitting(false);
  }, [isOpen]);

  function patchForm(patch) {
    setForm((prev) => ({ ...prev, ...patch }));
  }

  function goToReview() {
    const nextErrors = collectErrors(form);
    setErrors(nextErrors);
    setShowStepErrors(true);
    setStep(1);
  }

  function goToForm() {
    setStep(0);
  }

  async function handleFinish() {
    const nextErrors = collectErrors(form);
    setErrors(nextErrors);
    setShowStepErrors(true);

    if (Object.keys(nextErrors).length > 0) {
      toast.error("Please fix the highlighted fields before finishing.");
      return;
    }

    const payload = {
      driver: form.driver || null,
      vehicle: form.vehicle,
      reportingStart: form.reportingStart,
      reportingEnd: form.reportingEnd,
      tripType: form.tripType,
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
      toast.success("Vehicle assigned successfully.");
      onClose?.();
    } catch (error) {
      toast.error(error?.message || "Failed to assign vehicle.");
    } finally {
      setIsSubmitting(false);
    }
  }

  const hasFormErrors = Object.keys(errors).length > 0;
  const errorStepIds = showStepErrors && hasFormErrors ? ["form"] : [];
  const tripTypeLabel =
    TRIP_TYPES.find((item) => item.value === form.tripType)?.label || "";

  const routeErrors = [
    errors["startPoint.search"] || errors["startPoint.name"]
      ? "Please provide a start point."
      : null,
    errors["endPoint.search"] || errors["endPoint.name"]
      ? "Please provide an end point."
      : null,
    ...form.stops.map((_, index) =>
      errors[`stops.${index}.search`] || errors[`stops.${index}.name`]
        ? `Please complete stop ${index + 1}.`
        : null,
    ),
  ].filter(Boolean);

  return (
    <FormSlider
      title="Assign Vehicle"
      isOpen={isOpen}
      onClose={onClose}
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
                  <FieldLabel required>Data reporting start</FieldLabel>
                  <input
                    type="datetime-local"
                    value={form.reportingStart}
                    onChange={(event) => {
                      patchForm({ reportingStart: event.target.value });
                      if (errors.reportingStart) {
                        setErrors((prev) => ({ ...prev, reportingStart: "" }));
                      }
                    }}
                    className={inputClass(errors.reportingStart)}
                  />
                  <ErrorText message={errors.reportingStart} />
                </div>
                <div>
                  <FieldLabel required>Data reporting end</FieldLabel>
                  <input
                    type="datetime-local"
                    value={form.reportingEnd}
                    onChange={(event) => {
                      patchForm({ reportingEnd: event.target.value });
                      if (errors.reportingEnd) {
                        setErrors((prev) => ({ ...prev, reportingEnd: "" }));
                      }
                    }}
                    className={inputClass(errors.reportingEnd)}
                  />
                  <ErrorText message={errors.reportingEnd} />
                </div>
              </div>

              <div>
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
              </div>
            </div>
          </section>

          <section>
            <SectionHeader title="Assignment" />
            <div className="flex flex-col gap-5">
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
                  <div className="w-8 h-4.5 bg-[#27272a] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-3.5 after:w-3.5 after:transition-all peer-checked:bg-[var(--color-yellow,#ffd60a)]" />
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
                  className="inline-flex items-center gap-1.5 text-[#ffd60a] text-[12px] font-medium hover:underline underline-offset-2 cursor-pointer"
                >
                  <Plus size={13} />
                  Add Stop
                </button>
              }
            />
            <div className="flex flex-col gap-5">
              <PointCard
                title="Start Point"
                point={form.startPoint}
                errors={pointFieldErrors(errors, "startPoint")}
                onChange={(startPoint) => patchForm({ startPoint })}
              />

              {form.stops.map((stop, index) => (
                <PointCard
                  key={stop.id}
                  title={`Stop ${index + 1}`}
                  point={stop}
                  errors={pointFieldErrors(errors, `stops.${index}`)}
                  onChange={(updated) => {
                    const next = [...form.stops];
                    next[index] = updated;
                    patchForm({ stops: next });
                  }}
                  onRemove={() =>
                    patchForm({
                      stops: form.stops.filter((_, stopIndex) => stopIndex !== index),
                    })
                  }
                />
              ))}

              <PointCard
                title="End Point"
                point={form.endPoint}
                errors={pointFieldErrors(errors, "endPoint")}
                onChange={(endPoint) => patchForm({ endPoint })}
              />
            </div>
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
              Review all the info and settings for this trip before you finish assigning the vehicle.
            </MainLayoutColor>
          </div>

          <ReviewSection
            title="Vehicle and driver"
            onEdit={goToForm}
            errors={[errors.vehicle].filter(Boolean)}
          >
            <ReviewRow label="Vehicle" value={form.vehicle} />
            <ReviewRow label="Driver" value={form.driver || "Not assigned"} />
          </ReviewSection>

          <ReviewSection
            title="Reporting window"
            onEdit={goToForm}
            errors={[errors.reportingStart, errors.reportingEnd].filter(Boolean)}
          >
            <ReviewRow
              label="Start"
              value={formatDateTime(form.reportingStart)}
            />
            <ReviewRow label="End" value={formatDateTime(form.reportingEnd)} />
          </ReviewSection>

          <ReviewSection
            title="Trip type"
            onEdit={goToForm}
            errors={[errors.tripType].filter(Boolean)}
          >
            <ReviewRow label="Type" value={tripTypeLabel} />
          </ReviewSection>

          <ReviewSection
            title="Temperature"
            onEdit={goToForm}
            errors={[errors.tempMin, errors.tempMax].filter(Boolean)}
          >
            <ReviewRow
              label="Monitoring"
              value={form.temperatureEnabled ? "On" : "Off"}
            />
            {form.temperatureEnabled ? (
              <ReviewRow
                label="Range"
                value={`${form.tempMin || "—"}°C to ${form.tempMax || "—"}°C`}
              />
            ) : null}
          </ReviewSection>

          <ReviewSection title="Route" onEdit={goToForm} errors={routeErrors}>
            <ReviewRow label="Start" value={formatPoint(form.startPoint)} />
            {form.stops.map((stop, index) => (
              <ReviewRow
                key={stop.id}
                label={`Stop ${index + 1}`}
                value={formatPoint(stop)}
              />
            ))}
            <ReviewRow label="End" value={formatPoint(form.endPoint)} />
          </ReviewSection>
        </div>
      )}
    </FormSlider>
  );
}
