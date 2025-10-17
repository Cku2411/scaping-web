"use server";

import { db } from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

export const deleteCredential = async (name: string) => {
  const id = "";
  const user = await currentUser();
  if (!user?.id) {
    throw new Error("Unauthenticated");
  }

  //   delete database

  await db.credential.delete({
    where: {
      userId_name: {
        userId: user.id,
        name: name,
      },
    },
  });
  revalidatePath("/credentials");
};
