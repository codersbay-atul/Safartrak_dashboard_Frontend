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

export async function getTripSchedules(params = {}) {
  const response = await apiClient.get("/v1/trip-schedules", { params });
  return unwrapPayload(response);
}

export async function getTripSchedulesSummary() {
  const response = await apiClient.get("/v1/trip-schedules/summary");
  return unwrapPayload(response);
}

export async function createTripSchedule(payload = {}) {
  const response = await apiClient.post("/v1/trip-schedules", payload);
  return unwrapPayload(response);
}

export async function getTripScheduleDetail(tripId) {
  const response = await apiClient.get(`/v1/trip-schedules/${tripId}`);
  return unwrapPayload(response);
}

export async function updateTripSchedule(tripId, payload = {}) {
  const response = await apiClient.patch(`/v1/trip-schedules/${tripId}`, payload);
  return unwrapPayload(response);
}

export async function deleteTripSchedule(tripId) {
  const response = await apiClient.delete(`/v1/trip-schedules/${tripId}`);
  return unwrapPayload(response);
}
