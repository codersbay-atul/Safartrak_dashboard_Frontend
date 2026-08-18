import React from "react";
import MainLayout from "../layouts/MainLayout";
import ProductsHeader from "../features/yourproducts/ProductsHeader";
import ProductDueBanner from "../features/yourproducts/ProductDueBanner";
import ProductsTable from "../features/yourproducts/ProductsTable";

export default function Products() {
  const handlePayNow = () => {
    console.log("Pay Now clicked");
    // Add payment logic here
  };

  const handleNewProduct = () => {
    console.log("New Product clicked");
    // Add new product logic here
  };

  return (
    <MainLayout activeTab="Your Products">
      <div className="w-full h-[calc(100vh-80px)] flex flex-col gap-2.5 overflow-hidden">
        
        <div className="shrink-0">
          <ProductsHeader
            title="Your Products"
            subtitle="Manage your active subscriptions, licenses, and billing profiles for all SafarTrak solutions."
            onNewProductClick={handleNewProduct}
          />
        </div>

        <div className="shrink-0">
          <ProductDueBanner
            daysLeft={2}
            amount="2,950"
            dueDate="Aug 20, 2026"
            onPayNow={handlePayNow}
          />
        </div>

        
        <div className="flex-1 min-h-0 w-full overflow-hidden">
          <ProductsTable />
        </div>
      </div>
    </MainLayout>
  );
}
