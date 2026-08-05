import React from "react";
import { IdCard, Mail, Phone, Calendar, Truck } from "lucide-react";

export default function ProfileHero({ user }) {
  const name = user?.name ?? '';
  const role = user?.role ?? '';
  const status = user?.status ?? '';
  const fleet = user?.fleet ?? '';
  const employeeId = user?.employeeId ?? '';
  const email = user?.email ?? '';
  const phone = user?.phone ?? '';
  const joinedOn = user?.joinedOn ?? '';

  return (
    <div className="bg-[#121214] border border-[#1f1f23] rounded-2xl p-4 text-white flex flex-col xl:flex-row items-start xl:items-center justify-between gap-4">
      <div className="flex items-center gap-4 flex-shrink-0">
        <div className="w-12 h-12 rounded-full bg-[#3f3f46] flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
          {name
            .split(" ")
            .map((part) => part.charAt(0))
            .slice(0, 2)
            .join("")}
        </div>

        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <h2 className="text-base font-semibold text-white leading-tight">
              {name}
            </h2>
            <span className="bg-[#052e16] text-[#22c55e] text-[11px] font-medium px-2.5 py-0.5 rounded-full border border-[#14532d]/40">
              {status}
            </span>
          </div>

          <p className="text-xs text-[#a1a1aa] font-normal">{role}</p>

          <div className="flex items-center gap-1.5 text-xs text-[#a1a1aa] mt-0.5">
            <Truck className="w-3.5 h-3.5 text-[#a1a1aa]" />
            <span>{fleet}</span>
          </div>
        </div>
      </div>

      <div className="hidden xl:block w-[1px] h-12 bg-[#27272a] mx-2" />

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 w-full xl:w-auto flex-1 max-w-4xl">
        <div className="flex items-start gap-2.5">
          <IdCard className="w-4 h-4 text-[#71717a] mt-0.5 flex-shrink-0" />
          <div className="flex flex-col gap-0.5">
            <span className="text-[11px] text-[#71717a]">Employee ID</span>
            <span className="text-xs font-semibold text-white">
              {employeeId}
            </span>
          </div>
        </div>

        <div className="flex items-start gap-2.5">
          <Mail className="w-4 h-4 text-[#71717a] mt-0.5 flex-shrink-0" />
          <div className="flex flex-col gap-0.5 truncate">
            <span className="text-[11px] text-[#71717a]">Email</span>
            <span className="text-xs font-semibold text-white truncate">
              {email}
            </span>
          </div>
        </div>

        <div className="flex items-start gap-2.5">
          <Phone className="w-4 h-4 text-[#71717a] mt-0.5 flex-shrink-0" />
          <div className="flex flex-col gap-0.5">
            <span className="text-[11px] text-[#71717a]">Phone Number</span>
            <span className="text-xs font-semibold text-white">{phone}</span>
          </div>
        </div>

        <div className="flex items-start gap-2.5">
          <Calendar className="w-4 h-4 text-[#71717a] mt-0.5 flex-shrink-0" />
          <div className="flex flex-col gap-0.5">
            <span className="text-[11px] text-[#71717a]">Joined On</span>
            <span className="text-xs font-semibold text-white">{joinedOn}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
