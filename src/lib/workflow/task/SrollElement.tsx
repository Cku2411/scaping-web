import { TaskParamType, TaskType } from "@/types/taskType";
import { WorkflowTask } from "@/types/workfowTypes";
import {
  ArrowUpIcon,
  LucideProps,
  MousePointerClick,
  TextIcon,
} from "lucide-react";
import React from "react";

type Props = {};

export const ScrollElementTask = {
  type: TaskType.SCROLL_ELEMENT,
  label: "Scroll Element",
  icon: (props: LucideProps) => (
    <ArrowUpIcon className="stroke-orange-400" {...props} />
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
  ] as const,
  outputs: [
    {
      name: "Web page",
      type: TaskParamType.BROWSER_INSTANCE,
    },
  ] as const,
} satisfies WorkflowTask;

// export default LaunchBrowser;
