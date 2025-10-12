import { TaskType } from "@/types/taskType";
import { LaunchBrowserExecutor } from "./LaunchBrowserExecutor";
import { pageToHtlmExecutor } from "./PageToHtmlExecutor";
import { ExecutionEnviromentType } from "@/types/executorType";
import { WorkflowTask } from "@/types/workfowTypes";
import { ExtractTextFromElementExecutor } from "./ExtractTextFromElementExecutor";
import { FillInputExecutor } from "./FillInputExecutor";
import { ClickElementExecutor } from "./ClickElementExecutor";
import { WaitForElementExecutor } from "./WaitForElementExecutor";
import { DeliveryViaWebHookExecutor } from "./DeliveryViaWebhookExecutor";
import { ExtractDataWithAIExecutor } from "./ExtractDataWithAIExecutor";
import { ReadeProperFromJsonExecutor } from "./ReadPropertyFromJsonExecutor";

type ExecutorFn<T extends WorkflowTask> = (
  enviroment: ExecutionEnviromentType<T>
) => Promise<boolean>;

type RegistryType = {
  [K in TaskType]: ExecutorFn<WorkflowTask & { type: K }>;
};

export const ExecutorRegistry: RegistryType = {
  LAUNCH_BROWSER: LaunchBrowserExecutor,
  PAGE_TO_HTML: pageToHtlmExecutor,
  EXTRACT_TEXT_FROM_ELEMENT: ExtractTextFromElementExecutor,
  FILL_INPUT: FillInputExecutor,
  CLICK_ELEMENT: ClickElementExecutor,
  WAIT_FOR_ELEMENT: WaitForElementExecutor,
  DELIVER_VIA_WEBHOOK: DeliveryViaWebHookExecutor,
  EXTRACT_DATA_WITH_AI: ExtractDataWithAIExecutor,
  READE_PROPERTY_FROM_JSON: ReadeProperFromJsonExecutor,
};
