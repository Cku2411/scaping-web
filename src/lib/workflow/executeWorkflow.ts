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
import { TaskType } from "@/types/taskType";
import { ExecutorRegistry } from "./executor/executorRegistry";
import { EnviromentType } from "@/types/executorType";

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
  const enviroment: EnviromentType = {
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
    const phaseExecution = await executeWorkflowPhase(phase, enviroment);
    if (!phaseExecution.success) {
      executionFailed = true;
      break;
    }
    // TODO: execute phaes

    // TODO: clean up enviroment
  }

  await finalizeWorkflowExecution(
    executionId,
    execution.workflowId,
    executionFailed,
    creaditsConsumed
  );
  // revalidatePath("/workflows/runs");
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

const executeWorkflowPhase = async (
  phase: ExecutionPhase,
  enviroment: EnviromentType
) => {
  const startedAt = new Date();

  const node = JSON.parse(phase.node) as AppNode;

  setupEnviromentForPhase(node, enviroment);
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

  const success = await executePhase(phase, node, enviroment);
  // TODO: decrement user balance

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

const executePhase = async (
  phase: ExecutionPhase,
  node: AppNode,
  enviroment: EnviromentType
): Promise<boolean> => {
  const runFn = ExecutorRegistry[node.data.type];

  if (!runFn) {
    return false;
  }
  return await runFn(enviroment.phases[node.id]);
};

const setupEnviromentForPhase = (node: AppNode, enviroment: EnviromentType) => {
  enviroment.phases[node.id] = { inputs: {}, outputs: {} };
  const inputsDefinition = TaskRegistry[node.data.type].inputs;
  for (const input of inputsDefinition) {
    const inputValue = node.data.inputs[input.name];
    if (inputValue) {
      enviroment.phases[node.id].inputs[input.name] = inputValue;
      continue;
    }

    // Get input value fron output in the enviroment
  }
};
