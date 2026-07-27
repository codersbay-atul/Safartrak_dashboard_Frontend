import apiClient from "./client";

/* =========================
   DASHBOARD APIs
========================= */

/**
 * GET /v1/dashboard/summary
 * @returns {Promise<object>} Raw/unwrapped API payload
 */
export async function getDashboardSummary() {
  const response = await apiClient.get("/v1/dashboard/summary");
  const payload = response?.data;

  // Support both `{ ...fields }` and `{ data: { ...fields } }` envelopes
  // only when those keys are actually present on the response.
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

/** @deprecated Prefer getDashboardSummary — kept for existing imports. */
export const fetchDashboardSummary = getDashboardSummary;
