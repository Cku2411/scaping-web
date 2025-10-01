"use server";

import { db } from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";

export const getAvailableCredits = async () => {
  const user = await currentUser();

  if (!user?.id) {
    throw new Error("Unauthenticated");
  }

  const balance = await db.userBalance.findUnique({
    where: {
      userId: user.id,
    },
  });

  if (!balance) {
    return -1;
  }

  return balance.credits;
};
