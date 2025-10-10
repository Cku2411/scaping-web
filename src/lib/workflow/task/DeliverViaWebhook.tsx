import { TaskParamType, TaskType } from "@/types/taskType";
import { WorkflowTask } from "@/types/workfowTypes";
import {
  LucideProps,
  MousePointerClick,
  SendIcon,
  TextIcon,
} from "lucide-react";
import React from "react";

type Props = {};

export const DeliverViaWebHookTask = {
  type: TaskType.DELIVER_VIA_WEBHOOK,
  label: "Deliver via webhook",
  icon: (props: LucideProps) => (
    <SendIcon className="stroke-blue-400" {...props} />
  ),
  credits: 1,
  isEntryPoint: false,
  inputs: [
    {
      name: "Target URL",
      type: TaskParamType.STRING,
      required: true,
    },
    { name: "Body", type: TaskParamType.STRING, required: true },
  ] as const,
  outputs: [] as const,
} satisfies WorkflowTask;

// export default LaunchBrowser;
