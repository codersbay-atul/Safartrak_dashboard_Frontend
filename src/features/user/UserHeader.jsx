import React from "react";
import { UserPlus } from "lucide-react";
import MainLayoutHeader from "../../components/Ui/MainLayoutUI/MainLayoutHeader";

export default function UserHeader({
  title = "Users",
  subtitle = "Manage team members, roles, and access permissions.",
  onAddUserClick,
  onSearchChange,
}) {
  return (
    <MainLayoutHeader
      title={title}
      subtitle={subtitle}
      searchPlaceholder="Search Users"
      searchIconPosition="left"
      showExport={false}
      showFilters={false}
      onSearch={onSearchChange}
      actionButtonLabel="Add User"
      actionButtonIcon={UserPlus}
      onActionClick={onAddUserClick}
      actionButtonClassName="min-w-[120px]"
    />
  );
}