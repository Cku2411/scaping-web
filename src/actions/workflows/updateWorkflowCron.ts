"use server";

import { db } from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";
import parser from "cron-parser";

export const updateWorkflowCron = async ({
  id,
  cron,
}: {
  id: string;
  cron: string;
}) => {
  const user = await currentUser();

  if (!user?.id) {
    throw new Error("Unauthenticated");
  }

  try {
    const interval = parser.parseExpression(cron, { utc: true });
    return await db.workflow.update({
      where: {
        id,
        userId: user.id,
      },

      data: {
        cron,
        nextRunAt: interval.next().toDate(),
      },
    });
  } catch (error: any) {
    console.log("invalid cron: ", error.message);

    throw new Error("Invalid cron expression!");
  }
};
