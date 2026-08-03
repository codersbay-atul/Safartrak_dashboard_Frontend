import React, { useEffect, useState } from "react";
import { Truck, Lock, RefreshCw, FileCheck } from "lucide-react";
import apiClient from "../../api/client";

const ACCENT_STYLES = {
  yellow: {
    iconWrap: "bg-[#FDBB24]/10 border border-[#FDBB24]/20",
    icon: "text-[#FDBB24]",
    title: "text-[#bfa141]",
  },
  red: {
    iconWrap: "bg-[#ef4444]/10 border border-[#ef4444]/20",
    icon: "text-[#ef4444]",
    title: "text-[#ef4444]",
  },
  orange: {
    iconWrap: "bg-[#f59e0b]/10 border border-[#f59e0b]/20",
    icon: "text-[#f59e0b]",
    title: "text-[#f59e0b]",
  },
  green: {
    iconWrap: "bg-[#10b981]/10 border border-[#10b981]/20",
    icon: "text-[#10b981]",
    title: "text-[#10b981]",
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
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 w-full select-none shrink-0">
      {MOBILIZE_STATS.map((card) => {
        const Icon = card.icon;
        const accent = ACCENT_STYLES[card.accent] || ACCENT_STYLES.yellow;

        let value = "—";
        let subtitle = "Unavailable";

        if (summary) {
          if (card.id === "total") {
            value = summary.total_vehicles ?? "—";
            subtitle = `${summary.active_vehicles ?? "0"} Active`;
          }

          if (card.id === "immobilized") {
            value = summary.immobilized ?? "—";
            subtitle = "Currently restricted";
          }

          if (card.id === "pending") {
            value = summary.commands_pending ?? "—";
            subtitle = "Awaiting device response";
          }

          if (card.id === "success") {
            const pct = summary.command_success_rate_pct;
            value = pct == null ? "—" : typeof pct === "number" ? `${pct}%` : pct;
            subtitle = "Last 30 days";
          }
        }

        return (
          <div
            key={card.id}
            className="bg-[#16161a] border border-[#232329] rounded-xl p-3 flex flex-col justify-between hover:border-[#2e2e36] transition-all relative overflow-hidden group cursor-pointer w-full min-h-19"
          >
            <div className="flex items-center gap-3">
              <div
                className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${accent.iconWrap}`}
              >
                <Icon size={16} className={accent.icon} />
              </div>

              <div className="leading-tight min-w-0">
                <h2 className="text-[15px] font-bold text-zinc-100 tracking-tight">
                  {loading ? "—" : value}
                </h2>
                <p className="text-[10px] text-zinc-500 font-medium truncate mt-0.5">
                  {loading ? "Loading..." : subtitle}
                </p>
              </div>
            </div>

            <div className="flex items-center justify-between w-full pt-2 mt-3 border-t border-zinc-800/40">
              <span
                className={`text-[10.5px] font-bold tracking-wide ${accent.title}`}
              >
                {card.title}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
