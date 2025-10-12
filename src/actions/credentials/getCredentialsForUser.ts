"use server";

import { db } from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";

export const getCredentialsForUser = async () => {
  const user = await currentUser();

  if (!user?.id) {
    throw new Error("Unauthenticated");
  }

  return db.credential.findMany({
    where: { userId: user.id },
    orderBy: {
      name: "asc",
    },
  });
};

export const getCredential = async (id: string) => {
  const user = await currentUser();

  if (!user?.id) {
    throw new Error("Unauthenticated");
  }

  return db.credential.findUnique({
    where: {
      id: id,
    },
  });
};
