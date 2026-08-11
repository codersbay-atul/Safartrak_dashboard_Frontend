import React from "react";
import { Plus } from "lucide-react";
import { useSelector } from "react-redux";
import PageHeader from "../../components/Ui/PageHeader";
import HeaderActionButton from "../../components/Ui/HeaderActionButton";
import { selectAuthUser } from "../../store/slices/authSlice";
import useAccountProfile from "../../hooks/useAccountProfile";

export default function DashboardHeader({
  userName = '',
  onSearch,
  onExportClick,
  onAddVehicleClick,
}) {
  const authUser = useSelector(selectAuthUser);
  const { profile: accountProfile } = useAccountProfile();
  const effectiveName = authUser?.name ?? accountProfile?.name ?? userName ?? '';
  const getGreeting = (d = new Date()) => {
    const h = d.getHours();
    if (h >= 5 && h < 12) return 'Good morning';
    if (h >= 12 && h < 17) return 'Good afternoon';
    return 'Good evening';
  };

  const displayName = effectiveName || '';
  const title = displayName ? `${getGreeting(new Date())}, ${displayName}` : getGreeting(new Date());

  return (
    <PageHeader
      title={title}
      subtitle="Monitor vehicle locations, movement and fleet status in real time."
      searchPlaceholder="Search"
      onSearch={onSearch}
      
      onExportClick={onExportClick}
    >
      {/* <HeaderActionButton icon={Plus} iconPosition="right" onClick={onAddVehicleClick} className="min-w-[120px]">
        Add Vehicle
      </HeaderActionButton> */}
    </PageHeader>
  );
}
