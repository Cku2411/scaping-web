import { TaskParamType, TaskType } from "@/types/taskType";
import { WorkflowTask } from "@/types/workfowTypes";
import { Code2Icon, LucideProps } from "lucide-react";
import React from "react";

type Props = {};

export const PageToHtml = {
  type: TaskType.PAGE_TO_HTML,
  label: "Get html from page",
  icon: (props: LucideProps) => (
    <Code2Icon className="stroke-rose-400" {...props} />
  ),
  credits: 2,

  isEntryPoint: false,
  inputs: [
    {
      name: "Website Page",
      type: TaskParamType.BROWSER_INSTANCE,
      required: true,
    },
  ],
  outputs: [
    {
      name: "Html",
      type: TaskParamType.STRING,
    },
    { name: "Web page", type: TaskParamType.BROWSER_INSTANCE },
  ],
} satisfies WorkflowTask;
// co phai chinh tailwindCss k?

const LaunchBrowser = (props: Props) => {
  return <div>LaunchBrowser</div>;
};

// export default LaunchBrowser;
