import React, { useMemo, useState } from "react";
import {
  FilePlus,
  Calendar,
  BadgeIndianRupee,
  CirclePower,
  CreditCard,
  Download,
} from "lucide-react";
import MainLayout from "../layouts/MainLayout";
import BillPaymentHeader from "../features/billandpayment/BillPaymentHeader";
import BillPaymentDueBanner from "../features/billandpayment/BillPaymentDueBanner";
import BillPaymentTable from "../features/billandpayment/BillPaymentTable";
import PaymentInvoiceModal from "../features/billandpayment/PaymentInvoiceModal";
import TableSlider from "../components/Ui/MainLayoutUI/TableSlider";

export default function BillandPayment() {
  const [isInvoiceModalOpen, setIsInvoiceModalOpen] = useState(false);
  const [isTableHelpOpen, setIsTableHelpOpen] = useState(false);
  const invoice = {
    id: "G177502127",
    billingPeriod: "Aug 10, 2026 to Aug 10, 2026",
    invoiceDate: "Aug 11, 2026",
    billingProfile: "Zevon Systems LLP",
    dueDate: "August 12, 2026",
    amount: "3,091.31",
  };

  const handlePayNow = () => {
    setIsInvoiceModalOpen(true);
  };

  const BILL_PAYMENT_HELP_ITEMS = useMemo(
    () => [
      {
        icon: FilePlus,
        header: "Invoice ID",
        content:
          "The unique identifier assigned to each invoice. Use this ID when referring to a specific invoice or payment.",
      },
      {
        icon: Calendar,
        header: "Invoice Date",
        content: "The date when the invoice was generated.",
      },
      {
        icon: Calendar,
        header: "Billing Period",
        content:
          "The period covered by the invoice and the products or services billed during that period.",
      },
      {
        icon: BadgeIndianRupee,
        header: "Total Amount",
        content:
          "The total amount charged on the invoice. A negative amount may indicate a credit, adjustment, or refund.",
      },
      {
        icon: CirclePower,
        header: "Status",
        content: "Shows the current payment status of the invoice.",
        statuses: [
          { status: "Past Due", content: "Payment was not received by the due date." },
          { status: "Paid", content: "The invoice has been successfully paid." },
          { status: "Void", content: "The invoice has been cancelled and is no longer payable." },
        ],
      },
      {
        icon: CreditCard,
        header: "Payment Action",
        content: "Shows the available payment action for the invoice.",
        statuses: [
          { status: "Pay Now", content: "Make a payment for an unpaid invoice." },
          { status: "N/A", content: "No payment action is required, typically because the invoice is already paid or void." },
        ],
      },
      {
        icon: Download,
        header: "Download Invoice",
        content: "Download a PDF copy of the invoice for your records.",
      },
    ],
    [],
  );
  
  const BILL_PAYMENT_HELP_FOOTER = useMemo(
    () => ({
      header: "Want to know more about billing & payments?",
      linkLabel: "Billing & Payments Guide",
      href: "/billing",
      external: false,
    }),
    [],
  );

  return (
    <>
      <MainLayout activeTab="Bills & Payments" allowPageScroll>
        <div className="flex-1 flex flex-col gap-4 xl:gap-5 min-h-0 min-w-0 overflow-visible no-scrollbar pr-0.5">
          <div className="shrink-0">
            <BillPaymentHeader
              title="Bills & Payments"
              subtitle="Track your invoices, due balances, and payment history for all active products."
            />
          </div>

          <div className="shrink-0">
            <BillPaymentDueBanner
              invoiceId="G198429734"
              onPayNow={handlePayNow}
            />
          </div>

          <div className="shrink-0 w-full overflow-visible">
            <TableSlider
              isOpen={isTableHelpOpen}
              onOpen={() => setIsTableHelpOpen(true)}
              onClose={() => setIsTableHelpOpen(false)}
              items={BILL_PAYMENT_HELP_ITEMS}
              footer={BILL_PAYMENT_HELP_FOOTER}
            />
            <BillPaymentTable onPayNow={handlePayNow} onHelpClick={() => setIsTableHelpOpen(true)} />
          </div>
        </div>
      </MainLayout>

      <PaymentInvoiceModal
        isOpen={isInvoiceModalOpen}
        onClose={() => setIsInvoiceModalOpen(false)}
        invoice={invoice}
      />
    </>
  );
}
