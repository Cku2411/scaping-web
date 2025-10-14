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
import { TaskParamType, TaskType } from "@/types/taskType";
import { ExecutorRegistry } from "./executor/executorRegistry";
import { EnviromentType, ExecutionEnviromentType } from "@/types/executorType";
import { LaunchBrowserTask } from "./task/launchBrowser";
import { Browser, Page } from "puppeteer";
import { Edge } from "@xyflow/react";
import { LogCollector } from "@/types/LogCollector";
import { createLogCollector } from "../log";
import { decrementCredits } from "@/actions/billing/decrementCredits";

type ExecutionWithRelations = Prisma.WorkflowExecutionGetPayload<{
  include: { workflow: true; phases: true };
}>;

export const executeWorkflow = async (
  executionId: string,
  nextRunAt?: Date
) => {
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
  const edges = JSON.parse(execution.definition).edges as Edge[];

  const enviroment: EnviromentType = {
    phases: {},
  };

  // TODO : initialize workflow execution
  await initializeWorkflowExecution(
    executionId,
    execution.workflowId,
    nextRunAt
  );
  await initializePhasesStatuses(execution);

  //   TODO : initialize phases status

  let creditsConsumed = 0;
  let executionFailed = false;

  for (const phase of execution.phases) {
    const phaseExecution = await executeWorkflowPhase(
      phase,
      enviroment,
      edges,
      execution.userId
    );

    creditsConsumed += phaseExecution.creditsConsumed;
    if (!phaseExecution.success) {
      executionFailed = true;
      break;
    }
  }

  await finalizeWorkflowExecution(
    executionId,
    execution.workflowId,
    executionFailed,
    creditsConsumed
  );

  await waitFor(4000);
  await cleanupEnviroment(enviroment);
};

// ===============================================FUNCTION===========

const initializeWorkflowExecution = async (
  executionId: string,
  workflowId: string,
  nextRunAt?: Date
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
      ...(nextRunAt && { nextRunAt }),
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
  enviroment: EnviromentType,
  edges: Edge[],
  userId: string
) => {
  const logCollector = createLogCollector();

  const startedAt = new Date();

  const node = JSON.parse(phase.node) as AppNode;

  setupEnviromentForPhase(node, enviroment, edges);
  // update phase status
  await db.executionPhase.update({
    where: {
      id: phase.id,
    },
    data: {
      status: ExecutionPhasesStatus.RUNNING,
      startedAt: startedAt,
      inputs: JSON.stringify(enviroment.phases[node.id].inputs),
    },
  });

  const creditsRequired = TaskRegistry[node.data.type].credits;

  let success = await decrementCredits(userId, creditsRequired, logCollector);
  const creditsConsumed = success ? creditsRequired : 0;
  // thêm logging để dễ debug
  console.log(`Starting phase ${phase.id} (${phase.name}) node ${node.id}`);

  if (success) {
    // we can execute the phase if the creadit are sufficient
    success = await executePhase(phase, node, enviroment, logCollector);
  }
  const outputs = enviroment.phases[node.id].outputs;
  // TODO: decrement user balance

  await finalizePhase(
    phase.id,
    success,
    outputs,
    logCollector,
    creditsConsumed
  );
  return { success, creditsConsumed };
};

const finalizePhase = async (
  phaseId: string,
  success: boolean,
  outputs: any,
  logs: LogCollector,
  creditsConsumed: number
) => {
  const finalStatus = success
    ? ExecutionPhasesStatus.COMPLETED
    : ExecutionPhasesStatus.FAILED;

  await db.executionPhase
    .update({
      where: {
        id: phaseId,
      },
      data: {
        status: finalStatus,
        completedAt: new Date(),
        outputs: JSON.stringify(outputs),
        creaditsConsumed: creditsConsumed,
        logs: {
          createMany: {
            data: logs.getAll().map((log) => ({
              message: log.message,
              logLevel: log.level,
              timestamp: log.timestamp,
            })),
          },
        },
      },
    })
    .catch((err) => {
      console.error(`Failed to finalize phase ${phaseId}:`, err);
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
  enviroment: EnviromentType,
  logCollector: LogCollector
): Promise<boolean> => {
  const runFn = ExecutorRegistry[node.data.type];

  if (!runFn) {
    logCollector.error(`Not found executor for ${node.data.type}`);
    return false;
  }

  // await waitFor(3000);

  const executionEnviroment: ExecutionEnviromentType<any> =
    createExecutionEnviroment(node, enviroment, logCollector);
  return await runFn(executionEnviroment);
};

const setupEnviromentForPhase = (
  node: AppNode,
  enviroment: EnviromentType,
  edges: Edge[]
) => {
  enviroment.phases[node.id] = { inputs: {}, outputs: {} };
  const inputs = TaskRegistry[node.data.type].inputs;
  for (const input of inputs) {
    if (input.type === TaskParamType.BROWSER_INSTANCE) {
      continue;
    }
    const inputValue = node.data.inputs[input.name];
    if (inputValue) {
      enviroment.phases[node.id].inputs[input.name] = inputValue;
      continue;
    }

    // Get input value fron output in the enviroment
    // get edge connectd
    const connectedEdge = edges.find(
      (edge) => edge.targetHandle === input.name && edge.target === node.id
    );

    if (!connectedEdge) {
      console.error("Missing edge for input", input.name, "node id:", node.id);
      continue;
    }

    const outputValue =
      enviroment.phases[connectedEdge.source].outputs[
        connectedEdge.sourceHandle!
      ];

    enviroment.phases[node.id].inputs[input.name] = outputValue;
  }
};

const createExecutionEnviroment = (
  node: AppNode,
  enviroment: EnviromentType,
  logCollector: LogCollector
): ExecutionEnviromentType<any> => {
  return {
    getInput: (name: string) => enviroment.phases[node.id]?.inputs[name],
    setOutput: (name: string, value: string) => {
      enviroment.phases[node.id].outputs[name] = value;
    },
    getBrowser: () => enviroment.browser,
    setBrowser: (browser: Browser) => (enviroment.browser = browser),

    getPage: () => enviroment.page,
    setPage: (page: Page) => (enviroment.page = page),

    log: logCollector,
  };
};

const cleanupEnviroment = async (enviroment: EnviromentType) => {
  // close enviroment
  if (enviroment.browser) {
    await enviroment.browser
      .close()
      .catch((err) => console.error("cannot close browser, reason: ", err));
  }
};
