import React, { useState } from "react";
import MainLayout from "../layouts/MainLayout";
import IotSimHeader from "../features/iotsims/IotSimHeader";
import IotSimDueBanner from "../features/iotsims/IotSimDueBanner";
import IotSimTable from "../features/iotsims/IotSimTable";
import PaymentInvoiceModal from "../features/billandpayment/PaymentInvoiceModal";


export default function IotSim() {
  const [isInvoiceModalOpen, setIsInvoiceModalOpen] = useState(false);

  const handlePayNow = () => {
    setIsInvoiceModalOpen(true);
  };

  return (
    <>
      <MainLayout InactiveTab="IOT SIM" allowPageScroll>
        <div className="flex-1 flex flex-col gap-2.5 min-h-0 min-w-0 overflow-y-auto pr-0.5 custom-scrollbar">
          <div className="shrink-0">
            <IotSimHeader />
          </div>

          <div className="shrink-0">
            <IotSimDueBanner onPayNow={handlePayNow} />
          </div>

          <div className="shrink-0 w-full overflow-visible">
            <IotSimTable />
          </div>
        </div>
      </MainLayout>

      <PaymentInvoiceModal
        isOpen={isInvoiceModalOpen}
        onClose={() => setIsInvoiceModalOpen(false)}
      />
    </>
  );
}