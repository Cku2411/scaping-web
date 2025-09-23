import { Node } from "@xyflow/react";
import { TaskParamInput, TaskType } from "./taskType";

export interface AppNodeData {
  type: TaskType;
  inputs: Record<string, string>;
  [key: string]: any;
}

export interface AppNode extends Node {
  data: AppNodeData;
}

export type ParamProps = {
  param: TaskParamInput;
  value: string;
  disabled?: boolean;
  updateNodeParamValue: (newValue: string) => void;
};

export type AppNodeMissingInputs = {
  nodeId: string;
  inputs: string[];
};
