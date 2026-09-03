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

export async function getMapsStatus() {
  try {
    const response = await apiClient.get("/v1/maps/status");
    return unwrapPayload(response);
  } catch {
    return { enabled: true, mapsRemaining: 7000, remaining: 7000, limit: 7000 };
  }
}

export async function consumeMapsQuota(count = 1) {
  const response = await apiClient.post("/v1/maps/consume", { count });
  return unwrapPayload(response);
}
