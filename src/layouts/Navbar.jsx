import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
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
  CreditCard,
  Megaphone,
} from "lucide-react";
import {
  useNotifications,
  useMarkNotificationsRead,
} from "../hooks/useNotifications";
import { useOutsideClick } from "../hooks/UseOutsideClick";
import NavTextSize from "../components/Ui/NavbarUI/NavTextSize";
import NavTextColor from "../components/Ui/NavbarUI/NavTextColor";
import NavBreadcrumb from "../components/Ui/NavbarUI/NavBreadCrumb";
import NavDateDisplay from "../components/Ui/NavbarUI/NavDateDisplay";
import {
  NavNotificationIcon,
  default as NavUserAvatar,
} from "../components/Ui/NavbarUI/NavUserAvatar";
import NavMenuItem from "../components/Ui/NavbarUI/NavMenuItem";
import NavDataProtectionIcon from "../components/Ui/NavbarUI/NavDataProtectionIcon";
import NavTooltip from "../components/Ui/NavbarUI/NavTooltip";
import AnnouncementSlider from "../components/Ui/NavbarUI/AnnouncementSlider";
import { clearAuth } from "../store/slices/authSlice";
import useAccountProfile from "../hooks/useAccountProfile";
import NavNotificationItem from "../components/Ui/NavbarUI/NavNotificationItem";
import MainPopOver from "../components/Ui/MainLayoutUI/MainPopOver";
import MainLayoutTextSize from "../components/Ui/MainLayoutUI/MainLayoutTextSize";

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
  Dashboard: LayoutDashboard,
  Analytics: BarChart3,
  Reports: Clock3,
  "Mobilize / Immobilize": Power,
  Alerts: TriangleAlert,
  "Saved Places": ScanSearch,
  Routes: Route,
  Trips: GitBranch,
  Activity: Send,
  Vehicles: Truck,
  Drivers: IdCard,
  "Vehicle Details": FileSearch,
  Users: Users,
  "API Credentials": Key,
  "Your Products": ShoppingCart,
  "Bills & Payments": CreditCard,
};

const breadcrumbSections = {
  Dashboard: "Home",
  Analytics: "Home",
  Reports: "Home",
  "Mobilize / Immobilize": "Actions & Events",
  Alerts: "Actions & Events",
  "Saved Places": "Geo Services",
  Activity: "Geo Services",
  Vehicles: "Management",
  "Vehicle Details": "Management",
  Users: "Management",
  "API Credentials": "Developer Settings",
  "Your Products": "Billing",
  "Bills & Payments": "Billing",
  Subscriptions: "Billing",
  "IOT SIM": "Billing",
};

