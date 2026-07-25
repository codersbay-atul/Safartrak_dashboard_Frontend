/**
 * Feature flags.
 * Dashboard summary API is enabled; authentication is deferred.
 */
export const featureFlags = {
  /** Auth screens / protected routes are deferred. */
  useMockAuth: false,
  /** GET /v1/dashboard/summary is active. */
  enableDashboardApi: true,
};
