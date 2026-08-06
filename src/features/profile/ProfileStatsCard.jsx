import { AlarmClock, Check, Truck } from "lucide-react";
import { StatCard } from "../../components/Ui/StatsCards";

function formatDateParts(isoString) {
  if (!isoString) return { time: "", date: "" };
  try {
    const d = new Date(isoString);
    if (Number.isNaN(d.getTime())) return { time: "", date: "" };
    const time = d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const date = d.toLocaleDateString();
    return { time, date };
  } catch (e) {
    return { time: "", date: "" };
  }
}

export default function ProfileStatsCard({ stats, isLoading = false }) {
  const lastLoginIso = stats?.last_login_at ?? stats?.lastLoginAt ?? null;
  const { time: lastLoginTime, date: lastLoginDate } = formatDateParts(lastLoginIso);

  const accountStatus = stats?.status ?? '';
  const assignedFleet = stats?.fleet ?? '';
  const role = stats?.role ?? '';

  const cardData = [
    {
      id: "last-login",
      icon: AlarmClock,
      value: lastLoginTime || "",
      subtitle: lastLoginDate || "",
      bottomLabel: "Last Login",
      bgIcon: "bg-[#2d2203] border border-[#4d3a05]",
      colorIcon: "text-[#ffd60a]",
      showArrow: false,
    },
    {
      id: "account-status",
      icon: Check,
      value: accountStatus,
      bottomLabel: "Account Status",
      bgIcon: "bg-[#2d2203] border border-[#4d3a05]",
      colorIcon: "text-[#ffd60a]",
      showArrow: false,
    },
    {
      id: "assigned-fleet",
      icon: Truck,
      value: assignedFleet,
      bottomLabel: "Assigned Fleet",
      bgIcon: "bg-[#2d2203] border border-[#4d3a05]",
      colorIcon: "text-[#ffd60a]",
      showArrow: false,
    },
    {
      id: "role",
      icon: Truck,
      value: role,
      bottomLabel: "Role",
      bgIcon: "bg-[#2d2203] border border-[#4d3a05]",
      colorIcon: "text-[#ffd60a]",
      showArrow: false,
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 mt-0 pt-0 select-none w-full shrink-0">
      {cardData.map((card) => (
        <div key={card.id} className="min-h-16 h-full min-w-0">
          <StatCard
            {...card}
            value={isLoading ? "Loading..." : card.value}
          />
        </div>
      ))}
    </div>
  );
}