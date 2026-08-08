import React from "react";
import { UserPlus } from "lucide-react";
import PageHeader from "../../components/Ui/PageHeader";
import HeaderActionButton from "../../components/Ui/HeaderActionButton";
import SearchInput from "../../components/Ui/SearchInput";

export default function UserHeader({
  title = "Users",
  subtitle = "Manage team members, roles, and access permissions.",
  searchQuery = "",
  onAddUserClick,
  onSearchChange,
}) {
  return (
    <PageHeader
      title={title}
      subtitle={subtitle}
      showSearch={false}
      showFilter={false}
      showExport={false}
    >
      <div className="flex flex-col gap-2 w-full sm:flex-row sm:flex-wrap sm:items-center sm:justify-end">
        <div className="w-full sm:w-auto">
          <SearchInput
            placeholder="Search Name.."
            value={searchQuery}
            onChange={(e) => onSearchChange && onSearchChange(e.target.value)}
            containerClassName="w-full sm:w-48"
            className="w-full"
          />
        </div>

        <div className="w-full sm:w-auto">
          <HeaderActionButton icon={UserPlus} onClick={onAddUserClick} className="w-full sm:w-auto min-w-[120px]">
            Add User
          </HeaderActionButton>
        </div>
      </div>
    </PageHeader>
  );
}