import { createCredentials } from "@/actions/credentials/createCredentials";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useCreateCredentials = () => {
  const queryClient = useQueryClient();

  const {
    mutate: createCredentialsMutation,
    isPending: isPendingcreateCredentials,
  } = useMutation({
    mutationFn: createCredentials,
    onSuccess: () => {
      toast.success("Creadentials created", { id: "create-credentials" });
    },
    onError: () => {
      toast.success("failed to create Creadentials", {
        id: "create-credentials",
      });
    },
  });

  return { createCredentialsMutation, isPendingcreateCredentials };
};
