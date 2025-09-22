import { AppNode } from "@/types/appNodeType";
import { WorkflowExecutionPlan } from "@/types/workfowTypes";
import { Edge } from "@xyflow/react";
import { TaskRegistry } from "./task/registry";

type FlowToExecutionPlan = {
  executionPlan?: WorkflowExecutionPlan;
};

export const FlowToExecutionPlan = (
  nodes: AppNode[],
  edges: Edge[]
): FlowToExecutionPlan => {
  const entryPoint = nodes.find(
    (node) => TaskRegistry[node.data.type].isEntryPoint
  );

  if (!entryPoint) {
    throw new Error("TODO: HANDLE THIS ERROR");
  }

  const executionPlan: WorkflowExecutionPlan = [
    {
      phase: 1,
      nodes: [entryPoint],
    },
  ];

  return { executionPlan };
};
