import apiClient from "./client";

/**
 * GET /v1/tickets
 * @param {object} params - Query parameters (e.g., { page: 1, page_size: 25 })
 */
export async function getTickets(params = { page: 1, page_size: 25 }) {
  const response = await apiClient.get("/v1/tickets", { params });
  return response?.data ?? {};
}

/**
 * POST /v1/tickets
 * @param {object} payload - Ticket creation payload
 */
export async function createTicket(payload) {
  const response = await apiClient.post("/v1/tickets", payload);
  return response?.data ?? {};
}
