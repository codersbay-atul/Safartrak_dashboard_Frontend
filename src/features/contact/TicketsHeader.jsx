import MainHeaderActionButton from "../../components/Ui/MainLayoutUI/MainHeaderActionButton";
import MainLayoutHeader from "../../components/Ui/MainLayoutUI/MainLayoutHeader";


export default function TicketsHeader({
  title = "My Tickets",
  subtitle = "Manage your personal profile, security settings, notification preferences, and account activity.",
  onNewTicketClick,
}) {
  return (
    <div className="flex items-center justify-between gap-3 w-full shrink-0">
      <MainLayoutHeader title={title} subtitle={subtitle} />
      <MainHeaderActionButton onClick={onNewTicketClick} className="min-w-[120px]">
        New Ticket
      </MainHeaderActionButton>
    </div>
  );
}