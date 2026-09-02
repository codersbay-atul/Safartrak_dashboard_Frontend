import React from "react";
import { Truck, Circle, LocateOff, ChevronUp, ChevronDown } from "lucide-react";
import { useDashboardSummary } from "../../hooks/useDashboardSummary";
import { useNavigate } from "react-router-dom";
import { MainStatsCard } from "../../components/Ui/MainLayoutUI/MainStatsCard";
import MainLayoutButton from "../../components/Ui/MainLayoutUI/MainLayoutButton";
import MainLayoutColor from "../../components/Ui/MainLayoutUI/MainLayoutColor";
import MainLayoutTextSize from "../../components/Ui/MainLayoutUI/MainLayoutTextSize";
import {
  DASHBOARD_SUMMARY_PLACEHOLDER,
  mapDashboardSummary,
} from "./mapDashboardSummary";

const VALUE_SKELETON = (
  <span
    className="inline-block h-3.5 w-8 rounded bg-zinc-700/80 animate-pulse align-middle"
    aria-hidden="true"
  />
);

function buildStatsData(summary, { isLoading = false } = {}) {
  const values = summary ?? DASHBOARD_SUMMARY_PLACEHOLDER;
  const valueOrSkeleton = (value) => (isLoading ? VALUE_SKELETON : value);

  return [
    {
      id: "total",
      icon: Truck,
      value: valueOrSkeleton(values.totalVehicles),
      subtitle:
        values.InactiveVehicles === "Not Available" ||
        values.InactiveVehicles === "-"
          ? "Inactive Vehicles"
          : `${values.InactiveVehicles} Inactive Vehicles`,
      title: "Total Vehicles",
      bgIcon: "bg-[#3B2A00]",
      colorIcon: "text-[#ffd60a]",
      showArrow: false,
    },
    {
      id: "Inactive_vehicles",
      icon: Circle,
      value: valueOrSkeleton(values.InactiveVehicles),
      subtitle: "69% of Total Fleet",
      title: "Inactive Vehicle",
      bgIcon: "bg-[#052E16]",
      colorIcon: "text-[#16A34A]",
      showArrow: true,
    },
    {
      id: "maintenance-due",
      icon: Circle,
      value: valueOrSkeleton(values.maintenanceDue),
      subtitle: "6% of Total Fleet",
      title: "Idle",
      bgIcon: "bg-[#3B2A00]",
      colorIcon: "text-[#ffd60a]",
    },
    {
      id: "offline_vehicles",
      icon: Circle,
      value: valueOrSkeleton(values.noGps),
      subtitle: "Need Attention",
      title: "Offline",
      bgIcon: "bg-[#450A0A]",
      colorIcon: "text-[#B91C1C]",
    },
    {
      id: "no-gps",
      icon: LocateOff,
      value: valueOrSkeleton(values.noGps),
      subtitle: "Last Sync: 12 sec ago",
      title: "No GPS",
      bgIcon: "bg-[#172554]",
      colorIcon: "text-[#3b82f6]",
    },
  ];
}

export function KpiToggleButton({ expanded, onClick }) {
  const Icon = expanded ? ChevronUp : ChevronDown;

  return (
    <MainLayoutButton
      variant={expanded ? "outlineYellow" : "outlineGray"}
      size="xs"
      icon={Icon}
      iconPosition="right"
      onClick={onClick}
      aria-expanded={expanded}
      className="shrink-0"
    >
      {expanded ? "Collapse KPIs" : "Expand KPIs"}
    </MainLayoutButton>
  );
}

