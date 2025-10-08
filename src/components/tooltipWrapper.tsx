"use client";
import React from "react";
import {
  Tooltip,
  TooltipProvider,
  TooltipTrigger,
  TooltipContent,
} from "./ui/tooltip";

type Props = {
  children: React.ReactNode;
  content: React.ReactNode;
  side?: "top" | "bottom" | "left" | "right";
};

const TooltipWrapper = (props: Props) => {
  if (!props.content) return props.children;
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>{props.children}</TooltipTrigger>
        <TooltipContent
          side={props.side ? props.side : "bottom"}
          className="text-xs  rounded-md px-2 py-1 shadow-md"
        >
          {props.content}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default TooltipWrapper;
