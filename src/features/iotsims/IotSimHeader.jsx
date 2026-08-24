import React from "react";
import MainLayoutHeader from "../../components/Ui/MainLayoutUI/MainLayoutHeader";

export default function IotSimHeader({
  title = "IoT SIMs",
  subtitle = "Manage SIM activation, KYC status, validity and billing details",
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