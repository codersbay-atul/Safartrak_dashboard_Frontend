import React, { useEffect, useState } from "react";
import MainLayout from "../layouts/MainLayout";
import useVehiclesList from "../hooks/useVehiclesList";

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
  const [selectedVehicle, setSelectedVehicle] = useState(null);

  const {
    vehicles: apiVehicles = [],
    isLoading: vehiclesLoading,
    isError: vehiclesError,
  } = useVehiclesList({ pageSize: 10 });

  useEffect(() => {
    if (!selectedVehicle && apiVehicles.length > 0) {
      // Store the actual unique_id directly
      setSelectedVehicle(apiVehicles[0]?.raw?.unique_id ?? null);
    }
  }, [apiVehicles, selectedVehicle]);

  const selectedVehicleItem = apiVehicles.find(
    (item) => item?.raw?.unique_id === selectedVehicle
  );

  const handleImport = () => console.log("Import Data Clicked");

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
      <div className="flex-1 flex flex-col gap-2.5 min-h-0 min-w-0 text-gray-200 overflow-y-auto pr-0.5 custom-scrollbar">
        <div className="shrink-0">
          <VehicleDetailsHeader
            onImportClick={handleImport}
            onAddVehicleClick={handleAddVehicle}
          />
        </div>

        <div className="shrink-0">
          <VehiclesDetailsStatsCard uniqueId={selectedVehicle} />
        </div>

        <div className="flex flex-col lg:grid lg:grid-cols-12 gap-2.5 flex-none lg:flex-1 min-h-0 overflow-visible lg:overflow-hidden">
          <div className="lg:col-span-3 w-full h-auto lg:h-full min-h-0 rounded-xl border border-gray-800/80 bg-[#0d0f12] overflow-hidden flex flex-col shrink-0">
            <VehiclesDetailsInfo
              selectedVehicle={selectedVehicle}
              onSelectVehicle={setSelectedVehicle}
              vehicles={apiVehicles}
              isLoading={vehiclesLoading}
              isError={vehiclesError}
            />
          </div>

          <div className="lg:col-span-9 w-full min-h-0 flex flex-col gap-2 h-auto lg:h-full lg:overflow-hidden">
            <div className="shrink-0 w-full min-w-0 overflow-x-auto">
              <VehiclesQuickStats uniqueId={selectedVehicle} />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-2.5 lg:flex-1 lg:min-h-0 lg:overflow-hidden">
              <div className="lg:col-span-8 w-full h-[380px] lg:h-full min-h-0 shrink-0 lg:shrink">
                <VehiclesAndDriverInfo />
              </div>

              <div className="lg:col-span-4 w-full h-[350px] lg:h-full min-h-0 shrink-0">
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
              uniqueId={selectedVehicle}
              selectedVehicle={selectedVehicleItem}
              onSaved={() => {
                setCurrentStep(2);
              }}
              onNext={() => setCurrentStep(2)}
            />
          )}

          {currentStep === 2 && (
            <VehiclesRegistrationDetails
              isOpen={isAddModalOpen}
              onClose={handleCloseModal}
              onCancel={handleCloseModal}
              uniqueId={selectedVehicle}
              selectedVehicle={selectedVehicleItem}
              onNext={() => setCurrentStep(3)}
              onSaved={() => {
                setCurrentStep(3);
              }}
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
