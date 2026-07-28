import React, { useState } from "react";
import MainLayout from "../layouts/MainLayout";

import VehiclesBasicInfo from "../features/vehiclesDetails/VehiclesBasicInfo";
import VehiclesRegistrationDetails from "../features/vehiclesDetails/VehiclesRegistrationDetails";
import DriverAssignmentDetails from "../features/vehiclesDetails/DriverAssignmentDetails";
import GPSDeviceInfo from "../features/vehiclesDetails/GPSDeviceInfo";
import InsuranceInfo from "../features/vehiclesDetails/InsuranceInfo";
import MaintenanceInfo from "../features/vehiclesDetails/MaintenanceInfo";
import VehiclesInfo from "../features/vehiclesDetails/VehiclesInfo";
import VehiclesSetting from "../features/vehiclesDetails/VehiclesSetting";
import ScheduleMaintenance from "../features/vehiclesDetails/ScheduleMaintenance";

import VehicleDetailsHeader from "../features/vehiclesDetails/VehiclesDetailsHeader";
import VehiclesDetailsStatsCard from "../features/vehiclesDetails/VehiclesDetailsStatsCard";
import VehiclesDetailsInfo from "../features/vehiclesDetails/VehiclesDetailsInfo";
import VehiclesQuickStats from "../features/vehiclesDetails/VehiclesQuickStats";
import VehiclesAndDriverInfo from "../features/vehiclesDetails/VehiclesAndDriverInfo";
import VehiclesActionButtons from "../features/vehiclesDetails/VehiclesActionButtons";
import VehiclesLastKnownLocation from "../features/vehiclesDetails/VehiclesLastKnownLocation";

export default function VehiclesDetails() {
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
      <div className="h-screen max-h-screen flex flex-col gap-2 p-2.5 bg-[#090b0e] text-gray-200 overflow-hidden">
        <div className="shrink-0">
          <VehicleDetailsHeader
            onImportClick={handleImport}
            onExportClick={handleExport}
            onAddVehicleClick={handleAddVehicle}
          />
        </div>

        <div className="shrink-0">
          <VehiclesDetailsStatsCard />
        </div>

        <div className="flex-1 min-h-0 grid grid-cols-12 gap-2.5 overflow-hidden">
          <div className="col-span-3 h-full min-h-0 rounded-xl border border-gray-800/80 bg-[#0d0f12] overflow-hidden flex flex-col">
            <VehiclesDetailsInfo />
          </div>

          <div className="col-span-9 h-full min-h-0 flex flex-col gap-2 overflow-hidden">
            <div className="shrink-0">
              <VehiclesQuickStats />
            </div>

            <div className="flex-1 min-h-0 grid grid-cols-12 gap-2.5 overflow-hidden">
              <div className="col-span-8 h-full min-h-0">
                <VehiclesAndDriverInfo />
              </div>

              <div className="col-span-4 h-full min-h-0">
                <VehiclesLastKnownLocation />
              </div>
            </div>

            <div className="shrink-0">
              <VehiclesActionButtons />
            </div>
          </div>
        </div>
      </div>

      {isAddModalOpen && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 backdrop-blur-md p-4 overflow-y-auto">
          {currentStep === 1 && (
            <VehiclesBasicInfo
              isOpen={isAddModalOpen}
              onClose={handleCloseModal}
              onCancel={handleCloseModal}
              onNext={() => setCurrentStep(2)}
            />
          )}

          {currentStep === 2 && (
            <VehiclesRegistrationDetails
              isOpen={isAddModalOpen}
              onClose={handleCloseModal}
              onCancel={handleCloseModal}
              onNext={() => setCurrentStep(3)}
            />
          )}

          {currentStep === 3 && (
            <DriverAssignmentDetails
              isOpen={isAddModalOpen}
              onClose={handleCloseModal}
              onCancel={handleCloseModal}
              onNext={() => setCurrentStep(4)}
            />
          )}

          {currentStep === 4 && (
            <GPSDeviceInfo
              isOpen={isAddModalOpen}
              onClose={handleCloseModal}
              onCancel={handleCloseModal}
              onNext={() => setCurrentStep(5)}
            />
          )}

          {currentStep === 5 && (
            <InsuranceInfo
              isOpen={isAddModalOpen}
              onClose={handleCloseModal}
              onCancel={handleCloseModal}
              onNext={() => setCurrentStep(6)}
            />
          )}

          {currentStep === 6 && (
            <MaintenanceInfo
              isOpen={isAddModalOpen}
              onClose={handleCloseModal}
              onCancel={handleCloseModal}
              onNext={() => setCurrentStep(7)}
            />
          )}

          {currentStep === 7 && (
            <VehiclesInfo
              isOpen={isAddModalOpen}
              onClose={handleCloseModal}
              onCancel={handleCloseModal}
              onNext={() => setCurrentStep(8)}
            />
          )}

          {currentStep === 8 && (
            <VehiclesSetting
              isOpen={isAddModalOpen}
              onClose={handleCloseModal}
              onCancel={handleCloseModal}
              onNext={() => setCurrentStep(9)}
            />
          )}

          {currentStep === 9 && (
            <ScheduleMaintenance
              isOpen={isAddModalOpen}
              onClose={handleCloseModal}
              onCancel={handleCloseModal}
              onNext={handleCloseModal}
              onViewVehicle={() => {
                handleCloseModal();
              }}
            />
          )}
        </div>
      )}
    </MainLayout>
  );
}
