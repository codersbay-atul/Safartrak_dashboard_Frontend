import React, { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { MapPinned } from "lucide-react";
import MainLayout from "../layouts/MainLayout";
import MainSectionHeader from "../components/Ui/MainLayoutUI/MainSectionHeader";
import SavedPlacesHeader from "../features/savedPlaces/SavedPlacesHeader";
import SavedPlacesStats from "../features/savedPlaces/SavedPlacesStats";
import SavedPlacesListPanel from "../features/savedPlaces/SavedPlacesListPanel";
import SavedPlacesMap from "../features/savedPlaces/SavedPlacesMap";
import SavedPlacesDetailsPanel from "../features/savedPlaces/SavedPlacesDetailsPanel";
import { useSavedPlacesList } from "../hooks/useSavedPlacesList";
import { deleteSavedPlace, createSavedPlace, updateSavedPlace } from "../services/savedPlacesService";
import { toast } from "../components/Ui/toast";
import CreateSavedPlace from "../features/savedPlaces/CreateSavedPlace";
import DeleteConfirmationModal from "../features/savedPlaces/DeleteConfirmationModal";

const parseSavedPlaceCenter = (place = {}) => {
  const geometryCenter = place?.geometry?.center;
  if (geometryCenter && typeof geometryCenter === "object") {
    const lat = Number(geometryCenter.lat ?? geometryCenter.latitude);
    const lng = Number(geometryCenter.lng ?? geometryCenter.lon ?? geometryCenter.longitude);
    if (!Number.isNaN(lat) && !Number.isNaN(lng)) {
      return [lat, lng];
    }
  }

  if (Array.isArray(place?.center) && place.center.length >= 2) {
    const [lat, lng] = place.center.map(Number);
    if (!Number.isNaN(lat) && !Number.isNaN(lng)) {
      return [lat, lng];
    }
  }

  if (typeof place?.geo_position === "string") {
    const [lat, lng] = place.geo_position.split(",").map(Number);
    if (!Number.isNaN(lat) && !Number.isNaN(lng)) {
      return [lat, lng];
    }
  }

  if (place?.geo_json) {
    try {
      const parsed = typeof place.geo_json === "string" ? JSON.parse(place.geo_json) : place.geo_json;
      const geometry = parsed?.geometry || parsed;
      const type = String(geometry?.type || "").toLowerCase();
      const coords = geometry?.coordinates;

      if (type === "point" && Array.isArray(coords) && coords.length >= 2) {
        const [lng, lat] = coords;
        if (!Number.isNaN(Number(lat)) && !Number.isNaN(Number(lng))) {
          return [Number(lat), Number(lng)];
        }
      }

      if (Array.isArray(coords)) {
        const ring = Array.isArray(coords[0]?.[0]) ? coords[0] : coords;
        const first = ring?.[0];
        if (Array.isArray(first) && first.length >= 2) {
          const [lng, lat] = first;
          if (!Number.isNaN(Number(lat)) && !Number.isNaN(Number(lng))) {
            return [Number(lat), Number(lng)];
          }
        }
      }
    } catch (error) {
      console.error("Failed to parse saved place geo_json", error);
    }
  }

  return [20.5937, 78.9629];
};

const parseSavedPlaceRadiusMeters = (place = {}) => {
  const geometry = place?.geometry ?? {};
  if (geometry.radius_m != null) return Number(geometry.radius_m);
  if (geometry.radius_km != null) return Number(geometry.radius_km) * 1000;
  if (place?.geo_json) {
    try {
      const parsed = typeof place.geo_json === "string" ? JSON.parse(place.geo_json) : place.geo_json;
      if (parsed?.properties?.radius_km != null) return Number(parsed.properties.radius_km) * 1000;
      if (parsed?.properties?.radius != null) return Number(parsed.properties.radius);
    } catch (error) {
      console.error("Failed to parse Saved Place radius", error);
    }
  }
  return 3000;
};

const normalizeAssignedVehicles = (place = {}) => {
  const rawVehicles = Array.isArray(place?.assigned_vehicles)
    ? place.assigned_vehicles
    : Array.isArray(place?.assignedVehicles)
      ? place.assignedVehicles
      : Array.isArray(place?.vehicles)
        ? place.vehicles
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

export default function SavedPlaces() {
  const queryClient = useQueryClient();
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedId, setSelectedId] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [editingPlace, setEditingPlace] = useState(null);
  const [createPrefill, setCreatePrefill] = useState(null);

  const { places = [], isLoading, isError, error } = useSavedPlacesList({
    search: searchQuery,
    status: statusFilter === "all" ? "all" : statusFilter,
    geometry: true,
  });

  const formattedPlaces = useMemo(
    () =>
      (places || []).map((place) => {
        const assignedVehicles = normalizeAssignedVehicles(place);
        const center = parseSavedPlaceCenter(place);
        const radiusMeters = parseSavedPlaceRadiusMeters(place);
        const shape = place?.geometry?.shape || place?.shape || "polygon";

        return {
          id: String(place.id ?? place._id ?? ""),
          name: place.name || place.area_name || place.areaName || "Untitled place",
          type: shape === "circle" ? "Circular" : "Polygon",
          size:
            shape === "circle"
              ? `${(radiusMeters / 1000).toFixed(1)} km radius`
              : `${place.geometry?.points?.length ?? 0} points`,
          vehicles: assignedVehicles.length,
          assignedVehiclesCount: assignedVehicles.length,
          status: place.active ? "active" : "inactive",
          color: place.active ? "#10b981" : "#FDBB24",
          center,
          radiusMeters,
          createdBy: "API",
          createdAt: place.created_at,
          inside: 0,
          enteredToday: 0,
          exitedToday: 0,
          assignedVehicles,
          vehiclesList: assignedVehicles,
          alertsText: place.alerts_count ? `${place.alerts_count} alerts this week` : "No recent alerts",
          raw: place,
        };
      }),
    [places]
  );

  useEffect(() => {
    if (!formattedPlaces.length) {
      setSelectedId(null);
      return;
    }

    if (!selectedId || !formattedPlaces.some((place) => place.id === selectedId)) {
      setSelectedId(formattedPlaces[0].id);
    }
  }, [formattedPlaces, selectedId]);

  const selectedPlace =
    formattedPlaces.find((place) => place.id === selectedId) || null;

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
    const shape = formData.placeType === "circle" ? "circle" : "polygon";
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
      name: formData.name?.trim() || "Untitled place",
      kind: shape,
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

  // Create saved place
  const createMutation = useMutation({
    mutationFn: (formData) => createSavedPlace(buildCreatePayload(formData)),
    onSuccess: async (createdPlace) => {
      const createdPayload = createdPlace?.data ?? createdPlace ?? {};
      const assignedVehicles = normalizeAssignedVehicles(createdPayload);
      const normalizedPlace = {
        id: String(createdPayload.id ?? createdPayload._id ?? createdPayload.place_id ?? ""),
        name: createdPayload.name || "Untitled place",
        type: createdPayload.geometry?.shape === "circle" || createdPayload.shape === "circle" ? "Circular" : "Polygon",
        size: createdPayload.geometry?.shape === "circle" || createdPayload.shape === "circle"
          ? `${(parseSavedPlaceRadiusMeters(createdPayload) / 1000).toFixed(1)} km radius`
          : `${createdPayload.geometry?.points?.length ?? 4} points`,
        vehicles: assignedVehicles.length,
        assignedVehiclesCount: assignedVehicles.length,
        status: createdPayload.active ? "active" : "inactive",
        color: createdPayload.active ? "#10b981" : "#FDBB24",
        center: parseSavedPlaceCenter(createdPayload),
        radiusMeters: parseSavedPlaceRadiusMeters(createdPayload),
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

      queryClient.setQueriesData({ queryKey: ["saved-places-list"] }, (previous) => {
        const previousItems = Array.isArray(previous?.areas)
          ? previous.areas
          : Array.isArray(previous)
            ? previous
            : [];

        const mergedItems = [
          normalizedPlace.raw ? { ...normalizedPlace.raw, id: normalizedPlace.id } : normalizedPlace,
          ...previousItems.filter((item) => String(item?.id) !== normalizedPlace.id),
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

      await queryClient.invalidateQueries({ queryKey: ["saved-places-list"] });
      await queryClient.invalidateQueries({ queryKey: ["saved-places-summary"] });
      toast.success("Saved place created");
      setSelectedId(normalizedPlace.id);
      setIsCreateModalOpen(false);
    },
    onError: (err) => {
      toast.error(err?.message || "Failed to create saved place");
    },
  });

  // Update saved place
  const updateMutation = useMutation({
    mutationFn: (formData) => {
      const placeId = editingPlace?.raw?.id || editingPlace?.id;
      if (!placeId) throw new Error("Saved place ID is required for update");
      
      const payload = {
        active: true,
        entry_alert: Boolean(formData.entry_alert ?? formData.alerts?.entry),
        exit_alert: Boolean(formData.exit_alert ?? formData.alerts?.exit),
        assigned_vehicles: formData.assigned_vehicles || formData.selectedVehicles || [],
      };
      
      return updateSavedPlace(placeId, payload);
    },
    onSuccess: async (updatedPlace) => {
      const updatedPayload = updatedPlace?.data ?? updatedPlace ?? {};
      const assignedVehicles = normalizeAssignedVehicles(updatedPayload);
      const normalizedPlace = {
        id: String(updatedPayload.id ?? updatedPayload._id ?? updatedPayload.place_id ?? ""),
        name: updatedPayload.name || "Untitled place",
        type: updatedPayload.geometry?.shape === "circle" || updatedPayload.shape === "circle" ? "Circular" : "Polygon",
        size: updatedPayload.geometry?.shape === "circle" || updatedPayload.shape === "circle"
          ? `${(parseSavedPlaceRadiusMeters(updatedPayload) / 1000).toFixed(1)} km radius`
          : `${updatedPayload.geometry?.points?.length ?? 4} points`,
        vehicles: assignedVehicles.length,
        assignedVehiclesCount: assignedVehicles.length,
        status: updatedPayload.active ? "active" : "inactive",
        color: updatedPayload.active ? "#10b981" : "#FDBB24",
        center: parseSavedPlaceCenter(updatedPayload),
        radiusMeters: parseSavedPlaceRadiusMeters(updatedPayload),
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

      queryClient.setQueriesData({ queryKey: ["saved-places-list"] }, (previous) => {
        const previousItems = Array.isArray(previous?.areas)
          ? previous.areas
          : Array.isArray(previous)
            ? previous
            : [];
        const mergedItems = [
          normalizedPlace.raw ? { ...normalizedPlace.raw, id: normalizedPlace.id } : normalizedPlace,
          ...previousItems.filter((item) => String(item?.id) !== normalizedPlace.id),
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

      await queryClient.invalidateQueries({ queryKey: ["saved-places-list"] });
      await queryClient.invalidateQueries({ queryKey: ["saved-places-summary"] });
      toast.success("Saved place updated");
      setSelectedId(normalizedPlace.id);
      setIsCreateModalOpen(false);
      setEditingPlace(null);
    },
    onError: (err) => {
      toast.error(err?.message || "Failed to update saved place");
    },
  });

  // Delete saved place
  const deleteMutation = useMutation({
    mutationFn: deleteSavedPlace,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["saved-places-list"] });
      await queryClient.invalidateQueries({ queryKey: ["saved-places-summary"] });
      toast.success("Saved place deleted");
      setSelectedId(null);
    },
    onError: (err) => {
      toast.error(err?.message || "Failed to delete saved place");
    },
  });

  useEffect(() => {
    if (searchParams.get("create") !== "1") return;

    const lat = Number(searchParams.get("lat"));
    const lng = Number(searchParams.get("lng"));

    setEditingPlace(null);
    setCreatePrefill({
      name: "",
      address: searchParams.get("address") || "",
      lat: Number.isNaN(lat) ? undefined : lat,
      lng: Number.isNaN(lng) ? undefined : lng,
    });
    setIsCreateModalOpen(true);
    setSearchParams({}, { replace: true });
  }, [searchParams, setSearchParams]);

  const handleOpenCreateModal = () => {
    setEditingPlace(null);
    setCreatePrefill(null);
    setIsCreateModalOpen(true);
  };

  const handleEditClick = (place) => {
    if (!place) return;
    setCreatePrefill(null);
    setEditingPlace(place);
    setIsCreateModalOpen(true);
  };

  const handleCloseCreateModal = () => {
    setIsCreateModalOpen(false);
    setEditingPlace(null);
    setCreatePrefill(null);
  };

  const handleCreateSubmit = (newPlaceData) => {
    if (editingPlace) {
      updateMutation.mutate(newPlaceData);
      return;
    }

    createMutation.mutate(newPlaceData);
  };

  const handleDeleteClick = () => {
    if (selectedPlace?.raw?.id) {
      setIsDeleteModalOpen(true);
    }
  };

  const handleConfirmDelete = () => {
    if (!selectedPlace?.raw?.id) return;
    deleteMutation.mutate(selectedPlace.raw.id);
    setIsDeleteModalOpen(false);
  };

  return (
    <MainLayout activeTab="Saved Places">
      <div className="flex min-h-0 min-w-0 flex-1 flex-col gap-3.5 overflow-hidden text-white sm:gap-4 xl:gap-5">
        <div className="shrink-0 w-full min-w-0">
          <SavedPlacesHeader onCreateClick={handleOpenCreateModal} />
        </div>

        {/* <div className="shrink-0">
          <SavedPlacesStats />
        </div> */}

        <MainSectionHeader icon={MapPinned} title="Places" className="!mt-0" />

        <div className="grid w-full min-h-0 min-w-0 flex-1 grid-cols-1 grid-rows-[minmax(0,1fr)_minmax(0,1fr)_minmax(0,1.2fr)] items-stretch gap-3.5 overflow-hidden sm:gap-3 md:grid-cols-2 md:grid-rows-[minmax(0,1fr)_minmax(0,1.1fr)] xl:grid-cols-[minmax(300px,360px)_minmax(0,1fr)_minmax(320px,380px)] xl:grid-rows-[minmax(0,1fr)]  2xl:grid-cols-[minmax(340px,400px)_minmax(0,1fr)_minmax(360px,420px)]">
          <div className="order-1 h-full min-h-0 min-w-0 overflow-hidden">
            <SavedPlacesListPanel
              places={formattedPlaces}
              selectedId={selectedId}
              onSelect={(place) => setSelectedId(place.id)}
              searchQuery={searchQuery}
              onSearchChange={(e) => setSearchQuery(e.target.value)}
              statusFilter={statusFilter}
              onFilterChange={setStatusFilter}
              isLoading={isLoading}
              isError={isError}
              errorMessage={error?.message}
            />
          </div>

          <div className="order-2 h-full min-h-0 min-w-0 overflow-hidden md:order-3 md:col-span-2 xl:order-2 xl:col-span-1">
            <SavedPlacesMap places={formattedPlaces} selectedPlace={selectedPlace} />
          </div>

          <div className="order-3 h-full min-h-0 min-w-0 overflow-hidden md:order-2 xl:order-3">
            <SavedPlacesDetailsPanel
              place={selectedPlace}
              onEdit={() => handleEditClick(selectedPlace)}
              onDelete={handleDeleteClick}
            />
          </div>
        </div>
      </div>

      <CreateSavedPlace
        isOpen={isCreateModalOpen}
        initialData={editingPlace || createPrefill}
        mode={editingPlace ? "edit" : "create"}
        isSubmitting={createMutation.isPending || updateMutation.isPending}
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