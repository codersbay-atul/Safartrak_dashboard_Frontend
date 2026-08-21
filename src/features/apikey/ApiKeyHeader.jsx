import React from "react";
import { Key } from "lucide-react";
import MainLayoutHeader from "../../components/Ui/MainLayoutUI/MainLayoutHeader";

export default function ApiKeyHeader({ onCreateClick }) {
  const handleCreateClick = () => {
    if (onCreateClick) {
      onCreateClick();
    } else {
      console.log("Create API Key clicked");
    }
  };

  return (
    <MainLayoutHeader
      title="API Keys"
      subtitle="Manage your API keys used to access the SafarTrak Platform."
      showSearch={false}
      showExport={false}
      showFilters={false}
      actionButtonIcon={Key}
      actionButtonLabel="Request New Key"
      onActionClick={handleCreateClick}
      actionButtonClassName="min-w-[150px]"
    />
  );
}