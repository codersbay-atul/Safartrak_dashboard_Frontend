import apiClient from "./client";

/* =========================
   TRACK APIs
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
 * GET /v1/track/summary?period={period}
 * @param {{ period?: string }} [params]
 * @returns {Promise<object>}
 */
export async function getTrackSummary(params = {}) {
  const period = params.period ?? "today";
  const response = await apiClient.get("/v1/track/summary", {
    params: { period },
  });
  return unwrapPayload(response);
}
