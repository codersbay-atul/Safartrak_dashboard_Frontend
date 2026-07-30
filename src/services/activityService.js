import {
  getActivitySummary as getActivitySummaryRequest,
  getActivityList as getActivityListRequest,
  getActivityExport as getActivityExportRequest,
  postActivityNote as postActivityNoteRequest,
} from "../api/activityApi";

/**
 * Activity service layer.
 * Keeps feature/hooks decoupled from transport details in `api/`.
 */
export function getActivitySummary(period = "today") {
  return getActivitySummaryRequest(period);
}

export function getActivityList(params = {}) {
  return getActivityListRequest(params);
}

export function getActivityExport(params = {}) {
  return getActivityExportRequest(params);
}

export function postActivityNote(payload = {}) {
  return postActivityNoteRequest(payload);
}
