"use server";

import { db } from "@/lib/prisma";
import { CreateFlowNode } from "@/lib/workflow/createFlowNode";
import {
  createWorkflowFormSchema,
  CreateWorkFlowFormSchemaType,
} from "@/schema/workflowFormSchema";
import { AppNode } from "@/types/appNodeType";
import { TaskType } from "@/types/taskType";
import { WorkflowStatus } from "@/types/workfowTypes";
import { currentUser } from "@clerk/nextjs/server";
import { Edge } from "@xyflow/react";
import { redirect } from "next/navigation";

const initialFlow: { nodes: AppNode[]; edges: Edge[] } = {
  nodes: [],
  edges: [],
};

// let's add the flow entry point
initialFlow.nodes.push(CreateFlowNode(TaskType.LAUNCH_BROWSER));

export const createWorkflow = async (form: CreateWorkFlowFormSchemaType) => {
  const { success, data } = createWorkflowFormSchema.safeParse(form);
  if (!success) {
    throw new Error("invalid form data");
  }

  const user = await currentUser();
  if (!user?.id) {
    throw new Error("unauthenticated");
  }

  const result = await db.workflow.create({
    data: {
      userId: user.id,
      status: WorkflowStatus.DRAFT,
      definition: JSON.stringify(initialFlow),
      ...data,
    },
  });

  if (!result) {
    throw new Error("faild to create workflow");
  }

  redirect(`workflow/editor/${result.id}`);
};
