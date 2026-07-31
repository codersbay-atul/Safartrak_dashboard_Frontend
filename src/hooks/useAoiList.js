import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "../api/queryKeys";
import { getAoiList } from "../services/aoiService";

export function useAoiList({ search = "", status = "all", geometry = false } = {}) {
  const [debouncedSearch, setDebouncedSearch] = useState(String(search ?? "").trim());

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(String(search ?? "").trim());
    }, 300);

    return () => clearTimeout(timer);
  }, [search]);

  const normalizedStatus = status === "all" ? "all" : status;

  const query = useQuery({
    queryKey: queryKeys.aoi.list({
      search: debouncedSearch,
      status: normalizedStatus,
      geometry,
    }),
    queryFn: () =>
      getAoiList({
        search: debouncedSearch,
        status: normalizedStatus,
        geometry,
      }),
    staleTime: 30_000,
    gcTime: 5 * 60_000,
    retry: 2,
    retryDelay: (attempt) => Math.min(1000 * 2 ** attempt, 8_000),
    refetchOnWindowFocus: true,
    refetchOnReconnect: true,
  });

  return {
    ...query,
    aois: Array.isArray(query.data?.areas) ? query.data.areas : [],
    count: query.data?.count ?? 0,
    total: query.data?.total ?? 0,
  };
}

export default useAoiList;
