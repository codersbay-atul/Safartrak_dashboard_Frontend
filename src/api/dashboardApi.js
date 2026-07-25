import apiClient from "./client";

/**
 * Dashboard API transport.
 *
 * GET /v1/dashboard/summary
 *
 * Inspected live response (unauthenticated, 2026-07-25):
 *   HTTP 401
 *   { "detail": "Authentication credentials were not provided." }
 *
 * Success (HTTP 200) body was not available without credentials.
 * Do not invent field names in mappers — confirm from a 200 payload.
 */

/**
 * @returns {Promise<object>} Raw/unwrapped API payload
 */
export async function fetchDashboardSummary() {
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
