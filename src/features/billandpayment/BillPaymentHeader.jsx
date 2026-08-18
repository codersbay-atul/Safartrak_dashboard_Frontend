import React from "react";
import PageHeader from "../../components/Ui/PageHeader";

export default function BillPaymentHeader({
  title = "Bills & Payments",
  subtitle = "Track your invoices, due balances, and payment history for all active products.",
}) {
  return (
    <PageHeader
      title={title}
      subtitle={subtitle}
      showSearch={false}
      showFilters={false}
      showExport={false}
    />
  );
}
