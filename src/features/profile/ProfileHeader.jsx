import React from "react";
import PageHeader from "../../components/Ui/PageHeader";
import Button from "../../components/Ui/Button";

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
      showFilter={false}
      showExport={false}
    >
      <Button
        variant="primary"
        size="sm"
        onClick={onEditSettings}
        className="w-full max-w-[220px] min-w-0 sm:w-auto h-9 rounded-lg bg-[#FFC107] hover:bg-[#e6ac00] active:scale-[0.98] text-black font-medium text-[13px] px-4 py-0 whitespace-nowrap shrink-0"
      >
        Edit Account Settings
      </Button>
    </PageHeader>
  
  );
}