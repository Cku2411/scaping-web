"use client";
import { Button } from "@/components/ui/button";
import useExecutionPlan from "@/hooks/useExecutionPlan";
import { useRunWorkflow } from "@/hooks/useRunWorkflow";
import { useReactFlow } from "@xyflow/react";
import { PlayIcon } from "lucide-react";
import React from "react";

type Props = {
  workflowId: string;
};

const ExecuteBtn = ({ workflowId }: Props) => {
  const generate = useExecutionPlan();
  const { toObject } = useReactFlow();
  const { runWorkflowMutation, isRunWorkflowPending } = useRunWorkflow();

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
        runWorkflowMutation({
          workflowId: workflowId,
          flowDefinition: JSON.stringify(toObject()),
        });
      }}
    >
      <PlayIcon size={16} className="stroke-orange-400" />
    </Button>
  );
};

export default ExecuteBtn;
