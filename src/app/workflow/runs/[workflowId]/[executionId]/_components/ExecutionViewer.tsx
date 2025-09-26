"use client";

import getWorkflowExecutionWithPhases from "@/actions/workflows/getWorkflowExecutionWIthPhases";
import { useGetWorkflowExecutionWithPhase } from "@/hooks/useGetWorfkflowExecutionWithPhases";
import {
  CalendarIcon,
  CircleDashedIcon,
  ClockIcon,
  CoinsIcon,
  Loader2Icon,
  LucideIcon,
  WorkflowIcon,
} from "lucide-react";
import React, { useState } from "react";
import { formatDistanceToNow } from "date-fns";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { datesToDurationString } from "@/lib/helper/date";
import { GetPhasesTotalCost } from "@/lib/helper/phases";
import { WorkflowExecutionStatus } from "@/types/workfowTypes";
import { useGetWorkflowPhaseDetails } from "@/hooks/useGetWorkflowPhaseDetails";

type ExecutionData = Awaited<ReturnType<typeof getWorkflowExecutionWithPhases>>;

type Props = {
  initialData: ExecutionData;
};

const ExecutionViewer = ({ initialData }: Props) => {
  const [selectedPhase, setSelectedPhase] = useState<string | null>(null);
  const executionQuery = useGetWorkflowExecutionWithPhase(initialData);

  const phaseDetailQuery = useGetWorkflowPhaseDetails(selectedPhase);

  const isRunning =
    executionQuery.data?.status === WorkflowExecutionStatus.RUNNING;

  const duration = datesToDurationString(
    executionQuery.data?.completedAt,
    executionQuery.data?.startedAt
  );

  const creaditsConsumed = GetPhasesTotalCost(
    executionQuery.data?.phases || []
  );

  return (
    <div className="flex w-full h-full">
      <aside className="w-[440px] min-w-[440px] max-w-[440px] border-r-2 border-separate flex flex-grow flex-col overflow-hidden">
        <div className="py-4 px-2">
          {/* Status */}

          <ExecutionLabel
            icon={CircleDashedIcon}
            label={"Status"}
            value={initialData?.status}
          />

          <ExecutionLabel
            icon={CalendarIcon}
            label={"Started at"}
            value={
              <span className="lowercase">
                {executionQuery.data?.startedAt
                  ? formatDistanceToNow(
                      new Date(executionQuery.data?.startedAt),
                      { addSuffix: true }
                    )
                  : ""}
              </span>
            }
          />

          <ExecutionLabel
            icon={ClockIcon}
            label={"Duration"}
            value={
              duration ? duration : <Loader2Icon className="animate-spin" />
            }
          />
          <ExecutionLabel
            icon={CoinsIcon}
            label={"Creadit consumed"}
            value={creaditsConsumed}
          />
        </div>

        <Separator />

        <div className="flex justify-center items-center py-2 px-4">
          <div className="text-muted-foreground flex items-center gap-2">
            <WorkflowIcon size={20} className="stroke-muted-foreground/80" />
            <span className="font-semibold">Phases</span>
          </div>
        </div>
        <Separator />

        <div className="overflow-auto h-full px-2 py-4">
          {executionQuery.data?.phases.map((phase, index) => {
            return (
              <Button
                key={index}
                className="w-full justify-between"
                variant={selectedPhase === phase.id ? "secondary" : "ghost"}
                onClick={() => {
                  if (isRunning) return;
                  setSelectedPhase(phase.id);
                }}
              >
                <div className="flex items-center gap-2">
                  <Badge variant={"outline"}>{index + 1}</Badge>
                  <p className="font-semibold">{phase.name}</p>
                </div>
                <p className="text-xs text-muted-foreground ">{phase.status}</p>
              </Button>
            );
          })}
        </div>
      </aside>

      <div className=" flex w-full h-full">
        <pre>{JSON.stringify(phaseDetailQuery?.data, null, 4)}</pre>
      </div>
    </div>
  );
};

export default ExecutionViewer;

const ExecutionLabel = ({
  icon,
  label,
  value,
}: {
  icon: LucideIcon;
  label: React.ReactNode;
  value: React.ReactNode;
}) => {
  const Icon = icon;
  return (
    <div className="flex justify-between items-center py-2 px-4 text-sm">
      <div className="text-muted-foreground flex items-center gap-2">
        <Icon size={20} className="stroke-muted-foreground/80" />
        <span>{label}</span>
      </div>

      <div className="font-semibold capitalize flex gap-2 items-center">
        {value}
      </div>
    </div>
  );
};
