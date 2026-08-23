import MainLayout from "../layouts/MainLayout";
import MainLayoutTextSize from "../components/Ui/MainLayoutUI/MainLayoutTextSize";

export default function UnderConstruction() {
  return (
    <MainLayout activeTab="Your Products">
      <div className="flex flex-1 items-center justify-center min-h-0 text-center">
        <MainLayoutTextSize
          size="sectionTitle"
          className="font-semibold text-white"
        >
          Page is under construction
        </MainLayoutTextSize>
      </div>
    </MainLayout>
  );
}
