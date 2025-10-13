"use client";

import Topbar from "@/app/workflow/_components/topbar/Topbar";
import { Loader2Icon } from "lucide-react";
import React, { Suspense, use } from "react";
import ExecutionViewer from "./_components/ExecutionViewer";
import { useGetWorkflowExecutionWithPhase } from "@/hooks/useGetWorfkflowExecutionWithPhases";

type Props = {
  params: {
    executionId: string;
    workflowId: string;
  };
};

const ExecutionViewerPage = ({ params }: Props) => {
  const { executionId, workflowId } = use(params);

  const workflowExecutionQuery = useGetWorkflowExecutionWithPhase(executionId);
  if (!workflowExecutionQuery.data) {
    return <div>Not Found</div>;
  }

  return (
    <div className="flex flex-col h-screen w-full overflow-hidden">
      <Topbar
        WorkflowId={workflowId}
        title={"Workflow run details"}
        subTitle={`Run ID: ${executionId}`}
        hideButton
      />
      <section className="h-full flex overflow-auto">
        {workflowExecutionQuery.data && workflowExecutionQuery.isFetching ? (
          <div className="flex w-full items-center justify-center">
            <Loader2Icon className="size-10 animate-spin stroke-primary" />
          </div>
        ) : (
          <ExecutionViewer initialData={workflowExecutionQuery.data} />
        )}
      </section>
    </div>
  );
};

export default ExecutionViewerPage;
