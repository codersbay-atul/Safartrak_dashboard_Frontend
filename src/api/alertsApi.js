import apiClient from "./client";

/* =========================
   ALERTS APIs
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
 * GET /v1/alerts/count
 */
export async function getAlertCount() {
  const response = await apiClient.get("/v1/alerts/count");
  return unwrapPayload(response);
}

/**
 * GET /v1/alerts/summary
 */
export async function getAlertSummary() {
  const response = await apiClient.get("/v1/alerts/summary");
  return unwrapPayload(response);
}

/**
 * GET /v1/alerts/types
 */
export async function getAlertTypes() {
  const response = await apiClient.get("/v1/alerts/types");
  const payload = unwrapPayload(response);

  return {
    ...payload,
    types: Array.isArray(payload.types)
      ? payload.types
      : Array.isArray(payload)
        ? payload
        : [],
  };
}

/**
 * GET /v1/alerts
 * Optional filters: type, from, to, severity, search
 * @param {{ type?: string, from?: string, to?: string, severity?: string, search?: string }} [params]
 */
export async function getAlerts(params = {}) {
  const normalizedParams = {
    type: params.type || undefined,
    from: params.from || undefined,
    to: params.to || undefined,
    severity: params.severity || undefined,
    search: params.search || undefined,
  };

  const response = await apiClient.get("/v1/alerts", {
    params: normalizedParams,
  });
  const payload = unwrapPayload(response);

  return {
    ...payload,
    alerts: Array.isArray(payload.alerts)
      ? payload.alerts
      : Array.isArray(payload)
        ? payload
        : [],
    count: payload.count ?? (Array.isArray(payload.alerts) ? payload.alerts.length : 0),
  };
}
