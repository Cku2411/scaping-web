"use client";
import React, { useCallback } from "react";
import { TaskParamInput, TaskParamType } from "@/types/taskType";
import StringParam from "./param/StringParam";
import { useReactFlow } from "@xyflow/react";
import { AppNode } from "@/types/appNodeType";

const NodeParamField = ({
  param,
  nodeId,
}: {
  param: TaskParamInput;
  nodeId: string;
}) => {
  const { updateNodeData, getNode } = useReactFlow();
  const node = getNode(nodeId) as AppNode;
  const value = node?.data.inputs?.[param.name];

  const updateNodeParamValue = useCallback(
    (newValue: string) => {
      updateNodeData(nodeId, {
        inputs: {
          ...node?.data.inputs,
          [param.name]: newValue,
        },
      });
    },
    [updateNodeData, param.name, node?.data.inputs]
  );

  switch (param.type) {
    case TaskParamType.STRING:
      return (
        <StringParam
          param={param}
          value={value}
          updateNodeParamValue={updateNodeParamValue}
        />
      );

    default:
      return (
        <div className="w-full">
          <div className="text-xs text-muted-foreground">Not implemented</div>
        </div>
      );
  }
};

export default NodeParamField;
