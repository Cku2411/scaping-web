import { TaskParamType, TaskType } from "@/types/taskType";
import { WorkflowTask } from "@/types/workfowTypes";
import {
  DatabaseIcon,
  LucideProps,
  MousePointerClick,
  TextIcon,
} from "lucide-react";
import React from "react";

type Props = {};

export const AddPropertyToJsonTask = {
  type: TaskType.ADD_PROPERTY_TO_JSON,
  label: "Add property to Json",
  icon: (props: LucideProps) => (
    <DatabaseIcon className="stroke-orange-400" {...props} />
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
    { name: "Property value", type: TaskParamType.STRING, required: true },
  ] as const,
  outputs: [
    {
      name: "Update JSON",
      type: TaskParamType.STRING,
    },
  ] as const,
} satisfies WorkflowTask;

// export default LaunchBrowser;
