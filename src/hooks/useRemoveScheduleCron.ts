import { removeScheduleWorkflow } from "@/actions/workflows/removeWorkflowSchedule";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export const useRemoveScheduleCron = () => {
  const { mutate: removeScheduleMutation, isPending: isPendingRemoveSchedule } =
    useMutation({
      mutationFn: removeScheduleWorkflow,
      onSuccess: () => {
        toast.success("Schedule deleted", { id: "cron" });
      },
      onError: () => {
        toast.success("failed to delete schedule", { id: "cron" });
      },
    });

  return { removeScheduleMutation, isPendingRemoveSchedule };
};
