
import React, { useState, useEffect } from "react";
import { Search } from "lucide-react";
import Dropdown from "../../components/Ui/DropDown";
import { getPendingUsers, getUsers } from "../../api/userApi";

const ROLE_OPTIONS = [
  { label: "Role", value: "All" },
  { label: "Fleet Owner", value: "fleet_owner" },
];

const STATUS_OPTIONS = [
  { label: "Status", value: "All" },
  { label: "Active", value: "active" },
  { label: "Pending", value: "pending" },
  { label: "Inactive", value: "inactive" },
];

export default function DriverList({ selectedUser, onSelectUser, refreshTrigger = 0 }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const mappedUsers = users.map((user) => ({
    id: user.id,
    name: user.name || "",
    empId: user.employee_id || "",
    email: user.email || "",
    phone: user.phone || "",
    fleet: user.fleet || "",
    role: user.role || "",
    status: user.status ? user.status.charAt(0).toUpperCase() + user.status.slice(1) : "",
    lastActive: user.last_active_at || "",
  }));

  useEffect(() => {
    let isMounted = true;

    async function loadUsers() {
      try {
        setIsLoading(true);
        const response = statusFilter === "pending"
          ? await getPendingUsers({
              search: searchQuery,
              role: roleFilter === "All" ? "" : roleFilter,
              page: 1,
              page_size: 25,
            })
          : await getUsers({
              search: searchQuery,
              role: roleFilter === "All" ? "" : roleFilter,
              status: statusFilter === "All" ? "" : statusFilter,
              page: 1,
              page_size: 25,
            });

        if (isMounted) {
          setUsers(response.results || []);
        }
      } catch (error) {
        console.error("Failed to load users", error);
        if (isMounted) {
          setUsers([]);
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    loadUsers();

    return () => {
      isMounted = false;
    };
  }, [searchQuery, roleFilter, statusFilter, refreshTrigger]);

  useEffect(() => {
    if (!selectedUser && mappedUsers.length > 0) {
      onSelectUser?.(mappedUsers[0]);
    }
  }, [selectedUser, mappedUsers, onSelectUser]);



  return (
    <div className="w-full h-full min-h-0 bg-[#121214] border border-[#27272a] rounded-2xl flex flex-col overflow-hidden select-none shadow-2xl">
      <div className="sticky top-0 z-10 px-3 py-2 border-b border-[#27272a] flex items-center justify-between shrink-0 bg-[#121214]">
        <h2 className="text-[12px] font-semibold text-white tracking-wide">
          Drivers List
        </h2>

        <div className="flex items-center gap-1.5">
          <Dropdown
            label="Role"
            options={ROLE_OPTIONS}
            selectedValue={roleFilter}
            onSelect={(val) => setRoleFilter(val)}
            className="rounded-full bg-[#18181b]/80 border-[#27272a] py-0.5 px-2 text-[10px] text-[#a1a1aa] hover:border-[#3f3f46] hover:text-white transition-colors"
          />

          <Dropdown
            label="Status"
            options={STATUS_OPTIONS}
            selectedValue={statusFilter}
            onSelect={(val) => setStatusFilter(val)}
            className="rounded-full bg-[#18181b]/80 border-[#27272a] py-0.5 px-2 text-[10px] text-[#a1a1aa] hover:border-[#3f3f46] hover:text-white transition-colors"
          />

          <div className="relative w-32 xl:w-40">
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#18181b]/80 text-[#d4d4d8] text-[10px] rounded-full pl-2.5 pr-6 py-0.5 border border-[#27272a] focus:outline-none focus:border-[#ffd60a] placeholder-[#71717a] transition-all"
            />
            <Search className="w-3 h-3 text-[#a1a1aa] absolute right-2 top-1.5 pointer-events-none" />
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto overflow-x-auto custom-scrollbar min-h-0">
        <table className="w-full text-left border-collapse min-w-[620px]">
          <thead className="sticky top-0 bg-[#18181b] z-10">
            <tr className="border-b border-[#27272a] text-[9px] text-[#a1a1aa] font-medium uppercase tracking-wider">
              <th className="py-2 px-3">User Details</th>
              <th className="py-2 px-3">Contact</th>
              <th className="py-2 px-3">Fleet</th>
              <th className="py-2 px-3">Role</th>
              <th className="py-2 px-3">Status</th>
              <th className="py-2 px-3">Last Active</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#27272a]/50 text-[10px]">
            {isLoading ? (
              <tr>
                <td colSpan="7" className="py-6 text-center text-[#71717a]">
                  Loading users...
                </td>
              </tr>
            ) : mappedUsers.length > 0 ? (
              mappedUsers.map((user) => {
                const isSelected = selectedUser?.id === user.id;
                return (
                  <tr
                    key={user.id}
                    onClick={() => onSelectUser(user)}
                    className={`hover:bg-[#18181b] transition-all cursor-pointer ${
                      isSelected ? "bg-[#18181b] border-l-2 border-l-[#ffd60a]" : ""
                    }`}
                  >
                    <td className="py-2 px-3">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-[#27272a] border border-[#3f3f46] flex items-center justify-center shrink-0 text-[#ffd60a] font-bold text-[9px]">
                          {user.name.charAt(0)}
                        </div>
                        <div className="truncate">
                          <p className="font-bold text-white leading-tight truncate">
                            {user.name}
                          </p>
                          <p className="text-[8.5px] font-mono text-[#a1a1aa] leading-tight">
                            {user.empId}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="py-2 px-3">
                      <p className="text-[#d4d4d8] font-medium leading-tight truncate">
                        {user.email}
                      </p>
                      <p className="text-[8.5px] text-[#71717a] leading-tight truncate">
                        {user.phone}
                      </p>
                    </td>

                    <td className="py-2 px-3 text-[#d4d4d8] font-medium truncate">
                      {user.fleet}
                    </td>

                    <td className="py-2 px-3 text-[#d4d4d8] font-medium truncate">
                      {user.role}
                    </td>

                    <td className="py-2 px-3">
                      <span
                        className={`px-2 py-0.5 rounded-full text-[8px] font-semibold ${
                          user.status === "Active"
                            ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                            : user.status === "Inactive"
                            ? "bg-rose-500/10 text-rose-400 border border-rose-500/20"
                            : "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                        }`}
                      >
                        {user.status}
                      </span>
                    </td>

                    <td className="py-2 px-3 text-[#a1a1aa] text-[9px] truncate">
                      {user.lastActive}
                    </td>

                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan="7" className="py-6 text-center text-[#71717a]">
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