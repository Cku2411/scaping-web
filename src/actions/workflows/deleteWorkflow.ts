"use server";

import { db } from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

export const deleteWorkflow = async (id: string) => {
  const user = await currentUser();
  if (!user?.id) {
    throw new Error("unauthenticated");
  }

  //   delete
  await db.workflow.delete({
    where: {
      id: id,
      userId: user.id,
    },
  });

  revalidatePath("/workflows");
};
