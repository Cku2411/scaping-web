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

export type WorkflowExecutionPlanPhase = {
  phase: number;
  nodes: AppNode[];
};

export type WorkflowExecutionPlan = WorkflowExecutionPlanPhase[];

export enum WorkflowExecutionStatus {
  PENDING = "PENDING",
  RUNNING = "RUNNING",
  COMPETED = "COMPLETED",
  FAILED = "FAILED",
}

export enum ExecutionPhasesStatus {
  CREATED = "CREATED",
  PENDING = "PENDING",
  RUNNING = "RUNNING",
  COMPETED = "COMPLETED",
  FAILED = "FAILED",
}

export enum WorkflowExecutionTrigger {
  MANUAL = "MANUAL",
}
