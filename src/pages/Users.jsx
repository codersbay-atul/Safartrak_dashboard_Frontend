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
import PermissionAndAccountStatus from "../features/user/PermissionAndAccountStatus";
import InviteUser from "../features/user/InviteUser";

export default function Users() {
  const [selectedUser, setSelectedUser] = useState(null);
  const [userApiData, setUserApiData] = useState(null);
  const [isUserDetailsLoading, setIsUserDetailsLoading] = useState(false);
  const [usersRefreshKey, setUsersRefreshKey] = useState(0);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);
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

  const handleInviteUser = () => {
    setIsInviteModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsAddModalOpen(false);
    setIsInviteModalOpen(false);
    setCurrentStep(1);
  };

  const handleUserUpdated = (updatedUser) => {
    setSelectedUser(updatedUser);
    setUsersRefreshKey((prev) => prev + 1);
  };

  return (
    <MainLayout activeTab="Users">
      <div className="h-screen max-h-screen p-3 bg-[#090b0e] flex flex-col gap-2.5 overflow-hidden text-gray-200">
        <UserHeader onAddUserClick={handleAddUser} onInviteUserClick={handleInviteUser} />

        <UserStats />

        <div className="flex-1 min-h-0 grid grid-cols-12 gap-2.5 overflow-hidden mt-1">
          <div className="col-span-8 h-full min-h-0">
            <DriverList
              selectedUser={selectedUser}
              onSelectUser={setSelectedUser}
              refreshTrigger={usersRefreshKey}
            />
          </div>

          <div className="col-span-4 h-full min-h-0">
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
          onNext={() => setCurrentStep(4)}
          initialData={userApiData}
        />
      )}

      {/* Step 4: Permission & Status */}
      {currentStep === 4 && (
        <PermissionAndAccountStatus
          isOpen={isAddModalOpen}
          onClose={handleCloseModal}
          onSave={() => {
            console.log("User Added Successfully");
            handleCloseModal();
          }}
          initialData={userApiData}
        />
      )}

      {/* Invite User Modal */}
      <InviteUser
        isOpen={isInviteModalOpen}
        onClose={handleCloseModal}
        onSendInvite={(email) => {
          console.log("Invite sent to", email);
          handleCloseModal();
        }}
      />
    </MainLayout>
  );
}