"use client";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useDeleteCredential } from "@/hooks/useDeleteCredential";
import { XIcon } from "lucide-react";
import React, { useState } from "react";
import { toast } from "sonner";

type Props = {
  name: string;
};

const DeleteCredentialsDialog = ({ name }: Props) => {
  const [open, setOpen] = useState(false);
  const [confirmText, setConfirmText] = useState("");
  const { deleteCredentialMutation, isPendingdeleteCredential } =
    useDeleteCredential(name);
  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button variant={"destructive"} size={"icon"}>
          <XIcon size={18} />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure</AlertDialogTitle>
          <AlertDialogDescription>
            If you delete this credential, you will not able to recover it. If
            you are sure, enter <b>{name}</b> to continue
            <Input
              value={confirmText}
              onChange={(e) => setConfirmText(e.target.value)}
              className="mt-2"
            />
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={() => setConfirmText("")}>
            Cancle
          </AlertDialogCancel>
          <AlertDialogAction
            disabled={confirmText !== name || isPendingdeleteCredential}
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            onClick={() => {
              toast.loading("Deleting Credential...", { id: name });
              deleteCredentialMutation(name);
              setConfirmText("");
            }}
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteCredentialsDialog;
