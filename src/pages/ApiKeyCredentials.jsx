import React, { useState } from "react";
import MainLayout from "../layouts/MainLayout";
import PageHeader from "../components/Ui/PageHeader";
import CreateApiKeyButton from "../components/common/CreateApiKeyButton";
import AccountDetailsSection from "../features/apikey/AccountDetailsSection";
import ApiKeysSection from "../features/apikey/ApiKeysSection";
import Document from "../features/apikey/Document";

export default function ApiKeyCredentialsPage() {
  const [showCreateModal, setShowCreateModal] = useState(false);

  function handleCreateClick() {
    setShowCreateModal(true);
  }

  return (
    <MainLayout activeTab="API Credentials">
      <div className="flex-1 flex flex-col gap-2.5 h-full min-h-0 min-w-0 overflow-y-auto pr-0.5 custom-scrollbar">
        <div className="shrink-0">
          <PageHeader
            title="API Keys"
            subtitle="Manage your API keys used to access the SafarTrak Platform."
            showSearch={false}
            showFilters={false}
            showExport={false}
            customRightAction={<CreateApiKeyButton onClick={handleCreateClick} />}
          />
        </div>

        <div className="shrink-0 w-full min-w-0">
          <Document />
        </div>

        <div className="shrink-0 w-full min-w-0">
          <AccountDetailsSection />
        </div>

        <div className="shrink-0 w-full min-w-0">
          <ApiKeysSection />
        </div>
      </div>
    </MainLayout>
  );
}