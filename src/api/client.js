import axios from "axios";

/**
 * Shared Axios client.
 * Auth token wiring is optional and will be re-enabled when auth is added later.
 */
let getAccessToken = () => null;

export function setupApiClient({ getToken } = {}) {
  if (typeof getToken === "function") {
    getAccessToken = getToken;
  }
}

/**
 * Normalize Axios / network errors into a stable shape for UI + Redux.
 */
export function normalizeApiError(error) {
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

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "",
  timeout: 15000,
  
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});
console.log("BASE URL =>", import.meta.env.VITE_API_BASE_URL);

apiClient.interceptors.request.use(
  (config) => {
    // Optional: attach Bearer token when auth is introduced later.
    const token = getAccessToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    } else {
      delete config.headers.Authorization;
    }

    if (
      import.meta.env.DEV &&
      String(config.url || "").includes("/auth/login")
    ) {
      console.log("REQUEST CONFIG", {
        method: config.method,
        baseURL: config.baseURL,
        url: config.url,
        headers: config.headers,
        data: config.data,
      });
    }

    return config;
  },
  (error) => Promise.reject(normalizeApiError(error))
);

apiClient.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(normalizeApiError(error))
);

export default apiClient;
