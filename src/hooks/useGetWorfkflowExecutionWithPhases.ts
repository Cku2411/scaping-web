"use client";

import getWorkflowExecutionWithPhases from "@/actions/workflows/getWorkflowExecutionWIthPhases";
import { WorkflowExecutionStatus } from "@/types/workfowTypes";
import { useQuery } from "@tanstack/react-query";

// type ExecutionData = Awaited<ReturnType<typeof getWorkflowExecutionWithPhases>>;

export const useGetWorkflowExecutionWithPhase = (executionId: string) => {
  const query = useQuery({
    queryKey: ["execution", executionId],
    queryFn: async () => await getWorkflowExecutionWithPhases(executionId),
    // Keep polling while the execution is RUNNING so phases update live
    refetchInterval: (q) =>
      q.state.data?.status === WorkflowExecutionStatus.RUNNING ? 3000 : false,
    // refetchOnWindowFocus: true,
  });

  return query;
};
