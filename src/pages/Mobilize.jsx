import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import MobilizeHeader from "../features/mobilize/MobilizeHeader";
import MobilizeStats from "../features/mobilize/MobilizeStats";
import MobilizeVehicleList from "../features/mobilize/MobilizeVehicleList";
import VehicleControlCard from "../features/mobilize/VehicleControlCard";
import { getCommandVehicles, sendVehicleCommand } from "../api/mobilizeApi";

import VehicleControlConfirmation from "../features/mobilize/VehicleControlConfirmation";
import VehiclesControlMobilized from "../features/mobilize/VehiclesControlMobilized";

export default function Mobilize() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [fleetFilter, setFleetFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [vehicles, setVehicles] = useState([]);
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [loadingVehicles, setLoadingVehicles] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [pendingVehicle, setPendingVehicle] = useState(null);
  const [isSendingCommand, setIsSendingCommand] = useState(false);
  const [commandError, setCommandError] = useState(null);

  const filteredVehicles = vehicles.filter((vehicle) => {
    const query = searchQuery.trim().toLowerCase();
    const plate = String(
      vehicle.plate ||
      vehicle.reg_no ||
      vehicle.vehicle_number ||
      vehicle.raw?.vehicle_number ||
      vehicle.raw?.reg_no ||
      ""
    ).toLowerCase();
    const driver = String(
      vehicle.driver ||
      vehicle.driver_name ||
      vehicle.raw?.driver_name ||
      ""
    ).toLowerCase();
    const city = String(
      vehicle.city ||
      vehicle.location ||
      vehicle.raw?.city ||
      vehicle.raw?.location ||
      ""
    ).toLowerCase();
    const status = String(
      vehicle.status ||
      vehicle.current_status ||
      vehicle.state ||
      vehicle.raw?.status ||
      vehicle.raw?.current_status ||
      "offline"
    ).toLowerCase();

    const matchesSearch =
      !query ||
      plate.includes(query) ||
      driver.includes(query) ||
      city.includes(query);

    const matchesStatus = statusFilter === "all" || status === statusFilter;

    const matchesFleet =
      fleetFilter === "all" || city === fleetFilter.toLowerCase();

    return matchesSearch && matchesStatus && matchesFleet;
  });

  const handleAction = (vehicle) => {
    if (vehicle.status === "offline") return;

    setSelectedVehicle(vehicle);
    setCurrentStep(1);
    setIsModalOpen(false);
    setPendingVehicle(null);
  };

  React.useEffect(() => {
    let mounted = true;
    setLoadingVehicles(true);

    const params = {};
    const query = searchQuery.trim();
    if (query) {
      params.search = query;
    }

    getCommandVehicles(params)
      .then((res) => {
        if (!mounted) return;
        const vehiclesList = Array.isArray(res) ? res : [];
        // debug: log fetched raw response shape and extracted array
        try {
          // eslint-disable-next-line no-console
          console.log("[Mobilize] getCommandVehicles response:", res);
          // eslint-disable-next-line no-console
          console.log("[Mobilize] extracted vehicles count:", vehiclesList.length);
        } catch (e) {}
        const normalized = vehiclesList.map((v, idx) => ({
          ...v,
          id: v.id ?? v.unique_id ?? v.uniqueId ?? v.plate ?? `veh_${idx}`,
          unique_id: v.unique_id ?? v.uniqueId ?? v.id ?? null,
          plate: v.plate ?? v.reg_no ?? v.vehicle_number ?? v.raw?.vehicle_number ?? v.raw?.reg_no ?? "Unknown",
          driver: v.driver ?? v.driver_name ?? v.raw?.driver_name ?? "Unknown",
          city: v.city ?? v.location ?? v.raw?.city ?? v.raw?.location ?? "Unknown",
          status: String(
            v.status ??
              v.current_status ??
              v.command_state ??
              v.state ??
              v.raw?.status ??
              v.raw?.current_status ??
              v.raw?.command_state ??
              "offline"
          ).toLowerCase(),
          info: v.info ?? v.lastUpdated ?? v.raw?.last_updated ?? v.raw?.lastUpdated ?? "",
        }));
        setVehicles(normalized);
        setSelectedVehicle((prev) => {
          if (prev && normalized.some((item) => item.id === prev.id)) {
            return prev;
          }
          return normalized[0] ?? null;
        });
      })
      .catch(() => {
        if (!mounted) return;
        setVehicles([]);
        setSelectedVehicle(null);
      })
      .finally(() => {
        if (!mounted) return;
        setLoadingVehicles(false);
      });

    return () => {
      mounted = false;
    };
  }, [searchQuery]);

  const handleSelectVehicle = (vehicle) => {
    setSelectedVehicle(vehicle);
    setCurrentStep(1);
    setIsModalOpen(false);
    setPendingVehicle(null);
  };

  // Step 1 -> Step 2: Open Confirmation Modal
  const handleRequestImmobilize = (vehicle) => {
    setPendingVehicle(vehicle);
    setSelectedVehicle(vehicle);
    setCurrentStep(2);
    setIsModalOpen(true);
  };


  const handleCloseModal = () => {
    setIsModalOpen(false);
    setCurrentStep(1);
    setPendingVehicle(null);
    setIsSendingCommand(false);
    setCommandError(null);
  };

  const handleConfirmImmobilize = () => {
    if (!pendingVehicle) return;

    setCommandError(null);
    setCurrentStep(3);
  };

  const handleSendCommand = async () => {
    if (!pendingVehicle) return;

    setCommandError(null);
    setIsSendingCommand(true);

    try {
      const uniqueId =
        pendingVehicle.unique_id ?? pendingVehicle.uniqueId ?? pendingVehicle.id;
      await sendVehicleCommand(uniqueId, "immobilize");

      const updatedVehicle = {
        ...pendingVehicle,
        status: "immobilized",
        current_status: "immobilized",
        state: "immobilized",
      };

      setVehicles((prev) =>
        prev.map((item) =>
          item.id === pendingVehicle.id ? updatedVehicle : item
        )
      );

      setSelectedVehicle(updatedVehicle);
      setPendingVehicle(updatedVehicle);
      setCurrentStep(3);
      setIsModalOpen(false);
    } catch (err) {
      setCommandError(err?.message || "Failed to send command. Please try again.");
    } finally {
      setIsSendingCommand(false);
    }
  };

  return (
    <MainLayout activeTab="Mobilize / Immobilize">
      <div className="relative flex-1 flex flex-col gap-2.5 w-full h-full min-h-0 overflow-hidden bg-[#09090b] text-white">
        {/* Header Section */}
        <div className="shrink-0">
          <MobilizeHeader
            searchQuery={searchQuery}
            onSearchChange={(e) => setSearchQuery(e.target.value)}
            fleetFilter={fleetFilter}
            onFleetChange={setFleetFilter}
            onHistoryClick={() => navigate("/command-history")}
          />
        </div>

        {/* Stats Row */}
        <div className="shrink-0">
          <MobilizeStats />
        </div>

    
        <div className="flex-1 min-h-0 grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-4 items-start">
          <div className="h-full min-h-0">
            <MobilizeVehicleList
              vehicles={filteredVehicles}
              activeFilter={statusFilter}
              onFilterChange={setStatusFilter}
              onAction={handleAction}
              onSelectVehicle={handleSelectVehicle}
              selectedVehicle={selectedVehicle}
            />
          </div>

          
          <div className="h-full min-h-0 flex justify-end">
            {selectedVehicle && (
              <VehicleControlCard
                vehicle={selectedVehicle}
                onRequestImmobilize={handleRequestImmobilize}
              />
            )}
          </div>
        </div>

        {isModalOpen && currentStep === 2 && (
          <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-md flex items-center justify-center p-4">
            <VehicleControlConfirmation
              vehicle={pendingVehicle || selectedVehicle}
              onCancel={handleCloseModal}
              onConfirm={handleConfirmImmobilize}
            />
          </div>
        )}
            {isModalOpen && currentStep === 3 && (
          <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-md flex items-center justify-center p-4">
            <VehiclesControlMobilized
              vehicle={pendingVehicle || selectedVehicle}
              onCancel={handleCloseModal}
              onSendCommand={handleSendCommand}
              isSending={isSendingCommand}
              error={commandError}
            />
          </div>
        )}
     
      </div>
    </MainLayout>
  );
}