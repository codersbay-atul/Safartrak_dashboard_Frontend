import React, { useEffect, useMemo, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import MainLayout from "../layouts/MainLayout";
import AoiHeader from "../features/aoi/AoiHeader";
import AoiStats from "../features/aoi/AoiStats";
import AoiListPanel from "../features/aoi/AoiListPanel";
import AoiMap from "../features/aoi/AoiMap";
import AoiDetailsPanel from "../features/aoi/AoiDetailsPanel";
import { useAoiList } from "../hooks/useAoiList";
import { deleteAoi } from "../services/aoiService";
import { queryKeys } from "../api/queryKeys";
import { toast } from "../components/Ui/toast";

export default function Aoi() {
  const queryClient = useQueryClient();
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedId, setSelectedId] = useState(null);

  const { aois, isLoading, isError, error } = useAoiList({
    search: searchQuery,
    status: statusFilter,
    geometry: false,
  });

  const formattedAois = useMemo(
    () =>
      aois.map((aoi) => ({
        id: aoi.id,
        name: aoi.name,
        type: aoi.geometry?.shape === "circle" ? "Circular" : "Polygon",
        size: aoi.geometry?.shape === "circle"
          ? `${aoi.geometry?.radius_km ?? 0} km radius`
          : `${aoi.geometry?.points?.length ?? 0} points`,
        vehicles: aoi.assigned_vehicle_count ?? 0,
        status: aoi.active ? "active" : "inactive",
        color: aoi.active ? "#10b981" : "#FDBB24",
        center: aoi.geometry?.center
          ? [aoi.geometry.center.lat, aoi.geometry.center.lng]
          : [20.5937, 78.9629],
        radiusMeters: (aoi.geometry?.radius_km ?? 0) * 1000,
        createdBy: "API",
        createdAt: aoi.created_at,
        inside: 0,
        enteredToday: 0,
        exitedToday: 0,
        assignedVehicles: [],
        raw: aoi,
      })),
    [aois]
  );

  useEffect(() => {
    if (!formattedAois.length) {
      setSelectedId(null);
      return;
    }

    if (!selectedId || !formattedAois.some((aoi) => aoi.id === selectedId)) {
      setSelectedId(formattedAois[0].id);
    }
  }, [formattedAois, selectedId]);

  const selectedAoi =
    formattedAois.find((aoi) => aoi.id === selectedId) || null;

  const deleteMutation = useMutation({
    mutationFn: deleteAoi,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: queryKeys.aoi.list({}) });
      await queryClient.invalidateQueries({ queryKey: queryKeys.aoi.summary });
      toast.success("AOI deleted successfully");
      setSelectedId(null);
    },
    onError: (err) => {
      toast.error(err?.message || "Failed to delete AOI");
    },
  });

  const handleDelete = () => {
    if (!selectedAoi?.raw?.id) return;

    const confirmed = window.confirm(`Delete AOI "${selectedAoi.name}"?`);
    if (!confirmed) return;

    deleteMutation.mutate(selectedAoi.raw.id);
  };

  return (
    <MainLayout activeTab="Area of Interest (AOI)">
      <div className="flex-1 flex flex-col gap-3.5 min-h-0 overflow-y-auto lg:overflow-hidden pr-0.5 custom-scrollbar">
        <AoiHeader onCreateClick={() => {}} />
        <AoiStats />

        <div className="flex flex-col xl:flex-row gap-3.5 w-full flex-1 min-h-[520px] xl:min-h-0 overflow-hidden">
          <div className="w-full xl:w-[280px] shrink-0 h-[280px] xl:h-full min-h-0 overflow-hidden">
            <AoiListPanel
              aois={formattedAois}
              selectedId={selectedId}
              onSelect={(aoi) => setSelectedId(aoi.id)}
              searchQuery={searchQuery}
              onSearchChange={(e) => setSearchQuery(e.target.value)}
              statusFilter={statusFilter}
              onFilterChange={setStatusFilter}
            />
          </div>

          <div className="flex-1 min-w-0 h-[320px] xl:h-full min-h-0 overflow-hidden">
            <AoiMap aois={formattedAois} selectedAoi={selectedAoi} />
          </div>

          <div className="w-full xl:w-[300px] shrink-0 h-[420px] xl:h-full min-h-0 overflow-hidden">
            <AoiDetailsPanel
              aoi={selectedAoi}
              onEdit={() => {}}
              onDelete={handleDelete}
            />
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
