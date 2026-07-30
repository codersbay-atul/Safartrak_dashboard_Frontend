import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "../api/queryKeys";
import { getActivitySummary } from "../services/activityService";

export function useActivitySummary(period = "today") {
  const query = useQuery({
    queryKey: [...queryKeys.activity.summary, period],
    queryFn: () => getActivitySummary(period),
    staleTime: 30_000,
    retry: 2,
    refetchOnWindowFocus: true,
    refetchOnReconnect: true,
  });

  return {
    ...query,
    summary: query.data ?? null,
  };
}

export default useActivitySummary;
