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
