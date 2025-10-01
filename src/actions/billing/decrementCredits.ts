import { db } from "@/lib/prisma";
import { LogCollector } from "@/types/LogCollector";

export const decrementCredits = async (
  userId: string,
  amount: number,
  logCollector: LogCollector
) => {
  try {
    await db.userBalance.update({
      where: {
        userId: userId,
        credits: {
          gte: amount,
        },
      },

      data: {
        credits: { decrement: amount },
      },
    });

    return true;
  } catch (error) {
    logCollector.error("insufficient balance");
    return false;
  }
};
