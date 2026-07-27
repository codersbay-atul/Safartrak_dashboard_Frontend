import React from "react";
import { Phone, Mail, UserX, KeyRound } from "lucide-react";

export default function DriverDetailsPanel({ user }) {
  if (!user) {
    return (
      <div className="w-full h-full bg-[#12151a] border border-gray-800/80 rounded-xl p-4 flex items-center justify-center text-gray-500 text-xs">
        Select a user to view profile
      </div>
    );
  }

  const isActive = user.status === "Active";

  return (
    <div className="w-full h-full max-h-full bg-[#12151a] border border-gray-800/80 rounded-xl p-3 flex flex-col overflow-hidden">
      {/* 1. Profile Header (Fixed Top) */}
      <div className="flex items-start justify-between pb-2.5 border-b border-gray-800/80 shrink-0">
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="w-9 h-9 rounded-lg bg-gray-300 shrink-0" />
          <div className="truncate">
            <h3 className="text-xs font-bold text-white truncate leading-tight">
              {user.name}
            </h3>
            <p className="text-[10px] text-gray-400 truncate mt-0.5">
              {user.empId} • {user.role}
            </p>
          </div>
        </div>

        <span
          className={`text-[9.5px] font-medium flex items-center gap-1 shrink-0 px-2 py-0.5 rounded-full ${
            isActive
              ? "text-green-400 bg-green-950/40 border border-green-800/40"
              : "text-amber-500 bg-amber-950/40 border border-amber-800/40"
          }`}
        >
          <span
            className={`w-1.5 h-1.5 rounded-full ${
              isActive ? "bg-green-500" : "bg-amber-500"
            }`}
          />
          {user.status}
        </span>
      </div>

      {/* 2. Middle Scrollable Area */}
      <div className="flex-1 overflow-y-auto custom-scrollbar py-2.5 space-y-3 min-h-0">
        {/* Quick Contact Info */}
        <div className="space-y-1.5 text-[11px] text-gray-300 pb-2.5 border-b border-gray-800/80">
          <div className="flex items-center gap-2 truncate">
            <Phone className="w-3.5 h-3.5 text-gray-400 shrink-0" />
            <span className="truncate">{user.phone || "N/A"}</span>
          </div>
          <div className="flex items-center gap-2 truncate">
            <Mail className="w-3.5 h-3.5 text-gray-400 shrink-0" />
            <span className="truncate">{user.email || "N/A"}</span>
          </div>
        </div>

        {/* Personal Information Grid */}
        <div className="space-y-2">
          <h4 className="text-[11px] font-bold text-white tracking-wide">
            Personal Information
          </h4>

          <div className="space-y-1.5 text-[10.5px]">
            <div className="flex justify-between items-center gap-2">
              <span className="text-gray-400 shrink-0">Full Name</span>
              <span className="text-gray-200 font-medium truncate">{user.name}</span>
            </div>
            <div className="flex justify-between items-center gap-2">
              <span className="text-gray-400 shrink-0">Phone Number</span>
              <span className="text-gray-200 font-medium truncate">{user.phone}</span>
            </div>
            <div className="flex justify-between items-center gap-2">
              <span className="text-gray-400 shrink-0">Email</span>
              <span className="text-gray-200 font-medium truncate">{user.email}</span>
            </div>
            <div className="flex justify-between items-center gap-2">
              <span className="text-gray-400 shrink-0">Employee ID</span>
              <span className="text-gray-200 font-medium truncate">{user.empId}</span>
            </div>
            <div className="flex justify-between items-center gap-2">
              <span className="text-gray-400 shrink-0">Department</span>
              <span className="text-gray-200 font-medium truncate">
                {user.department || "Operations"}
              </span>
            </div>
            <div className="flex justify-between items-center gap-2">
              <span className="text-gray-400 shrink-0">Joined</span>
              <span className="text-gray-200 font-medium truncate">
                {user.joined || "15 Jan 2024"}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Action Buttons (Fixed Bottom) */}
      <div className="pt-2 border-t border-gray-800/80 grid grid-cols-2 gap-2 shrink-0">
        <button className="flex items-center justify-center gap-1.5 py-1.5 px-2 rounded-lg border border-red-800/60 bg-red-950/20 text-red-500 hover:bg-red-950/40 text-[10px] font-medium transition cursor-pointer">
          <UserX className="w-3.5 h-3.5" />
          <span className="truncate">Deactivate User</span>
        </button>

        <button className="flex items-center justify-center gap-1.5 py-1.5 px-2 rounded-lg border border-amber-500/50 bg-amber-950/20 text-amber-500 hover:bg-amber-950/40 text-[10px] font-medium transition cursor-pointer">
          <KeyRound className="w-3.5 h-3.5" />
          <span className="truncate">Reset Password</span>
        </button>
      </div>
    </div>
  );
}