import { ExecutionPhase } from "@prisma/client";

type Phase = Pick<ExecutionPhase, "creaditsConsumed">;

export const GetPhasesTotalCost = (phases: Phase[]) => {
  return phases.reduce(
    (accum, phases) => accum + (phases.creaditsConsumed || 0),
    0
  );
};
