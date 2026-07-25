import { fetchDashboardSummary } from "../api/dashboardApi";

/**
 * Dashboard service layer.
 *
 * Keeps feature/hooks decoupled from transport details in `api/`.
 * Future dashboard endpoints (health, fleet, etc.) belong here.
 */

/**
 * Load dashboard KPI summary from GET /v1/dashboard/summary.
 * @returns {Promise<object>} Unwrapped API payload
 */
export function getDashboardSummary() {
  return fetchDashboardSummary();
}
