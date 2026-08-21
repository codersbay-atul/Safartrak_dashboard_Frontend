import React, { useState, useEffect, useMemo } from "react";
import MainLayout from "../layouts/MainLayout";
import MobilizeHeader from "../features/mobilize/MobilizeHeader";
import MobilizeStats from "../features/mobilize/MobilizeStats";
import MobilizeVehicleList from "../features/mobilize/MobilizeVehicleList";
import VehicleControlCard from "../features/mobilize/VehicleControlCard";

import { getCommandVehicles, sendVehicleCommand } from "../api/mobilizeApi";

import VehicleControlConfirmation from "../features/mobilize/VehicleControlConfirmation";
import VehiclesControlMobilized from "../features/mobilize/VehiclesControlMobilized";
import CommandHistoryHeader from "../features/mobilize/CommandHistoryHeader";
import CommandHistory from "../features/mobilize/CommandHistory";

export default function Mobilize() {
  const [activeView, setActiveView] = useState("mobilize"); // "mobilize" | "history"
  const [searchQuery, setSearchQuery] = useState("");
  const [fleetFilter, setFleetFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState("");
  const [vehicles, setVehicles] = useState([]);
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [loadingVehicles, setLoadingVehicles] = useState(false);

  // Command History Filter States
  const [commandSearch, setCommandSearch] = useState("");
  const [selectedCommand, setSelectedCommand] = useState("All commands");
  const [selectedStatus, setSelectedStatus] = useState("All Status");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [pendingVehicle, setPendingVehicle] = useState(null);
  const [isSendingCommand, setIsSendingCommand] = useState(false);
  const [commandError, setCommandError] = useState(null);

  const COMMAND_OPTIONS = [
    { label: "All commands", value: "All commands" },
    { label: "Immobilize", value: "Immobilize" },
    { label: "Mobilize", value: "Mobilize" },
  ];

  const STATUS_OPTIONS = [
    { label: "All Status", value: "All Status" },
    { label: "Completed", value: "Completed" },
    { label: "Pending", value: "Pending" },
    { label: "Failed", value: "Failed" },
  ];

  const filteredVehicles = useMemo(() => {
    const query = debouncedSearchQuery.trim().toLowerCase();
    return vehicles.filter((vehicle) => {
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
        !query || plate.includes(query) || driver.includes(query) || city.includes(query);

      const matchesStatus = statusFilter === "all" || status === statusFilter;
      const matchesFleet = fleetFilter === "all" || city === fleetFilter.toLowerCase();

      return matchesSearch && matchesStatus && matchesFleet;
    });
  }, [vehicles, debouncedSearchQuery, statusFilter, fleetFilter]);

  const handleAction = (vehicle) => {
    if (vehicle.status === "offline") return;

    setSelectedVehicle(vehicle);
    setCurrentStep(1);
    setIsModalOpen(false);
    setPendingVehicle(null);
  };

  useEffect(() => {
    const timer = window.setTimeout(() => setDebouncedSearchQuery(searchQuery.trim()), 300);
    return () => window.clearTimeout(timer);
  }, [searchQuery]);

  useEffect(() => {
    let mounted = true;
    setLoadingVehicles(true);

    const params = {};
    const query = debouncedSearchQuery.trim();
    if (query) params.search = query;

    getCommandVehicles(params)
      .then((res) => {
        if (!mounted) return;
        const vehiclesList = Array.isArray(res) ? res : [];
        const normalized = vehiclesList.map((v, idx) => ({
          ...v,
          id: v.id ?? v.unique_id ?? v.uniqueId ?? v.plate ?? `veh_${idx}`,
          unique_id: v.unique_id ?? v.uniqueId ?? v.id ?? null,
          plate: v.plate ?? v.reg_no ?? v.vehicle_number ?? v.raw?.vehicle_number ?? v.raw?.reg_no ?? "Unknown",
          driver: v.driver ?? v.driver_name ?? v.raw?.driver_name ?? "Unknown",
          city: v.city ?? v.location ?? v.raw?.city ?? v.raw?.location ?? "Unknown",
          status: String(
            v.status ?? v.current_status ?? v.command_state ?? v.state ?? v.raw?.status ?? v.raw?.current_status ?? v.raw?.command_state ?? "offline"
          ).toLowerCase(),
          info: v.info ?? v.lastUpdated ?? v.raw?.last_updated ?? v.raw?.lastUpdated ?? "",
        }));

        setVehicles(normalized);
        setSelectedVehicle((prev) => {
          if (prev && normalized.some((item) => item.id === prev.id)) return prev;
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
  }, [debouncedSearchQuery]);

  const handleSelectVehicle = (vehicle) => {
    setSelectedVehicle(vehicle);
    setCurrentStep(1);
    setIsModalOpen(false);
    setPendingVehicle(null);
  };

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
      {activeView === "history" ? (
        <div className="flex-1 flex flex-col gap-4 min-h-0 overflow-y-auto pr-0.5 text-white custom-scrollbar">
          <div className="shrink-0">
            <CommandHistoryHeader
              commandOptions={COMMAND_OPTIONS}
              onCommandChange={setSelectedCommand}
              statusOptions={STATUS_OPTIONS}
              onStatusChange={setSelectedStatus}
              onSearchChange={setCommandSearch}
            />
          </div>
          <CommandHistory
            selectedCommand={selectedCommand}
            selectedStatus={selectedStatus}
            searchTerm={commandSearch}
          />
        </div>
      ) : (
        <div className="flex-1 flex flex-col gap-2.5 min-h-0 overflow-y-auto min-[1152px]:overflow-hidden pr-0.5 text-white custom-scrollbar">
          <div className="shrink-0">
            <MobilizeHeader
              onSearch={(value) => setSearchQuery(value)}
              fleetFilter={fleetFilter}
              onFleetChange={setFleetFilter}
              onHistoryClick={() => setActiveView("history")}
            />
          </div>

          <div className="shrink-0">
            <MobilizeStats />
          </div>

          <div className="flex flex-col min-[1152px]:flex-row gap-3.5 items-stretch w-full flex-1 min-h-0 overflow-y-auto min-[1152px]:overflow-hidden">
            <div className="w-full min-[1152px]:flex-1 shrink-0 h-[420px] min-[1152px]:h-full min-h-0 overflow-hidden">
              <MobilizeVehicleList
                vehicles={filteredVehicles}
                activeFilter={statusFilter}
                onFilterChange={setStatusFilter}
                onAction={handleAction}
                onSelectVehicle={handleSelectVehicle}
                selectedVehicle={selectedVehicle}
              />
            </div>

            <div className="w-full min-[1152px]:w-[320px] xl:w-[340px] shrink-0 h-[380px] min-[1152px]:h-full min-h-0 overflow-hidden">
              <VehicleControlCard
                vehicle={selectedVehicle}
                onRequestImmobilize={handleRequestImmobilize}
                isListLoading={loadingVehicles}
              />
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
      )}
    </MainLayout>
  );
}