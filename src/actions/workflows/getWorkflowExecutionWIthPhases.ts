"use server";

import { db } from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";

const getWorkflowExecutionWithPhases = async (executionId: string) => {
  const user = await currentUser();
  if (!user?.id) {
    throw new Error("Unauthenticated");
  }

  return await db.workflowExecution.findUnique({
    where: {
      id: executionId,
      userId: user.id,
    },
    include: {
      phases: {
        orderBy: {
          number: "asc",
        },
      },
    },
  });
};

export default getWorkflowExecutionWithPhases;
