import React, { useEffect, useState } from "react";
import { Truck, Lock, RefreshCw, FileCheck } from "lucide-react";
import apiClient from "../../api/client";
import { MainStatsCard } from "../../components/Ui/MainLayoutUI/MainStatsCard";


const ACCENT_STYLES = {
  yellow: {
    iconWrap: "bg-[#FDBB24]/10 border border-[#FDBB24]/20",
    icon: "text-[#FDBB24]",
  },
  red: {
    iconWrap: "bg-[#ef4444]/10 border border-[#ef4444]/20",
    icon: "text-[#ef4444]",
  },
  orange: {
    iconWrap: "bg-[#f59e0b]/10 border border-[#f59e0b]/20",
    icon: "text-[#f59e0b]",
  },
  green: {
    iconWrap: "bg-[#10b981]/10 border border-[#10b981]/20",
    icon: "text-[#10b981]",
  },
};

const MOBILIZE_STATS = [
  {
    id: "total",
    icon: Truck,
    title: "Total Vehicle",
    accent: "yellow",
  },
  {
    id: "immobilized",
    icon: Lock,
    title: "Immobilized",
    accent: "red",
  },
  {
    id: "pending",
    icon: RefreshCw,
    title: "Commands Pending",
    accent: "orange",
  },
  {
    id: "success",
    icon: FileCheck,
    title: "Command Success Rate",
    accent: "green",
  },
];

export default function MobilizeStats() {
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    apiClient
      .get("/v1/commands/summary")
      .then((res) => {
        if (!mounted) return;
        setSummary(res?.data ?? null);
      })
      .catch(() => {
        if (!mounted) return;
        setSummary(null);
      })
      .finally(() => {
        if (!mounted) return;
        setLoading(false);
      });

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 min-[1152px]:gap-3.5 xl:gap-4 w-full select-none shrink-0">
      {MOBILIZE_STATS.map((card) => {
        const accent = ACCENT_STYLES[card.accent] || ACCENT_STYLES.yellow;

        let value = "—";
        let subtitle = "Unavailable";

        if (summary) {
          if (card.id === "total") {
            value = summary.total_vehicles ?? "—";
            subtitle = `${summary.active_vehicles ?? "0"} Active`;
          } else if (card.id === "immobilized") {
            value = summary.immobilized ?? "—";
            subtitle = "Currently restricted";
          } else if (card.id === "pending") {
            value = summary.commands_pending ?? "—";
            subtitle = "Awaiting device response";
          } else if (card.id === "success") {
            const pct = summary.command_success_rate_pct;
            value = pct == null ? "—" : typeof pct === "number" ? `${pct}%` : pct;
            subtitle = "Last 30 days";
          }
        }

        return (
          <div key={card.id} className="min-w-0 h-full min-h-[112px] xl:min-h-[124px]">
            <MainStatsCard
              value={loading ? "—" : value}
              subtitle={loading ? "Loading..." : subtitle}
              title={card.title}
              icon={card.icon}
              bgIcon={accent.iconWrap}
              colorIcon={accent.icon}
              padding="p-3 min-[1152px]:p-3.5 xl:p-4"
              footerSpacing="pt-2.5 mt-2"
            />
          </div>
        );
      })}
    </div>
  );
}