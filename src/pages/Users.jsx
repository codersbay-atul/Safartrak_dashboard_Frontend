import React, { useState } from "react";
import MainLayout from "../layouts/MainLayout";
import UserHeader from "../features/user/UserHeader";
import UserStats from "../features/user/UserStats";
import DriverList from "../features/user/DriverList";
import DriverDetailsPanel from "../features/user/DriverDetailsPanel";


import UserInfo from "../features/user/UserInfo";
import AccountDetails from "../features/user/AccountDetails";
import ContactAndNotification from "../features/user/ContactAndNotification";
import PermissionAndAccountStatus from "../features/user/PermissionAndAccountStatus";

export default function Users() {
  const [selectedUser, setSelectedUser] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);

  const handleAddUser = () => {
    setCurrentStep(1);
    setIsAddModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsAddModalOpen(false);
    setCurrentStep(1);
  };

  return (
    <MainLayout>
      <div className="h-screen max-h-screen p-3 bg-[#090b0e] flex flex-col gap-2.5 overflow-hidden text-gray-200">
        <UserHeader onAddUserClick={handleAddUser} />

        <UserStats />

        <div className="flex-1 min-h-0 grid grid-cols-12 gap-2.5 overflow-hidden mt-1">
          <div className="col-span-8 h-full min-h-0">
            <DriverList
              selectedUser={selectedUser}
              onSelectUser={setSelectedUser}
            />
          </div>

          <div className="col-span-4 h-full min-h-0">
            <DriverDetailsPanel user={selectedUser} />
          </div>
        </div>
      </div>

      {/* Step 1: User Info */}
      {currentStep === 1 && (
        <UserInfo
          isOpen={isAddModalOpen}
          onClose={handleCloseModal}
          onNext={() => setCurrentStep(2)}
        />
      )}

      {/* Step 2: Account Details */}
      {currentStep === 2 && (
        <AccountDetails
          isOpen={isAddModalOpen}
          onClose={handleCloseModal}
          onConfirm={() => setCurrentStep(3)}
        />
      )}

      {/* Step 3: Contact & Notification */}
      {currentStep === 3 && (
        <ContactAndNotification
          isOpen={isAddModalOpen}
          onClose={handleCloseModal}
          onNext={() => setCurrentStep(4)}
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
        />
      )}
    </MainLayout>
  );
}