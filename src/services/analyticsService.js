import {
  getAnalyticsSummary as getAnalyticsSummaryRequest,
  getAnalyticsDistanceSeries as getAnalyticsDistanceSeriesRequest,
  getAnalyticsPerformance as getAnalyticsPerformanceRequest,
  getAnalyticsExport as getAnalyticsExportRequest,
} from "../api/analyticsApi";

/**
 * Analytics service layer.
 * Keeps feature/hooks decoupled from transport details in `api/`.
 */

export function getAnalyticsSummary(params) {
  return getAnalyticsSummaryRequest(params);
}

export function getAnalyticsDistanceSeries(params) {
  return getAnalyticsDistanceSeriesRequest(params);
}

export function getAnalyticsPerformance(params) {
  return getAnalyticsPerformanceRequest(params);
}

export function getAnalyticsExport(params) {
  return getAnalyticsExportRequest(params);
}
