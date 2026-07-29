import React, { useState } from "react";
import MainLayout from "../layouts/MainLayout";
import VehiclesHeader from "../features/vehicles/VehiclesHeader";
import VehicleStats from "../features/vehicles/VehiclesStats";
import VehicleListTable from "../features/vehicles/VehiclesListTable";
import AddVehicleModal from "../features/vehicles/AddVehiclesModal";
import AddDriverModal from "../features/vehicles/AddDriverModal";
import AddFleetAssignmentModal from "../features/vehicles/AddFleetAssignmentModal";
import AddGPSDeviceModal from "../features/vehicles/AddGPSDeviceModal";
import UploadDocumentsModal from "../features/vehicles/UploadDocumentModal";
import VehicleAddedSuccessModal from "../features/vehicles/VehiclesAddedSuccessModal";
import { getVehiclesExport } from "../services/vehicleService";
import { toast } from "../components/Ui/toast";

export default function Vehicles() {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);

  const handleImport = () => console.log("Import Data Clicked");

  const handleExport = async () => {
    try {
      const response = await getVehiclesExport({ tab: "all" });
      const disposition =
        response.headers?.["content-disposition"] ||
        response.headers?.["Content-Disposition"];
      let filename = "vehicles_export";
      if (disposition) {
        const match = /filename\*?=([^;]+)/i.exec(disposition);
        if (match) {
          filename = match[1].replace(/UTF-8''/, "").replace(/\"/g, "");
        }
      }

      const blob = new Blob([response.data], {
        type: response.data.type || "application/octet-stream",
      });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
      toast.success("Export started");
    } catch (err) {
      console.error("Export failed", err);
      toast.error(err?.message || "Export failed");
    }
  };

  const handleAddVehicle = () => {
    setCurrentStep(1);
    setIsAddModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsAddModalOpen(false);
    setCurrentStep(1);
  };

  return (
    <MainLayout activeTab="Vehicles">
      {/* 
        Viewport-bound layout container:
        h-[calc(100vh-80px)] locks height within screen.
        overflow-hidden prevents outer scrolling.
      */}
      <div className="w-full h-[calc(100vh-80px)] flex flex-col gap-3.5 overflow-hidden p-1">
        
        {/* Top Header */}
        <div className="shrink-0">
          <VehiclesHeader
            onImportClick={handleImport}
            onExportClick={handleExport}
            onAddVehicleClick={handleAddVehicle}
          />
        </div>

        {/* Vehicle Stats Cards */}
        <div className="shrink-0">
          <VehicleStats />
        </div>

        {/* Table Container (Occupies remaining flex space accurately) */}
        <div className="flex-1 min-h-0 w-full overflow-hidden">
          <VehicleListTable />
        </div>

      </div>

      {/* Step Modals */}
      {currentStep === 1 && (
        <AddVehicleModal
          isOpen={isAddModalOpen}
          onClose={handleCloseModal}
          onNext={() => setCurrentStep(2)}
        />
      )}

      {currentStep === 2 && (
        <AddDriverModal
          isOpen={isAddModalOpen}
          onClose={handleCloseModal}
          onNext={() => setCurrentStep(3)}
        />
      )}

      {currentStep === 3 && (
        <AddFleetAssignmentModal
          isOpen={isAddModalOpen}
          onClose={handleCloseModal}
          onNext={() => setCurrentStep(4)}
        />
      )}

      {currentStep === 4 && (
        <AddGPSDeviceModal
          isOpen={isAddModalOpen}
          onClose={handleCloseModal}
          onNext={() => setCurrentStep(5)}
        />
      )}

      {currentStep === 5 && (
        <UploadDocumentsModal
          isOpen={isAddModalOpen}
          onClose={handleCloseModal}
          onNext={() => setCurrentStep(6)}
        />
      )}

      {currentStep === 6 && (
        <VehicleAddedSuccessModal
          isOpen={isAddModalOpen}
          onClose={handleCloseModal}
          onViewVehicle={() => {
            console.log("View Vehicle Clicked");
            handleCloseModal();
          }}
        />
      )}
    </MainLayout>
  );
}