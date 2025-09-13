"use client";
import CustomDialogHeader from "@/components/custom-dialog-header";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog";
import {
  createWorkflowFormSchema,
  CreateWorkFlowFormSchemaType,
} from "@/schema/workflowFormSchema";
import { Layers2Icon, Loader2 } from "lucide-react";
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
import { useCreateWorkflow } from "@/hooks/useCreateWorkflow";
import { toast } from "sonner";

type Props = {
  triggerText?: string;
};

const CreateWorkflowDialog = ({ triggerText }: Props) => {
  const [open, setOpen] = useState(false);
  const { createWorkflowMutation, isPendingcreateWorkflow } =
    useCreateWorkflow();

  // form

  const form = useForm<CreateWorkFlowFormSchemaType>({
    resolver: zodResolver(createWorkflowFormSchema),
    defaultValues: {},
  });

  const onWorkflowFormSubmit = useCallback(
    (values: CreateWorkFlowFormSchemaType) => {
      toast.loading("Creating workflow ...", { id: "create-workflow" });
      createWorkflowMutation(values);
    },
    [createWorkflowMutation]
  );

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>{triggerText ?? "Create workflow"}</Button>
      </DialogTrigger>
      <DialogContent className="px-0">
        <CustomDialogHeader
          icon={Layers2Icon}
          title={"Create workflow"}
          subTitle={"Start building your workflow"}
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
                      Choose a description and unique name
                    </FormDescription>
                  </FormItem>
                )}
              />

              {/* DESCRIPTION */}
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex gap-1 items-center">
                      Description
                      <p className="text-xs text-muted-foreground">
                        (required)
                      </p>
                    </FormLabel>
                    <FormControl>
                      <Textarea className="resize-none" {...field} />
                    </FormControl>
                    <FormDescription>
                      Provide a brief description of what your workflow does.{" "}
                      <br /> This is optional but can help you remember the
                      workflow's purpose
                    </FormDescription>
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                className="w-full"
                disabled={isPendingcreateWorkflow}
              >
                {!isPendingcreateWorkflow ? (
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

export default CreateWorkflowDialog;
