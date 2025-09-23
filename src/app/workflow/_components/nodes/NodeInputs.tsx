import { cn } from "@/lib/utils";
import { TaskParamInput } from "@/types/taskType";
import { Handle, Position, useEdges } from "@xyflow/react";
import React, { Children } from "react";
import NodeParamField from "./NodeParamField";
import { ColorForHandle } from "./common";
import useFlowValidation from "@/hooks/useFlowValidation";

type Props = {
  children: React.ReactNode;
};

const NodeInputs = (props: Props) => {
  return <div className="flex flex-col divide-y gap-2">{props.children}</div>;
};

export default NodeInputs;

export const NodeInput = ({
  input,
  nodeId,
}: {
  input: TaskParamInput;
  nodeId: string;
}) => {
  const { invalidInputs } = useFlowValidation();
  const edges = useEdges();
  const isConnected = edges.some(
    (edge) => edge.target === nodeId && edge.targetHandle === input.name
  );

  const hasErrors = invalidInputs
    .find((node) => node.nodeId === nodeId)
    ?.inputs.find((invalidInput) => invalidInput === input.name);

  return (
    <div
      className={cn(
        "flex justify-start relative p-3 bg-secondary w-full",
        hasErrors && "bg-destructive/30"
      )}
    >
      <NodeParamField param={input} nodeId={nodeId} disabled={isConnected} />
      {!input.hideHandle && (
        <Handle
          id={input.name}
          type="target"
          isConnectable={!isConnected}
          position={Position.Left}
          className={cn(
            "!bg-muted-foreground !border-2 !border-backgorund !-left-2 !size-4",
            ColorForHandle[input.type]
          )}
        />
      )}
    </div>
  );
};
