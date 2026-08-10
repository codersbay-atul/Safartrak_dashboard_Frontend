import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { loginRequest } from "../../api/authApi";

const ACCESS_TOKEN_KEY = "accessToken";
const AUTH_USER_KEY = "authUser";
const REFRESH_TOKEN_KEY = "refreshToken";

function readStoredAuth() {
  try {
    const accessToken =
      localStorage.getItem("access_token") ||
      localStorage.getItem(ACCESS_TOKEN_KEY);
    const refreshToken =
      localStorage.getItem("refresh_token") || localStorage.getItem(REFRESH_TOKEN_KEY);
    const rawUser = localStorage.getItem(AUTH_USER_KEY);
    const user = rawUser ? JSON.parse(rawUser) : null;
    return {
      accessToken: accessToken || null,
      refreshToken: refreshToken || null,
      user,
    };
  } catch {
    return { accessToken: null, user: null };
  }
}

function persistAuth({ accessToken, user }) {
  try {
    if (accessToken) {
      localStorage.setItem("access_token", accessToken);
      localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
      localStorage.setItem("token", accessToken);
    } else {
      localStorage.removeItem("access_token");
      localStorage.removeItem(ACCESS_TOKEN_KEY);
      localStorage.removeItem("token");
    }

    if (user) {
      localStorage.setItem(AUTH_USER_KEY, JSON.stringify(user));
    } else {
      localStorage.removeItem(AUTH_USER_KEY);
    }
  } catch {}
}

function persistRefreshToken(refreshToken) {
  try {
    if (refreshToken) {
      localStorage.setItem("refresh_token", refreshToken);
      localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
    } else {
      localStorage.removeItem("refresh_token");
      localStorage.removeItem(REFRESH_TOKEN_KEY);
    }
  } catch {}
}

const stored = readStoredAuth();

const initialState = {
  user: stored.user,
  accessToken: stored.accessToken,
  refreshToken: stored.refreshToken,
  isAuthenticated: Boolean(stored.accessToken),
  status: stored.accessToken ? "authenticated" : "idle",
  error: null,
};

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (credentials, { rejectWithValue }) => {
    try {
      const data = await loginRequest(credentials);
      return data;
    } catch (err) {
      const errorMessage =
        err?.message || err?.data?.message || "Invalid username or password";
      return rejectWithValue(errorMessage);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearAuth(state) {
      state.user = null;
      state.accessToken = null;
      state.refreshToken = null;
      state.isAuthenticated = false;
      state.status = "idle";
      state.error = null;
      persistAuth({ accessToken: null, user: null });
      persistRefreshToken(null);
    },
    setAuthTokens(state, action) {
      const { accessToken, refreshToken, user } = action.payload || {};
      state.accessToken = accessToken ?? state.accessToken;
      state.refreshToken = refreshToken ?? state.refreshToken;
      if (user) state.user = user;
      state.isAuthenticated = Boolean(state.accessToken);
      persistAuth({ accessToken: state.accessToken, user: state.user });
      persistRefreshToken(state.refreshToken);
    },
    clearAuthError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        const { accessToken, refreshToken, user } = action.payload;
        state.user = user;
        state.accessToken = accessToken;
        state.refreshToken = refreshToken ?? null;
        state.isAuthenticated = true;
        state.status = "authenticated";
        state.error = null;

        persistAuth({ accessToken, user });
        persistRefreshToken(refreshToken ?? null);
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = "error";
        state.error = action.payload ?? "Authentication failed";
        state.isAuthenticated = false;
        state.accessToken = null;
        state.refreshToken = null;
        persistAuth({ accessToken: null, user: null });
        persistRefreshToken(null);
      });
  },
});

export const { clearAuth, clearAuthError, setAuthTokens } = authSlice.actions;

export const selectAuthUser = (state) => state.auth.user;
export const selectRefreshToken = (state) => state.auth.refreshToken;
export const selectAccessToken = (state) => state.auth.accessToken;
export const selectIsAuthenticated = (state) => state.auth.isAuthenticated;
export const selectAuthStatus = (state) => state.auth.status;
export const selectAuthError = (state) => state.auth.error;

export { ACCESS_TOKEN_KEY, AUTH_USER_KEY, REFRESH_TOKEN_KEY };
export default authSlice.reducer;