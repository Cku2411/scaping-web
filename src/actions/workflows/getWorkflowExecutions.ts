"use server";

import { db } from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";

export const getWorkflowExecutions = async (workflowId: string) => {
  const user = await currentUser();

  if (!user?.id) {
    throw new Error("Unauthenticated");
  }

  const executions = await db.workflowExecution.findMany({
    where: {
      userId: user.id,
      workflowId: workflowId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  //   console.log({ executions });

  return executions;
};
