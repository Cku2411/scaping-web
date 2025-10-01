"use client";

import getWorkflowExecutionWithPhases from "@/actions/workflows/getWorkflowExecutionWIthPhases";
import { WorkflowExecutionStatus } from "@/types/workfowTypes";
import { useQuery } from "@tanstack/react-query";

type ExecutionData = Awaited<ReturnType<typeof getWorkflowExecutionWithPhases>>;

export const useGetWorkflowExecutionWithPhase = (
  initialData: ExecutionData
) => {
  const query = useQuery({
    queryKey: ["execution", initialData?.id],
    initialData,

    queryFn: async () => await getWorkflowExecutionWithPhases(initialData!.id),
    // refetchInterval: (q) =>
    //   q.state.data?.status === WorkflowExecutionStatus.RUNNING ? 1000 : false,
  });

  return query;
};
