import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "../api/queryKeys";
import { getAccountActivity } from "../services/accountService";

export function useAccountActivity(opts = { limit: 20 }) {
  const query = useQuery({
    queryKey: queryKeys.account.activity(opts.limit),
    queryFn: () => getAccountActivity({ limit: opts.limit }),
    staleTime: 60_000,
    retry: 1,
  });

  return {
    ...query,
    activities: query.data?.activity ?? query.data ?? [],
    total: query.data?.count ?? 0,
  };
}

export default useAccountActivity;
