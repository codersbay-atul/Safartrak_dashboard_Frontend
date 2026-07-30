import apiClient from "./client";

/* =========================
   INSIGHTS APIs
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
 * GET /v1/insights
 * @returns {Promise<{ insights: array }>}
 */
export async function getInsights() {
  const response = await apiClient.get("/v1/insights");
  const payload = unwrapPayload(response);

  return {
    ...payload,
    insights: Array.isArray(payload.insights)
      ? payload.insights
      : Array.isArray(payload)
        ? payload
        : [],
  };
}
