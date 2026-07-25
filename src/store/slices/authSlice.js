import { createSlice } from "@reduxjs/toolkit";

/**
 * Temporary mock authentication state (development only).
 *
 * // TODO: Replace mock login with POST /v1/auth/login
 * // TODO: Replace mock signup with real registration API
 */

const ACCESS_TOKEN_KEY = "accessToken";
const AUTH_USER_KEY = "authUser";

const MOCK_ACCESS_TOKEN = "mock-dashboard-token";

function readStoredAuth() {
  try {
    const accessToken = localStorage.getItem(ACCESS_TOKEN_KEY);
    const rawUser = localStorage.getItem(AUTH_USER_KEY);
    const user = rawUser ? JSON.parse(rawUser) : null;
    return {
      accessToken: accessToken || null,
      user,
    };
  } catch {
    return { accessToken: null, user: null };
  }
}

function persistAuth({ accessToken, user }) {
  try {
    if (accessToken) {
      localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
    } else {
      localStorage.removeItem(ACCESS_TOKEN_KEY);
    }

    if (user) {
      localStorage.setItem(AUTH_USER_KEY, JSON.stringify(user));
    } else {
      localStorage.removeItem(AUTH_USER_KEY);
    }
  } catch {
    // Ignore storage failures (private mode / quota).
  }
}

const stored = readStoredAuth();

const initialState = {
  user: stored.user,
  accessToken: stored.accessToken,
  isAuthenticated: Boolean(stored.accessToken),
  status: "idle",
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    /**
     * Mock login success — stores dummy user + token.
     * // TODO: Replace mock login with POST /v1/auth/login
     */
    setMockSession(state, action) {
      const user = action.payload?.user ?? null;
      const accessToken = action.payload?.accessToken ?? MOCK_ACCESS_TOKEN;

      state.user = user;
      state.accessToken = accessToken;
      state.isAuthenticated = true;
      state.status = "authenticated";
      state.error = null;

      persistAuth({ accessToken, user });
    },
    setAuthError(state, action) {
      state.status = "error";
      state.error = action.payload ?? "Invalid username or password";
    },
    clearAuth(state) {
      state.user = null;
      state.accessToken = null;
      state.isAuthenticated = false;
      state.status = "idle";
      state.error = null;
      persistAuth({ accessToken: null, user: null });
    },
  },
});

export const { setMockSession, setAuthError, clearAuth } = authSlice.actions;

export const selectAuthUser = (state) => state.auth.user;
export const selectAccessToken = (state) => state.auth.accessToken;
export const selectIsAuthenticated = (state) => state.auth.isAuthenticated;
export const selectAuthError = (state) => state.auth.error;

export { MOCK_ACCESS_TOKEN, ACCESS_TOKEN_KEY, AUTH_USER_KEY };
export default authSlice.reducer;
