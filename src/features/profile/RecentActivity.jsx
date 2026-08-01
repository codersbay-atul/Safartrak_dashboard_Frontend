import React from "react";
import { Lock, User, FileCheck, Truck } from "lucide-react";

const DEFAULT_ACTIVITIES = [
  {
    id: "1",
    title: "Password Updated",
    time: "Today, 09:42 AM",
    icon: Lock,
  },
  {
    id: "2",
    title: "Profile Updated",
    time: "Yesterday, 04:20 PM",
    icon: User,
  },
  {
    id: "3",
    title: "Generated Fleet Report",
    time: "3 days ago, 06:42 AM",
    icon: FileCheck,
  },
  {
    id: "4",
    title: "Added New Vehicle",
    time: "Last week, 06:15 PM",
    icon: Truck,
  },
];

export default function RecentActivity({ activities = DEFAULT_ACTIVITIES }) {
  const items = activities.length > 0 ? activities : DEFAULT_ACTIVITIES;

  return (
    <div className="bg-[#121214] border border-[#1f1f23] rounded-2xl p-6 text-white w-full">
      {/* Header */}
      <h2 className="text-base font-semibold text-white mb-6">Recent Activity</h2>

      
      <div className="relative flex flex-col gap-6">
        {items.map((item, index) => {
          const IconComponent = item.icon || Lock;
          const isLast = index === items.length - 1;

          return (
            <div key={item.id || item.title || index} className="relative flex items-center gap-4">
              
              {!isLast && (
                <div className="absolute left-5 top-10 bottom-[-24px] w-[1px] border-l border-dashed border-[#3f3f46] z-0" />
              )}

              {/* Icon Circle */}
              <div className="relative z-10 w-10 h-10 rounded-full bg-[#2d2203] border border-[#4d3a05] flex items-center justify-center shrink-0">
                <IconComponent className="w-4 h-4 text-[#ffd60a]" />
              </div>

              
              <div className="flex flex-col gap-0.5 min-w-0">
                <p className="text-xs font-medium text-white truncate">{item.title}</p>
                <p className="text-[11px] text-[#71717a]">{item.time}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}