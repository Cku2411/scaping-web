import { updateWorkflowCron } from "@/actions/workflows/updateWorkflowCron";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export const useUpdateWorkflowCron = () => {
  const {
    mutate: updateWorkflowCronMutation,
    isPending: isUpdateWorkflowCronPending,
  } = useMutation({
    mutationFn: updateWorkflowCron,
    onSuccess: () => {
      toast.success("Update workflowCron successfully!", { id: "cron" });
    },

    onError: () => {
      toast.error("Failed to update workflowCron!", { id: "cron" });
    },
  });

  return { updateWorkflowCronMutation, isUpdateWorkflowCronPending };
};
