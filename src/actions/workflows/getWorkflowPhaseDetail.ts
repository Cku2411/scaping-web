"use server";

import { db } from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";

export const getWorkflowPhaseDetail = async (phaseId: string) => {
  const user = await currentUser();

  if (!user?.id) {
    throw new Error("Unauthenticated!");
  }

  return db.executionPhase.findUnique({
    where: {
      id: phaseId,
      execution: {
        userId: user.id,
      },
    },
  });
};
