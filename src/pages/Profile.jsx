import React, { useState } from "react";
import MainLayout from "../layouts/MainLayout";
import ProfileHeader from "../features/profile/ProfileHeader";
import ProfileHero from "../features/profile/ProfileHero";
import ProfileStatsCard from "../features/profile/ProfileStatsCard";
import RecentActivity from "../features/profile/RecentActivity";
import NotificationPreference from "../features/profile/NotificationPreference";
import SecurityCard from "../features/profile/securityCard";
import SecuritySettings from "../features/profile/SecuritySettings";
import SecuritySettingUpdate from "../features/profile/SecuritySettingUpdate";

export default function ProfilePage({ user }) {
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

  return (
    <MainLayout activeTab="Profile">
      <div className="flex-1 flex flex-col gap-2.5 h-full min-h-0 overflow-y-auto pr-0.5 custom-scrollbar">
        
        {/* Header */}
        <div className="shrink-0">
          <ProfileHeader onEditSettings={handleEditSettings} />
        </div>

        {/* Hero Section */}
        <div className="shrink-0">
          <ProfileHero user={user} />
        </div>

        {/* Stats Row */}
        <div className="shrink-0">
          <ProfileStatsCard stats={user?.stats ?? {}} />
        </div>

        {/* Bottom 3 Cards */}
        <div className="flex-1 min-h-0 grid grid-cols-1 lg:grid-cols-3 gap-2.5 items-stretch">
          <div className="h-full min-h-0 flex flex-col overflow-hidden">
            <RecentActivity />
          </div>

          <div className="h-full min-h-0 flex flex-col overflow-hidden">
            <NotificationPreference />
          </div>

          <div className="h-full min-h-0 flex flex-col overflow-hidden">
            <SecurityCard user={user} />
          </div>
        </div>

        {/* Step 1: Security Settings */}
        {isModalOpen && currentStep === 1 && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm">
            {/* Inner div now acts strictly as a sizing wrapper */}
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

        {/* Step 2: Security Settings Update */}
        {isModalOpen && currentStep === 2 && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm">
            {/* Inner div now acts strictly as a sizing wrapper */}
            <div className="w-full max-w-md max-h-[90vh] overflow-y-auto custom-scrollbar">
              <SecuritySettingUpdate
                initialData={settingsData}
                onBack={() => setCurrentStep(1)}
                onConfirm={(finalData) => {
                  console.log("Updated Security Settings Final:", finalData);
                  handleCloseModal();
                }}
                onClose={handleCloseModal}
              />
            </div>
          </div>
        )}

      </div>
    </MainLayout>
  );
}