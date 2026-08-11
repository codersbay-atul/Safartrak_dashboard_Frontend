import React from "react";
import { UserPlus } from "lucide-react";
import PageHeader from "../../components/Ui/PageHeader";
import HeaderActionButton from "../../components/Ui/HeaderActionButton";

export default function UserHeader({
  title = "Users",
  subtitle = "Manage team members, roles, and access permissions.",
  onAddUserClick,
  onSearchChange,
}) {
  return (
    <PageHeader
      title={title}
      subtitle={subtitle}
      showSearch={true}
      searchPlaceholder="Search Users"
      onSearch={onSearchChange}
      showFilters={false}
      showExport={false}
    >
      <HeaderActionButton
        icon={UserPlus}
        onClick={onAddUserClick}
        className="min-w-[120px]"
      >
        Add User
      </HeaderActionButton>
    </PageHeader>
  );
}