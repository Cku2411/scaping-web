import { deleteCredential } from "@/actions/credentials/deleteCredential";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useDeleteCredential = (name: string) => {
  const queryClient = useQueryClient();

  const {
    mutate: deleteCredentialMutation,
    isPending: isPendingdeleteCredential,
  } = useMutation({
    mutationFn: deleteCredential,
    onSuccess: () => {
      toast.success("Credential deleted", { id: name });
      queryClient.invalidateQueries({ queryKey: ["credentials"] });
    },
    onError: () => {
      toast.success("failed to delete Credential", { id: name });
    },
  });

  return { deleteCredentialMutation, isPendingdeleteCredential };
};
