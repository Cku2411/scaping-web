import { publishWorkflow } from "@/actions/workflows/publishWorkflow";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export const usePublishWorkflow = (workflowId: string) => {
  const {
    mutate: publishWorkflowMutation,
    isPending: isPublishWorkflowPending,
  } = useMutation({
    mutationFn: publishWorkflow,
    onSuccess: () => {
      toast.success("Workflow published", { id: workflowId });
    },
    onError: () => {
      toast.error("Something went wrong with publish workflow", {
        id: workflowId,
      });
    },
  });

  return { publishWorkflowMutation, isPublishWorkflowPending };
};
