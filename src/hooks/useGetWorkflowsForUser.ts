import { GetWorkFlowsForUser } from "@/actions/workflows/getWorkflowsForUser";
import { useQuery } from "@tanstack/react-query";

export const useGetWorkflowsForUser = () => {
  const query = useQuery({
    queryKey: ["workflows"],
    queryFn: async () => await GetWorkFlowsForUser(),
    // refetchInterval: 30 * 1000,
  });

  return query;
};
