import React from "react";
import { UserPlus, Search } from "lucide-react";
import PageHeader from "../../components/Ui/PageHeader";
import Button from "../../components/Ui/Button";
import Dropdown from "../../components/Ui/DropDown";

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
  onInviteUserClick,
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
      {/* Right controls layout matching exact image */}
      <div className="flex items-center gap-2">
        
        {/* Search Field */}
        <div className="relative w-48">
          <input
            type="text"
            placeholder="Search Name.."
            value={searchQuery}
            onChange={(e) => onSearchChange && onSearchChange(e.target.value)}
            className="w-full bg-[#18181b]/80 text-[#d4d4d8] text-[11px] rounded-full pl-4 pr-8 py-1.5 border border-[#27272a] focus:outline-none focus:border-[#ffd60a] placeholder-[#71717a] transition-all"
          />
          <Search className="w-3.5 h-3.5 text-[#a1a1aa] absolute right-3 top-2.5 pointer-events-none" />
        </div>

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

        {/* Invite User Button */}
        <Button
          type="button"
          variant="secondary"
          size="sm"
          icon={UserPlus}
          iconPosition="left"
          onClick={onInviteUserClick}
          className="font-semibold whitespace-nowrap px-4 py-1.5 text-[11px] text-white bg-[#18181b] border border-[#27272a] hover:bg-[#212125] rounded-full flex items-center gap-1.5 cursor-pointer transition-colors"
        >
          Invite User
        </Button>

        {/* Add User Button */}
        <Button
          type="button"
          variant="primary"
          size="sm"
          icon={UserPlus}
          iconPosition="left"
          onClick={onAddUserClick}
          className="font-bold whitespace-nowrap px-4 py-1.5 text-[11px] bg-[#ffd60a] text-black hover:bg-[#e6c208] border-none rounded-full flex items-center gap-1.5 cursor-pointer shadow-md transition-colors ml-1"
        >
          Add User
        </Button>

      </div>
    </PageHeader>
  );
}