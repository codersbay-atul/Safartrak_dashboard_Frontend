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



export default function Vehicles() {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const [currentStep, setCurrentStep] = useState(1);

  const handleImport = () => console.log("Import Data Clicked");
  const handleExport = () => console.log("Export Data Clicked");

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
      <div className="flex-1 flex flex-col gap-3.5 min-h-0 overflow-y-auto lg:overflow-hidden pr-0.5">
        
        {/* Header */}
        <div className="shrink-0">
          <VehiclesHeader
            onImportClick={handleImport}
            onExportClick={handleExport}
            onAddVehicleClick={handleAddVehicle}
          />
        </div>

        
        <div className="shrink-0">
          <VehicleStats />
        </div>

       
        <div className="flex-1 min-h-0 w-full overflow-hidden">
          <VehicleListTable/>
        </div>

      </div>

     
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