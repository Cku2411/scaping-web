import React from "react";
import CreateWorkflowDialog from "./_components/create-workflow-dialog";
import UserWorkflows from "./_components/UserWorkflows";

const WorkFlowPage = () => {
  return (
    <div className=" flex-1 flex flex-col h-full gap-4">
      <div className="flex justify-between">
        <div className="flex flex-col">
          <h1 className="text-3xl font-bold">Workflows</h1>
          <p className="text-muted-foreground">Manage your workflow</p>
        </div>
        <CreateWorkflowDialog />
      </div>

      <div>
        <UserWorkflows />
      </div>
    </div>
  );
};

export default WorkFlowPage;
