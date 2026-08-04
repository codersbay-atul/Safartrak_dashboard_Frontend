import apiClient, { normalizeApiError } from "./client";

/**
 * Mobilize API helpers
 * Exposes functions used by the Mobilize feature to fetch summary, list
 * vehicles, and send commands to vehicles.
 */

export async function getCommandsSummary() {
  try {
    const res = await apiClient.get("/v1/commands/summary");
    return res.data;
  } catch (err) {
    throw normalizeApiError(err);
  }
}

export async function getCommandVehicles(params = {}) {
  try {
    const res = await apiClient.get("/v1/commands/vehicles", { params });
    const data = res.data;
    if (Array.isArray(data)) {
      return data;
    }
    if (Array.isArray(data?.vehicles)) {
      return data.vehicles;
    }
    if (Array.isArray(data?.data)) {
      return data.data;
    }
    if (Array.isArray(data?.items)) {
      return data.items;
    }
    if (Array.isArray(data?.results)) {
      return data.results;
    }
    return data;
  } catch (err) {
    throw normalizeApiError(err);
  }
}

export async function getCommandVehicle(uniqueId) {
  try {
    const res = await apiClient.get(`/v1/commands/vehicles/${uniqueId}`);
    return res.data;
  } catch (err) {
    throw normalizeApiError(err);
  }
}

export async function getCommands(params = {}) {
  try {
    const res = await apiClient.get("/v1/commands", { params });
    const data = res.data;
    if (Array.isArray(data)) {
      return data;
    }
    if (Array.isArray(data?.commands)) {
      return data.commands;
    }
    if (Array.isArray(data?.data)) {
      return data.data;
    }
    if (Array.isArray(data?.results)) {
      return data.results;
    }
    return [];
  } catch (err) {
    throw normalizeApiError(err);
  }
}

/**
 * Send a generic command to a vehicle.
 * The exact backend contract may vary; this helper posts a small payload
 * to a common commands endpoint. Adjust path/body as your API requires.
 *
 * @param {string} uniqueId - vehicle unique identifier
 * @param {string} command - command name (e.g. 'immobilize', 'mobilize')
 * @param {object} opts - optional payload fields forwarded to backend
 */
export async function sendVehicleCommand(uniqueId, action, opts = {}) {
  try {
    const body = {
      unique_id: uniqueId,
      action,
      ...opts,
    };

    const res = await apiClient.post("/v1/commands", body);
    return res.data;
  } catch (err) {
    console.log(err);
    throw normalizeApiError({ "message":  err?.details?.error?.reasons?.[0] || err?.message || "Failed to send command" });
  }
}

export default {
  getCommandsSummary,
  getCommandVehicles,
  sendVehicleCommand,
};
