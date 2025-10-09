import { TaskParamType, TaskType } from "@/types/taskType";
import { WorkflowTask } from "@/types/workfowTypes";
import { LucideProps, MousePointerClick, TextIcon } from "lucide-react";
import React from "react";

type Props = {};

export const ClickElementTask = {
  type: TaskType.CLICK_ELEMENT,
  label: "Click Element",
  icon: (props: LucideProps) => (
    <MousePointerClick className="stroke-orange-400" {...props} />
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
