import MainHeaderActionButton from "../../components/Ui/MainLayoutUI/MainHeaderActionButton";
import MainLayoutHeader from "../../components/Ui/MainLayoutUI/MainLayoutHeader";


export default function ProfileHeader({
  title = "Account",
  subtitle = "Manage your personal profile, security settings, notification preferences, and account activity.",
  onEditSettings,
}) {
  return (
    <div className="flex items-center justify-between gap-3 w-full shrink-0">
      <MainLayoutHeader title={title} subtitle={subtitle} />
      <MainHeaderActionButton onClick={onEditSettings} className="w-full max-w-[220px] min-w-0 sm:w-auto">
        Edit Account Settings
      </MainHeaderActionButton>
    </div>
  );
}