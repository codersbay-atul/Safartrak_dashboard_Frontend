import React, { useState } from "react";
import { Phone, Mail, UserX, KeyRound } from "lucide-react";
import DeactivateUserModal from "./DeactivateUser";
import { deactivateUser } from "../../api/userApi";
import { toast } from "../../components/Ui/toast";

export default function DriverDetailsPanel({ user, onUserUpdated }) {
  const [isDeactivateModalOpen, setIsDeactivateModalOpen] = useState(false);
  const [isDeactivating, setIsDeactivating] = useState(false);

  if (!user) {
    return (
      <div className="w-full h-full bg-[#121214] border border-[#27272a] rounded-2xl p-4 flex items-center justify-center text-[#71717a] text-xs">
        Select a user to view profile
      </div>
    );
  }

  const isActive = user.status === "Active";

  const handleConfirmDeactivate = async () => {
    const userId = user?.id ?? user?.empId;

    if (!userId) {
      toast.error("Unable to deactivate this user because no valid user ID was provided.");
      return;
    }

    try {
      setIsDeactivating(true);
      await deactivateUser(userId);

      const updatedUser = {
        ...user,
        status: "Inactive",
      };

      onUserUpdated?.(updatedUser);
      toast.success("User deactivated successfully.");
      setIsDeactivateModalOpen(false);
    } catch (error) {
      toast.error(error?.message || "Failed to deactivate user.");
    } finally {
      setIsDeactivating(false);
    }
  };

  return (
    <>
      <div className="w-full h-full max-h-full bg-[#121214] border border-[#27272a] rounded-2xl p-3.5 flex flex-col overflow-hidden select-none shadow-2xl">
        {/* Header User Profile Summary */}
        <div className="flex items-start justify-between pb-3 border-b border-[#27272a] shrink-0">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-9 h-9 rounded-full bg-[#27272a] border border-[#3f3f46] flex items-center justify-center shrink-0 text-[#ffd60a] font-bold text-xs">
              {user.name ? user.name.charAt(0) : "U"}
            </div>
            <div className="truncate">
              <h3 className="text-xs font-bold text-white truncate leading-tight">
                {user.name}
              </h3>
              <p className="text-[10px] text-[#a1a1aa] truncate mt-0.5 font-medium">
                {user.empId} • {user.role}
              </p>
            </div>
          </div>

          {/* Dynamic Status Badge */}
          <span
            className={`text-[9.5px] font-semibold flex items-center gap-1.5 shrink-0 px-2.5 py-0.5 rounded-full ${
              isActive
                ? "text-emerald-400 bg-emerald-500/10 border border-emerald-500/20"
                : "text-amber-400 bg-amber-500/10 border border-amber-500/20"
            }`}
          >
            <span
              className={`w-1.5 h-1.5 rounded-full ${
                isActive ? "bg-emerald-400" : "bg-amber-400"
              }`}
            />
            {user.status}
          </span>
        </div>

        {/* Scrollable Information Body */}
        <div className="flex-1 overflow-y-auto custom-scrollbar py-3 space-y-3.5 min-h-0">
          
          {/* Quick Contact Links */}
          <div className="space-y-2 text-[11px] text-[#d4d4d8] pb-3 border-b border-[#27272a]">
            <div className="flex items-center gap-2.5 truncate">
              <Phone className="w-3.5 h-3.5 text-[#a1a1aa] shrink-0" />
              <span className="truncate">{user.phone || "N/A"}</span>
            </div>
            <div className="flex items-center gap-2.5 truncate">
              <Mail className="w-3.5 h-3.5 text-[#a1a1aa] shrink-0" />
              <span className="truncate">{user.email || "N/A"}</span>
            </div>
          </div>

          {/* Personal Info Grid */}
          <div className="space-y-2.5">
            <h4 className="text-[11px] font-semibold text-white tracking-wide">
              Personal Information
            </h4>

            <div className="space-y-2 text-[10.5px]">
              <div className="flex justify-between items-center gap-2">
                <span className="text-[#a1a1aa] shrink-0">Full Name</span>
                <span className="text-white font-medium truncate">
                  {user.name}
                </span>
              </div>
              <div className="flex justify-between items-center gap-2">
                <span className="text-[#a1a1aa] shrink-0">Phone Number</span>
                <span className="text-white font-medium truncate">
                  {user.phone}
                </span>
              </div>
              <div className="flex justify-between items-center gap-2">
                <span className="text-[#a1a1aa] shrink-0">Email</span>
                <span className="text-white font-medium truncate">
                  {user.email}
                </span>
              </div>
              <div className="flex justify-between items-center gap-2">
                <span className="text-[#a1a1aa] shrink-0">Employee ID</span>
                <span className="text-white font-medium font-mono truncate">
                  {user.empId}
                </span>
              </div>
              <div className="flex justify-between items-center gap-2">
                <span className="text-[#a1a1aa] shrink-0">Department</span>
                <span className="text-white font-medium truncate">
                  {user.department || "Operations"}
                </span>
              </div>
              <div className="flex justify-between items-center gap-2">
                <span className="text-[#a1a1aa] shrink-0">Joined</span>
                <span className="text-white font-medium truncate">
                  {user.joined || "15 Jan 2024"}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons Container */}
        <div className="pt-2.5 border-t border-[#27272a] grid grid-cols-2 gap-2 shrink-0">
          <button
            type="button"
            onClick={() => setIsDeactivateModalOpen(true)}
            className="flex items-center justify-center gap-1.5 py-1.5 px-2 rounded-xl border border-red-500/20 bg-red-500/10 text-red-400 hover:bg-red-500/20 text-[10px] font-semibold transition cursor-pointer"
          >
            <UserX className="w-3.5 h-3.5" />
            <span className="truncate">Deactivate User</span>
          </button>

          <button 
            type="button"
            className="flex items-center justify-center gap-1.5 py-1.5 px-2 rounded-xl border border-amber-500/20 bg-amber-500/10 text-amber-400 hover:bg-amber-500/20 text-[10px] font-semibold transition cursor-pointer"
          >
            <KeyRound className="w-3.5 h-3.5" />
            <span className="truncate">Reset Password</span>
          </button>
        </div>
      </div>

      <DeactivateUserModal
        isOpen={isDeactivateModalOpen}
        onClose={() => setIsDeactivateModalOpen(false)}
        onConfirm={handleConfirmDeactivate}
        isLoading={isDeactivating}
      />
    </>
  );
}