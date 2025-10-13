import getWorkflowExecutionWithPhases from "@/actions/workflows/getWorkflowExecutionWIthPhases";
import Topbar from "@/app/workflow/_components/topbar/Topbar";
import { currentUser } from "@clerk/nextjs/server";
import { Loader2Icon } from "lucide-react";
import React, { Suspense } from "react";
import ExecutionViewer from "./_components/ExecutionViewer";

type Props = {
  params: {
    executionId: string;
    workflowId: string;
  };
};

const ExecutionViewerPage = async ({ params }: Props) => {
  const { executionId } = await params;
  const { workflowId } = await params;
  return (
    <div className="flex flex-col h-screen w-full overflow-hidden">
      <Topbar
        WorkflowId={workflowId}
        title={"Workflow run details"}
        subTitle={`Run ID: ${executionId}`}
        hideButton
      />
      <section className="h-full flex overflow-auto">
        <Suspense
          fallback={
            <div className="flex w-full items-center justify-center">
              <Loader2Icon className="size-10 animate-spin stroke-primary" />
            </div>
          }
        >
          <ExecutionViewerWrapper executionId={executionId} />
        </Suspense>
      </section>
    </div>
  );
};

export default ExecutionViewerPage;

const ExecutionViewerWrapper = async ({
  executionId,
}: {
  executionId: string;
}) => {
  const user = await currentUser();
  if (!user?.id) {
    return <div>Unauthenticated</div>;
  }

  const workflowExecution = await getWorkflowExecutionWithPhases(executionId);
  if (!workflowExecution) {
    return <div>Not Found</div>;
  }
  // return <pre>{JSON.stringify(workflowExecution, null, 4)}</pre>;

  return <ExecutionViewer initialData={workflowExecution} />;
};
