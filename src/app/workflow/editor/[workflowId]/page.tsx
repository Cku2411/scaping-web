import React from "react";
import EditorPage from "../../_components/Editor";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, FileXIcon } from "lucide-react";
import { redirect } from "next/navigation";
import { getWorkflowById } from "@/actions/workflows/getWorkflowById";

type Props = {};

const WorkflowEditor = async ({
  params,
}: {
  params: { workflowId: string };
}) => {
  const { workflowId } = await params;

  try {
    const workflow = await getWorkflowById(workflowId);
    return <EditorPage workflow={workflow} />;
  } catch (error: any) {
    console.error("Error loading workflow:", error);

    // Handle authentication error
    if (error.message === "Unauthenticated") {
      redirect("/sign-in");
    }

    // Handle workflow not found
    if (error.message === "Workflow not found") {
      return (
        <div className="flex items-center justify-center h-full">
          <Alert variant="destructive" className="max-w-md">
            <FileXIcon className="h-4 w-4" />
            <AlertTitle>Workflow Not Found</AlertTitle>
            <AlertDescription>
              The workflow you're looking for doesn't exist or you don't have
              permission to access it.
            </AlertDescription>
          </Alert>
        </div>
      );
    }

    // Handle other errors
    return (
      <div className="flex items-center justify-center h-full">
        <Alert variant="destructive" className="max-w-md">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>
            Something went wrong while loading the workflow. Please try again
            later.
          </AlertDescription>
        </Alert>
      </div>
    );
  }
};

export default WorkflowEditor;
