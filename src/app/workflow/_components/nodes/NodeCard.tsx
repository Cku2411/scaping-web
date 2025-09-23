"use client";
import useFlowValidation from "@/hooks/useFlowValidation";
import { cn } from "@/lib/utils";
import { useReactFlow } from "@xyflow/react";
import React from "react";

type Props = {
  children: React.ReactNode;
  nodeId: string;
  isSelected: boolean;
};

const NodeCard = ({ children, nodeId, isSelected }: Props) => {
  const { getNode, setCenter } = useReactFlow();

  const { invalidInputs } = useFlowValidation();
  const hasInvalidInputs = invalidInputs.some((node) => node.nodeId === nodeId);
  return (
    <div
      onDoubleClick={() => {
        const node = getNode(nodeId);
        if (!node) return;
        const { position, measured } = node;
        if (!position || !measured) return;

        const { width, height } = measured;
        const x = position.x + width! / 2;
        const y = position.y + height! / 2;
        if (x === undefined || y === undefined) return;

        setCenter(x, y, { zoom: 1, duration: 500 });

        console.log({ position });
      }}
      className={cn(
        "rounded-md bg-background cursor-pointer border-2 border-separate w-[420px] gap-1 flex flex-col",
        isSelected && "border-primary",
        hasInvalidInputs && "border-destructive border-2"
      )}
    >
      {children}
    </div>
  );
};

export default NodeCard;
