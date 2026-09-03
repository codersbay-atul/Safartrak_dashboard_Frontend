import React from "react";
import { Plus } from "lucide-react";
import MainLayoutHeader from "../../components/Ui/MainLayoutUI/MainLayoutHeader";

export default function SavedPlacesHeader({ onCreateClick }) {
  return (
    <MainLayoutHeader
      title="Saved Places"
      subtitle="Create and manage geographical areas for fleet monitoring."
      showSearch={false}
      showExport={false}
      showFilters={false}
      actionButtonLabel="Add Places"
      actionButtonIcon={Plus}
      onActionClick={onCreateClick}
      actionButtonClassName="min-w-[120px]"
    />
  );
}