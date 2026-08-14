import React from "react";
import PageHeader from "../../components/Ui/PageHeader";
import CreateApiKeyButton from "../../components/common/CreateApiKeyButton";

export default function ApiKeyHeader({
  onCreateClick,
}) {
  const handleCreateClick = () => {
    if (onCreateClick) {
      onCreateClick();
    } else {
      console.log("Create API Key clicked");
    }
  };

  return (
    <PageHeader
      title="API Credentials"
      subtitle="Manage your API keys used to access the SafarTrak API on behalf of Just Deliveries India"
      showSearch={false}
      showFilters={false}
      showExport={false}
      customRightAction={<CreateApiKeyButton onClick={handleCreateClick} />}
    />
  );
}