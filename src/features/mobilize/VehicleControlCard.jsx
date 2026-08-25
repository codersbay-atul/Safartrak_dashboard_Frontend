import React, { useState, useEffect, useRef } from "react";
import { Check, ShieldCheck, HelpCircle, Lock } from "lucide-react";
import { getCommandVehicle } from "../../api/mobilizeApi";
import MainLayoutColor from "../../components/Ui/MainLayoutUI/MainLayoutColor";
import MainLayoutTextSize from "../../components/Ui/MainLayoutUI/MainLayoutTextSize";
import MainStatusBadge from "../../components/Ui/MainLayoutUI/MainStatusBadge";

export default function VehicleControlCard({
  vehicle,
  onRequestImmobilize,
  isListLoading,
}) {
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
      <MainLayoutColor
        as="div"
        background="surface"
        border="cardBorder"
        className="w-full h-auto lg:h-full min-h-0 rounded-2xl p-3 shadow-2xl flex flex-col justify-between select-none font-sans"
      >
        {/* Top Header */}
        <div className="flex items-center justify-between pb-2 border-b border-[#27272a] shrink-0">
          <MainLayoutColor
            as={MainLayoutTextSize}
            color="title"
            size="sectionTitle"
            className="font-semibold"
          >
            Vehicle Control
          </MainLayoutColor>

          <MainStatusBadge status="Offline" showDot={false} />
        </div>

        {/* Placeholder Center Content */}
        <div className="flex-1 flex flex-col items-center justify-center gap-1 my-auto">
          <MainLayoutColor
            as={MainLayoutTextSize}
            color="subtitle"
            size="subInfoText"
          >
            {isListLoading
              ? "Loading vehicle details..."
              : "Select a vehicle to control"}
          </MainLayoutColor>
        </div>

        {/* Disabled Bottom Button */}
        <button
          disabled
          type="button"
          className="w-full flex items-center justify-center gap-1.5 bg-[#27272a] text-[#71717a] py-2 px-3 rounded-xl cursor-not-allowed opacity-60 shrink-0"
        >
          <Lock className="w-3.5 h-3.5 stroke-2" />
          <MainLayoutTextSize size="headerButtonText">
            Immobilize Vehicle
          </MainLayoutTextSize>
        </button>
      </MainLayoutColor>
    );
  }

  const plate = detail?.reg_no ?? vehicle?.plate ?? "—";
  const driver = detail?.driver_name ?? vehicle?.driver ?? "—";
  const vtype = detail?.vehicle_type ?? vehicle?.type ?? "—";
  const isEligible = detail?.eligible_to_immobilize ?? true;
  const online = detail?.online ?? vehicle?.status !== "offline";
  const currentStatus =
    detail?.current_status ?? detail?.state ?? vehicle?.status ?? "unknown";
  const gps = detail?.gps_signal ?? undefined;
  const ignition = detail?.ignition ?? undefined;
  const location = detail?.location ?? vehicle?.city ?? "—";

  return (
    <MainLayoutColor
      as="div"
      background="surface"
      border="cardBorder"
      className="w-full h-auto lg:h-full min-h-0 rounded-2xl p-3 shadow-2xl flex flex-col gap-2 overflow-hidden select-none font-sans"
    >
      {/* Header */}
      <div className="flex items-center justify-between gap-2 shrink-0 pb-2 border-b border-[#27272a]">
        <MainLayoutColor
          as={MainLayoutTextSize}
          color="title"
          size="sectionTitle"
          className="font-semibold"
        >
          Vehicle Control
        </MainLayoutColor>

        <MainStatusBadge status={online ? "Online" : "Offline"} showDot={true} />
      </div>

      {/* Vehicle Info Card */}
      <MainLayoutColor
        as="div"
        background="surface"
        border="cardBorder"
        className="flex items-center gap-2 shrink-0 p-2 rounded-xl"
      >
        <div className="w-7 h-7 bg-white/10 border border-[#3f3f46] rounded-lg shrink-0 flex items-center justify-center text-[10px] font-bold text-white">
          {String(plate).slice(0, 2)}
        </div>
        <div className="flex flex-col min-w-0 leading-tight">
          <MainLayoutColor
            as={MainLayoutTextSize}
            color="title"
            size="plateText"
            className="tracking-wide truncate block font-bold"
          >
            {plate}
          </MainLayoutColor>

          <div className="flex items-center gap-1 mt-0.5 truncate">
            <MainLayoutColor
              as={MainLayoutTextSize}
              color="subtitle"
              size="subInfoText"
              className="truncate inline"
            >
              {driver}
            </MainLayoutColor>
            <span className="text-[#8e8e93] text-[12px]">•</span>
            <MainLayoutColor
              as={MainLayoutTextSize}
              color="subtitle"
              size="subInfoText"
              className="truncate inline"
            >
              {vtype}
            </MainLayoutColor>
          </div>
        </div>
      </MainLayoutColor>

      {/* Scrollable Body */}
      <div className="flex-none lg:flex-1 overflow-y-visible lg:overflow-y-auto custom-scrollbar space-y-2 min-h-0 pr-0.5">
        {loading && !detail ? (
          <div className="p-2 text-[10px] text-[#ffd60a] bg-[#18181b] border border-[#27272a] rounded-xl animate-pulse">
            Fetching telemetry details...
          </div>
        ) : error ? (
          <div className="p-2 text-[10px] text-rose-400 bg-rose-500/10 border border-rose-500/20 rounded-xl">
            Failed to refresh full details
          </div>
        ) : null}

        {/* Eligibility Pill */}
        <MainLayoutColor
          as="div"
          background={isEligible ? "activeBg" : "expiredBg"}
          className="flex items-center gap-1.5 rounded-xl px-2.5 py-1.5"
        >
          <div className="w-3 h-3 rounded flex items-center justify-center shrink-0">
            <MainLayoutColor
              as={Check}
              color={isEligible ? "activeText" : "expiredText"}
              className="w-2.5 h-2.5 stroke-3"
            />
          </div>
          <MainLayoutColor
            as={MainLayoutTextSize}
            color={isEligible ? "activeText" : "expiredText"}
            size="subInfoText"
            className="font-medium"
          >
            {isEligible
              ? "Vehicle is eligible for remote immobilization."
              : detail?.ineligible_reasons?.[0] ?? "Not eligible for immobilization"}
          </MainLayoutColor>
        </MainLayoutColor>

        {/* Current Status Box */}
        <MainLayoutColor
          as="div"
          background="surface"
          border="cardBorder"
          className="flex items-center justify-between px-2.5 py-1.5 rounded-xl shrink-0"
        >
          <MainLayoutColor
            as={MainLayoutTextSize}
            color="subtitle"
            size="subInfoText"
            className="font-medium"
          >
            Current Status
          </MainLayoutColor>
          <div className="flex items-center gap-1.5">
            <MainLayoutColor
              as={ShieldCheck}
              color={online ? "activeText" : "offlineText"}
              className="w-3.5 h-3.5"
            />
            <MainLayoutColor
              as={MainLayoutTextSize}
              color={online ? "activeText" : "offlineText"}
              size="metricText"
              className="font-semibold"
            >
              {currentStatus}
            </MainLayoutColor>
          </div>
        </MainLayoutColor>

        {/* Telemetry Details Grid */}
        <MainLayoutColor
          as="div"
          background="surface"
          border="cardBorder"
          className="grid grid-cols-2 gap-1.5 text-left shrink-0 p-2 rounded-xl"
        >
          <div className="min-w-0">
            <MainLayoutColor
              as={MainLayoutTextSize}
              color="subtitle"
              size="subInfoText"
              className="block truncate text-[#71717a]"
            >
              GPS Signal
            </MainLayoutColor>
            <MainLayoutColor
              as={MainLayoutTextSize}
              color="title"
              size="subInfoText"
              className="font-semibold block truncate"
            >
              {gps == null ? "—" : gps ? "Strong" : "Weak"}
            </MainLayoutColor>
          </div>

          <div className="min-w-0">
            <MainLayoutColor
              as={MainLayoutTextSize}
              color="subtitle"
              size="subInfoText"
              className="block truncate text-[#71717a]"
            >
              Updated
            </MainLayoutColor>
            <MainLayoutColor
              as={MainLayoutTextSize}
              color="title"
              size="subInfoText"
              className="font-semibold block truncate"
            >
              {detail?.last_updated_sec ? `${detail.last_updated_sec} sec` : "—"}
            </MainLayoutColor>
          </div>

          <div className="min-w-0">
            <MainLayoutColor
              as={MainLayoutTextSize}
              color="subtitle"
              size="subInfoText"
              className="block truncate text-[#71717a]"
            >
              Location
            </MainLayoutColor>
            <MainLayoutColor
              as={MainLayoutTextSize}
              color="title"
              size="subInfoText"
              className="font-semibold block truncate"
            >
              {location}
            </MainLayoutColor>
          </div>

          <div className="min-w-0">
            <MainLayoutColor
              as={MainLayoutTextSize}
              color="subtitle"
              size="subInfoText"
              className="block truncate text-[#71717a]"
            >
              Ignition
            </MainLayoutColor>
            <MainLayoutColor
              as={MainLayoutTextSize}
              color={ignition ? "activeText" : "subtitle"}
              size="subInfoText"
              className="font-bold truncate block"
            >
              {ignition === undefined ? "—" : ignition ? "ON" : "OFF"}
            </MainLayoutColor>
          </div>
        </MainLayoutColor>

        {/* Warning Box */}
        <MainLayoutColor
          as="div"
          background="surface"
          border="cardBorder"
          className="flex items-center gap-1.5 rounded-xl p-1.5 shrink-0"
        >
          <HelpCircle className="w-3 h-3 text-[#a1a1aa] shrink-0" />
          <MainLayoutColor
            as={MainLayoutTextSize}
            color="subtitle"
            size="subInfoText"
            className="leading-tight"
          >
            Do not immobilize if vehicle is in motion.
          </MainLayoutColor>
        </MainLayoutColor>
      </div>

      {/* Fixed Bottom Action Button */}
      <button
        type="button"
        onClick={() => onRequestImmobilize?.(detail ?? vehicle)}
        className="w-full flex items-center justify-center gap-1.5 bg-[#f59e0b] hover:bg-[#d97706] text-black py-2 px-3 rounded-xl transition-all duration-150 shrink-0 cursor-pointer"
      >
        <Lock className="w-3.5 h-3.5 stroke-2" />
        <MainLayoutTextSize size="headerButtonText">
          Immobilize Vehicle
        </MainLayoutTextSize>
      </button>
    </MainLayoutColor>
  );
}