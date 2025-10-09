import { TaskParamType, TaskType } from "@/types/taskType";
import { WorkflowTask } from "@/types/workfowTypes";
import { Edit3Icon, LucideProps } from "lucide-react";
import React from "react";

type Props = {};

export const FillInputTask = {
  type: TaskType.FILL_INPUT,
  label: "Fill input",
  icon: (props: LucideProps) => (
    <Edit3Icon className="stroke-orange-400" {...props} />
  ),
  credits: 1,
  isEntryPoint: false,
  inputs: [
    {
      name: "Web page",
      type: TaskParamType.BROWSER_INSTANCE,
      required: true,
    },
    { name: "Selector", type: TaskParamType.STRING, required: true },
    { name: "Value", type: TaskParamType.STRING, required: true },
  ] as const,
  outputs: [
    {
      name: "Web page",
      type: TaskParamType.BROWSER_INSTANCE,
    },
  ] as const,
} satisfies WorkflowTask;

// export default LaunchBrowser;
