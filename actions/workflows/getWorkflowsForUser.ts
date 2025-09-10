"use server";

import { db } from "@/lib/prisma";
import { auth, currentUser } from "@clerk/nextjs/server";

export const GetWorkFlowsForUser = async () => {
  const user = await currentUser();

  if (!user) {
    throw new Error("unauthenticated");
  }

  return db.workflow.findMany({
    where: {
      userId: user.id,
    },
    orderBy: {
      createAt: "asc",
    },
  });
};
