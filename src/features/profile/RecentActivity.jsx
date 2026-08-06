import React from "react";
import { Lock } from "lucide-react";
import useAccountActivity from "../../hooks/useAccountActivity";

function formatTime(isoString) {
  if (!isoString) return "";
  try {
    const d = new Date(isoString);
    return d.toLocaleString();
  } catch (e) {
    return isoString;
  }
}

export default function RecentActivity({ activities: initialActivities = null }) {
  const { activities, isLoading } = useAccountActivity({ limit: 20 });

  const items = activities && activities.length > 0 ? activities : initialActivities || [];

  return (
    <div className="bg-[#121214] border border-[#1f1f23] rounded-2xl p-6 text-white w-full overflow-hidden">
      <h2 className="text-base font-semibold text-white mb-6">Recent Activity</h2>

      <div className="relative flex flex-col gap-6">
        {(isLoading ? (initialActivities || []) : items).map((item, index) => {
          const isLast = index === items.length - 1;
          const IconComponent = Lock;

          return (
            <div key={item.id || item.title || index} className="relative flex items-start gap-4 min-w-0">
              {!isLast && (
                <div className="absolute left-5 top-12 bottom-0 w-px border-l border-dashed border-[#3f3f46] z-0" />
              )}

              <div className="relative z-10 w-10 h-10 rounded-full bg-[#2d2203] border border-[#4d3a05] flex items-center justify-center shrink-0 flex-none">
                <IconComponent className="w-4 h-4 text-[#ffd60a]" />
              </div>

              <div className="flex flex-col gap-0.5 min-w-0">
                <p className="text-xs font-medium text-white truncate max-w-[28rem]">{item.detail || item.title || "Activity"}</p>
                <p className="text-[11px] text-[#71717a]">{formatTime(item.at)}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}