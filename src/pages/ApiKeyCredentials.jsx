import { useMemo, useState } from "react";
import {
  Clock,
  FileKey2,
  KeyRound,
  SlidersHorizontal,
  Sparkles,
  User,
} from "lucide-react";
import MainLayout from "../layouts/MainLayout";
import ApiKeyHeader from "../features/apikey/ApiKeyHeader";
import AccountDetailsSection from "../features/apikey/AccountDetailsSection";
import ApiKeysTable from "../features/apikey/ApiKeysTable";
import Document from "../features/apikey/Document";
import TableSlider from "../components/Ui/MainLayoutUI/TableSlider";



export default function ApiKeyCredentialsPage() {
  const [isTableHelpOpen, setIsTableHelpOpen] = useState(false);

  const API_CREDENTIALS_HELP_ITEMS = useMemo(
    () => [
      {
        icon: SlidersHorizontal,
        header: "Production Credentials",
        content:
          "Shows the API credentials currently available for your SafarTrak account.",
      },
      {
        icon: Clock,
        header: "Created On",
        content: "The date when the API credential was created.",
      },
      {
        icon: User,
        header: "Created By",
        content: "Shows who created the API credential.",
      },
      {
        icon: KeyRound,
        header: "API Key (Username)",
        content:
          "The username used to authenticate API requests. You can copy it using the copy icon.",
      },
      {
        icon: FileKey2,
        header: "API Token (Password)",
        content:
          "The password/token used along with the API key for authentication. Keep this credential secure and do not share it publicly.",
      },
      {
        icon: Sparkles,
        header: "Action",
        content:
          "Use these actions to manage the credential, such as viewing, editing, copying, or deleting it.",
      },
    ],
    [],
  );
  
  const API_CREDENTIALS_HELP_FOOTER = useMemo(
    () => ({
      header: "Need more technical details?",
      linkLabel: "API Documentation",
      href: "/Docs/SafarTrakDocs.pdf",
    }),
    [],
  );

  return (
    <MainLayout InactiveTab="API Credentials">
      <div className="flex-1 flex flex-col gap-2.5 h-full min-h-0 min-w-0 overflow-y-auto pr-0.5 custom-scrollbar">
        <div className="shrink-0">
          <ApiKeyHeader />
        </div>

        <div className="shrink-0 w-full min-w-0">
          <Document />
        </div>

        <div className="shrink-0 w-full min-w-0">
          <AccountDetailsSection />
        </div>

        <div className="shrink-0 w-full min-w-0">
          <TableSlider
            isOpen={isTableHelpOpen}
            onOpen={() => setIsTableHelpOpen(true)}
            onClose={() => setIsTableHelpOpen(false)}
            items={API_CREDENTIALS_HELP_ITEMS}
            footer={API_CREDENTIALS_HELP_FOOTER}
          />
          <ApiKeysTable onHelpClick={() => setIsTableHelpOpen(true)} />
        </div>
      </div>
    </MainLayout>
  );
}
