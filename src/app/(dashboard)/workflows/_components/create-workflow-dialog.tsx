"use client";
import CustomDialogHeader from "@/components/custom-dialog-header";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog";
import { Layers2Icon } from "lucide-react";
import React, { useState } from "react";

type Props = {
  triggerText?: string;
};

const CreateWorkflowDialog = ({ triggerText }: Props) => {
  const [open, setOpen] = useState(false);
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>{triggerText ?? "Create workflow"}</Button>
      </DialogTrigger>
      <DialogContent className="px-0">
        <CustomDialogHeader
          icon={Layers2Icon}
          title={"Create workflow"}
          subTitle={"Start building your workflow"}
        />
      </DialogContent>
    </Dialog>
  );
};

export default CreateWorkflowDialog;
