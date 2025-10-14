import { getWorkflowExecutionStats } from "@/actions/analytics/getWorkflowExecutionStats";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Layers2Icon } from "lucide-react";
import { AreaChart, CartesianGrid, XAxis } from "recharts";
import React from "react";
import {
  ChartContainer,
  ChartLegend,
  ChartTooltip,
} from "@/components/ui/chart";

type ChartData = Awaited<ReturnType<typeof getWorkflowExecutionStats>>;
type Props = { data: ChartData };

const ExecutionStatusChart = ({ data }: Props) => {
  const chartConfig = {
    success: {
      label: "Success",
      color: "hsl(var(--chart-2))",
    },
    failed: { label: "Failed", color: "hsl(var(--chart-1))" },
  };
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl font-bold flex items-center gap-2">
          <Layers2Icon className="size-6 text-primary" />
          Workflow execution status
        </CardTitle>
        <CardDescription>
          Daily number of successful and failed workflow execution
        </CardDescription>
      </CardHeader>
      <CardContent>
        {/* <pre>{JSON.stringify(data, null, 4)}</pre>
         */}

        <ChartContainer config={chartConfig} className="max-h-[200px] w-full">
          <AreaChart>
            <CartesianGrid />
            <XAxis />
            <ChartLegend />
            <ChartTooltip />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default ExecutionStatusChart;
