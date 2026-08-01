import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "../api/queryKeys";
import { getAoiSummary } from "../services/aoiService";

export function useAoiSummary() {
  const query = useQuery({
    queryKey: queryKeys.aoi.summary,
    queryFn: getAoiSummary,
    staleTime: 30_000,
    gcTime: 5 * 60_000,
    retry: 2,
    retryDelay: (attempt) => Math.min(1000 * 2 ** attempt, 8_000),
    refetchOnWindowFocus: true,
    refetchOnReconnect: true,
  });

  return {
    ...query,
    summary: query.data && typeof query.data === "object" ? query.data : null,
  };
}

export default useAoiSummary;
