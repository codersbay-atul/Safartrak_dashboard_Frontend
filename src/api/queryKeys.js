/**
 * Central query-key registry for scalable React Query usage.
 * Keep ["dashboard-summary"] exact for the summary KPI hook.
 */
export const queryKeys = {
  dashboard: {
    summary: ["dashboard-summary"],
    health: ["dashboard-health"],
  },
  vehicles: {
    all: ["vehicles"],
    list: (filters) => ["vehicles", "list", filters ?? {}],
  },
  tracking: {
    all: ["tracking"],
    live: ["tracking", "live"],
  },
  alerts: {
    all: ["alerts"],
    list: (filters) => ["alerts", "list", filters ?? {}],
  },
};
