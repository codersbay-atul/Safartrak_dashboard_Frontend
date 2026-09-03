/**
 * Central query-key registry for scalable React Query usage.
 * Keep ["dashboard-summary"] exact for the summary KPI hook.
 */
export const queryKeys = {
  dashboard: {
    summary: ["dashboard-summary"],
    health: (range) => ["dashboard-health", range ?? "24h"],
  },
  fleet: {
    health: ["fleet-health"],
  },
  insights: {
    all: ["insights"],
  },
  actions: {
    all: ["actions"],
  },
  analytics: {
    all: ["analytics"],
    summary: (range) => ["analytics", "summary", range ?? "24h"],
    distanceSeries: (range) => ["analytics", "distance-series", range ?? "24h"],
    performance: (range, sort = "distance") => [
      "analytics",
      "performance",
      range ?? "24h",
      sort,
    ],
  },
  vehicles: {
    all: ["vehicles"],
    list: (filters) => ["vehicles", "list", filters ?? {}],
  },
  tracking: {
    all: ["tracking"],
    live: ["tracking", "live"],
    locations: ["tracking", "locations"],
    summary: (period) => ["tracking", "summary", period ?? "today"],
  },
  alerts: {
    all: ["alerts"],
    count: ["alerts", "count"],
    summary: ["alerts", "summary"],
    types: ["alerts", "types"],
    list: (filters) => ["alerts", "list", filters ?? {}],
  },
  activity: {
    summary: ["activity-summary"],
  },
  savedPlaces: {
    summary: ["saved-places-summary"],
    list: (filters = {}) => ["saved-places-list", filters],
    detail: (id) => ["saved-places-detail", id],
  },
  account: {
    profile: ["account-profile"],
    notifications: ["account-notifications"],
    activity: (limit = 20) => ["account-activity", limit],
  },
  notifications: {
    all: ["notifications"],
    list: (params = {}) => ["notifications", params],
  },
  reports: {
    all: ["reports"],
    types: ["reports", "types"],
  },
  tripSchedules: {
    summary: ["trip-schedules-summary"],
    list: () => ["trip-schedules-list"],
    detail: (id) => ["trip-schedules-detail", id],
  },
};
