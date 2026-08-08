import apiClient from "./client";

/**
 * GET /v1/notifications
 * @param {{ unread?: boolean, limit?: number, before?: string|null }} [params]
 * @returns {Promise<{ items: array, count: number, unread_count: number, next_before: string|null }>} notifications payload
 */
export async function getNotifications(params = {}) {
  const response = await apiClient.get("/v1/notifications", {
    params: {
      ...(params.unread ? { unread: true } : {}),
      ...(typeof params.limit === "number" ? { limit: params.limit } : {}),
      ...(params.before ? { before: params.before } : {}),
    },
  });

  const payload = response?.data?.data ?? response?.data ?? {};
  return {
    items: Array.isArray(payload.items) ? payload.items : [],
    count: payload.count ?? 0,
    unread_count: payload.unread_count ?? 0,
    next_before: payload.next_before ?? null,
  };
}

/**
 * POST /v1/notifications/read
 * @param {{ ids?: array, all?: boolean }} payload
 * @returns {Promise<object>} mark-read response payload
 */
export async function markNotificationsRead(payload = {}) {
  const response = await apiClient.post("/v1/notifications/read", payload);
  return response?.data?.data ?? response?.data ?? {};
}
