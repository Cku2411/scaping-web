import { TaskParamType, TaskType } from "@/types/taskType";
import { WorkflowTask } from "@/types/workfowTypes";
import { GlobeIcon, LucideProps } from "lucide-react";
import React from "react";

type Props = {};

export const LaunchBrowserTask = {
  type: TaskType.LAUNCH_BROWSER,
  label: "launch browser",
  icon: (props: LucideProps) => (
    <GlobeIcon className="stroke-pink-400" {...props} />
  ),
  isEntryPoint: true,
  credits: 5,
  inputs: [
    {
      name: "Website URL",
      type: TaskParamType.STRING,
      helperText: "eg: https://www.google.com",
      required: true,
      hideHandle: true,
    },
  ] as const,
  outputs: [
    { name: "Web page", type: TaskParamType.BROWSER_INSTANCE },
  ] as const,
} satisfies WorkflowTask;
// co phai chinh tailwindCss k?
