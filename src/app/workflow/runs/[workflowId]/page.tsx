import React, { Suspense } from "react";
import Topbar from "../../_components/topbar/Topbar";
import ExecutionsTableWrapper from "./_components/ExecutionsTableWrapper";
import { Loader2Icon } from "lucide-react";

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
