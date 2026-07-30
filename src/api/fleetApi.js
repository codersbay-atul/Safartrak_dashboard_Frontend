import apiClient from "./client";

/* =========================
   FLEET APIs
========================= */

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

/**
 * GET /v1/fleet/health
 * @returns {Promise<object>}
 */
export async function getFleetHealth() {
  const response = await apiClient.get("/v1/fleet/health");
  return unwrapPayload(response);
}
