import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "../api/queryKeys";
import { getAccountProfile } from "../services/accountService";

export function useAccountProfile() {
  const query = useQuery({
    queryKey: queryKeys.account.profile,
    queryFn: () => getAccountProfile(),
    staleTime: 60_000,
    retry: 1,
  });

  return {
    ...query,
    profile: query.data ?? null,
  };
}

export default useAccountProfile;
