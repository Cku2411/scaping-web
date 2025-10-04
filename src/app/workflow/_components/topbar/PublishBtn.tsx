"use client";
import { Button } from "@/components/ui/button";
import useExecutionPlan from "@/hooks/useExecutionPlan";
import { usePublishWorkflow } from "@/hooks/usePublishWorkflow";
import { useRunWorkflow } from "@/hooks/useRunWorkflow";
import { useReactFlow } from "@xyflow/react";
import { PlayIcon, UploadIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";
import { toast } from "sonner";

type Props = {
  workflowId: string;
};

const PublishBtn = ({ workflowId }: Props) => {
  const generate = useExecutionPlan();
  const { toObject } = useReactFlow();
  const { publishWorkflowMutation, isPublishWorkflowPending } =
    usePublishWorkflow(workflowId);

  return (
    <Button
      variant={"outline"}
      disabled={isPublishWorkflowPending}
      className="flex items-center gap-2"
      onClick={() => {
        const plan = generate();
        if (!plan) {
          // client side validation
          return;
        }
        toast.loading("Publishing workflow ...", { id: workflowId });
        publishWorkflowMutation({
          id: workflowId,
          flowDefinition: JSON.stringify(toObject()),
        });
      }}
    >
      <UploadIcon size={16} className="stroke-green-400" />
      Publish
    </Button>
  );
};

export default PublishBtn;
