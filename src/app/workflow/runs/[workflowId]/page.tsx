import React, { Suspense } from "react";
import Topbar from "../../_components/topbar/Topbar";
import { getWorkflowExecutions } from "@/actions/workflows/getWorkflowExecutions";
import { InboxIcon, Loader2Icon } from "lucide-react";
import ExecutionTable from "./_components/ExecutionTable";

const ExecutionPage = async ({
  params,
}: {
  params: { workflowId: string };
}) => {
  const { workflowId } = await params;
  console.log({ workflowId });

  return (
    <div className=" h-full w-full overflow-auto">
      <Topbar
        WorkflowId={workflowId}
        title="All runs"
        subTitle="List of all your workflows runs"
        hideButton
      />
      <Suspense
        fallback={
          <div className="flex h-full w-full items-center justify-center">
            <Loader2Icon size={30} className="animate-spin stroke-primary" />
          </div>
        }
      >
        <ExecutionsTableWrapper workflowId={workflowId} />
      </Suspense>
    </div>
  );
};

export default ExecutionPage;

const ExecutionsTableWrapper = async ({
  workflowId,
}: {
  workflowId: string;
}) => {
  const executions = await getWorkflowExecutions(workflowId);
  if (!executions) {
    return <div>No data</div>;
  }
  if (executions.length === 0) {
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
      <ExecutionTable workflowId={workflowId} initialData={executions} />
    </div>
  );
};
