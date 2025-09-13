import { createWorkflow } from "@/actions/workflows/createWorkflow";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useCreateWorkflow = () => {
  const queryClient = useQueryClient();

  const { mutate: createWorkflowMutation, isPending: isPendingcreateWorkflow } =
    useMutation({
      mutationFn: createWorkflow,
      onSuccess: () => {
        toast.success("workflow created", { id: "create-workflow" });
      },
      onError: () => {
        toast.success("failed to create workflow", { id: "create-workflow" });
      },
    });

  return { createWorkflowMutation, isPendingcreateWorkflow };
};
