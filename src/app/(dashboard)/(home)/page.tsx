import { getPeriods } from "@/actions/analytics/getPeriods";
import React, { Suspense } from "react";
import PeriodSelector from "./_components/PeriodSelector";
import { Period } from "@/types/analytics";
import { waitFor } from "@/lib/helper/waitFor";
import { Skeleton } from "@/components/ui/skeleton";
import { getStatsCardsValues } from "@/actions/analytics/getStatsCardsValues";
import { CirclePlayIcon, CoinsIcon, WaypointsIcon } from "lucide-react";
import StatsCard from "./_components/StatsCard";

type Props = {
  searchParams: { month?: string; year?: string };
};

const HomePage = async ({ searchParams }: Props) => {
  const currentDate = new Date();
  const { month, year } = await searchParams;

  const period: Period = {
    month: month ? parseInt(month) : currentDate.getMonth(),
    year: year ? parseInt(year) : currentDate.getFullYear(),
  };

  return (
    <div className="flex flex-1 flex-col h-full">
      <div className="flex justify-between items-center w-full ">
        <h1 className="text-3xl font-bold">Home</h1>
        <Suspense fallback={<Skeleton className="w-[180px] h-[40px]" />}>
          <PeriodSelectorWrapper selectPeriod={period} />
        </Suspense>
      </div>
      <div className="h-full py-6 flex flex-col gap-4">
        <Suspense fallback={<StatCardSkeleton />}>
          <StatsCards selectPeriod={period} />
        </Suspense>
      </div>
    </div>
  );
};

const PeriodSelectorWrapper = async ({
  selectPeriod,
}: {
  selectPeriod: Period;
}) => {
  const periods = await getPeriods();
  return <PeriodSelector periods={periods} selectPeriod={selectPeriod} />;
};

const StatsCards = async ({ selectPeriod }: { selectPeriod: Period }) => {
  const data = await getStatsCardsValues(selectPeriod);
  return (
    <div className="grid gap-3 lg:gap-8 lg:grid-cols-3 min-h-[120px]">
      <StatsCard
        title="Workflow executions"
        value={data.workflowExecution}
        icon={CirclePlayIcon}
      />

      <StatsCard
        title="Phase executions"
        value={data.phaseExecutions}
        icon={WaypointsIcon}
      />

      <StatsCard
        title="Credit consumed"
        value={data.creditsConsumed}
        icon={CoinsIcon}
      />
    </div>
  );
};

const StatCardSkeleton = () => {
  return (
    <div className="grid gap-3 lg:gap-8 lg:grid-cols-3">
      {[1, 2, 3].map((ele) => (
        <Skeleton key={ele} className="w-full min-h-[120px]" />
      ))}
    </div>
  );
};

export default HomePage;
