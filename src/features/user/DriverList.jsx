import React, { useState, useEffect } from "react";
import { getPendingUsers, getUsers } from "../../api/userApi";
import MainDropDown from "../../components/Ui/MainLayoutUI/MainDropDown";
import MainSearchInput from "../../components/Ui/MainLayoutUI/MainSearchInput";
import MainLayoutColor from "../../components/Ui/MainLayoutUI/MainLayoutColor";
import MainLayoutTextSize from "../../components/Ui/MainLayoutUI/MainLayoutTextSize";

const ROLE_OPTIONS = [
  { label: "Role", value: "All" },
  { label: "Fleet Owner", value: "fleet_owner" },
];

const STATUS_OPTIONS = [
  { label: "Status", value: "All" },
  { label: "Inactive", value: "Inactive" },
  { label: "Pending", value: "pending" },
  { label: "InInactive", value: "inInactive" },
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
    lastInactive: user.last_Inactive_at || "",
  }));

  useEffect(() => {
    let isMounted = true;

    async function loadUsers() {
      try {
        setIsLoading(true);
        const response =
          statusFilter === "pending"
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
    <MainLayoutColor
      as="div"
      background="surface"
      className="w-full h-auto lg:h-full min-h-0 border border-[#27272a] rounded-2xl flex flex-col overflow-hidden select-none shadow-2xl font-sans"
    >
      {/* Top Header & Tight Pill-shaped Filters */}
      <MainLayoutColor
        as="div"
        background="surface"
        className="sticky top-0 z-10 px-3 py-2 border-b border-[#27272a] flex items-center justify-between shrink-0"
      >
        <MainLayoutColor
          as={MainLayoutTextSize}
          color="title"
          size="sectionTitle"
          className="font-medium tracking-tight block"
        >
          Drivers List
        </MainLayoutColor>

        {/* Filters Group */}
        <div className="flex items-center gap-1.5">
          {/* Role Filter */}
          <MainDropDown
            label="Role"
            options={ROLE_OPTIONS}
            selectedValue={roleFilter}
            onSelect={(val) => setRoleFilter(val)}
            className="rounded-full bg-[#18181b]/80 border-[#27272a] py-0.5 px-2.5 text-[11px] font-medium text-white hover:border-[#3f3f46] transition-all focus:border-[var(--color-yellow,#ffd60a)] shrink-0"
          />

          {/* Status Filter */}
          <MainDropDown
            label="Status"
            options={STATUS_OPTIONS}
            selectedValue={statusFilter}
            onSelect={(val) => setStatusFilter(val)}
            className="rounded-full bg-[#18181b]/80 border-[#27272a] py-0.5 px-2.5 text-[11px] font-medium text-white hover:border-[#3f3f46] transition-all focus:border-[var(--color-yellow,#ffd60a)] shrink-0"
          />

          {/* Search Input */}
          <div className="w-32 xl:w-40">
            <MainSearchInput
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-full bg-[#18181b]/80 border-[#27272a] py-0.5 px-3 text-[11px] text-white focus:border-[var(--color-yellow,#ffd60a)]"
            />
          </div>
        </div>
      </MainLayoutColor>

      {/* Users Table */}
      <div className="flex-none lg:flex-1 overflow-y-visible lg:overflow-y-auto custom-scrollbar">
        <table className="w-full text-left border-collapse table-fixed">
          <thead>
            <tr className="border-b border-[#27272a] bg-[#18181b]/40">
              <th className="pt-1.5 pb-1 px-3.5 w-[22%] whitespace-nowrap">
                <MainLayoutColor as={MainLayoutTextSize} color="subtitle" size="subInfoText" className="uppercase font-medium">
                  User Details
                </MainLayoutColor>
              </th>
              <th className="pt-1.5 pb-1 px-3.5 w-[22%] whitespace-nowrap">
                <MainLayoutColor as={MainLayoutTextSize} color="subtitle" size="subInfoText" className="uppercase font-medium">
                  Contact
                </MainLayoutColor>
              </th>
              <th className="pt-1.5 pb-1 px-3.5 w-[13%] whitespace-nowrap">
                <MainLayoutColor as={MainLayoutTextSize} color="subtitle" size="subInfoText" className="uppercase font-medium">
                  Fleet
                </MainLayoutColor>
              </th>
              <th className="pt-1.5 pb-1 px-3.5 w-[13%] whitespace-nowrap">
                <MainLayoutColor as={MainLayoutTextSize} color="subtitle" size="subInfoText" className="uppercase font-medium">
                  Role
                </MainLayoutColor>
              </th>
              <th className="pt-1.5 pb-1 px-3.5 w-[16%] whitespace-nowrap">
                <MainLayoutColor as={MainLayoutTextSize} color="subtitle" size="subInfoText" className="uppercase font-medium">
                  Status
                </MainLayoutColor>
              </th>
              <th className="pt-1.5 pb-1 px-3.5 w-[14%] whitespace-nowrap">
                <MainLayoutColor as={MainLayoutTextSize} color="subtitle" size="subInfoText" className="uppercase font-medium">
                  Last Inactive
                </MainLayoutColor>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#27272a]/50">
            {isLoading ? (
              <tr>
                <td colSpan="6" className="py-6 text-center">
                  <MainLayoutColor as={MainLayoutTextSize} color="subtitle" size="subInfoText">
                    Loading users...
                  </MainLayoutColor>
                </td>
              </tr>
            ) : mappedUsers.length > 0 ? (
              mappedUsers.map((user) => {
                const isSelected = selectedUser?.id === user.id;
                return (
                  <tr
                    key={user.id}
                    onClick={() => onSelectUser(user)}
                    className={`transition-all duration-150 cursor-pointer ${
                      isSelected
                        ? "bg-black border-l-2 border-l-[var(--color-yellow,#ffd60a)] shadow-inner"
                        : "bg-transparent hover:bg-[#1f2025]"
                    }`}
                  >
                    {/* User Details */}
                    <td className="py-2.5 px-3.5 truncate">
                      <div className="flex items-center gap-2.5 min-w-0">
                        <div className="w-8 h-8 rounded-full bg-[#27272a] border border-[#3f3f46] flex items-center justify-center shrink-0 text-[var(--color-yellow,#ffd60a)] font-bold text-[12px]">
                          {user.name.charAt(0)}
                        </div>
                        <div className="truncate min-w-0">
                          <MainLayoutColor
                            as={MainLayoutTextSize}
                            color="title"
                            size="sectionTitle"
                            className="font-medium leading-tight truncate block"
                          >
                            {user.name}
                          </MainLayoutColor>
                          <MainLayoutColor
                            as={MainLayoutTextSize}
                            color="subtitle"
                            size="subInfoText"
                            className="font-mono leading-tight block mt-0.5 truncate"
                          >
                            {user.empId}
                          </MainLayoutColor>
                        </div>
                      </div>
                    </td>

                    {/* Contact */}
                    <td className="py-2.5 px-3.5 truncate">
                      <div className="min-w-0 truncate">
                        <MainLayoutColor
                          as={MainLayoutTextSize}
                          color="title"
                          size="sectionTitle"
                          className="font-medium leading-tight truncate block"
                        >
                          {user.email}
                        </MainLayoutColor>
                        <MainLayoutColor
                          as={MainLayoutTextSize}
                          color="subtitle"
                          size="subInfoText"
                          className="leading-tight truncate block mt-0.5"
                        >
                          {user.phone}
                        </MainLayoutColor>
                      </div>
                    </td>

                    {/* Fleet */}
                    <td className="py-2.5 px-3.5 truncate">
                      <MainLayoutColor
                        as={MainLayoutTextSize}
                        color="subtitle"
                        size="sectionTitle"
                        className="font-medium truncate block"
                      >
                        {user.fleet}
                      </MainLayoutColor>
                    </td>

                    {/* Role */}
                    <td className="py-2.5 px-3.5 truncate">
                      <MainLayoutColor
                        as={MainLayoutTextSize}
                        color="subtitle"
                        size="sectionTitle"
                        className="font-medium truncate block"
                      >
                        {user.role}
                      </MainLayoutColor>
                    </td>

                    {/* Status Badge without truncation */}
                    <td className="py-2.5 px-3.5 overflow-visible">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full whitespace-nowrap shrink-0 ${
                          user.status === "Inactive"
                            ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                            : user.status === "InInactive"
                            ? "bg-rose-500/10 text-rose-400 border border-rose-500/20"
                            : "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                        }`}
                      >
                        <MainLayoutTextSize size="badgeText" className="font-medium whitespace-nowrap">
                          {user.status}
                        </MainLayoutTextSize>
                      </span>
                    </td>

                    {/* Last Inactive */}
                    <td className="py-2.5 px-3.5 truncate">
                      <MainLayoutColor
                        as={MainLayoutTextSize}
                        color="subtitle"
                        size="subInfoText"
                        className="truncate block"
                      >
                        {user.lastInactive}
                      </MainLayoutColor>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan="6" className="py-6 text-center">
                  <MainLayoutColor as={MainLayoutTextSize} color="subtitle" size="subInfoText">
                    No matching users found.
                  </MainLayoutColor>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </MainLayoutColor>
  );
}