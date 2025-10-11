import { getCredentialsForUser } from "@/actions/credentials/getCredentialsForUser";
import { useQuery } from "@tanstack/react-query";

export const useGetCredentials = () => {
  const query = useQuery({
    queryKey: ["credentials"],
    queryFn: async () => await getCredentialsForUser(),
    // refetchInterval: 30 * 1000,
  });

  return query;
};
