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

        {/* Add User Button */}
        <Button
          type="button"
          variant="primary"
          size="sm"
          icon={UserPlus}
          iconPosition="left"
          onClick={onAddUserClick}
          className="!w-[120px] min-w-[130px] !h-[35px] !rounded-[8px] !bg-[#FFC107] hover:!bg-[#e6ac00] active:scale-[0.98] !text-black !font-normal !text-[16px] !px-[18px] !py-0 gap-2 whitespace-nowrap flex-nowrap flex-shrink-0 [&_svg]:size-[15px] [&_span]:!overflow-visible [&_span]:!max-w-none"
        >
          Add User
        </Button>

      </div>
    </PageHeader>
  );
}