import { ExecutionPhasesStatus } from "@/types/workfowTypes";
import {
  CircleCheck,
  CircleCheckIcon,
  CircleDashedIcon,
  CircleXIcon,
  Loader2Icon,
} from "lucide-react";
import React from "react";

type Props = { status: ExecutionPhasesStatus };

const PhaseStatusBadge = ({ status }: Props) => {
  switch (status) {
    case ExecutionPhasesStatus.PENDING:
      return <CircleDashedIcon size={20} className="stroke-muted-foreground" />;
    case ExecutionPhasesStatus.RUNNING:
      return (
        <Loader2Icon size={20} className="animate-spin stroke-yellow-500" />
      );

    case ExecutionPhasesStatus.FAILED:
      return <CircleXIcon size={20} className="stroke-destructive" />;

    case ExecutionPhasesStatus.COMPLETED:
      return <CircleCheckIcon size={20} className="stroke-green-500" />;

    default:
      return <div className="rounded-full">{status}</div>;
  }
};

export default PhaseStatusBadge;
