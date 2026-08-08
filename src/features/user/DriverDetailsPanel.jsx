
import React, { useState } from "react";
import { Phone, Mail, UserX, KeyRound } from "lucide-react";
import DeactivateUserModal from "./DeactivateUser";
import { activateUser, deactivateUser } from "../../api/userApi";
import { toast } from "../../components/Ui/toast";

export default function DriverDetailsPanel({ user, onUserUpdated, onResetPassword }) {
  const [isDeactivateModalOpen, setIsDeactivateModalOpen] = useState(false);
  const [isDeactivating, setIsDeactivating] = useState(false);
  const [isActivating, setIsActivating] = useState(false);

  if (!user) {
    return (
      <div className="w-full h-full bg-[#121214] border border-[#27272a] rounded-2xl p-4 flex items-center justify-center text-[#71717a] text-xs">
        Select a user to view profile
      </div>
    );
  }

  const isActive = String(user.status || "").toLowerCase() === "active";

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

  const handleConfirmActivate = async () => {
    const userId = user?.id ?? user?.empId;

    if (!userId) {
      toast.error("Unable to activate this user because no valid user ID was provided.");
      return;
    }

    try {
      setIsActivating(true);
      await activateUser(userId);

      const updatedUser = {
        ...user,
        status: "Active",
      };

      onUserUpdated?.(updatedUser);
      toast.success("User activated successfully.");
    } catch (error) {
      toast.error(error?.message || "Failed to activate user.");
    } finally {
      setIsActivating(false);
    }
  };

  return (
    <>
      <div className="w-full h-full bg-[#121214] border border-[#27272a] rounded-2xl p-3 flex flex-col overflow-hidden select-none shadow-2xl">
        <div className="flex items-center justify-between pb-2.5 border-b border-[#27272a] shrink-0">
          <div className="flex items-center gap-2 min-w-0">
            <div className="w-8 h-8 rounded-full bg-[#27272a] border border-[#3f3f46] flex items-center justify-center shrink-0 text-[#ffd60a] font-bold text-xs">
              {user.name ? user.name.charAt(0) : "U"}
            </div>
            <div className="truncate">
              <h3 className="text-xs font-bold text-white truncate leading-tight">
                {user.name}
              </h3>
              <p className="text-[9.5px] text-[#a1a1aa] truncate font-medium">
                {user.empId} • {user.role}
              </p>
            </div>
          </div>

          <span
            className={`text-[9px] font-semibold flex items-center gap-1 shrink-0 px-2 py-0.5 rounded-full ${
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

        <div className="flex-1 overflow-y-auto custom-scrollbar py-2.5 space-y-3 min-h-0">
          <div className="space-y-1.5 text-[10.5px] text-[#d4d4d8] pb-2.5 border-b border-[#27272a]">
            <div className="flex items-center gap-2 truncate">
              <Phone className="w-3 h-3 text-[#a1a1aa] shrink-0" />
              <span className="truncate">{user.phone || "N/A"}</span>
            </div>
            <div className="flex items-center gap-2 truncate">
              <Mail className="w-3 h-3 text-[#a1a1aa] shrink-0" />
              <span className="truncate">{user.email || "N/A"}</span>
            </div>
          </div>

          <div className="space-y-2">
            <h4 className="text-[10.5px] font-semibold text-white tracking-wide">
              Personal Information
            </h4>

            <div className="space-y-1.5 text-[10px]">
              <div className="flex justify-between items-center gap-2">
                <span className="text-[#a1a1aa] shrink-0">Full Name</span>
                <span className="text-white font-medium truncate">{user.name}</span>
              </div>
              <div className="flex justify-between items-center gap-2">
                <span className="text-[#a1a1aa] shrink-0">Phone Number</span>
                <span className="text-white font-medium truncate">{user.phone}</span>
              </div>
              <div className="flex justify-between items-center gap-2">
                <span className="text-[#a1a1aa] shrink-0">Email</span>
                <span className="text-white font-medium truncate">{user.email}</span>
              </div>
              <div className="flex justify-between items-center gap-2">
                <span className="text-[#a1a1aa] shrink-0">Employee ID</span>
                <span className="text-white font-medium font-mono truncate">{user.empId}</span>
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

        <div className="pt-2 border-t border-[#27272a] grid grid-cols-2 gap-2 shrink-0">
          {isActive ? (
            <button
              type="button"
              onClick={() => setIsDeactivateModalOpen(true)}
              className="flex items-center justify-center gap-1 py-1.5 px-2 rounded-xl border border-red-500/20 bg-red-500/10 text-red-400 hover:bg-red-500/20 text-[9.5px] font-semibold transition cursor-pointer"
            >
              <UserX className="w-3 h-3" />
              <span className="truncate">Deactivate</span>
            </button>
          ) : (
            <button
              type="button"
              onClick={handleConfirmActivate}
              disabled={isActivating}
              className="flex items-center justify-center gap-1 py-1.5 px-2 rounded-xl border border-emerald-500/20 bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20 disabled:opacity-60 text-[9.5px] font-semibold transition cursor-pointer"
            >
              <UserX className="w-3 h-3" />
              <span className="truncate">{isActivating ? "Activating..." : "Activate"}</span>
            </button>
          )}

          <button
            type="button"
            onClick={onResetPassword}
            className="flex items-center justify-center gap-1 py-1.5 px-2 rounded-xl border border-amber-500/20 bg-amber-500/10 text-amber-400 hover:bg-amber-500/20 text-[9.5px] font-semibold transition cursor-pointer"
          >
            <KeyRound className="w-3 h-3" />
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