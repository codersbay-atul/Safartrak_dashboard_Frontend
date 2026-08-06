import apiClient from "./client";

/* =========================
   AUTH APIs
========================= */

/**
 * Login via POST /v1/auth/login.
 *
 * @param {{ username: string, password: string }} credentials
 * @returns {Promise<{ accessToken: string, refreshToken: string|null, user: object|null, token: string|null }>}
 */
export async function loginRequest(credentials) {
  if (import.meta.env.DEV) {
    console.log("BASE URL", import.meta.env.VITE_API_BASE_URL);
  }

  const response = await apiClient.post("/v1/auth/login", {
    username: String(credentials?.username ?? "").trim(),
    password: credentials?.password ?? "",
  });

  const payload = response?.data?.data ?? response?.data ?? {};

  const accessToken =
    payload.access_token ?? payload.accessToken ?? payload.token ?? null;
  const refreshToken = payload.refresh_token ?? payload.refreshToken ?? null;
  const user = payload.user ?? null;
  const token = payload.token ?? null;

  if (!accessToken) {
    throw {
      message: "Login succeeded but no access token was returned.",
      status: response?.status ?? 200,
      code: "MISSING_ACCESS_TOKEN",
      details: payload,
    };
  }

  return {
    accessToken,
    refreshToken,
    user,
    token,
  };
}

/**
 * Trigger forgot-password flow via POST /v1/auth/forgot-password.
 *
 * @param {{ email: string }} payload
 * @returns {Promise<object>}
 */
export async function forgotPasswordRequest(payload) {
  const response = await apiClient.post("/v1/auth/forgot-password", {
    username: String(payload?.username ?? payload?.email ?? "").trim(),
  });

  return response?.data?.data ?? response?.data ?? {};
}

/**
 * Verify OTP via POST /v1/auth/verify-otp.
 *
 * @param {{ username: string, otp: string }} payload
 * @returns {Promise<object>}
 */
export async function verifyOtpRequest(payload) {
  const response = await apiClient.post("/v1/auth/verify-otp", {
    username: String(payload?.username ?? payload?.email ?? "").trim(),
    otp: String(payload?.otp ?? "").trim(),
  });

  return response?.data?.data ?? response?.data ?? {};
}
