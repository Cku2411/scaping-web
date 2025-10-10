"use client";
import CustomDialogHeader from "@/components/custom-dialog-header";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog";
import { Loader2, ShieldEllipsis } from "lucide-react";
import React, { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import {
  createCredentialSchema,
  CreateCredentialSchemaType,
} from "@/schema/credentials";
import { useCreateCredentials } from "@/hooks/useCreateCredentials";

type Props = {
  triggerText?: string;
};

const CreateCredentialsDialog = ({ triggerText }: Props) => {
  const [open, setOpen] = useState(false);
  const { createCredentialsMutation, isPendingcreateCredentials } =
    useCreateCredentials();

  // form

  const form = useForm<CreateCredentialSchemaType>({
    defaultValues: { name: "", value: "" },
    resolver: zodResolver(createCredentialSchema),
  });

  const onWorkflowFormSubmit = useCallback(
    (values: CreateCredentialSchemaType) => {
      toast.loading("Creating credentials ...", { id: "create-credentials" });
      createCredentialsMutation(values);
    },
    [createCredentialsMutation]
  );

  return (
    <Dialog
      open={open}
      onOpenChange={(open) => {
        form.reset();
        setOpen(open);
      }}
    >
      <DialogTrigger asChild>
        <Button>{triggerText ?? "Create"}</Button>
      </DialogTrigger>
      <DialogContent className="px-0">
        <CustomDialogHeader
          icon={ShieldEllipsis}
          title={"Create credentials"}
        />
        {/* form */}
        <div className="p-6">
          <Form {...form}>
            <form
              className="space-y-8 w-full"
              onSubmit={form.handleSubmit(onWorkflowFormSubmit)}
            >
              {/* NAME */}
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex gap-1 items-center">
                      Name
                      <p className="text-xs text-primary">(required)</p>
                    </FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormDescription>
                      Enter a unique an descriptive name for the credentials,
                      this name will be user to identify the credentiasl
                    </FormDescription>
                  </FormItem>
                )}
              />

              {/* DESCRIPTION */}
              <FormField
                control={form.control}
                name="value"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex gap-1 items-center">
                      Value
                      <p className="text-xs text-primary">(required)</p>
                    </FormLabel>
                    <FormControl>
                      <Textarea className="resize-none" {...field} />
                    </FormControl>
                    <FormDescription>
                      Enter the value associated with this credentials
                      <br /> this value will be securely encrypted and stored
                    </FormDescription>
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                className="w-full"
                disabled={isPendingcreateCredentials}
              >
                {!isPendingcreateCredentials ? (
                  "Proceed"
                ) : (
                  <Loader2 className="animate-spin" />
                )}
              </Button>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CreateCredentialsDialog;
