import { TaskParamType, TaskType } from "@/types/taskType";
import { WorkflowTask } from "@/types/workfowTypes";
import {
  EyeIcon,
  LucideProps,
  MousePointerClick,
  TextIcon,
} from "lucide-react";
import React from "react";

type Props = {};

export const WaitForElementTask = {
  type: TaskType.WAIT_FOR_ELEMENT,
  label: "Wait for Element",
  icon: (props: LucideProps) => (
    <EyeIcon className="stroke-amber-400" {...props} />
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
    {
      name: "Visibility",
      type: TaskParamType.SELECT,
      required: true,
      options: [
        { label: "visible", value: "visible" },
        { label: "Hidden", value: "hidden" },
      ],
    },
  ] as const,
  outputs: [
    {
      name: "Web page",
      type: TaskParamType.BROWSER_INSTANCE,
    },
  ] as const,
} satisfies WorkflowTask;

// export default LaunchBrowser;
