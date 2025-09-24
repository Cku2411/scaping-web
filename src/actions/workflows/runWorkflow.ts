"use server";

import { db } from "@/lib/prisma";
import { FlowToExecutionPlan } from "@/lib/workflow/executionPlan";
import { TaskRegistry } from "@/lib/workflow/task/registry";
import {
  ExecutionPhasesStatus,
  WorkfloExecutionStatus,
  WorkflowExecutionPlan,
  WorkflowExecutionTrigger,
} from "@/types/workfowTypes";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export const RunWorkflow = async (form: {
  workflowId: string;
  flowDefinition?: string;
}) => {
  const user = await currentUser();
  if (!user?.id) {
    throw new Error("Unauthenticated");
  }

  const { workflowId, flowDefinition } = form;

  if (!workflowId) {
    throw new Error("WorkflowId is required!");
  }

  const workflow = await db.workflow.findUnique({
    where: {
      userId: user.id,
      id: workflowId,
    },
  });

  if (!workflow) {
    throw new Error("Workflow not found");
  }

  let executionPlan: WorkflowExecutionPlan;
  if (!flowDefinition) {
    throw new Error("flow definition is not defined");
  }

  const flow = JSON.parse(flowDefinition);
  const result = FlowToExecutionPlan(flow.nodes, flow.edges);
  if (result.error) {
    throw new Error("Flow definition not valid");
  }

  if (!result.executionPlan) {
    throw new Error("No execution plan generated");
  }

  executionPlan = result.executionPlan;
  console.log({ executionPlan });

  // Create execution
  const execution = await db.workflowExecution.create({
    data: {
      workflowId,
      userId: user.id,
      trigger: WorkflowExecutionTrigger.MANUAL,
      status: WorkfloExecutionStatus.PENDING,
      startedAt: new Date(),
      phases: {
        create: executionPlan.flatMap((phase) => {
          return phase.nodes.flatMap((node) => {
            return {
              userId: user.id,
              status: ExecutionPhasesStatus.CREATED,
              number: phase.phase,
              node: JSON.stringify(node),
              name: TaskRegistry[node.data.type].label,
            };
          });
        }),
      },
    },
    select: {
      id: true,
      phases: true,
    },
  });

  if (!execution) {
    throw new Error("Workflow execution not created");
  }

  //forward to the running page
  redirect(`/workflow/runs/${workflowId}/${execution.id}`);
};
