import React, { useState, useEffect } from "react";
import { Search, ChevronDown, MoreVertical } from "lucide-react";

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
      name: "Ashoke Sharma",
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

  // Auto-select first user on initial render
  useEffect(() => {
    if (!selectedUser && users.length > 0) {
      onSelectUser(users[0]);
    }
  }, [selectedUser, onSelectUser]);

  // Filter & Search Logic
  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.empId.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesRole = roleFilter === "All" || user.role === roleFilter;
    const matchesStatus = statusFilter === "All" || user.status === statusFilter;

    return matchesSearch && matchesRole && matchesStatus;
  });

  return (
    <div className="w-full h-full bg-[#12151a] border border-gray-800/80 rounded-xl flex flex-col overflow-hidden">
      {/* Header & Filters */}
      <div className="p-3 border-b border-gray-800/80 flex items-center justify-between gap-3 shrink-0">
        <h2 className="text-sm font-bold text-white tracking-wide">
          Users List
        </h2>

        <div className="flex items-center gap-2">
          {/* Role Filter */}
          <div className="relative">
            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              className="bg-[#161a20] text-gray-300 text-[11px] rounded-lg px-2.5 py-1.5 pr-7 appearance-none border border-gray-800 focus:outline-none focus:border-amber-500 cursor-pointer"
            >
              <option value="All">Role</option>
              <option value="Operations Admin">Operations Admin</option>
              <option value="Fleet Manager">Fleet Manager</option>
            </select>
            <ChevronDown className="w-3 h-3 text-gray-400 absolute right-2 top-2.5 pointer-events-none" />
          </div>

          {/* Status Filter */}
          <div className="relative">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="bg-[#161a20] text-gray-300 text-[11px] rounded-lg px-2.5 py-1.5 pr-7 appearance-none border border-gray-800 focus:outline-none focus:border-amber-500 cursor-pointer"
            >
              <option value="All">Status</option>
              <option value="Active">Active</option>
              <option value="Pending">Pending</option>
            </select>
            <ChevronDown className="w-3 h-3 text-gray-400 absolute right-2 top-2.5 pointer-events-none" />
          </div>

          {/* Search */}
          <div className="relative w-48">
            <input
              type="text"
              placeholder="Search User..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#161a20] text-gray-300 text-[11px] rounded-lg pl-3 pr-7 py-1.5 border border-gray-800 focus:outline-none focus:border-amber-500"
            />
            <Search className="w-3.5 h-3.5 text-gray-400 absolute right-2 top-2" />
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="flex-1 overflow-y-auto custom-scrollbar">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-gray-800/60 bg-[#161a20]/50 text-[11px] text-gray-400 font-medium">
              <th className="py-2.5 px-3">User</th>
              <th className="py-2.5 px-3">Email</th>
              <th className="py-2.5 px-3">Assigned Fleet</th>
              <th className="py-2.5 px-3">Role</th>
              <th className="py-2.5 px-3">Status</th>
              <th className="py-2.5 px-3">Last Active</th>
              <th className="py-2.5 px-3 text-center">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-800/40 text-[11.5px]">
            {filteredUsers.map((user) => {
              const isSelected = selectedUser?.id === user.id;
              return (
                <tr
                  key={user.id}
                  onClick={() => onSelectUser(user)}
                  className={`hover:bg-[#161a20]/80 transition cursor-pointer ${
                    isSelected ? "bg-[#181d24]" : ""
                  }`}
                >
                  <td className="py-2.5 px-3">
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-full bg-gray-300 shrink-0" />
                      <div>
                        <p className="font-semibold text-white leading-tight">
                          {user.name}
                        </p>
                        <p className="text-[9.5px] text-gray-400 leading-tight">
                          {user.empId}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="py-2.5 px-3">
                    <p className="text-gray-300 leading-tight">{user.email}</p>
                    <p className="text-[9.5px] text-gray-500 leading-tight">
                      {user.phone}
                    </p>
                  </td>
                  <td className="py-2.5 px-3 text-gray-300">{user.fleet}</td>
                  <td className="py-2.5 px-3 text-gray-300">{user.role}</td>
                  <td className="py-2.5 px-3">
                    {user.status === "Active" ? (
                      <span className="px-2 py-0.5 rounded-full text-[9.5px] font-medium bg-green-950/80 text-green-400 border border-green-800/50">
                        Active
                      </span>
                    ) : (
                      <span className="px-2 py-0.5 rounded-full text-[9.5px] font-medium bg-amber-950/80 text-amber-500 border border-amber-800/50">
                        Pending
                      </span>
                    )}
                  </td>
                  <td className="py-2.5 px-3 text-gray-400">{user.lastActive}</td>
                  <td className="py-2.5 px-3 text-center">
                    <button
                      onClick={(e) => e.stopPropagation()}
                      className="p-1 hover:bg-gray-800 rounded text-gray-400 hover:text-white transition"
                    >
                      <MoreVertical className="w-3.5 h-3.5" />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}