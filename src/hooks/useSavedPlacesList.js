import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "../api/queryKeys";
import { getSavedPlacesList } from "../services/savedPlacesService";

export function useSavedPlacesList({ search = "", status = "all", geometry = true } = {}) {
  const [debouncedSearch, setDebouncedSearch] = useState(String(search ?? "").trim());

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(String(search ?? "").trim());
    }, 300);

    return () => clearTimeout(timer);
  }, [search]);

  const normalizedStatus = status === "all" ? "all" : status;

  const query = useQuery({
    queryKey: queryKeys.savedPlaces.list({
      search: debouncedSearch,
      status: normalizedStatus,
      geometry,
    }),
    queryFn: () =>
      getSavedPlacesList({
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
    places: Array.isArray(query.data?.areas)
      ? query.data.areas
      : Array.isArray(query.data?.results)
        ? query.data.results
        : [],
    count: query.data?.count ?? 0,
    total: query.data?.total ?? 0,
  };
}

export default useSavedPlacesList;
