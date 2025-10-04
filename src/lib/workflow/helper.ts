import { AppNode } from "@/types/appNodeType";
import { TaskRegistry } from "./task/registry";

export const calculateWorkflowCost = (nodes: AppNode[]) => {
  return nodes.reduce((acc, node) => {
    return acc + TaskRegistry[node.data.type].credits;
  }, 0);
};
