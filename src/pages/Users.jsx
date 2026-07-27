import React, { useState } from "react";
import MainLayout from "../layouts/MainLayout";
import UsersHeader from "../features/user/UserHeader";
import UsersStatsCard from "../features/user/UserStats";
import DriverList from "../features/user/DriverList";
import DriverDetailPanel from "../features/user/DriveDetailPanel";

export default function Users() {
  const [selectedUser, setSelectedUser] = useState(null);

  return (
    <MainLayout>
      <div className="h-screen max-h-screen p-3 bg-[#090b0e] flex flex-col gap-2.5 overflow-hidden text-gray-200">
     
        <UsersHeader/>
        <UsersStatsCard/>

        
        <div className="flex-1 min-h-0 grid grid-cols-12 gap-2.5 overflow-hidden mt-1">
          <div className="col-span-8 h-full min-h-0">
            <DriverList
              selectedUser={selectedUser}
              onSelectUser={setSelectedUser}
            />
          </div>

          <div className="col-span-4 h-full min-h-0">
            <DriverDetailPanel user={selectedUser} />
          </div>
        </div>
      </div>
    </MainLayout>
  );
}