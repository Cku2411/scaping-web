import { getAvailableCredits } from "@/actions/billing/getAvailableCredits";
import { useQuery } from "@tanstack/react-query";

export const useGetAvailabelCredits = () => {
  const query = useQuery({
    queryKey: ["user-available-credits"],
    queryFn: async () => await getAvailableCredits(),
    refetchInterval: 30 * 1000,
  });

  return query;
};
