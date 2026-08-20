import { Plus } from "lucide-react";
import MainLayoutHeader from "../../components/Ui/MainLayoutUI/MainLayoutHeader";

export default function AoiHeader({ onCreateClick }) {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-2.5 w-full select-none shrink-0">
      <MainLayoutHeader
        title="Saved Places"
        subtitle="Create and manage geographical areas for fleet monitoring."
      />

      <MainHeaderActionButton
        icon={Plus}
        onClick={onCreateClick}
        className="min-w-[120px]"
      >
        Add Places
      </MainHeaderActionButton>
    </div>
  );
}
