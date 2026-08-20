import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
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
  User,
  Settings,
  LogOut,
  Key,
  ShoppingCart,
  CreditCard
} from 'lucide-react';
import { useNotifications, useMarkNotificationsRead } from '../hooks/useNotifications';
import { useOutsideClick } from '../hooks/UseOutsideClick';
import NavTextSize from '../components/Ui/NavbarUI/NavTextSize';
import NavTextColor from '../components/Ui/NavbarUI/NavTextColor';
import NavBreadcrumb from '../components/Ui/NavbarUI/NavBreadCrumb';
import NavDateDisplay from '../components/Ui/NavbarUI/NavDateDisplay';
import { NavNotificationIcon, default as NavUserAvatar } from '../components/Ui/NavbarUI/NavUserAvatar';
import NavMenuItem from '../components/Ui/NavbarUI/NavMenuItem';
import { clearAuth } from '../store/slices/authSlice';
import useAccountProfile from '../hooks/useAccountProfile';
import NavNotificationItem from '../components/Ui/NavbarUI/NavNotificationItem';
import Popover from '../components/Ui/Popover';

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
  "Saved Places": ScanSearch,
  "Routes": Route,
  "Trips": GitBranch,
  "Activity": Send,
  "Vehicles": Truck,
  "Drivers": IdCard,
  "Vehicle Details": FileSearch,
  "Users": Users,
  "API Credentials": Key,
  "Your Products": ShoppingCart,
  "Bills & Payments": CreditCard
};

export default function Navbar({ activeTab, isRouteView, onExitRouteView, user }) {
  const ActiveIcon = iconMap[activeTab] || LayoutDashboard;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const showRouteBreadcrumb = activeTab === "Dashboard" && isRouteView;

  const [beforeCursor, setBeforeCursor] = useState(null);
  const [activePopover, setActivePopover] = useState(null); // 'notif' | 'calendar' | 'profile' | null
  
  const { notifications, isLoading: isNotificationsLoading, isFetching: isNotificationsFetching } = useNotifications({ limit: 20, before: beforeCursor });
  const markReadMutation = useMarkNotificationsRead();
  const { profile: accountProfile } = useAccountProfile();
  const displayName = user?.name ?? accountProfile?.name ?? '';
  const displayRole = user?.role ?? '';
  const initials = displayName
    ? displayName
        .split(' ')
        .map((part) => part.charAt(0))
        .join('')
        .slice(0, 2)
        .toUpperCase()
    : undefined;

  const unreadCount = notifications?.unread_count ?? 0;

  const togglePopover = (key) => {
    setActivePopover(prev => (prev === key ? null : key));
  };

  const handleMarkAllRead = async () => {
    try {
      await markReadMutation.mutateAsync({ all: true });
    } catch (error) {
      console.error("Failed to mark notifications as read", error);
    }
  };

  const handleLoadMore = () => {
    if (notifications?.next_before) {
      setBeforeCursor(notifications.next_before);
    }
  };

  const closePopover = () => setActivePopover(null);

  const handleLogout = () => {
    dispatch(clearAuth());
    closePopover();
    navigate('/login', { replace: true });
  };

  

  return (
    <header className="flex items-center justify-between px-2.5 min-[1152px]:px-3 py-2.5 xl:py-3 border-b border-[#1f1f23] bg-[#09090b] sticky top-0 z-30 select-none gap-2 min-w-0">
      
      <div className="flex items-center gap-2 xl:gap-2.5 text-[18px] text-[#a1a1aa] font-medium tracking-wide min-w-0 flex-1">
        <div className="w-10 h-1 shrink-0 lg:hidden" />
        <ActiveIcon size={20} className="text-[#71717a] shrink-0" />
        {showRouteBreadcrumb ? (
          <div className="flex items-center gap-1.5 min-w-0">
            <NavBreadcrumb
              items={[
                { label: "Dashboard", onClick: onExitRouteView },
                { label: "Route Details" },
              ]}
            />
          </div>
        ) : (
          <NavTextSize className="truncate">
            <NavTextColor color="navbarText">
            {activeTab || "Dashboard"}
            </NavTextColor>
          </NavTextSize>
        )}
      </div>
      <div className="flex items-center gap-2 xl:gap-2.5 shrink-0">
        
      
        <NavPopoverWrapper isOpen={activePopover === 'notif'} onClose={closePopover}>
          <NavNotificationIcon
            count={unreadCount}
            onClick={() => togglePopover('notif')}
          />

          <Popover isOpen={activePopover === 'notif'} className="w-80 right-0 p-3">
            <div className="flex items-center justify-between border-b border-[#27272a] pb-2 mb-2">
              <h4 className="text-xs font-bold text-white">Notifications</h4>
              {unreadCount > 0 && (
                <button 
                  onClick={handleMarkAllRead} 
                  disabled={markReadMutation.isLoading}
                  className="text-[10px] text-[#3b82f6] hover:underline disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer font-medium"
                >
                  {markReadMutation.isLoading ? "Marking..." : "Mark all as read"}
                </button>
              )}
            </div>
            <div className="flex flex-col gap-2 max-h-[320px] overflow-y-auto custom-scrollbar pb-2">
              {isNotificationsLoading || isNotificationsFetching ? (
                <div className="py-5 text-center text-[#71717a] text-[11px]">
                  Loading notifications...
                </div>
              ) : notifications?.items?.length > 0 ? (
                notifications.items.map((item) => (
                  <NavNotificationItem
                    key={item.id}
                    title={item.title}
                    description={item.body}
                    time={item.created_at ? new Date(item.created_at).toLocaleString() : ""}
                    isUnread={!item.read}
                  />
                ))
              ) : (
                <div className="py-5 text-center text-[#71717a] text-[11px]">
                  No notifications available.
                </div>
              )}
            </div>
            {notifications?.next_before ? (
              <button
                type="button"
                onClick={handleLoadMore}
                className="w-full py-2 rounded-xl bg-[#18181b] border border-[#27272a] text-[11px] text-white hover:bg-[#1f2023] transition-colors"
              >
                Load more
              </button>
            ) : null}
          </Popover>
        </NavPopoverWrapper>

        <NavDateDisplay />


        <div className="hidden xl:flex flex-col text-right leading-none shrink-0 pr-3">
         
          <NavTextSize as="p" size="monthText" className="mt-0.5">
            <NavTextColor color="monthText">{displayRole}</NavTextColor>
          </NavTextSize>
        </div>


        <NavPopoverWrapper isOpen={activePopover === 'profile'} onClose={closePopover}>
          <div className="pl-1.5 sm:pl-3 border-l border-[#27272a]">
            <NavUserAvatar 
              initials={initials} 
              name={displayName} 
              role={displayRole} 
              onClick={() => togglePopover('profile')} 
            />
          </div>

          <Popover isOpen={activePopover === 'profile'} className="w-40 right-0 p-1.5 text-xs">
            <NavMenuItem
              icon={User}
              label="Profile"
              onClick={() => {
                closePopover();
                navigate('/profile');
              }}
            />
            <NavMenuItem icon={Settings} label="Settings" onClick={closePopover} />
            <div className="h-[1px] bg-[#27272a] my-1" />
            <NavMenuItem icon={LogOut} label="Logout" onClick={handleLogout} danger />
          </Popover>
        </NavPopoverWrapper>

      </div>
    </header>
  );
}