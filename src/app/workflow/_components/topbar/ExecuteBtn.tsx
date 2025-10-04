"use client";
import { Button } from "@/components/ui/button";
import useExecutionPlan from "@/hooks/useExecutionPlan";
import { useRunWorkflow } from "@/hooks/useRunWorkflow";
import { useReactFlow } from "@xyflow/react";
import { PlayIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

type Props = {
  workflowId: string;
};

const ExecuteBtn = ({ workflowId }: Props) => {
  const generate = useExecutionPlan();
  const { toObject } = useReactFlow();
  const { runWorkflowMutation, isRunWorkflowPending } = useRunWorkflow();
  const router = useRouter();

  return (
    <Button
      variant={"outline"}
      disabled={isRunWorkflowPending}
      className="flex items-center gap-2"
      onClick={() => {
        const plan = generate();
        if (!plan) {
          // client side validation
          return;
        }
        runWorkflowMutation(
          {
            workflowId: workflowId,
            flowDefinition: JSON.stringify(toObject()),
          },
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
      <PlayIcon size={16} className="stroke-orange-400" />
      Execute
    </Button>
  );
};

export default ExecuteBtn;
