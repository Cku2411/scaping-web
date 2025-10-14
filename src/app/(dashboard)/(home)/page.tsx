import { getPeriods } from "@/actions/analytics/getPeriods";
import React, { Suspense } from "react";
import PeriodSelector from "./_components/PeriodSelector";
import { Period } from "@/types/analytics";

type Props = {
  searchParams: { month?: string; year?: string };
};

const HomePage = async ({ searchParams }: Props) => {
  const currentDate = new Date();
  console.log({ currentDate });

  const { month, year } = await searchParams;
  const period: Period = {
    month: month ? parseInt(month) : currentDate.getMonth(),
    year: year ? parseInt(year) : currentDate.getFullYear(),
  };

  return (
    <div>
      {JSON.stringify(period, null, 4)}
      <Suspense>
        <PeriodSelectorWrapper />
      </Suspense>
    </div>
  );
};

export default HomePage;

const PeriodSelectorWrapper = async () => {
  const periods = await getPeriods();
  return <PeriodSelector periods={periods} />;
};
