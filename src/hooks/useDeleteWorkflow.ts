import { deleteWorkflow } from "@/actions/workflows/deleteWorkflow";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useDeleteWorkflow = (workflowId: string) => {
  const queryClient = useQueryClient();

  const { mutate: deleteWorkflowMutation, isPending: isPendingdeleteWordflow } =
    useMutation({
      mutationFn: deleteWorkflow,
      onSuccess: () => {
        toast.success("workflow deleted", { id: workflowId });
      },
      onError: () => {
        toast.success("failed to delete workflow", { id: workflowId });
      },
    });

  return { deleteWorkflowMutation, isPendingdeleteWordflow };
};
