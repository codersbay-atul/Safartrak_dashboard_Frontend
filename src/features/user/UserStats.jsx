import React from "react";
import { Users, UserCheck, UserPlus, UserX } from "lucide-react";
import { StatCard } from "../../components/Ui/StatsCards";

const USERS_STATS_DATA = [
  {
    id: "total-users",
    icon: Users,
    value: "59",
    subtitle: "All registered user",
    bottomLabel: "Total User",
    bgIcon: "bg-[#2d2203] border border-[#4d3a05]",
    colorIcon: "text-[#ffd60a]",
    showArrow: false,
  },
  {
    id: "active-users",
    icon: UserCheck,
    value: "53",
    subtitle: "Currently active",
    bottomLabel: "Active Use",
    bgIcon: "bg-[#2d2203] border border-[#4d3a05]",
    colorIcon: "text-[#ffd60a]",
    showArrow: false,
  },
  {
    id: "pending-invites",
    icon: UserPlus,
    value: "3",
    subtitle: "Invitation sent",
    bottomLabel: "Pending Invites",
    bgIcon: "bg-[#2d2203] border border-[#4d3a05]",
    colorIcon: "text-[#ffd60a]",
    showArrow: false,
  },
  {
    id: "inactive-users",
    icon: UserX,
    value: "1",
    subtitle: "Not active",
    bottomLabel: "Inactive Use",
    bgIcon: "bg-[#2d2203] border border-[#4d3a05]",
    colorIcon: "text-[#ffd60a]",
    showArrow: false,
  },
];

export default function UsersStatsCard() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 mt-0 pt-0 select-none w-full shrink-0">
      {USERS_STATS_DATA.map((card) => (
        <div key={card.id} className="min-h-[72px] [&>*]:h-full">
          <StatCard {...card} />
        </div>
      ))}
    </div>
  );
}