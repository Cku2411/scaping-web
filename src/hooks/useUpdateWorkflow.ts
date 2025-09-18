import { updateWorkflow } from "@/actions/workflows/updateWorkflow";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export const useUpdateWorkflow = ({ workflowId }: { workflowId: string }) => {
  const { mutate: updateWorkflowMutation, isPending: isUpdateWorkflowPending } =
    useMutation({
      mutationFn: updateWorkflow,
      onSuccess: () => {
        toast.success("Update workflow successfully!", { id: workflowId });
      },

      onError: () => {
        toast.error("Failed to update workflow!", { id: workflowId });
      },
    });

  return { updateWorkflowMutation, isUpdateWorkflowPending };
};
