"use server";

import { PeriodToDataRange } from "@/lib/helper/date";
import { db } from "@/lib/prisma";
import { Period } from "@/types/analytics";
import { WorkflowExecutionStatus } from "@/types/workfowTypes";
import { currentUser } from "@clerk/nextjs/server";

export const getStatsCardsValues = async (period: Period) => {
  const user = await currentUser();

  if (!user?.id) {
    throw new Error("Unauthenticated");
  }

  const dateRage = PeriodToDataRange(period);

  const executions = await db.workflowExecution.findMany({
    where: {
      userId: user.id,
      startedAt: {
        gte: dateRage.startDate,
        lte: dateRage.endDate,
      },

      status: {
        in: [WorkflowExecutionStatus.COMPETED],
      },
    },

    select: {
      creaditsConsumed: true,
      phases: {
        where: {
          creaditsConsumed: {
            not: null,
          },
        },

        select: {
          creaditsConsumed: true,
        },
      },
    },
  });

  const stats = {
    workflowExecution: executions.length,
    creditsConsumed: 0,
    phaseExecutions: 0,
  };

  stats.creditsConsumed = executions.reduce((sum, execution) => {
    return sum + execution.creaditsConsumed;
  }, 0);

  stats.phaseExecutions = executions.reduce((sum, execution) => {
    return sum + execution.phases.length;
  }, 0);

  return stats;
};
