import { unPublishWorkflow } from "@/actions/workflows/unPublishWorkflow";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export const useUnpublishWorkflow = (workflowId: string) => {
  const {
    mutate: UnpublishWorkflowMutation,
    isPending: isUnpublishWorkflowPending,
  } = useMutation({
    mutationFn: unPublishWorkflow,
    onSuccess: () => {
      toast.success("Workflow Unpublished", { id: workflowId });
    },
    onError: () => {
      toast.error("Something went wrong with Unpublish workflow", {
        id: workflowId,
      });
    },
  });

  return { UnpublishWorkflowMutation, isUnpublishWorkflowPending };
};
