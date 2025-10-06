"use client";
import React from "react";
import { Workflow } from "@prisma/client";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { WorkflowStatus } from "@/types/workfowTypes";
import {
  CoinsIcon,
  CornerDownRightIcon,
  FileTextIcon,
  MoveRightIcon,
  PlayIcon,
  ShuffleIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import WorkflowActions from "./workflow-actions";
import RunBtn from "./RunBtn";
import SchedulerDialog from "./SchedulerDialog";
import TooltipWrapper from "@/components/tooltipWrapper";
import { Badge } from "@/components/ui/badge";

type Props = { workflow: Workflow };
const statusColors = {
  [WorkflowStatus.DRAFT]: "bg-neutral-200 text-neutral-600",
  [WorkflowStatus.PUBLISHED]: "bg-primary",
};

const WorkflowCard = ({ workflow }: Props) => {
  const isDraft = workflow.status === WorkflowStatus.DRAFT;
  return (
    <Card className="border border-separate shadow-sm rounded-lg overflow-hidden hover:shadow-md dark:shadow-primary/30 ">
      <CardContent className="p-4 flex items-center justify-between h-[100px]">
        <div className="flex items-center justify-end space-x-3">
          <div
            className={cn(
              "w-10 h-10 rounded-full  flex items-center justify-center",
              statusColors[workflow.status as WorkflowStatus]
            )}
          >
            {isDraft ? (
              <FileTextIcon className="size-5" />
            ) : (
              <PlayIcon className="size-5 text-white" />
            )}
          </div>
          <div>
            <h3 className="text-base font-bold text-muted-foreground flex items-center">
              <Link
                href={`/workflow/editor/${workflow.id}`}
                className="flex items-center hover:underline"
              >
                {workflow.name}
              </Link>
              {isDraft && (
                <span className="ml-2 px-2 py-0.5 text-xs font-medium bg-yellow-100 text-yellow-800 rounded-full">
                  Draft
                </span>
              )}
            </h3>
            <ScheduleSection
              isDraft={isDraft}
              creditsCost={workflow.creditsCost}
              workflowId={workflow.id}
              cron={workflow.cron}
            />
          </div>
        </div>

        <div className="flex items-center space-x-2">
          {!isDraft && <RunBtn workflowId={workflow.id} />}

          <Link
            href={`/workflow/editor/${workflow.id}`}
            className={cn(
              buttonVariants({
                variant: "outline",
                size: "sm",
              }),
              "flex items-center gap-2"
            )}
          >
            <ShuffleIcon size={16} />
            Edit
          </Link>
          <WorkflowActions
            workflowName={workflow.name}
            workflowId={workflow.id}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default WorkflowCard;

const ScheduleSection = ({
  isDraft,
  creditsCost,
  workflowId,
  cron,
}: {
  isDraft: boolean;
  creditsCost: number;
  workflowId: string;
  cron: string | null;
}) => {
  if (isDraft) return null;
  return (
    <div className="flex items-center gap-2">
      <CornerDownRightIcon className="size-4 text-muted-foreground" />
      <SchedulerDialog workflowId={workflowId} cron={cron} />
      <MoveRightIcon />
      <TooltipWrapper content="Credit consumption for full run">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-3">
            <Badge
              variant={"outline"}
              className="space-x-2 text-muted-foreground rounded-sm"
            >
              <CoinsIcon className="size-4" />
              <span className="text-sm">{creditsCost}</span>
            </Badge>
          </div>
        </div>
      </TooltipWrapper>
    </div>
  );
};
