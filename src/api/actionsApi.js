import apiClient from "./client";

/* =========================
   ACTIONS APIs
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
 * GET /v1/actions
 * @returns {Promise<{ actions: array }>}
 */
export async function getActions() {
  const response = await apiClient.get("/v1/actions");
  const payload = unwrapPayload(response);

  return {
    ...payload,
    actions: Array.isArray(payload.actions)
      ? payload.actions
      : Array.isArray(payload)
        ? payload
        : [],
  };
}
