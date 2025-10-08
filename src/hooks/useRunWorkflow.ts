import { RunWorkflow } from "@/actions/workflows/runWorkflow";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useRunWorkflow = () => {
  const queryClient = useQueryClient();
  const { mutate: runWorkflowMutation, isPending: isRunWorkflowPending } =
    useMutation({
      mutationFn: RunWorkflow,
      onSuccess: () => {
        toast.success("workflow started", { id: "flow-execution" });
        queryClient.invalidateQueries({ queryKey: ["user-available-credits"] });
        queryClient.invalidateQueries({ queryKey: ["execution"] });
        queryClient.invalidateQueries({ queryKey: ["executions"] });
      },
      onError: () => {
        toast.error("failed to run workflow", { id: "flow-execution" });
      },
    });

  return { runWorkflowMutation, isRunWorkflowPending };
};
