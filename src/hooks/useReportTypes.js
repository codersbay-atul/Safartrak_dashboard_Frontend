import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "../api/queryKeys";
import { getReportTypes } from "../services/reportsService";
import { mapReportTypes } from "../features/reports/mapReportTypes";

/**
 * React Query: GET /v1/reports/types
 */
export function useReportTypes() {
  const query = useQuery({
    queryKey: queryKeys.reports.types,
    queryFn: getReportTypes,
    staleTime: 60_000,
    gcTime: 5 * 60_000,
    retry: 2,
    retryDelay: (attempt) => Math.min(1000 * 2 ** attempt, 8_000),
    refetchOnWindowFocus: true,
    refetchOnReconnect: true,
  });

  const reports = query.data ? mapReportTypes(query.data) : [];

  return {
    ...query,
    reports,
  };
}

export default useReportTypes;
