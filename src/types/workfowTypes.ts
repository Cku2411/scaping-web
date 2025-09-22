import { LucideProps } from "lucide-react";
import { TaskParamInput, TaskPramOutput, TaskType } from "./taskType";
import { AppNode } from "./appNodeType";

export enum WorkflowStatus {
  DRAFT = "DRAFT",
  PUBLISHED = "PUBLISHED",
}

export type WorkflowTask = {
  label: string;
  icon: React.FC<LucideProps>;
  type: TaskType;
  isEntryPoint?: boolean;
  inputs: TaskParamInput[];
  outputs: TaskPramOutput[];
  credits: number;
};

export type WorkflowExecutionPlan = {
  phase: number;
  nodes: AppNode[];
}[];
