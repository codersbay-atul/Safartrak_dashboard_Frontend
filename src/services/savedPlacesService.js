import {
  createSavedPlace as createSavedPlaceRequest,
  updateSavedPlace as updateSavedPlaceRequest,
  deleteSavedPlace as deleteSavedPlaceRequest,
  getSavedPlacesList as getSavedPlacesListRequest,
  getSavedPlacesSummary as getSavedPlacesSummaryRequest,
  getSavedPlaceDetail as getSavedPlaceDetailRequest,
} from "../api/savedPlacesApi";

const asList = (payload) => {
  if (Array.isArray(payload?.areas)) return payload.areas;
  if (Array.isArray(payload?.results)) return payload.results;
  if (Array.isArray(payload)) return payload;
  return [];
};

export async function getSavedPlacesSummary() {
  const payload = await getSavedPlacesSummaryRequest();
  const total = Number(payload.total_places ?? payload.total_aois ?? payload.total ?? 0);
  const active = Number(payload.active_places ?? payload.active_aois ?? payload.active ?? 0);
  const inactive = Number(
    payload.inactive_places ??
      payload.inactive_aois ??
      payload.Inactive_aois ??
      Math.max(total - active, 0)
  );

  return {
    ...payload,
    total_places: total,
    active_places: active,
    inactive_places: inactive,
    vehicles_covered: Number(payload.vehicles_covered ?? 0),
    alerts_today: Number(payload.alerts_today ?? 0),
  };
}

export async function getSavedPlacesList({ search = "", status = "all", geometry = false } = {}) {
  const payload = await getSavedPlacesListRequest({ search, status, geometry });
  const areas = asList(payload);
  const filtered =
    status && status !== "all"
      ? areas.filter((place) => {
          const isActive = place.active !== false;
          return status === "active" ? isActive : !isActive;
        })
      : areas;

  return {
    ...payload,
    areas: filtered,
    results: filtered,
    count: filtered.length,
    total: Number(payload.total ?? filtered.length),
  };
}

export function getSavedPlaceDetail(placeId) {
  return getSavedPlaceDetailRequest(placeId);
}

export function createSavedPlace(payload) {
  const kind = payload.kind || payload.shape || payload.placeType || payload.geometry?.shape || "circle";
  return createSavedPlaceRequest({
    ...payload,
    kind,
    area_type: kind,
    name: payload.name || payload.area_name,
  });
}

export function updateSavedPlace(placeId, payload) {
  return updateSavedPlaceRequest(placeId, payload);
}

export function deleteSavedPlace(placeId) {
  return deleteSavedPlaceRequest(placeId);
}
