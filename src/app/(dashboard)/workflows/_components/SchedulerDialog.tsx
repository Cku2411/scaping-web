"use client";
import CustomeDialogHeader from "@/components/custom-dialog-header";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useUpdateWorkflowCron } from "@/hooks/useUpdateWorkflowCron";
import { Calendar1Icon, ClockIcon, TriangleAlertIcon } from "lucide-react";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import cronstrue from "cronstrue";
import { cn } from "@/lib/utils";

type Props = {
  cron: string | null;
  workflowId: string;
};

const SchedulerDialog = (props: Props) => {
  const [cron, setCron] = useState(props.cron || "");
  const [validCron, setValidCron] = useState(false);
  const [readableCron, setReadableCron] = useState("");
  const [inputValue, setInputValue] = useState(false);

  const { updateWorkflowCronMutation, isUpdateWorkflowCronPending } =
    useUpdateWorkflowCron();

  useEffect(() => {
    try {
      const humanCronStr = cronstrue.toString(cron);
      setValidCron(true);
      setReadableCron(humanCronStr);
    } catch (error) {
      setValidCron(false);
    }
  }, [cron]);
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant={"link"}
          size={"sm"}
          className={cn(
            "text-sm p-0 h-auto text-muted-foreground",
            validCron && "text-primary"
          )}
        >
          {validCron ? (
            <div className="flex items-center gap-2">
              <ClockIcon />
              {readableCron}
            </div>
          ) : (
            <div className="flex items-center gap-1">
              <TriangleAlertIcon className="size-3 mr-1" /> Set schedule
            </div>
          )}
        </Button>
      </DialogTrigger>

      <DialogContent>
        <CustomeDialogHeader
          title="Schedule workflow execution"
          icon={Calendar1Icon}
        />
        <div className="p-6 space-y-4">
          <p>
            Specify a cron expression to schedule period workflow execution. All
            times are in UTC
          </p>
          <Input
            placeholder="E.g ***"
            value={cron}
            onChange={(e) => {
              setCron(e.target.value);
              setInputValue(true);
            }}
          />

          {inputValue && (
            <div
              className={cn(
                "bg-accent rounded-md p-4 border text-sm border-destructive text-destructive",
                validCron && "border-primary text-primary"
              )}
            >
              {validCron ? readableCron : "Not a valid cron expression"}
            </div>
          )}
        </div>
        <DialogFooter className="gap-2 ">
          <DialogClose asChild>
            <Button variant={"secondary"}>Cancel</Button>
          </DialogClose>
          <DialogClose asChild>
            <Button
              onClick={() => {
                toast.loading("Saving...", { id: "cron" });
                updateWorkflowCronMutation({
                  id: props.workflowId,
                  cron,
                });
              }}
              disabled={isUpdateWorkflowCronPending}
            >
              Save
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default SchedulerDialog;
