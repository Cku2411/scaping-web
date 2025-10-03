import { cn } from "@/lib/utils";
import { WorkflowExecutionStatus } from "@/types/workfowTypes";
import React from "react";

const indicatorColors: Record<WorkflowExecutionStatus, string> = {
  PENDING: "bg-slate-400",
  RUNNING: "bg-yellow-400",
  FAILED: "bg-red-400",
  COMPLETED: "bg-emerald-600",
};

const ExecutionStatusIndicator = ({
  status,
}: {
  status: WorkflowExecutionStatus;
}) => {
  return (
    <div
      className={cn("size-2 rounded-full bg-red-500", indicatorColors[status])}
    ></div>
  );
};

export default ExecutionStatusIndicator;
