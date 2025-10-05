"use client";
import { Button } from "@/components/ui/button";
import useExecutionPlan from "@/hooks/useExecutionPlan";
import { useUnpublishWorkflow } from "@/hooks/useUnpublishWorkflow";
import { useReactFlow } from "@xyflow/react";
import { DownloadIcon } from "lucide-react";
import React from "react";
import { toast } from "sonner";

type Props = {
  workflowId: string;
};

const UnpublishBtn = ({ workflowId }: Props) => {
  const generate = useExecutionPlan();
  const { toObject } = useReactFlow();
  const { isUnpublishWorkflowPending, UnpublishWorkflowMutation } =
    useUnpublishWorkflow(workflowId);

  return (
    <Button
      variant={"outline"}
      disabled={isUnpublishWorkflowPending}
      className="flex items-center gap-2"
      onClick={() => {
        const plan = generate();
        if (!plan) {
          // client side validation
          return;
        }
        toast.loading("UnPublishing workflow ...", { id: workflowId });
        UnpublishWorkflowMutation(workflowId);
      }}
    >
      <DownloadIcon size={16} className="stroke-orange-400" />
      Unpublish
    </Button>
  );
};

export default UnpublishBtn;
