import { TaskParamType, TaskType } from "@/types/taskType";
import { WorkflowTask } from "@/types/workfowTypes";
import { FileJson2Icon, LucideProps, TextIcon } from "lucide-react";
import React from "react";

type Props = {};

export const ReadDataFromJSONTask = {
  type: TaskType.READE_PROPERTY_FROM_JSON,
  label: "Read property from Json",
  icon: (props: LucideProps) => (
    <FileJson2Icon className="stroke-orange-400" {...props} />
  ),
  credits: 1,
  isEntryPoint: false,
  inputs: [
    {
      name: "JSON",
      type: TaskParamType.STRING,
      required: true,
    },
    { name: "Property name", type: TaskParamType.STRING, required: true },
  ] as const,
  outputs: [
    {
      name: "Property value",
      type: TaskParamType.STRING,
    },
  ] as const,
} satisfies WorkflowTask;

// export default LaunchBrowser;
