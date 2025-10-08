import { z } from "zod";

export const createWorkflowFormSchema = z.object({
  name: z.string().max(50),
  description: z.string().max(80).optional(),
});

export type CreateWorkFlowFormSchemaType = z.infer<
  typeof createWorkflowFormSchema
>;

export const duplicateWorkFlowFormSchema = createWorkflowFormSchema.extend({
  workflowId: z.string(),
});

export type DuplicateWorkflowSchemaType = z.infer<
  typeof duplicateWorkFlowFormSchema
>;
