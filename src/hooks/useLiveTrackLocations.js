import { useEffect, useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "../api/queryKeys";
import { toast } from "../components/Ui/toast";
import { getTrackLocations } from "../services/trackService";

const ERROR_TOAST = "Unable to load live vehicle locations.";

export function useLiveTrackLocations(options = {}) {
  const lastToastAtRef = useRef(null);

  // Allow caller to pass bbox or other params; don't mutate original
  const params = { ...(options.params || {}) };

  // Default interval (ms) when visible
  const defaultInterval = options.refetchInterval ?? 15_000;

  // Pause polling when page is hidden to reduce load
  const refetchInterval = () => (typeof document !== "undefined" && document.visibilityState === "visible" ? defaultInterval : false);

  const query = useQuery({
    queryKey: ["tracking.locations", params],
    queryFn: () => getTrackLocations(params),
    staleTime: 10_000,
    cacheTime: 15_000,
    refetchInterval,
    refetchOnWindowFocus: false,
    retry: 2,
    retryDelay: (attempt) => Math.min(1000 * 2 ** attempt, 8_000),
  });

  useEffect(() => {
    if (!query.isError) return;
    if (lastToastAtRef.current === query.errorUpdatedAt) return;
    lastToastAtRef.current = query.errorUpdatedAt;
    toast.error(ERROR_TOAST);
  }, [query.isError, query.errorUpdatedAt]);

  return {
    ...query,
    locations: query.data,
  };
}

export default useLiveTrackLocations;
