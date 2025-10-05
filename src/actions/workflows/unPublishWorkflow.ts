"use server";

import { db } from "@/lib/prisma";
import { CreateFlowNode } from "@/lib/workflow/createFlowNode";
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

export const unPublishWorkflow = async (id: string) => {
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

  if (!workflow) {
    throw new Error("workflow not found");
  }

  if (workflow.status !== WorkflowStatus.PUBLISHED) {
    throw new Error("Workflow is not published");
  }

  // Update workdlow status
  await db.workflow.update({
    where: {
      id: id,
      userId: user.id,
    },

    data: {
      executionPlan: null,
      creditsCost: 0,
      status: WorkflowStatus.DRAFT,
    },
  });

  revalidatePath(`/workflow/editor/${id}`);
};