export default function Navbar({
  InactiveTab,
  isRouteView,
  onExitRouteView,
  user,
}) {
  const InactiveIcon = iconMap[InactiveTab] || LayoutDashboard;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const showRouteBreadcrumb = InactiveTab === "Dashboard" && isRouteView;
  const breadcrumbItems = showRouteBreadcrumb
    ? [
        { label: "Home" },
        { label: "Dashboard", onClick: onExitRouteView },
        { label: "Route Details" },
      ]
    : [
        { label: breadcrumbSections[InactiveTab] || "Home" },
        { label: InactiveTab || "Dashboard" },
      ];

  const [beforeCursor, setBeforeCursor] = useState(null);
  const [InactivePopover, setInactivePopover] = useState(null);
  const [isAnnouncementOpen, setIsAnnouncementOpen] = useState(false);

  const {
    notifications,
    isLoading: isNotificationsLoading,
    isFetching: isNotificationsFetching,
  } = useNotifications({ limit: 20, before: beforeCursor });
  const markReadMutation = useMarkNotificationsRead();
  const { profile: accountProfile } = useAccountProfile();
  const displayName = user?.name ?? accountProfile?.name ?? "";
  const displayRole = user?.role ?? "";
  const initials = displayName
    ? displayName
        .split(" ")
        .map((part) => part.charAt(0))
        .join("")
        .slice(0, 2)
        .toUpperCase()
    : undefined;

  const unreadCount = notifications?.unread_count ?? 0;

  const togglePopover = (key) => {
    setInactivePopover((prev) => (prev === key ? null : key));
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

  const closePopover = () => setInactivePopover(null);

  const handleLogout = () => {
    dispatch(clearAuth());
    closePopover();
    navigate("/login", { replace: true });
  };

  return (
    <NavTextColor
      as="header"
      bg="navbarBg"
      color=""
      className="flex items-center justify-between px-2.5 min-[1152px]:px-3 py-2.5 xl:py-3 border-b border-[#1f1f23] sticky top-0 z-30 select-none gap-2 min-w-0 font-sans"
    >
      <div className="flex items-center gap-2 xl:gap-2.5 min-w-0 flex-1">
        <div className="w-10 h-1 shrink-0 lg:hidden" />
        <InactiveIcon size={20} className="text-[#71717a] shrink-0" />
        <div className="flex items-center gap-1.5 min-w-0">
          <NavBreadcrumb items={breadcrumbItems} />
        </div>
      </div>

      <div className="flex items-center gap-2 xl:gap-2.5 shrink-0">
        <div className="flex items-center gap-4">
          <NavDataProtectionIcon />
          <NavPopoverWrapper
            isOpen={InactivePopover === "notif"}
            onClose={closePopover}
          >
            <NavTooltip
              label="Notifications"
              disabled={InactivePopover === "notif"}
            >
              <NavNotificationIcon
                count={unreadCount}
                onClick={() => togglePopover("notif")}
              />
            </NavTooltip>

            {/* Notifications Popover */}
            <MainPopOver
              isOpen={InactivePopover === "notif"}
              className="w-80 right-0 p-3"
            >
              <div className="flex items-center justify-between border-b border-[#27272a] pb-2 mb-2">
                <NavTextColor color="navbarText">
                  <MainLayoutTextSize
                    as="h4"
                    size="subtitle"
                    className="font-bold leading-none"
                  >
                    Notifications
                  </MainLayoutTextSize>
                </NavTextColor>
                {unreadCount > 0 && (
                  <button
                    type="button"
                    onClick={handleMarkAllRead}
                    disabled={markReadMutation.isLoading}
                    className="cursor-pointer hover:underline disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <MainLayoutTextSize
                      size="badgeText"
                      className="text-[#3b82f6] font-medium leading-none"
                    >
                      {markReadMutation.isLoading
                        ? "Marking..."
                        : "Mark all as read"}
                    </MainLayoutTextSize>
                  </button>
                )}
              </div>

              <div className="flex flex-col gap-2 max-h-[320px] overflow-y-auto custom-scrollbar pb-2">
                {isNotificationsLoading || isNotificationsFetching ? (
                  <NavTextColor
                    color="monthText"
                    className="py-5 text-center block"
                  >
                    <MainLayoutTextSize size="filterText">
                      Loading notifications...
                    </MainLayoutTextSize>
                  </NavTextColor>
                ) : notifications?.items?.length > 0 ? (
                  notifications.items.map((item) => (
                    <NavNotificationItem
                      key={item.id}
                      title={item.title}
                      description={item.body}
                      time={
                        item.created_at
                          ? new Date(item.created_at).toLocaleString()
                          : ""
                      }
                      isUnread={!item.read}
                    />
                  ))
                ) : (
                  <NavTextColor
                    color="monthText"
                    className="py-5 text-center block"
                  >
                    <MainLayoutTextSize size="filterText">
                      No notifications available.
                    </MainLayoutTextSize>
                  </NavTextColor>
                )}
              </div>

              {notifications?.next_before ? (
                <button
                  type="button"
                  onClick={handleLoadMore}
                  className="w-full py-2 rounded-xl bg-[#18181b] border border-[#27272a] text-white hover:bg-[#1f2023] transition-colors mt-2 cursor-pointer"
                >
                  <MainLayoutTextSize size="filterText" className="font-medium">
                    Load more
                  </MainLayoutTextSize>
                </button>
              ) : null}
            </MainPopOver>
          </NavPopoverWrapper>

          <NavTooltip label="What's new?" disabled={isAnnouncementOpen}>
            <button
              type="button"
              aria-label="What's new?"
              onClick={() => setIsAnnouncementOpen(true)}
              className="p-1.5 text-[#71717a] hover:text-white transition-colors cursor-pointer shrink-0"
            >
              <Megaphone size={20} />
            </button>
          </NavTooltip>
        </div>

        <NavDateDisplay />

        <div className="hidden xl:flex flex-col text-right leading-none shrink-0 pr-3">
          <NavTextColor
            as={NavTextSize}
            color="monthText"
            size="monthText"
            className="mt-0.5"
          >
            {displayRole}
          </NavTextColor>
        </div>

        {/* User Profile Popover */}
        <NavPopoverWrapper
          isOpen={InactivePopover === "profile"}
          onClose={closePopover}
        >
          <div className="pl-1.5 sm:pl-3 border-l border-[#27272a]">
            <NavUserAvatar
              initials={initials}
              name={displayName}
              role={displayRole}
              onClick={() => togglePopover("profile")}
            />
          </div>

          <MainPopOver
            isOpen={InactivePopover === "profile"}
            className="w-44 right-0 p-1.5"
          >
            <NavMenuItem
              icon={User}
              label="Profile"
              onClick={() => {
                closePopover();
                navigate("/profile");
              }}
            />
            <NavMenuItem
              icon={Settings}
              label="Settings"
              onClick={closePopover}
            />
            <div className="h-[1px] bg-[#27272a] my-1" />
            <NavMenuItem
              icon={LogOut}
              label="Logout"
              onClick={handleLogout}
              danger
            />
          </MainPopOver>
        </NavPopoverWrapper>
      </div>

      <AnnouncementSlider
        isOpen={isAnnouncementOpen}
        onClose={() => setIsAnnouncementOpen(false)}
      />
    </NavTextColor>
  );
}