import { Skeleton } from "@/components/ui/skeleton";
import { waitFor } from "@/lib/helper/waitFor";
import React, { Suspense } from "react";
import { GetWorkFlowsForUser } from "../../../../actions/workflows/getWorkflowsForUser";
import { Alert, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

type Props = {};

const WorkFlowPage = async (props: Props) => {
  return (
    <div className=" flex-1 flex flex-col h-full">
      <div className="flex justify-between">
        <div className="flex flex-col">
          <h1 className="text-3xl font-bold">Workflows</h1>
          <p className="text-muted-foreground">Manage your workflow</p>
        </div>
      </div>

      <div>
        <Suspense fallback={<UserWorkflowsSkeleton />}>
          <UserWorkflows />
        </Suspense>
      </div>
    </div>
  );
};

const UserWorkflowsSkeleton = () => {
  return (
    <div className="space-y-2">
      {[1, 2, 3, 4].map((i) => (
        <Skeleton key={i} className="h-32 w-full" />
      ))}
    </div>
  );
};

const UserWorkflows = async () => {
  const workflows = GetWorkFlowsForUser();
  if (!workflows) {
    <Alert variant={"destructive"}>
      <AlertCircle className="size-4" />
      <AlertTitle>Error</AlertTitle>
    </Alert>;
  }

  return <div></div>;
};

export default WorkFlowPage;
