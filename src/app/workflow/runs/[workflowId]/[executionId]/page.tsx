import Topbar from "@/app/workflow/_components/topbar/Topbar";
import React from "react";

type Props = {
  params: {
    executionId: string;
    workflowId: string;
  };
};

const ExecutionViewerPage = ({ params }: Props) => {
  return (
    <div className="flex flex-col h-screen w-full overflow-hidden">
      <Topbar
        WorkflowId={params.workflowId}
        title={"Workflow run details"}
        subTitle={`Run ID: ${params.executionId}`}
        hideButton
      />
      {params.executionId}
    </div>
  );
};

export default ExecutionViewerPage;
