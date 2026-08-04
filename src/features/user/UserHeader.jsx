import React from "react";
import { UserPlus } from "lucide-react";
import PageHeader from "../../components/Ui/PageHeader";
import HeaderActionButton from "../../components/Ui/HeaderActionButton";
import Dropdown from "../../components/Ui/DropDown";
import SearchInput from "../../components/Ui/SearchInput";

const ROLE_OPTIONS = [
  { label: "Role", value: "" },
  { label: "Operations Admin", value: "Operations Admin" },
  { label: "Fleet Manager", value: "Fleet Manager" },
];

const STATUS_OPTIONS = [
  { label: "Status", value: "" },
  { label: "Active", value: "Active" },
  { label: "Pending", value: "Pending" },
];

export default function UserHeader({
  title = "Users",
  subtitle = "Manage team members, roles, and access permissions.",
  searchQuery = "",
  roleFilter = "",
  statusFilter = "",
  onAddUserClick,
  onSearchChange,
  onRoleChange,
  onStatusChange,
}) {
  return (
    <PageHeader
      title={title}
      subtitle={subtitle}
      showSearch={false}
      showFilter={false}
      showExport={false}
    >
      
      <div className="flex items-center gap-2">
        
        {/* Search Field */}
        <SearchInput
          placeholder="Search Name.."
          value={searchQuery}
          onChange={(e) => onSearchChange && onSearchChange(e.target.value)}
          containerClassName="w-full sm:w-48"
          className="w-full"
        />

        {/* Role Dropdown */}
        <div>
          <Dropdown
            label="Role"
            options={ROLE_OPTIONS}
            selectedValue={roleFilter}
            onSelect={(val) => onRoleChange && onRoleChange(val)}
            className="rounded-full bg-[#18181b]/80 border-[#27272a] py-1.5 px-3.5 text-[11px] text-[#a1a1aa] hover:border-[#3f3f46] hover:text-white transition-colors gap-1.5"
          />
        </div>

        {/* Status Dropdown */}
        <div>
          <Dropdown
            label="Status"
            options={STATUS_OPTIONS}
            selectedValue={statusFilter}
            onSelect={(val) => onStatusChange && onStatusChange(val)}
            className="rounded-full bg-[#18181b]/80 border-[#27272a] py-1.5 px-3.5 text-[11px] text-[#a1a1aa] hover:border-[#3f3f46] hover:text-white transition-colors gap-1.5"
          />
        </div>

        {/* Add User Button */}
        <HeaderActionButton icon={UserPlus} onClick={onAddUserClick} className="min-w-[120px]">
          Add User
        </HeaderActionButton>

      </div>
    </PageHeader>
  );
}