"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ChartColumnStackedIcon, Layers2Icon } from "lucide-react";
import { Area, Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import React from "react";
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { getCreditsUsageInPeriod } from "@/actions/analytics/getCreditsUsageInPeriod";

type ChartData = Awaited<ReturnType<typeof getCreditsUsageInPeriod>>;
type Props = { data: ChartData; title: string; description: string };

const CreditUsageChart = ({ data, title, description }: Props) => {
  const chartConfig = {
    success: {
      label: "Successfull Phases Credits",
      color: "hsl(var(--chart-2))",
    },
    failed: { label: "Failed Phases Credits", color: "hsl(var(--chart-1))" },
  };
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl font-bold flex items-center gap-2">
          <ChartColumnStackedIcon className="size-6 text-primary" />
          {title}
        </CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="max-h-[200px] w-full">
          <BarChart
            data={data}
            height={200}
            accessibilityLayer
            margin={{ top: 20 }}
          >
            <CartesianGrid />
            <XAxis
              dataKey={"date"}
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value);
                return date.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                });
              }}
            />
            <ChartLegend content={<ChartLegendContent />} />
            <ChartTooltip
              content={<ChartTooltipContent className="w-[250px]" />}
            />
            <Bar
              dataKey={"success"}
              type={"natural"}
              fill="#8884d8"
              stroke="#8884d8"
              fillOpacity={0.8}
              stackId={"a"}
            />
            <Bar
              dataKey={"failed"}
              type={"natural"}
              fill="#82ca9d"
              stroke="#82ca9d"
              fillOpacity={0.8}
              stackId={"a"}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default CreditUsageChart;
