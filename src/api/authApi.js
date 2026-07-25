import apiClient from "./client";
import { featureFlags } from "../config/featureFlags";

/** Temporary UI-dev credentials. Replace when real auth is enabled. */
const MOCK_USER = {
  username: "admin",
  password: "admin123",
};

const MOCK_TOKENS = {
  accessToken: "demo-access-token",
  refreshToken: "demo-refresh-token",
};

/**
 * Temporary mock login — no network calls.
 * Compatible return shape with future real API auth.
 */
async function mockLoginRequest(credentials) {
  // Simulate a short network delay for loading UI.
  await new Promise((resolve) => setTimeout(resolve, 400));

  const username = String(credentials?.username ?? "").trim();
  const password = String(credentials?.password ?? "");

  if (
    username !== MOCK_USER.username ||
    password !== MOCK_USER.password
  ) {
    throw {
      message: "Invalid username or password.",
      status: 401,
      code: "MOCK_INVALID_CREDENTIALS",
      details: null,
    };
  }

  return { ...MOCK_TOKENS };
}

/**
 * Login entry point.
 *
 * TODO: When featureFlags.useMockAuth is false, this calls POST /v1/auth/login.
 * Do not call /v1/auth/refresh or /v1/auth/me from here.
 *
 * @param {{ username: string, password: string }} credentials
 * @returns {Promise<{ accessToken: string, refreshToken: string }>}
 */
export async function loginRequest(credentials) {
  // --- UI development: mock auth (no real API) ---
  if (featureFlags.useMockAuth) {
    return mockLoginRequest(credentials);
  }

  // --- TODO: Real API authentication ---
  // POST /v1/auth/login
  const response = await apiClient.post("/v1/auth/login", {
    username: credentials.username,
    password: credentials.password,
  });

  const payload = response?.data?.data ?? response?.data ?? {};

  const accessToken = payload.access_token ?? payload.accessToken ?? null;
  const refreshToken = payload.refresh_token ?? payload.refreshToken ?? null;

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
  };
}
