import MainLayoutHeader from "../../components/Ui/MainLayoutUI/MainLayoutHeader";
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
    <div className="flex items-center justify-between gap-3 w-full shrink-0">
      <MainLayoutHeader
        title="API Keys"
        subtitle="Manage your API keys used to access the SafarTrak Platform."
      />
      <CreateApiKeyButton onClick={handleCreateClick} />
    </div>
  );
}