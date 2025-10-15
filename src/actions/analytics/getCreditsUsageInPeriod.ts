import { PeriodToDataRange } from "@/lib/helper/date";
import { db } from "@/lib/prisma";
import { Period } from "@/types/analytics";
import { ExecutionPhasesStatus } from "@/types/workfowTypes";
import { currentUser } from "@clerk/nextjs/server";
import { eachDayOfInterval, format } from "date-fns";

type Stats = Record<string, { success: number; failed: number }>;

export const getCreditsUsageInPeriod = async (period: Period) => {
  const user = await currentUser();

  if (!user?.id) {
    throw new Error("Unauthenticated");
  }

  const dateRange = PeriodToDataRange(period);

  const executionPhases = await db.executionPhase.findMany({
    where: {
      userId: user.id,
      startedAt: {
        gte: dateRange.startDate,
        lte: dateRange.endDate,
      },
      status: {
        in: [ExecutionPhasesStatus.COMPLETED, ExecutionPhasesStatus.FAILED],
      },
    },
  });

  const dateFormat = "yyyy-MM-dd";

  const stats: Stats = eachDayOfInterval({
    start: dateRange.startDate,
    end: dateRange.endDate,
  })
    .map((date) => format(date, dateFormat))
    .reduce((acc, date) => {
      acc[date] = {
        success: 0,
        failed: 0,
      };
      return acc;
    }, {} as any);

  executionPhases.forEach((executionPhase) => {
    const date = format(executionPhase.startedAt!, dateFormat);
    if (executionPhase.status === ExecutionPhasesStatus.COMPLETED) {
      stats[date].success += 1;
    }

    if (executionPhase.status === ExecutionPhasesStatus.FAILED) {
      stats[date].failed += 1;
    }
  });

  const result = Object.entries(stats).map(([date, info]) => ({
    date,
    ...info,
  }));

  return result;
};
