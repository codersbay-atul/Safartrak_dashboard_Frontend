import React, { useState } from "react";
import { UserPlus, Search, ChevronDown } from "lucide-react";
import Button from "../../components/Ui/Button";

export default function UsersHeader({
  title = "Users",
  subtitle = "Manage team members, roles, and access permissions.",
  onAddUserClick,
  onSearchChange,
  onRoleChange,
  onStatusChange,
}) {
  const [searchQuery, setSearchQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  const handleSearch = (e) => {
    const val = e.target.value;
    setSearchQuery(val);
    if (onSearchChange) onSearchChange(val);
  };

  const handleRole = (e) => {
    const val = e.target.value;
    setRoleFilter(val);
    if (onRoleChange) onRoleChange(val);
  };

  const handleStatus = (e) => {
    const val = e.target.value;
    setStatusFilter(val);
    if (onStatusChange) onStatusChange(val);
  };

  return (
    <div className="w-full flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-1 shrink-0">
      {/* Title & Subtitle */}
      <div>
        <h1 className="text-base font-bold text-white leading-tight">{title}</h1>
        <p className="text-[11px] text-gray-400 mt-0.5">{subtitle}</p>
      </div>

      {/* Right Controls Bar (Search, Role, Status, Add User Button) */}
      <div className="flex items-center gap-2 flex-wrap">
        {/* Search Bar */}
        <div className="relative w-48">
          <input
            type="text"
            placeholder="Search Vehicle..."
            value={searchQuery}
            onChange={handleSearch}
            className="w-full bg-[#12151a] text-gray-300 text-[11px] rounded-lg pl-3 pr-8 py-1.5 border border-gray-800 focus:outline-none focus:border-amber-500 placeholder-gray-500"
          />
          <Search className="w-3.5 h-3.5 text-gray-400 absolute right-2.5 top-2" />
        </div>

        {/* Role Filter Dropdown */}
        <div className="relative">
          <select
            value={roleFilter}
            onChange={handleRole}
            className="bg-[#12151a] text-gray-300 text-[11px] rounded-lg pl-3 pr-7 py-1.5 appearance-none border border-gray-800 focus:outline-none focus:border-amber-500 cursor-pointer"
          >
            <option value="">Role</option>
            <option value="Operations Admin">Operations Admin</option>
            <option value="Fleet Manager">Fleet Manager</option>
          </select>
          <ChevronDown className="w-3 h-3 text-gray-400 absolute right-2 top-2.5 pointer-events-none" />
        </div>

        {/* Status Filter Dropdown */}
        <div className="relative">
          <select
            value={statusFilter}
            onChange={handleStatus}
            className="bg-[#12151a] text-gray-300 text-[11px] rounded-lg pl-3 pr-7 py-1.5 appearance-none border border-gray-800 focus:outline-none focus:border-amber-500 cursor-pointer"
          >
            <option value="">Status</option>
            <option value="Active">Active</option>
            <option value="Pending">Pending</option>
          </select>
          <ChevronDown className="w-3 h-3 text-gray-400 absolute right-2 top-2.5 pointer-events-none" />
        </div>

        {/* Add User Button (Primary Peela) */}
        <Button
          variant="primary"
          size="sm"
          icon={UserPlus}
          iconPosition="left"
          onClick={onAddUserClick}
          className="font-bold whitespace-nowrap px-3 py-1.5 text-[10.5px] bg-[#ffd60a] text-black hover:bg-amber-400 border-none rounded-lg flex items-center gap-1.5"
        >
          Add User
        </Button>
      </div>
    </div>
  );
}