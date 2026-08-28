import React, { useState, useEffect } from "react";
import { Users } from "lucide-react";
import { getUsers } from "../../api/userApi";
import MainLayoutColor from "../../components/Ui/MainLayoutUI/MainLayoutColor";
import MainLayoutTextSize from "../../components/Ui/MainLayoutUI/MainLayoutTextSize";
import MainTableHeader from "../../components/Ui/MainLayoutUI/MainTableHeader";
import MainStatusBadge from "../../components/Ui/MainLayoutUI/MainStatusBadge";

export default function DriverList({ selectedUser, onSelectUser, refreshTrigger = 0 }) {
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
    status: user.status ? user.status.charAt(0).toUpperCase() + user.status.slice(1) : "Inactive",
    lastActive: user.last_active_at || user.last_Inactive_at || "",
  }));

  useEffect(() => {
    let isMounted = true;

    async function loadUsers() {
      try {
        setIsLoading(true);
        const response = await getUsers({
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
  }, [refreshTrigger]);

  useEffect(() => {
    if (!selectedUser && mappedUsers.length > 0) {
      onSelectUser?.(mappedUsers[0]);
    }
  }, [selectedUser, mappedUsers, onSelectUser]);

  return (
    <div className="w-full h-auto lg:h-full min-h-0 flex flex-col gap-2.5 font-sans select-none">
      {/* Outside Header Toolbar
      <div className="flex items-center justify-between gap-2 px-1 shrink-0">
        <div className="flex items-center gap-2">
          <MainLayoutColor
            as={Users}
            color="yellow"
            className="w-4 h-4 shrink-0"
          />
          <MainLayoutColor
            as={MainLayoutTextSize}
            color="title"
            size="sectionTitle"
            className="font-bold tracking-tight block"
          >
            Drivers List
          </MainLayoutColor>
        </div>
      </div> */}

      {/* Users Table Card Container */}
      <MainLayoutColor
        as="div"
        background="surface"
        border="cardBorder"
        className="w-full flex-none lg:flex-1 min-h-0 rounded-2xl flex flex-col overflow-hidden shadow-2xl"
      >
        {/* Scrollable Container with Fixed Sticky Header */}
        <div className="flex-none lg:flex-1 overflow-y-visible lg:overflow-y-auto custom-scrollbar relative">
          <table className="w-full text-left border-collapse table-fixed">
            <thead className="sticky top-0 z-10 shadow-sm">
              <MainLayoutColor
                as="tr"
                background="tableHeaderBg"
                border="cardBorder"
                className="border-b"
              >
                <MainTableHeader className="py-3 px-4 w-[22%]">
                  User Details
                </MainTableHeader>
                <MainTableHeader className="py-3 px-4 w-[22%]">
                  Contact
                </MainTableHeader>
                <MainTableHeader className="py-3 px-4 w-[13%]">
                  Fleet
                </MainTableHeader>
                <MainTableHeader className="py-3 px-4 w-[13%]">
                  Role
                </MainTableHeader>
                <MainTableHeader className="py-3 px-4 w-[16%]">
                  Status
                </MainTableHeader>
                <MainTableHeader className="py-3 px-4 w-[14%]">
                  Last Active
                </MainTableHeader>
              </MainLayoutColor>
            </thead>

            <tbody className="divide-y divide-[#27272a]/50">
              {isLoading ? (
                <tr>
                  <td colSpan={6} className="py-8 text-center">
                    <MainLayoutColor as={MainLayoutTextSize} color="subtitle" size="subInfoText">
                      Loading users...
                    </MainLayoutColor>
                  </td>
                </tr>
              ) : mappedUsers.length > 0 ? (
                mappedUsers.map((user) => {
                  const isSelected = selectedUser?.id === user.id;

                  return (
                    <MainLayoutColor
                      key={user.id}
                      as="tr"
                      background={isSelected ? "selectedRowBg" : "transparent"}
                      onClick={() => onSelectUser(user)}
                      className={`transition-all duration-150 cursor-pointer ${
                        isSelected ? "border-l-2 border-l-[#ffd60a]" : "hover:bg-[#1f2025]"
                      }`}
                    >
                      {/* User Details Column */}
                      <td className="py-3 px-4 truncate">
                        <div className="flex items-center gap-2.5 min-w-0">
                          <MainLayoutColor
                            as="div"
                            background="filterActiveBg"
                            color="yellow"
                            className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 font-bold text-[12px]"
                          >
                            {user.name.charAt(0)}
                          </MainLayoutColor>
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

                      {/* Contact Column */}
                      <td className="py-3 px-4 truncate">
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

                      {/* Fleet Column */}
                      <td className="py-3 px-4 truncate">
                        <MainLayoutColor
                          as={MainLayoutTextSize}
                          color="subtitle"
                          size="sectionTitle"
                          className="font-medium truncate block"
                        >
                          {user.fleet}
                        </MainLayoutColor>
                      </td>

                      {/* Role Column */}
                      <td className="py-3 px-4 truncate">
                        <MainLayoutColor
                          as={MainLayoutTextSize}
                          color="subtitle"
                          size="sectionTitle"
                          className="font-medium truncate block"
                        >
                          {user.role}
                        </MainLayoutColor>
                      </td>

                      {/* Status Badge Column */}
                      <td className="py-3 px-4 overflow-visible">
                        <MainStatusBadge status={user.status} showDot={false} />
                      </td>

                      {/* Last Active Column */}
                      <td className="py-3 px-4 truncate">
                        <MainLayoutColor
                          as={MainLayoutTextSize}
                          color="subtitle"
                          size="subInfoText"
                          className="truncate block"
                        >
                          {user.lastActive}
                        </MainLayoutColor>
                      </td>
                    </MainLayoutColor>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={6} className="py-8 text-center">
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
    </div>
  );
}