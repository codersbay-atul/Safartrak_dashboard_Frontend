import apiClient from "./client";

/* =========================
   REPORTS APIs
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
 * GET /v1/reports/types
 * @returns {Promise<{ reports: array }>}
 */
export async function getReportTypes() {
  const response = await apiClient.get("/v1/reports/types");
  const payload = unwrapPayload(response);

  return {
    ...payload,
    reports: Array.isArray(payload.reports) ? payload.reports : [],
  };
}

/**
 * POST /v1/reports/generate
 * @param {object} body
 * @returns {Promise<object>}
 */
export async function generateReport(body) {
  const response = await apiClient.post("/v1/reports/generate", body);
  return unwrapPayload(response);
}

/**
 * POST /v1/reports/export
 * Returns a file blob for download.
 * @param {object} body
 */
export async function exportReport(body) {
  const response = await apiClient.post("/v1/reports/export", body, {
    responseType: "blob",
  });
  return response;
}
