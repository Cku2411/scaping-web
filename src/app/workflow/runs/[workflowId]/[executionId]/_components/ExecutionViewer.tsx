"use client";

import getWorkflowExecutionWithPhases from "@/actions/workflows/getWorkflowExecutionWIthPhases";
import { useGetWorkflowExecutionWithPhase } from "@/hooks/useGetWorfkflowExecutionWithPhases";
import { CalendarIcon, CircleDashedIcon } from "lucide-react";
import React from "react";
import { formatDistanceToNow } from "date-fns";

type ExecutionData = Awaited<ReturnType<typeof getWorkflowExecutionWithPhases>>;

type Props = {
  initialData: ExecutionData;
};

const ExecutionViewer = ({ initialData }: Props) => {
  const executionQuery = useGetWorkflowExecutionWithPhase(initialData);
  return (
    <div className="flex w-full h-full">
      <aside className="w-[440px] min-w-[440px] max-w-[440px] border-r-2 border-separate flex flex-grow flex-col overflow-hidden">
        <div className="py-4 px-2">
          {/* Status */}
          <div className="flex justify-between items-center py-2 px-4 text-sm">
            <div className="text-muted-foreground flex items-center gap-2">
              <CircleDashedIcon
                size={20}
                className="stroke-muted-foreground/80"
              />
              <span>Status</span>
            </div>

            <div className="font-semibold capitalize flex gap-2 items-center">
              {executionQuery.data?.status}
            </div>
          </div>

          {/* Status at label */}

          <div className="flex justify-between items-center px-4 py-2">
            <div className="flex items-center gap-2 text-muted-foreground">
              <CalendarIcon size={20} className="stroke-muted-foreground/80" />
              <span>Started at</span>
            </div>

            <div className="font-semibold lowercase flex gap-2 items-center">
              {executionQuery.data?.startedAt
                ? formatDistanceToNow(
                    new Date(executionQuery.data?.startedAt),
                    { addSuffix: true }
                  )
                : ""}
            </div>
          </div>
        </div>
      </aside>
    </div>
  );
};

export default ExecutionViewer;
