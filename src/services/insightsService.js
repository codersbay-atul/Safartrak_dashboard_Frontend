import { getInsights as getInsightsRequest } from "../api/insightsApi";

/**
 * Insights service layer.
 */

/**
 * Load dashboard insights from GET /v1/insights.
 * @returns {Promise<{ insights: array }>}
 */
export function getInsights() {
  return getInsightsRequest();
}
