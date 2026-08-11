import React from "react";
import PageHeader from "../../components/Ui/PageHeader";
import HeaderActionButton from "../../components/Ui/HeaderActionButton";

export default function ProfileHeader({
  title = "Account",
  subtitle = "Manage your personal profile, security settings, notification preferences, and account activity.",
  onEditSettings,
}) {
  return (
    <PageHeader
      title={title}
      subtitle={subtitle}
      showSearch={false}
      showFilters={false}
      showExport={false}
    >
      <HeaderActionButton onClick={onEditSettings} className="w-full max-w-[220px] min-w-0 sm:w-auto">
        Edit Account Settings
      </HeaderActionButton>
    </PageHeader>
  );
}