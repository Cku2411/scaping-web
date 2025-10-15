"use server";

import { db } from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export const SetupUser = async () => {
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
    // free 100
    await db.userBalance.create({
      data: {
        userId: user.id,
        credits: 100,
      },
    });
  } else {
    // add 100
    await db.userBalance.update({
      where: {
        userId: user.id,
      },
      data: {
        credits: balance.credits + 200,
      },
    });
  }

  redirect("/");
};
