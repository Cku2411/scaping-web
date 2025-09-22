"use client";
import { Button } from "@/components/ui/button";
import useExecutionPlan from "@/hooks/useExecutionPlan";
import { PlayIcon } from "lucide-react";
import React from "react";

type Props = {
  workflowId: string;
};

const ExecuteBtn = ({ workflowId }: Props) => {
  const generate = useExecutionPlan();
  return (
    <Button
      variant={"outline"}
      className="flex items-center gap-2"
      onClick={() => {
        const plan = generate();
        console.log(`---plan---`);
        console.table(plan);
      }}
    >
      <PlayIcon size={16} className="stroke-orange-400" />
    </Button>
  );
};

export default ExecuteBtn;
