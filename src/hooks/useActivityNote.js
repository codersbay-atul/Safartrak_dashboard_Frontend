import { useMutation } from "@tanstack/react-query";
import { postActivityNote } from "../services/activityService";
import { toast } from "../components/Ui/toast";

export function useActivityNote() {
  return useMutation({
    mutationFn: postActivityNote,
    onSuccess: () => {
      toast.success("Note saved successfully.");
    },
    onError: (error) => {
      toast.error(error?.message || "Failed to save note.");
    },
  });
}

export default useActivityNote;
