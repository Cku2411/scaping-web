import { TaskParamType, TaskType } from "@/types/taskType";
import { WorkflowTask } from "@/types/workfowTypes";
import { LucideProps, TextIcon } from "lucide-react";
import React from "react";

type Props = {};

export const ExtractTextFromHtml = {
  type: TaskType.EXTRACT_TEXT_FROM_ELEMENT,
  label: "Extract text from element",
  icon: (props: LucideProps) => (
    <TextIcon className="stroke-rose-400" {...props} />
  ),
  credits: 2,
  isEntryPoint: false,
  inputs: [
    {
      name: "Html",
      type: TaskParamType.STRING,
      required: true,
      variant: "textarea",
    },
    { name: "Selector", type: TaskParamType.STRING, required: true },
  ] as const,
  outputs: [
    {
      name: "Extracted text",
      type: TaskParamType.STRING,
    },
  ] as const,
} satisfies WorkflowTask;

// export default LaunchBrowser;
