import apiClient from "./client";

/**
 * GET /v1/account
 * @returns {Promise<object>} account profile payload
 */
export async function getAccountProfile() {
  const response = await apiClient.get("/v1/account");
  return response?.data?.data ?? response?.data ?? {};
}

/**
 * GET /v1/account/notifications
 */
export async function getAccountNotifications() {
  const response = await apiClient.get("/v1/account/notifications");
  return response?.data?.data ?? response?.data ?? {};
}

/**
 * PUT /v1/account/notifications
 * @param {object} payload
 */
export async function updateAccountNotifications(payload) {
  const response = await apiClient.put("/v1/account/notifications", payload);
  return response?.data?.data ?? response?.data ?? {};
}

/**
 * GET /v1/account/activity
 * @param {object} params (e.g., { limit: 20 })
 */
export async function getAccountActivity(params = {}) {
  const response = await apiClient.get("/v1/account/activity", { params });
  return response?.data?.data ?? response?.data ?? { activity: [], count: 0 };
}
