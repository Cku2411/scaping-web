import { RunWorkflow } from "@/actions/workflows/runWorkflow";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export const useRunWorkflow = () => {
  const { mutate: runWorkflowMutation, isPending: isRunWorkflowPending } =
    useMutation({
      mutationFn: RunWorkflow,
      onSuccess: () => {
        toast.success("workflow started", { id: "flow-execution" });
      },
      onError: () => {
        toast.error("failed to run workflow", { id: "flow-execution" });
      },
    });

  return { runWorkflowMutation, isRunWorkflowPending };
};
