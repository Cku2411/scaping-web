"use server";

import { db } from "@/lib/prisma";
import { CreateFlowNode } from "@/lib/workflow/createFlowNode";
import { FlowToExecutionPlan } from "@/lib/workflow/executionPlan";
import { calculateWorkflowCost } from "@/lib/workflow/helper";
import { AppNode } from "@/types/appNodeType";
import { TaskType } from "@/types/taskType";
import { WorkflowStatus } from "@/types/workfowTypes";
import { currentUser } from "@clerk/nextjs/server";
import { Edge } from "@xyflow/react";
import { revalidatePath } from "next/cache";

const initialFlow: { nodes: AppNode[]; edges: Edge[] } = {
  nodes: [],
  edges: [],
};

// let's add the flow entry point
initialFlow.nodes.push(CreateFlowNode(TaskType.LAUNCH_BROWSER));

export const publishWorkflow = async ({
  id,
  flowDefinition,
}: {
  id: string;
  flowDefinition: string;
}) => {
  const user = await currentUser();
  if (!user?.id) {
    throw new Error("unauthenticated");
  }

  const workflow = await db.workflow.findUnique({
    where: {
      id: id,
      userId: user.id,
    },
  });

  if (workflow?.status !== WorkflowStatus.DRAFT) {
    throw new Error("Workflow is not a draft");
  }

  const flow = JSON.parse(flowDefinition);
  const result = FlowToExecutionPlan(flow.nodes, flow.edges);

  if (result.error) {
    throw new Error("flow definition not valid");
  }

  if (!result.executionPlan) {
    throw new Error("no execution plan generated");
  }

  const creditsCost = calculateWorkflowCost(flow.nodes);
  // Update workdlow status
  await db.workflow.update({
    where: {
      id: id,
      userId: user.id,
    },

    data: {
      definition: flowDefinition,
      executionPlan: JSON.stringify(result.executionPlan),
      creditsCost,
      status: WorkflowStatus.PUBLISHED,
    },
  });
  revalidatePath("/workflows");
};
