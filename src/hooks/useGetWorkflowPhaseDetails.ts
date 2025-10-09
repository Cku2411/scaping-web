import { getWorkflowPhaseDetail } from "@/actions/workflows/getWorkflowPhaseDetail";
import { useQuery } from "@tanstack/react-query";

export const useGetWorkflowPhaseDetails = (
  phaseId: string | null,
  status: string
) => {
  const query = useQuery({
    queryKey: ["phaseDetails", phaseId, status],
    // luôn gọi hook nhưng chỉ enable khi có phaseId
    enabled: phaseId !== null,
    queryFn: async () => {
      if (!phaseId) return null;
      return await getWorkflowPhaseDetail(phaseId);
    },
  });

  return query;
};
