import React from "react";
import Button from "../../components/Ui/Button";
import PageHeader from "../../components/Ui/PageHeader";

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
      <Button
        variant="primary"
        size="sm"
        onClick={onNewTicketClick}
        className="!w-[120px] min-w-[120px] !h-[35px] !rounded-[8px] !bg-[#FFC107] hover:!bg-[#e6ac00] active:scale-[0.98] !text-black !font-medium !text-[13px] !px-[18px] !py-0 whitespace-nowrap flex-shrink-0"
      >
        New Ticket
      </Button>
    </PageHeader>
  );
}