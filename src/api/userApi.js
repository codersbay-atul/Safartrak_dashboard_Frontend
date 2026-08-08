import apiClient from "./client";

/**
 * GET /v1/users/summary
 * @returns {Promise<object>} summary payload from the server
 */
export async function getUserSummary() {
  const response = await apiClient.get("/v1/users/summary");
  return response?.data?.data ?? response?.data ?? {};
}

/**
 * GET /v1/users
 * @param {{ search?: string, role?: string, status?: string, page?: number, page_size?: number }} [params]
 * @returns {Promise<{ results: array, counts: object, total: number, page: number, page_size: number }>}
 */
export async function getUsers(params = {}) {
  const search = String(params.search ?? "").trim();
  const role = params.role ?? "";
  const status = params.status ?? "";
  const page = params.page ?? 1;
  const page_size = params.page_size ?? 25;

  const response = await apiClient.get("/v1/users", {
    params: {
      ...(search ? { search } : {}),
      ...(role ? { role } : {}),
      ...(status ? { status } : {}),
      page,
      page_size,
    },
  });

  const payload = response?.data?.data ?? response?.data ?? {};

  return {
    results: Array.isArray(payload.results) ? payload.results : [],
    counts: payload.counts && typeof payload.counts === "object" ? payload.counts : {},
    total: payload.total ?? 0,
    page: payload.page ?? page,
    page_size: payload.page_size ?? page_size,
  };
}

/**
 * GET /v1/users/:userId
 * @param {string|number} userId
 * @returns {Promise<object>} user details payload
 */
export async function getUserDetails(userId) {
  if (!userId) {
    throw new Error("A valid user ID is required.");
  }

  const response = await apiClient.get(`/v1/users/${encodeURIComponent(userId)}`);
  return response?.data?.data ?? response?.data ?? {};
}

/**
 * POST /v1/users
 * @param {object} payload
 * @returns {Promise<object>} new user payload
 */
export async function createUser(payload = {}) {
  if (!payload || typeof payload !== "object") {
    throw new Error("A valid user payload is required.");
  }

  const response = await apiClient.post("/v1/users", payload);
  return response?.data?.data ?? response?.data ?? {};
}

/**
 * GET /v1/users?status=pending
 * @param {{ search?: string, role?: string, page?: number, page_size?: number }} [params]
 * @returns {Promise<{ results: array, counts: object, total: number, page: number, page_size: number }>}
 */
export async function getPendingUsers(params = {}) {
  const search = String(params.search ?? "").trim();
  const role = params.role ?? "";
  const page = params.page ?? 1;
  const page_size = params.page_size ?? 25;

  const response = await apiClient.get("/v1/users", {
    params: {
      ...(search ? { search } : {}),
      ...(role ? { role } : {}),
      status: "pending",
      page,
      page_size,
    },
  });

  const payload = response?.data?.data ?? response?.data ?? {};

  return {
    results: Array.isArray(payload.results) ? payload.results : [],
    counts: payload.counts && typeof payload.counts === "object" ? payload.counts : {},
    total: payload.total ?? 0,
    page: payload.page ?? page,
    page_size: payload.page_size ?? page_size,
  };
}

/**
 * POST /v1/users/:userId/deactivate
 * @param {string|number} userId
 * @returns {Promise<object>} deactivate response payload
 */
export async function deactivateUser(userId) {
  if (!userId) {
    throw new Error("A valid user ID is required.");
  }

  const response = await apiClient.post(`/v1/users/${encodeURIComponent(userId)}/deactivate`);
  return response?.data?.data ?? response?.data ?? {};
}

/**
 * POST /v1/users/:userId/activate
 * @param {string|number} userId
 * @returns {Promise<object>} activate response payload
 */
export async function activateUser(userId) {
  if (!userId) {
    throw new Error("A valid user ID is required.");
  }

  const response = await apiClient.post(`/v1/users/${encodeURIComponent(userId)}/activate`);
  return response?.data?.data ?? response?.data ?? {};
}

/**
 * POST /v1/users/:userId/status
 * @param {string|number} userId
 * @param {{ status: string }} payload
 * @returns {Promise<object>} update status response payload
 */
export async function updateUserStatus(userId, payload = {}) {
  if (!userId) {
    throw new Error("A valid user ID is required.");
  }

  const response = await apiClient.post(
    `/v1/users/${encodeURIComponent(userId)}/status`,
    payload
  );
  return response?.data?.data ?? response?.data ?? {};
}
