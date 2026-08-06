import React from "react";
import { Mail, Bell, MessageSquare, AlertTriangle, FileText } from "lucide-react";
import useAccountNotifications from "../../hooks/useAccountNotifications";

const PREFERENCE_MAP = [
  { key: "email_notifications", label: "Email Notification", icon: Mail },
  { key: "push_notifications", label: "Push Notification", icon: Bell },
  { key: "sms_notifications", label: "SMS Notification", icon: MessageSquare },
  { key: "critical_alerts", label: "Critical Alerts", icon: AlertTriangle },
  { key: "daily_reports", label: "Daily Reports", icon: FileText },
];

export default function NotificationPreference({ preferences = null }) {
  const { notifications, isLoading, isError } = useAccountNotifications();

  const source = notifications ?? preferences ?? {};

  const items = PREFERENCE_MAP.map((p) => {
    const enabled = !!(source && source[p.key]);
    return {
      label: p.label,
      status: enabled ? "Active" : "Disable",
      icon: p.icon,
    };
  });

  return (
    <div className="bg-[#121214] border border-[#1f1f23] rounded-2xl p-6 text-white w-full">
      <h2 className="text-base font-semibold text-white mb-6">Notification Preference</h2>

      <div className="flex flex-col gap-5">
        {items.map((item, index) => {
          const IconComponent = item.icon || Mail;
          const isActive = item.status?.toLowerCase() === "active";

          return (
            <div key={item.label || index} className="flex items-center justify-between">
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