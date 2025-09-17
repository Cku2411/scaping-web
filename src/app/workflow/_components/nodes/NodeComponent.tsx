import React, { memo } from "react";
import NodeCard from "./NodeCard";
import NodeHeader from "./NodeHeader";
import { AppNodeData } from "@/types/appNodeType";
import { TaskRegistry } from "@/lib/workflow/task/registry";
import NodeInputs, { NodeInput } from "./NodeInputs";

type Props = {
  id: string;
  selected: boolean;
  data: AppNodeData;
};

const NodeComponent = memo((props: Props) => {
  const nodeData = props.data;
  const task = TaskRegistry[nodeData.type];

  return (
    <NodeCard nodeId={props.id} isSelected={props.selected}>
      <NodeHeader taskType={nodeData.type} />
      <NodeInputs>
        {task.inputs.map((input, idx) => (
          <NodeInput input={input} key={idx} nodeId={props.id} />
        ))}
      </NodeInputs>
    </NodeCard>
  );
});

export default NodeComponent;

NodeComponent.displayName = "NodeComponent";
