import apiClient from "./client";

/* =========================
   VEHICLE APIs
========================= */

/**
 * GET /v1/vehicles
 *
 * @param {{ search?: string, page?: number, page_size?: number, tab?: string, fleet?: string, type?: string, tracking_status?: string }} [params]
 * @returns {Promise<{ results: array, counts: object, total: number, page: number, page_size: number }>}
 */
export async function getVehicles(params = {}) {
  const search = String(params.search ?? "").trim();
  const page = params.page ?? 1;
  const page_size = params.page_size ?? 25;
  const tab = params.tab ?? "all";
  const fleet = params.fleet ?? params.fleetGroup ?? "";
  const type = params.type ?? params.vehicleType ?? "";
  const tracking_status = params.tracking_status ?? params.trackingStatus ?? "";

  const response = await apiClient.get("/v1/vehicles", {
    params: {
      ...(search ? { search } : {}),
      ...(tab ? { tab } : {}),
      ...(fleet ? { fleet } : {}),
      ...(type ? { type } : {}),
      ...(tracking_status ? { tracking_status } : {}),
      page,
      page_size,
    },

  });
  console.log(response);

  const payload = response?.data?.data ?? response?.data ?? {};

  return {
    results: Array.isArray(payload.results) ? payload.results : [],
    counts:
      payload.counts && typeof payload.counts === "object"
        ? payload.counts
        : {},
    total: payload.total ?? 0,
    page: payload.page ?? page,
    page_size: payload.page_size ?? page_size,
  };
}

/**
 * GET /v1/vehicles/summary
 * @returns {Promise<object>} summary payload from the server
 */
export async function getVehiclesSummary() {
  const response = await apiClient.get("/v1/vehicles/summary");
  // backend may wrap payload under `data` or `results`
  return response?.data?.data ?? response?.data ?? {};
}

/**
 * GET /v1/vehicles/export
 * Returns a Blob response for file download
 * @param {object} [params]
 */
export async function getVehiclesExport(params = {}) {
  const response = await apiClient.get("/v1/vehicles/export", {
    params,
    responseType: "blob",
  });

  return response;
}

/**
 * Build possible stats endpoints for a vehicle identifier payload.
 */
 function resolveVehicleStatsIds(vehicleOrId) {
   if (!vehicleOrId) return [];
   if (typeof vehicleOrId === "string") {
     return [vehicleOrId];
   }

   const ids = new Set();
   ids.add(vehicleOrId.statsId ?? null);
   ids.add(vehicleOrId.id ?? null);
   ids.add(vehicleOrId.raw?.unique_id ?? null);
   ids.add(vehicleOrId.raw?.uniqueId ?? null);
   ids.add(vehicleOrId.raw?.id ?? null);
   ids.add(vehicleOrId.raw?.vehicle_number ?? null);
   ids.add(vehicleOrId.raw?.vehicleNumber ?? null);
   ids.add(vehicleOrId.plate ?? null);

   return [...ids].filter(Boolean);
 }

 /**
  * GET /v1/vehicles/{uniqueId}/stats
  * @param {string|object} uniqueId
  * @returns {Promise<object>} stats payload
  */
 export async function getVehicleStats(uniqueId) {
   if (!uniqueId) throw new Error("uniqueId is required for getVehicleStats");

   const ids = resolveVehicleStatsIds(uniqueId);
   if (ids.length === 0) {
     throw new Error("No valid vehicle identifier could be derived for getVehicleStats");
   }

   let lastError = null;
   for (const id of ids) {
     try {
       const response = await apiClient.get(`/v1/vehicles/${id}/stats`);
       return response?.data ?? {};
     } catch (error) {
       lastError = error;
       if (error?.status === 404 || error?.status === 400) {
         continue;
       }
       throw error;
     }
   }

   throw lastError || new Error("Failed to load vehicle stats");
 }

