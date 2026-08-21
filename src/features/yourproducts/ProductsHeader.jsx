import React from "react";
import MainLayoutHeader from "../../components/Ui/MainLayoutUI/MainLayoutHeader";

export default function ProductsHeader({
  title = "Your Products",
  subtitle = "Manage your active subscriptions, licenses, and billing profiles for all SafarTrak solutions.",
}) {
  return (
    <MainLayoutHeader
      title={title}
      subtitle={subtitle}
      showSearch={false}
      showExport={false}
      showFilters={false}
    />
  );
}