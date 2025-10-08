import { duplicateWorkflow } from "@/actions/workflows/duplicateWorkflow";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useDuplicateWorkflow = () => {
  const queryClient = useQueryClient();

  const {
    mutate: duplicateWorkflowMutation,
    isPending: isPendingDuplicateWorkflow,
  } = useMutation({
    mutationFn: duplicateWorkflow,
    onSuccess: () => {
      toast.success("workflow created", { id: "duplicate-workflow" });
    },
    onError: () => {
      toast.success("failed to duplicate workflow", {
        id: "duplicate-workflow",
      });
    },
  });

  return { duplicateWorkflowMutation, isPendingDuplicateWorkflow };
};
