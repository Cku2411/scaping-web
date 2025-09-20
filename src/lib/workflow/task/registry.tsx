import { ExtractTextFromHtml } from "./ExtractTextFromElement";
import { LaunchBrowserTask } from "./launchBrowser";
import { PageToHtml } from "./PageToHtml";

export const TaskRegistry = {
  LAUNCH_BROWSER: LaunchBrowserTask,
  PAGE_TO_HTML: PageToHtml,
  EXTRACT_TEXT_FROM_ELEMENT: ExtractTextFromHtml,
};
