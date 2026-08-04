import React from "react";
import PageHeader from "../../components/Ui/PageHeader";
import HeaderActionButton from "../../components/Ui/HeaderActionButton";

export default function TicketsHeader({
  title = "My Tickets",
  subtitle = "Manage your personal profile, security settings, notification preferences, and account activity.",
  onNewTicketClick,
}) {
  return (
    <PageHeader
      title={title}
      subtitle={subtitle}
      showSearch={false}
      showFilter={false}
      showExport={false}
    >
      <HeaderActionButton onClick={onNewTicketClick} className="min-w-[120px]">
        New Ticket
      </HeaderActionButton>
    </PageHeader>
  );
}