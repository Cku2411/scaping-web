"use server";

import { PackId } from "@/types/billingType";
import { currentUser } from "@clerk/nextjs/server";

export const purchaseCredits = async (packId: PackId) => {
  const user = await currentUser();

  if (!user?.id) {
    throw new Error("Unauthenticated");
  }

  return "";
};
