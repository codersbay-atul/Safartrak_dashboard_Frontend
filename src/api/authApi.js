import apiClient from "./client";

export async function loginRequest(credentials) {
  const usernameValue =
    credentials?.username || credentials?.email || "";

  const response = await apiClient.post("/v1/client/auth/login", {
    email: String(usernameValue).trim(),
    username: String(usernameValue).trim(),
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

  if (user) {
    const userStatus = String(user.status ?? "").toLowerCase();
    if (
      userStatus === "inactive" ||
      userStatus === "deactivated" ||
      userStatus === "disabled"
    ) {
      throw {
        message:
          "Your account has been deactivated. Please contact administrator for assistance.",
        status: 403,
        code: "USER_DEACTIVATED",
        details: { user },
      };
    }
  }

  return {
    accessToken,
    refreshToken,
    user,
  };
}

export async function adminLoginRequest(credentials) {
  const emailValue =
    credentials?.email || credentials?.username || "";

  const response = await apiClient.post("/v1/admin/login", {
    email: String(emailValue).trim(),
    password: credentials?.password ?? "",
  });

  const payload = response?.data?.data ?? response?.data ?? {};

  const accessToken =
    payload.access_token ?? payload.accessToken ?? payload.token ?? null;
  const refreshToken = payload.refresh_token ?? payload.refreshToken ?? null;
  const admin = payload.admin ?? null;

  if (!accessToken) {
    throw {
      message: "Admin login succeeded but no access token was returned.",
      status: response?.status ?? 200,
      code: "MISSING_ACCESS_TOKEN",
      details: payload,
    };
  }

  return {
    accessToken,
    refreshToken,
    admin,
  };
}

export async function adminLogoutRequest() {
  try {
    const response = await apiClient.post("/v1/admin/logout");
    return response?.data?.data ?? response?.data ?? {};
  } catch (error) {
    console.warn("Admin logout API call failed:", error);
    return {};
  }
}

export async function forgotPasswordRequest(payload) {
  const usernameValue = payload?.username ?? payload?.email ?? "";
  const response = await apiClient.post("/v1/auth/forgot-password", {
    username: String(usernameValue).trim(),
  });

  return response?.data?.data ?? response?.data ?? {};
}

export async function verifyOtpRequest(payload) {
  const usernameValue = payload?.username ?? payload?.email ?? "";
  const response = await apiClient.post("/v1/auth/verify-otp", {
    username: String(usernameValue).trim(),
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
  const refreshTokenValue =
    payload?.refresh_token ?? payload?.refreshToken ?? "";

  const response = await apiClient.post("/v1/client/auth/refresh", {
    refresh_token: String(refreshTokenValue).trim(),
    refreshToken: String(refreshTokenValue).trim(),
  });

  return response?.data?.data ?? response?.data ?? {};
}