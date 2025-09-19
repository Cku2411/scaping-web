"use client";

import { cn } from "@/lib/utils";
import { TaskPramOutput } from "@/types/taskType";
import { Handle, Position } from "@xyflow/react";
import React from "react";
import { ColorForHandle } from "./common";

type Props = {
  children: React.ReactNode;
};

const NodeOutputs = (props: Props) => {
  return <div className="flex flex-col divide-y gap-1">{props.children}</div>;
};

export default NodeOutputs;

export const NodeOutput = ({ output }: { output: TaskPramOutput }) => {
  return (
    <div className="flex justify-end relative p-3 bg-secondary">
      <p className="text-xs text-muted-foreground"> {output.name}</p>
      <Handle
        id={output.name}
        type="source"
        position={Position.Right}
        className={cn(
          "!bg-muted-foreground !border-2 !border-background !-right-2 !size-4",
          ColorForHandle[output.type]
        )}
      />
    </div>
  );
};
