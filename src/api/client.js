import axios from "axios";

let getAccessToken = () => null;

export function setupApiClient({ getToken } = {}) {
  if (typeof getToken === "function") {
    getAccessToken = getToken;
  }
}

export function normalizeApiError(error) {
  if (axios.isCancel(error)) {
    return {
      message: "Request canceled",
      status: null,
      code: "CANCELED",
      details: null,
    };
  }

  if (
    error &&
    typeof error === "object" &&
    "status" in error &&
    "code" in error &&
    !error.isAxiosError
  ) {
    return error;
  }

  if (!error) {
    return {
      message: "An unexpected error occurred",
      status: null,
      code: "UNKNOWN",
      details: null,
    };
  }

  if (error.response) {
    const { status, data } = error.response;
    const message =
      data?.message ||
      data?.error ||
      data?.detail ||
      (Array.isArray(data?.errors) ? data.errors[0] : null) ||
      (typeof data === "string" ? data : null) ||
      error.message ||
      "Request failed";

    return {
      message: typeof message === "string" ? message : "Request failed",
      status: status ?? null,
      code: data?.code || `HTTP_${status}`,
      details: data ?? null,
    };
  }

  if (error.request) {
    return {
      message: "Network unavailable. Please check your connection.",
      status: null,
      code: "NETWORK_ERROR",
      details: null,
    };
  }

  return {
    message: error.message || "An unexpected error occurred",
    status: null,
    code: error.code || "UNKNOWN",
    details: null,
  };
}

const BASE_URL =
  import.meta.env.VITE_API_BASE_URL ||
  "https://web.backend.safartrak.zevon.systems";

const API_KEY = import.meta.env.VITE_API_KEY || "";

const apiClient = axios.create({
  baseURL: BASE_URL,
  timeout: 15000,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    ...(API_KEY && { "X-API-Key": API_KEY }),
  },
});

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

export function performLogout() {
  localStorage.removeItem("access_token");
  localStorage.removeItem("accessToken");
  localStorage.removeItem("token");
  localStorage.removeItem("authUser");
  localStorage.removeItem("refresh_token");
  localStorage.removeItem("refreshToken");

  if (typeof window !== "undefined" && window.location.pathname !== "/login") {
    window.location.href = "/login";
  }
}

apiClient.interceptors.request.use(
  (config) => {
    config.metadata = { startTime: performance.now() };

    // Do not abort duplicate GET requests automatically.
    // Some React Query refetches and UI re-renders legitimately call the same endpoint
    // multiple times, and aborting them here causes false "Request canceled" errors.
    const token =
      localStorage.getItem("access_token") ||
      localStorage.getItem("accessToken") ||
      localStorage.getItem("token") ||
      getAccessToken();

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    } else {
      delete config.headers.Authorization;
    }

    return config;
  },
  (error) => Promise.reject(normalizeApiError(error))
);

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // 401 Unauthorized Handling
    if (error.response && error.response.status === 401 && originalRequest) {
      const refreshToken =
        localStorage.getItem("refresh_token") ||
        localStorage.getItem("refreshToken");

      const isRefreshRequest =
        originalRequest.url?.includes("/v1/client/auth/refresh") ||
        originalRequest.url?.includes("/v1/auth/refresh") ||
        originalRequest.url?.includes("/v1/admin/refresh");

      // Agar refresh request khud 401 de rahi hai toh logout karein
      if (isRefreshRequest) {
        performLogout();
        return Promise.reject(normalizeApiError(error));
      }

      if (refreshToken && !originalRequest._retry) {
        if (isRefreshing) {
          return new Promise((resolve, reject) => {
            failedQueue.push({ resolve, reject });
          })
            .then((newToken) => {
              originalRequest.headers.Authorization = `Bearer ${newToken}`;
              return apiClient(originalRequest);
            })
            .catch((err) => Promise.reject(normalizeApiError(err)));
        }

        originalRequest._retry = true;
        isRefreshing = true;

        try {
          const refreshBody = {
            refresh_token: refreshToken,
            refreshToken: refreshToken,
          };
          const refreshHeaders = {
            Accept: "application/json",
            "Content-Type": "application/json",
          };

          let res;
          const refreshPaths = [
            "/v1/client/auth/refresh",
            "/v1/auth/refresh",
            "/v1/admin/refresh",
          ];
          let lastRefreshError;
          for (const refreshPath of refreshPaths) {
            try {
              res = await axios.post(refreshPath, refreshBody, {
                baseURL: BASE_URL,
                headers: refreshHeaders,
              });
              lastRefreshError = null;
              break;
            } catch (refreshAttemptError) {
              lastRefreshError = refreshAttemptError;
            }
          }
          if (!res) throw lastRefreshError;

          const data = res?.data?.data ?? res?.data ?? {};
          const newAccessToken =
            data.access_token ?? data.accessToken ?? data.token ?? null;

          // Agar refresh endpoint naya refresh_token nahi bhejta, toh existing token retain rahega
          const activeRefreshToken =
            data.refresh_token ?? data.refreshToken ?? refreshToken;

          if (newAccessToken) {
            localStorage.setItem("access_token", newAccessToken);
            localStorage.setItem("accessToken", newAccessToken);
            localStorage.setItem("token", newAccessToken);

            localStorage.setItem("refresh_token", activeRefreshToken);
            localStorage.setItem("refreshToken", activeRefreshToken);

            if (typeof window !== "undefined" && window.dispatchEvent) {
              window.dispatchEvent(
                new CustomEvent("auth:tokens-updated", {
                  detail: {
                    accessToken: newAccessToken,
                    refreshToken: activeRefreshToken,
                  },
                })
              );
            }

            processQueue(null, newAccessToken);
            isRefreshing = false;

            originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
            return apiClient(originalRequest);
          }

          throw new Error("Missing access token in refresh response");
        } catch (refreshErr) {
          processQueue(refreshErr, null);
          isRefreshing = false;
          console.error("[Auth] Token refresh failed:", refreshErr);
          performLogout();
          return Promise.reject(normalizeApiError(refreshErr));
        }
      }

      console.warn("[Auth] No refresh token found, executing logout.");
      performLogout();
    }

    return Promise.reject(normalizeApiError(error));
  }
);

export default apiClient;