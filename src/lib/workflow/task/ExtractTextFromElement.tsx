import { TaskParamType, TaskType } from "@/types/taskType";
import { LucideProps, TextIcon } from "lucide-react";
import React from "react";

type Props = {};

export const ExtractTextFromHtml = {
  type: TaskType.EXTRACT_TEXT_FROM_ELEMENT,
  label: "Extract text from element",
  icon: (props: LucideProps) => (
    <TextIcon className="stroke-rose-400" {...props} />
  ),
  isEntryPoint: false,
  inputs: [
    {
      name: "Html",
      type: TaskParamType.STRING,
      required: true,
      variant: "textarea",
    },
    { name: "Selector", type: TaskParamType.STRING, required: true },
  ],
  outputs: [
    {
      name: "Extracted text",
      type: TaskParamType.STRING,
    },
  ],
};
// co phai chinh tailwindCss k?

const LaunchBrowser = (props: Props) => {
  return <div>LaunchBrowser</div>;
};

// export default LaunchBrowser;
