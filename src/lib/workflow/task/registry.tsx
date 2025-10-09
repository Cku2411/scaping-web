import { TaskType } from "@/types/taskType";
import { ExtractTextFromHtml } from "./ExtractTextFromElement";
import { LaunchBrowserTask } from "./launchBrowser";
import { PageToHtml } from "./PageToHtml";
import { WorkflowTask } from "@/types/workfowTypes";
import { FillInputTask } from "./FillInput";
import { ClickElementTask } from "./ClickElement";
import { WaitForElementTask } from "./WaitForElementTask";

type Registry = {
  [k in TaskType]: WorkflowTask & { type: k };
};

export const TaskRegistry: Registry = {
  LAUNCH_BROWSER: LaunchBrowserTask,
  PAGE_TO_HTML: PageToHtml,
  EXTRACT_TEXT_FROM_ELEMENT: ExtractTextFromHtml,
  FILL_INPUT: FillInputTask,
  CLICK_ELEMENT: ClickElementTask,
  WAIT_FOR_ELEMENT: WaitForElementTask,
};
