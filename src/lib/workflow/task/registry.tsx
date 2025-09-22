import { TaskType } from "@/types/taskType";
import { ExtractTextFromHtml } from "./ExtractTextFromElement";
import { LaunchBrowserTask } from "./launchBrowser";
import { PageToHtml } from "./PageToHtml";
import { WorkflowTask } from "@/types/workfowTypes";

type Registry = {
  [k in TaskType]: WorkflowTask & { type: k };
};

export const TaskRegistry: Registry = {
  LAUNCH_BROWSER: LaunchBrowserTask,
  PAGE_TO_HTML: PageToHtml,
  EXTRACT_TEXT_FROM_ELEMENT: ExtractTextFromHtml,
};
