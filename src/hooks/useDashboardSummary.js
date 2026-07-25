import { useEffect, useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { queryKeys } from "../api/queryKeys";
import { toast } from "../components/Ui/toast";
import { mapDashboardSummary } from "../features/dashboard/mapDashboardSummary";
import { getDashboardSummary } from "../services/dashboardService";
import {
  setDashboardError,
  setDashboardLoading,
  setDashboardSummary,
} from "../store/slices/dashboardSlice";

const ERROR_TOAST = "Unable to load dashboard data.";

/**
 * React Query: fetch / cache / retry dashboard summary.
 * Redux: sync metadata (loading, error, lastUpdated, mapped summary).
 *
 * Auth is intentionally NOT required for this hook (auth comes later).
 */
export function useDashboardSummary() {
  const dispatch = useDispatch();
  const lastToastAtRef = useRef(null);

  const query = useQuery({
    queryKey: queryKeys.dashboard.summary,
    queryFn: getDashboardSummary,
    staleTime: 30_000,
    gcTime: 5 * 60_000,
    retry: 2,
    retryDelay: (attempt) => Math.min(1000 * 2 ** attempt, 8_000),
    refetchOnWindowFocus: true,
    refetchOnReconnect: true,
  });

  useEffect(() => {
    dispatch(setDashboardLoading(query.isLoading || query.isFetching));
  }, [dispatch, query.isLoading, query.isFetching]);

  useEffect(() => {
    if (!query.isSuccess) return;

    const mapped = mapDashboardSummary(query.data);
    dispatch(setDashboardSummary(mapped));
  }, [dispatch, query.isSuccess, query.dataUpdatedAt, query.data]);

  useEffect(() => {
    if (!query.isError) return;

    dispatch(
      setDashboardError(
        query.error || {
          message: ERROR_TOAST,
          status: null,
          code: "UNKNOWN",
        }
      )
    );

    if (lastToastAtRef.current === query.errorUpdatedAt) return;
    lastToastAtRef.current = query.errorUpdatedAt;
    toast.error(ERROR_TOAST);
  }, [dispatch, query.isError, query.error, query.errorUpdatedAt]);

  const hasPayload =
    query.data != null &&
    typeof query.data === "object" &&
    Object.keys(query.data).length > 0 &&
    !(
      Object.prototype.hasOwnProperty.call(query.data, "detail") &&
      Object.keys(query.data).length === 1
    );

  const mappedSummary = hasPayload ? mapDashboardSummary(query.data) : null;

  return {
    ...query,
    summary: mappedSummary,
  };
}

export default useDashboardSummary;
