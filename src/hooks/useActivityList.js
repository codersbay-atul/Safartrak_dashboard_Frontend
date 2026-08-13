import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "../api/queryKeys";
import { getActivityList } from "../services/activityService";

export function useActivityList({ period = "today", from, to, vehicle, driver, event, search, page = 1, page_size = 25 } = {}) {
  const queryKey = [queryKeys.activity.summary, "list", { period, from, to, vehicle, driver, event, search, page, page_size }];

  const query = useQuery({
    queryKey,
    queryFn: () =>
      getActivityList({ period, from, to, vehicle, driver, event, search, page, page_size }),
    staleTime: 15_000,
    retry: 2,
    refetchOnWindowFocus: true,
    refetchOnReconnect: true,
  });

  return {
    ...query,
    activityList: query.data ?? { activities: [], count: 0, total: 0 },
  };
}

export default useActivityList;
