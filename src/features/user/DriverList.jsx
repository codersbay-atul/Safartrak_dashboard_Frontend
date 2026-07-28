import React, { useState, useEffect } from "react";
import { Search, MoreVertical } from "lucide-react";
import Dropdown from "../../components/Ui/DropDown"; 

const ROLE_OPTIONS = [
  { label: "Role", value: "All" },
  { label: "Operations Admin", value: "Operations Admin" },
  { label: "Fleet Manager", value: "Fleet Manager" },
];

const STATUS_OPTIONS = [
  { label: "Status", value: "All" },
  { label: "Active", value: "Active" },
  { label: "Pending", value: "Pending" },
];

export default function DriverList({ selectedUser, onSelectUser }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");

  const users = [
    {
      id: "1",
      name: "Ashoke Sharma",
      empId: "EMP-1001",
      email: "debra.holt@example.com",
      phone: "(702) 555-0122",
      fleet: "West Fleet",
      role: "Operations Admin",
      status: "Active",
      lastActive: "Today 9:45 PM",
      joined: "15 Jan 2024",
      department: "Operation",
    },
    {
      id: "2",
      name: "Vikram Malhotra",
      empId: "EMP-1002",
      email: "jessica.hanson@example.com",
      phone: "(229) 555-0109",
      fleet: "West Fleet",
      role: "Fleet Manager",
      status: "Pending",
      lastActive: "Today 9:45 PM",
      joined: "10 Feb 2024",
      department: "Logistics",
    },
  ];

  useEffect(() => {
    if (!selectedUser && users.length > 0) {
      onSelectUser(users[0]);
    }
  }, [selectedUser, onSelectUser]);

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.empId.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesRole = roleFilter === "All" || user.role === roleFilter;
    const matchesStatus =
      statusFilter === "All" || user.status === statusFilter;

    return matchesSearch && matchesRole && matchesStatus;
  });

  return (
    <div className="w-full h-full bg-[#121214] border border-[#27272a] rounded-2xl flex flex-col overflow-hidden select-none shadow-2xl">
      
      {/* Header & Controls - Tight Fit Spacing */}
      <div className="px-3.5 py-2.5 border-b border-[#27272a] flex items-center justify-between gap-2 shrink-0 bg-[#121214]">
        
        {/* Title */}
        <h2 className="text-[13px] font-semibold text-white tracking-wide">
          Drivers List
        </h2>

        {/* Filter Controls with tight gap */}
        <div className="flex items-center gap-1.5">
          
          {/* Role Dropdown - Tight width */}
          <div>
            <Dropdown
              label="Role"
              options={ROLE_OPTIONS}
              selectedValue={roleFilter}
              onSelect={(val) => setRoleFilter(val)}
              className="rounded-full bg-[#18181b]/80 border-[#27272a] py-1 px-3 text-[11px] text-[#a1a1aa] hover:border-[#3f3f46] hover:text-white transition-colors gap-1.5"
            />
          </div>

          {/* Status Dropdown - Tight width */}
          <div>
            <Dropdown
              label="Status"
              options={STATUS_OPTIONS}
              selectedValue={statusFilter}
              onSelect={(val) => setStatusFilter(val)}
              className="rounded-full bg-[#18181b]/80 border-[#27272a] py-1 px-3 text-[11px] text-[#a1a1aa] hover:border-[#3f3f46] hover:text-white transition-colors gap-1.5"
            />
          </div>

          {/* Search Bar */}
          <div className="relative w-44">
            <input
              type="text"
              placeholder="Search Vehicle..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#18181b]/80 text-[#d4d4d8] text-[11px] rounded-full pl-3.5 pr-8 py-1 border border-[#27272a] focus:outline-none focus:border-[#ffd60a] placeholder-[#71717a] transition-all"
            />
            <Search className="w-3.5 h-3.5 text-[#a1a1aa] absolute right-3 top-2 pointer-events-none" />
          </div>

        </div>
      </div>

      {/* Users Table */}
      <div className="flex-1 overflow-y-auto custom-scrollbar">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-[#27272a] bg-[#18181b]/40 text-[10px] text-[#a1a1aa] font-medium uppercase tracking-wider">
              <th className="py-2.5 px-4">User Details</th>
              <th className="py-2.5 px-4">Contact</th>
              <th className="py-2.5 px-4">Fleet</th>
              <th className="py-2.5 px-4">Role</th>
              <th className="py-2.5 px-4">Status</th>
              <th className="py-2.5 px-4">Last Active</th>
              <th className="py-2.5 px-4 text-center">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#27272a]/50 text-[11px]">
            {filteredUsers.length > 0 ? (
              filteredUsers.map((user) => {
                const isSelected = selectedUser?.id === user.id;
                return (
                  <tr
                    key={user.id}
                    onClick={() => onSelectUser(user)}
                    className={`hover:bg-[#18181b] transition-all cursor-pointer ${
                      isSelected
                        ? "bg-[#18181b] border-l-2 border-l-[#ffd60a]"
                        : ""
                    }`}
                  >
                    {/* User Profile */}
                    <td className="py-2.5 px-4">
                      <div className="flex items-center gap-2.5">
                        <div className="w-7 h-7 rounded-full bg-[#27272a] border border-[#3f3f46] flex items-center justify-center shrink-0 text-[#ffd60a] font-bold text-[10px]">
                          {user.name.charAt(0)}
                        </div>
                        <div>
                          <p className="font-bold text-white leading-tight">
                            {user.name}
                          </p>
                          <p className="text-[9px] font-mono text-[#a1a1aa] leading-tight">
                            {user.empId}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Email & Phone */}
                    <td className="py-2.5 px-4">
                      <p className="text-[#d4d4d8] font-medium leading-tight">
                        {user.email}
                      </p>
                      <p className="text-[9.5px] text-[#71717a] leading-tight">
                        {user.phone}
                      </p>
                    </td>

                    {/* Fleet */}
                    <td className="py-2.5 px-4 text-[#d4d4d8] font-medium">
                      {user.fleet}
                    </td>

                    {/* Role */}
                    <td className="py-2.5 px-4 text-[#d4d4d8] font-medium">
                      {user.role}
                    </td>

                    {/* Status Badge */}
                    <td className="py-2.5 px-4">
                      {user.status === "Active" ? (
                        <span className="px-2.5 py-0.5 rounded-full text-[9px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                          Active
                        </span>
                      ) : (
                        <span className="px-2.5 py-0.5 rounded-full text-[9px] font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/20">
                          Pending
                        </span>
                      )}
                    </td>

                    {/* Last Active */}
                    <td className="py-2.5 px-4 text-[#a1a1aa] text-[10px]">
                      {user.lastActive}
                    </td>

                    {/* Actions */}
                    <td className="py-2.5 px-4 text-center">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                        }}
                        className="p-1 hover:bg-[#27272a] rounded-lg text-[#a1a1aa] hover:text-white transition-colors cursor-pointer"
                      >
                        <MoreVertical className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan="7" className="py-8 text-center text-[#71717a]">
                  No matching users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}