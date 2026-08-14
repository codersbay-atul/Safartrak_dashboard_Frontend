import React, { useState } from "react";
import MainLayout from "../layouts/MainLayout";
import ApiKeyHeader from "../features/apikey/ApiKeyHeader";
import AccountDetailsSection from "../features/apikey/AccountDetailsSection";
import ApiKeysSection from "../features/apikey/ApiKeysSection";

export default function ApiKeyCredentialsPage() {
  const [showCreateModal, setShowCreateModal] = useState(false);

  function handleCreateClick() {
    setShowCreateModal(true);
  }

  return (
    <MainLayout activeTab="API Credentials">
      <div className="flex-1 flex flex-col gap-2.5 h-full min-h-0 min-w-0 overflow-y-auto pr-0.5 custom-scrollbar">
        <div className="shrink-0">
          <ApiKeyHeader onCreateClick={handleCreateClick} />
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