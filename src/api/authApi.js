import apiClient from "./client";

export async function loginRequest(credentials) {
  const response = await apiClient.post("/v1/auth/login", {
    username: String(credentials?.username ?? "").trim(),
    password: credentials?.password ?? "",
  });

  const payload = response?.data?.data ?? response?.data ?? {};

  const accessToken =
    payload.access_token ?? payload.accessToken ?? payload.token ?? null;
  const refreshToken = payload.refresh_token ?? payload.refreshToken ?? null;
  const user = payload.user ?? null;

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
  };
}

export async function forgotPasswordRequest(payload) {
  const response = await apiClient.post("/v1/auth/forgot-password", {
    username: String(payload?.username ?? payload?.email ?? "").trim(),
  });

  return response?.data?.data ?? response?.data ?? {};
}

export async function verifyOtpRequest(payload) {
  const response = await apiClient.post("/v1/auth/verify-otp", {
    username: String(payload?.username ?? payload?.email ?? "").trim(),
    otp: String(payload?.otp ?? "").trim(),
  });

  return response?.data?.data ?? response?.data ?? {};
}

export async function resetPasswordRequest(payload) {
  const response = await apiClient.post("/v1/auth/reset-password", {
    token: String(payload?.token ?? "").trim(),
    new_password: String(payload?.new_password ?? "").trim(),
  });

  return response?.data?.data ?? response?.data ?? {};
}

export async function refreshTokenRequest(payload) {
  const response = await apiClient.post("/v1/auth/refresh", {
    refresh_token: String(payload?.refresh_token ?? payload?.refreshToken ?? "").trim(),
  });

  return response?.data?.data ?? response?.data ?? {};
}