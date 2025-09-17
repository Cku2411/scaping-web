import { db } from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";
import React from "react";
import EditorPage from "../../_components/Editor";

type Props = {};

const WorkflowEditor = async ({
  params,
}: {
  params: { workflowId: string };
}) => {
  const { workflowId } = await params;

  const user = await currentUser();
  if (!user?.id) {
    return <div>Unauthenticated</div>;
  }

  const workflow = await db.workflow.findUnique({
    where: {
      id: workflowId,
      userId: user.id,
    },
  });

  if (!workflow) {
    return <div>Workflow not found</div>;
  }

  return <EditorPage workflow={workflow} />;
};

export default WorkflowEditor;
