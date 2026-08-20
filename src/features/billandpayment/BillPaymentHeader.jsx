import MainLayoutHeader from "../../components/Ui/MainLayoutUI/MainLayoutHeader";

export default function BillPaymentHeader({
  title = "Bills & Payments",
  subtitle = "Track your invoices, due balances, and payment history for all active products.",
}) {
  return (
    <MainLayoutHeader title={title} subtitle={subtitle} />
  );
}
