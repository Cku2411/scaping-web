"use client";
import { useGetAllWorkflowExecutions } from "@/hooks/useGetAllWorkflowExecutions";
import { InboxIcon } from "lucide-react";
import React from "react";
import ExecutionTable from "./ExecutionTable";

type Props = {};

const ExecutionsTableWrapper = ({ workflowId }: { workflowId: string }) => {
  // const executions = await getWorkflowExecutions(workflowId);
  const executionsQuery = useGetAllWorkflowExecutions(workflowId);
  if (!executionsQuery?.data) {
    return <div>No data</div>;
  }
  if (executionsQuery.data?.length === 0) {
    return (
      <div className="w-full py-6 container">
        <div className=" flex items-center flex-col gap-2 justify-center h-full w-full">
          <div className="rounded-full bg-accent size-20 flex items-center justify-center">
            <InboxIcon size={40} className="stroke-primary" />
          </div>
          <div className="flex flex-col gap-1 text-center">
            <p className="font-bold">
              No runs have been triggered yet for this workflow
            </p>
            <p className="text-sm text-muted-foreground">
              You can trigger a new run in the editor page
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-6 w-full container mx-auto">
      <ExecutionTable
        workflowId={workflowId}
        executions={executionsQuery.data}
      />
    </div>
  );
};

export default ExecutionsTableWrapper;
