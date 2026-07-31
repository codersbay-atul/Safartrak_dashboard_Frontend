import { AlarmClock, Check, Truck } from "lucide-react";
import { StatCard } from "../../components/Ui/StatsCards";

export default function ProfileStatsCard({ stats, isLoading = false }) {
  const cardData = [
    {
      id: "last-login",
      icon: AlarmClock,
      value: stats?.lastLoginTime ?? "09:45 AM",
      subtitle: stats?.lastLoginDate ?? "Today",
      bottomLabel: "Last Login",
      bgIcon: "bg-[#2d2203] border border-[#4d3a05]",
      colorIcon: "text-[#ffd60a]",
      showArrow: false,
    },
    {
      id: "account-status",
      icon: Check,
      value: stats?.accountStatus ?? "Active",
      bottomLabel: "Account Status",
      bgIcon: "bg-[#2d2203] border border-[#4d3a05]",
      colorIcon: "text-[#ffd60a]",
      showArrow: false,
    },
    {
      id: "assigned-fleet",
      icon: Truck,
      value: stats?.assignedFleet ?? "West Fleet",
      bottomLabel: "Assigned Fleet",
      bgIcon: "bg-[#2d2203] border border-[#4d3a05]",
      colorIcon: "text-[#ffd60a]",
      showArrow: false,
    },
    {
      id: "role",
      icon: Truck,
      value: stats?.role ?? "Operations Admin",
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