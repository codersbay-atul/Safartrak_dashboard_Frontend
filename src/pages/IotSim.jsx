import React, { useMemo, useState } from "react";
import { User, CircleDot, Calendar, IndianRupee } from "lucide-react";
import { IconDeviceSim } from "@tabler/icons-react";
import MainLayout from "../layouts/MainLayout";
import IotSimHeader from "../features/iotsims/IotSimHeader";
import IotSimDueBanner from "../features/iotsims/IotSimDueBanner";
import IotSimTable from "../features/iotsims/IotSimTable";
import PaymentInvoiceModal from "../features/billandpayment/PaymentInvoiceModal";
import TableSlider from "../components/Ui/MainLayoutUI/TableSlider";



export default function IotSim() {
  const [isInvoiceModalOpen, setIsInvoiceModalOpen] = useState(false);
  const [isTableHelpOpen, setIsTableHelpOpen] = useState(false);

  const IOT_SIM_HELP_ITEMS = useMemo(
    () => [
      {
        icon: IconDeviceSim,
        header: "ICCID Number",
        content:
          "The unique identification number assigned to the SIM card. You can copy the ICCID using the copy icon.",
      },
      {
        icon: User,
        header: "KYC",
        content: "Shows whether the SIM has completed the required KYC verification.",
        statuses: [
          { status: "Yes", content: "KYC verification is completed." },
          { status: "No", content: "KYC verification is pending or incomplete." },
        ],
      },
      {
        icon: CircleDot,
        header: "Status",
        content: "Shows the current activation status of the SIM.",
        statuses: [
          { status: "Active", content: "SIM is active and in service." },
          { status: "Inactive", content: "SIM is not currently in service." },
          { status: "Suspended", content: "SIM service has been suspended." },
        ],
      },
      {
        icon: Calendar,
        header: "Activated",
        content:
          "The date on which the SIM was activated or enabled on the SafarTrak platform.",
      },
      {
        icon: Calendar,
        header: "Plan Expires",
        content: "The date on which the current SIM plan or validity period ends.",
      },
      {
        icon: IndianRupee,
        header: "Amount",
        content: "The amount charged for the current SIM plan or billing period.",
      },
    ],
    [],
  );

  const IOT_SIM_HELP_FOOTER = useMemo(
    () => ({
      header: "Want to know more about SIM billing?",
      linkLabel: "Billing & Payments Guide",
      href: "/billing",
      external: false,
    }),
    [],
  );

  const handlePayNow = () => {
    setIsInvoiceModalOpen(true);
  };

  return (
    <>
      <MainLayout InactiveTab="IOT SIM" allowPageScroll>
        <div className="flex-1 flex flex-col gap-4 xl:gap-5 min-h-0 min-w-0 overflow-y-auto overflow-x-hidden no-scrollbar pr-0.5">
          <div className="shrink-0">
            <IotSimHeader />
          </div>

          <div className="shrink-0">
            <IotSimDueBanner onPayNow={handlePayNow} />
          </div>

          <div className="shrink-0 w-full overflow-visible">
            <TableSlider
              isOpen={isTableHelpOpen}
              onOpen={() => setIsTableHelpOpen(true)}
              onClose={() => setIsTableHelpOpen(false)}
              items={IOT_SIM_HELP_ITEMS}
              footer={IOT_SIM_HELP_FOOTER}
            />
            <IotSimTable onHelpClick={() => setIsTableHelpOpen(true)} />
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