function CollapsedKpiBar({ statsData, onCardClick, onExpand }) {
  return (
    <MainLayoutColor
      as="div"
      background="surface"
      border="cardBorder"
      className="flex items-center w-full min-w-0 rounded-xl border px-2 sm:px-3 py-2 gap-1 overflow-x-auto no-scrollbar"
    >
      {statsData.map((card, index) => {
        const Icon = card.icon;
        const clickable = typeof onCardClick === "function" && card.id === "Inactive_vehicles";

        return (
          <React.Fragment key={card.id}>
            {index > 0 && (
              <span
                className="hidden sm:block w-px h-5 bg-[#27272A] mx-1.5 xl:mx-2 shrink-0"
                aria-hidden="true"
              />
            )}
            <MainLayoutColor
              as={clickable ? "button" : "div"}
              type={clickable ? "button" : undefined}
              onClick={clickable ? () => onCardClick(card) : undefined}
              className={`flex items-center gap-2 min-w-0 flex-1 px-1.5 sm:px-2 py-0.5 rounded-lg ${
                clickable ? "cursor-pointer hover:bg-white/5" : "cursor-default"
              }`}
            >
              <div
                className={`w-6 h-6 rounded-md flex items-center justify-center shrink-0 ${card.bgIcon}`}
              >
                {Icon ? <Icon size={12} className={card.colorIcon} /> : null}
              </div>
              <div className="flex items-center gap-1.5 min-w-0">
                <MainLayoutColor
                  as={MainLayoutTextSize}
                  color="title"
                  size="sectionTitle"
                  className="font-bold leading-none shrink-0"
                >
                  {card.value}
                </MainLayoutColor>
                <MainLayoutColor
                  as={MainLayoutTextSize}
                  color="subtitle"
                  size="subInfoText"
                  className="truncate leading-none"
                >
                  {card.title}
                </MainLayoutColor>
              </div>
            </MainLayoutColor>
          </React.Fragment>
        );
      })}

      <div className="pl-2 ml-auto shrink-0">
        <KpiToggleButton expanded={false} onClick={onExpand} />
      </div>
    </MainLayoutColor>
  );
}

export default function StatsCard({ isExpanded = true, onExpand }) {
  const { summary, isLoading, isError, data } = useDashboardSummary();
  const navigate = useNavigate();

  const showLoadingSkeleton = isLoading && !data;

  const resolvedSummary = isError
    ? DASHBOARD_SUMMARY_PLACEHOLDER
    : summary ??
      (data ? mapDashboardSummary(data) : null) ??
      DASHBOARD_SUMMARY_PLACEHOLDER;

  const statsData = buildStatsData(resolvedSummary, {
    isLoading: showLoadingSkeleton,
  });

  const handleCardClick = (card) => {
    if (card.id === "Inactive_vehicles") navigate("/vehicles");
  };

  return (
    <div className="w-full min-w-0 select-none">
      <div className={`dashboard-expand-panel ${isExpanded ? "is-open" : ""}`}>
        <div
          className={`dashboard-expand-panel-inner transition-opacity duration-[280ms] ease-in-out ${
            isExpanded ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
        >
          <div className="grid grid-cols-[repeat(5,minmax(0,1fr))] gap-3 min-[1152px]:gap-3.5 xl:gap-4 mt-0 pt-0 w-full min-w-0">
            {statsData.map((card) => (
              <div
                key={card.id}
                className="min-h-[112px] xl:min-h-[124px] min-w-0 [&>*]:h-full"
              >
                <MainStatsCard
                  {...card}
                  padding="p-3 min-[1152px]:p-3.5 xl:p-4"
                  footerSpacing="pt-2.5 mt-2"
                  onClick={
                    card.id === "Inactive_vehicles"
                      ? () => handleCardClick(card)
                      : card.onClick
                  }
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className={`dashboard-expand-panel ${isExpanded ? "" : "is-open"}`}>
        <div
          className={`dashboard-expand-panel-inner transition-opacity duration-[280ms] ease-in-out ${
            isExpanded ? "opacity-0 pointer-events-none" : "opacity-100"
          }`}
        >
          <CollapsedKpiBar
            statsData={statsData}
            onCardClick={handleCardClick}
            onExpand={onExpand}
          />
        </div>
      </div>
    </div>
  );
}
