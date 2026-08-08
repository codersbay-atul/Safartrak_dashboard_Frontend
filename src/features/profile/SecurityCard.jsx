import React from "react";
import { User, Mail, Phone, Truck } from "lucide-react";

const DEFAULT_DETAILS = [
  { icon: User, label: "Name", value: "Wade Warren" },
  { icon: Mail, label: "Email", value: "alex.morgan@company.io" },
  { icon: Phone, label: "Phone Number", value: "+1 (415) 928-0744" },
  { icon: Truck, label: "Fleet", value: "West Fleet" },
];

export default function SecurityCard({ user }) {
  const details = user
    ? [
        { icon: User, label: "Name", value: user.name ?? "—" },
        { icon: Mail, label: "Email", value: user.email ?? "—" },
        { icon: Phone, label: "Phone Number", value: user.phone ?? "—" },
        {
          icon: Truck,
          label: "Fleet",
          value: user.fleet ?? "—",
        },
      ]
    : DEFAULT_DETAILS;

  return (
    <div className="bg-[#141518] border border-[#232428] rounded-xl text-white w-full max-w-[380px] overflow-hidden select-none">
      {/* Header Section with Divider */}
      <div className="px-5 py-4 border-b border-[#232428]">
        <h2 className="text-[13px] font-bold text-white tracking-tight">Security</h2>
      </div>

      <div className="p-5 flex flex-col gap-4">
        {details.map((item, index) => {
          const IconComponent = item.icon || User;

          return (
            <div key={item.label || index} className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-2.5 min-w-0">
                <IconComponent className="w-4 h-4 text-[#8e8e93] shrink-0" />
                <span className="text-[11px] text-[#8e8e93] font-normal truncate">
                  {item.label}
                </span>
              </div>

              <span className="text-[11px] font-medium text-[#e4e4e7] truncate text-right">
                {item.value}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}