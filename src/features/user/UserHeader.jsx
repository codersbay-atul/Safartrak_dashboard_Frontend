import { UserPlus } from "lucide-react";
import MainLayoutHeader from "../../components/Ui/MainLayoutUI/MainLayoutHeader";
import MainSearchInput from "../../components/Ui/MainLayoutUI/MainSearchInput";
import MainHeaderActionButton from "../../components/Ui/MainLayoutUI/MainHeaderActionButton";


export default function UserHeader({
  title = "Users",
  subtitle = "Manage team members, roles, and access permissions.",
  onAddUserClick,
  onSearchChange,
}) {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-2.5 w-full shrink-0">
      <MainLayoutHeader title={title} subtitle={subtitle} />
      <div className="flex items-center gap-2 w-full md:w-auto shrink-0">
        <MainSearchInput
          placeholder="Search Users"
          onChange={(event) => onSearchChange?.(event.target.value)}
          iconPosition="left"
          containerClassName="min-w-40 sm:min-w-48"
        />
      <MainHeaderActionButton
        icon={UserPlus}
        onClick={onAddUserClick}
        className="min-w-[120px]"
      >
        Add User
      </MainHeaderActionButton>
      </div>
    </div>
  );
}