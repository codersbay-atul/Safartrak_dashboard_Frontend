import {
  getDashboardSummary as getDashboardSummaryRequest,
  getDashboardHealth as getDashboardHealthRequest,
  getDashboardExport as getDashboardExportRequest,
} from "../api/dashboardApi";

/**
 * Dashboard service layer.
 *
 * Keeps feature/hooks decoupled from transport details in `api/`.
 * Future dashboard endpoints (fleet, etc.) belong here.
 */

/**
 * Load dashboard KPI summary from GET /v1/dashboard/summary.
 * @returns {Promise<object>} Unwrapped API payload
 */
export function getDashboardSummary() {
  return getDashboardSummaryRequest();
}

/**
 * Load fleet health chart data from GET /v1/dashboard/health?range={range}.
 * @param {{ range?: "24h"|"7d"|"30d" }} [params]
 * @returns {Promise<object>}
 */
export function getDashboardHealth(params) {
  return getDashboardHealthRequest(params);
}

/**
 * Download dashboard export (CSV/Excel) via GET /v1/dashboard/export
 * @param {object} params
 */
export function getDashboardExport(params = {}) {
  return getDashboardExportRequest(params);
}
