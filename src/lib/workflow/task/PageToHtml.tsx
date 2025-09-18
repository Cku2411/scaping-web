import { TaskParamType, TaskType } from "@/types/taskType";
import { GlobeIcon, LucideProps } from "lucide-react";
import React from "react";

type Props = {};

export const PageToHtml = {
  type: TaskType.PAGE_TO_HTML,
  label: "Get html from page",
  icon: (props: LucideProps) => (
    <GlobeIcon className="stroke-rose-400" {...props} />
  ),
  isEntryPoint: false,
  inputs: [
    {
      name: "Website Page",
      type: TaskParamType.BROWSER_INSTANCE,
      required: true,
    },
  ],
};
// co phai chinh tailwindCss k?

const LaunchBrowser = (props: Props) => {
  return <div>LaunchBrowser</div>;
};

// export default LaunchBrowser;
