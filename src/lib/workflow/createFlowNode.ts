import { AppNode } from "@/types/appNodeType";
import { TaskType } from "@/types/taskType";

export const CreateFlowNode = (
  nodeType: TaskType,
  position?: { x: number; y: number }
): AppNode => {
  return {
    id: crypto.randomUUID(),
    type: "Node",
    data: {
      type: nodeType,
      inputs: {},
    },

    position: position ?? { x: 0, y: 0 },
  };
};
