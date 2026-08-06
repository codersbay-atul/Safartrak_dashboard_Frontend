import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "../api/queryKeys";
import { getAccountNotifications, updateAccountNotifications } from "../services/accountService";

export function useAccountNotifications() {
  const qc = useQueryClient();

  const query = useQuery({
    queryKey: queryKeys.account.notifications,
    queryFn: () => getAccountNotifications(),
    staleTime: 60_000,
    retry: 1,
  });

  const mutation = useMutation({
    mutationFn: (payload) => updateAccountNotifications(payload),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: queryKeys.account.notifications });
      qc.invalidateQueries({ queryKey: queryKeys.account.profile });
    },
  });

  return {
    ...query,
    notifications: query.data ?? null,
    updateNotifications: mutation.mutateAsync,
    updateState: mutation,
  };
}

export default useAccountNotifications;
