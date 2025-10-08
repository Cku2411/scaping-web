import { Button } from "@/components/ui/button";
import { useRunWorkflow } from "@/hooks/useRunWorkflow";
import { PlayIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";
import { toast } from "sonner";

type Props = {};

const RunBtn = ({ workflowId }: { workflowId: string }) => {
  const router = useRouter();
  const { runWorkflowMutation, isRunWorkflowPending } = useRunWorkflow();
  return (
    <Button
      variant={"outline"}
      size={"sm"}
      className="flex items-center"
      disabled={isRunWorkflowPending}
      onClick={() => {
        toast.loading("Scheduling run ...", { id: "flow-execution" });
        runWorkflowMutation(
          { workflowId },
          {
            onSuccess: (data: any) => {
              if (data?.workflowId && data?.executionId) {
                router.push(
                  `/workflow/runs/${data.workflowId}/${data.executionId}`
                );
              }
            },
          }
        );
      }}
    >
      <PlayIcon size={16} /> Run
    </Button>
  );
};

export default RunBtn;
