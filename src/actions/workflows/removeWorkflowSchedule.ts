"use server";

import { db } from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

export const removeScheduleWorkflow = async (id: string) => {
  const user = await currentUser();

  if (!user?.id) {
    throw new Error("Unauthenticated!");
  }

  await db.workflow.update({
    where: {
      id: id,
      userId: user.id,
    },

    data: {
      cron: null,
      nextRunAt: null,
    },
  });

  revalidatePath("/workflows");
};
