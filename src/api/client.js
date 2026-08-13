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

const apiClient = axios.create({
  baseURL: BASE_URL,
  timeout: 15000,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

const pendingRequests = new Map();

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

    const isGetRequest = (config.method || "").toLowerCase() === "get";
    const requestKey = `${config.method}:${config.url}:${JSON.stringify(
      config.params || {}
    )}`;

    if (isGetRequest) {
      if (pendingRequests.has(requestKey)) {
        const cancelController = pendingRequests.get(requestKey);
        cancelController.abort();
        pendingRequests.delete(requestKey);
      }

      const controller = new AbortController();
      config.signal = config.signal || controller.signal;
      pendingRequests.set(requestKey, controller);
    }

    const token =
      getAccessToken() ||
      localStorage.getItem("access_token") ||
      localStorage.getItem("token") ||
      localStorage.getItem("accessToken");

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
  (response) => {
    const requestKey = `${response.config.method}:${response.config.url}:${JSON.stringify(
      response.config.params || {}
    )}`;
    pendingRequests.delete(requestKey);
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    if (originalRequest) {
      const requestKey = `${originalRequest.method}:${originalRequest.url}:${JSON.stringify(
        originalRequest.params || {}
      )}`;
      pendingRequests.delete(requestKey);
    }

    if (error.response && error.response.status === 401 && originalRequest) {
      const refreshToken =
        localStorage.getItem("refresh_token") ||
        localStorage.getItem("refreshToken");
      const isRefreshRequest = originalRequest.url?.includes("/v1/auth/refresh");

      if (refreshToken && !isRefreshRequest && !originalRequest._retry) {
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
          const res = await axios.post(
            "/v1/auth/refresh",
            { refresh_token: refreshToken },
            {
              baseURL: BASE_URL,
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
              },
            }
          );

          const data = res?.data?.data ?? res?.data ?? {};
          const newAccessToken =
            data.access_token ?? data.accessToken ?? data.token ?? null;
          const newRefreshToken =
            data.refresh_token ?? data.refreshToken ?? null;

          if (newAccessToken) {
            localStorage.setItem("access_token", newAccessToken);
            localStorage.setItem("accessToken", newAccessToken);
            localStorage.setItem("token", newAccessToken);

            if (newRefreshToken) {
              localStorage.setItem("refresh_token", newRefreshToken);
              localStorage.setItem("refreshToken", newRefreshToken);
            }

            if (typeof window !== "undefined" && window.dispatchEvent) {
              window.dispatchEvent(
                new CustomEvent("auth:tokens-updated", {
                  detail: {
                    accessToken: newAccessToken,
                    refreshToken: newRefreshToken,
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
          performLogout();
          return Promise.reject(normalizeApiError(refreshErr));
        }
      }

      performLogout();
    }

    return Promise.reject(normalizeApiError(error));
  }
);

export default apiClient;