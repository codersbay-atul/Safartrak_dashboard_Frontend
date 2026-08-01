import React from "react";
import { Mail, Bell, MessageSquare, AlertTriangle, FileText } from "lucide-react";

const DEFAULT_PREFERENCES = [
  { label: "Email Notification", status: "Active", icon: Mail },
  { label: "Push Notification", status: "Active", icon: Bell },
  { label: "SMS Notification", status: "Disable", icon: MessageSquare },
  { label: "Critical Alerts", status: "Active", icon: AlertTriangle },
  { label: "Daily Reports", status: "Active", icon: FileText },
];

export default function NotificationPreference({ preferences = DEFAULT_PREFERENCES }) {
  const items = preferences.length > 0 ? preferences : DEFAULT_PREFERENCES;

  return (
    <div className="bg-[#121214] border border-[#1f1f23] rounded-2xl p-6 text-white w-full">
      {/* Header */}
      <h2 className="text-base font-semibold text-white mb-6">Notification Preference</h2>

   
      <div className="flex flex-col gap-5">
        {items.map((item, index) => {
          const IconComponent = item.icon || Mail;
          const isActive = item.status?.toLowerCase() === "active";

          return (
            <div key={item.label || index} className="flex items-center justify-between">
              {/* Left Label & Icon */}
              <div className="flex items-center gap-3">
                <IconComponent className="w-4 h-4 text-[#71717a] shrink-0" />
                <span className="text-xs text-[#a1a1aa] font-medium">{item.label}</span>
              </div>

            
              <span
                className={`text-[11px] font-medium px-3 py-0.5 rounded-full ${
                  isActive
                    ? "bg-[#052e16] text-[#22c55e] border border-[#14532d]/40"
                    : "bg-[#450a0a] text-[#ef4444] border border-[#7f1d1d]/40"
                }`}
              >
                {isActive ? "Active" : "Disable"}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}