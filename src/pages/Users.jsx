import React, { useEffect, useState } from "react";
import MainLayout from "../layouts/MainLayout";
import UserHeader from "../features/user/UserHeader";
import UserStats from "../features/user/UserStats";
import DriverList from "../features/user/DriverList";
import DriverDetailsPanel from "../features/user/DriverDetailsPanel";
import { getUserDetails } from "../api/userApi";

import UserInfo from "../features/user/UserInfo";
import AccountDetails from "../features/user/AccountDetails";
import ContactAndNotification from "../features/user/ContactAndNotification";

export default function Users() {
  const [selectedUser, setSelectedUser] = useState(null);
  const [userApiData, setUserApiData] = useState(null);
  const [isUserDetailsLoading, setIsUserDetailsLoading] = useState(false);
  const [usersRefreshKey, setUsersRefreshKey] = useState(0);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);

  useEffect(() => {
    let isMounted = true;

    async function loadUserDetails() {
      if (!selectedUser?.id) {
        setUserApiData(null);
        return;
      }

      try {
        setIsUserDetailsLoading(true);
        const payload = await getUserDetails(selectedUser.id);
        if (isMounted) {
          setUserApiData(payload);
        }
      } catch (error) {
        console.error("Failed to load user details", error);
        if (isMounted) {
          setUserApiData(null);
        }
      } finally {
        if (isMounted) {
          setIsUserDetailsLoading(false);
        }
      }
    }

    loadUserDetails();

    return () => {
      isMounted = false;
    };
  }, [selectedUser?.id]);

  const handleAddUser = () => {
    setCurrentStep(1);
    setIsAddModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsAddModalOpen(false);
    setCurrentStep(1);
  };

  const handleUserUpdated = (updatedUser) => {
    setSelectedUser(updatedUser);
    setUsersRefreshKey((prev) => prev + 1);
  };

  return (
    <MainLayout activeTab="Users">
      <div className="h-screen max-h-screen bg-[#090b0e] flex flex-col gap-2.5 overflow-y-auto min-[1152px]:overflow-hidden text-gray-200">
        <div className="shrink-0">
          <UserHeader onAddUserClick={handleAddUser} />
        </div>

        <div className="shrink-0">
          <UserStats />
        </div>

        <div className="flex-1 min-h-0 grid grid-cols-1 min-[1152px]:grid-cols-12 gap-2.5 overflow-y-auto min-[1152px]:overflow-hidden mt-1">
          <div className="min-[1152px]:col-span-8 w-full h-[420px] min-[1152px]:h-full min-h-0 shrink-0">
            <DriverList
              selectedUser={selectedUser}
              onSelectUser={setSelectedUser}
              refreshTrigger={usersRefreshKey}
            />
          </div>

          <div className="min-[1152px]:col-span-4 w-full h-[480px] min-[1152px]:h-full min-h-0 shrink-0">
            <DriverDetailsPanel user={selectedUser} onUserUpdated={handleUserUpdated} />
          </div>
        </div>
      </div>

      {/* Step 1: User Info */}
      {currentStep === 1 && (
        <UserInfo
          isOpen={isAddModalOpen}
          onClose={handleCloseModal}
          onNext={() => setCurrentStep(2)}
          initialData={userApiData}
          isLoading={isUserDetailsLoading}
        />
      )}

      {/* Step 2: Account Details */}
      {currentStep === 2 && (
        <AccountDetails
          isOpen={isAddModalOpen}
          onClose={handleCloseModal}
          onConfirm={() => setCurrentStep(3)}
          initialData={userApiData}
        />
      )}

      {/* Step 3: Contact & Notification */}
      {currentStep === 3 && (
        <ContactAndNotification
          isOpen={isAddModalOpen}
          onClose={handleCloseModal}
          onSave={(options) => {
            console.log("Saving user with contact options", options);
            handleCloseModal();
          }}
          initialData={userApiData}
        />
      )}
    </MainLayout>
  );
}