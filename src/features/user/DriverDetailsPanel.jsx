import React, { useState } from "react";
import { Phone, Mail, UserX, KeyRound } from "lucide-react";
import DeactivateUserModal from "./DeactivateUser";
import { activateUser, deactivateUser } from "../../api/userApi";
import { toast } from "../../components/Ui/toast";
import MainLayoutColor from "../../components/Ui/MainLayoutUI/MainLayoutColor";
import MainLayoutTextSize from "../../components/Ui/MainLayoutUI/MainLayoutTextSize";
import MainHeaderActionButton from "../../components/Ui/MainLayoutUI/MainHeaderActionButton";
import MainStatusBadge from "../../components/Ui/MainLayoutUI/MainStatusBadge";

export default function DriverDetailsPanel({ user, onUserUpdated, onResetPassword }) {
  const [isDeactivateModalOpen, setIsDeactivateModalOpen] = useState(false);
  const [isDeactivating, setIsDeactivating] = useState(false);
  const [isActivating, setIsActivating] = useState(false);

  if (!user) {
    return (
      <MainLayoutColor
        as="div"
        background="surface"
        border="cardBorder"
        className="w-full h-full rounded-2xl p-4 flex items-center justify-center select-none shadow-2xl font-sans"
      >
        <MainLayoutColor
          as={MainLayoutTextSize}
          color="subtitle"
          size="subInfoText"
          className="font-medium"
        >
          Select a user to view profile
        </MainLayoutColor>
      </MainLayoutColor>
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
      <MainLayoutColor
        as="div"
        background="surface"
        border="cardBorder"
        className="w-full h-auto lg:h-full rounded-2xl p-3 flex flex-col overflow-hidden select-none shadow-2xl font-sans"
      >
        {/* Header with Name, Sub Info & Synced Status Badge */}
        <div className="flex items-center justify-between pb-2.5 border-b border-[#27272a] shrink-0">
          <div className="flex items-center gap-2.5 min-w-0">
            <MainLayoutColor
              as="div"
              background="filterActiveBg"
              color="yellow"
              className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 font-bold text-[12px]"
            >
              {user.name ? user.name.charAt(0) : "U"}
            </MainLayoutColor>
            <div className="truncate">
              <MainLayoutColor
                as={MainLayoutTextSize}
                color="title"
                size="sectionTitle"
                className="font-bold truncate leading-tight block text-[14px]"
              >
                {user.name}
              </MainLayoutColor>
              <MainLayoutColor
                as={MainLayoutTextSize}
                color="subtitle"
                size="subInfoText"
                className="truncate font-medium block mt-0.5 text-[12px]"
              >
                {user.empId} • {user.role}
              </MainLayoutColor>
            </div>
          </div>

          <div className="shrink-0">
            <MainStatusBadge status={user.status || "Inactive"} showDot={false} />
          </div>
        </div>

        {/* Details Content */}
        <div className="flex-none lg:flex-1 overflow-y-visible lg:overflow-y-auto custom-scrollbar py-2.5 space-y-3.5 min-h-0">
          {/* Quick Contact Box */}
          <div className="space-y-2 pb-2.5 border-b border-[#27272a]">
            <div className="flex items-center gap-2 truncate">
              <Phone className="w-3.5 h-3.5 text-[#a1a1aa] shrink-0" />
              <MainLayoutColor
                as={MainLayoutTextSize}
                color="subtitle"
                size="subInfoText"
                className="truncate font-medium text-[12px]"
              >
                {user.phone || "N/A"}
              </MainLayoutColor>
            </div>
            <div className="flex items-center gap-2 truncate">
              <Mail className="w-3.5 h-3.5 text-[#a1a1aa] shrink-0" />
              <MainLayoutColor
                as={MainLayoutTextSize}
                color="subtitle"
                size="subInfoText"
                className="truncate font-medium text-[12px]"
              >
                {user.email || "N/A"}
              </MainLayoutColor>
            </div>
          </div>

          {/* Personal Information Section */}
          <div className="space-y-2.5">
            <MainLayoutColor
              as={MainLayoutTextSize}
              color="title"
              size="sectionTitle"
              className="font-bold tracking-wide block text-[14px]"
            >
              Personal Information
            </MainLayoutColor>

            <div className="space-y-2">
              <div className="flex justify-between items-center gap-2">
                <MainLayoutColor
                  as={MainLayoutTextSize}
                  color="subtitle"
                  size="subInfoText"
                  className="shrink-0 font-medium text-[12px]"
                >
                  Full Name
                </MainLayoutColor>
                <MainLayoutColor
                  as={MainLayoutTextSize}
                  color="subtitle"
                  size="subInfoText"
                  className="font-medium truncate text-right text-[12px]"
                >
                  {user.name}
                </MainLayoutColor>
              </div>

              <div className="flex justify-between items-center gap-2">
                <MainLayoutColor
                  as={MainLayoutTextSize}
                  color="subtitle"
                  size="subInfoText"
                  className="shrink-0 font-medium text-[12px]"
                >
                  Phone Number
                </MainLayoutColor>
                <MainLayoutColor
                  as={MainLayoutTextSize}
                  color="subtitle"
                  size="subInfoText"
                  className="font-medium truncate text-right text-[12px]"
                >
                  {user.phone}
                </MainLayoutColor>
              </div>

              <div className="flex justify-between items-center gap-2">
                <MainLayoutColor
                  as={MainLayoutTextSize}
                  color="subtitle"
                  size="subInfoText"
                  className="shrink-0 font-medium text-[12px]"
                >
                  Email
                </MainLayoutColor>
                <MainLayoutColor
                  as={MainLayoutTextSize}
                  color="subtitle"
                  size="subInfoText"
                  className="font-medium truncate text-right text-[12px]"
                >
                  {user.email}
                </MainLayoutColor>
              </div>

              <div className="flex justify-between items-center gap-2">
                <MainLayoutColor
                  as={MainLayoutTextSize}
                  color="subtitle"
                  size="subInfoText"
                  className="shrink-0 font-medium text-[12px]"
                >
                  Employee ID
                </MainLayoutColor>
                <MainLayoutColor
                  as={MainLayoutTextSize}
                  color="subtitle"
                  size="subInfoText"
                  className="font-medium font-mono truncate text-right text-[12px]"
                >
                  {user.empId}
                </MainLayoutColor>
              </div>

              <div className="flex justify-between items-center gap-2">
                <MainLayoutColor
                  as={MainLayoutTextSize}
                  color="subtitle"
                  size="subInfoText"
                  className="shrink-0 font-medium text-[12px]"
                >
                  Department
                </MainLayoutColor>
                <MainLayoutColor
                  as={MainLayoutTextSize}
                  color="subtitle"
                  size="subInfoText"
                  className="font-medium truncate text-right text-[12px]"
                >
                  {user.department || "Operations"}
                </MainLayoutColor>
              </div>

              <div className="flex justify-between items-center gap-2">
                <MainLayoutColor
                  as={MainLayoutTextSize}
                  color="subtitle"
                  size="subInfoText"
                  className="shrink-0 font-medium text-[12px]"
                >
                  Joined
                </MainLayoutColor>
                <MainLayoutColor
                  as={MainLayoutTextSize}
                  color="subtitle"
                  size="subInfoText"
                  className="font-medium truncate text-right text-[12px]"
                >
                  {user.joined || "15 Jan 2024"}
                </MainLayoutColor>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="pt-2.5 border-t border-[#27272a] grid grid-cols-2 gap-2 shrink-0">
          {isActive ? (
            <MainHeaderActionButton
              type="button"
              onClick={() => setIsDeactivateModalOpen(true)}
              style={{
                display: "inline-flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
              }}
              className="w-full py-2.5 px-3 rounded-xl border border-rose-500/30 bg-rose-500/10 text-rose-400 hover:bg-rose-500/20 active:scale-[0.98] transition-all cursor-pointer flex-row items-center justify-center"
            >
              <span className="flex items-center justify-center gap-1.5">
                <UserX className="w-4 h-4 shrink-0 text-rose-400" />
                <span className="text-[14px] font-medium text-rose-400 whitespace-nowrap leading-none">
                  Deactivate
                </span>
              </span>
            </MainHeaderActionButton>
          ) : (
            <MainHeaderActionButton
              type="button"
              onClick={handleConfirmActivate}
              disabled={isActivating}
              style={{
                display: "inline-flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
              }}
              className="w-full py-2.5 px-3 rounded-xl border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20 disabled:opacity-60 active:scale-[0.98] transition-all cursor-pointer flex-row items-center justify-center"
            >
              <span className="flex items-center justify-center gap-1.5">
                <UserX className="w-4 h-4 shrink-0 text-emerald-400" />
                <span className="text-[14px] font-medium text-emerald-400 whitespace-nowrap leading-none">
                  {isActivating ? "Activating..." : "Activate"}
                </span>
              </span>
            </MainHeaderActionButton>
          )}

          <MainHeaderActionButton
            type="button"
            onClick={onResetPassword}
            style={{
              display: "inline-flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
            }}
            className="w-full py-2.5 px-3 rounded-xl border border-amber-500/30 bg-amber-500/10 text-amber-400 hover:bg-amber-500/20 active:scale-[0.98] transition-all cursor-pointer flex-row items-center justify-center"
          >
            <span className="flex items-center justify-center gap-1.5">
              <KeyRound className="w-4 h-4 shrink-0 text-amber-400" />
              <span className="text-[14px] font-medium text-amber-400 whitespace-nowrap leading-none">
                Reset Password
              </span>
            </span>
          </MainHeaderActionButton>
        </div>
      </MainLayoutColor>

      <DeactivateUserModal
        isOpen={isDeactivateModalOpen}
        onClose={() => setIsDeactivateModalOpen(false)}
        onConfirm={handleConfirmDeactivate}
        isLoading={isDeactivating}
      />
    </>
  );
}