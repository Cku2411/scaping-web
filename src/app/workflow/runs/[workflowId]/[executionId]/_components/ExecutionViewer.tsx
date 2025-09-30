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
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ExecutionLog } from "@prisma/client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { log } from "console";
import { cn } from "@/lib/utils";
import { LogLevel } from "@/types/LogCollector";

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
            value={executionQuery.data?.status}
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
        {/* <pre>{JSON.stringify(phaseDetailQuery?.data, null, 4)}</pre> */}
        {isRunning && (
          <div className="flex items-center flex-col gap-2 justify-center h-full w-full">
            <p className="font-bold">Run is in progress, please wait</p>
          </div>
        )}
        {!isRunning && !selectedPhase && (
          <div className="flex items-center flex-col gap-2 justify-center h-full w-full">
            <div className="flex flex-col gap-1 text-center">
              <p className="font-bold">No phase selected</p>
              <p className="text-sm text-muted-foreground">
                Select a phase to view details
              </p>
            </div>
          </div>
        )}

        {!isRunning && selectedPhase && phaseDetailQuery.data && (
          <div className="flex flex-col px-4 py-2 container gap-4 overflow-auto">
            <div className="flex gap-2 items-center">
              <Badge variant={"outline"} className="space-x-4">
                <div className="flex gap-1 items-center">
                  <CoinsIcon size={18} className="stroke-muted-foreground" />
                  <span>Credits</span>
                </div>
                <span>TODO</span>
              </Badge>

              <Badge variant={"outline"} className="space-x-4">
                <div className="flex gap-1 items-center">
                  <ClockIcon size={18} className="stroke-muted-foreground" />
                  <span>Duration</span>
                </div>
                <span>
                  {datesToDurationString(
                    phaseDetailQuery.data.completedAt,
                    phaseDetailQuery.data.startedAt
                  ) || "-"}
                </span>
              </Badge>
            </div>

            <ParamaterViewer
              title="Inputs"
              subTitle={"Inputs used for this phase"}
              paramJson={phaseDetailQuery.data.inputs}
            />

            <ParamaterViewer
              title="Outputs"
              subTitle={"Outputs generated by this phase"}
              paramJson={phaseDetailQuery.data.outputs}
            />

            <LogViewer logs={phaseDetailQuery.data.logs} />
          </div>
        )}
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

const ParamaterViewer = ({
  title,
  subTitle,
  paramJson,
}: {
  title: string;
  subTitle: string;
  paramJson: string | null;
}) => {
  const params = paramJson ? JSON.parse(paramJson) : undefined;

  return (
    <Card>
      <CardHeader className="rounded-lg rounded-b-none border-b py-4 bg-gray-50 dark:bg-background">
        <CardTitle className="text-base">{title}</CardTitle>
        <CardDescription className="text-muted-foreground text-sm">
          {subTitle}
        </CardDescription>
      </CardHeader>

      <CardContent className="py-4">
        <div className="flex flex-col gap-2">
          {!params ||
            (Object.keys(params).length === 0 && (
              <p className="text-sm">No parameters generated by this phase</p>
            ))}

          {params &&
            Object.entries(params).map(([key, value]) => (
              <div
                key={key}
                className="flex items-center justify-between space-y-1 "
              >
                <p className="text-sm text-muted-foreground flex-1 basis-1/3">
                  {key}
                </p>
                <Input
                  readOnly
                  className="flex -1 basis-2/3"
                  value={value as string}
                />
              </div>
            ))}
        </div>
      </CardContent>
    </Card>
  );
};

const LogViewer = ({ logs }: { logs: ExecutionLog[] | undefined }) => {
  console.log("LOGS", logs);

  if (!logs || logs?.length === 0) return null;

  return (
    <Card className="w-full">
      <CardHeader className="rounded-lg rounded-b-none border-b py-4 bg-gray-50 dark:bg-background">
        <CardTitle className="text-base">Logs</CardTitle>
        <CardDescription className="text-muted-foreground text-sm">
          Logs generated by this phase
        </CardDescription>
      </CardHeader>

      <CardContent className="p-0">
        <Table>
          <TableHeader className="text-muted-foreground text-sm">
            <TableRow>
              <TableHead>Time</TableHead>
              <TableHead>Level</TableHead>
              <TableHead>Message</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {logs.map((log) => (
              <TableRow key={log.id}>
                <TableCell
                  width={190}
                  className="text-xs text-muted-foreground p-[2px] pl-4"
                >
                  {log.timestamp.toISOString()}
                </TableCell>
                <TableCell
                  width={80}
                  className={cn(
                    "uppercase text-xs font-bold p-[3px] pl-4",
                    (log.logLevel as LogLevel) === "error" &&
                      "text-destructive",
                    (log.logLevel as LogLevel) === "info" && "text-primary"
                  )}
                >
                  {log.logLevel}
                </TableCell>
                <TableCell className="text-sm flex p-[3px] pl-4">
                  {log.message}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};
