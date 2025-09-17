import { cn } from "@/lib/utils";
import { TaskParamInput } from "@/types/taskType";
import { Handle, Position } from "@xyflow/react";
import React, { Children } from "react";
import NodeParamField from "./NodeParamField";

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
  return (
    <div className="flex justify-start relative p-3 bg-secondary w-full">
      {/* {input.name} */}
      {/* <pre>{JSON.stringify(input, null, 4)}</pre> */}
      <NodeParamField param={input} nodeId={nodeId} />
      {!input.hideHandle && (
        <Handle
          id={input.name}
          type="target"
          position={Position.Left}
          className={cn(
            "!bg-muted-foreground !border-2 !border-backgorund !-left-2 !size-4"
          )}
        />
      )}
    </div>
  );
};
