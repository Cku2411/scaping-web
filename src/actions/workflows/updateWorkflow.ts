"use server";

import { db } from "@/lib/prisma";
import { WorkflowStatus } from "@/types/workfowTypes";
import { currentUser } from "@clerk/nextjs/server";

export const updateWorkflow = async ({
  id,
  definition,
}: {
  id: string;
  definition: string;
}) => {
  const user = await currentUser();
  if (!user?.id) {
    throw new Error("Unauthenticated");
  }

  const workflow = await db.workflow.findUnique({
    where: {
      id: id,
      userId: user.id,
    },
  });

  if (!workflow) throw new Error("Workflow not found");
  if (workflow.status !== WorkflowStatus.DRAFT) {
    throw new Error("Workflow is not a draft");
  }

  //   Update workflow
  await db.workflow.update({
    data: {
      definition,
    },
    where: {
      id,
      userId: user.id,
    },
  });
};
