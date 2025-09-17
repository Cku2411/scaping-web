import { TaskParamType, TaskType } from "@/types/taskType";
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
  inputs: [
    {
      name: "Website URL",
      type: TaskParamType.STRING,
      helperText: "eg: https://www.google.com",
      required: true,
      hideHandle: true,
    },
  ],
};
// co phai chinh tailwindCss k?

const LaunchBrowser = (props: Props) => {
  return <div>LaunchBrowser</div>;
};

// export default LaunchBrowser;
