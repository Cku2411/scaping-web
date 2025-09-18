"use client";
import { Button } from "@/components/ui/button";
import { useUpdateWorkflow } from "@/hooks/useUpdateWorkflow";
import { useReactFlow } from "@xyflow/react";
import { CheckIcon } from "lucide-react";
import React from "react";
import { toast } from "sonner";

type Props = {
  workflowId: string;
};

const SaveBtn = ({ workflowId }: Props) => {
  const { toObject } = useReactFlow();
  console.log({ workflowId });
  const { updateWorkflowMutation, isUpdateWorkflowPending } = useUpdateWorkflow(
    { workflowId }
  );

  return (
    <Button
      disabled={isUpdateWorkflowPending}
      variant={"outline"}
      className="flex items-center gap-2"
      onClick={() => {
        const workflowDefinition = JSON.stringify(toObject(), null, 4);
        toast.loading("Saving workflow ...", { id: workflowId });
        updateWorkflowMutation({
          id: workflowId,
          definition: workflowDefinition,
        });
      }}
    >
      <CheckIcon size={16} className="stroke-green-400" />
      Save
    </Button>
  );
};

export default SaveBtn;
