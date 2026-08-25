import React, { useState } from "react";
import {
  Package,
  Users,
  Box,
  Gauge,
  Calendar,
  FileBadge,
  ShoppingCart,
  Tag,
  CreditCard,
} from "lucide-react";
import MainLayout from "../layouts/MainLayout";
import ProductsHeader from "../features/yourproducts/ProductsHeader";
import ProductDueBanner from "../features/yourproducts/ProductDueBanner";
import ProductsTable from "../features/yourproducts/ProductsTable";
import PaymentInvoiceModal from "../features/billandpayment/PaymentInvoiceModal";
import TableSlider from "../components/Ui/MainLayoutUI/TableSlider";

const PRODUCTS_HELP_ITEMS = [
  {
    icon: Package,
    header: "Product Name",
    content: "Name of the SafarTrak product or solution.",
  },
  {
    icon: Users,
    header: "Assigned",
    content: "Number of units or licenses currently assigned to your account.",
  },
  {
    icon: Box,
    header: "Available",
    content: "Number of units or licenses available for assignment.",
  },
  {
    icon: Gauge,
    header: "Status",
    content: "Current status of the product subscription.",
    statuses: [
      { status: "Active", content: "Subscription is active." },
      { status: "Pending", content: "Payment or activation is pending." },
      { status: "Expired", content: "Subscription has expired." },
    ],
  },
  {
    icon: Calendar,
    header: "Renewal Date",
    content: "The date on which the subscription will renew or expire.",
  },
  {
    icon: FileBadge,
    header: "Billing Profile",
    content: "The billing profile or organization linked to this subscription.",
  },
  {
    icon: ShoppingCart,
    header: "Purchase Channel",
    content: "The channel through which the product was purchased.",
  },
  {
    icon: Tag,
    header: "Product Type",
    content: "Type of licensing model for the product.",
  },
  {
    icon: CreditCard,
    header: "Pricing Model",
    content: "The pricing model of the subscription.",
  },
];

const PRODUCTS_HELP_FOOTER = {
  header: "Want to know more about billing?",
  linkLabel: "Billing & Payments Guide",
  href: "/billing",
  external: false,
};

export default function Products() {
  const [isInvoiceModalOpen, setIsInvoiceModalOpen] = useState(false);
  const [isTableHelpOpen, setIsTableHelpOpen] = useState(false);

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
            <TableSlider
              isOpen={isTableHelpOpen}
              onOpen={() => setIsTableHelpOpen(true)}
              onClose={() => setIsTableHelpOpen(false)}
              items={PRODUCTS_HELP_ITEMS}
              footer={PRODUCTS_HELP_FOOTER}
            />
            <ProductsTable onHelpClick={() => setIsTableHelpOpen(true)} />
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
