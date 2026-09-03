import apiClient from "./client";

function unwrapPayload(response) {
  const payload = response?.data;

  if (
    payload &&
    typeof payload === "object" &&
    Object.prototype.hasOwnProperty.call(payload, "data") &&
    payload.data != null &&
    typeof payload.data === "object"
  ) {
    return payload.data;
  }

  return payload ?? {};
}

export async function createSavedPlace(payload = {}) {
  const response = await apiClient.post("/v1/saved-places", payload);
  return unwrapPayload(response);
}

export async function getSavedPlacesSummary() {
  const response = await apiClient.get("/v1/saved-places/summary");
  return unwrapPayload(response);
}

export async function getSavedPlacesList({ search = "", status = "all", geometry = false } = {}) {
  const params = {};

  if (search) params.search = search;
  if (status && status !== "all") params.status = status;
  if (geometry !== undefined) params.geometry = geometry;

  const response = await apiClient.get("/v1/saved-places", { params });
  return unwrapPayload(response);
}

export async function getSavedPlaceDetail(placeId) {
  const response = await apiClient.get(`/v1/saved-places/${placeId}`);
  return unwrapPayload(response);
}

export async function updateSavedPlace(placeId, payload = {}) {
  const response = await apiClient.patch(`/v1/saved-places/${placeId}`, payload);
  return unwrapPayload(response);
}

export async function deleteSavedPlace(placeId) {
  const response = await apiClient.delete(`/v1/saved-places/${placeId}`);
  return unwrapPayload(response);
}
