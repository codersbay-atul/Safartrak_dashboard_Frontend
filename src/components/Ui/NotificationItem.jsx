import React from 'react';

export default function NotificationItem({ title, description, time, isUnread = false }) {
  return (
    <div className={`p-2 rounded-lg border transition-colors ${
      isUnread ? "bg-[#18181b] border-[#27272a]" : "bg-transparent border-transparent opacity-60"
    }`}>
      <div className="flex items-center justify-between">
        <p className="text-white font-medium text-[11px] truncate">{title}</p>
        {time && <span className="text-[9px] text-[#a1a1aa] shrink-0">{time}</span>}
      </div>
      <p className="text-[10px] text-[#a1a1aa] mt-0.5 line-clamp-2">{description}</p>
    </div>
  );
}