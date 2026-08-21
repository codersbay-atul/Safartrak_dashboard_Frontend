
import React, { useEffect, useState } from "react";
import MainLayout from "../layouts/MainLayout";
import UserHeader from "../features/user/UserHeader";
import UserStats from "../features/user/UserStats";
import DriverList from "../features/user/DriverList";
import DriverDetailsPanel from "../features/user/DriverDetailsPanel";
import { getUserDetails, createUser } from "../api/userApi";
import { toast } from "../components/Ui/toast";

import UserInfo from "../features/user/UserInfo";
import AccountDetails from "../features/user/AccountDetails";
import ContactAndNotification from "../features/user/ContactAndNotification";
import UserResetPasswordModal from "../features/user/UserResetPassword";

export default function Users() {
  const [selectedUser, setSelectedUser] = useState(null);
  const [userApiData, setUserApiData] = useState(null);
  const [isUserDetailsLoading, setIsUserDetailsLoading] = useState(false);
  const [usersRefreshKey, setUsersRefreshKey] = useState(0);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [newUserFormData, setNewUserFormData] = useState({});
  const [isSavingNewUser, setIsSavingNewUser] = useState(false);

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
    setNewUserFormData({});
    setIsAddModalOpen(true);
  };

  const handleResetPasswordClick = () => {
    setCurrentStep(4);
    setIsAddModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsAddModalOpen(false);
    setCurrentStep(1);
    setNewUserFormData({});
    setIsSavingNewUser(false);
  };

  const handleUserUpdated = (updatedUser) => {
    setSelectedUser(updatedUser);
    setUsersRefreshKey((prev) => prev + 1);
  };

  const handleUserInfoNext = (formData) => {
    setNewUserFormData((prev) => ({ ...prev, userInfo: formData }));
    setCurrentStep(2);
  };

  const handleAccountConfirm = (accountData) => {
    setNewUserFormData((prev) => ({ ...prev, accountData }));
    setCurrentStep(3);
  };

  const handleContactSave = async (options) => {
    const userInfo = newUserFormData.userInfo || {};
    const accountData = newUserFormData.accountData || {};

    if (!userInfo.email || !accountData.username || !accountData.password) {
      toast.error("Please complete personal information and account details before saving.");
      return;
    }

    const payload = {
      username: accountData.username,
      name: userInfo.fullName,
      email: userInfo.email,
      phone: userInfo.phoneNumber,
      role: userInfo.role,
      fleet: userInfo.assignedFleet,
      employee_id: userInfo.employeeId,
      department: userInfo.department,
      reporting_manager: userInfo.reportingManager,
      temporary_password: accountData.password,
      personal: {
        full_name: userInfo.fullName,
        email: userInfo.email,
        phone: userInfo.phoneNumber,
        employee_id: userInfo.employeeId,
        department: userInfo.department,
        reporting_manager: userInfo.reportingManager,
      },
      invite: {
        welcome_email: Boolean(options.welcomeEmail),
        login_credentials: Boolean(options.loginCredentials),
      },
      notifications: {
        email_notifications: Boolean(options.emailNotifications),
        sms_notifications: Boolean(options.smsNotifications),
      },
    };

    try {
      setIsSavingNewUser(true);
      const createdUser = await createUser(payload);
      toast.success("User created successfully.");
      setUsersRefreshKey((prev) => prev + 1);
      setSelectedUser(createdUser);
      handleCloseModal();
    } catch (error) {
      console.error("Failed to create user", error);
      toast.error(error?.message || "Unable to create user. Please try again.");
    } finally {
      setIsSavingNewUser(false);
    }
  };

  return (
    <MainLayout activeTab="Users">
      <div className="flex-1 flex flex-col gap-2.5 min-h-0 overflow-y-auto min-[1152px]:overflow-hidden pr-0.5 text-white custom-scrollbar">
        <div className="shrink-0">
          <UserHeader onAddUserClick={handleAddUser} />
        </div>

        <div className="shrink-0">
          <UserStats />
        </div>

        <div className="flex flex-col min-[1152px]:flex-row gap-3.5 items-stretch w-full flex-1 min-h-0 overflow-y-auto min-[1152px]:overflow-hidden">
          <div className="w-full min-[1152px]:flex-1 shrink-0 h-[420px] min-[1152px]:h-full min-h-0 overflow-hidden">
            <DriverList
              selectedUser={selectedUser}
              onSelectUser={setSelectedUser}
              refreshTrigger={usersRefreshKey}
            />
          </div>

          <div className="w-full min-[1152px]:w-[320px] xl:w-[340px] shrink-0 h-[380px] min-[1152px]:h-full min-h-0 overflow-hidden">
            <DriverDetailsPanel
              user={selectedUser}
              onUserUpdated={handleUserUpdated}
              onResetPassword={handleResetPasswordClick}
            />
          </div>
        </div>
      </div>

      {currentStep === 1 && (
        <UserInfo
          isOpen={isAddModalOpen}
          onClose={handleCloseModal}
          onNext={handleUserInfoNext}
          initialData={null}
          isLoading={false}
        />
      )}

      {currentStep === 2 && (
        <AccountDetails
          isOpen={isAddModalOpen}
          onClose={handleCloseModal}
          onConfirm={handleAccountConfirm}
          initialData={null}
        />
      )}

      {currentStep === 3 && (
        <ContactAndNotification
          isOpen={isAddModalOpen}
          onClose={handleCloseModal}
          onSave={handleContactSave}
          initialData={null}
          isSaving={isSavingNewUser}
        />
      )}

      {currentStep === 4 && (
        <UserResetPasswordModal
          isOpen={isAddModalOpen}
          onClose={handleCloseModal}
          userId={selectedUser?.id || userApiData?.id || ""}
          userEmail={selectedUser?.email || userApiData?.email || ""}
        />
      )}
    </MainLayout>
  );
}