import {
  getAlertCount as getAlertCountRequest,
  getAlertSummary as getAlertSummaryRequest,
  getAlertTypes as getAlertTypesRequest,
  getAlerts as getAlertsRequest,
} from "../api/alertsApi";

/**
 * Alerts service layer.
 * Keeps feature/hooks decoupled from transport details in `api/`.
 */

export function getAlertCount() {
  return getAlertCountRequest();
}

export function getAlertSummary() {
  return getAlertSummaryRequest();
}

export function getAlertTypes() {
  return getAlertTypesRequest();
}

export function getAlerts(params = {}) {
  return getAlertsRequest(params);
}
