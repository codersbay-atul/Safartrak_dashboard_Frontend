import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "../api/queryKeys";
import { getNotifications, markNotificationsRead } from "../api/notificationsApi";

export function useNotifications({ unreadOnly = false, limit = 20, before } = {}) {
  const query = useQuery({
    queryKey: queryKeys.notifications.list({ unreadOnly, limit, before }),
    queryFn: () => getNotifications({ unread: unreadOnly, limit, before }),
    staleTime: 30_000,
    retry: 1,
  });

  return {
    ...query,
    notifications: query.data ?? { items: [], count: 0, unread_count: 0, next_before: null },
  };
}

export function useMarkNotificationsRead() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (payload) => markNotificationsRead(payload),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: queryKeys.notifications.all });
      qc.invalidateQueries({ queryKey: queryKeys.notifications.unread });
    },
  });
}

export default useNotifications;
