import React, { useState } from "react";
import MainLayout from "../layouts/MainLayout";
import ProductsHeader from "../features/yourproducts/ProductsHeader";
import ProductDueBanner from "../features/yourproducts/ProductDueBanner";
import ProductsTable from "../features/yourproducts/ProductsTable";
import PaymentInvoiceModal from "../features/billandpayment/PaymentInvoiceModal";

export default function Products() {
  const [isInvoiceModalOpen, setIsInvoiceModalOpen] = useState(false);

  const handlePayNow = () => {
    setIsInvoiceModalOpen(true);
  };

  return (
    <>
      <MainLayout InactiveTab="Your Products">
        <div className="flex-1 flex flex-col gap-2.5 min-h-0 min-w-0 overflow-y-auto min-[1152px]:overflow-hidden pr-0.5 custom-scrollbar">
          <div className="shrink-0">
            <ProductsHeader />
          </div>

          <div className="shrink-0">
            <ProductDueBanner onPayNow={handlePayNow} />
          </div>

          <div className="shrink-0 w-full overflow-hidden">
            <ProductsTable />
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