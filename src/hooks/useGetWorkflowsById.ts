import { getWorkflowById } from "@/actions/workflows/getWorkflowById";
import { useQuery } from "@tanstack/react-query";

export const useGetWorkflowsById = (workflowId: string) => {
  const query = useQuery({
    queryKey: ["workflow", workflowId],
    queryFn: async () => await getWorkflowById(workflowId),
    // refetchInterval: 30 * 1000,
  });

  return query;
};
