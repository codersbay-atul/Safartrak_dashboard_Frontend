import React, { useEffect, useState } from "react";
import { Users, UserCheck, UserPlus, UserX } from "lucide-react";
import { StatCard } from "../../components/Ui/StatsCards";
import { getUserSummary } from "../../api/userApi";

const DEFAULT_SUMMARY = {
  total_users: 0,
  active: 0,
  pending_invites: 0,
  inactive: 0,
};

function formatSummaryValue(value) {
  if (Number.isFinite(Number(value))) {
    return String(Number(value));
  }

  return "0";
}

export default function UserStats() {
  const [summary, setSummary] = useState(DEFAULT_SUMMARY);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    async function loadUserSummary() {
      try {
        const payload = await getUserSummary();

        if (isMounted) {
          setSummary({
            ...DEFAULT_SUMMARY,
            ...payload,
          });
        }
      } catch (error) {
        console.error("Failed to load user summary", error);
        if (isMounted) {
          setSummary(DEFAULT_SUMMARY);
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    loadUserSummary();

    return () => {
      isMounted = false;
    };
  }, []);

  const cards = [
    {
      id: "total-users",
      icon: Users,
      value: isLoading ? "..." : formatSummaryValue(summary.total_users),
      subtitle: "All registered user",
      bottomLabel: "Total User",
      bgIcon: "bg-[#2d2203] border border-[#4d3a05]",
      colorIcon: "text-[#ffd60a]",
      showArrow: false,
    },
    {
      id: "active-users",
      icon: UserCheck,
      value: isLoading ? "..." : formatSummaryValue(summary.active),
      subtitle: "Currently active",
      bottomLabel: "Active User",
      bgIcon: "bg-[#2d2203] border border-[#4d3a05]",
      colorIcon: "text-[#ffd60a]",
      showArrow: false,
    },
    {
      id: "pending-invites",
      icon: UserPlus,
      value: isLoading ? "..." : formatSummaryValue(summary.pending_invites),
      subtitle: "Invitation sent",
      bottomLabel: "Pending Invites",
      bgIcon: "bg-[#2d2203] border border-[#4d3a05]",
      colorIcon: "text-[#ffd60a]",
      showArrow: false,
    },
    {
      id: "inactive-users",
      icon: UserX,
      value: isLoading ? "..." : formatSummaryValue(summary.inactive),
      subtitle: "Not active",
      bottomLabel: "Inactive User",
      bgIcon: "bg-[#2d2203] border border-[#4d3a05]",
      colorIcon: "text-[#ffd60a]",
      showArrow: false,
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 mt-0 pt-0 select-none w-full shrink-0">
      {cards.map((card) => (
        <div key={card.id} className="min-h-[72px] [&>*]:h-full">
          <StatCard {...card} />
        </div>
      ))}
    </div>
  );
}