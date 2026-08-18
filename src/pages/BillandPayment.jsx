import React, { useState } from "react";
import MainLayout from "../layouts/MainLayout";
import BillPaymentHeader from "../features/billandpayment/BillPaymentHeader";
import BillPaymentDueBanner from "../features/billandpayment/BillPaymentDueBanner";
import BillPaymentTable from "../features/billandpayment/BillPaymentTable";
import PaymentInvoiceModal from "../features/billandpayment/PaymentInvoiceModal";

export default function BillandPayment() {
  const [isInvoiceModalOpen, setIsInvoiceModalOpen] = useState(false);

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

  return (
    <>
      <MainLayout activeTab="Bills & Payments">
        <div className="w-full h-[calc(100vh-80px)] flex flex-col gap-2.5 overflow-hidden">
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

          <div className="flex-1 min-h-0 w-full overflow-hidden">
            <BillPaymentTable onPayNow={handlePayNow} />
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
