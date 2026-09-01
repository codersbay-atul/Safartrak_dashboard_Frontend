import React, { useEffect, useMemo, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { MapPinned } from "lucide-react";
import MainLayout from "../layouts/MainLayout";
import MainSectionHeader from "../components/Ui/MainLayoutUI/MainSectionHeader";
import AoiHeader from "../features/aoi/AoiHeader";
import AoiStats from "../features/aoi/AoiStats";
import AoiListPanel from "../features/aoi/AoiListPanel";
import AoiMap from "../features/aoi/AoiMap";
import AoiDetailsPanel from "../features/aoi/AoiDetailsPanel";
import { useAoiList } from "../hooks/useAoiList";
import { deleteAoi, createAoi, updateAoi } from "../services/aoiService";
import { queryKeys } from "../api/queryKeys";
import { toast } from "../components/Ui/toast";
import CreateAOI from "../features/aoi/CreateAOI";
import DeleteConfirmationModal from "../features/aoi/DeleteConfirmationModal";

const parseAoiCenter = (aoi = {}) => {
  const geometryCenter = aoi?.geometry?.center;
  if (geometryCenter && typeof geometryCenter === "object") {
    const lat = Number(geometryCenter.lat ?? geometryCenter.latitude);
    const lng = Number(geometryCenter.lng ?? geometryCenter.lon ?? geometryCenter.longitude);
    if (!Number.isNaN(lat) && !Number.isNaN(lng)) {
      return [lat, lng];
    }
  }

  if (Array.isArray(aoi?.center) && aoi.center.length >= 2) {
    const [lat, lng] = aoi.center.map(Number);
    if (!Number.isNaN(lat) && !Number.isNaN(lng)) {
      return [lat, lng];
    }
  }

  if (typeof aoi?.geo_position === "string") {
    const [lat, lng] = aoi.geo_position.split(",").map(Number);
    if (!Number.isNaN(lat) && !Number.isNaN(lng)) {
      return [lat, lng];
    }
  }

  if (aoi?.geo_json) {
    try {
      const parsed = typeof aoi.geo_json === "string" ? JSON.parse(aoi.geo_json) : aoi.geo_json;
      const coords = parsed?.geometry?.coordinates;
      if (Array.isArray(coords) && coords.length >= 2) {
        const [lng, lat] = coords;
        if (!Number.isNaN(lat) && !Number.isNaN(lng)) {
          return [Number(lat), Number(lng)];
        }
      }
    } catch (error) {
      console.error("Failed to parse AOI geo_json", error);
    }
  }

  return [20.5937, 78.9629];
};

const parseAoiRadiusMeters = (aoi = {}) => {
  const geometry = aoi?.geometry ?? {};
  if (geometry.radius_m != null) return Number(geometry.radius_m);
  if (geometry.radius_km != null) return Number(geometry.radius_km) * 1000;
  if (aoi?.geo_json) {
    try {
      const parsed = typeof aoi.geo_json === "string" ? JSON.parse(aoi.geo_json) : aoi.geo_json;
      if (parsed?.properties?.radius_km != null) return Number(parsed.properties.radius_km) * 1000;
      if (parsed?.properties?.radius != null) return Number(parsed.properties.radius);
    } catch (error) {
      console.error("Failed to parse AOI radius", error);
    }
  }
  return 3000;
};

const normalizeAssignedVehicles = (aoi = {}) => {
  const rawVehicles = Array.isArray(aoi?.assigned_vehicles)
    ? aoi.assigned_vehicles
    : Array.isArray(aoi?.assignedVehicles)
      ? aoi.assignedVehicles
      : Array.isArray(aoi?.vehicles)
        ? aoi.vehicles
        : [];

  return rawVehicles.map((vehicle) => {
    if (typeof vehicle === "string") {
      return {
        plate: vehicle,
        name: vehicle,
        status: "",
        type: "",
      };
    }

    return {
      plate: vehicle?.plate || vehicle?.vehicle_number || vehicle?.vehicle_id || vehicle?.name || vehicle?.id || "",
      name: vehicle?.name || vehicle?.vehicle_name || "",
      status: vehicle?.status || vehicle?.current_status || "",
      type: vehicle?.type || vehicle?.vehicle_type || "",
      isInside: Boolean(vehicle?.isInside ?? vehicle?.inside),
    };
  });
};

export default function Aoi() {
  const queryClient = useQueryClient();
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedId, setSelectedId] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [editingAoi, setEditingAoi] = useState(null);

  const { aois = [], isLoading, isError, error } = useAoiList({
    search: searchQuery,
    status: statusFilter === "all" ? undefined : statusFilter,
    geometry: false,
  });

  const formattedAois = useMemo(
    () =>
      (aois || []).map((aoi) => {
        const assignedVehicles = normalizeAssignedVehicles(aoi);
        const center = parseAoiCenter(aoi);
        const radiusMeters = parseAoiRadiusMeters(aoi);
        const shape = aoi?.geometry?.shape || aoi?.shape || "polygon";

        return {
          id: aoi.id,
          name: aoi.name || "Untitled AOI",
          type: shape === "circle" ? "Circular" : "Polygon",
          size:
            shape === "circle"
              ? `${(radiusMeters / 1000).toFixed(1)} km radius`
              : `${aoi.geometry?.points?.length ?? 0} points`,
          vehicles: assignedVehicles.length,
          assignedVehiclesCount: assignedVehicles.length,
          status: aoi.active ? "active" : "inactive",
          color: aoi.active ? "#10b981" : "#FDBB24",
          center,
          radiusMeters,
          createdBy: "API",
          createdAt: aoi.created_at,
          inside: 0,
          enteredToday: 0,
          exitedToday: 0,
          assignedVehicles,
          vehiclesList: assignedVehicles,
          alertsText: aoi.alerts_count ? `${aoi.alerts_count} alerts this week` : "No recent alerts",
          raw: aoi,
        };
      }),
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

  const buildCreatePayload = (formData = {}) => {
    const parsedLat = Number(formData.lat);
    const parsedLng = Number(formData.lng);
    const fromGeo =
      typeof formData.geo_position === "string"
        ? formData.geo_position.split(",").map(Number)
        : [];
    const baseCenter = {
      lat: !Number.isNaN(parsedLat) ? parsedLat : !Number.isNaN(fromGeo[0]) ? fromGeo[0] : 28.6139,
      lng: !Number.isNaN(parsedLng) ? parsedLng : !Number.isNaN(fromGeo[1]) ? fromGeo[1] : 77.209,
    };
    const shape = formData.aoiType === "circle" ? "circle" : "polygon";
    const points = [
      { lat: baseCenter.lat + 0.01, lng: baseCenter.lng - 0.01 },
      { lat: baseCenter.lat + 0.015, lng: baseCenter.lng + 0.01 },
      { lat: baseCenter.lat - 0.01, lng: baseCenter.lng + 0.015 },
      { lat: baseCenter.lat - 0.005, lng: baseCenter.lng - 0.005 },
    ];

    const assignedVehicles = (formData.assigned_vehicles ?? formData.selectedVehicles ?? [])
      .map((vehicle) => (typeof vehicle === "string" ? vehicle : vehicle?.id ?? vehicle?.vehicle_id ?? vehicle?.value))
      .filter(Boolean);

    const geoJson =
      shape === "circle"
        ? JSON.stringify({
            type: "Feature",
            properties: { shape, radius_km: 2.5, center: baseCenter },
            geometry: {
              type: "Point",
              coordinates: [baseCenter.lng, baseCenter.lat],
            },
          })
        : JSON.stringify({
            type: "Feature",
            properties: { shape },
            geometry: {
              type: "Polygon",
              coordinates: [[
                [baseCenter.lng - 0.01, baseCenter.lat + 0.01],
                [baseCenter.lng + 0.01, baseCenter.lat + 0.015],
                [baseCenter.lng + 0.015, baseCenter.lat - 0.01],
                [baseCenter.lng - 0.005, baseCenter.lat - 0.005],
                [baseCenter.lng - 0.01, baseCenter.lat + 0.01],
              ]],
            },
          });

    return {
      name: formData.name?.trim() || "Untitled AOI",
      active: true,
      entry_alert: Boolean(formData.entry_alert ?? formData.alerts?.entry),
      exit_alert: Boolean(formData.exit_alert ?? formData.alerts?.exit),
      assigned_vehicles: assignedVehicles,
      shape,
      geo_json: geoJson,
      geo_position: `${baseCenter.lat},${baseCenter.lng}`,
      geometry: {
        shape,
        center: baseCenter,
        ...(shape === "circle" ? { radius_km: 2.5 } : { points }),
      },
    };
  };

  // Create AOI Mutation
  const createMutation = useMutation({
    mutationFn: (formData) => createAoi(buildCreatePayload(formData)),
    onSuccess: async (createdAoi) => {
      const createdPayload = createdAoi?.data ?? createdAoi ?? {};
      const assignedVehicles = normalizeAssignedVehicles(createdPayload);
      const normalizedAoi = {
        id: createdPayload.id ?? createdPayload._id ?? createdPayload.aoi_id,
        name: createdPayload.name || "Untitled AOI",
        type: createdPayload.geometry?.shape === "circle" || createdPayload.shape === "circle" ? "Circular" : "Polygon",
        size: createdPayload.geometry?.shape === "circle" || createdPayload.shape === "circle"
          ? `${(parseAoiRadiusMeters(createdPayload) / 1000).toFixed(1)} km radius`
          : `${createdPayload.geometry?.points?.length ?? 4} points`,
        vehicles: assignedVehicles.length,
        assignedVehiclesCount: assignedVehicles.length,
        status: createdPayload.active ? "active" : "inactive",
        color: createdPayload.active ? "#10b981" : "#FDBB24",
        center: parseAoiCenter(createdPayload),
        radiusMeters: parseAoiRadiusMeters(createdPayload),
        createdBy: "API",
        createdAt: createdPayload.created_at,
        inside: 0,
        enteredToday: 0,
        exitedToday: 0,
        assignedVehicles,
        vehiclesList: assignedVehicles,
        alertsText: createdPayload.alerts_count ? `${createdPayload.alerts_count} alerts this week` : "No recent alerts",
        raw: createdPayload,
      };

      queryClient.setQueriesData({ queryKey: queryKeys.aoi.list({}) }, (previous) => {
        const previousItems = Array.isArray(previous?.areas)
          ? previous.areas
          : Array.isArray(previous)
            ? previous
            : [];

        const mergedItems = [
          ...previousItems.filter((item) => item?.id !== normalizedAoi.id),
          normalizedAoi.raw ? { ...normalizedAoi.raw, id: normalizedAoi.id } : normalizedAoi,
        ];

        if (Array.isArray(previous)) {
          return mergedItems;
        }

        return {
          ...(previous ?? {}),
          areas: mergedItems,
          count: mergedItems.length,
          total: mergedItems.length,
        };
      });

      await queryClient.invalidateQueries({ queryKey: queryKeys.aoi.list({}) });
      await queryClient.invalidateQueries({ queryKey: queryKeys.aoi.summary });
      toast.success("AOI created successfully");
      setSelectedId(normalizedAoi.id);
      setIsCreateModalOpen(false);
    },
    onError: (err) => {
      toast.error(err?.message || "Failed to create AOI");
    },
  });

  // Update AOI Mutation
  const updateMutation = useMutation({
    mutationFn: (formData) => {
      const aoiId = editingAoi?.raw?.id || editingAoi?.id;
      if (!aoiId) throw new Error("AOI ID is required for update");
      
      const payload = {
        active: true,
        entry_alert: Boolean(formData.entry_alert ?? formData.alerts?.entry),
        exit_alert: Boolean(formData.exit_alert ?? formData.alerts?.exit),
        assigned_vehicles: formData.assigned_vehicles || formData.selectedVehicles || [],
      };
      
      return updateAoi(aoiId, payload);
    },
    onSuccess: async (updatedAoi) => {
      const updatedPayload = updatedAoi?.data ?? updatedAoi ?? {};
      const assignedVehicles = normalizeAssignedVehicles(updatedPayload);
      const normalizedAoi = {
        id: updatedPayload.id ?? updatedPayload._id ?? updatedPayload.aoi_id,
        name: updatedPayload.name || "Untitled AOI",
        type: updatedPayload.geometry?.shape === "circle" || updatedPayload.shape === "circle" ? "Circular" : "Polygon",
        size: updatedPayload.geometry?.shape === "circle" || updatedPayload.shape === "circle"
          ? `${(parseAoiRadiusMeters(updatedPayload) / 1000).toFixed(1)} km radius`
          : `${updatedPayload.geometry?.points?.length ?? 4} points`,
        vehicles: assignedVehicles.length,
        assignedVehiclesCount: assignedVehicles.length,
        status: updatedPayload.active ? "active" : "inactive",
        color: updatedPayload.active ? "#10b981" : "#FDBB24",
        center: parseAoiCenter(updatedPayload),
        radiusMeters: parseAoiRadiusMeters(updatedPayload),
        createdBy: "API",
        createdAt: updatedPayload.created_at,
        inside: 0,
        enteredToday: 0,
        exitedToday: 0,
        assignedVehicles,
        vehiclesList: assignedVehicles,
        alertsText: updatedPayload.alerts_count ? `${updatedPayload.alerts_count} alerts this week` : "No recent alerts",
        raw: updatedPayload,
      };

      queryClient.setQueriesData({ queryKey: queryKeys.aoi.list({}) }, (previous) => {
        const previousItems = Array.isArray(previous?.areas)
          ? previous.areas
          : Array.isArray(previous)
            ? previous
            : [];
        const mergedItems = [
          ...previousItems.filter((item) => item?.id !== normalizedAoi.id),
          normalizedAoi.raw ? { ...normalizedAoi.raw, id: normalizedAoi.id } : normalizedAoi,
        ];

        if (Array.isArray(previous)) {
          return mergedItems;
        }

        return {
          ...(previous ?? {}),
          areas: mergedItems,
          count: mergedItems.length,
          total: mergedItems.length,
        };
      });

      await queryClient.invalidateQueries({ queryKey: queryKeys.aoi.list({}) });
      await queryClient.invalidateQueries({ queryKey: queryKeys.aoi.summary });
      toast.success("AOI updated successfully");
      setSelectedId(normalizedAoi.id);
      setIsCreateModalOpen(false);
      setEditingAoi(null);
    },
    onError: (err) => {
      toast.error(err?.message || "Failed to update AOI");
    },
  });

  // Delete AOI Mutation
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

  const handleOpenCreateModal = () => {
    setEditingAoi(null);
    setIsCreateModalOpen(true);
  };

  const handleEditClick = (aoi) => {
    if (!aoi) return;
    setEditingAoi(aoi);
    setIsCreateModalOpen(true);
  };

  const handleCloseCreateModal = () => {
    setIsCreateModalOpen(false);
    setEditingAoi(null);
  };

  const handleCreateSubmit = (newAoiData) => {
    if (editingAoi) {
      updateMutation.mutate(newAoiData);
      return;
    }

    createMutation.mutate(newAoiData);
  };

  const handleDeleteClick = () => {
    if (selectedAoi?.raw?.id) {
      setIsDeleteModalOpen(true);
    }
  };

  const handleConfirmDelete = () => {
    if (!selectedAoi?.raw?.id) return;
    deleteMutation.mutate(selectedAoi.raw.id);
    setIsDeleteModalOpen(false);
  };

  return (
    <MainLayout activeTab="Saved Places">
      <div className="flex min-h-0 min-w-0 flex-1 flex-col gap-3.5 overflow-hidden text-white sm:gap-4 xl:gap-5">
        <div className="shrink-0 w-full min-w-0">
          <AoiHeader onCreateClick={handleOpenCreateModal} />
        </div>

        {/* <div className="shrink-0">
          <AoiStats />
        </div> */}

        <MainSectionHeader icon={MapPinned} title="Places" className="!mt-0" />

        <div className="grid w-full min-h-0 min-w-0 flex-1 grid-cols-1 grid-rows-[minmax(0,1fr)_minmax(0,1fr)_minmax(0,1.2fr)] items-stretch gap-3.5 overflow-hidden sm:gap-3 md:grid-cols-2 md:grid-rows-[minmax(0,1fr)_minmax(0,1.1fr)] xl:grid-cols-[minmax(300px,360px)_minmax(0,1fr)_minmax(320px,380px)] xl:grid-rows-[minmax(0,1fr)]  2xl:grid-cols-[minmax(340px,400px)_minmax(0,1fr)_minmax(360px,420px)]">
          <div className="order-1 h-full min-h-0 min-w-0 overflow-hidden">
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

          <div className="order-2 h-full min-h-0 min-w-0 overflow-hidden md:order-3 md:col-span-2 xl:order-2 xl:col-span-1">
            <AoiMap aois={formattedAois} selectedAoi={selectedAoi} />
          </div>

          <div className="order-3 h-full min-h-0 min-w-0 overflow-hidden md:order-2 xl:order-3">
            <AoiDetailsPanel
              aoi={selectedAoi}
              onEdit={() => handleEditClick(selectedAoi)}
              onDelete={handleDeleteClick}
            />
          </div>
        </div>
      </div>

      <CreateAOI
        isOpen={isCreateModalOpen}
        initialData={editingAoi}
        mode={editingAoi ? "edit" : "create"}
        onClose={handleCloseCreateModal}
        onSubmit={handleCreateSubmit}
      />

      <DeleteConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
      />
    </MainLayout>
  );
}