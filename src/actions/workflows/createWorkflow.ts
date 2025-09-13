"use server";

import { db } from "@/lib/prisma";
import {
  createWorkflowFormSchema,
  CreateWorkFlowFormSchemaType,
} from "@/schema/workflowFormSchema";
import { WorkflowStatus } from "@/types/workfowTypes";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

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
      definition: "TODO",
      ...data,
    },
  });

  if (!result) {
    throw new Error("faild to create workflow");
  }

  redirect(`workflow/editor/${result.id}`);
};
