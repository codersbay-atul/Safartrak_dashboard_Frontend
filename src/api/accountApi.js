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

/**
 * PUT /v1/account/email
 * @param {{ email: string, password?: string }} payload
 */
export async function updateAccountEmail(payload) {
  const newEmail = String(payload?.email ?? payload?.new_email ?? "").trim();
  const currentPassword = payload?.password ?? payload?.current_password;
  const confirmEmail = String(payload?.confirm_email ?? payload?.confirmEmail ?? "").trim();

  const response = await apiClient.put("/v1/account/email", {
    new_email: newEmail,
    confirm_email: confirmEmail,
    current_password: currentPassword,
  });
  return response?.data?.data ?? response?.data ?? {};
}

/**
 * POST /v1/account/password/request-otp
 * @param {{ email: string }} payload
 */
export async function requestPasswordOtp(payload = {}) {
  const email = String(payload?.email ?? "").trim();
  if (!email) throw new Error("Email is required to request OTP.");

  const response = await apiClient.post("/v1/account/password/request-otp", { email });
  return response?.data?.data ?? response?.data ?? {};
}

/**
 * POST /v1/account/password/verify-otp
 * @param {{ otp: string, email?: string }} payload
 */
export async function verifyPasswordOtp(payload = {}) {
  const otp = String(payload?.otp ?? "").trim();
  if (!otp) throw new Error("OTP is required.");

  const response = await apiClient.post("/v1/account/password/verify-otp", { otp, ...(payload.email ? { email: payload.email } : {}) });
  return response?.data?.data ?? response?.data ?? {};
}

/**
 * POST /v1/account/change-password
 * @param {{ new_password: string, confirm_password: string }} payload
 */
export async function changeAccountPassword(payload = {}) {
  const newPassword = String(payload?.new_password ?? "");
  const confirmPassword = String(payload?.confirm_password ?? "");
  if (!newPassword) throw new Error("New password is required.");
  if (newPassword !== confirmPassword) throw new Error("Passwords do not match.");

  const response = await apiClient.post("/v1/account/change-password", {
    new_password: newPassword,
    confirm_password: confirmPassword,
  });
  return response?.data?.data ?? response?.data ?? {};
}
