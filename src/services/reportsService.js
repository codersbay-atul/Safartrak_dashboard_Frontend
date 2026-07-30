import {
  getReportTypes as getReportTypesRequest,
  generateReport as generateReportRequest,
  exportReport as exportReportRequest,
} from "../api/reportsApi";

/**
 * Reports service layer.
 * Keeps feature/hooks decoupled from transport details in `api/`.
 */

export function getReportTypes() {
  return getReportTypesRequest();
}

export function generateReport(body) {
  return generateReportRequest(body);
}

export function exportReport(body) {
  return exportReportRequest(body);
}
