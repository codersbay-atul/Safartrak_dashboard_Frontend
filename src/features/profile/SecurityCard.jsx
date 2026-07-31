import React from "react";
import { User, Mail, Phone, Truck } from "lucide-react";

const DEFAULT_DETAILS = [
  { label: "Name", value: "Wade Warren", icon: User },
  { label: "Email", value: "alex.morgan@company.io", icon: Mail },
  { label: "Phone Number", value: "+1 (415) 928-0744", icon: Phone },
  { label: "Fleet", value: "West Fleet", icon: Truck },
];

export default function SecurityCard({ details = DEFAULT_DETAILS }) {
  const items = details.length > 0 ? details : DEFAULT_DETAILS;

  return (
    <div className="bg-[#121214] border border-[#1f1f23] rounded-2xl p-6 text-white w-full">
      {/* Header */}
      <h2 className="text-base font-semibold text-white mb-6">Security</h2>

      {/* Grid List */}
      <div className="flex flex-col gap-5">
        {items.map((item, index) => {
          const IconComponent = item.icon || User;

          return (
            <div key={item.label || index} className="flex items-center justify-between">
              
              <div className="flex items-center gap-3">
                <IconComponent className="w-4 h-4 text-[#71717a] shrink-0" />
                <span className="text-xs text-[#71717a] font-medium">{item.label}</span>
              </div>

              <span className="text-xs font-medium text-white truncate max-w-[200px]">
                {item.value}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}