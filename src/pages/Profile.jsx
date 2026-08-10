import React, { useState } from "react";
import useAccountProfile from "../hooks/useAccountProfile";
import MainLayout from "../layouts/MainLayout";
import ProfileHeader from "../features/profile/ProfileHeader";
import ProfileHero from "../features/profile/ProfileHero";
import ProfileStatsCard from "../features/profile/ProfileStatsCard";
import RecentActivity from "../features/profile/RecentActivity";
import NotificationPreference from "../features/profile/NotificationPreference";
import SecuritySettings from "../features/profile/SecuritySettings";
import SecuritySettingUpdate from "../features/profile/SecuritySettingUpdate";
// import SecurityCard from "../features/profile/SecurityCard";

export default function ProfilePage({ user: initialUser }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [settingsData, setSettingsData] = useState(null);

  const handleEditSettings = () => {
    setCurrentStep(1);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setCurrentStep(1);
  };

  const { profile, isLoading, isError } = useAccountProfile();

  const user = profile ?? initialUser ?? null;

  return (
    <MainLayout activeTab="Profile">
      <div className="flex-1 flex flex-col gap-2.5 h-full min-h-0 min-w-0 overflow-y-auto pr-0.5 custom-scrollbar">
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

        <div className="min-h-0 min-w-0 grid grid-cols-1 min-[1152px]:grid-cols-3 gap-2.5 items-stretch min-[1152px]:flex-1">
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

        {isModalOpen && currentStep === 1 && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm">
            <div className="w-full max-w-md max-h-[90vh] overflow-y-auto custom-scrollbar">
              <SecuritySettings
                initialData={user}
                onSave={(formData) => {
                  setSettingsData(formData);
                  setCurrentStep(2);
                }}
                onDiscard={handleCloseModal}
              />
            </div>
          </div>
        )}

        {isModalOpen && currentStep === 2 && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm">
            <div className="w-full max-w-md max-h-[90vh] overflow-y-auto custom-scrollbar">
              <SecuritySettingUpdate
                initialData={settingsData}
                onBack={() => setCurrentStep(1)}
                onSave={(finalData) => {
                  console.log("Updated Security Settings Final:", finalData);
                  handleCloseModal();
                }}
                onConfirm={(finalData) => {
                  console.log("Updated Security Settings Final:", finalData);
                  handleCloseModal();
                }}
                onDiscard={handleCloseModal}
                onClose={handleCloseModal}
              />
            </div>
          </div>
        )}
      </div>
    </MainLayout>
  );
}
