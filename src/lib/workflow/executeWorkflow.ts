import "server-only";
import { db } from "../prisma";
import { revalidatePath } from "next/cache";
import {
  ExecutionPhasesStatus,
  WorkflowExecutionStatus,
} from "@/types/workfowTypes";
import { WorkflowExecution, Prisma, ExecutionPhase } from "@prisma/client";
import { waitFor } from "../helper/waitFor";
import { AppNode } from "@/types/appNodeType";
import { TaskRegistry } from "./task/registry";

type ExecutionWithRelations = Prisma.WorkflowExecutionGetPayload<{
  include: { workflow: true; phases: true };
}>;

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
  const enviroment = {
    phases: {
      // launchBrowser: {
      //   inputs: {
      //     websiteUrl: "www.google.com",
      //   },
      //   outputs: {
      //     browser: "PuppetterInstance",
      //   },
      // },
    },
  };

  // TODO : initialize workflow execution
  await initializeWorkflowExecution(executionId, execution.workflowId);
  await initializePhasesStatuses(execution);

  //   TODO : initialize phases status

  const creaditsConsumed = 10;

  let executionFailed = false;
  for (const phase of execution.phases) {
    const phaseExecution = await executeWorkflowPhase(phase);
    if (!phaseExecution.success) {
      executionFailed = true;
      break;
    }
    // TODO: execute phaes

    await finalizeWorkflowExecution(
      executionId,
      execution.workflowId,
      executionFailed,
      creaditsConsumed
    );
    // TODO: clean up enviroment

    // revalidatePath("/workflows/runs");
  }
};

// ===============================================FUNCTION===========

const initializeWorkflowExecution = async (
  executionId: string,
  workflowId: string
) => {
  // update status
  await db.workflowExecution.update({
    where: {
      id: executionId,
    },

    data: {
      startedAt: new Date(),
      status: WorkflowExecutionStatus.RUNNING,
    },
  });

  // update workflow (clear)
  await db.workflow.update({
    where: {
      id: workflowId,
    },
    data: {
      lastRunAt: new Date(),
      lastRunStatus: WorkflowExecutionStatus.RUNNING,
      lastRunId: executionId,
    },
  });
};

const initializePhasesStatuses = async (execution: ExecutionWithRelations) => {
  await db.executionPhase.updateMany({
    where: {
      id: {
        in: execution.phases.map((phase) => phase.id),
      },
    },
    data: {
      status: ExecutionPhasesStatus.PENDING,
    },
  });
};

const finalizeWorkflowExecution = async (
  executeId: string,
  workflowId: string,
  executionFailed: boolean,
  creaditsConsumed: number
) => {
  const finalStatus = executionFailed
    ? WorkflowExecutionStatus.FAILED
    : WorkflowExecutionStatus.COMPETED;

  console.log({ finalStatus });

  await db.workflowExecution.update({
    where: {
      id: executeId,
    },
    data: {
      status: finalStatus,
      completedAt: new Date(),
      creaditsConsumed,
    },
  });

  await db.workflow
    .update({
      where: {
        id: workflowId,
        lastRunId: executeId,
      },
      data: {
        lastRunStatus: finalStatus,
      },
    })
    .catch((err) => {
      // ignore
      // /This mean that we have triggred other runs for this workflow
      // while an execution was runnign
    });
};

const executeWorkflowPhase = async (phase: ExecutionPhase) => {
  const startedAt = new Date();

  const node = JSON.parse(phase.node) as AppNode;
  // update phase status
  await db.executionPhase.update({
    where: {
      id: phase.id,
    },
    data: {
      status: ExecutionPhasesStatus.RUNNING,
    },
  });

  const creaditsRequired = TaskRegistry[node.data.type].credits;
  console.log(
    `Execution Phase ${phase.name} with ${creaditsRequired} creadits required`
  );

  // TODO: decrement user balance
  // Execution phase simulation
  await waitFor(2000);
  const success = true;

  await finalizePhase(phase.id, success);
  return { success };
};

const finalizePhase = async (phaseId: string, success: boolean) => {
  const finalStatus = success
    ? ExecutionPhasesStatus.COMPETED
    : ExecutionPhasesStatus.FAILED;

  await db.executionPhase.update({
    where: {
      id: phaseId,
    },
    data: {
      status: finalStatus,
      completedAt: new Date(),
    },
  });
};
