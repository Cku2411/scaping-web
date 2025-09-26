import "server-only";
import { db } from "../prisma";

export const executeWorkflow = async (executionId: string) => {
  const execution = await db.workflowExecution.findUnique({
    where: {
      id: executionId,
    },
    include: { workflow: true, phases: true },
  });

  if (!execution) {
    throw new Error("execution not found");
  }

  //   TODO :setupp execution everoment
  // TODO : initialize workflow execution
  //   TODO : initialize phases status
};
