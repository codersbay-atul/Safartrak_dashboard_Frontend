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
    summary: (period) => ["tracking", "summary", period ?? "today"],
  },
  alerts: {
    all: ["alerts"],
    list: (filters) => ["alerts", "list", filters ?? {}],
  },
  activity: {
    summary: ["activity-summary"],
  },
  aoi: {
    summary: ["aoi-summary"],
    list: (filters = {}) => ["aoi-list", filters],
    detail: (id) => ["aoi-detail", id],
  },
  reports: {
    all: ["reports"],
    types: ["reports", "types"],
  },
};
