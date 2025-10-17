"use server";

import { db } from "@/lib/prisma";
import {
  duplicateWorkFlowFormSchema,
  DuplicateWorkflowSchemaType,
} from "@/schema/workflowFormSchema";
import { WorkflowStatus } from "@/types/workfowTypes";
import { currentUser } from "@clerk/nextjs/server";
import { error } from "console";
import { revalidatePath } from "next/cache";

export const duplicateWorkflow = async (form: DuplicateWorkflowSchemaType) => {
  const { success, data } = duplicateWorkFlowFormSchema.safeParse(form);

  if (!success) {
    throw new Error("invalid form data");
  }

  const user = await currentUser();

  if (!user?.id) {
    throw new Error("Unauthenticated");
  }

  const sourceWorkflow = await db.workflow.findUnique({
    where: {
      id: data.workflowId,
      userId: user.id,
    },
  });

  if (!sourceWorkflow) {
    throw new Error("workflow not found");
  }

  // create new workflow
  const result = await db.workflow.create({
    data: {
      userId: user.id,
      name: data.name,
      description: data.description,
      status: WorkflowStatus.DRAFT,
      definition: sourceWorkflow.definition,
    },
  });

  if (!error) {
    throw new Error("faild to duplicate workflow");
  }

  revalidatePath("/workflows");
};
