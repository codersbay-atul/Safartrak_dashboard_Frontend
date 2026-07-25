import { createSlice } from "@reduxjs/toolkit";

/**
 * Redux owns dashboard metadata / filters / UI state.
 * React Query owns server cache for GET /v1/dashboard/summary.
 */
const initialState = {
  /** Mapped KPI summary for global consumers (synced from React Query). */
  summary: null,
  loading: false,
  error: null,
  lastUpdated: null,
  /** Selected filters (reserved for future dashboard filter UI). */
  filters: {
    dateRange: null,
    groupId: null,
  },
  /** UI state (reserved for future dashboard UI controls). */
  ui: {
    activePanel: null,
  },
};

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {
    setDashboardLoading(state, action) {
      state.loading = Boolean(action.payload);
      if (action.payload) {
        state.error = null;
      }
    },
    setDashboardSummary(state, action) {
      state.summary = action.payload ?? null;
      state.loading = false;
      state.error = null;
      state.lastUpdated = Date.now();
    },
    setDashboardError(state, action) {
      state.loading = false;
      state.error = action.payload ?? {
        message: "Unable to load dashboard data.",
        status: null,
        code: "UNKNOWN",
      };
    },
    clearDashboardError(state) {
      state.error = null;
    },
    setDashboardFilters(state, action) {
      state.filters = {
        ...state.filters,
        ...(action.payload ?? {}),
      };
    },
    setDashboardUiState(state, action) {
      state.ui = {
        ...state.ui,
        ...(action.payload ?? {}),
      };
    },
    resetDashboardState() {
      return initialState;
    },
  },
});

export const {
  setDashboardLoading,
  setDashboardSummary,
  setDashboardError,
  clearDashboardError,
  setDashboardFilters,
  setDashboardUiState,
  resetDashboardState,
} = dashboardSlice.actions;

export const selectDashboardSummary = (state) => state.dashboard.summary;
export const selectDashboardLoading = (state) => state.dashboard.loading;
export const selectDashboardError = (state) => state.dashboard.error;
export const selectDashboardLastUpdated = (state) =>
  state.dashboard.lastUpdated;
export const selectDashboardFilters = (state) => state.dashboard.filters;
export const selectDashboardUi = (state) => state.dashboard.ui;

export default dashboardSlice.reducer;
