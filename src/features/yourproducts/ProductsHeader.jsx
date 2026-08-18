import React from "react";
import PageHeader from "../../components/Ui/PageHeader";
import HeaderActionButton from "../../components/Ui/HeaderActionButton";

export default function ProductsHeader({
  title = "Your Products",
  subtitle = "Manage your active subscriptions, licenses, and billing profiles for all SafarTrak solutions.",
  onNewProductClick,
}) {
  return (
    <PageHeader
      title={title}
      subtitle={subtitle}
      showSearch={false}
      showFilters={false}
      showExport={false}
    >
    </PageHeader>
  );
}