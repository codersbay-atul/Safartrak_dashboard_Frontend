import { configureStore } from "@reduxjs/toolkit";
import authReducer, { setAuthTokens } from "./slices/authSlice";
import dashboardReducer from "./slices/dashboardSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    dashboard: dashboardReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
  devTools: import.meta.env.DEV,
});

// Listen for token updates emitted by `apiClient` refresh flow and update Redux
if (typeof window !== "undefined" && window.addEventListener) {
  window.addEventListener("auth:tokens-updated", (e) => {
    const detail = e?.detail || {};
    const { accessToken, refreshToken, user } = detail;
    if (accessToken) {
      store.dispatch(setAuthTokens({ accessToken, refreshToken, user }));
    }
  });
}

export default store;
