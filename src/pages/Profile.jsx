import React, { useState } from "react";
import useAccountProfile from "../hooks/useAccountProfile";
import { Clock } from "lucide-react";
import MainLayout from "../layouts/MainLayout";
import MainSectionHeader from "../components/Ui/MainLayoutUI/MainSectionHeader";
import ProfileHeader from "../features/profile/ProfileHeader";
import ProfileHero from "../features/profile/ProfileHero";
import ProfileStatsCard from "../features/profile/ProfileStatsCard";
import RecentActivity from "../features/profile/RecentActivity";
import NotificationPreference from "../features/profile/NotificationPreference";
import SecuritySettings from "../features/profile/SecuritySettings";

export default function ProfilePage({ user: initialUser }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { profile, isLoading, isError } = useAccountProfile();

  const user = profile ?? initialUser ?? null;

  const handleEditSettings = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <MainLayout activeTab="Profile">
      <div className="flex-1 flex flex-col gap-4 xl:gap-5 h-full min-h-0 min-w-0 overflow-y-auto overflow-x-hidden no-scrollbar pr-0.5">
        <div className="shrink-0">
          <ProfileHeader onEditSettings={handleEditSettings} />
        </div>

        <div className="shrink-0 w-full min-w-0">
          <ProfileHero user={user} />
        </div>

        {/* Stats Row */}
        <div className="shrink-0 w-full min-w-0">
          <ProfileStatsCard stats={user ?? {}} />
        </div>

        <MainSectionHeader icon={Clock} title="Account Activity" />

        <div className="min-h-0 min-w-0 grid grid-cols-1 min-[1152px]:grid-cols-3 gap-4 xl:gap-5 items-stretch min-[1152px]:flex-1">
          <div className="w-full min-h-0 flex flex-col min-[1152px]:h-full min-[1152px]:overflow-hidden">
            <RecentActivity />
          </div>

          <div className="w-full min-h-0 flex flex-col min-[1152px]:h-full min-[1152px]:overflow-hidden">
            <NotificationPreference />
          </div>

          {/* <div className="w-full min-h-0 flex flex-col min-[1152px]:h-full min-[1152px]:overflow-hidden">
            <SecurityCard user={user} />
          </div> */}
        </div>

        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm">
            <div className="w-full max-w-md max-h-[90vh] overflow-hidden rounded-xl custom-scrollbar">
              <SecuritySettings
                initialData={user}
                onDiscard={handleCloseModal}
                onSave={handleCloseModal}
              />
            </div>
          </div>
        )}
      </div>
    </MainLayout>
  );
}
