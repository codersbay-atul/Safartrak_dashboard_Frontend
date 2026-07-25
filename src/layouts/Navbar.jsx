import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, 
  BarChart3, 
  Clock3,
  Power,
  TriangleAlert, 
  ScanSearch, 
  Route, 
  GitBranch, 
  Send, 
  Truck, 
  IdCard, 
  FileSearch, 
  Users, 
  Bell, 
  Calendar,
  User,
  Settings,
  LogOut
} from 'lucide-react';

import { useOutsideClick } from '../hooks/UseOutsideClick';
import Popover from '../components/Ui/Popover';
import NotificationItem from '../components/Ui/NotificationItem';
import UserAvatar from '../components/Ui/UserAvatar';

function NavPopoverWrapper({ children, isOpen, onClose }) {
  const wrapperRef = useOutsideClick(() => {
    if (isOpen) onClose();
  });

  return (
    <div ref={wrapperRef} className="relative">
      {children}
    </div>
  );
}

const iconMap = {
  "Dashboard": LayoutDashboard,
  "Analytics": BarChart3,
  "Reports": Clock3,
  "Mobilize / Immobilize": Power,
  "Alerts": TriangleAlert,
  "Area of Interest (AOI)": ScanSearch,
  "Routes": Route,
  "Trips": GitBranch,
  "Activity": Send,
  "Vehicles": Truck,
  "Drivers": IdCard,
  "Vehicle Details": FileSearch,
  "Users": Users
};

export default function Navbar({ activeTab, isRouteView }) {
  const ActiveIcon = iconMap[activeTab] || LayoutDashboard;

  const [unreadCount, setUnreadCount] = useState(2);
  const [activePopover, setActivePopover] = useState(null); // 'notif' | 'calendar' | 'profile' | null
  
  // Live Date State
  const [currentDate, setCurrentDate] = useState(new Date());

  // Auto-update date every 1 minute
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDate(new Date());
    }, 60000);

    return () => clearInterval(timer);
  }, []);

  const weekday = currentDate.toLocaleDateString('en-US', { weekday: 'long' });
  const monthDayYear = currentDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });

  const togglePopover = (key) => {
    setActivePopover(prev => (prev === key ? null : key));
  };

  const closePopover = () => setActivePopover(null);

  return (
    <header className="flex items-center justify-between px-3 sm:px-6 py-2.5 border-b border-[#1f1f23] bg-[#09090b] sticky top-0 z-30 select-none">
      
      {/* Left Side: Breadcrumb Title */}
      <div className="flex items-center gap-2 text-[11px] text-[#a1a1aa] font-medium tracking-wide min-w-0">
        <div className="w-10 h-1 shrink-0 lg:hidden" />
        <ActiveIcon size={14} className="text-[#71717a] shrink-0" />
        <span className="text-white font-semibold truncate">
          {activeTab === "Dashboard" && isRouteView ? "Route Details" : (activeTab || "Dashboard")}
        </span>
      </div>

      {/* Right Side: Actions */}
      <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
        
        {/* 1. Notifications Bell */}
        <NavPopoverWrapper isOpen={activePopover === 'notif'} onClose={closePopover}>
          <button 
            onClick={() => togglePopover('notif')}
            className="p-1.5 rounded-full bg-[#18181b] border border-[#27272a] text-[#a1a1aa] hover:text-white transition-colors relative cursor-pointer"
            aria-label="Notifications"
          >
            <Bell size={13} />
            {unreadCount > 0 && <span className="absolute top-1 right-1 w-1.5 h-1.5 bg-[#ef4444] rounded-full" />}
          </button>

          <Popover isOpen={activePopover === 'notif'} className="w-72 right-0 p-3">
            <div className="flex items-center justify-between border-b border-[#27272a] pb-2 mb-2">
              <h4 className="text-xs font-bold text-white">Notifications</h4>
              {unreadCount > 0 && (
                <button 
                  onClick={() => setUnreadCount(0)} 
                  className="text-[10px] text-[#3b82f6] hover:underline cursor-pointer font-medium"
                >
                  Mark all as read
                </button>
              )}
            </div>
            <div className="flex flex-col gap-1.5">
              <NotificationItem
                title="Speed Threshold Exceeded" 
                description="MH14-2394 crossed 80 km/h." 
                time="2m ago" 
                isUnread={true} 
              />
              <NotificationItem
                title="Geofence Exit" 
                description="MH12-9901 left Depot Terminal." 
                time="1h ago" 
                isUnread={false} 
              />
            </div>
          </Popover>
        </NavPopoverWrapper>

        {/* 2. Calendar Date Scope */}
        <NavPopoverWrapper isOpen={activePopover === 'calendar'} onClose={closePopover}>
          <button 
            onClick={() => togglePopover('calendar')}
            className="p-1.5 rounded-full bg-[#18181b] border border-[#27272a] text-[#a1a1aa] hover:text-white transition-colors cursor-pointer"
            aria-label="Calendar Scope"
          >
            <Calendar size={13} />
          </button>

          <Popover isOpen={activePopover === 'calendar'} className="w-44 right-0 p-2 text-xs">
            <p className="text-[9.5px] text-[#a1a1aa] font-bold uppercase tracking-wider px-2 py-1">Date Scope</p>
            <button onClick={closePopover} className="w-full text-left px-2 py-1.5 hover:bg-[#18181b] rounded text-[#a1a1aa] hover:text-white cursor-pointer">Today</button>
            <button onClick={closePopover} className="w-full text-left px-2 py-1.5 hover:bg-[#18181b] rounded text-[#a1a1aa] hover:text-white cursor-pointer">Last 7 Days</button>
            <button onClick={closePopover} className="w-full text-left px-2 py-1.5 hover:bg-[#18181b] rounded text-[#a1a1aa] hover:text-white cursor-pointer">This Month</button>
          </Popover>
        </NavPopoverWrapper>

        {/* 3. Live System Date */}
        <div className="hidden sm:block text-right leading-none shrink-0">
          <p className="text-[10px] font-semibold text-white">{weekday},</p>
          <p className="text-[8.5px] text-[#a1a1aa] mt-0.5">{monthDayYear}</p>
        </div>

        {/* 4. User Profile Dropdown */}
        <NavPopoverWrapper isOpen={activePopover === 'profile'} onClose={closePopover}>
          <div className="pl-1.5 sm:pl-3 border-l border-[#27272a]">
            <UserAvatar 
              initials="AT" 
              name="Atul" 
              role="Operations Admin" 
              onClick={() => togglePopover('profile')} 
            />
          </div>

          <Popover isOpen={activePopover === 'profile'} className="w-40 right-0 p-1.5 text-xs">
            <button onClick={closePopover} className="w-full flex items-center gap-2 px-2.5 py-1.5 hover:bg-[#18181b] rounded-lg text-[#a1a1aa] hover:text-white cursor-pointer">
              <User size={13} /> Profile
            </button>
            <button onClick={closePopover} className="w-full flex items-center gap-2 px-2.5 py-1.5 hover:bg-[#18181b] rounded-lg text-[#a1a1aa] hover:text-white cursor-pointer">
              <Settings size={13} /> Settings
            </button>
            <div className="h-[1px] bg-[#27272a] my-1" />
            <button onClick={closePopover} className="w-full flex items-center gap-2 px-2.5 py-1.5 hover:bg-[#18181b] rounded-lg text-[#ef4444] cursor-pointer">
              <LogOut size={13} /> Logout
            </button>
          </Popover>
        </NavPopoverWrapper>

      </div>
    </header>
  );
}