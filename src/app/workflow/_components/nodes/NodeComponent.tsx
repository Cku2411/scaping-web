import React, { memo } from "react";
import NodeCard from "./NodeCard";

type Props = {
  id: string;
};

const NodeComponent = memo((props: Props) => {
  return <NodeCard nodeId={props.id}>NodeComponent</NodeCard>;
});

export default NodeComponent;

NodeComponent.displayName = "NodeComponent";
