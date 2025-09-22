"use client";
import React from "react";
import TooltipWrapper from "@/components/tooltipWrapper";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { ChevronLeftIcon } from "lucide-react";
import SaveBtn from "./SaveBtn";
import ExecuteBtn from "./ExecuteBtn";

type Props = {
  title: string;
  subTitle?: string;
  WorkflowId: string;
};

const Topbar = ({ title, subTitle, WorkflowId }: Props) => {
  const router = useRouter();
  return (
    <header className="flex p-2 border-b-2 border-separate justify-between w-full h-[60px] sticky top-0 bg-background z-10">
      <div className="flex gap-1 flex-1">
        <TooltipWrapper content="Back">
          <Button variant={"ghost"} size={"icon"} onClick={() => router.back()}>
            <ChevronLeftIcon size={20} />
          </Button>
        </TooltipWrapper>
        <div>
          <p className="font-bold">{title}</p>
          {subTitle && (
            <p className="text-xs text-muted-foreground truncate text-ellipsis">
              {subTitle}
            </p>
          )}
        </div>
        <div className="flex gap-1 flex-1 justify-end ">
          <ExecuteBtn workflowId={WorkflowId} />
          <SaveBtn workflowId={WorkflowId} />
        </div>
      </div>
    </header>
  );
};

export default Topbar;
