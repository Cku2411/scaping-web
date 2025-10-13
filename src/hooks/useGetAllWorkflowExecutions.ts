"use client";

import { getWorkflowExecutions } from "@/actions/workflows/getWorkflowExecutions";
import { useQuery } from "@tanstack/react-query";

export const useGetAllWorkflowExecutions = (workflowId: string) => {
  const query = useQuery({
    queryKey: ["executions", workflowId],
    queryFn: async () => await getWorkflowExecutions(workflowId),
    // refetchInterval: (q) =>
    //   q.state.data?.status === WorkflowExecutionStatus.RUNNING ? 1000 : false,
  });

  return query;
};
